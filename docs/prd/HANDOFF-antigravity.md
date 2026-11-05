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
| 03 | Services deck + Integrations | ✅ Built and reviewed. Motion values identical; 14 logos in public/logos (Vapi = letter circle); Navbar wordmark → Newseed |
| 04 | Case studies + 2 demos | ✅ Built and reviewed. Metrics match 00 §7; demos play, reset and switch language; timers are cleaned up |
| 05 | ROI, Engagement, FAQ, Process/App shell, Footer (5a–5e) | ✅ Built and reviewed. ROI EN $16,200 / ID Rp 70.200.000 verified; console `<path d>` error fixed (FAQ motion.path `initial`) |
| 06 | SEO, bilingual meta, dead-code cleanup (+6d per-route canonical/OG) | ✅ Built and reviewed. 26 dead files and 12 deps removed; bundle smaller |

Run the tasks **in order, one at a time**. Finish and verify one before starting the next.

## PRD 02 result
Reviewed by Claude: lint and build pass, the motion diff is clean (only the allowed dead `bookingConfirmed` interval was removed), and EN and ID render at 1440px. These deviations were **accepted**:
- The primary hero CTA keeps the existing blue gradient pill.
- The calendar drops 3 leading empty cells (Nov 1 2026 is a Sunday).
- The stage caption uses `SITE.exampleCaption` in light blue.
- The logo ticker uses text wordmarks.
- The marquee renders `TOOLS.items` twice.
- Small label additions: "Total", "Active sync", "Full chat attached".

**Carry-over fixes for later tasks:**
1. **Navbar wordmark still says "elev".** Change only the text to "Newseed" and keep the logo image (00b Q3). Do it in PRD 03 as a one-line extra.
2. **Pre-existing console error** `<path> attribute d: Expected moveto ... "undefined"` (5x). It was there before this rework. It's probably the FAQ morph paths or an SVG in another section. Find the source in PRD 05 (5c) and fix the root cause without changing the morph motion.
3. In the hero at 390px, the sync-card meta lines and the "Auto-sync" badge wrap to 2 lines. It's cramped but not clipped. Leave it unless the user asks.
4. Navbar `aria-label="elev home"` should become "Newseed home". Do it in PRD 06.
5. At a 1024px viewport, the enrich demo table scrolls sideways inside its half-width card, so the last column is hidden until you scroll. It's acceptable; revisit only if the user asks.
6. `App.tsx` still passes the now-unused `onOpenAuth`/`onOpenDemo` to the hero. PRD 06 removes them.

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
- **Checkpoint commit `a8c61e6`** (made by the user) contains PRD 00–02, the docs and the earlier design work. Review each new task with `git diff HEAD`.
- From now on: **commit after each task**, e.g. `feat(newseed): PRD 03 services + integrations`. Then `git diff HEAD` is your review. The working tree also contains older uncommitted design work from before this rework. Don't revert it.

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

## Final check (2026-11-05, Claude)
- EN at 1440px: sections in order hero, services, work, integrations, roi, engagement, faq, process, then footer. No horizontal overflow, no leftover SaaS words, no console errors.
- ID at 390px: `lang=id`, ID title and meta, no element overflows the viewport, no stray EN strings, no console errors.
- Protected motion files are untouched since the start of the rework (only `LiquidOrb` `aria-label` text changed).

## Remaining for the user
- Provide the footer email and the CS1 quote consent, and confirm the demo price.
- Optionally provide a real Newseed logo and OG image.
- `npm audit`: high-severity issues in vite and source-map-js (dev server only). Fixing them needs a vite upgrade; that's a separate decision.
- Nothing after `a8c61e6` is committed yet.

## UI polish (branch `ui-polish`, 2026-11-06)
UI-A foundation, UI-B system and UI-C sections (C0–C10) are built and reviewed. PRDs, audit, research and decisions are in `docs/prd/ui/`. The motion-parity rule was relaxed by decision Q2, but no animation may be removed.
Not verified: the CSS reduced-motion block under a real OS setting, the LiquidOrb static frame (needs WebGPU), and a full keyboard-only walk of the page.
