<template>
  <div class="min-h-screen px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24">
    <div class="max-w-2xl mx-auto">
      <header class="mb-12 text-center">
        <h1 class="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Przemek Kowalczyk
        </h1>
        <p class="text-lg text-gray-400">
          Get in touch with me
        </p>
      </header>

      <div class="space-y-8">
        <!-- Phone -->
        <div class="contact-card">
          <div class="flex items-center gap-3">
            <UIcon name="i-ph-phone" class="text-xl" />
            <div>
              <h3 class="font-medium">Phone</h3>
              <p class="text-sm text-gray-400">+48 000 000 000</p>
            </div>
          </div>
        </div>

        <!-- Email -->
        <a href="mailto:kontakt@pkowalczyk.dev" class="contact-card hover-card">
          <div class="flex items-center gap-3">
            <UIcon name="i-ph-envelope" class="text-xl" />
            <div>
              <h3 class="font-medium">Email</h3>
              <p class="text-sm text-gray-400">kontakt@pkowalczyk.dev</p>
            </div>
          </div>
        </a>

        <!-- LinkedIn -->
        <a href="https://www.linkedin.com/in/pekowal" target="_blank" rel="noreferrer noopener" class="contact-card hover-card">
          <div class="flex items-center gap-3">
            <UIcon name="i-simple-icons-linkedin" class="text-xl" />
            <div>
              <h3 class="font-medium">LinkedIn</h3>
              <p class="text-sm text-gray-400">Professional Profile</p>
            </div>
          </div>
        </a>

        <!-- Instagram -->
        <a href="https://www.instagram.com/przem.kowalczyk" target="_blank" rel="noreferrer noopener" class="contact-card hover-card">
          <div class="flex items-center gap-3">
            <UIcon name="i-simple-icons-instagram" class="text-xl" />
            <div>
              <h3 class="font-medium">Instagram</h3>
              <p class="text-sm text-gray-400">Personal Updates</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useStaticPageSeo({
  title: 'Contact',
  description: 'Contact information for Przemek Kowalczyk',
  path: '/contact',
})
</script>

<style lang="scss" scoped>
.contact-card {
  @apply block p-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/50;
}

.hover-card {
  @apply hover:border-gray-300 dark:hover:border-gray-600 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-800/50;
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