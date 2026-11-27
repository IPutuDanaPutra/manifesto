# Working agreement

Static site, no build. Vercel deploys from GitHub: `main` = Production, every other branch/PR = Preview.

- Never commit or push directly to `main`. The `protect-main` ruleset enforces PR-only, linear history, no force-push and no deletion; pushes are rejected.
- Work on a branch, push it, check the Preview URL, then open a PR and merge. Merging is what ships to production.
- Never run `vercel deploy --prod` or `vercel --prod`. Production deploys only come from merging to `main`.
- Never commit secrets. `.env*` and `.vercel` are gitignored; keep it that way.
- Keep it dependency-free: plain HTML/CSS/JS. No inline `<style>`/`<script>`/`style=""` (CSP forbids it); put code in `style.css` / `main.js`.
- Self-host every asset (fonts, libraries, images) under `assets/`. Do not add external hosts to the CSP in `vercel.json`; only the `<a href>` links go off-site.
