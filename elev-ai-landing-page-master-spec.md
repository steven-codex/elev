# Master Build Specification --- Elev.ai-Style SaaS Landing Page

> Goal: recreate the supplied reference landing page as closely as
> possible in **layout, proportions, visual hierarchy, spacing,
> component density, card treatment, blue/white palette, and overall
> enterprise SaaS feel**, while using our own brand/content/assets where
> required.
>
> Reference source: the supplied full-page screenshot and its seven
> cropped section references.
>
> **Important:** Do not treat this as a loose inspiration brief. Treat
> the screenshot as the visual source of truth. Match geometry first,
> then typography, spacing, styling, and finally motion.

------------------------------------------------------------------------

## 1. Global Direction

Build a polished enterprise SaaS landing page with a bright white base,
restrained electric-blue accents, very light cool-gray borders, soft
blue atmospheric glows, rounded cards, compact product UI mockups, and
occasional deep navy sections.

The page should feel: - clean - premium - trustworthy - product-led -
highly structured - dense enough to demonstrate a real SaaS platform -
modern without looking like a generic template

Avoid: - oversized gradients everywhere - excessive glassmorphism - huge
border radii - heavy shadows - neon cyberpunk styling - random
decorative blobs - excessive animation - overly large headings - sparse
layouts that lose the density of the reference

------------------------------------------------------------------------

## 2. Page Shell

### Desktop reference behavior

-   Overall content width: approximately `1200–1280px`
-   Main page centered horizontally.
-   Outer page background: `#FFFFFF`
-   Main content horizontal padding: `24–32px`
-   Section vertical rhythm: generally `72–112px`
-   Cards use subtle `1px` cool-gray borders.
-   Main radius system:
    -   small controls: `8–10px`
    -   cards: `12–16px`
    -   large feature panels: `18–22px`
-   Shadows must be extremely soft.

Suggested tokens:

``` css
:root {
  --blue: #0B63F6;
  --blue-bright: #0868FF;
  --blue-soft: #EAF2FF;
  --navy: #061A3A;
  --navy-deep: #03142E;
  --text: #101828;
  --text-secondary: #475467;
  --muted: #667085;
  --border: #E4E7EC;
  --surface: #FFFFFF;
  --surface-soft: #F8FAFC;
  --success: #12B76A;

  --radius-sm: 9px;
  --radius-md: 14px;
  --radius-lg: 20px;

  --shadow-card:
    0 1px 2px rgba(16,24,40,.03),
    0 8px 24px rgba(16,24,40,.05);
}
```

------------------------------------------------------------------------

# 3. Typography

Use a clean grotesk/geometric SaaS sans-serif.

Preferred: 1. Inter 2. Geist 3. Manrope 4. SF Pro Display fallback

### Scale

Hero H1: - desktop `54–64px` - weight `650–750` - line-height
`0.98–1.05` - tracking around `-0.04em`

Section H2: - `36–44px` - line-height `1.05–1.12` - weight `650–700`

Card title: - `18–22px` - weight `600–650`

Body: - `15–17px` - line-height `1.5–1.65`

Small UI text: - `11–14px`

Do not make every text bold.

Blue emphasis inside headings should use the primary blue rather than
gradients.

------------------------------------------------------------------------

# 4. Header / Navbar

Height approximately `72–80px`.

Structure:

``` text
LOGO
Product ▼
Solutions ▼
Resources ▼
Pricing

                         Talk to sales
                         Log in
                         Get started for free
```

Requirements: - white background - no heavy divider - logo aligned
left - nav items compact - CTA group aligned right - primary CTA is
solid blue - secondary buttons white with light gray border - pill-like
but not excessively rounded - subtle hover transitions

Sticky navbar is acceptable, but the initial visual state must look like
the reference.

------------------------------------------------------------------------

# 5. Section 01 --- Hero

Desktop composition: roughly `48% copy / 52% product visual`.

### Left column

Eyebrow:

``` text
AI MEETING MANAGEMENT
```

Small uppercase blue text.

Headline structure should visually follow:

``` text
Easy scheduling ahead.
One platform for
every meeting.
```

The final emphasized phrase is blue.

Below it: - short paragraph - max width around `500px` - muted dark-gray
text

Then an inline conversion form:

``` text
[ Enter your work email                  ] [ Get started for free ]
```

Height around `48–52px`.

