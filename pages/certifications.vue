<template>
  <nav class="fixed h-auto w-screen z-50">
    <div class="flex md:justify-between p-5 items-center gap-2">
      <div class="lang_switcher light:text-sk-700 text-xl">
        <button v-if="locale === 'pl'" @click="setLocale('en')">EN</button>
        <button v-else @click="setLocale('pl')">PL</button>
      </div>
    </div>
  </nav>
  <ClientOnly>
    <day-night2/>
  </ClientOnly>
  <main class="mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-16 font-sans md:px-12 md:py-24 lg:py-32">
    <header class="mb-12">
      <NuxtLink to="/" class="back-link inline-flex items-center gap-1 text-sm mb-8">
        <UIcon name="i-ph-arrow-left" class="h-4 w-4"/>
        {{ $t('backHome') }}
      </NuxtLink>
      <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">
        {{ $t('certifications') }}
      </h1>
      <p class="mt-4 max-w-md text-gray-400">{{ $t('certificationsSubtitle') }}</p>
    </header>

    <ul class="space-y-5">
      <li v-for="cert in certifications" :key="cert.url">
        <a
          :href="cert.url"
          target="_blank"
          rel="noreferrer noopener"
          class="certification-card group flex items-center gap-4"
          :aria-label="`${cert.name} (opens in a new tab)`"
        >
          <span class="cert-icon shrink-0 flex items-center justify-center rounded-full">
            <UIcon name="i-ph-certificate" class="h-6 w-6"/>
          </span>
          <span class="min-w-0 flex-1">
            <span class="block font-medium truncate">{{ cert.name }}</span>
            <span class="block text-sm text-gray-400 truncate">{{ cert.issuer }}</span>
          </span>
          <UIcon
            name="i-ph-arrow-up-right"
            class="h-5 w-5 shrink-0 opacity-50 transition-opacity group-hover:opacity-100"
          />
        </a>
      </li>
    </ul>
  </main>
</template>

<script setup lang="ts">
import DayNight2 from "~/components/switcher/DayNight2.vue";

const {locale, setLocale} = useI18n()

useHead({
  meta: [
    {charset: 'utf-8'},
    {name: 'viewport', content: 'width=device-width, initial-scale=1'},
    {property: 'og:title', content: 'Certifications - Przemek Kowalczyk'},
    {property: 'og:description', content: 'Professional certifications of Przemek Kowalczyk.'},
    {property: 'og:image', content: 'https://pkowalczyk.dev/static/preview.png'},
    {property: 'og:url', content: 'https://pkowalczyk.dev/certifications'},
    {property: 'og:type', content: 'website'}
  ],
  title: 'Certifications - Przemek Kowalczyk',
})

const certifications = ref([
  {
    name: 'AI Devs 4 Builders',
    issuer: 'Certifier',
    url: 'https://credsverse.com/credentials/558a3b9e-a1ab-426e-a4c3-e3e2dcc5ffa7',
  },
])
</script>

<style lang="scss" scoped>
:root {
  --sun-link-color: green;
  --sun-link-color-hover: seagreen;
  --moon-link-color: #c0b6a0;
  --moon-link-color-hover: rgba(255, 253, 242, 0.4);
}

.certification-card {
  @apply p-5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/50;
  @apply transition-colors duration-200;

  &:hover {
    @apply border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50;
  }
}

.cert-icon {
  @apply h-12 w-12 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-300;
}

.back-link,
a {
  color: var(--sun-link-color);
  text-decoration: none;

  &:hover {
    color: var(--sun-link-color-hover);
  }
}

.dark {
  .back-link,
  a {
    color: var(--moon-link-color);

    &:hover {
      color: var(--moon-link-color-hover);
    }
  }
}

.lang_switcher {
  cursor: pointer;
  z-index: 1000;
}
</style>