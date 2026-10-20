# tomtaki.com

Personal site for Tom Takigayama. Astro 7 + Svelte 5 + MDX, deployed to Railway
with the Node adapter. Pages are prerendered static HTML; a route only runs on the
server when it sets `export const prerender = false` (see `src/pages/api/`).

## Commands
- `npm run dev` — local dev server; drafts are visible here
- `npm run build` — production build; drafts are excluded
- `npm start` — run the built server via `server.mjs` (Railway runs this; respects `PORT`)

## Syncing between machines
Tom works on this repo from a local clone on his Mac mini and from cloud sessions
(work laptop); GitHub is the only link between them.
- At the start of a session: `git fetch` and pull the branch you're on before editing.
- At the end of a session, or before stopping at any point: commit and push, even
  unfinished work (on a branch, never `master`). Unpushed work is invisible to the
  other machine, and cloud sessions are wiped when idle.

## Content
- `src/content/thoughts/` — every post. Frontmatter `kind` is `note` (image + caption),
  `essay` (MDX, may use kit components) or `live` (essay with a server-backed component).
  `draft: true` hides a post in production.
- `src/data/talks.yaml` — talks and podcasts. Homepage shows the latest few
  (`HOME_TALK_LIMIT` in `src/pages/index.astro`) and links to `/talks` beyond that.
- Schemas live in `src/content.config.ts`.
- Social previews: `Base.astro` sets Open Graph / Twitter tags. The default image is
  `public/og.jpg` (1200×630); pages can pass their own `image` and `imageAlt`.

## Essay kit
Reusable parts for interactive essays live in `src/components/kit/`. Prefer extending
the kit over one-off components. Interactive Svelte parts need a `client:` directive
(usually `client:visible`) and must work with keyboard and `prefers-reduced-motion`.

## Rules for live (server-backed) components
- API keys stay server-side in endpoints under `src/pages/api/`; never in client code.
- Every endpoint that calls a paid API gets a per-visitor rate limit and a spend cap.
- Every live component ships a static fallback so the essay still reads if the
  backend is gone.

## Hosting
- Railway deploys `master` automatically on every push; that is production.
  Work on a branch and merge when it's ready to go live.
- Domains: `www.tomtaki.com` is canonical. `server.mjs` 301-redirects the bare
  `tomtaki.com` to www before Astro handles the request.
- DNS is at Namecheap (ALIAS on `@`, CNAME on `www`, plus `_railway-verify` TXT
  records). Leave MX and email TXT records alone.
- GitHub Pages is unpublished; the repo name is historical.
