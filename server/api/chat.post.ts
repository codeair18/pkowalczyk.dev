import { SYSTEM_PROMPT, SUBMIT_TOOL, type ChatMessage } from '../utils/agent'

// Streaming OpenRouter proxy.
// Protocol to the client is JSON-lines: one JSON object per line, newline-delimited.
//   {"type":"token","value":"..."}      assistant text delta
//   {"type":"submitted","data":{...}}   requirements were forwarded to the mock
//   {"type":"done"}                      stream finished
//   {"type":"error"}                     a (non-fatal) error occurred; a friendly token precedes it

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'

const FALLBACK_MODEL = 'anthropic/claude-haiku-4.5'

const MSG_UNAVAILABLE =
  'Przepraszam, asystent jest chwilowo niedostępny. / Sorry, the assistant is temporarily unavailable.'
const MSG_ERROR =
  'Przepraszam, coś poszło nie tak. Spróbuj ponownie. / Sorry, something went wrong. Please try again.'

interface ToolCallAccumulator {
  id: string
  name: string
  args: string
}

// Emits one NDJSON object per call to the client stream.
type Writer = (obj: Record<string, unknown>) => void

interface CompletionOptions {
  apiKey: string
  model: string
  convo: ChatMessage[]
  allowTools: boolean
  write: Writer
}

// Iterates the `data:` payloads of an OpenRouter SSE stream.
async function* readSseEvents(body: ReadableStream<Uint8Array>): AsyncGenerator<any> {
  const reader = body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })

    let nl: number
    while ((nl = buffer.indexOf('\n')) !== -1) {
      const line = buffer.slice(0, nl).trim()
      buffer = buffer.slice(nl + 1)
      if (!line || !line.startsWith('data:')) continue
      const data = line.slice(5).trim()
      if (data === '[DONE]') continue

      try {
        yield JSON.parse(data)
      } catch {
        // ignore malformed SSE chunks
      }
    }
  }
}

// Folds a streamed tool_calls delta into the accumulator map (keyed by index).
function accumulateToolCalls(
  toolCalls: Record<number, ToolCallAccumulator>,
  deltaToolCalls: any[],
): void {
  for (const tc of deltaToolCalls) {
    const idx = tc.index ?? 0
    const acc = (toolCalls[idx] ??= { id: '', name: '', args: '' })
    if (tc.id) acc.id = tc.id
    if (tc.function?.name) acc.name = tc.function.name
    if (tc.function?.arguments) acc.args += tc.function.arguments
  }
}

// Runs one streaming OpenRouter completion. Forwards text tokens to the client
// and returns any tool call the model emitted (or null).
async function runCompletion({
  apiKey,
  model,
  convo,
  allowTools,
  write,
}: CompletionOptions): Promise<ToolCallAccumulator | null> {
  const res = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://pkowalczyk.dev',
      'X-Title': 'pkowalczyk.dev',
    },
    body: JSON.stringify({
      model,
      stream: true,
      messages: convo,
      ...(allowTools ? { tools: [SUBMIT_TOOL], tool_choice: 'auto' } : {}),
    }),
  })

  if (!res.ok || !res.body) {
    const text = await res.text().catch(() => '')
    throw new Error(`OpenRouter ${res.status}: ${text.slice(0, 500)}`)
  }

  const toolCalls: Record<number, ToolCallAccumulator> = {}

  for await (const parsed of readSseEvents(res.body)) {
    const delta = parsed.choices?.[0]?.delta
    if (!delta) continue

    if (delta.content) {
      write({ type: 'token', value: delta.content })
    }

    if (Array.isArray(delta.tool_calls)) {
      accumulateToolCalls(toolCalls, delta.tool_calls)
    }
  }

  const first = Object.values(toolCalls)[0]
  return first && first.name ? first : null
}

// Forwards the requirements to the mock lead channel and appends the
// tool call + result to the conversation so the model can confirm naturally.
async function handleSubmitRequirements(
  toolCall: ToolCallAccumulator,
  convo: ChatMessage[],
  write: Writer,
): Promise<void> {
  let args: Record<string, unknown>
  try {
    args = JSON.parse(toolCall.args || '{}')
  } catch {
    args = {}
  }

  let leadResult: unknown = { ok: false }
  try {
    leadResult = await $fetch('/api/lead', { method: 'POST', body: args })
  } catch (e) {
    console.error('[chat] lead forward failed', e)
  }

  write({ type: 'submitted', data: args })

  const callId = toolCall.id || 'call_0'
  convo.push({
    role: 'assistant',
    content: '',
    tool_calls: [
      {
        id: callId,
        type: 'function',
        function: { name: toolCall.name, arguments: toolCall.args || '{}' },
      },
    ],
  })
  convo.push({
    role: 'tool',
    tool_call_id: callId,
    name: toolCall.name,
    content: JSON.stringify(leadResult),
  })
}

export default defineEventHandler(async (event) => {
  const { messages } = await readBody<{ messages: ChatMessage[] }>(event)
  const config = useRuntimeConfig()
  const apiKey = config.openrouterApiKey
  const model = config.openrouterModel || FALLBACK_MODEL

  setHeader(event, 'Content-Type', 'application/x-ndjson; charset=utf-8')
  setHeader(event, 'Cache-Control', 'no-cache, no-transform')
  setHeader(event, 'X-Accel-Buffering', 'no')

  const encoder = new TextEncoder()

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      const write: Writer = (obj) =>
        controller.enqueue(encoder.encode(JSON.stringify(obj) + '\n'))

      const fail = (message: string) => {
        write({ type: 'token', value: message })
        write({ type: 'error' })
        write({ type: 'done' })
        controller.close()
      }

      if (!apiKey) {
        console.error('[chat] Missing NUXT_OPENROUTER_API_KEY')
        return fail(MSG_UNAVAILABLE)
      }

      // Full conversation we send upstream, starting with the system prompt.
      const convo: ChatMessage[] = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...(messages || []).map((m) => ({ role: m.role, content: m.content })),
      ]

      try {
        // First pass: the model may answer in text and/or decide to submit requirements.
        const toolCall = await runCompletion({ apiKey, model, convo, allowTools: true, write })

        if (toolCall && toolCall.name === 'submit_requirements') {
          await handleSubmitRequirements(toolCall, convo, write)
          // Second pass: confirmation message (no tools this time).
          await runCompletion({ apiKey, model, convo, allowTools: false, write })
        }

        write({ type: 'done' })
        controller.close()
      } catch (err) {
        console.error('[chat] stream error', err)
        return fail(MSG_ERROR)
      }
    },
  })
})