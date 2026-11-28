# Status

Living handoff for humans and agents. Keep under ~80 lines: prune done items, append decisions. Public repo: no secrets, tokens, account IDs, or private emails.

_Last updated: 2026-11-28_

## Current state
- **Site:** single static page (`index.html`, `style.css`, `main.js`). Live at https://dana-engineering-portfolio.vercel.app
- **Deploy:** Vercel, Git-connected. `main` = Production; branches/PRs = Preview. Previews are login-protected (Vercel Authentication, covers previews + per-deployment production URLs; the main production domain is public).
- **GitHub:** public repo, `protect-main` ruleset (PR required, linear history, no force-push, no deletion, required checks `lighthouse` and `status-updated`). Secret scanning + push protection on.
- **CI:** `.github/workflows/lighthouse.yml` runs LHCI on `/index.html` only (desktop preset): Performance ≥ 90; Accessibility, Best Practices, SEO ≥ 95.
- **Status check:** `.github/workflows/status.yml` (`status-updated`) fails a PR that changes non-doc files without touching this file. Docs/markdown-only PRs pass; add the `skip-status` label for a PR that changes nothing recorded here.
- **Security:** `vercel.json` headers. CSP is `'self'` only, no `unsafe-inline`; fonts, cover, and libraries are self-hosted.
- **SEO/GEO:** title/description, canonical, OG/Twitter (`summary`, no image yet), JSON-LD `Person` (no email), `robots.txt`, `sitemap.xml`, `llms.txt`.
- **Search Console:** URL-prefix property verified via `google44666976bef06fc8.html` (never delete it). `sitemap.xml` submitted 2026-11-28; first status was "Couldn't fetch" although the file serves 200 and is valid XML.

## Decisions
- 2026-11-27: PR-only workflow, squash merge, one topic per PR; branch names `type/short-desc`, Conventional Commits.
- 2026-11-27: self-host everything and keep CSS/JS out of the HTML, so new libraries never require CSP edits.
- 2026-11-27: mobile Lighthouse ~61 was measurement noise (same code scored 77–100 under machine load); not a code problem, no mobile gate.
- 2026-11-28: GitHub "keep email private" + "block pushes that expose my email" are on.
- 2026-11-28: repo renamed `manifesto` → `dana-portfolio` (GitHub redirects the old URL). The Vercel project keeps its own name, `dana-engineering-portfolio`; the site URL is unchanged.
- 2026-11-28: STATUS.md is enforced by the `status-updated` check (required in the ruleset since 2026-11-28), because convention alone is not enforced.
- Domain change is a grep-and-replace of the vercel.app URL; steps in README. Professional email will move to the custom domain then.

## Open / next
1. Recheck Search Console sitemap status (a day or two). If still "Couldn't fetch", read the detailed report.
2. OG image (1200×630): owner is designing it. Then add `og:image`, switch `twitter:card` to `summary_large_image`.
3. Content phase (the real portfolio value): per-project case studies, Experience & Skills, strong contact/CTA. Needs owner input first: target role(s), provable impact numbers (Farmacare/Samsung/Uxcel), NDA limits, single page vs separate pages.
4. Optional: request indexing for `/` in Search Console; custom domain.

## When the official domain arrives (align everything)
1. Vercel: add the domain, set it primary, 301-redirect the old `vercel.app` URL to it. Decide then whether to rename the Vercel project to match `dana-portfolio`.
2. Code (one PR): replace the vercel.app URL in `index.html` (canonical, `og:url`, JSON-LD), `robots.txt`, `sitemap.xml`; swap the footer email to the domain address.
3. Search Console: add a Domain property (DNS TXT), resubmit `sitemap.xml`; keep the old property to watch the redirect.
4. Profiles: update LinkedIn, GitHub, Medium and any link to the old URL or repo name.
5. Re-run Lighthouse CI and check headers; update this file.

## Gotchas
- `gh pr merge` may print a git error about `main` being checked out in another worktree; the merge still succeeds. Verify with `gh pr view <n> --json state`.
- Deleting a PR's base branch auto-closes stacked child PRs; recreate against `main`.
- LHCI `staticDistDir` audits every `.html` file; keep `collect.url` limited to `/index.html` (the Google verification file would fail it).
- Check Previews with `vercel curl <path> --deployment <url>` (they sit behind login).
- Lighthouse numbers on a busy laptop are noisy; trust CI runners.
- Don't `git add -A` blindly; `.lighthouseci/` is ignored but check `git status` first.
