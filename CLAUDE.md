# Working agreement

## Session protocol (survives context compaction)
- At session start, and again after any context compaction, read this file and `docs/STATUS.md` before acting. They are the source of truth, not chat memory.
- When a decision is made, a task finishes, or a gotcha is learned, update `docs/STATUS.md` in the same PR as the change. Keep it short; prune done items. The `status-updated` check enforces this; use the `skip-status` label only when nothing recorded there changed.
- This repo is public: never put secrets, tokens, account/project IDs, or private emails in any file, including docs.
- Outward-facing or hard-to-reverse actions (merge, settings changes, publishing) need the owner's explicit go-ahead, even if a similar one was approved earlier.

## Rules

Static site, no build. Vercel deploys from GitHub: `main` = Production, every other branch/PR = Preview.

- Never commit or push directly to `main`. The `protect-main` ruleset enforces PR-only, linear history, no force-push and no deletion; pushes are rejected.
- Work on a branch, push it, check the Preview URL, then open a PR and merge. Merging is what ships to production.
- Never run `vercel deploy --prod` or `vercel --prod`. Production deploys only come from merging to `main`.
- Never commit secrets. `.env*` and `.vercel` are gitignored; keep it that way.
- Keep it dependency-free: plain HTML/CSS/JS. No inline `<style>`/`<script>`/`style=""` (CSP forbids it); put code in `style.css` / `main.js`.
- Self-host every asset (fonts, libraries, images) under `assets/`. Do not add external hosts to the CSP in `vercel.json`; only the `<a href>` links go off-site.
