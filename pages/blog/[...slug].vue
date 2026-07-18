<template>
  <div class="article-page min-h-screen">
    <BlogHeader />

    <main v-if="article">
      <section class="article-hero border-b border-default/70">
        <UContainer class="max-w-7xl px-6 py-12 sm:py-16 lg:px-8 lg:py-20">
          <UBreadcrumb
            :items="breadcrumbs"
            color="neutral"
            class="mb-10"
          />

          <div class="mb-5 flex flex-wrap items-center gap-2 text-sm text-muted">
            <UBadge
              :label="article.tags[0]"
              color="neutral"
              variant="subtle"
              class="blog-accent-badge"
            />
            <span aria-hidden="true">·</span>
            <time :datetime="article.date">{{ formattedDate }}</time>
          </div>

          <h1 class="max-w-5xl text-3xl font-bold tracking-tight text-highlighted sm:text-5xl lg:text-6xl">
            {{ article.title }}
          </h1>

          <p class="mt-6 max-w-4xl text-lg leading-8 text-muted sm:text-xl">
            {{ article.description }}
          </p>

          <div class="mt-8 flex items-center gap-3">
            <UAvatar
              :src="article.author.avatar"
              :alt="article.author.name"
              size="lg"
            />
            <div>
              <p class="font-semibold text-highlighted">{{ article.author.name }}</p>
              <p class="text-sm text-muted">{{ article.author.role }}</p>
            </div>
          </div>
        </UContainer>
      </section>

      <UContainer class="max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
        <img
          :src="article.image"
          :alt="article.title"
          width="1200"
          height="675"
          class="article-cover w-full rounded-2xl border border-default object-cover shadow-2xl"
        >

        <div class="mt-12 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16">
          <article class="article-content min-w-0">
            <ContentRenderer :value="article" />

            <USeparator class="my-12" />

            <UCard class="author-card overflow-hidden">
              <div class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div class="flex items-center gap-4">
                  <UAvatar
                    :src="article.author.avatar"
                    :alt="article.author.name"
                    size="2xl"
                  />
                  <div>
                    <p class="text-lg font-semibold text-highlighted">{{ t('blogSimilarProblem') }}</p>
                    <p class="mt-1 text-sm text-muted">{{ t('blogSimilarProblemDescription') }}</p>
                  </div>
                </div>
                <UButton
                  to="mailto:kontakt@pkowalczyk.dev"
                  :label="t('blogWriteToMe')"
                  icon="i-ph-envelope"
                  color="success"
                  variant="solid"
                  class="shrink-0"
                />
              </div>
            </UCard>

            <UButton
              to="/blog"
              :label="t('blogBackToArticles')"
              icon="i-ph-arrow-left"
              color="neutral"
              variant="link"
              class="mt-8"
            />
          </article>

          <aside class="order-first lg:order-none">
            <UContentToc
              :links="tocLinks"
              :title="t('blogTocTitle')"
              color="success"
              highlight-color="success"
              highlight
            />
          </aside>
        </div>
      </UContainer>
    </main>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { locale, t } = useI18n()

const articleSlug = computed(() => {
  return Array.isArray(route.params.slug)
    ? route.params.slug.join('/')
    : route.params.slug
})

const { data: article } = await useAsyncData(
  () => `blog-article-${articleSlug.value}-${locale.value}`,
  () => queryCollection('blog')
    .where('slug', '=', articleSlug.value)
    .where('locale', '=', locale.value as 'pl' | 'en')
    .first(),
  { watch: [articleSlug, locale] },
)

if (!article.value) {
  throw createError({
    statusCode: 404,
    statusMessage: t('blogNotFound'),
  })
}

const dateFormatter = computed(() => new Intl.DateTimeFormat(
  locale.value === 'pl' ? 'pl-PL' : 'en-US',
  {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  },
))

const formattedDate = computed(() => dateFormatter.value.format(new Date(article.value!.date)))

const breadcrumbs = computed(() => [
  { label: 'Blog', icon: 'i-ph-article', to: '/blog' },
  { label: article.value!.title },
])

const tocLinks = computed(() => article.value?.body?.toc?.links ?? [])

useSeoMeta({
  title: () => `${article.value?.title} — Przemek Kowalczyk`,
  description: () => article.value?.description,
  ogTitle: () => article.value?.title,
  ogDescription: () => article.value?.description,
  ogImage: () => `https://pkowalczyk.dev${article.value?.image}`,
  ogType: 'article',
  ogUrl: () => `https://pkowalczyk.dev/blog/${articleSlug.value}`,
  articlePublishedTime: () => article.value?.date,
})
</script>

<style scoped>
.article-page {
  --blog-accent: green;
  --blog-accent-hover: seagreen;
  --blog-accent-soft: aliceblue;
  --blog-glow: rgba(66, 220, 255, 0.32);
  background:
    radial-gradient(circle at 15% 0%, var(--blog-glow), transparent 32rem),
    var(--ui-bg);
}

:global(html.dark .article-page) {
  --blog-accent: #c0b6a0;
  --blog-accent-hover: rgba(255, 253, 242, 0.72);
  --blog-accent-soft: rgba(192, 182, 160, 0.12);
  --blog-glow: rgba(255, 253, 242, 0.16);
}

.article-hero {
  background: linear-gradient(180deg, color-mix(in srgb, var(--blog-glow) 42%, transparent), transparent);
}

.blog-accent-badge {
  border-color: color-mix(in srgb, var(--blog-accent) 38%, transparent);
  background: var(--blog-accent-soft);
  color: var(--blog-accent);
}

.article-cover {
  background: #071611;
  box-shadow: 0 24px 70px color-mix(in srgb, var(--blog-accent) 12%, transparent);
}

.article-content {
  font-size: 1.0625rem;
  line-height: 1.85;
}

.article-content :deep(h2) {
  margin-top: 3.75rem;
  scroll-margin-top: 6rem;
  font-size: 2rem;
  line-height: 1.2;
  letter-spacing: -0.025em;
}

.article-content :deep(h3) {
  margin-top: 2.75rem;
  scroll-margin-top: 6rem;
  font-size: 1.45rem;
  line-height: 1.3;
}

.article-content :deep(p),
.article-content :deep(ul),
.article-content :deep(ol) {
  margin-top: 1.35rem;
}

.article-content :deep(pre) {
  margin-block: 1.75rem;
  border: 1px solid var(--ui-border);
  border-radius: 0.9rem;
  box-shadow: 0 18px 50px rgba(2, 6, 23, 0.14);
}

.article-content :deep(code:not(pre code)) {
  border: 1px solid var(--ui-border);
  border-radius: 0.35rem;
  background: var(--ui-bg-elevated);
  padding: 0.12rem 0.35rem;
  font-size: 0.88em;
}

.author-card {
  background:
    linear-gradient(120deg, color-mix(in srgb, var(--blog-glow) 40%, transparent), transparent 55%),
    var(--ui-bg-elevated);
}

@media (max-width: 639px) {
  .article-content {
    font-size: 1rem;
  }

  .article-content :deep(h2) {
    font-size: 1.65rem;
  }
}
</style>
