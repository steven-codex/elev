# UI upgrade: approved decisions (2026-11-05)

On 2026-11-05 the user approved every recommendation from grill rounds 1–3 ("okee pokoknya") and added: "make each section's UI better, enforce antislop, research 2026 clean/minimalist references".

| # | Decision |
|---|---|
| Q1 | Polish within the current identity (orb, fluid wave, glass, Geist + Instrument Serif). Not a redesign. |
| Q2 | The motion-parity rule is **relaxed**. Scene choreography stays the same, but durations, easings and springs can be tuned. UI interactions run ≤300ms with `--ease-out: cubic-bezier(0.23,1,0.32,1)` and bounce 0. |
| Q3 | Every animation respects `prefers-reduced-motion`. Replace motion with a short opacity fade, and stop loops on an informative frame. |
| Q4 | Hero text appears within about 500ms: 80ms stagger, small translateY, blur ≤4px. Below-the-fold sections keep `Reveal`. |
| Q5 | Order: foundations (a11y and motion) → system (type, color, motion tokens, spacing) → per-section upgrades. |
| Q6 | Test at 390, 320 and 200% zoom. Gate hover on hover-capable devices. Targets ≥24px, and primary CTAs ≥44px. |
| Q7 | Per-section upgrades are driven by the audit and the reference research. |
| Q8 | `LiquidOrb.tsx` may be edited **only** to stop the RAF loop and paint one static frame under reduced motion. The shader is not touched. |
| Q9 | FAQ cards become `<button aria-expanded>`. Focus or click runs the same question → answer sequence as hover. |
| Q10 | The integrations modal becomes a native `<dialog>` with `showModal()`. Keep its entrance spring. |
| Q11 | Loops pause when off-screen (IntersectionObserver), stop on their own after 3 cycles, and show a small "Play again" / "Putar lagi" control. |
| Q12 | Reading text is at least 12px. Decorative mock labels can stay 10px if their contrast is sufficient. |
| Q13 | Small slate-400 text → slate-500 (#64748B). Text on blue → `text-white/90`, measured. |
| Q14 | Motion tokens live in `index.css`: easing, 150/200/250ms durations, press scale 0.96. They replace `transition-all` and the off-spec scales. |
| Q15 | Section padding is `py-16 sm:py-24 lg:py-28`. Remove ROI's extra bottom space and tighten the bottom of the hero. |
| Q16 | Keep Geist + Instrument Serif. |
| Q17 | Restore real weights: body 400, labels and buttons 500, Geist headings 500 with tight tracking, big numbers and badges 600. |
| Q18 | 8-role type scale: display 64/40, h2 48/32, h3 24, lead 18, body 16, body-sm 14, caption 13, label 12 uppercase +0.05em. |
| Q19 | 4 text roles: `ink` #0A0D14, `ink-secondary` #475569, `ink-tertiary` **#64748B** (was #94A3B8), `ink-inverse` white. |
| Q20 | One accent: `--color-accent` #0055FF, hover #0047D6. Keep the gradient italic. |
| Q21 | Load fonts once: remove the CSS `@import` and keep `<link>` + preconnect. |
