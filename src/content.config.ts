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
    }),
});

const recipes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/recipes' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    created: z.coerce.date().optional(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    source: z.string().optional(),
    creator: z.string().optional(),
    originUrl: z.string().url().optional(),
    originType: z.enum(['recipe', 'creator']).optional(),
    servings: z.union([z.string(), z.number()]).optional(),
    totalTime: z.union([z.string(), z.number()]).optional(),
    calories: z.union([z.string(), z.number()]).optional(),
    protein: z.union([z.string(), z.number()]).optional(),
    carbs: z.union([z.string(), z.number()]).optional(),
    fat: z.union([z.string(), z.number()]).optional(),
    nutritionBasis: z.enum(['source_provided', 'source_provided_approximate']).optional(),
    nutritionScope: z.string().optional(),
    nutritionNote: z.string().optional(),
    brainId: z.string(),
  }),
});

export const collections = { posts, recipes };