Below form, show three trust/stat items horizontally: - percentage
efficiency metric - teams/users metric - security certification

Each: - small blue icon - bold numeric value - 1--2 lines supporting
copy

### Right hero product composition

Do NOT use one flat screenshot.

Reconstruct it as overlapping UI cards: 1. Large scheduling/calendar
card in back. 2. Meeting confirmation card floating upper-right. 3.
Analytics/stat card floating lower-right. 4. Soft blue glow behind the
composition.

Calendar card: - white - subtle shadow - rounded corners - mini month
calendar - selected date as blue circle - time-selection controls below

Confirmation card: - meeting name - meeting duration/platform -
date/time - email/domain - green confirmation state

Analytics card: - large number - small green percentage - blue mini line
graph

Layering must create depth without excessive 3D perspective.

------------------------------------------------------------------------

# 6. Section 02 --- Primary Blue Product Showcase

Large rounded rectangle with deep navy-to-electric-blue background.

Approximate layout: - top segmented product navigation - left marketing
copy - center/right product UI dashboard

### Top segmented control

Items:

``` text
Scheduling
Callie AI
Notetaker 2.0
Payments
```

Use translucent blue container.

Active tab: - white capsule - blue text

### Left copy

Large white heading:

``` text
Everything
you need,
right where
you need it.
```

Supporting white/blue-gray paragraph.

Small play/demo CTA beneath.

### Product dashboard

Create four overlapping/lightly connected panels: 1. Routing panel 2.
Select-a-time/calendar panel 3. AI assistant/chat panel 4.
Checkout/payment panel

All product panels: - white surfaces - subtle cool shadows - realistic
UI density - tiny labels and controls - consistent radius

The visual should feel like an actual product interface, not abstract
decorative cards.

------------------------------------------------------------------------

# 7. Section 03 --- Three Feature Cards

Three equal columns.

``` text
Automate your meeting workflow
VIP smart scheduling
Connected meeting stack
```

Each card: - white - border - rounded `14–16px` - generous top text
area - product visualization in lower half - similar height

### Card 1 --- Workflow

Vertical sequence:

``` text
Lead captured
↓
Route to best owner
↓
Meeting booked
↓
Follow-up sent
↓
Deal advanced
```

Use tiny blue/green status indicators.

### Card 2 --- Smart scheduling

Show: - profile/avatar - best match - fit percentage - rating - optimal
meeting time - buffer setting

### Card 3 --- Integrations

Grid/pills for: - Salesforce - HubSpot - Slack - Notion - Zoom - Google
Meet

Finish with a subtle blue text link:

``` text
+ 50+ more integrations
```

------------------------------------------------------------------------

# 8. Section 04 --- Meeting Lifecycle

Centered title:

``` text
The meeting lifecycle, elevated.
```

Subtitle underneath.

Four lifecycle columns:

``` text
1 Before
2 During
3 After
4 Revenue
```

Connect the numbered markers with a thin dotted/light-blue horizontal
line.

Each lifecycle stage includes a product card beneath it.

### Before

-   calendar sync
-   Google Calendar
-   Outlook Calendar
-   routing rules

### During

-   live transcript
-   AI badge
-   action items

### After

-   summary
-   integrations
-   share destinations

### Revenue

-   invoice paid
-   green revenue amount
-   payment date
-   download invoice
-   view payment

Keep this section airy despite containing many UI details.

------------------------------------------------------------------------

# 9. Section 05 --- Dark Integration Ecosystem

Large deep-navy rounded panel.

### Left

Eyebrow:

``` text
WORKS WITH YOUR STACK
```

Heading:

``` text
Connect [brand] to
everything you use.
```

Supporting paragraph and understated button.

### Right

Create a radial ecosystem visualization.

Center: - circular glowing brand node

Around it: - Calendar - CRM - Notes - Automations - Payments - Video

Each category appears in a small translucent dark-blue group with
recognizable app tiles.

Connect outer nodes to the center using very subtle dotted/curved lines.

Use a controlled blue halo around the center node.

Do not make this look like a crypto/network graphic.

------------------------------------------------------------------------

# 10. Section 06 --- Pricing

Centered heading:

``` text
Simple, transparent pricing
```

Billing toggle beneath:

``` text
Billed monthly   Billed yearly   Save 20%
```

Four-column pricing grid:

``` text
Free
Pro
Team
Enterprise
```

### Card anatomy

