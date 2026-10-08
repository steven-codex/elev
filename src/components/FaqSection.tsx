import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronRight, Check } from 'lucide-react';

interface FaqCardItem {
  id: number;
  tag: string;
  badge: string;
  question: string;
  fullAnswer: string;
  image: string;
  alt: string;
}

const FAQ_ITEMS: FaqCardItem[] = [
  {
    id: 0,
    tag: 'Flexible Plans',
    badge: '14-Day Free Trial',
    question: 'Can I start with the free plan and upgrade when my team grows?',
    fullAnswer:
      'Yes! The Basic plan is free forever with unlimited 1-on-1 meetings. You can explore the Teams plan anytime with a 14-day risk-free trial without entering a credit card, and invite teammates whenever you need.',
    image: '/images/elev-focused-coworking-laptop.jpg',
    alt: 'Person working on laptop in modern coworking office'
  },
  {
    id: 1,
    tag: 'Round-Robin Routing',
    badge: 'Smart Distribution',
    question: 'What is Round-Robin scheduling and how does team routing work?',
    fullAnswer:
      'Round-robin automatically distributes incoming prospect calls across team members based on availability, priority weighting, territory, or deal size — eliminating booking delays and maximizing pipeline velocity.',
    image: '/images/elev-pricing-laptop-showcase.jpg',
    alt: 'Elev pricing plan displayed on laptop in office'
  },
  {
    id: 2,
    tag: 'Enterprise Security',
    badge: 'SOC 2 Type II',
    question: 'How secure is elev with enterprise calendar and client data?',
    fullAnswer:
      'Security is foundational. Elev maintains SOC 2 Type II certification, GDPR compliance, end-to-end TLS 1.3 & AES-256 encryption, and HIPAA BAA execution. We never store or monetize your private email or calendar contents.',
    image: '/images/elev-team-collaboration-laptop.jpg',
    alt: 'Team member collaborating on laptop in glassy office'
  },
  {
    id: 3,
    tag: 'Calendar Intelligence',
    badge: 'Real-Time Sync',
    question: 'How does elev prevent double bookings across multiple calendars?',
    fullAnswer:
      'Elev connects directly to Google Calendar, Microsoft Outlook, and Office 365 in real time. Before displaying any open slot, elev validates availability across all connected accounts and locks confirmed bookings instantly to eliminate overlaps.',
    image: '/images/elev-workplace-sales-call.jpg',
    alt: 'Executive taking a call at standing desk overlooking city'
  }
];

