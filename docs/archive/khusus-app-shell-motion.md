# Hyperframes Motion Brief — Existing Selected Div

## Objective

Redesign **only the existing selected div** into a clean, modern mobile app-shell motion sequence.

This is a **marketing motion component**, not a full functional mobile application and not a product walkthrough. Keep the information intentionally minimal. The purpose is to visually communicate one automated workflow:

**Smart Booking → Velie AI Copilot → Instant Recaps → Upfront Pay → Complete**

Do not create additional website sections. Do not replace the surrounding page. Preserve the existing div's position, dimensions, responsive behavior, and overall role in the current layout.

---

## Core Design Direction

Use a premium modern SaaS aesthetic inspired by clean shadcn-style UI and refined ReactBits-style motion.

Visual characteristics:

- clean white / very light cool background
- extremely subtle blue ambient gradient
- thin neutral borders
- large but controlled border radius
- soft shadows only where needed
- dark navy/charcoal typography
- vivid blue as the primary active state
- green reserved for successful completion
- restrained glass/blur effects
- generous negative space
- minimal copy
- no dashboard clutter
- no unnecessary navigation
- no excessive decorative elements
- no AI-generated-looking gradients or floating blobs everywhere

The selected div should visually read as a **mobile app shell embedded inside the website section**.

---

# Persistent App Shell

The mobile shell remains fixed throughout the entire animation.

Do **not** animate between separate phone screenshots.

Structure:

```text
┌──────────────────────────────┐
│                              │
│  01      02      03      04  │
│ Booking Copilot Recaps  Pay  │
│                              │
│                              │
│        DYNAMIC STAGE         │
│                              │
│                              │
│                              │
│ ━━━━━━━━━━━━━━━━━━━━━━━━     │
└──────────────────────────────┘
```

Persistent elements:

1. Mobile/app-shell container
2. Four-step navigation at the top
3. Main dynamic stage in the center
4. Thin progress indicator at the bottom

Only the following should change during the animation:

- active step
- connector/progress state
- content inside the dynamic stage
- contextual icons
- success states

---

# Top Stepper

Create four compact steps:

### 01 — Smart Booking
Calendar icon

### 02 — Velie AI Copilot
Spark / AI icon

### 03 — Instant Recaps
Clock / recap icon

### 04 — Upfront Pay
Payment/card icon

Inactive states:

- very light neutral background
- muted navy/gray icon
- muted label

Active state:

- saturated blue
- white icon when appropriate
- stronger label weight
- subtle blue glow only around active element

Completed states may become a subtle check state instead of remaining visually dominant.

The active indicator must **glide/morph between steps**, rather than disappearing and reappearing.

---

# Motion Duration

Target complete loop:

**10–12 seconds**

The animation must loop seamlessly.

Do not make the viewer wait through long static screens.

---

# STORYBOARD

## Scene 01 — Smart Booking

**Time: 0.0s–2.2s**

Activate Step 01.

Inside the central stage, reveal one simple floating scheduling card.

Content:

```text
[ Calendar icon ]

Smart Booking

Thu, Oct 14 · 2:00 PM

[ Google Calendar ]
```

Keep this extremely minimal.

### Animation

1. App shell fades/scales into its settled state if this is the initial page load.
2. Step 01 active pill glides into position.
3. Calendar icon scales from `0.85 → 1`.
4. Scheduling card moves upward approximately 20px while opacity changes `0 → 1`.
5. Date/time appears with a short stagger.
6. Google Calendar chip appears last.
7. A small success check briefly confirms the booking.

Avoid opening a full calendar UI.

The scene should communicate booking in less than two seconds.

---

# Scene 01 → Scene 02 Transition

**Time: 2.2s–2.7s**

Do not simply fade the booking card away.

Use shared-element continuity.

The calendar/success element contracts into a small glowing blue node.

The node travels toward Step 02 along a subtle curved path.

As it moves:

- Step 01 becomes completed
- connector fills toward Step 02
- active state glides to Step 02

Use a subtle directional blur while the node travels.

---

# Scene 02 — Velie AI Copilot

**Time: 2.7s–4.0s**

This should be the shortest state.

Do not create another large card.

The blue node settles near the center of the dynamic stage.

