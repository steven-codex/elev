# UI-C: Section-by-section polish (antislop pass)

**Implementer:** haiku (fallback sonnet medium), one sub-task at a time (C1 → C8) · **Depends on:** UI-B
**Inputs:** [02-research.md](02-research.md) · `antislop` R-01–R-06 · `better-ui` · `make-interfaces-feel-better`

Every change must name its purpose (hierarchy, identity or readability). If it can't, drop it.

## C0. Carry-over from the UI-B review
- **Restore the gradient CTAs with accessible stops.** UI-B made them flat `bg-accent` because white on `#418AC1` was 3.73:1. Use `bg-gradient-to-r from-[#2F6BEA] to-[#0055FF]` (white text is 4.76:1 → 5.61:1) on the Hero, Pricing/Engagement, ROI and Integrations CTAs. Keep the existing hover, shadow and press behaviour. The italic gradient **text** spans keep their original colours, because they're large display text.
- **Section gaps:** change `lg:py-28` to `lg:py-24` on every top-level section except the hero. The target at 1440px is ≤260px between content blocks.
- **The ID H2 "Hubungkan Newseed ke semua tools Anda" wraps to 3 lines** (R-04). Widen that H2's max-width, or let `text-balance` work with the copy, so it fits in 2 lines at 1440px.
- **24px hit areas** (UI-B item 8): on the hero chat pager dots, the stage transport buttons and the footer select, add `relative after:absolute after:-inset-2 after:content-['']` (or similar) so the target is at least 24px without changing the visual size.
- **Play again placement:** after each loop finishes, check it at 390px and 1440px. It must not cover scene content.

## C1. Hero
- Bento (antislop R-02): change the three equal cards to an **asymmetric 12-column grid**:
  - Follow-up automation: span 7
  - Smart routing: span 5
  - Connected tool stack: full width (span 12), shorter, with the marquee running edge to edge
- Give each card its own treatment: the task list keeps its browser chrome, the routing card gets a subtle accent-surface background, and the stack card has no inner box.
- Trust line: render it as 3 items separated by a 4px dot, as body-sm in `ink-tertiary`, wrapping cleanly on mobile.
- CTAs: minimum height 48px. The primary is a filled accent pill and the secondary is a ghost pill with a `1px` transparent border plus a ring shadow (forced-colors safe).

## C2. Logo ticker
- Replace the text wordmarks with the **local SVG logos** (`/logos/*.svg`, the same set as TOOLS where available), each followed by its name.
- Logos are monochrome (`opacity-60 grayscale`) and go to full colour on hover only.
- Run it as a slow edge-faded marquee (linear, about 40s, mask-image gradient on both edges). It pauses off-screen and stops under reduced motion (the UI-A hooks).
- Remove the separate sub-line if the heading already carries the message, and keep the heading as a `label` role.

## C3. Services deck
- Remove any eyebrow pill above the H2 (cheap meta-label).
- Chart card:
  - the big value uses `font-semibold tabular-nums` at the h3 size.
  - tabs show a clear selected state with a background and colour change, not motion alone.
- Agent card: the active use-case line uses body-sm `ink-secondary`, kept at a stable height so the layout doesn't jump between modes.

## C4. Work (case studies)
- Remove the eyebrow pill "Work / Studi kasus".
- Tabs:
  - active tab: a white surface with a ring shadow.
  - inactive tabs: no box, `ink-tertiary`.
  - industry label: `label` role.
- Metrics: the value is display-like (2.5rem, 600, tabular-nums, ink). The label is body-sm. The actual/estimated pill is small and neutral, with **actual** in the success colour and **estimated** in neutral, plus the text label so meaning isn't carried by colour alone.
- The problem paragraph gets a 62ch measure in `lead` role.
- Demos:
  - give both cards equal height on desktop.
  - DemoEnrich table: sticky first column inside its scroll container, plus a right-edge fade showing there's more to scroll (fixes the 1024px hidden column).

## C5. Integrations
- Modal: tools grid as 2 columns on desktop and 1 on mobile. Each row shows the logo, name and a one-line description in body-sm `ink-tertiary`.
- The category filter is a segmented control with an `aria-pressed` state.

