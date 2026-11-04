# PRD 02: Hero (MultiProductHero) + LogoTicker

**Implementer:** haiku (fallback sonnet medium) · **Depends on:** 01, 00b approved
**Files you may touch:** `src/components/MultiProductHero.tsx`, `src/components/LogoTicker.tsx`, `src/data/landingData.ts` (add/extend `HERO` and `TOOLS` only)

## Goal
Swap every visible string and mock element in the hero and the logo ticker for the Newseed content in **00b §B and §D**, in both languages. Motion must stay identical.

## Scope
1. **Data:** move all hero mock copy from 00b §B into `HERO` in `landingData.ts` as `L<>` values: dock tabs, 3 chats, quote-flow strings, 3 sync cards, calendar strings and the 3 bento cards. The service titles and bodies come from `SERVICES`, so don't duplicate them.
2. **Copy:** read every string through `useLang().t(...)`. Don't leave any hardcoded English user-facing text.
3. **Email form → two buttons** in the same position and height as the old form row:
   - primary: the same black pill style as the old submit. Links to `SITE.calendly` with `target="_blank"`.
   - secondary: text/ghost style. Smooth-scrolls to `#services`.
   - The micro-copy row becomes `hero.trust` (00b §B version).
4. **Dock:** keep the 4 tabs, their icons, their order and the default tab (`velie`) exactly as they are. Change only labels and content, as mapped in 00b §B. Internal ids may stay the same, so don't rename the state keys.
5. **"Learn more" links → "Talk about this":** they open `SITE.whatsapp(prefill)` in a new tab.
6. **Stage scenes:** replace text and values only.
   - Calendar: month November 2026, target day **12**, slots 10:00/14:00.
   - Counter: target 18 with a `%` suffix instead of the `$` prefix.
   - Proposal card: `$2,360`.
   - Toggle label: as in 00b.
7. **Bento:**
   - 3 cards with the 00b text.
   - Marquee pills = `TOOLS.items`. Each pill shows the tool name and, where it already exists in the file, its inline icon. A tool without an icon gets a neutral 6px dot in the same spot.
   - Wide pill text from 00b.
8. **Small "Example" / "Contoh" caption:** add it under the stage using the existing small grey text style. One line, no new component.
9. **LogoTicker:**
   - Heading and sub from 00b §D.
   - Replace the 7 brand SVG wordmarks with 7 **text wordmarks** (the tool names) in the same row, the same color and the same size class. Keep `StaggerGroup` and the hover-lift.
   - Remove the "100,000" span.
10. **Remove dead code in the hero:** `bookingConfirmed` (its interval and state), `cursorState` and `handleProgressChange`, because none of them is ever rendered. Don't touch any other timer.

## Must not change
- `layoutId="activeTabTimbul"` and its spring.
- `AnimatePresence` keys and timings.
- Calendar chain 1500/350/1600/300/3000ms; LiveChat 300/1200/4200ms; deck 3200ms; conveyor 11.2s with steps 2.0/4.0/5.2/6.0/7.8/9.2; counter 850ms; taskChecked 3200ms.
- `Reveal` / `ImageReveal` delays.
- Background images and the 3D icons.

## Acceptance
- Lint and build pass.
- In EN and ID, at 1440px and 390px, no hero text overflows its container, especially the dock labels and chat bubbles. If an ID string overflows, report it rather than shrinking fonts.
- All 4 dock tabs play their scene with the same rhythm as before. Watch each tab for one full loop.
- Text search: `elev`, `Velie`, `Stripe`, `Dominic`, `Sarah`, `Elena` and `Get started` no longer appear in these two files.
- Clicking the primary CTA opens Calendly. Clicking "Talk about this" opens WhatsApp with the prefill in the active language.

## Report back
Files changed, new `HERO`/`TOOLS` keys, and any string that didn't fit.
