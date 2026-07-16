<template>
  <div class="min-h-screen px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24">
    <div class="max-w-4xl mx-auto">
      <header class="mb-12">
        <h1 class="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Referrals
        </h1>
        <p class="text-lg text-gray-400">
          Tools and services I use and recommend
        </p>
      </header>

      <!-- Referrals -->
      <section class="mb-12">
        <div class="grid gap-4">
          <a href="https://claude.ai/referral/43QSpM6BbQ" target="_blank" rel="noreferrer noopener" class="link-card opacity-60">
            <div class="flex items-center gap-3">
              <UIcon name="i-simple-icons-anthropic" class="text-xl" />
              <div>
                <h3 class="font-medium flex items-center gap-2">
                  Claude AI
                  <span class="text-xs font-medium uppercase tracking-wide px-2 py-0.5 rounded-full border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400">Expired</span>
                </h3>
                <p class="text-sm text-gray-400">Get started with Claude — Anthropic's AI assistant</p>
              </div>
            </div>
          </a>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { property: 'og:title', content: 'Referrals - Przemek Kowalczyk' },
    { property: 'og:description', content: 'Tools and services Przemek Kowalczyk uses and recommends' },
    { property: 'og:image', content: 'https://pkowalczyk.dev/static/preview.png' },
    { property: 'og:url', content: 'https://pkowalczyk.dev/referrals' },
    { property: 'og:type', content: 'website' }
  ],
  title: 'Referrals - Przemek Kowalczyk',
})
</script>

<style lang="scss" scoped>
.link-card {
  @apply block p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors duration-200 bg-white dark:bg-gray-900/50 hover:bg-gray-50 dark:hover:bg-gray-800/50;
}

:root {
  --sun-link-color: green;
  --sun-link-color-hover: seagreen;
  --moon-link-color: #c0b6a0;
  --moon-link-color-hover: rgba(255, 253, 242, 0.4);
}

a {
  color: var(--sun-link-color);
  text-decoration: none;

  &:hover {
    color: var(--sun-link-color-hover);
  }
}

.dark {
  a {
    color: var(--moon-link-color);

    &:hover {
      color: var(--moon-link-color-hover);
    }
  }
}
</style>
