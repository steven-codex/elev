# elev — Landing Page Specifications & Structure

> **URL:** `http://localhost:3000/`  
> **Source Component Directory:** `d:\elev\src\components`  
> **Design Alignment:** `https://calendly.com/` (Clean, editorial, high-converting SaaS landing page)

---

## 📐 Page Hierarchy & Section Breakdown

```
[ Navigation Bar ] -> Logo, Mega-menu, Solutions, Resources, Pricing, Auth CTAs
        │
[ Hero Section ] -> Headline, Value Prop, Email Signup Bar, Social Proof Badges
        │
[ Hero Blue Stage ] -> 4-Product Squircle Switcher Tabs (Scheduling, Callie AI, Notetaker, Payments)
        │                 ├── Interactive Expanding Booking Calendar
        │                 ├── Live Chat Conversation Animation
        │                 ├── Notetaker Live Recap Preview
        │                 └── 5-Scene Vertical Conveyor Payment Carousel
        │
[ Hero Bento Grid ] -> 3 Equal-Width Feature Showcase Cards
        │                 ├── Card 1: Meeting Automation & Follow-up Backlog
        │                 ├── Card 2: Smart VIP Scheduling & Buffers
        │                 └── Card 3: 4x3 Frosted Stack Integration Grid
        │
[ Lifecycle Deck ] -> 4-Phase Lifecycle Timeline (Before, During, After, Revenue)
        │
[ Metrics & Bento ] -> High-impact Stats, SOC2 Security & Trust Badges
        │
[ Social Proof ] -> Customer Stories & Testimonial Carousel
        │
[ Notice Banner & Footer ] -> Bottom Conversion CTA & Sitemap Links
```

---

## 1. 🌐 Navigation Bar ([`Navbar.tsx`](file:///d:/elev/src/components/Navbar.tsx))

- **Brand Logo:** `elev.ai` (squircle icon + crisp sans-serif wordmark)
- **Navigation Links:**
  - **Product (Dropdown):** Scheduling Engine, Callie AI Assistant (Beta), Notetaker 2.0 (New), Payments & Checkout (New), Platform Integrations.
  - **Solutions:** For Sales Teams, For Founders, For Agencies & Freelancers, Enterprise.
  - **Resources:** Documentation, Blog & Insights, API Specs, Changelog.
  - **Pricing:** Flexible plans (Free, Pro, Team, Enterprise).
- **Actions:**
  - `Talk to sales` (Ghost button)
  - `Log In` (Border pill)
  - `Get started for free` (Signature Electric Blue `#0055FF` pill)

---

## 2. ⚡ Hero Section & Conversion Engine ([`MultiProductHero.tsx`](file:///d:/elev/src/components/MultiProductHero.tsx))

### Copy & Value Proposition
- **Eyebrow Pill:** `AI MEETING MANAGEMENT` with emerald live pulse badge.
- **Headline:**  
  *Easy scheduling ahead.*  
  *<span style="font-family: 'Instrument Serif'; font-style: italic;">One platform for all of meetings</span>.*
- **Subhead:**  
  *elev connects and simplifies all of the work around meetings — from scheduling, payments, and meeting prep to notetaking, contact intelligence, and follow-up.*

### Conversion Engine (Calendly Signature Email Bar)
- **Input:** `[ Enter your work email... ]`
- **CTA:** `[ Get started for free → ]`
- **Reassurance Micro-copy:**
  - `✓ Create your free account`
  - `• No credit card required`
  - `• Talk to sales or view demo →`

### Quick Stat Badges
- **Badge 1:** `93% Time saved scheduling calls`
- **Badge 2:** `100k+ Global teams running on elev`

---

## 3. 💙 Calendly Signature Hero Blue Stage ([`MultiProductHero.tsx`](file:///d:/elev/src/components/MultiProductHero.tsx#L245-L530))

A signature gradient stage container (`from-[#93C5FD] via-[#60A5FA] to-[#3B82F6]`) housing the 4 core product interactive showcases:

### Product Switcher Tabs
1. **📅 Scheduling:** World's #1 scheduling tool with total customization.
2. **✨ Callie AI (Beta):** 24/7 AI scheduling assistant for email thread delegation.
3. **⏱️ Notetaker 2.0 (New):** Actionable recaps, action item tracking, and Notion/Slack sync.
4. **💳 Payments (New):** Upfront consultation charging, Stripe checkout, and invoice automation.

### Interactive Stage Demos

