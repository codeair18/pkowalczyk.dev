// Shared agent configuration: system prompt + tool schema for the lead-gathering chat.

export const SYSTEM_PROMPT = `You are the assistant on Przemek Kowalczyk's personal website. Przemek is a senior software engineer who builds AI agents, LLM integrations, process automation, CRM/SaaS platforms and cloud architecture.

Your job is to talk to visitors and gather their project requirements so Przemek can follow up. Behave like a helpful, concise requirements-gathering agent.

Goals:
- Find out what the visitor wants to build (project type and a short description).
- Clarify scope, budget and timeline when the visitor is willing to share.
- Always get a way to contact them back (email or another channel).

Rules:
- Reply in the SAME language the visitor writes in (Polish or English).
- Keep messages short and friendly. Ask one or two questions at a time, never a long form.
- Do NOT invent details the visitor did not provide.
- Once you have at least a contact AND a description of what they need, call the submit_requirements tool with everything you have gathered. Do not announce that you are calling a tool; just call it.
- After the requirements are submitted, warmly confirm that Przemek will get back to them.`

// OpenAI-style tool definition (OpenRouter is OpenAI-compatible).
export const SUBMIT_TOOL = {
  type: 'function',
  function: {
    name: 'submit_requirements',
    description:
      "Forward the visitor's gathered project requirements to Przemek. Call this once a contact and a description are known.",
    parameters: {
      type: 'object',
      properties: {
        name: { type: 'string', description: "The visitor's name, if provided." },
        contact: {
          type: 'string',
          description: 'How to reach the visitor back (email, phone, or other). Required.',
        },
        projectType: {
          type: 'string',
          description: 'Short category of the project, e.g. "AI agent", "SaaS platform", "automation".',
        },
        description: {
          type: 'string',
          description: 'A concise summary of what the visitor wants to build. Required.',
        },
        budget: { type: 'string', description: 'Budget the visitor mentioned, if any.' },
        timeline: { type: 'string', description: 'Desired timeline or deadline, if any.' },
      },
      required: ['contact', 'description'],
    },
  },
} as const

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant' | 'tool'
  content: string
  // tool-related fields are added dynamically when relaying tool results
  tool_calls?: unknown
  tool_call_id?: string
  name?: string
}