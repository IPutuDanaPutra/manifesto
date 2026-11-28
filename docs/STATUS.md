# Status

Living handoff for humans and agents. Keep under ~80 lines: prune done items, append decisions. Public repo: no secrets, tokens, account IDs, or private emails.

_Last updated: 2026-11-28_

## Current state
- **Stack (in migration PR, not yet on main):** Next.js 16 App Router, React 19, TypeScript 6.0 strict, Tailwind 4, npm. Production is still the static HTML site until the migration PR merges.
- **Site:** https://dana-engineering-portfolio.vercel.app. Deploy: Vercel, Git-connected, `vercel.json` sets `framework: nextjs`. `main` = Production; branches/PRs = Preview. Previews are login-protected.
- **GitHub:** public repo `dana-portfolio`, `protect-main` ruleset (PR required, linear history, no force-push, no deletion, required checks `lighthouse` and `status-updated`; add `check` after the migration merges). Secret scanning + push protection on.
- **CI:** `ci.yml` (`check`: typecheck, lint, format, build), `lighthouse.yml` (LHCI on the built app, desktop: Performance ≥ 90; Accessibility, Best Practices, SEO ≥ 95), `status.yml` (`status-updated`: non-doc changes must update this file; `skip-status` label opts out).
- **Security:** strict CSP via per-request nonce in `proxy.ts` (no `unsafe-inline`), plus nosniff / Referrer-Policy / Permissions-Policy / X-Frame-Options in `next.config.ts`. Because of the nonce the page is rendered per request (`Cache-Control: no-store`), not served from CDN cache.
- **SEO/GEO:** metadata API (title, description, canonical, OG/Twitter `summary`, no image yet), JSON-LD `Person` (no email), `robots.ts`, `sitemap.ts`, `public/llms.txt`. All URLs derive from `lib/site.ts`.
- **Search Console:** URL-prefix property verified via `public/google44666976bef06fc8.html` (never delete it). `sitemap.xml` submitted 2026-11-28; first status was "Couldn't fetch" although the file served 200.

## Decisions
- 2026-11-27: PR-only workflow, squash merge, one topic per PR; branch names `type/short-desc`, Conventional Commits.
- 2026-11-27: self-host everything and keep CSS/JS out of the HTML, so new libraries never require CSP edits.
- 2026-11-27: mobile Lighthouse ~61 was measurement noise (same code scored 77–100 under machine load); not a code problem, no mobile gate.
- 2026-11-28: GitHub "keep email private" + "block pushes that expose my email" are on.
- 2026-11-28: repo renamed `manifesto` → `dana-portfolio` (GitHub redirects the old URL). The Vercel project keeps its own name, `dana-engineering-portfolio`; the site URL is unchanged.
- 2026-11-28: STATUS.md is enforced by the `status-updated` check (required in the ruleset since 2026-11-28), because convention alone is not enforced.
- 2026-11-28: migrating to Next.js + React + TypeScript + Tailwind for DX and richer UX (UI SDK, command menu, MDX case studies). Next.js chosen over Vite/Astro; Tailwind chosen over keeping plain CSS (existing component CSS is kept in `globals.css` and converted gradually). `typescript` pinned to ~6.0 (typescript-eslint supports <6.1).
- 2026-11-28: CSP stays strict via nonce. Rule: if Preview TTFB rises materially (>~150 ms) or Performance stays below the 90 gate, fall back to static HTML + `'unsafe-inline'` for scripts and record why here.
- Professional email will move to the custom domain when it arrives (footer in `app/page.tsx`).

## Open / next
1. Recheck Search Console sitemap status (a day or two). If still "Couldn't fetch", read the detailed report.
2. OG image (1200×630): owner is designing it. Then add `og:image`, switch `twitter:card` to `summary_large_image`.
3. Content phase (the real portfolio value): per-project case studies, Experience & Skills, strong contact/CTA. Needs owner input first: target role(s), provable impact numbers (Farmacare/Samsung/Uxcel), NDA limits, single page vs separate pages.
4. Optional: request indexing for `/` in Search Console; custom domain.

## When the official domain arrives (align everything)
1. Vercel: add the domain, set it primary, 301-redirect the old `vercel.app` URL to it. Decide then whether to rename the Vercel project to match `dana-portfolio`.
2. Code (one PR): change `SITE_URL` in `lib/site.ts` (everything derives from it); swap the footer email to the domain address.
3. Search Console: add a Domain property (DNS TXT), resubmit `sitemap.xml`; keep the old property to watch the redirect.
4. Profiles: update LinkedIn, GitHub, Medium and any link to the old URL or repo name.
5. Re-run Lighthouse CI and check headers; update this file.

## Migration findings
- Production's old HTML had `<svg hidden>` for the icon sprite; `hidden` does not apply to SVG, so it rendered as a 300×150 box and pushed the whole page ~158 px down. The port hides it properly, so content now starts ~158 px higher. Everything else matched within sub-pixel text rendering. Owner to decide whether to add deliberate top spacing.
- Next.js emits inline scripts, so `script-src 'self'` alone breaks hydration; the nonce approach was verified in a real browser (no CSP violations, interactions work).
- Next.js adds ~136 KB JS; local Lighthouse under load gave Performance 58–89 (noisy machine); CI runner results decide.

## Gotchas
- `gh pr merge` may print a git error about `main` being checked out in another worktree; the merge still succeeds. Verify with `gh pr view <n> --json state`.
- Deleting a PR's base branch auto-closes stacked child PRs; recreate against `main`.
- LHCI runs against `next start` after `npm run build`; no static dir anymore.
- Paradev browser panes are throttled like background tabs (rAF/timers slow); test animations with your own headless Chrome over CDP.
- Tailwind Preflight differs from browser defaults (inline `img` becomes block, links lose underline); fixes live at the top of `app/globals.css`.
- Check Previews with `vercel curl <path> --deployment <url>` (they sit behind login).
- Lighthouse numbers on a busy laptop are noisy; trust CI runners.
- Don't `git add -A` blindly; `.lighthouseci/` is ignored but check `git status` first.
