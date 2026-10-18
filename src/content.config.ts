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

// Conference talks, podcasts and livestreams, newest first on the site.
// `date` may be left out only while an entry is a draft.
const talks = defineCollection({
  loader: file('./src/data/talks.yaml'),
  schema: z
    .object({
      title: z.string(),
      event: z.string(),
      kind: z.enum(['talk', 'podcast', 'livestream', 'panel', 'workshop']),
      // YAML reads a bare year (2024) as a number, which Date treats as milliseconds.
      date: z.preprocess((v) => (typeof v === 'number' ? String(v) : v), z.coerce.date()).optional(),
      with: z.string().optional(),
      url: z.string().url().optional(),
      links: z.array(z.object({ label: z.string(), url: z.string().url() })).default([]),
      draft: z.boolean().default(false),
    })
    .refine((t) => t.draft || t.date, { message: 'A published talk needs a date' }),
});

export const collections = { thoughts, talks };