-   plan name
-   short descriptor
-   price
-   billing period
-   checklist
-   CTA at bottom

### Team card

This is the emphasized plan: - blue border - small blue top label:
`MOST POPULAR` - blue CTA - otherwise still white

Do not turn the entire Team card blue.

Enterprise: - `Custom` - CTA `Talk to sales`

Pricing cards must align perfectly along their top/bottom edges.

------------------------------------------------------------------------

# 11. Section 07 --- FAQ

Two-column structure.

Left: - small blue `FAQ` - large multiline heading:

``` text
Frequently
asked
questions
```

-   `View all FAQs →`

Right: accordion list.

Example questions: - What is \[product\]? - Can the AI join any
meeting? - How does routing work? - Is my data secure? - Can I collect
payments?

Rows: - white background - subtle dividers - plus icon aligned right -
smooth open/close animation

------------------------------------------------------------------------

# 12. Final CTA Banner

Place directly above footer.

Soft pale-blue horizontal panel with rounded corners.

Left side: - circular blue glow/icon - heading:

``` text
Ready to elevate your meetings?
```

-   supporting sentence

Right: - primary blue button - secondary outlined button

Maintain compact height.

------------------------------------------------------------------------

# 13. Footer

White footer.

Top/left: - brand logo - one-line description - social icons

Columns: - Product - Solutions - Resources - Company

Links should be small, dark gray, and vertically compact.

Bottom: - copyright

No giant footer whitespace.

------------------------------------------------------------------------

# 14. Product UI Styling Rules

This is critical.

The reference achieves its look through **UI-within-UI**.

Every mini product screen must share the same design system.

### Mini-card rules

``` css
.product-card {
  background: #fff;
  border: 1px solid rgba(228,231,236,.9);
  border-radius: 12px;
  box-shadow:
    0 1px 2px rgba(16,24,40,.02),
    0 8px 22px rgba(16,24,40,.05);
}
```

Mini controls: - compact - height `26–34px` - border radius `6–8px` -
tiny labels - blue active states

Selected calendar dates: - solid blue circle - white number

Success: - pale green background - green text/check

Avoid lorem ipsum inside major UI elements. Use believable SaaS data.

------------------------------------------------------------------------

# 15. Background Effects

Hero may contain one large soft blue glow behind product cards.

Use something similar to:

``` css
.hero-glow {
  position: absolute;
  width: 520px;
  height: 520px;
  border-radius: 999px;
  background: rgba(35, 117, 255, .20);
  filter: blur(90px);
  pointer-events: none;
}
```

Glow should disappear gradually into white.

Never use sharp radial-gradient circles.

------------------------------------------------------------------------

# 16. Responsive Behavior

### ≥ 1200px

Match reference desktop geometry closely.

### 768--1199px

-   reduce outer padding
-   hero remains two-column as long as readable
-   feature cards can become 2+1
-   lifecycle can become 2×2
-   pricing can become 2×2

### \< 768px

-   single-column hero
-   product visual below copy
-   horizontal product tabs may scroll
-   all three feature cards stack
-   lifecycle stacks
-   integration diagram simplified
-   pricing stacks
-   FAQ becomes one column

Do not simply shrink desktop UI until it becomes unreadable.

------------------------------------------------------------------------

# 17. Motion

Motion should feel expensive but quiet.

Use: - `transform` - `opacity` - slight blur - tiny stagger - subtle
floating product-card depth

Suggested reveal:

``` text
opacity: 0 → 1
translateY: 18px → 0
blur: 6px → 0
duration: 550–750ms
ease: cubic-bezier(.22,1,.36,1)
```

Hero product cards: - stagger `70–120ms`

Feature cards: - reveal as group

Integration network: - center glow appears first - connection lines fade
in - app groups reveal afterward

Do not: - bounce - rotate cards dramatically - animate every icon - use
long parallax - use scroll-jacking

Respect `prefers-reduced-motion`.

------------------------------------------------------------------------

# 18. Recommended Implementation

Preferred stack:

``` text
Next.js
React
TypeScript
Tailwind CSS
Lucide Icons
GSAP only where timeline/scroll orchestration materially improves the result
```

For simple entrances, CSS/Framer Motion is sufficient.

Do not introduce Three.js for this design.

------------------------------------------------------------------------

# 19. Component Architecture

