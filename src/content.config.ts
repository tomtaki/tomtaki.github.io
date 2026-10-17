import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

// One collection for every kind of post, from a captioned drawing to an
// interactive essay. `kind` decides how a post is listed and laid out.
//   note  – an image and a short caption
//   essay – long-form writing, optionally with interactive components (MDX)
//   live  – an essay with at least one component that calls a server endpoint
const thoughts = defineCollection({
  loader: glob({ base: './src/content/thoughts', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        date: z.coerce.date(),
        kind: z.enum(['note', 'essay', 'live']),
        summary: z.string().optional(),
        image: image().optional(),
        imageAlt: z.string().optional(),
        draft: z.boolean().default(false),
      })
      .refine((p) => p.kind !== 'note' || (p.image && p.imageAlt), {
        message: 'A note needs an image and imageAlt',
      }),
});

// Conference talks and podcast appearances, newest first on the site.
const talks = defineCollection({
  loader: file('./src/data/talks.yaml'),
  schema: z.object({
    title: z.string(),
    event: z.string(),
    kind: z.enum(['talk', 'podcast', 'panel', 'workshop']),
    date: z.coerce.date(),
    url: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { thoughts, talks };
