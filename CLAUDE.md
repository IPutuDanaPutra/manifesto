# Working agreement

## Session protocol (survives context compaction)

- At session start, and again after any context compaction, read this file and `docs/STATUS.md` before acting. They are the source of truth, not chat memory.
- When a decision is made, a task finishes, or a gotcha is learned, update `docs/STATUS.md` in the same PR as the change. Keep it short; prune done items. The `status-updated` check enforces this; use the `skip-status` label only when nothing recorded there changed.
- This repo is public: never put secrets, tokens, account/project IDs, or private emails in any file, including docs.
- Outward-facing or hard-to-reverse actions (merge, settings changes, publishing) need the owner's explicit go-ahead, even if a similar one was approved earlier.

## Rules

Next.js (App Router) + React 19 + TypeScript strict + Tailwind 4, npm. Vercel deploys from GitHub: `main` = Production, every other branch/PR = Preview.

- Never commit or push directly to `main`. The `protect-main` ruleset enforces PR-only, linear history, no force-push and no deletion; pushes are rejected.
- Work on a branch, push it, check the Preview URL, then open a PR and merge. Merging is what ships to production.
- Never run `vercel deploy --prod` or `vercel --prod`. Production deploys only come from merging to `main`.
- Never commit secrets. `.env*` and `.vercel` are gitignored; keep it that way.
- Run `npm run typecheck && npm run lint && npm run format:check && npm run build` before pushing. TypeScript stays `strict`; no `any`, no `@ts-ignore`.
- Server Components by default; add `"use client"` only for interactivity. Keep client JS small (Lighthouse Performance gate is 90).
- CSP is strict (nonce in `proxy.ts`, no `unsafe-inline`). Never add inline `style=""`, inline scripts, or external hosts; self-host assets under `public/assets/`. Only `<a href>` links go off-site.
- Pin versions of beta/fast-moving libraries exactly (`@ui-sdk/*`). Keep `typescript` at `~6.0` until typescript-eslint supports 7.
- The production URL lives only in `lib/site.ts`.
