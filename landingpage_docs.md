# elev — Landing Page Complete Markdown Specification

> **File Path:** [`LANDING_PAGE.md`](file:///d:/elev/LANDING_PAGE.md)  
> **Preview URL:** [http://localhost:3000/](http://localhost:3000/)

---

## Executive Overview

The **elev** landing page is an editorial, high-conversion web application aligned with `https://calendly.com/`, optimized to present elev's 4 core product pillars: **Scheduling Engine**, **Callie AI**, **Notetaker 2.0**, and **Payments & Checkout**.

---

## Key Landing Page Sections

### 1. Header & Navigation ([`Navbar.tsx`](file:///d:/elev/src/components/Navbar.tsx))
- **Brand:** `elev.ai`
- **Mega-menu Dropdowns:** Product (Scheduling, Callie AI, Notetaker 2.0, Payments, Platform), Solutions, Resources, Pricing.
- **CTAs:** `Talk to sales` (Ghost button), `Log In` (Pill border), `Get started for free` (`#0055FF` Electric Blue pill).

---

### 2. Calendly-Aligned Hero ([`MultiProductHero.tsx`](file:///d:/elev/src/components/MultiProductHero.tsx))
- **Eyebrow:** `AI MEETING MANAGEMENT`
- **Headline:** *"Easy scheduling ahead. One platform for all of meetings."*
- **Conversion Engine:** Work email input bar (`[ Enter your work email... ] [ Get started for free ]`) + reassurance micro-copy.
- **Social Proof:** `93% Time saved scheduling calls`, `100k+ Global teams running on elev`.

---

### 3. Hero Blue Stage Demos ([`MultiProductHero.tsx`](file:///d:/elev/src/components/MultiProductHero.tsx#L245-L530))

Gradient stage container (`from-[#93C5FD] via-[#60A5FA] to-[#3B82F6]`) housing 4 tabbed interactive showcases:

| Tab | Interactive Demo | Key Motion Features |
| :--- | :--- | :--- |
| **Scheduling** | Expanding Booking Calendar | Spring expansion `280px → 520px`, timeslot selection, `✓ Booked` confirmation toast |
| **Callie AI** | Live Chat Conversation | 10-step sequential chat sequence, avatar spring entry, progressive `clipPath` typewriter text reveal |
| **Notetaker 2.0** | Live Transcript & Action Items | Real-time action item extraction (*"Sync to Notion & Slack"*), 1.4s post-call timer |
| **Payments** | Vertical Conveyor Carousel | 5-scene vertical conveyor track (`translateY`), toggle switch, `$100` price tag layout morphing |

---

### 4. Bento Grid Showcase ([`MultiProductHero.tsx`](file:///d:/elev/src/components/MultiProductHero.tsx#L540-L660))
- **Card 1:** Meeting Automation & Follow-up Backlog (macOS browser mockup + interactive checklist).
- **Card 2:** Smart VIP Scheduling (`1-CLICK BOOKING`, `VIP Match`, `Buffer +15m`).
- **Card 3:** Whole Meeting Stack Connection (4x3 frosted app badges: G-Cal, 365, Zoom, Meet, Slack, Notion, Stripe, Linear, HubSpot, Salesforce, Teams, Zapier).

---

### 5. Lifecycle Timeline & Footer ([`TimelineFeatureDeck.tsx`](file:///d:/elev/src/components/TimelineFeatureDeck.tsx))
- **01. Before:** Real-time calendar sync & availability rules.
- **02. During:** Invisible AI bot assistant & speech-to-text diarization.
- **03. After:** Automated summary generation & Notion/Slack distribution.
- **04. Revenue:** Upfront meeting charges, Stripe checkout & automated invoices.
