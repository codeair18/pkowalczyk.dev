// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
  ],

  css: ['~/assets/css/main.css'],

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