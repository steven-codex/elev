# UI-E: Integrations arc carousel

**Implementer:** haiku (fallback sonnet medium) · **Depends on:** UI-A–D
**Request:** the user wants the right side of the Integrations card to work like their reference video (`Screen Recording 2026-11-05 at 19.52.26.mov`), adapted to Newseed and made better. This overrides the earlier "keep the 8 floating pills" rule for this stage only.

## What the reference does (from frames)
- A fixed source pill on the left.
- A curved dashed path on the right. Tool pills travel along it, one step at a time, about every 2s.
- The pill at the centre of the arc is the active one: solid surface, coloured logo, slightly larger, and its label is at full contrast.
- Pills above and below are translucent with monochrome logos, and fade out toward the top and bottom edges.

Use only this idea. Keep our light look and our own assets. Don't copy the reference's colours or layout pixels.

## Scope
**Only** `FluidIntegrationsStage` inside `src/components/IntegrationsSection.tsx`, plus `INTEGRATIONS.stage` in `landingData.ts`. The left column, heading, CTA and the `<dialog>` stay as they are.

### Layout
- Keep the existing stage background (`/integrations-bg.png`, its fade mask and corner clipping).
- **Hub (fixed, left of the stage):** white pill, right-aligned text, then the existing infinity logo in a circle, with `AcousticRippleAnimation` kept around the logo. Text: title and sub from the copy below.
- **Arc (right of the stage):** a dashed curved path bulging toward the hub, drawn as an SVG that scales with the stage (`preserveAspectRatio="none"`, `vector-effect: non-scaling-stroke`).
- **Pills:** position each pill by evaluating the same curve in JS from a slot offset (−2, −1, 0, +1, +2), so pills always sit on the line. Use percentages of the stage size, measured with a `ResizeObserver`, not fixed pixels. Render 5 visible pills, and fade pills at slots ±2 to low opacity. Slots beyond ±2 are hidden.
- **Active link:** a short dashed line from the hub to the active pill with the flowing-dash animation already used in `SystemDiagram` (`system-flow-x`), so the page reads as "hub connected to this tool".

### Pill states
| | Active (slot 0) | Inactive |
|---|---|---|
| Surface | solid white, layered soft shadow | `bg-white/55 backdrop-blur-md`, 1px white ring |
| Logo | brand colour | `ink-tertiary` monochrome |
| Title | body-sm medium `ink` | body-sm `ink-secondary` |
| Sub | caption `ink-secondary` | caption `ink-tertiary` |
| Scale | 1.06 | 1 |

Logos are single-colour SVG files, so render each with CSS `mask-image: url(/logos/x.svg)` on a span with `background-color`, and transition `background-color` from `--color-ink-tertiary` to the brand colour. Text on inactive pills must still pass 4.5:1 against the rendered background; slot ±2 pills are decorative (`aria-hidden`).

### Copy and data (`INTEGRATIONS.stage`, verbatim)
Hub: title "Newseed" / "Newseed"; sub EN "Your automation hub" / ID "Pusat otomasi Anda".

| Tool (logo) | Sub EN | Sub ID | Brand colour |
|---|---|---|---|
| WhatsApp (whatsapp) | Customer chats | Chat pelanggan | #25D366 |
| n8n (n8n) | Workflows | Workflow | #EA4B71 |
| Google Sheets (googlesheets) | Live data sync | Sinkron data langsung | #34A853 |
| OpenAI (openai) | AI models | Model AI | #0A0D14 |
| HubSpot (hubspot) | CRM and leads | CRM dan prospek | #FF7A59 |
| Claude (anthropic) | AI reasoning | Penalaran AI | #D97757 |
| Make (make) | Scenarios | Skenario | #6D00CC |
| Notion (notion) | Knowledge base | Knowledge base | #0A0D14 |

### Motion
- Step every 2.2s. Each pill moves to the next slot along the curve with a framer spring (`type: "spring", duration: 0.7, bounce: 0`). Animate `transform` and `opacity`. Pills follow the arc, because their target position comes from the curve at each slot.
- The list wraps endlessly. Avoid a visible jump when a pill wraps from one end to the other: it should be at opacity 0 while it moves.
- Hovering the stage or focusing a pill pauses the cycle. Clicking a visible pill makes it active, and the cycle resumes from there.
- Use `useLoopPlayback`: 3 passes through the list, then stop with `LoopReplayButton` in the stage's bottom-right. Pause off-screen.
- Under reduced motion: no stepping, WhatsApp stays active, the 5 pills sit static, and clicking still changes the active pill with no travel.

### Accessibility
Pills at slots −1, 0 and +1 are real buttons with `aria-pressed`, and `aria-label` of "{tool}, {sub}". The stage has an `aria-label`: EN "Tools Newseed connects" / ID "Tools yang dihubungkan Newseed". Add a polite live region only if it doesn't announce on every auto-step; don't announce auto-steps.

### Responsive
- **lg and up:** the layout above.
- **Below lg:** stage height about 420px. The hub shrinks to the logo circle only (title visually hidden), still on the left, and pills use the remaining width. No clipped text at 320px.

## Remove
The 8 floating `IntegrationPill`s and their float animation, now replaced. Keep `AcousticRippleAnimation`. Keep the dialog's own data untouched.

## Acceptance
- Lint and build pass.
- 1440, 1024, 390 and 320 in EN and /id: pills sit on the dashed line at rest (measure the centre of each pill against the curve), no clipped text, no horizontal overflow.
- Stepping feels continuous, with no pill jumping across the stage visibly.
- Hover pause, click to activate, 3 passes then "Play again", off-screen pause.
- All other `layoutId`s and sections unchanged.

## Review fixes (main session)
1. **Hub is one pill.** Now the text sits on a separate pill tucked behind a large logo circle, and "Your automation hub" touches the circle. Make the hub a single white pill that **contains** the text and the logo circle: text right-aligned, then the circle inside the pill with even padding (`p-2 pl-5`), pill radius concentric with the circle, soft layered shadow. `AcousticRippleAnimation` stays centred on the circle, behind the pill. Leave at least 24px between the hub and the left column's text at 1440px and 1024px.
2. **Inactive pill legibility.** Raise the slot ±1 surface to `bg-white/80 backdrop-blur-md` and keep slots ±2 as they are (decorative). Sample rendered pixels behind slot ±1 text and report the contrast; title and sub must reach 4.5:1 at rest.

## Review decisions (main session)
- **Hub at 1024px overlaps the active pill.** Change the responsive threshold: the hub shows its text pill only at `xl` and up. Below `xl` it's the logo circle only (text stays `sr-only`), with the same pill styles moved from `lg:` to `xl:`.
- **Slot ±1 subtitle fails 4.5:1.** Use `text-ink-secondary` for the sub on slots 0 and ±1. Keep `ink-tertiary` only on slots ±2, which are decorative.
