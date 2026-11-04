# PRD 01: i18n foundation + content data

**Implementer:** haiku (fallback sonnet medium) · **Depends on:** 00 (approved) · **Blocks:** 02–06

## Goal
Get the EN/ID language system and the full content data in place, so that later PRDs only need to wire components to the data. No visual change in this task except the Navbar language switch.

## Scope
1. **`src/i18n.tsx`** (new, single file, no library):
   - `type Lang = 'en' | 'id'`, `type L<T = string> = { en: T; id: T }`.
   - `LangProvider` + `useLang()` → `{ lang, setLang, t }`, where `t<T>(v: L<T>): T` returns `v[lang]`.
   - Initial lang, in priority order:
     1. `location.pathname` starts with `/id` → `id`
     2. localStorage `newseed-lang`
     3. `navigator.language.startsWith('id')` → `id`
     4. Otherwise `en`
   - `setLang`:
     - writes localStorage.
     - sets `document.documentElement.lang`.
     - updates the URL with `history.replaceState`: `/id` for ID, `/` for EN. Keep any `#hash`.
2. **`src/main.tsx`**: wrap `<App />` in `<LangProvider>`.
3. **`src/data/landingData.ts`**: add the new typed exports holding **all copy from PRD 00 exactly as written**, as `L<>` values. Suggested export names: `SITE`, `NAV`, `HERO`, `TOOLS`, `SERVICES`, `USE_CASES`, `PROCESS`, `CASE_STUDIES`, `DEMO_CHAT`, `DEMO_ENRICH`, `ROI`, `ENGAGEMENT`, `FAQ`, `FINAL_CTA`, `FOOTER`. **Keep the old exports for now.** They are deleted in PRD 06.
   - Put fixed URLs in `SITE`: `calendly`, plus `whatsapp(text: string)`, which returns `https://wa.me/6282124747385?text=${encodeURIComponent(text)}`.
   - Add the matching types to `src/types.ts`, or inline them in the data file. Keep them minimal.
4. **Navbar**:
   - add a compact `EN · ID` switch in the existing right-side group, reusing the style of the existing secondary nav controls. The active language is bold or highlighted, and the control has `active:scale-[0.96]`. Show it on mobile too.
   - Swap the nav links to `NAV`: Services `#services`, Work `#work`, Process `#process`, FAQ `#faq`.
   - The CTA opens Calendly in a new tab.
   - **Remove** the Login/Sign up buttons. Leave `onOpenAuth` in the props for now; PRD 06 removes it.
5. **`vercel.json`** (new): `{ "rewrites": [{ "source": "/id", "destination": "/index.html" }] }` so `/id` loads on Vercel.

## Out of scope
Any section other than Navbar. SEO/meta tags (PRD 06). Deleting old components or data.

## Acceptance criteria
- `npm run lint` and `npm run build` pass.
- Loading `/` in an EN browser shows EN. Clicking ID changes the URL to `/id`, sets `<html lang="id">`, and the Navbar text switches instantly with no reload. A reload stays on ID.
- `/id` opens directly in ID on the dev server (`npm run dev`, port 3001).
- Every PRD 00 string exists in `landingData.ts`. Spot-check: `HERO.h1.id === "Bisnis terus jalan. Kerja repetitif, biar sistem yang urus."`
- The Navbar layout and motion (scroll states, dropdown animations) are unchanged apart from the switch and the removed auth buttons.

## Report back
List the files changed, the export names created, and anything in PRD 00 that didn't fit the structure.
