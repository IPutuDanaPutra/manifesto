# manifesto

A single-page personal site — projects, writing, and notes on engineering, AI, and design. No framework, no build step: plain HTML and CSS.

## Run locally

```
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Structure

- `index.html` — the whole site
- `assets/avatar/` — directional portrait frames for the cursor-tracking avatar
- `assets/logos/` — brand marks shown in the status line

## Workflow

`main` is production (Vercel auto-deploys it). It is not branch-protected, so by convention nothing is pushed to it directly:

1. Branch off `main`, commit, push.
2. Open the Preview URL Vercel creates for the branch and check it.
3. Open a PR (template in `.github/`) and merge. The merge ships to production.

Rollback: Vercel dashboard → Deployments → Instant Rollback. Agent rules live in `CLAUDE.md`.
