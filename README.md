# dana-portfolio

Personal portfolio: projects, writing, and notes on engineering, AI, and design. Next.js (App Router) · React 19 · TypeScript (strict) · Tailwind CSS 4.

## Run locally

```
npm ci
npm run dev        # http://localhost:3000
```

Checks (all run in CI): `npm run typecheck`, `npm run lint`, `npm run format:check`, `npm run build`.

## Structure

- `app/` — routes, layout/metadata, `globals.css` (Tailwind theme tokens + component styles), `robots.ts`, `sitemap.ts`
- `components/` — UI. Server Components by default; only interactive ones (`avatar`, `cursor-label`, `section-heading`) are Client Components
- `lib/site.ts` — the production URL and site metadata (one place to change on a domain move)
- `lib/content.ts` — typed project/writing/book data
- `proxy.ts` — per-request CSP nonce (strict `script-src`, no `unsafe-inline`)
- `public/` — static assets served as-is: `assets/` (avatar frames, fonts, logos, favicon), `llms.txt`, the Search Console verification file (keep it)

## Workflow

`main` is production (Vercel auto-deploys it) and is protected by the `protect-main` ruleset (PR required, linear history, no force-push, required checks). Flow:

1. Branch off `main`, commit, push.
2. Open the Preview URL Vercel creates for the branch and check it.
3. Open a PR (template in `.github/`) and merge. The merge ships to production.

Rollback: Vercel dashboard → Deployments → Instant Rollback. Agent rules live in `CLAUDE.md`; project state in `docs/STATUS.md`.

## Quality gates

PRs run `CI` (typecheck, lint, format, build), `Lighthouse` (built app, desktop preset: Performance ≥ 90; Accessibility / Best Practices / SEO ≥ 95), and `Status` (non-doc changes must update `docs/STATUS.md`). Run Lighthouse locally with `npm run build && npx -y @lhci/cli@0.15.x autorun`.

## Changing the domain

Change `SITE_URL` in `lib/site.ts`; canonical, Open Graph, JSON-LD, `robots` and `sitemap` all derive from it. Then follow the checklist in `docs/STATUS.md`. OG image: add `openGraph.images` in `app/layout.tsx` and switch `twitter.card` to `summary_large_image` once a 1200×630 image exists in `public/assets/`.
