// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import svelte from '@astrojs/svelte';
import node from '@astrojs/node';

// Pages are prerendered to static HTML by default. A route opts into running
// on the server (Railway) with `export const prerender = false`.
export default defineConfig({
  site: 'https://www.tomtaki.com',
  integrations: [mdx(), svelte()],
  adapter: node({ mode: 'standalone' }),
});
