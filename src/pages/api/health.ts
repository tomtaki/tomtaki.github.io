import type { APIRoute } from 'astro';

// Runs on the server rather than at build time. Railway uses it as a health
// check, and it doubles as the template for future endpoints behind live essays.
export const prerender = false;

export const GET: APIRoute = () =>
  new Response(JSON.stringify({ ok: true }), {
    headers: { 'content-type': 'application/json' },
  });
