import { getCollection } from 'astro:content';

// Drafts are visible in `npm run dev` and never in a production build.
const visible = ({ data }: { data: { draft: boolean } }) => import.meta.env.DEV || !data.draft;

export async function getThoughts() {
  const posts = await getCollection('thoughts', visible);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getTalks() {
  const talks = await getCollection('talks', visible);
  // Undated drafts sort last.
  return talks.sort((a, b) => (b.data.date?.valueOf() ?? 0) - (a.data.date?.valueOf() ?? 0));
}

export function formatDate(date: Date, style: 'long' | 'year' = 'long') {
  return style === 'year'
    ? String(date.getUTCFullYear())
    : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}
