# PRD 04: Case studies (#work) + 2 interactive demos

**Implementer:** haiku (fallback sonnet medium). This is the largest new build, so review it closely.
**Depends on:** 01, 03 (needs `#services` in place)
**Files you may touch:** `src/components/CustomerStoriesCarousel.tsx` (rewrite in place), `src/components/DemoChat.tsx` (new), `src/components/DemoEnrich.tsx` (new), `src/data/landingData.ts` (`CASE_STUDIES`, `DEMO_CHAT`, `DEMO_ENRICH`), `src/App.tsx` (render it)

## Goal
A **Work** section that shows the 4 real case studies from 00 §7, plus 2 scripted demos from 00 §8. It should look like it was always part of this site.

## Placement
In `App.tsx`, render it directly **after `TimelineFeatureDeck`**, as `<section id="work">`.

## Design constraints (match the existing site, no new style system)
- Use the same container width, section padding, H2 style (incl. the italic gradient span), `Reveal`/`ImageReveal`/`StaggerGroup` usage and card radius/shadow tokens that `PricingSection.tsx` uses. Read that file first and copy its patterns.
- Fonts: `font-instrument` / `font-editorial` exactly as other sections use them.
- Don't use emoji, star ratings or "5.0 / 5.0" stats. All `transition` properties must be explicit, and every button gets `active:scale-[0.96]`.

## Case studies UI (rewrite CustomerStoriesCarousel)
- Header: eyebrow, H2 and footnote (actual/estimated legend) from 00 §7.
- **Layout:** a horizontal row of 4 case tabs: industry label plus system name, e.g. "Music school · WhatsApp AI assistant". Under it, one large detail panel for the active case:
  - left: Problem paragraph, plus the flow steps for CS4 if present.
  - right: the metric list. Each metric shows a big value, its label and a small `actual`/`estimated` pill (ID: `aktual`/`estimasi`).
  - bottom: "Built with" chips.
  - The CS1 quote renders only when `confirm` is false. While it's still `[CONFIRM]`, hide it.
- The active-tab indicator uses a framer `layoutId="workActiveTab"` pill with spring 500/35, the same spring the site uses.
- Panel swap uses `AnimatePresence mode="wait"` with an opacity + 6px blur swap of about 0.22s, the same as the hero dock.
- On mobile (<768px) the tabs scroll horizontally with `snap-x`.
- Delete the old 5 fake stories and their names. Nothing from the old file's content stays.

## Demos (below the case panel, 2 columns on desktop, stacked on mobile)
Heading EN "Try it yourself" / ID "Coba sendiri", plus the caption from 00 §8.

**DemoChat** (00 §8 Demo A):
- A WhatsApp-like chat card styled like the hero LiveChat bubbles. Reuse its classes.
- Show 3 suggestion chips. Clicking one:
  1. appends the user bubble,
  2. shows a typing indicator for 900ms,
  3. appends the scripted reply.
  - After all 3 have played, it appends the hand-off system line.
  - A "Reset" / "Ulangi" text button restores the start state.
- The script lives in `DEMO_CHAT` with EN/ID. Write the replies in the 00 voice:
  - Chip 1: beginner piano or guitar, 45 minutes once a week.
  - Chip 2: "Trial class is free. Regular classes start from Rp 450.000/month" (EN: "from IDR 450,000/month"). Mark it **[CONFIRM: fictional price OK]** in a code comment.
  - Chip 3: offers 2 slots and confirms.
- Changing the language mid-conversation re-renders the existing bubbles in the new language, because the bubbles store keys, not strings.
- No network, no API key, no LLM.

**DemoEnrich** (00 §8 Demo B, data in 00b §J):
- A table: Company is filled; Domain, Size, Industry and Contact are empty.
- An "Enrich list" / "Lengkapi data" button fills one row every 450ms, cell by cell with a 90ms stagger, using a fade + 4px y-motion. The counter shows "0/5 enriched" → "5/5 enriched" (ID "0/5 dilengkapi").
- When it finishes, the button becomes "Reset" / "Ulangi".
- Wrap the table in `overflow-x-auto` on mobile.
- Respect `prefers-reduced-motion`: fill instantly.

## Acceptance
- Lint and build pass.
- Both languages at 1440px and 390px: tabs, metrics and demos have no overflow, and the actual/estimated pill is visible on every metric.
- Every number shown matches 00 §7 exactly. The reviewer diffs them.
- Both demos run start → finish → reset twice without console errors, and switching the language mid-demo doesn't crash.
- The Navbar "Work" link scrolls to `#work`.