Create a restrained AI-processing visual around it.

Three tiny pills appear:

```text
Notes
Tasks
Follow-up
```

They can briefly orbit or emerge around the central AI node.

Sequence:

```text
Meeting
   ↓
   ✦
 ↙ ↓ ↘
Notes  Tasks  Follow-up
```

Do not use excessive particles.

The purpose of this state is simply:

**the AI handles the work between booking and outcome.**

After approximately one second, the three elements converge back toward the central node.

---

# Scene 02 → Scene 03 Transition

**Time: 4.0s–4.4s**

The processed node travels toward Step 03.

The active indicator glides from Step 02 to Step 03.

The center stage simultaneously morphs from the abstract AI state into the recap card.

Avoid a hard cut.

---

# Scene 03 — Instant Recaps

**Time: 4.4s–6.4s**

This is one of the main payoff moments.

Use one centered card.

Content:

```text
        ✓

Recaps Broadcasted

Sent to 5 attendees

[ Notion ]   [ Slack ]
```

No paragraph underneath.

Do not show detailed meeting notes.

Do not show multiple nested cards.

### Animation Sequence

**0–250ms**

Main card enters:

- translateY `20px → 0`
- scale `0.97 → 1`
- opacity `0 → 1`
- blur `6px → 0`

**250–500ms**

Success circle scales:

`0 → 1.08 → 1`

**400–650ms**

Draw the checkmark path.

**550–800ms**

Reveal:

`Recaps Broadcasted`

**700–950ms**

Reveal:

`Sent to 5 attendees`

**900–1200ms**

Notion icon appears.

**1000–1300ms**

Slack icon appears.

Use approximately 80–120ms stagger between integrations.

---

# Scene 03 → Scene 04 Transition

**Time: 6.4s–7.0s**

Make this transition especially satisfying.

Notion and Slack chips move toward one another.

```text
[ Notion ]             [ Slack ]
       ↘               ↙
              ●
```

They collapse into a single blue workflow node.

That node travels along a curved connector toward Step 04.

Leave a short blue light trail behind it.

Trail duration should be approximately 250–350ms.

The active indicator simultaneously glides to Step 04.

---

# Scene 04 — Upfront Pay

**Time: 7.0s–9.0s**

Show one clean payment-success card.

Initial state:

```text
Payment

$0
```

Animate the amount smoothly:

```text
$0 → $360.00
```

Do not animate through visibly discrete numbers unless the interpolation is fast enough to feel continuous.

Final card:

```text
        ✓

Payment Complete

$360.00

[ Paid ✓ ]
```

Optional tiny Stripe icon may appear as contextual metadata.

Do NOT show:

- full card number
- transaction date
- receipt details
- payment form
- long explanatory copy

### Motion Sequence

1. Payment card resolves from workflow node.
2. `$0` appears.
3. Amount interpolates to `$360.00` over approximately 450–550ms.
4. `Paid` pill enters.
5. Success check draws.
6. `Payment Complete` becomes final visual emphasis.

---

# Scene 05 — Workflow Complete

**Time: 9.0s–10.3s**

Hold the completed payment state briefly.

Then complete the entire top workflow.

Visual:

```text
✓ ━━━━━ ✓ ━━━━━ ✓ ━━━━━ ✓
```

Animate the connector from left to right.

Each completed step receives one subtle confirmation pulse in sequence:

```text
01 → 02 → 03 → 04
```

Stagger approximately 60–90ms.

Pulse should be restrained:

`scale 1 → 1.06 → 1`

Do not bounce.

---

# Scene 06 — Brand Payoff / Loop Transition

**Time: 10.3s–11.5s**

The dynamic card softly fades down.

The four completed workflow nodes visually converge toward the center.

Use their movement to form the existing Dovie brand/infinity/butterfly-style mark.

Example spatial logic:

```text
●               ●

●               ●

       ↓

      ╲ ╱
       ×
      ╱ ╲
```

Resolve into the Dovie mark.

Do not add a large marketing headline inside this component.

Optional tiny line only if the surrounding website currently needs it:

**Everything flows.**

Otherwise keep the brand payoff purely visual.

Hold for approximately 400–600ms.

