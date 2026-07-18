// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
  ],

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      script: [
        {
          src: 'https://cloud.umami.is/script.js',
          defer: true,
          'data-website-id': '4e51e9bc-5971-48d5-bcdd-68978a533ada',
        },
      ],
    },
  },

  routeRules: {
    // Blog is static markdown — prerender so Netlify serves built HTML
    // instead of querying the Content SQLite DB in a serverless function.
    '/blog': { prerender: true },
    '/blog/**': { prerender: true },
  },

  nitro: {
    prerender: {
      // Crawl from /blog so article pages linked there get prerendered too.
      crawlLinks: true,
      routes: ['/blog'],
    },
  },

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
