// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
  ],

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    // Server-only secrets. Nitro maps NUXT_OPENROUTER_API_KEY -> openrouterApiKey.
    openrouterApiKey: '',
    openrouterModel: 'anthropic/claude-haiku-4.5',
    // Nitro maps NUXT_DISCORD_WEBHOOK_URL -> discordWebhookUrl. Empty = Discord send skipped.
    discordWebhookUrl: '',
  },

  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'pl',
    locales: ['pl', 'en'],
  },

  components: [
    '~/components'
  ],

  devServer: {
    port: 3001
  },

  compatibilityDate: '2025-06-21',
})