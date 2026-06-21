<script setup lang="ts">
interface Message {
  role: 'user' | 'assistant'
  content: string
}

const { t } = useI18n()

const messages = ref<Message[]>([{ role: 'assistant', content: t('chatGreeting') }])
const input = ref('')
const loading = ref(false)
const submitted = ref(false)
const listEl = ref<HTMLElement | null>(null)

const scrollToBottom = () => {
  nextTick(() => {
    if (listEl.value) listEl.value.scrollTop = listEl.value.scrollHeight
  })
}

watch(messages, scrollToBottom, { deep: true })

const send = async () => {
  const text = input.value.trim()
  if (!text || loading.value) return

  input.value = ''
  loading.value = true
  messages.value.push({ role: 'user', content: text })

  // The empty assistant message we stream tokens into.
  const assistant = reactive<Message>({ role: 'assistant', content: '' })
  messages.value.push(assistant)

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: messages.value
          .slice(0, -1) // exclude the empty assistant placeholder
          .map((m) => ({ role: m.role, content: m.content })),
      }),
    })

    if (!res.body) throw new Error('no stream')

    const reader = res.body.getReader()
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
        if (!line) continue

        let evt: any
        try {
          evt = JSON.parse(line)
        } catch {
          continue
        }

        if (evt.type === 'token') {
          assistant.content += evt.value
        } else if (evt.type === 'submitted') {
          submitted.value = true
        }
        // 'done' / 'error' need no special UI handling beyond unlocking input
      }
    }
  } catch (e) {
    assistant.content = assistant.content || t('chatError')
  } finally {
    loading.value = false
    scrollToBottom()
  }
}

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    send()
  }
}
</script>

<template>
  <div class="agent-chat">
    <div ref="listEl" class="agent-chat__messages hidden-scroll">
      <div
        v-for="(m, i) in messages"
        :key="i"
        class="agent-chat__row"
        :class="m.role === 'user' ? 'agent-chat__row--user' : 'agent-chat__row--assistant'"
      >
        <UAvatar
          v-if="m.role === 'assistant'"
          src="/android-chrome-512x512.png"
          alt="Assistant"
          size="xs"
          class="agent-chat__avatar"
        />
        <div class="agent-chat__bubble" :class="`agent-chat__bubble--${m.role}`">
          <span v-if="m.content">{{ m.content }}</span>
          <span v-else class="agent-chat__typing">…</span>
        </div>
      </div>

      <div v-if="submitted" class="agent-chat__submitted">
        <UIcon name="i-ph-check-circle" class="h-4 w-4" />
        {{ $t('chatSubmitted') }}
      </div>
    </div>

    <div class="agent-chat__input">
      <UTextarea
        v-model="input"
        :rows="1"
        autoresize
        :placeholder="$t('chatPlaceholder')"
        class="flex-1"
        @keydown="onKeydown"
      />
      <UButton
        icon="i-ph-paper-plane-right"
        :loading="loading"
        :disabled="!input.trim()"
        :aria-label="$t('chatSend')"
        @click="send"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.agent-chat {
  display: flex;
  flex-direction: column;
  border: 1px solid color-mix(in srgb, var(--sun-link-color) 25%, transparent);
  border-radius: 0.75rem;
  background-color: color-mix(in srgb, var(---bg-color) 92%, var(--sun-color));
  overflow: hidden;
}

.agent-chat__messages {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 22rem;
  min-height: 8rem;
  overflow-y: auto;
  padding: 1rem;
}

.agent-chat__row {
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;

  &--user {
    justify-content: flex-end;
  }
}

.agent-chat__avatar {
  flex-shrink: 0;
}

.agent-chat__bubble {
  max-width: 80%;
  padding: 0.5rem 0.75rem;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  line-height: 1.4;
  white-space: pre-wrap;
  word-break: break-word;

  &--assistant {
    background-color: color-mix(in srgb, var(--sun-link-color) 12%, var(---bg-color));
    color: inherit;
    border-bottom-left-radius: 0.25rem;
  }

  &--user {
    background-color: var(--sun-link-color);
    color: white;
    border-bottom-right-radius: 0.25rem;
  }
}

.agent-chat__typing {
  opacity: 0.5;
}

.agent-chat__submitted {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.8125rem;
  color: var(--sun-link-color);
  padding: 0.25rem 0.5rem;
}

.agent-chat__input {
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  padding: 0.625rem;
  border-top: 1px solid color-mix(in srgb, var(--sun-link-color) 18%, transparent);
}

.dark .agent-chat {
  border-color: color-mix(in srgb, var(--moon-link-color) 25%, transparent);
  background-color: color-mix(in srgb, var(---bg-color) 88%, var(--moon-color));

  .agent-chat__bubble--assistant {
    background-color: #2a2a2a;
  }

  .agent-chat__bubble--user {
    background-color: var(--moon-link-color);
    color: #121212;
  }

  .agent-chat__submitted {
    color: var(--moon-link-color);
  }
}
</style>