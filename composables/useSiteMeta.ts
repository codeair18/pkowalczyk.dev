import { toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'

type Locale = 'pl' | 'en'

function ogLocaleFor(locale: Locale) {
  return locale === 'pl' ? 'pl_PL' : 'en_US'
}

// nuxt-og-image's bundled OG-image renderer only ships a Latin-only font,
// so Polish diacritics (ą ć ę ł ń ó ś ź ż) render as missing-glyph boxes in
// the generated social-preview PNG. The real page <title>, og:title/
// description meta, and JSON-LD below are unaffected — they're real text,
// not rasterized — so only the strings fed into the OG image template are
// deaccented here, trading a minor cosmetic simplification in the
// auto-generated card for a render that never silently breaks.
const POLISH_DIACRITICS: Record<string, string> = {
  ą: 'a', ć: 'c', ę: 'e', ł: 'l', ń: 'n', ó: 'o', ś: 's', ź: 'z', ż: 'z',
  Ą: 'A', Ć: 'C', Ę: 'E', Ł: 'L', Ń: 'N', Ó: 'O', Ś: 'S', Ź: 'Z', Ż: 'Z',
}

function deaccent(value: string | undefined): string | undefined {
  return value?.replace(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, char => POLISH_DIACRITICS[char])
}

interface StaticPageSeoOptions {
  title: MaybeRefOrGetter<string>
  description: MaybeRefOrGetter<string>
  path: string
  ogType?: 'website' | 'article'
}

export function useStaticPageSeo(opts: StaticPageSeoOptions) {
  const config = useRuntimeConfig()
  const { locale } = useI18n()
  const siteUrl = config.public.siteUrl
  const siteName = config.public.siteName

  useSeoMeta({
    title: () => `${toValue(opts.title)} — ${siteName}`,
    description: () => toValue(opts.description),
    ogTitle: () => toValue(opts.title),
    ogDescription: () => toValue(opts.description),
    ogType: opts.ogType ?? 'website',
    ogUrl: () => `${siteUrl}${opts.path}`,
    ogSiteName: siteName,
    ogLocale: () => ogLocaleFor(locale.value as Locale),
    twitterCard: 'summary_large_image',
    twitterTitle: () => toValue(opts.title),
    twitterDescription: () => toValue(opts.description),
  })

  defineOgImage('Page', {
    title: () => deaccent(toValue(opts.title)),
    description: () => deaccent(toValue(opts.description)),
  })
}

interface ArticleLike {
  title: string
  description: string
  date: string
  updated?: string
  slug: string
  image: string
  tags: string[]
  author: {
    name: string
    role: string
    avatar: string
  }
}

export function useArticleSeo(article: Ref<ArticleLike | null | undefined>, path: Ref<string> | ComputedRef<string>) {
  const config = useRuntimeConfig()
  const { locale } = useI18n()
  const siteUrl = config.public.siteUrl
  const siteName = config.public.siteName

  useSeoMeta({
    title: () => article.value ? `${article.value.title} — ${siteName}` : siteName,
    description: () => article.value?.description,
    ogTitle: () => article.value?.title,
    ogDescription: () => article.value?.description,
    ogType: 'article',
    ogUrl: () => `${siteUrl}${path.value}`,
    ogSiteName: siteName,
    ogLocale: () => ogLocaleFor(locale.value as Locale),
    twitterCard: 'summary_large_image',
    twitterTitle: () => article.value?.title,
    twitterDescription: () => article.value?.description,
    articlePublishedTime: () => article.value?.date,
    articleModifiedTime: () => article.value?.updated ?? article.value?.date,
    articleAuthor: () => article.value ? [siteUrl] : undefined,
  })

  defineOgImage('Article', {
    title: () => deaccent(article.value?.title),
    description: () => deaccent(article.value?.description),
    tag: () => deaccent(article.value?.tags?.[0]),
    author: () => deaccent(article.value?.author?.name),
    avatar: () => article.value?.author?.avatar,
    date: () => article.value?.date,
  })

  useHead({
    script: () => article.value
      ? [{
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: article.value.title,
            description: article.value.description,
            image: `${siteUrl}${article.value.image}`,
            datePublished: article.value.date,
            dateModified: article.value.updated ?? article.value.date,
            author: {
              '@type': 'Person',
              name: article.value.author.name,
              sameAs: 'https://www.linkedin.com/in/pekowal',
            },
            publisher: {
              '@type': 'Person',
              name: siteName,
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `${siteUrl}${path.value}`,
            },
          }),
        }]
      : [],
  })
}
