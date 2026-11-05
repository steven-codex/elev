# UI-B: Type, color, motion tokens, spacing

**Implementer:** haiku (fallback sonnet medium) · **Depends on:** UI-A · **Blocks:** UI-C, UI-D
**Inputs:** [01-decisions.md](01-decisions.md) Q12–Q21 · [02-research.md](02-research.md) · audit H7, M4–M7, LOW

## Goal
One coherent system so that every section looks consistent: real weights, an 8-role type scale, 4 text-color roles, one accent, motion tokens and a single section rhythm.

## Scope
1. **Fonts load once (Q21):** delete the `@import url(...)` at `src/index.css:1`. Keep the preconnect and `<link>` in `index.html`.
2. **Weights (Q17)**
   - Delete the `--font-weight-*: 500` overrides in `@theme`, so Tailwind's real weights return.
   - Set `body { font-weight: 400; letter-spacing: 0 }`.
   - Then apply:
     - Geist headings (`h1`–`h3`): `font-medium` (500)
     - buttons, nav links and labels: `font-medium`
     - big metric numbers and badges: `font-semibold` (600)
     - paragraphs and descriptions: `font-normal` (400)
   - The `font-normal` used today on 231 elements stays 400. Upgrade buttons, links, labels and headings to `font-medium` where they currently say `font-normal`.
3. **Type scale (Q18):** add these to `@theme` as `--text-*` tokens with line-height and tracking (Tailwind 4 `--text-display`, `--text-display--line-height`, …):

   | role | size (desktop / mobile) | line-height | tracking |
   |---|---|---|---|
   | display | 4rem / 2.5rem | 1.0 | −0.025em |
   | h2 | 3rem / 2rem | 1.05 | −0.022em |
   | h3 | 1.5rem | 1.25 | −0.012em |
   | lead | 1.125rem | 1.6 | 0 |
   | body | 1rem | 1.6 | 0 |
   | body-sm | 0.875rem | 1.55 | 0 |
   | caption | 0.8125rem | 1.5 | 0 |
   | label | 0.75rem | 1.4 | 0.05em, uppercase |

   - Map every section H1/H2/H3, lead, body and caption to these tokens.
   - Inside **mock UIs** (chat bubbles, dashboards, cards inside stages), you may keep 10–11px for decorative labels (Q12), but nothing below 10px. Change `text-[9px]` and `text-[7px]` to 10px.
   - Add `text-balance` on every heading and `text-pretty` on paragraphs.
   - Cap paragraphs at `max-w-[62ch]`.
4. **Color roles (Q19, Q20)**
   - In `@theme`, set `--color-ink-tertiary: #64748B`.
   - Add a `--color-ink-inverse: #FFFFFF` role.
   - Replace text colours outside mock UIs:
     - `text-[#0A0D14]`, `text-[#0F172A]`, `text-slate-900` and `text-slate-800` → `text-ink`
     - `text-slate-700` and `text-slate-600` → `text-ink-secondary`
     - `text-slate-500`, `text-slate-400`, `text-[#64748B]` and `text-[#94A3B8]` → `text-ink-tertiary`
   - Blues → `text-accent` / `bg-accent` / `hover:bg-accent-hover`.
   - Inside mocks, still replace `text-slate-400` used for readable text with `text-ink-tertiary`.
   - Text on blue surfaces → `text-white/90` or `text-white`.
   - Keep the italic gradient spans exactly as they are.
5. **Motion tokens (Q14)**
   - Add `--ease-out: cubic-bezier(0.23,1,0.32,1)`, `--ease-in-out: cubic-bezier(0.77,0,0.175,1)` and `--dur-1/2/3: 150ms/200ms/250ms` to `@theme`.
   - Replace all 26 `transition-all` with named properties, for example `transition-[color,background-color,border-color,box-shadow,transform]`, using `duration-200` and `ease-[var(--ease-out)]`.
   - Change every press scale to `enabled:active:scale-[0.96]` (a native `button`) or `active:scale-[0.96]` (an `a`).
   - Change `whileTap` values to `{ scale: 0.96 }`.
   - Interaction durations over 300ms on hover or press drop to 200ms. Decorative and scene motion is untouched.
6. **Spacing (Q15)**
   - Every top-level section uses `py-16 sm:py-24 lg:py-28`.
   - The hero uses `pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-24`.
   - The AppShell section uses the same top padding as the other sections.
   - Remove ROI's extra inner bottom space.
   - Don't change inner layouts.
7. **Surfaces (LOW)**
   - FAQ photos get `outline outline-1 -outline-offset-1 outline-black/10`.
   - Fix the FaqSection:255/274 radius so that outer = inner + padding.
   - `.hover-lift:hover` moves under `@media (hover: hover)`.
8. **Inputs (M6):** the search, select and shell inputs use `text-base sm:text-xs` (or `sm:text-sm`), so iOS doesn't zoom. Pad touch targets to at least 24px with an `after:` hit-area pseudo-element where the visual size must stay small.

## Must not change
Scene choreography, the gradient italic, LiquidOrb, layout grids and copy.

## Acceptance
- Lint and build pass.
- `grep -rn "transition-all" src` returns nothing.
- `grep -rnE "active:scale-(95|\[0\.9[^6]|90)|scale: 0\.9[^6]" src` returns nothing.
- `grep -rnE "text-\[(7|9)px\]" src` returns nothing.
- `grep -rn "@import url" src/index.css` returns nothing.
- Computed styles at 1440px:
  - H1 64px with line-height ≤ 1.0
  - section H2s 48px with line-height ≤ 1.05
  - paragraphs at weight 400
  - body letter-spacing 0
- Every text colour pair outside mocks measures ≥ 4.5:1. Report the measured pairs.
- Section gaps measured at 1440px are 200–260px (the earlier gaps were 295–484px). Mobile 390px gaps are 120–170px.
- Total page height is reported, before and after.

## Carry-over from the UI-A review (in scope here)
9. **FAQ morph under reduced motion:** when `usePrefersReducedMotion()` is true, the `motion.path` `d` morph in FaqSection and the card pocket springs use `{ duration: 0 }`. The shapes snap instead of animating, and the default-visitor springs are unchanged.
10. **Infinite motion loops pause off-screen** (performance): IntegrationsSection pill floats and acoustic rings, the hero conveyor belt and stage `repeat: Infinity` animations. Gate them with the UI-A `useInView` hook by rendering their animated props only while in view, or by setting `animate` to the static state when out of view.
11. Two search inputs (IntegrationsSection, ConnectedAppShellShowcase:461) still use `focus:outline-none` with a `focus:ring-2`. Switch them to `focus-visible:` ring utilities so the focus treatment is consistent.
12. Check visually where the "Play again" / "Putar lagi" button sits. It should be bottom-right, inside each loop's surface, in the `caption` role, with an `ink-tertiary` → `ink` hover and a ≥24px hit area. It must not overlap scene content at 390px.
