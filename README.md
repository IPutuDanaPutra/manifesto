# manifesto

A single-page personal site — projects, writing, and notes on engineering, AI, and design. No framework, no build step: plain HTML and CSS.

## Run locally

```
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Structure

- `index.html`, `style.css`, `main.js` — the site (no inline CSS/JS, so the CSP in `vercel.json` stays strict)
- `assets/fonts/` — self-hosted variable fonts (latin subset)
- `assets/avatar/` — directional portrait frames for the cursor-tracking avatar
- `assets/logos/` — brand marks shown in the status line

## Workflow

`main` is production (Vercel auto-deploys it) and is protected by the `protect-main` ruleset (PR required, linear history, no force-push). Flow:

1. Branch off `main`, commit, push.
2. Open the Preview URL Vercel creates for the branch and check it.
3. Open a PR (template in `.github/`) and merge. The merge ships to production.

Rollback: Vercel dashboard → Deployments → Instant Rollback. Agent rules live in `CLAUDE.md`.

## Quality gate

PRs run Lighthouse CI (`.github/workflows/lighthouse.yml`, `lighthouserc.json`) on the static files, desktop preset: Performance ≥ 90, Accessibility / Best Practices / SEO ≥ 95. Run locally with `npx -y @lhci/cli@0.15.x autorun`.