## C6. ROI
- The result card leads with the yearly savings as one large number (display size, 600, tabular-nums). Monthly savings and hours sit below as a 2-column secondary row.
- Sliders:
  - custom track and thumb: accent fill to the thumb, a 20px thumb, and a visible focus ring.
  - the value is shown next to the label with `tabular-nums`.
- Formula and assumption: one caption line, collapsed behind a "How we calculate" / "Cara menghitung" `<details>` disclosure.

## C7. Engagement + FAQ
- Engagement:
  - Grow is the highlighted card with a 2px accent ring; Build is neutral.
  - Feature checkmarks use one icon style at the stroke weight that matches the text (1.75px).
  - The Audit banner becomes a quiet full-width row: text on the left, button on the right. No gradient box.
- FAQ: quick-nav pills keep their numbering (it's navigation, not decoration). Ensure the open and active state is visible without motion.

## C8. Process + footer
- Process nodes: the step number in `label` role above the step name. The hover caption has a fixed height so nothing below jumps.
- App shell: metric numbers are tabular-nums. Run rows align on a shared grid.
- Final CTA block: heading in display role, and the agenda as a 3-item list with step numbers.
- Footer:
  - column headings in `label` role and links in body-sm `ink-inverse/70` → `ink-inverse` on hover.
  - copyright row in caption.
  - the language select styled like the Navbar switch.
- R-06: delete stale comments mentioning Velie, elev, Meeting or "Section 0X" in every file you touch.

## Must not change
Copy (from `landingData`), scene choreography, LiquidOrb, the gradient italic and the UI-A accessibility behaviour.

## Acceptance (per sub-task)
- Lint and build pass.
- Screenshot or DOM check at 1440px and 390px in EN and ID.
- No overflow at 320px.
- Keyboard and reduced-motion behaviour from UI-A still works.
- Report each change with a one-line purpose.

## Carry-over from the C0–C4 review (do in the C5–C8 run)
- The integrations layout changed to `lg:col-span-6 / 6` so the ID H2 fits on 2 lines. Confirm the pill stage still looks balanced at 1440px and 1024px, and doesn't clip.
- FAQ renders 8 `aria-expanded` buttons (desktop + mobile layouts). Confirm the hidden layout is `display: none`, so only 4 are in the tab order at any width.
- Re-measure "Play again" at 390px for the live-chat, notetaker and services chart fixes, and at 1440px for live-chat and notetaker.
- Check stage transport hit areas (≥24px).
- Check that no horizontal overflow occurs at 320px in EN (only /id was checked).
- **Regression to fix first:** C3 removed the sliding selected pills in `TimelineFeatureDeck.tsx` (`layoutId="activePayoutTabPill"` and `layoutId="activeVelieModePill"`, spring 500/35), and replaced them with a static background. Restore both `motion.div` pills and their transitions. Keep `aria-pressed`. The selected state can keep the stronger ring shadow on the pill itself, and the selected text stays `text-ink font-medium`, so state isn't carried by motion alone. Restore `transition-[color,transform]` on the buttons so the press scale animates.

## C9. Process labels on mobile (added after the C5–C8 review)
The process diagram is an SVG with a 1000-unit viewBox. At 390px its node labels render at about 4–6px, which is unreadable.
- Below `lg`, hide the in-SVG step labels and caption, and render the 4 steps as an HTML ordered list directly under the diagram: step number in `label` role (accent), step name in `body-sm` `font-medium`, step line in `caption` `ink-tertiary`.
- Keep the diagram, nodes, beams and orb and all their motion unchanged. Desktop is unchanged.
- Copy comes from `PROCESS`, with no new strings.

## C10. Dialog close race (added after review)
The native `close` event fires asynchronously. If the dialog is reopened before it fires, `onClose` sets `isModalOpen` to false while the dialog is open, leaving it empty. In `IntegrationsSection.tsx` `onClose`, use `setIsModalOpen(dialogRef.current?.open ?? false)`, and only return focus to the CTA when the dialog is really closed.

## C11. Hero bento back to 3 columns (user request, overrides C1)
The user prefers the original layout. Restore the hero bento to 3 equal columns as on `main`: same grid classes, card treatment (white cards, no accent-surface routing card) and marquee placement inside the third card. Keep what UI-A/B added: copy from data, type and colour tokens, named transitions, press scale, hit areas, `loop-limited`, and loop and reduced-motion handling.
