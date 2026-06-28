// Lead sink for gathered project requirements.
// Logs the payload to the server console (handy in dev) and, when a Discord
// webhook is configured, forwards a formatted summary to Discord.

// Mirrors the SUBMIT_TOOL properties in server/utils/agent.ts.
interface LeadPayload {
  name?: string
  contact?: string
  projectType?: string
  description?: string
  budget?: string
  timeline?: string
}

const EMPTY = '—'

// Discord embed field values must be non-empty and <= 1024 chars.
const field = (name: string, value: string | undefined, inline = false) => ({
  name,
  value: (value?.trim() || EMPTY).slice(0, 1024),
  inline,
})

async function sendToDiscord(webhookUrl: string, lead: LeadPayload, id: string) {
  await $fetch(webhookUrl, {
    method: 'POST',
    body: {
      username: 'Lead Bot',
      embeds: [
        {
          title: '🚀 New project lead',
          color: 0x84cc16, // lime, matches the site theme
          fields: [
            field('Contact', lead.contact),
            field('Name', lead.name, true),
            field('Project type', lead.projectType, true),
            field('Budget', lead.budget, true),
            field('Timeline', lead.timeline, true),
            field('Description', lead.description),
          ],
          footer: { text: `Lead ${id}` },
          timestamp: new Date().toISOString(),
        },
      ],
    },
  })
}

export default defineEventHandler(async (event) => {
  const body = await readBody<LeadPayload>(event)

  const id = Math.random().toString(36).slice(2, 10)

  // Clearly labelled so it is easy to spot in the dev server console.
  console.log('[LEAD]', id, JSON.stringify(body, null, 2))

  const webhookUrl = useRuntimeConfig().discordWebhookUrl
  if (webhookUrl) {
    try {
      await sendToDiscord(webhookUrl, body, id)
    } catch (e) {
      // Never let a delivery failure break the chat response.
      console.error('[LEAD] discord send failed', e)
    }
  }

  return { ok: true, id }
})