// ============================================================================
// DYNAMIC ORGANIC LIQUID GOO FRAME PATHS (1011 x 682)
// Each state shares the exact same 26 command tokens so Framer Motion morphs smoothly:
// 0: Card 0 active (Top-left expands -> center top divider dips further right)
// 1: Card 1 active (Top-right expands -> center top divider dips further left)
// 2: Card 2 active (Bottom-left expands -> bottom shelf step divider shifts right)
// 3: Card 3 active (Bottom-right expands -> default Figma master vector)
// ============================================================================
const FAQ_FRAME_PATHS: Record<number, string> = {
  0: 'M970.586 0C992.677 0 1010.59 17.9086 1010.59 40V314C1010.59 332.159 1010.57 367.891 1010.99 386.045C1011 386.362 1011 386.681 1011 387V604C1011 626.644 992.644 645 970 645H591.634C583.07 645 573.942 649.583 569.505 656.907C560.392 671.948 543.87 682 525 682H191C162.281 682 139 658.719 139 630V451C139 393.01 91.9899 346 34 346C15.2223 346 0 330.778 0 312V52C0.0000036 33.2223 15.2223 18 34 18H549C567.778 18 583 33.2223 583 52V288C583 291.866 586.134 295 590 295C595.012 295 599.586 291.254 599.586 286.243V40C599.586 17.9086 617.495 0 639.586 0H970.586Z',
  1: 'M970.586 0C992.677 0 1010.59 17.9086 1010.59 40V314C1010.59 332.159 1010.57 367.891 1010.99 386.045C1011 386.362 1011 386.681 1011 387V604C1011 626.644 992.644 645 970 645H591.634C583.07 645 573.942 649.583 569.505 656.907C560.392 671.948 543.87 682 525 682H191C162.281 682 139 658.719 139 630V451C139 393.01 91.9899 346 34 346C15.2223 346 0 330.778 0 312V52C0.0000036 33.2223 15.2223 18 34 18H419C437.778 18 453 33.2223 453 52V288C453 291.866 456.134 295 460 295C465.012 295 469.586 291.254 469.586 286.243V40C469.586 17.9086 487.495 0 509.586 0H970.586Z',
  2: 'M970.586 0C992.677 0 1010.59 17.9086 1010.59 40V314C1010.59 332.159 1010.57 367.891 1010.99 386.045C1011 386.362 1011 386.681 1011 387V604C1011 626.644 992.644 645 970 645H661.634C653.07 645 643.942 649.583 639.505 656.907C630.392 671.948 613.87 682 595 682H175C147 682 125 658.719 125 630V445C125 393.01 82 346 34 346C15.2223 346 0 330.778 0 312V52C0.0000036 33.2223 15.2223 18 34 18H484C502.778 18 518 33.2223 518 52V278C518 281.866 521.134 285 525 285C530.012 285 534.586 281.254 534.586 276.243V40C534.586 17.9086 552.495 0 574.586 0H970.586Z',
  3: 'M970.586 0C992.677 0 1010.59 17.9086 1010.59 40V314C1010.59 332.159 1010.57 367.891 1010.99 386.045C1011 386.362 1011 386.681 1011 387V604C1011 626.644 992.644 645 970 645H591.634C583.07 645 573.942 649.583 569.505 656.907C560.392 671.948 543.87 682 525 682H191C162.281 682 139 658.719 139 630V451C139 393.01 91.9899 346 34 346C15.2223 346 0 330.778 0 312V52C0.0000036 33.2223 15.2223 18 34 18H484C502.778 18 518 33.2223 518 52V278C518 281.866 521.134 285 525 285C530.012 285 534.586 281.254 534.586 276.243V40C534.586 17.9086 552.495 0 574.586 0H970.586Z'
};

