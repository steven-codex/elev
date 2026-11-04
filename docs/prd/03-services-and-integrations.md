# PRD 03: Services deck (TimelineFeatureDeck + MinimalistMotionStage) + Integrations

**Implementer:** haiku (fallback sonnet medium) · **Depends on:** 01, 00b approved
**Files you may touch:** `TimelineFeatureDeck.tsx`, `MinimalistMotionStage.tsx`, `IntegrationsSection.tsx`, `src/data/landingData.ts` (new `DECK`, `INTEGRATIONS` keys), `public/logos/*` (only if Q4 is approved, see below)

## Goal
Swap the content of the services deck and the integrations section to 00b §C and §E, in both languages. Motion stays identical.

## Scope: TimelineFeatureDeck (00b §C)
1. **Section id:** change `id="features"` to `id="services"`. Remove the sr-only `#workflows` div.
2. **Heading and sub:** H2 and sub from `SERVICES` (00 §5). Keep the italic gradient span; it wraps the second sentence.
3. **Agent card:**
   - Title, copy chip value and Copy/Copied labels.
   - The 3 modes become the `USE_CASES` tabs. Keep the orb state mapping: Sales → idle, Operations → thinking (default), Customer service → thinking.
   - Under the orb, show the active use case line, using the existing subtitle style.
   - Footer from 00b.
4. **Chart card:**
   - Title "Hours saved".
   - Tabs Chats/Leads/Hand-offs and their 3 data sets from 00b.
   - Mon–Sun labels: ID uses Sen–Min.
   - Big values and the dropdown label.
   - Bar heights are proportional to the max value in each set, using the existing percentage approach.
   - Format numbers with `toLocaleString(lang === 'id' ? 'id-ID' : 'en-US')`.
5. **Remove** the unused `onOpenAuth` prop from TimelineFeatureDeck and EarningsPayoutsCard, and update the call site in `App.tsx`. That one line is the only App.tsx edit allowed.

## Scope: MinimalistMotionStage (00b §C table)
1. **4 stages:** labels, badges and copy as in the 00b table. The stage `id`s and the durations 4.0/4.5/4.0/4.0 don't change.
2. **Scene 1:** calendar "November 2026", target 12, and the 3 slots plus done state from 00b. "Google Calendar" becomes "WhatsApp".
3. **Scene 2:** the 3 floating skeleton cards each show one signal chip (00 §3, first 3) as one line of text in place of the first skeleton bar. Keep the other bars.
4. **Scene 3:** copy only.
5. **Scene 4:**
   - Copy as in 00b. Amount stays $360.00, en-US format, in both languages.
   - Replace the 6 unsplash avatars with initials circles of the same size and position. Use initials only, no external images.
6. **Controls bar:** relabel the scrubber ticks to the new stage names. It's hidden on the live page, but the labels should be correct.
7. **Clean up:** remove the dead `elev:seek-stage` listener.

## Scope: IntegrationsSection (00b §E)
1. H2, sub and CTA from 00b.
2. **Modal:**
   - title, sub, search placeholder.
   - 5 categories.
   - 15 entries, each with an EN/ID description line written by you in the style of the 00b example: plain, under 70 characters, no claims or numbers.
   - "Showing N tools" and "Done" labels.
   - **Remove the Connected/Connect toggle** and its state.
3. **Floating pills:** 8 tools in the 00b positions. The centre logo stays (see Q3).
4. **Icons:**
   - If the user approves **Q4**: place official SVGs in `public/logos/<slug>.svg` and point every icon in this file to them. Copy the SVG markup from the Simple Icons project source; it's CC0. Keep the `onError` hide.
   - If Q4 is not approved: keep the current hotlinks and use them only for tools that already have one. Tools without an icon get a neutral letter circle.
5. Remove the unused `onOpenDemo` prop and the unused `ImageReveal` import. Update the App.tsx call site; that's the only App edit allowed.

## Must not change
- `layoutId`s `activeVelieModePill`, `activePayoutTabPill`, `deckActiveTabTimbul`.
- The 3200ms payout tab cycle, the 2000ms copy reset and the 16.5s rAF clock.
- The 20s marquee and the 3.8s/3.5s floats.
- Pill floats (4.4–5.6s) and the acoustic pulse (4.8s).
- LiquidOrb (don't edit the file).
- Grid spans and card sizes.

## Acceptance
- Lint and build pass.
- Both languages at 1440px and 390px show no overflow on the mode buttons, chart tabs or stage labels.
- Text search finds no `elev`, `Velie`, `Stripe`, `unsplash`, `earnings` or `Meeting` in these 3 files.
- The stage loop takes 16.5s and the order is Ask → Capture → Notify → Quote.
- `#services` and `#integrations` anchors scroll correctly from the Navbar.
