# elev — AI Meeting Management & Scheduling Platform

[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Motion](https://img.shields.io/badge/Motion-12.23-black?style=flat-square)](https://motion.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org/)

**elev** connects and simplifies all of the work around meetings — from intelligent scheduling, payments, and meeting prep to live notetaking, contact intelligence, and automated follow-ups.

---

## 🌟 Key Product Pillars

### 1. 📅 Scheduling Engine
- **Expanding Calendar Booking:** Dynamic spring-based interactive calendar that expands seamlessly to reveal available timeslots.
- **VIP Match & Smart Buffers:** Automatic buffer time insertion (`+15m`) and high-priority participant routing.
- **Timezone Intelligence:** Native multi-region timezone synchronization for global teams.

### 2. ✨ Callie AI Assistant (Beta)
- **Email Thread Delegation:** Add Callie to any email conversation (`callie@elev.ai`) to negotiate meeting times autonomously.
- **Live Conversation Simulation:** Real-time typewriter and spring-animated live chat showcase for instant booking confirmation.

### 3. ⏱️ Notetaker 2.0 (New)
- **Automated Recaps:** Generates action items, key decisions, and timestamped summaries within 1.4s post-call.
- **Workflow Sync:** Auto-dispatches tasks directly to Notion & Slack channels.

### 4. 💳 Payments & Checkout (New)
- **Consultation Monetization:** Require upfront payments for 1-on-1 strategy sessions and advisory calls.
- **Stripe Integration:** Seamless checkout flow with instant receipt generation and calendar hold rules.
- **Vertical Conveyor UI Demo:** Interactive 5-stage product showcase demonstrating rule activation and layout morphing.

---

## 🎨 Design System & Aesthetics

Adheres to strict senior design engineering principles (`steve-prodex` / `AGENTS.md` protocol):

- **Typography System:** Pairings of **Inter** (clean modern sans) with **Instrument Serif** (editorial italic accents).
- **Color System:** 
  - Brand Primary: Electric Blue (`#0055FF`)
  - Dark Charcoal text: `#0A0D14`
  - Off-white card surfaces: `bg-white`, `#EFF6FF` soft blue stage backdrop
  - Mint accent: `#F0FDF9` / `#059669`
- **Motion & Micro-interactions:**
  - `motion/react` spring physics (`stiffness: 210, damping: 24`).
  - Strict layout morphing (`layout` prop) preserving DOM object continuity across UI state transitions.
  - Zero AI-slop rainbow gradients; restrained, high-contrast, professional SaaS visual design.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- npm / yarn / pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/gitpronevest/elev.git

# Navigate into the project directory
cd elev

# Install dependencies
npm install
```

### Development Server

Start the local dev server on port `3000`:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

### Production Build

Build the production bundle with Vite:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 📁 Project Structure

```
elev/
├── public/                # Static media assets & HTML video clips
├── src/
│   ├── components/        # UI Components & Motion Stages
│   │   ├── MultiProductHero.tsx       # Calendly-aligned Hero & Motion Conveyor
│   │   ├── Navbar.tsx                 # Navigation bar & authentication trigger
│   │   ├── TimelineFeatureDeck.tsx    # 4-stage lifecycle timeline
│   │   ├── StatsBento.tsx             # Interactive metric bento grid
│   │   └── CustomerStoriesCarousel.tsx# Social proof & customer carousel
│   ├── data/
│   │   └── landingData.ts             # Navigation menu & product copy definitions
│   ├── App.tsx                        # Main application container
│   ├── main.tsx                       # React root entry point
│   └── index.css                      # Global Tailwind CSS directives & typography
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## 📜 License

Private & Proprietary. All rights reserved by **elev**.
