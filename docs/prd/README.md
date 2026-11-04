# Newseed rework: PRD index

We're turning elev (an AI meeting-scheduler SaaS) into **Newseed**, an AI automation and growth agency site, at newseedglobal.com. The site will be bilingual (EN/ID).

## Who does what

- **Main session (Opus):** plans, writes the PRDs, reviews each task and gives final approval. It does not write code.
- **Coding agent:** runs on `haiku` and works from one PRD per dispatch. If it gets confused or fails review, the same PRD goes to `sonnet` at medium effort. If sonnet also fails, the main session decides what happens next.

## Order and gates

| # | PRD | Depends on | Gate |
|---|-----|-----------|------|
| 00 | [content-source](00-content-source.md) | — | **Approved** |
| 00b | [mockup-copy](00b-mockup-copy.md) | 00 | **User approves the mapping, copy and Q1–Q6 before 02–05 start** |
| 01 | [i18n-foundation](01-i18n-foundation.md) | 00 | build + switch works |
| 02 | [hero](02-hero.md) | 01 | motion parity |
| 03 | [services-and-integrations](03-services-and-integrations.md) | 01 | motion parity |
| 04 | [case-studies-and-demos](04-case-studies-and-demos.md) | 01 | demos play in both languages |
| 05 | [roi-engagement-faq-cta](05-roi-engagement-faq-cta.md) | 01 | motion parity |
| 06 | [seo-cleanup](06-seo-cleanup.md) | 02–05 | build, /id route, no dead imports |

Tasks run one at a time. Each task is reviewed before the next one starts.

## Global rules (apply to every PRD)

1. **Motion parity.** These must not be edited: `src/motion/**`, `LiquidOrb.tsx`, `liquid-orb-shader.ts`, `GooeySvgDefs.tsx`, `GlassSurface.*` and `Folder.*`. Inside the components you do touch, keep every duration, delay, easing, spring, `layoutId`, interval timer, scroll trigger and the scene order exactly as they are. Only change **what is shown**: text, icons, and the mock UI elements inside a scene.
2. **Same layout and styling.** Keep the Tailwind classes, spacing and grid as they are. You may change a class only when longer copy breaks the layout, and you must say so in the report.
3. **All copy comes from `src/data/landingData.ts`** as `{ en, id }` and is read through the i18n hook from PRD 01. Don't hardcode user-facing strings in components.
4. **Ponytail.** Make the smallest diff that works. Don't add new dependencies or abstractions beyond what the PRD asks for.
5. **Honest data.** Use only the metrics in PRD 00. Every metric keeps its `actual` / `estimated` label, and you must not invent numbers.
6. **Done means:** `npm run lint` and `npm run build` pass, there are no console errors, and both EN and ID were checked in the browser at 1440px and 390px.

## Fixed facts

- Brand: **Newseed**
- Calendly (primary CTA): https://calendly.com/stevenal021200/30min
- WhatsApp (secondary): https://wa.me/6282124747385, with prefilled `?text=` in the active language
- Default language comes from `navigator.language` (`id*` → ID, anything else → EN) and is stored in localStorage under `newseed-lang`. Visiting `/id` forces ID.
