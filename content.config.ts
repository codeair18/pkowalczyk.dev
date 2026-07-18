import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: z.object({
        locale: z.enum(['pl', 'en']),
        slug: z.string(),
        date: z.string(),
        tags: z.array(z.string()).default([]),
        image: z.string(),
        author: z.object({
          name: z.string(),
          role: z.string(),
          avatar: z.string(),
        }),
      }),
    }),
  },
})
