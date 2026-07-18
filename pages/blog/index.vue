<template>
  <div class="blog-page min-h-screen">
    <BlogHeader />

    <main>
      <section class="blog-hero border-b border-default/70">
        <UContainer class="max-w-7xl px-6 py-20 sm:py-24 lg:px-8 lg:py-32">
          <div class="max-w-4xl">
            <UBadge
              label="AI · SOFTWARE · SECURITY"
              color="neutral"
              variant="subtle"
              size="lg"
              class="blog-accent-badge mb-6"
            />

            <h1 class="max-w-4xl text-4xl font-bold tracking-tight text-highlighted sm:text-6xl lg:text-7xl">
              {{ t('blogHeroTitleLead') }}
              <span class="gradient-text">{{ t('blogHeroTitleAccent') }}</span>
            </h1>

            <p class="mt-7 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
              {{ t('blogHeroDescription') }}
            </p>

            <div class="mt-8 flex flex-wrap gap-2">
              <UBadge :label="t('blogTopicArchitecture')" color="neutral" variant="outline" />
              <UBadge label="AI Agents" color="neutral" variant="outline" />
              <UBadge label="Backend" color="neutral" variant="outline" />
              <UBadge label="Security" color="neutral" variant="outline" />
            </div>
          </div>
        </UContainer>
      </section>

      <UContainer class="max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div class="mb-8 flex items-end justify-between gap-4">
          <div>
            <p class="blog-eyebrow mb-2 text-sm font-semibold uppercase tracking-[0.2em]">
              {{ t('blogLatestPosts') }}
            </p>
            <h2 class="text-3xl font-bold tracking-tight text-highlighted sm:text-4xl">
              {{ t('blogFromBlog') }}
            </h2>
          </div>

          <span class="hidden text-sm text-muted sm:block">
            {{ t(posts.length === 1 ? 'blogArticleSingular' : 'blogArticlePlural', { count: posts.length }) }}
          </span>
        </div>

        <UBlogPosts
          v-if="posts.length"
          :posts="posts"
          orientation="vertical"
          class="blog-posts"
        >
          <template #date="{ post }">
            {{ formatDate(post.date) }}
          </template>
        </UBlogPosts>

        <UAlert
          v-else
          :title="t('blogEmptyTitle')"
          :description="t('blogEmptyDescription')"
          icon="i-ph-article"
          color="neutral"
          variant="subtle"
        />
      </UContainer>
    </main>

    <footer class="border-t border-default/70">
      <UContainer class="flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <p>© {{ new Date().getFullYear() }} Przemek Kowalczyk</p>
        <UButton
          to="mailto:kontakt@pkowalczyk.dev"
          :label="t('blogContact')"
          icon="i-ph-arrow-up-right"
          color="neutral"
          variant="link"
          trailing
        />
      </UContainer>
    </footer>
  </div>
</template>

<script setup lang="ts">
const { locale, t } = useI18n()

const { data: articles } = await useAsyncData(() => `blog-articles-${locale.value}`, () => {
  return queryCollection('blog')
    .where('locale', '=', locale.value as 'pl' | 'en')
    .order('date', 'DESC')
    .all()
}, { watch: [locale] })

const posts = computed(() => (articles.value ?? []).map(article => ({
  title: article.title,
  description: article.description,
  date: article.date,
  image: {
    src: article.image,
    alt: article.title,
    loading: 'lazy' as const,
  },
  badge: {
    label: article.tags[0],
    color: 'neutral' as const,
    variant: 'subtle' as const,
    class: 'blog-accent-badge',
  },
  authors: [{
    name: article.author.name,
    description: article.author.role,
    avatar: {
      src: article.author.avatar,
      alt: article.author.name,
    },
  }],
  to: `/blog/${article.slug}`,
  class: 'overflow-hidden',
})))

const dateFormatter = computed(() => new Intl.DateTimeFormat(
  locale.value === 'pl' ? 'pl-PL' : 'en-US',
  {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  },
))

const formatDate = (date?: string | Date) => date
  ? dateFormatter.value.format(new Date(date))
  : ''

useSeoMeta({
  title: 'Blog — Przemek Kowalczyk',
  description: () => t('blogSeoDescription'),
  ogTitle: 'Blog — Przemek Kowalczyk',
  ogDescription: () => t('blogSeoDescription'),
  ogType: 'website',
  ogUrl: 'https://pkowalczyk.dev/blog',
})
</script>

<style scoped>
.blog-page {
  --blog-accent: green;
  --blog-accent-hover: seagreen;
  --blog-accent-soft: aliceblue;
  --blog-glow: rgba(66, 220, 255, 0.4);
  --blog-ring: rgba(46, 139, 87, 0.18);
  background:
    radial-gradient(circle at 12% 0%, var(--blog-glow), transparent 32rem),
    var(--ui-bg);
}

:global(html.dark .blog-page) {
  --blog-accent: #c0b6a0;
  --blog-accent-hover: rgba(255, 253, 242, 0.72);
  --blog-accent-soft: rgba(192, 182, 160, 0.12);
  --blog-glow: rgba(255, 253, 242, 0.18);
  --blog-ring: rgba(192, 182, 160, 0.2);
}

.blog-eyebrow {
  color: var(--blog-accent);
}

.blog-accent-badge,
.blog-posts :deep(.blog-accent-badge) {
  border-color: color-mix(in srgb, var(--blog-accent) 38%, transparent);
  background: var(--blog-accent-soft);
  color: var(--blog-accent);
}

.blog-hero {
  position: relative;
  overflow: hidden;
}

.blog-hero::after {
  position: absolute;
  top: -13rem;
  right: -8rem;
  width: 32rem;
  height: 32rem;
  border: 1px solid var(--blog-ring);
  border-radius: 9999px;
  box-shadow:
    0 0 0 5rem color-mix(in srgb, var(--blog-ring) 28%, transparent),
    0 0 0 10rem color-mix(in srgb, var(--blog-ring) 18%, transparent);
  content: '';
  pointer-events: none;
}

.gradient-text {
  display: block;
  background: linear-gradient(100deg, var(--blog-accent-hover) 5%, var(--blog-accent) 48%, var(--blog-accent-hover) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.blog-posts :deep(article) {
  min-height: 25rem;
  background: color-mix(in srgb, var(--ui-bg) 88%, transparent);
  box-shadow: 0 24px 80px rgba(2, 6, 23, 0.08);
}

.blog-posts :deep([data-slot='header']) {
  height: 100%;
  min-height: 20rem;
  aspect-ratio: auto;
}

.blog-posts :deep([data-slot='body']) {
  padding: 2rem;
}

@media (max-width: 1023px) {
  .blog-hero::after {
    opacity: 0.45;
  }

  .blog-posts :deep(article) {
    min-height: 0;
  }

  .blog-posts :deep([data-slot='header']) {
    min-height: 0;
    aspect-ratio: 16 / 9;
  }
}
</style>
