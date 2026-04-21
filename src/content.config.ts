import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      category: z.string().optional(),
      author: z.string().default('Miguel Escalante'),
      draft: z.boolean().default(false),
      hero: image().optional(),
      heroAlt: z.string().optional(),
      mathjax: z.boolean().default(false),
      redirectFrom: z.array(z.string()).default([]),
    }),
});

export const collections = { posts };
