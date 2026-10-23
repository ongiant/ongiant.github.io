import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string().trim().min(1)).default([]),
    // Only explicitly published posts are included in any public output.
    published: z.boolean().default(false),
    featured: z.boolean().default(false),
    example: z.boolean().default(false),
  }),
});

export const collections = { posts };
