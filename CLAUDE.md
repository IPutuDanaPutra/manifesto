# Working agreement

Static site, no build. Vercel deploys from GitHub: `main` = Production, every other branch/PR = Preview.

- Never commit or push directly to `main`. It is unprotected on GitHub (free private repo), so this rule is the only guard.
- Work on a branch, push it, check the Preview URL, then open a PR and merge. Merging is what ships to production.
- Never run `vercel deploy --prod` or `vercel --prod`. Production deploys only come from merging to `main`.
- Never commit secrets. `.env*` and `.vercel` are gitignored; keep it that way.
- Keep it dependency-free: plain HTML/CSS/JS in `index.html` unless a change clearly needs more.