export default function FaqSection() {
  // Default to index 3 (bottom-right) to match reference mockup
  const [activeIndex, setActiveIndex] = useState<number>(3);

  return (
    <section id="faq" className="py-24 sm:py-32 bg-white relative overflow-hidden select-none">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================= */}
        {/* EDITORIAL HEADER WITH RADIAL AMBIENT AURA                */}
        {/* ========================================================= */}
        <div className="relative text-center mb-6 sm:mb-8">
          {/* Soft Ethereal Radial Ambient Glow Cloud */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] sm:w-[780px] h-[340px] sm:h-[400px] bg-gradient-to-r from-blue-300/40 via-sky-200/35 to-indigo-200/30 rounded-full blur-[110px] pointer-events-none -z-10" 
            aria-hidden="true"
          />

          <h2 className="text-3xl sm:text-5xl lg:text-[3.5rem] text-[#0A0D14] font-medium tracking-tight leading-[1.12]">
            Everything you need to know
            <br />
            <span className="font-instrument italic font-normal text-[#2563EB] inline-block mt-1 sm:mt-2">
              about elev
            </span>
          </h2>
        </div>

        {/* ========================================================= */}
        {/* EXACT FIGMA PEDESTAL NOTCH SVG SHAPE (d="M0 112C...")    */}
        {/* ========================================================= */}
        <div className="w-full flex justify-center -mb-[2px] relative z-20 pointer-events-none">
          <div className="relative w-full max-w-[728px] h-[75px] sm:h-[95px] md:h-[112px] flex items-center justify-center">
            {/* Base SVG with light-blue fill matching the bento container */}
            <svg 
              viewBox="0 0 728 112" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0 w-full h-full filter drop-shadow-[0_-4px_16px_rgba(0,85,255,0.04)]"
              preserveAspectRatio="none"
            >
              <path 
                d="M0 112C169.867 112 206.267 0 279.067 0H448.933C521.733 0 558.133 112 728 112H0Z" 
                fill="url(#pedestal_gradient)" 
              />
              <path 
                d="M0 112C169.867 112 206.267 0 279.067 0H448.933C521.733 0 558.133 112 728 112H0Z" 
                fill="#E1E1E1" 
                fillOpacity="0.12" 
              />
              <defs>
                <linearGradient id="pedestal_gradient" x1="364" y1="0" x2="364" y2="112" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F8FAFC" />
                  <stop offset="1" stopColor="#D4EAFF" />
                </linearGradient>
              </defs>
            </svg>

            {/* FAQ text positioned right on the plateau of the shape */}
            <div className="relative z-10 pt-4 sm:pt-6 md:pt-7 pointer-events-auto select-none">
              <span className="text-2xl sm:text-3xl md:text-[2.25rem] font-bold tracking-tight text-slate-800">
                FAQ
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* MORPHING BENTO SHOWCASE (CUSTOM FIGMA ORGANIC SVG FRAME)  */}
        {/* ========================================================= */}
        <div className="w-full max-w-[1011px] mx-auto relative z-10">
          
          {/* Custom Organic Liquid Goo Vector Frame Backdrop (Desktop/Tablet) */}
          <div className="absolute inset-0 w-full h-full pointer-events-none -z-0 hidden lg:block">
            <svg
              viewBox="0 0 1011 682"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full filter drop-shadow-[0_24px_50px_rgba(0,85,255,0.08)]"
              preserveAspectRatio="none"
            >
              <motion.path
                d={FAQ_FRAME_PATHS[activeIndex]}
                animate={{ d: FAQ_FRAME_PATHS[activeIndex] }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 24,
                  mass: 0.85
                }}
                fill="url(#faq_frame_organic_gradient)"
              />
              <defs>
                <linearGradient
                  id="faq_frame_organic_gradient"
                  x1="505.5"
                  y1="0"
                  x2="642"
                  y2="562.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FFFCFC" />
                  <stop offset="1" stopColor="#D4EAFF" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Mobile Fallback Backdrop (Soft matching gradient rounded box) */}
          <div className="absolute inset-0 w-full h-full pointer-events-none -z-0 block lg:hidden rounded-[36px] bg-gradient-to-b from-[#FFFCFC] to-[#D4EAFF] border border-blue-200/50 shadow-[0_20px_45px_rgba(0,85,255,0.06)]" />

          {/* Calibrated Interactive Photo Bento Pockets */}
          <div className="relative z-10 p-3 sm:p-5 lg:p-0 flex flex-col gap-4 sm:gap-5">
            
            {/* ROW 1: CARDS 0 & 1 */}
            <div className="flex flex-col lg:flex-row items-stretch gap-4 sm:gap-5 w-full pt-4 sm:pt-5 lg:pt-6 px-3 sm:px-5 lg:px-6">
              {[FAQ_ITEMS[0], FAQ_ITEMS[1]].map((item) => {
                const isActive = activeIndex === item.id;
                
                // Dynamic flex ratio that morphs simultaneously with the SVG top divider dip
                let flexStyle = '1 1 0%';
                if (activeIndex === 0) {
                  flexStyle = item.id === 0 ? '1.34 1 0%' : '0.66 1 0%';
                } else if (activeIndex === 1) {
                  flexStyle = item.id === 1 ? '1.34 1 0%' : '0.66 1 0%';
                }

                return (
                  <motion.div
                    key={item.id}
                    layout
                    transition={{
                      layout: { type: 'spring', stiffness: 260, damping: 24, mass: 0.85 },
                    }}
                    style={{ flex: flexStyle }}
                    onClick={() => setActiveIndex(item.id)}
                    className={`group relative rounded-[26px] sm:rounded-[30px] overflow-hidden cursor-pointer active:scale-[0.985] transition-[box-shadow,border-color] duration-300 ${
                      isActive 
                        ? 'ring-2 ring-blue-500/80 shadow-[0_20px_45px_rgba(0,85,255,0.18)]' 
                        : 'border border-white/60 hover:border-blue-300 hover:shadow-lg'
                    } h-[300px] sm:h-[310px] lg:h-[312px] flex flex-col justify-end p-4 sm:p-6`}
                  >
                    {/* Background Image with Cinematic Hover Drift */}
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
                    />

                    {/* Gradient Overlay for Text Legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent pointer-events-none" />

                    {/* INTERACTIVE FLOATING GLASS ISLAND */}
                    <div className="relative z-10 w-full flex justify-center">
                      {isActive ? (
                        <motion.div
                          layoutId={`faq-island-${item.id}`}
                          className="w-full max-w-[480px] bg-slate-950/70 backdrop-blur-2xl border border-white/30 rounded-[22px] sm:rounded-[26px] p-5 sm:p-6 shadow-[0_24px_50px_rgba(0,12,35,0.45),inset_0_1px_1px_rgba(255,255,255,0.3)] text-white flex flex-col items-center text-center select-none"
                          transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                        >
                          {/* Top Logo Badge */}
                          <div className="flex items-center gap-2 mb-2.5">
                            <img 
                              src="/elev-infinity-logo.png" 
                              alt="elev" 
                              className="w-5 h-5 object-contain filter drop-shadow-sm" 
                            />
                            <span className="text-[10px] font-mono text-blue-300 uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30">
                              {item.badge}
                            </span>
                          </div>

                          {/* Question */}
                          <h3 className="text-sm sm:text-base font-medium text-white leading-snug tracking-tight text-pretty mb-2.5 drop-shadow-xs">
                            {item.question}
                          </h3>

                          {/* Animated Answer Text with Smooth Blur-Fade Reveal */}
                          <motion.div
                            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -6, filter: 'blur(3px)' }}
                            transition={{ duration: 0.38, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
                            className="text-xs sm:text-[13px] text-white/85 leading-relaxed font-normal text-pretty pt-2.5 border-t border-white/15"
                          >
                            <p>{item.fullAnswer}</p>
                          </motion.div>

                          {/* Step Indicator */}
                          <div className="flex items-center justify-between w-full mt-3.5 pt-2 border-t border-white/10 text-[10px] font-mono text-white/50">
                            <span className="text-blue-300 font-medium">{item.tag}</span>
                            <span>Step 0{item.id + 1}/04</span>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          layoutId={`faq-island-${item.id}`}
                          className="bg-slate-950/45 hover:bg-slate-950/65 backdrop-blur-xl border border-white/30 rounded-full px-5 py-2.5 flex items-center justify-center gap-2.5 shadow-lg select-none transition-colors group/pill"
                          transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                        >
                          <img 
                            src="/elev-infinity-logo.png" 
                            alt="elev" 
                            className="w-4 h-4 object-contain filter drop-shadow-sm group-hover/pill:scale-110 transition-transform" 
                          />
                          <span className="text-white/90 text-xs font-medium tracking-tight truncate max-w-[220px]">
                            {item.tag}
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 text-white/50 group-hover/pill:translate-x-0.5 transition-transform" />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* ROW 2: CARDS 2 & 3 (Indented on desktop lg:pl-[152px] to follow the x=139 stepped shelf chamber) */}
            <div className="flex flex-col lg:flex-row items-stretch gap-4 sm:gap-5 w-full pb-5 sm:pb-6 lg:pb-7 px-3 sm:px-5 lg:pl-[152px] lg:pr-6">
              {[FAQ_ITEMS[2], FAQ_ITEMS[3]].map((item) => {
                const isActive = activeIndex === item.id;
                
                // Dynamic flex ratio that morphs simultaneously with the bottom shelf step divider
                let flexStyle = item.id === 2 ? '0.76 1 0%' : '1.24 1 0%';
                if (activeIndex === 2) {
                  flexStyle = item.id === 2 ? '1.25 1 0%' : '0.75 1 0%';
                } else if (activeIndex === 3) {
                  flexStyle = item.id === 3 ? '1.28 1 0%' : '0.72 1 0%';
                }

                return (
                  <motion.div
                    key={item.id}
                    layout
                    transition={{
                      layout: { type: 'spring', stiffness: 260, damping: 24, mass: 0.85 },
                    }}
                    style={{ flex: flexStyle }}
                    onClick={() => setActiveIndex(item.id)}
                    className={`group relative rounded-[26px] sm:rounded-[30px] overflow-hidden cursor-pointer active:scale-[0.985] transition-[box-shadow,border-color] duration-300 ${
                      isActive 
                        ? 'ring-2 ring-blue-500/80 shadow-[0_20px_45px_rgba(0,85,255,0.18)]' 
                        : 'border border-white/60 hover:border-blue-300 hover:shadow-lg'
                    } h-[300px] sm:h-[310px] lg:h-[312px] flex flex-col justify-end p-4 sm:p-6`}
                  >
                    {/* Background Image with Cinematic Hover Drift */}
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
                    />

                    {/* Gradient Overlay for Text Legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent pointer-events-none" />

                    {/* INTERACTIVE FLOATING GLASS ISLAND */}
                    <div className="relative z-10 w-full flex justify-center">
                      {isActive ? (
                        <motion.div
                          layoutId={`faq-island-${item.id}`}
                          className="w-full max-w-[480px] bg-slate-950/70 backdrop-blur-2xl border border-white/30 rounded-[22px] sm:rounded-[26px] p-5 sm:p-6 shadow-[0_24px_50px_rgba(0,12,35,0.45),inset_0_1px_1px_rgba(255,255,255,0.3)] text-white flex flex-col items-center text-center select-none"
                          transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                        >
                          {/* Top Logo Badge */}
                          <div className="flex items-center gap-2 mb-2.5">
                            <img 
                              src="/elev-infinity-logo.png" 
                              alt="elev" 
                              className="w-5 h-5 object-contain filter drop-shadow-sm" 
                            />
                            <span className="text-[10px] font-mono text-blue-300 uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30">
                              {item.badge}
                            </span>
                          </div>

                          {/* Question */}
                          <h3 className="text-sm sm:text-base font-medium text-white leading-snug tracking-tight text-pretty mb-2.5 drop-shadow-xs">
                            {item.question}
                          </h3>

                          {/* Animated Answer Text with Smooth Blur-Fade Reveal */}
                          <motion.div
                            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -6, filter: 'blur(3px)' }}
                            transition={{ duration: 0.38, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
                            className="text-xs sm:text-[13px] text-white/85 leading-relaxed font-normal text-pretty pt-2.5 border-t border-white/15"
                          >
                            <p>{item.fullAnswer}</p>
                          </motion.div>

                          {/* Step Indicator */}
                          <div className="flex items-center justify-between w-full mt-3.5 pt-2 border-t border-white/10 text-[10px] font-mono text-white/50">
                            <span className="text-blue-300 font-medium">{item.tag}</span>
                            <span>Step 0{item.id + 1}/04</span>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          layoutId={`faq-island-${item.id}`}
                          className="bg-slate-950/45 hover:bg-slate-950/65 backdrop-blur-xl border border-white/30 rounded-full px-5 py-2.5 flex items-center justify-center gap-2.5 shadow-lg select-none transition-colors group/pill"
                          transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                        >
                          <img 
                            src="/elev-infinity-logo.png" 
                            alt="elev" 
                            className="w-4 h-4 object-contain filter drop-shadow-sm group-hover/pill:scale-110 transition-transform" 
                          />
                          <span className="text-white/90 text-xs font-medium tracking-tight truncate max-w-[220px]">
                            {item.tag}
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 text-white/50 group-hover/pill:translate-x-0.5 transition-transform" />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>

        {/* Quick Navigator Pill Bar below Bento Frame */}
        <div className="flex items-center justify-center gap-2 mt-8 pt-2">
          {FAQ_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(item.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer active:scale-95 ${
                activeIndex === item.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100/90 text-slate-700 hover:bg-slate-200/80 hover:text-slate-900 border border-slate-200/60'
              }`}
            >
              0{item.id + 1} {item.tag}
            </button>
          ))}
        </div>

        {/* Support Help box */}
        <div className="mt-12 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
          <HelpCircle className="w-4 h-4 text-blue-600" />
          <span>Have a question not listed here?</span>
          <a href="#demo" className="font-medium text-blue-600 hover:underline">
            Contact our product team
          </a>
        </div>

      </div>
    </section>
  );
}
