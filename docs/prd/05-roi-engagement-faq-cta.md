# PRD 05: ROI, Engagement, FAQ, Process/App shell, Footer

**Implementer:** haiku (fallback sonnet medium) · **Depends on:** 01, 04 (App order), 00b approved
**Files you may touch:** `RoiCalculator.tsx`, `PricingSection.tsx`, `FaqSection.tsx`, `GlassyFaqInteractiveCard.tsx` (logo only), `ConnectedAppShellShowcase.tsx`, `Footer.tsx`, `src/App.tsx` (render order and props), `src/data/landingData.ts` (`ROI`, `ENGAGEMENT`, `FAQ`, `FINAL_CTA`, `FOOTER`, `APP_SHELL`)

This PRD is large, so it is split into **5a–5e**. Do them in order and run `npm run lint` after each one.

## Final App order (after this PRD)
Navbar → Hero → LogoTicker → TimelineFeatureDeck (#services) → Work (#work) → Integrations → **ROI (#roi)** → **Engagement (#engagement)** → FAQ (#faq) → AppShell (#process) → Footer.

## 5a. ROI (RoiCalculator, render it after Integrations)
- Copy from 00 §9 and 00b §J.
- 3 sliders: people, hours and salary. Reuse the existing slider markup for the third one.
- Ranges and defaults depend on the language: EN in USD, ID in IDR. Switching the language resets the salary to that language's default.
- Use the exact formula from 00 §9 with **0.60**. Show the formula line and the assumption line in small grey text.
- Format currency with `Intl.NumberFormat`: EN uses `en-US` USD with 0 decimals, ID uses `id-ID` IDR with 0 decimals. Hours use `toLocaleString` with the same locales.
- CTA opens `SITE.whatsapp(prefill)`, with `{cost}` and `{people}` filled in.
- Remove `onOpenAuth`, "High ROI Impact", the $60/hr benchmark and every scheduling term.
- Keep the existing card styling and any `Reveal` usage.

## 5b. Engagement (PricingSection → `id="engagement"`, 00b §F)
- Remove the billing toggle, its state and `layoutId="activePricingBillingPill"`. The toggle is gone, so this layoutId goes too; that's the one allowed motion removal in this PRD.
- Left card = Build, right card (2px border + badge) = Grow. The price slot shows the 00b text, using the same font size and the same `AnimatePresence` wrapper (no price change, so it stays static).
- Fill the 6 features in each card from 00b.
- CTAs: Build and Grow open WhatsApp with prefill (00 §1 default). The enterprise banner becomes the Audit banner, and its CTA opens Calendly.
- Keep `StaggerGroup` and `Reveal` exactly as they are.

## 5c. FAQ (00b §G, 4 cards)
- 4 items from `FAQ` in the 00b order. Each has tag, badge, question and answer in EN/ID. Keep the 4 existing images and their order.
- Quick-nav pills "01 {tag}" … "04 {tag}".
- H2, mobile hint and help line from 00b. The help link opens WhatsApp.
- **Word-count timing:** GlassyFaqInteractiveCard timing depends on word count, and that's intended, so don't change the formula. Check that the longest ID answer still scrolls fully.
- Card logo: see the Q3 outcome.
- Morph paths, pockets and springs are untouched.

## 5d. App shell → Process + final CTA (00b §H)
- Add `id="process"` to the section.
- **Ecosystem:**
  - Map the 4 nodes to the process steps 01–04 in node order.
  - Show the step label under each node, using the existing small label style; add it if missing, but no new design.
  - Set each node's `alt` to the step name.
  - On hover, show that step's line under the diagram, and the 00 §6 heading above it.
- **App shell:**
  - Copy and data from 00b §H.
  - Replace the 9 unsplash avatars with initials.
  - Replace the Google Meet/Zoom badges with WhatsApp/Sheets/Gmail text badges in the same pill style.
  - "Upgrade to Pro" becomes the 00b text.
  - Remove the "New workflow" `onOpenAuth` call. The button opens Calendly.
  - Delete the unused `activityData`.
- **Bottom CTA block:**
  - heading and sub.
  - agenda (3 rows: number plus text, same small style).
  - time-zone row (one line of 5 items separated by `·`).
  - Calendly button.
  - trust line.
  - The block must still fit in the existing fade overlay at 1440px and 390px. If it doesn't fit, report it instead of moving the overlay.
- `PerspectiveScrollTilt` values, beams and Reveal are untouched.

## 5e. Footer (00b §I)
- Heading, sub, 3 columns, Calendly/WhatsApp/email links (email shows `[CONFIRM]` placeholder text only if it's still unset; otherwise hide that row), "© 2026 Newseed".
- Remove Privacy, Terms and Cookies.
- Social icons: Q5 outcome. If they're not provided, remove them.
- The language `<select>` changes to 2 options wired to `useLang().setLang`.
- Remove the `onOpenAuth` prop. `onOpenDemo` is replaced by direct Calendly links.

## Must not change
FAQ morph and pockets and their springs, GlassyFaq timing formulas, `PerspectiveScrollTilt` config, beam keyframes, the 3000ms row reset, LiquidOrb, and `StaggerGroup` settings.

## Acceptance
- Lint and build pass.
- ROI check: EN defaults (6 people, 10 h, $1,500) give **$16,200/yr** and **1,872 h/yr**. ID defaults (6, 10, Rp 6.500.000) give **Rp 70.200.000/tahun**. The reviewer recomputes these.
- Text search finds no `elev`, `Velie`, `Steven`, `Meeting`, `seat`, `trial`, `SOC 2`, `HIPAA` or `unsplash` in the touched files.
- Both languages at 1440px and 390px with no overflow, and all 4 FAQ cards play question → answer.
- `#roi`, `#engagement`, `#faq` and `#process` anchors work.