Then collapse the mark back into the initial workflow node and transition seamlessly into Smart Booking.

---

# Seamless Loop Requirement

The final frame must naturally connect to the initial frame.

Do not:

- flash white
- reset instantly
- cut between states
- restart progress abruptly

Preferred loop:

```text
Dovie mark
   ↓
small blue node
   ↓
node travels to Step 01
   ↓
calendar icon resolves
   ↓
Smart Booking begins again
```

---

# Bottom Progress Indicator

Keep a thin progress line near the bottom edge of the app shell.

It represents the animation timeline, not a scroll bar.

Characteristics:

- neutral track
- 2–3px height
- blue active progress
- rounded caps
- no label

Animate continuously from 0–100% during the 10–12 second sequence.

At the loop point, reset using the same brand-node transition so the reset does not feel abrupt.

---

# Motion System

Use these rules consistently throughout the selected div.

## General

```text
premium SaaS product motion
minimal
fluid
precise
restrained
high-quality product animation
no exaggerated bouncing
no flashy transitions
no excessive particles
```

## Timing

```text
micro interaction: 160–260ms
small UI reveal: 250–400ms
state transition: 450–650ms
shared-element transition: 550–800ms
```

## Easing

Prefer:

```text
easeOutExpo
```

for element reveals.

Prefer:

```text
easeInOutQuart
```

for positional movement.

Use a very subtle spring only for:

- success icons
- small badges
- cards settling into place

Never use cartoon-like bounce physics.

## Scale

```text
cards: 0.97 → 1
icons: 0.85 → 1
success icon: 0 → 1.08 → 1
step confirmation: 1 → 1.06 → 1
```

## Blur

```text
enter: 6–8px → 0
exit: 0 → 4–6px
```

Blur should only support movement, not become a permanent visual effect.

---

# ReactBits-Inspired Effects

Use ReactBits-style ideas selectively rather than reproducing a flashy demo aesthetic.

Appropriate effects:

- animated active pill
- subtle moving gradient/glow
- shared element morph
- curved animated connector
- tiny light trail
- restrained icon orbit
- number interpolation
- path-drawn checkmark

Avoid:

- giant glowing cursor effects
- particle explosions
- text scrambling
- constant gradient movement
- liquid distortion on every component
- magnetic hover behavior inside the autoplay sequence
- 3D card rotations

One dominant motion event should happen at a time.

---

# Responsive Behaviour

The selected div already exists in the page.

Respect its current responsive container.

### Desktop

Display the mobile app shell centered within the selected div.

Allow surrounding negative space.

Do not stretch the app UI to desktop-dashboard proportions.

### Tablet

Scale the shell proportionally.

### Mobile

The shell can occupy most of the available width.

Maintain comfortable horizontal padding.

Do not create horizontal overflow.

The animation itself should remain identical across breakpoints.

---

# Implementation Constraints

Modify **only the selected existing div and its necessary child elements**.

Do not:

- redesign the navbar
- redesign the surrounding page
- change unrelated typography
- change global spacing
- create new landing-page sections
- alter existing page copy outside this div
- add dependencies unless genuinely necessary

Reuse the project's existing:

- React architecture
- Tailwind setup
- shadcn components/tokens where available
- icon library
- border-radius tokens
- typography
- brand colors

If motion tooling already exists, reuse it.

If a lightweight animation solution is required, prefer composable React animation rather than video playback.

---

# Component Philosophy

The animation should feel like a real product interface even though its primary purpose is marketing motion.

Prioritize:

**clarity → continuity → motion → decoration**

not:

**decoration → complexity → information density**

Every state should be understandable in roughly one second.

The viewer should understand the complete story without reading paragraphs:

```text
Book
 ↓
AI works
 ↓
Recap sent
 ↓
Payment received
 ↓
Done
```

---

# Final Visual Target

The final result should feel like a polished product animation from a modern premium SaaS landing page — somewhere between a refined shadcn application interface and a carefully restrained ReactBits motion showcase.

It should NOT look like:

- a mobile dashboard screenshot carousel
- four independent screens
- an onboarding wizard
- a presentation deck
- a generic AI SaaS animation
- a complex functional application

It should feel like **one persistent app shell demonstrating an automated workflow in a continuous loop**.
