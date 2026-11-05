# UI-A: Accessibility and motion foundation

**Implementer:** haiku (fallback sonnet medium) · **Depends on:** nothing · **Blocks:** UI-B, UI-C, UI-D
**Inputs:** [00-audit.md](00-audit.md) H1–H6, M2, M3, M8 · [01-decisions.md](01-decisions.md) Q3, Q4, Q8–Q11

## Goal
Fix every HIGH escalation trigger except contrast (H7, which is done in UI-B), without changing how the page looks for a default (motion-on, mouse) visitor.

## Scope
1. **Reduced motion (H1, Q3)**
   - Wrap the app in `<MotionConfig reducedMotion="user">` in `App.tsx`.
   - Add a tiny `usePrefersReducedMotion()` hook (a `matchMedia` listener) in `src/motion/` and export it from `src/motion/index.ts`.
   - When the preference is set:
     - MinimalistMotionStage does not autoplay. It shows stage 1 in its done state.
     - Hero intervals and loops (`setInterval`, the conveyor timeline, the calendar chain, LiveChat cycling, the deck shuffle, counters) don't start, and each scene renders its final informative frame.
     - The TimelineFeatureDeck auto-cycle doesn't start.
     - Navbar `scrollTo` uses `behavior: 'auto'`.
     - **LiquidOrb (Q8):** skip the RAF loop and render a single frame. This is the only allowed edit to `LiquidOrb.tsx`. Don't touch the shader file.
   - In `index.css`, replace the reduced-motion block's 0.01ms cut with an opacity crossfade of about 150ms, and stop marquees and beams.
2. **Loops respect visibility (Q11)**
   - Every looping scene (hero dock scenes, MinimalistMotionStage, deck auto-cycle, marquees) pauses when off-screen. Use a shared `useInView`-style IntersectionObserver hook placed next to the reduced-motion hook.
   - Each loop stops by itself after 3 full cycles and shows a small text button, "Play again" / "Putar lagi", that restarts it.
   - Strings live in `landingData` `SITE.a11y`.
3. **Hero shows fast (Q4)**
   - In MultiProductHero, the H1, sub, CTAs and trust line use `Reveal` with `duration={0.5}`, `blur={4}` and `y={12}`, with delays of 0, 0.08, 0.16 and 0.24.
   - Change no other `Reveal` on the page.
4. **Focus visible (H2)**
   - Remove `focus:outline-none` at Footer:142 and MinimalistMotionStage:1573.
   - Add one global rule in `index.css`: `:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }`.
   - Then delete any per-component `outline-none` that would cancel it on interactive elements.
5. **Accessible names (H3, M8)**
   - Add EN/ID `aria-label`s, held in `SITE.a11y`, for:
     - the hero progress dots and play/pause
     - the stage scrubber and the stage control buttons
     - the integrations dialog close button
     - the Navbar menu toggle and the language group
   - The autoSend toggle gets `role="switch"`, `aria-checked` and `aria-labelledby`.
   - Every hardcoded English aria-label or title moves to data.
6. **FAQ keyboard (H4, Q9)**
   - Each card's interactive root becomes `<button type="button" aria-expanded aria-controls>`.
   - Focus and click trigger the same sequence that hover triggers: the active index, then the question, then the answer.
   - The mobile accordion uses the same button pattern.
   - Morph paths, pockets, springs and timing formulas don't change.
7. **Dialog (H5, Q10)**
   - The integrations explorer becomes a native `<dialog>`. Open it with `showModal()`. Escape (the `cancel` event) and a backdrop click close it.
   - Focus returns to the CTA on close.
   - Keep the inner `motion` entrance spring.
   - Add `overscroll-behavior: contain` on the scroll area.
8. **Hidden navbar (H6):** `inert={!showNav}` on the header.
9. **Tabs (M2)**
   - Deck segments and stage tabs get `aria-pressed` or `aria-selected` as appropriate.
   - CustomerStoriesCarousel tabs get a roving tabindex, ArrowLeft/ArrowRight/Home/End, and `id`/`aria-controls` pairs.
10. **Space hijack (M3):** the MinimalistMotionStage keydown handler ignores events whose target is a `button`, `a`, `select`, `input` or `[role=tab]`, or anything inside the dialog.
11. **ROI sliders (M8):** add `aria-valuetext` with the formatted value. The Navbar mobile toggle gets `aria-expanded` and `aria-controls`, and Escape closes the drawer.

## Must not change
Visuals and motion values for a default visitor, except the hero timing in (3). Scene content stays as is. Layout classes stay as they are.

## Acceptance
- `npm run lint` and `npm run build` pass.
- With DevTools emulating `prefers-reduced-motion: reduce`: no moving loops, a static orb, sections fade in, and nothing is stuck invisible.
- Keyboard only:
  - Tab through the whole page. Every focused control shows a ring.
  - There's no focus on the hidden navbar.
  - FAQ cards open with Enter or Space.
  - The dialog opens, traps focus, closes on Escape and returns focus.
  - Carousel tabs move with the arrow keys.
- Loops stop after 3 cycles and "Play again" restarts them. Scrolling a loop off-screen pauses it.
- The hero H1 is fully visible within 600ms of load.
- No console errors in EN or ID.
