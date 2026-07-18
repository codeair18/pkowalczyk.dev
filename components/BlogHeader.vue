<template>
  <UHeader
    to="/"
    :toggle="false"
    :ui="{
      container: 'mx-auto max-w-7xl px-6 lg:px-8',
      root: 'border-default/70 bg-default/85',
    }"
  >
    <template #title>
      <span class="brand-logo">pkowalczyk.dev/blog</span>
    </template>

    <template #right>
      <UButton
        :label="nextLocale.toUpperCase()"
        :aria-label="locale === 'pl' ? 'Read in English' : 'Czytaj po polsku'"
        color="neutral"
        variant="ghost"
        size="sm"
        class="font-semibold"
        @click="setLocale(nextLocale)"
      />

      <ClientOnly>
        <UButton
          :icon="isDark ? 'i-ph-sun' : 'i-ph-moon'"
          :aria-label="isDark ? 'Włącz jasny motyw' : 'Włącz ciemny motyw'"
          color="neutral"
          variant="ghost"
          @click="toggleColorMode"
        />

        <template #fallback>
          <span class="size-8" aria-hidden="true" />
        </template>
      </ClientOnly>
    </template>
  </UHeader>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const { locale, setLocale } = useI18n()

const isDark = computed(() => colorMode.value === 'dark')
const nextLocale = computed<'pl' | 'en'>(() => locale.value === 'pl' ? 'en' : 'pl')

const toggleColorMode = () => {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>

<style scoped>
.brand-logo {
  background: linear-gradient(100deg, var(--blog-accent-hover, seagreen), var(--blog-accent, green));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: -0.025em;
}
</style>