#### A. Expanding Booking Calendar (`Scheduling` Tab)
- **Behavior:** The calendar container starts compact (`280px`), highlights `July 14`, and smoothly expands to the right (`520px`) using Framer Motion spring physics (`stiffness: 180, damping: 24`).
- **Available Times Panel:** Displays `Thursday July 14, 2026`, `12:30 PM`, `2:30 PM`, and updates to `✓ Booked` with a `✓ Calendar hold sent!` confirmation toast.

#### B. Live Chat Conversation Animation (`Callie AI` Tab)
- **Behavior:** Deterministic 10-step live chat sequence between Client and Host.
- **Micro-interactions:**
  - Avatar entry with spring scale (`scale: 0.8 → 1`).
  - Chat bubble width expansion (`width: 0 → auto`).
  - Progressive `clipPath` typewriter text reveal: *"Your works are fire, let's work!"* & *"Sure, Let's do it!"*
  - Hold state (~850ms) followed by reverse collapse and seamless looping.

#### C. Live Notetaker Transcript Preview (`Notetaker 2.0` Tab)
- **Behavior:** Real-time transcript processing card demonstrating key action item extraction (*"Send revised contract to Sarah by EOD"*) and auto-sync status.

#### D. Vertical Conveyor Payments Demo (`Payments` Tab)
- **Behavior:** 5-scene vertical conveyor carousel (`translateY` positional track):
  1. *Scene 1:* Payment Settings Card enters from bottom (`$100 USD`, `Stripe`).
  2. *Scene 2:* Consultation Card enters with `$100` focal point and `Powered by stripe` badge.
  3. *Scene 3:* `Require payment to book` toggle card enters; toggle knob slides OFF → ON (`x: 0 → 20px`).
  4. *Scene 4:* Payment settings card enters filled.
  5. *Scene 5:* Consultation card enters in simple state, then **morphs internal DOM layout** on the SAME card to reveal `$100` price tag.

---

## 4. 🔲 Bento Grid Feature Showcase ([`MultiProductHero.tsx`](file:///d:/elev/src/components/MultiProductHero.tsx#L540-L660))

Three equal-width bottom row cards:

- **Card 1: Meeting Automation & Follow-up Backlog**
  - Interactive macOS browser mockup (`elev.ai/notetaker`).
  - Animated task checklist (*"Sync action items to Notion & Slack"*, *"Send Google Meet recap with video timestamps"*).
- **Card 2: Smart VIP Scheduling**
  - Floating variant booking card with blurred background depth.
  - `1-CLICK BOOKING` tag, `VIP Match` badge, `Buffer +15m` indicator, and interactive calendar confirmation toggle.
- **Card 3: Whole Meeting Stack Connection**
  - 4x3 frosted app badge grid (Google Calendar, Office 365, Zoom, Google Meet, Slack, Notion, Stripe, Linear, HubSpot, Salesforce, MS Teams, Zapier).
  - Floating central squircle connector badge with video icon and live green status dot.

---

## 5. ⏳ Lifecycle Timeline Deck ([`TimelineFeatureDeck.tsx`](file:///d:/elev/src/components/TimelineFeatureDeck.tsx))

Four phase structured workflow timeline:
1. **01. Before the meeting:** Real-time calendar sync, availability rules, guest prep sheet dispatch.
2. **02. During the meeting:** Invisible AI bot assistant, speech-to-text diarization, live timestamping.
3. **03. After the meeting:** Automated summary generation, Notion/Slack distribution, action item assignment.
4. **04. Revenue & billing:** Upfront meeting charges, Stripe payment links, automated receipt delivery.

---

## 6. 📊 Stats & Customer Stories ([`StatsBento.tsx`](file:///d:/elev/src/components/StatsBento.tsx), [`CustomerStoriesCarousel.tsx`](file:///d:/elev/src/components/CustomerStoriesCarousel.tsx))

- **Statistics:** 93% time saved, 100k+ active teams, 1.4s average recap generation speed.
- **Security & Compliance:** SOC2 Type II Certified, ISO 27001, GDPR Compliant.
- **Customer Stories:** Quotes from Founders, VPs of Sales, and Product Directors.

---

## 🎨 Color Palette & Typography Tokens

- **Background:** Pure White (`#FFFFFF`) & Soft Light Slate (`#F8FAFC`, `#EFF6FF`)
- **Text:** Dark Charcoal (`#0A0D14`), Slate (`#475569`, `#94A3B8`)
- **Brand Accent:** Signature Electric Blue (`#0055FF`)
- **Success Accent:** Emerald Green (`#059669`, `#10B981`)
- **Typography:**
  - Primary Sans: `Inter`, sans-serif
  - Editorial Heading Accent: `Instrument Serif`, serif (italic)
