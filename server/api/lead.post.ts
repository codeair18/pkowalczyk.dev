// MOCK "chat" target. Stands in for the real notification/chat channel.
// Swapping this for a real integration (Slack, email, CRM) is a one-file change.

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const id = Math.random().toString(36).slice(2, 10)

  // Clearly labelled so it is easy to spot in the dev server console.
  console.log('[LEAD]', id, JSON.stringify(body, null, 2))

  return { ok: true, id }
})