``` text
app/
  page.tsx

components/
  Navbar.tsx
  Hero.tsx

  product-ui/
    CalendarCard.tsx
    ConfirmationCard.tsx
    AnalyticsCard.tsx
    RoutingPanel.tsx
    AssistantPanel.tsx
    CheckoutPanel.tsx
    WorkflowCard.tsx
    SchedulingCard.tsx

  ProductShowcase.tsx
  FeatureGrid.tsx
  Lifecycle.tsx
  IntegrationEcosystem.tsx
  Pricing.tsx
  FAQ.tsx
  FinalCTA.tsx
  Footer.tsx

  ui/
    Button.tsx
    Badge.tsx
    Card.tsx
    Avatar.tsx
    LogoTile.tsx
```

Avoid building the entire landing page in one component.

------------------------------------------------------------------------

# 20. Fidelity Workflow

Implement section-by-section in this exact order:

``` text
01 Navbar + Hero
02 Blue Product Showcase
03 Feature Cards
04 Meeting Lifecycle
05 Integration Ecosystem
06 Pricing
07 FAQ + CTA + Footer
```

After every section:

1.  Render at the same viewport width as the reference.
2.  Compare screenshot and implementation side-by-side.
3.  Fix large geometry first.
4.  Fix typography.
5.  Fix spacing.
6.  Fix card dimensions.
7.  Fix borders/shadows.
8.  Fix micro UI.
9.  Only then add animation.

Do not move to the next section while obvious proportional differences
remain.

------------------------------------------------------------------------

# 21. Visual Fidelity Checklist

Before declaring the page complete, verify:

-   [ ] Overall content width matches reference.
-   [ ] Hero height and two-column ratio match.
-   [ ] H1 does not wrap differently without reason.
-   [ ] Product cards overlap in the same visual hierarchy.
-   [ ] Main blue showcase has similar height/proportions.
-   [ ] Three feature cards have equal dimensions.
-   [ ] Lifecycle has exactly four visually balanced stages.
-   [ ] Dark integration section is not too tall.
-   [ ] Pricing cards align.
-   [ ] FAQ layout remains compact.
-   [ ] CTA banner matches surrounding content width.
-   [ ] Footer density matches.
-   [ ] Blue saturation is consistent.
-   [ ] Borders remain subtle.
-   [ ] Shadows are soft.
-   [ ] No generic template styling has replaced reference geometry.

------------------------------------------------------------------------

# 22. Instructions for Coding Agent

Use the supplied section images as **visual references**, not as images
embedded into the website.

Rebuild all interface elements in HTML/CSS/React wherever practical.

When examining each reference image, infer: - container dimensions -
column proportions - spacing - padding - alignment - font hierarchy -
border radius - border intensity - shadow softness - card overlap -
relative positioning

Do not improvise a new visual direction.

If a detail is unclear because the source screenshot is low-resolution,
preserve its **visual role and approximate geometry** rather than
inventing a large new component.

The most important requirement is:

> **At a glance, the recreated page should have nearly the same
> silhouette, density, spacing rhythm, section heights, blue/white
> balance, and product-card composition as the supplied reference.**

------------------------------------------------------------------------

# 23. Final Coding-Agent Prompt

``` text
Recreate the supplied SaaS landing-page reference with very high visual fidelity.

Read this entire specification before coding. Use the seven supplied reference crops to implement the page section by section.

Do not merely create a landing page inspired by the screenshot. Reproduce its layout system, visual hierarchy, proportions, section order, spacing rhythm, card density, product UI composition, blue/white balance, typography scale, border treatment, shadows, and responsive behavior as closely as possible.

Do not place the reference screenshots directly into the website. Reconstruct the interface with reusable React components and CSS/Tailwind.

Start with Navbar + Hero only. Match its geometry carefully before continuing. Then implement Product Showcase, Feature Cards, Meeting Lifecycle, Integration Ecosystem, Pricing, FAQ, CTA, and Footer.

Use realistic mini product interfaces rather than placeholder rectangles. Keep shadows subtle, borders light, typography crisp, and blue accents controlled.

At desktop width, the final page should visually line up with the supplied full-page reference when viewed side-by-side.

After implementation, perform a visual QA pass section by section and correct:
1. dimensions,
2. positioning,
3. typography,
4. spacing,
5. card overlap,
6. colors,
7. borders/shadows,
8. micro-details.

Do not add unrelated sections or stylistic flourishes.
```
