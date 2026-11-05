# UI audit (2026-11-05)

**Method:** a static, read-only sweep against the rules in `better-interface`, `better-ui`, `better-accessibility`, `better-typography` and `better-colors`. The live-site visual check was done by the main session.
**Verdict:** Block. There are 7 HIGH findings, and all of them are escalation triggers.
**Not reviewed:** `better-writing` (copy), and `better-layout` beyond sections 1–6.

## HIGH (escalation triggers)
| # | Finding | Locations |
|---|---|---|
| H1 | Auto-play, loops and `motion.*` animations ignore `prefers-reduced-motion`. The gsap wrappers in `src/motion` already handle it. | No `MotionConfig` in `App.tsx`. MinimalistMotionStage:138,178-182 · MultiProductHero:108-111,914-918,1072-1076 · TimelineFeatureDeck:75-82 · LiquidOrb:379,386 · Navbar:49,57 (`scrollTo` smooth) |
| H2 | `focus:outline-none` removes the focus ring without a replacement. | Footer:142 (language select) · MinimalistMotionStage:1573 (scrubber) |
| H3 | Controls have no accessible name. | MultiProductHero:886-893 (dots), :1316-1320 (toggle needs `role="switch"`) · MinimalistMotionStage:971-973, :1567 · IntegrationsSection:100-104 (modal close) |
| H4 | FAQ can only be used by pointer: hover and `div onClick`, with no keyboard path. | FaqSection:217-223, :270-272 · GlassyFaqInteractiveCard:92-135, 179-180, 204 |
| H5 | The integrations modal isn't a dialog: no role, Escape, focus trap or focus return. | IntegrationsSection:83-190 |
| H6 | The hidden Navbar can still receive focus. | Navbar:100-110 (use `inert={!showNav}`) |
| H7 | Small slate-400 text on light backgrounds has about 2.4–2.6:1 contrast. `text-blue-100/90` on blue is about 4.0:1 and needs confirming. | PricingSection:97,119,178,200 · RoiCalculator:69,94,120 · TimelineFeatureDeck:205 · MultiProductHero:522,1283,1402 |

## MEDIUM
| # | Finding | Locations |
|---|---|---|
| M1 | Infinite loops have no visible pause control (WCAG 2.2.2). | Hero marquee :699,719 and loops :108,914 · TimelineFeatureDeck:75-82 · GlassyFaq:113-135 |
| M2 | Tab and segment state isn't exposed, and the carousel tabs have no arrow-key support. | TimelineFeatureDeck:127-150 · MinimalistMotionStage:296-302,1637-1645 · CustomerStoriesCarousel:50-62,88 |
| M3 | The global Space handler hijacks focused buttons. | MinimalistMotionStage:189-200 |
| M4 | `transition-all` appears 26 times. | ConnectedAppShell ×10 · MinimalistMotionStage ×4 · TimelineFeatureDeck ×2 · MultiProductHero ×9 · Integrations:181 |
| M5 | Press scale isn't 0.96 (34 places), and DemoChat:77 scales while disabled. | See the audit transcript. Fix: `enabled:active:scale-[0.96]` everywhere. |
| M6 | Inputs use `text-xs`, which triggers iOS zoom on focus, and some touch targets are under 24px. | ConnectedAppShell:461 · Integrations:117 · Footer:138-149 · Hero dots · Stage:1655,1667 |
| M7 | Content text is 9–10px (about 45 lines). | `grep -rn 'text-\[\(9\|10\|11\)px\]' src/components` |
| M8 | ROI sliders don't announce the formatted value. The mobile menu toggle has no `aria-expanded` or Escape. Some aria-labels are English-only. | RoiCalculator:60-118 · Navbar:12,176-217 · Stage:1594 |

## LOW
- `.hover-lift:hover` isn't gated by `@media (hover: hover)`: index.css:433-436.
- FAQ photos have no `outline-black/10` image outline: FaqSection:227-232, 276-281.
- Concentric radius mismatch: FaqSection:255 vs :274.
- Headings missing `text-balance`: FaqSection:138, Footer:53, MultiProductHero:326, ConnectedAppShell:512.
- Durations over 300ms on interactions: ConnectedAppShell:277,289; FAQ image zoom `duration-700`.
- The reduced-motion CSS block cuts animations to 0.01ms instead of an opacity crossfade: index.css:450-462.

## Live-site observation (main session)
- The hero H1, sub and CTA use the default `Reveal` (1.25s, blur 8px), so the headline isn't readable straight away on load.

## Section spacing (measured on live site, 2026-11-05)
The empty gap between the last content of one section and the first content of the next is the bottom padding plus the next section's top padding plus any extra inner margin.

| Transition | Desktop 1440 (px) | Mobile 390 (px) |
|---|---|---|
| services → work | 451 | 317 |
| work → integrations | 391 | 257 |
| integrations → roi | 359 | 253 |
| roi → engagement | **484** | 266 |
| engagement → faq | 295 | 235 |
| faq → process | 337 | 209 |

- Section padding is `py-28 sm:py-36 lg:py-44`, i.e. 112/144/176px on **each** side. ROI uses `py-24 lg:py-32`, and ROI also has about 155px of extra inner bottom space.
- The total page is 13,988px on desktop (about 15.5 screens) and 17,503px on mobile (about 20.7 screens).
- At 900px viewport height, a gap of 350–480px is about half a screen of nothing between sections.

## Typography and color (static inventory + computed contrast, 2026-11-05)
**Fonts:** Geist (variable 100–900) for UI and body, and Instrument Serif italic for gradient accents in headings.
- `src/index.css:7-15` maps every `--font-weight-*` to **500**. The 231 `font-normal`, 38 `font-medium`, 23 `font-semibold` and 3 `font-bold` all render the same, so hierarchy comes only from size.
- The fonts load **twice**: `@import` in `src/index.css:1` blocks rendering, and there's also a `<link>` in `index.html:35`.
- There's no type scale. About 25 distinct sizes are used, including arbitrary ones: 13px, 13.5px, 14px, 15px, 28px, 32px, 46px, 3.25rem, 3.75rem, 7px and 9px.

**Text colors:** tokens exist in `index.css:26-55` (`--color-ink`, `-secondary`, `-tertiary`, accent…), but components mostly bypass them.
- Neutral text uses about 10 values: `[#0A0D14]` ×57, `[#0F172A]` ×14, slate-900 ×22, slate-800 ×12, slate-700 ×29, slate-600 ×25, slate-500 ×56, `[#64748B]` ×10, slate-400 ×60, `[#94A3B8]` ×4.
- Accent text uses `[#0055FF]` ×44, blue-600 ×10, blue-500/300. These are the same hue with different values.
- **The token `--color-ink-tertiary` (#94A3B8) fails as text:** 2.56:1 on white and 2.45:1 on #F8FAFC (needs 4.5:1). slate-500 #64748B reaches 4.76 / 4.55.
- Other computed pairs: ink #0A0D14 on white 19.43 · `--color-ink-secondary` #475569 7.58 · accent #0055FF on white 5.61 · white on #0055FF 5.61 · blue-100 #DBEAFE on #0055FF 4.60 (`/90` alpha lowers it; must be measured when rendered).
