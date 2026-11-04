# Handoff to Antigravity: Newseed rework

**From:** Claude Code session (planning + review) · **Date:** 2026-11-05
**Read first:** [README.md](README.md) (rules), then the PRD for your current task.

## What this project is
elev (an AI meeting-scheduler SaaS landing page) is being turned into **Newseed**, an AI automation and growth agency site at newseedglobal.com. It's bilingual EN/ID with a switch. **The design and the motion graphics stay exactly as they are**; only the content and the mockup scenes change to automation stories.

## Status

| # | Task | Status |
|---|------|--------|
| 00 | Copy deck EN/ID | ✅ Approved by user |
| 00b | Slot mapping + mockup copy | ✅ Approved by user (Q2–Q5 resolved with defaults, see 00b header) |
| 01 | i18n foundation (`src/i18n.tsx`, Navbar switch, `/id`, `vercel.json`) | ✅ Built and reviewed |
| 02 | Hero + LogoTicker | ✅ Built and reviewed (motion parity confirmed, lint & build pass) |
| 03 | Services deck + Integrations | ⬜ **Start here** (after 02) |
| 04 | Case studies + 2 demos | ⬜ |
| 05 | ROI, Engagement, FAQ, Process/App shell, Footer (5a–5e) | ⬜ |
| 06 | SEO, bilingual meta, dead-code cleanup | ⬜ Last |

Run the tasks **in order, one at a time**. Finish and verify one before starting the next.

## PRD 02 result
_(filled in by Claude after review; see bottom of this file)_

## How to run each task (the loop)
1. Read `README.md` (global rules), the task's PRD, and the 00 / 00b sections the PRD points to. Copy text **verbatim** from 00/00b. Don't rewrite or translate copy yourself; if a string is missing, flag it.
2. Implement **only** the files the PRD lists. Make targeted edits; the big files (MultiProductHero ~1700 lines, MinimalistMotionStage ~1700) must not be rewritten wholesale.
3. Verify:
   - `npm run lint` and `npm run build` pass.
   - Run the PRD's grep check; no leftover `elev`, `Velie`, `Stripe` or `Meeting` text in touched files. Asset paths like `/icon-velie-3d.png` are fine.
   - Run `npm run dev` (port **3001**) and check `/` (EN) and `/id` (ID) at **1440px and 390px**. Look for no overflow, no console errors, and **animations with the same rhythm as before**.
   - Diff review: `git diff <baseline> -- <files>` (baselines below). Confirm that no duration, delay, spring, `layoutId`, timer or layout class changed unless the PRD allows it.
4. Mark the task ✅ in the table above with a one-line note of any deviation.

## Motion parity: the rule people break most
The README has the full list. In short:
- Never edit `src/motion/**`, `LiquidOrb.tsx`, `liquid-orb-shader.ts`, `GooeySvgDefs.tsx`, `GlassSurface.*` or `Folder.*`.
- In the files you do touch, keep every `setTimeout`/`setInterval` value, every spring config and every `layoutId` name, along with `AnimatePresence` keys, `Reveal`/`ImageReveal`/`StaggerGroup`/`PerspectiveScrollTilt` props and grid/size classes.
- Each PRD has a "Must not change" list. Treat it as a checklist during diff review.

## Gotchas found during inventory
- `src/index.css` sets every `--font-weight-*` to 500, so `font-semibold` and `font-bold` look the same as `font-medium`. Hierarchy comes from size and colour. Don't "fix" this.
- The Vite `@` alias points to the project root, but tsconfig maps `@/*` to `src/*`. Don't import `src/components/ui/button.tsx` or `ui/integrations-3.tsx`; they'd break the Vite build. PRD 06 deletes them.
- `landingData.ts` has entries marked `// ID TODO`. Their ID copy is in **00b §J**. Fill them when the task that uses them runs.
- Language state comes from `useLang()` in `src/i18n.tsx`. Use `t(value)` for every `{ en, id }` value. Store keys, not strings, in component state, so a language switch re-renders correctly (important for the demo chat in PRD 04).
- Number formatting: use `Intl.NumberFormat` / `toLocaleString` with `en-US` or `id-ID` based on `lang`. The $360.00 quote in the stage stays USD in both languages.
- Navbar uses the `lg` breakpoint, not `md`. That was a deliberate change in PRD 01.

## Baselines for diff review (git objects, not branches)
- Before PRD 01: `f4379d34de731ac0f4ec182f623855ff6b6f5f5e`
- Before PRD 02: `ad293ce03236f009864d7639d33fbd36990bc718`
- Easier from now on: **commit after each task**, e.g. `feat(newseed): PRD 03 services + integrations`. Then `git diff HEAD` is your review. The working tree also contains older uncommitted design work from before this rework. Don't revert it.

## Still open with the user (don't invent answers)
- Footer contact email: keep the email row hidden until it's provided.
- Consent for the CS1 quote (music school): keep it hidden (`confirm: true`).
- Demo chat fictional price "Rp 450.000/month" (PRD 04): leave the `[CONFIRM]` code comment.
- A Newseed logo file, if one arrives later, swaps into `/elev-infinity-logo.png` usages and the OG image.

## Antigravity setup tips
- No per-agent model routing in Antigravity. Load the matching specialist skill instead:
  - **PRD 02, 03, 05:** `agency-engineering-frontend-developer` + `make-interfaces-feel-better`. A fast model is fine; these are content swaps.
  - **PRD 04** (new UI + interaction): `agency-engineering-frontend-developer` + `frontend-design` / `impeccable`. Use a stronger model.
  - **PRD 06:** `seo-audit` + `agency-engineering-frontend-developer`.
  - **Review** after each task: `code-review-and-quality`.
- Project rules also apply: `AGENTS.md` (antislop, ponytail, tactile `active:scale-[0.96]`, no `transition: all`).
