# PRD 06: SEO, bilingual meta, dead code cleanup

**Implementer:** haiku (fallback sonnet medium) · **Depends on:** 02–05 reviewed and approved
**Files you may touch:** `index.html`, `metadata.json`, `public/robots.txt`, `public/sitemap.xml`, `src/i18n.tsx` (meta sync only), `src/App.tsx`, `src/data/landingData.ts`, `src/types.ts`, `package.json` / `package-lock.json`, deletion of the files listed below, `docs/archive/` (moves)

## 6a. SEO and meta
- **Canonical domain:** `https://www.newseedglobal.com`. Before switching from `elevglobal.com`, check which host the live site redirects to with `curl -sI https://newseedglobal.com`, and use that host everywhere.
- **`index.html` (EN defaults):**
  - title "AI Automation & WhatsApp AI Agents for Growing Businesses | Newseed"
  - description "Newseed builds AI agents and workflow automations that answer customers on WhatsApp, follow up every lead and keep your data in sync. Free 30-minute audit."
  - Update the OG and Twitter title, description and URL to match.
  - Add `<link rel="alternate" hreflang="en" href="https://www.newseedglobal.com/">`, `hreflang="id"` pointing to `/id`, and `x-default` pointing to `/`.
- **JSON-LD:** replace `SoftwareApplication` with `ProfessionalService`:
  - name Newseed, url, description.
  - `areaServed`: ["ID", "Worldwide"].
  - `availableLanguage`: ["en", "id"].
  - `contactPoint` with the WhatsApp number in E.164 (+6282124747385).
  - Don't include price, rating or review fields.
- **ID meta at runtime:** in `i18n.tsx`, when `lang` changes, set `document.title`, the meta description and `og:locale` from `SITE.meta`. Add `SITE.meta` to landingData with the EN text above and this ID text:
  - title "Otomasi AI & AI Agent WhatsApp untuk Bisnis yang Bertumbuh | Newseed"
  - description "Newseed membangun AI agent dan otomasi alur kerja yang menjawab pelanggan di WhatsApp, menindaklanjuti setiap prospek, dan menjaga data tetap sinkron. Audit gratis 30 menit."
- **Sitemap:** list 2 URLs, `/` and `/id`, each with `xhtml:link` alternates, and set lastmod to the build date. `robots.txt` points to the sitemap.
- **`metadata.json`:** set the new name and description.
- **OG image:** keep the current file path. The image itself changes only once Q3 (logo) is settled. Leave a TODO in the report, not in code.

## 6b. Remove the SaaS leftovers
Before deleting each file, run `grep -rn "<ComponentName>" src` and confirm nothing live imports it.
- **Delete:**
  - modals: `AuthModal.tsx`, `DemoModal.tsx`, `InteractiveScheduler.tsx`
  - unrendered sections: `StickyAccordionScheduling.tsx`, `MeetCallieSection.tsx`, `NotetakerSection.tsx`, `PaymentsSection.tsx`, `GooeyElevShowcase.tsx`, `GooeyElevDock.tsx`, `StatsBento.tsx`, `ui/stats-bento.tsx`
  - other dead components: `Hero.tsx`, `HowItWorks.tsx`, `WorkflowTabs.tsx`, `FeatureGrid.tsx`, `Testimonials.tsx`, `CtaBanner.tsx`, `ConversionMarquee.tsx`, `OrbitalMotionStage.tsx`, `NoticeBanner.tsx`, `MotionUiVideoModal.tsx`
  - shadcn leftovers: `ui/integrations-3.tsx` + `ui/integrations-3-utils/`, `ui/button.tsx`, `lib/utils.ts` (only if nothing live uses `cn`)
  - root-level `components/ui/stats-bento.tsx`
  - `public/motion-clip.html`
- **Keep, even though some are unused today:** `Folder.*`, `GlassSurface.*`, `GooeySvgDefs.tsx`, `motion/Parallax.tsx`, `LiquidOrb*`. They're design-system pieces and protected by the motion-parity rule.
- **`App.tsx`:**
  - Remove the dead imports and the modal state.
  - Remove the `onOpenDemo`/`onOpenAuth` props everywhere they're no longer used, and update the components' prop interfaces to match.
  - Replace the stale "EXACT 7 MASTER SECTIONS" comment with one line naming the section order.
- **`landingData.ts` / `types.ts`:** delete the old exports and their types: `NAV_MENU_SECTIONS`, `WORKFLOW_TABS`, `CORE_FEATURES`, `INTEGRATIONS_LIST`, `PRICING_PLANS`, `TESTIMONIALS`, `FAQS`, and `BookingSlot`.
- **Dependencies:** `npm uninstall three @react-three/fiber @react-three/drei maath ogl @google/genai express dotenv @types/express`, but grep each one first. Keep `canvas-confetti` only if something live still imports it; otherwise uninstall it and `@types/canvas-confetti` too.
- **`vite.config.ts`:** if nothing uses the `@` alias any more, leave it as is. Don't touch config without a reason.

## 6c. Docs
Move the old SaaS specs to `docs/archive/`: `PRD.md`, `LANDING_PAGE.md`, `landingpage_docs.md`, `elev-ai-landing-page-master-spec.md`, `khusus-app-shell-motion.md`. Keep `motionfields.md` and `AGENTS.md` where they are. Update `README.md` to 5 lines: what the site is, `npm run dev`, `npm run build`, and a pointer to `docs/prd/`.

## Acceptance
- Lint and build pass, and the bundle is smaller than before. Report the before and after sizes.
- `grep -rni "elev\b\|velie\|meeting" src index.html` returns only intentional hits; list them.
- `/` and `/id` each have the right `<html lang>`, title and description after load.
- View-source of `index.html` has valid hreflang tags and valid JSON-LD (paste it into the report).
- No console errors on either route.

## 6d. Follow-up after review (added by Claude, 2026-11-05)
1. **Canonical and social tags per route.** Right now `/id` canonicalises to `/`, which contradicts hreflang and keeps `/id` out of the index. Fix it in `src/i18n.tsx`: in the same effect that sets the title and description, also set:
   - `<link rel="canonical">` href
   - `og:url`
   - `og:title`
   - `og:description`
   - `twitter:title`
   - `twitter:description`

   Use `https://www.newseedglobal.com/` for EN and `https://www.newseedglobal.com/id` for ID, with titles and descriptions from `SITE.meta`. Add `SITE.meta.url` if needed. Update the existing tags in place with `querySelector`; don't create duplicates. Static `index.html` stays EN.
2. **LiquidOrb `aria-label`.** It's user-facing (screen reader). Change only that one string to `"Newseed AI orb"`. This is the single allowed edit to `LiquidOrb.tsx`, and nothing else in the file may change.
3. **`package.json`.** Change `"name": "elev"` to `"newseed"`.
4. **`border-beam`.** Uninstall it after grepping `src` to confirm it's unused.
5. **Out of scope:** `npm audit` reports high-severity issues in vite (dev server only) and source-map-js. Bumping vite is a separate decision for the user.
