<template>
  <div class="min-h-screen px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24">
    <div class="max-w-4xl mx-auto">
      <header class="mb-12">
        <h1 class="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Link Tree
        </h1>
        <p class="text-lg text-gray-400">
          All links from Przemek Kowalczyk's portfolio
        </p>
      </header>

      <!-- Navigation -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold mb-6">Navigation</h2>
        <div class="grid gap-4">
          <a href="/" class="link-card">
            <div class="flex items-center gap-3">
              <UIcon name="i-ph-house" class="text-xl" />
              <div>
                <h3 class="font-medium">Home</h3>
                <p class="text-sm text-gray-400">Main portfolio page</p>
              </div>
            </div>
          </a>
        </div>
      </section>

      <!-- Social Media -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold mb-6">Social Media</h2>
        <div class="grid gap-4 sm:grid-cols-2">
          <a href="https://github.com/codeair18/PersonalBrand" target="_blank" rel="noreferrer noopener" class="link-card">
            <div class="flex items-center gap-3">
              <UIcon name="i-simple-icons-github" class="text-xl" />
              <div>
                <h3 class="font-medium">GitHub</h3>
                <p class="text-sm text-gray-400">PersonalBrand Repository</p>
              </div>
            </div>
          </a>
          
          <a href="https://www.linkedin.com/in/pekowal" target="_blank" rel="noreferrer noopener" class="link-card">
            <div class="flex items-center gap-3">
              <UIcon name="i-simple-icons-linkedin" class="text-xl" />
              <div>
                <h3 class="font-medium">LinkedIn</h3>
                <p class="text-sm text-gray-400">Professional Profile</p>
              </div>
            </div>
          </a>
          
          <a href="https://www.instagram.com/przem.kowalczyk" target="_blank" rel="noreferrer noopener" class="link-card">
            <div class="flex items-center gap-3">
              <UIcon name="i-simple-icons-instagram" class="text-xl" />
              <div>
                <h3 class="font-medium">Instagram</h3>
                <p class="text-sm text-gray-400">Personal Updates</p>
              </div>
            </div>
          </a>
          
          <a href="mailto:kontakt@pkowalczyk.dev?subject=Kontakt&body=W%20czym%20mogę%20pomóc%3F" class="link-card">
            <div class="flex items-center gap-3">
              <UIcon name="i-ph-envelope" class="text-xl" />
              <div>
                <h3 class="font-medium">Email</h3>
                <p class="text-sm text-gray-400">kontakt@pkowalczyk.dev</p>
              </div>
            </div>
          </a>
        </div>
      </section>

      <!-- Current Projects -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold mb-6">Current Projects</h2>
        <div class="grid gap-4">
          <a href="https://comfino.pl" target="_blank" rel="noreferrer noopener" class="link-card">
            <div class="flex items-center gap-3">
              <UIcon name="i-ph-briefcase" class="text-xl" />
              <div>
                <h3 class="font-medium">Comfino</h3>
                <p class="text-sm text-gray-400">Lead Fullstack Developer at Comfino</p>
              </div>
            </div>
          </a>
          
          <a href="https://cvior.com" target="_blank" rel="noreferrer noopener" class="link-card">
            <div class="flex items-center gap-3">
              <UIcon name="i-ph-rocket" class="text-xl" />
              <div>
                <h3 class="font-medium">Cvior</h3>
                <p class="text-sm text-gray-400">Founder - CV Generation Platform</p>
              </div>
            </div>
          </a>
        </div>
      </section>

      <!-- Previous Work -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold mb-6">Previous Work</h2>
        <div class="grid gap-4 sm:grid-cols-2">
          <a href="https://umbrell.ai" target="_blank" rel="noreferrer noopener" class="link-card">
            <div class="flex items-center gap-3">
              <UIcon name="i-ph-umbrella" class="text-xl" />
              <div>
                <h3 class="font-medium">UmbrellAI</h3>
                <p class="text-sm text-gray-400">Insurance Platform</p>
              </div>
            </div>
          </a>
          
          <a href="https://silkycoders.pl" target="_blank" rel="noreferrer noopener" class="link-card">
            <div class="flex items-center gap-3">
              <UIcon name="i-ph-code" class="text-xl" />
              <div>
                <h3 class="font-medium">SilkyCoders</h3>
                <p class="text-sm text-gray-400">Software Development</p>
              </div>
            </div>
          </a>
          
          <a href="https://pragmaticad.com" target="_blank" rel="noreferrer noopener" class="link-card">
            <div class="flex items-center gap-3">
              <UIcon name="i-ph-chart-line" class="text-xl" />
              <div>
                <h3 class="font-medium">PragmaticAd</h3>
                <p class="text-sm text-gray-400">Ad Analytics Platform</p>
              </div>
            </div>
          </a>
          
          <a href="https://www.pkowalczyk.dev" target="_blank" rel="noreferrer noopener" class="link-card">
            <div class="flex items-center gap-3">
              <UIcon name="i-ph-t-shirt" class="text-xl" />
              <div>
                <h3 class="font-medium">Fashionly</h3>
                <p class="text-sm text-gray-400">Fashion Affiliate Platform</p>
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
    { property: 'og:title', content: 'Link Tree - Przemek Kowalczyk' },
    { property: 'og:description', content: 'All links from Przemek Kowalczyk\'s portfolio and projects' },
    { property: 'og:image', content: 'https://pkowalczyk.dev/static/preview.png' },
    { property: 'og:url', content: 'https://pkowalczyk.dev/tree' },
    { property: 'og:type', content: 'website' }
  ],
  title: 'Link Tree - Przemek Kowalczyk',
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