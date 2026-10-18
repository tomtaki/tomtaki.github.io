# tomtaki.com — plan & handoff

Context for picking up the site rebuild in a new session. `CLAUDE.md` covers how the
code works; this file covers **why**, **where things stand** and **what's next**.
Last updated: 2026-10-18.

## Goals
1. Refresh the front page (bio, current role: Principal Experience Designer at Justworks).
2. **Thoughts** — a section for writing and experiments, ranging from a captioned
   drawing to Wattenberger-style interactive essays to essays with live, server-backed parts.
3. **Talks & podcasts** — on the homepage (latest 5) until the list outgrows it, then `/talks`.
4. Bigger standalone **experiments** (heavier backends) live separately, e.g. `lab.tomtaki.com`,
   so a broken experiment can't take down the main site.

## Decisions made (and why)
| Decision | Why |
|---|---|
| Astro 7 + Svelte 5 + MDX | Markdown-first writing (matches Obsidian habits); Svelte islands for interactives; reference site is SvelteKit |
| Static by default, server endpoints opt-in (`prerender = false`) | Fast pages now, room for live components later without a re-platform |
| Railway (Hobby plan, paid) with Node adapter | One repo, one deploy, can add Postgres/storage later; needed paid plan for 2 custom domains |
| `www.tomtaki.com` canonical; bare domain 301s via `server.mjs` | One address for SEO; Railway serves both |
| One `thoughts` collection with `kind: note / essay / live` | One listing, one URL scheme, per-kind templates |
| Drafts in Obsidian (HQ), published copy in the repo | Publishing is a deliberate act; half-finished thinking stays private |
| Scrollytelling yes, scroll hijacking no | Hijacking breaks trackpads, mobile and accessibility |
| "Editorial Quiet" visual direction: Newsreader serif over Work Sans, one narrow centered column, warm neutral ground with a gold/amber accent | Chosen over two other rough directions (a personal "Studio Notebook" and a professional "Systems Grid") reviewed as a canvas artifact |
| Dropped Proxima Nova files and old GA tag | Licensing risk; Universal Analytics is dead |

## Where things stand
- **Live:** https://www.tomtaki.com on Railway from `master`. HTTPS via Let's Encrypt. GitHub Pages unpublished.
  Talks data and the Editorial Quiet redesign are merged and deployed.
- **DNS (Namecheap):** ALIAS `@` → Railway, CNAME `www` → Railway, two `_railway-verify` TXT records. MX/email records untouched.
- **Talks:** all 7 entries in `src/data/talks.yaml` are published (dates, titles and links filled in,
  several pulled straight from source pages — the LinkedIn post, designsystems.nyc's linked Speaker
  Deck, and the Jam.dev host's name).
- **Visual design:** homepage, header/footer, Thoughts and Talks listings all use the Editorial
  Quiet tokens (`src/styles/global.css`). The essay template/kit has not been restyled yet.
- **Thoughts:** two draft samples (`sample-note.md`, `sample-essay.mdx`) prove the pipeline. No real posts yet.
- **Essay kit:** `Aside`, `Figure`, `Scrubber` (+ `TeaTimer` example) in `src/components/kit/` — still
  on the old tokens' CSS vars, so they inherit the new colors/fonts automatically, but haven't been
  reviewed against the new direction.

## Open items
Decided: add a separate **"Mentioned in"** line/section (not part of `talks.yaml`) for press/book
mentions — Tom is mentioned in Catt Small's book *The Staff Designer*, published December 2025.
Not yet built; needs its own schema + UI.

### Decisions still open
- Pilot essay topic — its first interaction should define what the kit needs next.
- Whether to add a `featured` flag to pin a talk on the homepage regardless of date.
- Whether the essay kit (`Aside`, `Figure`, `Scrubber`) needs direct restyling for Editorial Quiet
  beyond inheriting the token swap.

## Roadmap
1. ~~Finish talks data → merge `talks-list`.~~ **Done** — merged and live.
2. **First real `note`** (a drawing + caption) — tests the publishing workflow end to end.
3. **Visual design pass** — ~~tokens, type, homepage layout, thoughts/talks listings~~ done;
   essay template still open.
4. **Pilot essay** + grow the kit only as it demands (sticky scrollytelling container is the likely next part).
5. **First live component** — only when an essay needs it. Build the endpoint pattern once:
   key server-side, per-visitor rate limit, spend cap, static fallback.
6. **Later, own project:** reader upload board (needs storage, DB and moderation — start with a review queue).

## Risks to keep in view
- **Cost per essay** is the real constraint, not tech. Aim for 1–2 signature interactions per piece; plain essays are allowed.
- **Notes must stay effortless** or they won't get posted.
- **Live components rot** — every one ships a fallback so the essay still reads in five years.
- **Public prompt boxes** are free LLM access for strangers without limits and caps.

## Reference
- Inspiration: https://wattenberger.com/thoughts/ai-is-still-in-its-terminal-era/ — SvelteKit; short essay
  built on three historical beats (Sketchpad 1963, VisiCalc 1979, Xerox Star 1981), each pairing a period
  video with a live demo of one running example (planning a day in Taipei). Accessible controls
  (aria labels, keyboard drag). Lesson: one worked example carries the whole essay.

## Working on the site
```sh
git clone https://github.com/tomtaki/tomtaki.github.io
cd tomtaki.github.io
npm install               # needs Node >= 22.22
npm run dev               # http://localhost:4321, drafts visible
```
Work on a branch; merging to `master` deploys to production automatically.
