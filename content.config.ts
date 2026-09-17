import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        locale: z.enum(['pl', 'en']),
        slug: z.string(),
        date: z.string(),
        updated: z.string().optional(),
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
