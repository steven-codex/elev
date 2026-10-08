import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle } from 'lucide-react';

interface FaqCardItem {
  id: number;
  tag: string;
  badge: string;
  question: string;
  fullAnswer: string;
  image: string;
  alt: string;
}

// 4 FAQ Cards ordered precisely matching Foto 1:
// 0: Top-Left (Man with glasses in gray buttoned shirt)
// 1: Top-Right (Person pointing at elev pricing on laptop)
// 2: Bottom-Left (Asian man in burgundy sweater at laptop with cactus)
// 3: Bottom-Right (Man on phone by office window)
const FAQ_ITEMS: FaqCardItem[] = [
  {
    id: 0,
    tag: 'Enterprise Security',
    badge: 'SOC 2 Type II',
    question: 'How secure is elev with enterprise calendar and client data?',
    fullAnswer:
      'Security is foundational. Elev maintains SOC 2 Type II certification, GDPR compliance, end-to-end TLS 1.3 & AES-256 encryption, and HIPAA BAA execution. We never store or monetize your private email or calendar contents.',
    image: '/images/elev-team-collaboration-laptop.jpg',
    alt: 'Team member collaborating on laptop in glassy office'
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
    tag: 'Flexible Plans',
    badge: '14-Day Free Trial',
    question: 'Can I start with the free plan and upgrade when my team grows?',
    fullAnswer:
      'Yes! The Basic plan is free forever with unlimited 1-on-1 meetings. You can explore the Teams plan anytime with a 14-day risk-free trial without entering a credit card, and invite teammates whenever you need.',
    image: '/images/elev-focused-coworking-laptop.jpg',
    alt: 'Person working on laptop in modern coworking office'
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
// DYNAMIC LIQUID GOO FRAME PATHS (1011 x 941)
// Main body path (Path 3) from the exact user Figma SVG with morphing variants:
// 0: Card 0 active (Top-left expands -> center top divider shifts right)
// 1: Card 1 active (Top-right expands -> center top divider shifts left)
// 2: Card 2 active (Bottom-left expands -> bottom shelf shifts right)
// 3: Card 3 active (Master Figma vector from user)
// ============================================================================
const FAQ_FRAME_PATHS: Record<number, string> = {
  0: 'M970.586 259C992.677 259 1010.59 276.909 1010.59 299V573C1010.59 591.159 1010.57 626.891 1010.99 645.045C1011 645.362 1011 645.681 1011 646V863C1011 885.644 992.644 904 970 904H591.634C579.259 904 557.002 912.534 549.125 922.078C539.587 933.634 525.154 941 509 941H128C99.2812 941 76 917.719 76 889V647C76 623.804 57.196 605 34 605C15.2223 605 0 589.778 0 571V311C0.0000036 292.222 15.2223 277 34 277H549C567.778 277 583 292.222 583 311V548.954C583 552.32 585.508 555.166 588.737 556.118C593.827 557.619 599.586 554.144 599.586 548.837V299C599.586 276.909 617.495 259 639.586 259H970.586Z',
  1: 'M970.586 259C992.677 259 1010.59 276.909 1010.59 299V573C1010.59 591.159 1010.57 626.891 1010.99 645.045C1011 645.362 1011 645.681 1011 646V863C1011 885.644 992.644 904 970 904H591.634C579.259 904 557.002 912.534 549.125 922.078C539.587 933.634 525.154 941 509 941H128C99.2812 941 76 917.719 76 889V647C76 623.804 57.196 605 34 605C15.2223 605 0 589.778 0 571V311C0.0000036 292.222 15.2223 277 34 277H419C437.778 277 453 292.222 453 311V548.954C453 552.32 455.508 555.166 458.737 556.118C463.827 557.619 469.586 554.144 469.586 548.837V299C469.586 276.909 487.495 259 509.586 259H970.586Z',
  2: 'M970.586 259C992.677 259 1010.59 276.909 1010.59 299V573C1010.59 591.159 1010.57 626.891 1010.99 645.045C1011 645.362 1011 645.681 1011 646V863C1011 885.644 992.644 904 970 904H661.634C649.259 904 627.002 912.534 619.125 922.078C609.587 933.634 595.154 941 579 941H118C89.2812 941 66 917.719 66 889V647C66 623.804 57.196 605 34 605C15.2223 605 0 589.778 0 571V311C0.0000036 292.222 15.2223 277 34 277H484C502.778 277 518 292.222 518 311V538.954C518 542.32 520.508 545.166 523.737 546.118C528.827 547.619 534.586 544.144 534.586 538.837V299C534.586 276.909 552.495 259 574.586 259H970.586Z',
  3: 'M970.586 259C992.677 259 1010.59 276.909 1010.59 299V573C1010.59 591.159 1010.57 626.891 1010.99 645.045C1011 645.362 1011 645.681 1011 646V863C1011 885.644 992.644 904 970 904H591.634C579.259 904 557.002 912.534 549.125 922.078C539.587 933.634 525.154 941 509 941H128C99.2812 941 76 917.719 76 889V647C76 623.804 57.196 605 34 605C15.2223 605 0 589.778 0 571V311C0.0000036 292.222 15.2223 277 34 277H484C502.778 277 518 292.222 518 311V538.954C518 542.32 520.508 545.166 523.737 546.118C528.827 547.619 534.586 544.144 534.586 538.837V299C534.586 276.909 552.495 259 574.586 259H970.586Z'
};

interface PocketCoords {
  left: string;
  top: string;
  width: string;
  height: string;
}

// Calibrated pocket coordinates for 1011 x 941 with generous safe margins
// Guarantees zero shelf or corner overlap across all 4 interactive morph states
const CARD_POCKETS: Record<number, Record<number, PocketCoords>> = {
  // State 0: Card 0 active (expands top-left)
  0: {
    0: { left: '4.50%', top: '31.50%', width: '49.00%', height: '28.50%' },
    1: { left: '61.80%', top: '31.50%', width: '33.50%', height: '28.50%' },
    2: { left: '13.00%', top: '65.50%', width: '36.00%', height: '27.50%' },
    3: { left: '53.50%', top: '65.50%', width: '42.00%', height: '27.50%' }
  },
  // State 1: Card 1 active (expands top-right)
  1: {
    0: { left: '4.50%', top: '31.50%', width: '36.50%', height: '28.50%' },
    1: { left: '50.00%', top: '31.50%', width: '45.50%', height: '28.50%' },
    2: { left: '13.00%', top: '65.50%', width: '36.00%', height: '27.50%' },
    3: { left: '53.50%', top: '65.50%', width: '42.00%', height: '27.50%' }
  },
  // State 2: Card 2 active (expands bottom-left)
  2: {
    0: { left: '4.50%', top: '31.50%', width: '42.50%', height: '28.50%' },
    1: { left: '56.00%', top: '31.50%', width: '39.50%', height: '28.50%' },
    2: { left: '13.00%', top: '65.00%', width: '42.50%', height: '28.00%' },
    3: { left: '59.50%', top: '65.50%', width: '36.00%', height: '27.50%' }
  },
  // State 3: Card 3 active (expands bottom-right, master Figma default)
  3: {
    0: { left: '4.50%', top: '31.50%', width: '42.50%', height: '28.50%' },
    1: { left: '56.00%', top: '31.50%', width: '39.50%', height: '28.50%' },
    2: { left: '13.00%', top: '65.50%', width: '35.50%', height: '27.50%' },
    3: { left: '53.00%', top: '65.00%', width: '42.50%', height: '28.00%' }
  }
};

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number>(3);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  return (
    <section id="faq" className="py-24 sm:py-32 bg-white relative overflow-hidden select-none">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================= */}
        {/* EDITORIAL HEADER WITH ETHEREAL RADIAL AMBIENT AURA        */}
        {/* ========================================================= */}
        <div className="relative text-center mb-4 sm:mb-6">
          {/* Soft Ethereal Radial Ambient Glow Cloud as seen in Foto 1 */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] sm:w-[950px] h-[400px] sm:h-[480px] bg-gradient-to-r from-blue-300/35 via-sky-200/30 to-indigo-200/25 rounded-full blur-[130px] pointer-events-none -z-10" 
            aria-hidden="true"
          />

          <h2 className="text-3xl sm:text-5xl lg:text-[3.75rem] text-[#0A0D14] font-medium tracking-tight leading-[1.12]">
            Everything you need to know
            <br />
            <span className="font-instrument italic font-normal text-[#2563EB] inline-block mt-1 sm:mt-2">
              about elev
            </span>
          </h2>
        </div>

        {/* ========================================================= */}
        {/* MASTER BENTO SHOWCASE (CUSTOM FIGMA 1011 x 941 SVG FRAME) */}
        {/* Exactly matching Foto 1 with top light wings & white frame */}
        {/* ========================================================= */}
        <div className="w-full max-w-[1120px] xl:max-w-[1180px] mx-auto relative z-10">
          
          {/* DESKTOP / TABLET (lg+): Lockstep 1011:941 Aspect Ratio Container */}
          <div className="relative w-full aspect-[1011/941] hidden lg:block select-none">
            
            {/* AMBIENT FAQ TEXT (Perched right between the converging light wings as in Foto 1) */}
            <div className="absolute top-[13%] left-1/2 -translate-x-1/2 select-none z-20 pointer-events-none">
              <span className="text-4xl sm:text-5xl md:text-[3.25rem] font-bold tracking-widest text-[#93C5FD] drop-shadow-xs">
                FAQ
              </span>
            </div>

            {/* EXACT FIGMA SVG BACKDROP (1011 x 941) PROVIDED BY USER */}
            <svg
              viewBox="0 0 1011 941"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0 w-full h-full filter drop-shadow-[0_20px_50px_rgba(0,85,255,0.07)] pointer-events-none -z-0"
            >
              {/* Left Light Gradient Wing */}
              <path 
                d="M171 280.5C229.8 280.5 454.8 0 480 0L528 47C553.2 47 364.2 280.5 423 280.5H171Z" 
                fill="url(#paint0_linear_145_84)"
              />
              {/* Right Light Gradient Wing */}
              <path 
                d="M889.328 281C830.528 281 605.528 0.5 580.328 0.5L532.328 47.5C507.128 47.5 696.128 281 637.328 281H889.328Z" 
                fill="url(#paint1_linear_145_84)"
              />
              {/* Main Liquid White Frame with Smooth Spring Morphing */}
              <motion.path
                d={FAQ_FRAME_PATHS[activeIndex]}
                animate={{ d: FAQ_FRAME_PATHS[activeIndex] }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 24,
                  mass: 0.85
                }}
                fill="white"
              />
              <defs>
                <linearGradient id="paint0_linear_145_84" x1="297" y1="168.5" x2="304.994" y2="294.131" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F4F4F4" stopOpacity="0" />
                  <stop offset="1" stopColor="#DDF0FF" />
                </linearGradient>
                <linearGradient id="paint1_linear_145_84" x1="763.328" y1="169" x2="755.334" y2="294.631" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F4F4F4" stopOpacity="0" />
                  <stop offset="1" stopColor="#DDF0FF" />
                </linearGradient>
              </defs>
            </svg>

            {/* 4 DYNAMIC MORPHING CARDS (Animated in lockstep with liquid SVG) */}
            {FAQ_ITEMS.map((item) => {
              const isActive = activeIndex === item.id;
              const coords = CARD_POCKETS[activeIndex][item.id];

              return (
                <motion.div
                  key={item.id}
                  animate={{
                    left: coords.left,
                    top: coords.top,
                    width: coords.width,
                    height: coords.height
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 24,
                    mass: 0.85
                  }}
                  onClick={() => {
                    if (activeIndex === item.id) {
                      setShowAnswer(!showAnswer);
                    } else {
                      setActiveIndex(item.id);
                      setShowAnswer(false);
                    }
                  }}
                  className="absolute group rounded-[28px] sm:rounded-[32px] border-[2.5px] border-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] overflow-hidden cursor-pointer active:scale-[0.985] flex flex-col justify-end p-4 lg:p-5"
                >
                  {/* Background Image with Cinematic Hover Drift */}
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
                  />

                  {/* Gradient Overlay for Text Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent pointer-events-none" />

                  {/* MORPHING QUESTION BOX / CAPSULE (Smoothly morphs from pill into question box) */}
                  <div className="relative z-10 w-full flex justify-center pb-1 pointer-events-none">
                    <motion.div
                      layout
                      initial={false}
                      animate={{
                        borderRadius: isActive ? 24 : 9999
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 280,
                        damping: 24,
                        mass: 0.85
                      }}
                      className={`relative pointer-events-auto backdrop-blur-2xl border border-white/60 shadow-[0_16px_36px_rgba(0,0,0,0.18),inset_0_1px_1px_rgba(255,255,255,0.6)] text-white select-none overflow-hidden transition-colors duration-300 ${
                        isActive
                          ? 'w-[92%] max-w-[390px] bg-white/20 hover:bg-white/25 p-4 lg:p-5'
                          : 'w-[84%] max-w-[280px] h-11 lg:h-12 bg-white/18 hover:bg-white/26 flex items-center justify-center p-0'
                      }`}
                    >
                      {/* Logo: glides smoothly from center to top of card */}
                      <motion.div 
                        layout 
                        transition={{
                          type: 'spring',
                          stiffness: 280,
                          damping: 24,
                          mass: 0.85
                        }}
                        className={`flex justify-center items-center ${isActive ? 'mb-2' : ''}`}
                      >
                        <motion.img 
                          layout
                          src="/elev-infinity-logo.png" 
                          alt="elev" 
                          className="w-5 h-5 lg:w-6 lg:h-6 object-contain filter drop-shadow" 
                        />
                      </motion.div>

                      {/* Question content: enters smoothly during expansion */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            key="question-content"
                            initial={{ opacity: 0, y: 6, filter: 'blur(3px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: 4, filter: 'blur(3px)' }}
                            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                            className="w-full text-center"
                          >
                            <h3 className="text-center text-xs lg:text-[14px] font-medium leading-snug tracking-tight text-white text-pretty drop-shadow-sm">
                              {item.question}
                            </h3>

                            {showAnswer && (
                              <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                                className="text-center text-[11px] lg:text-xs text-white/95 leading-relaxed pt-2.5 mt-2.5 border-t border-white/25 text-pretty drop-shadow-xs"
                              >
                                {item.fullAnswer}
                              </motion.p>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* MOBILE / SMALL SCREENS (< lg): Clean Responsive Vertical Stack with Unified Header */}
          <div className="block lg:hidden w-full max-w-[640px] mx-auto rounded-[36px] bg-white p-5 sm:p-6 border border-blue-200/50 shadow-[0_20px_45px_rgba(0,85,255,0.06)] space-y-4">
            <div className="text-center pt-1 pb-1">
              <span className="text-3xl font-bold tracking-widest text-[#93C5FD]">
                FAQ
              </span>
            </div>
            {FAQ_ITEMS.map((item) => {
              const isActive = activeIndex === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (activeIndex === item.id) setShowAnswer(!showAnswer);
                    else { setActiveIndex(item.id); setShowAnswer(false); }
                  }}
                  className="relative rounded-[24px] border-2 border-white shadow-md overflow-hidden cursor-pointer h-[240px] sm:h-[280px] flex flex-col justify-end p-4"
                >
                  <img src={item.image} alt={item.alt} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                  <div className="relative z-10 w-full flex justify-center pb-1 pointer-events-none">
                    <motion.div
                      layout
                      initial={false}
                      animate={{
                        borderRadius: isActive ? 20 : 9999
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 280,
                        damping: 24,
                        mass: 0.85
                      }}
                      className={`relative pointer-events-auto backdrop-blur-xl border border-white/60 shadow-lg text-white select-none overflow-hidden transition-colors duration-300 ${
                        isActive
                          ? 'w-full bg-white/25 p-3.5'
                          : 'w-[84%] max-w-[260px] h-10 bg-white/20 flex items-center justify-center p-0'
                      }`}
                    >
                      <motion.div 
                        layout 
                        className={`flex justify-center items-center ${isActive ? 'mb-1.5' : ''}`}
                      >
                        <motion.img 
                          layout
                          src="/elev-infinity-logo.png" 
                          alt="elev" 
                          className="w-4 h-4 sm:w-5 sm:h-5 object-contain filter drop-shadow" 
                        />
                      </motion.div>
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            key="mobile-question-content"
                            initial={{ opacity: 0, y: 4, filter: 'blur(2px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: 4, filter: 'blur(2px)' }}
                            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                            className="w-full text-center"
                          >
                            <h3 className="text-center text-xs sm:text-sm font-medium leading-snug text-white">{item.question}</h3>
                            {showAnswer && (
                              <motion.p 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                                className="text-center text-[11px] sm:text-xs text-white/90 pt-2 mt-2 border-t border-white/20"
                              >
                                {item.fullAnswer}
                              </motion.p>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Quick Navigator Pill Bar below Bento Frame */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mt-9 pt-2 px-4">
          {FAQ_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(item.id)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-[13px] font-medium tracking-tight transition-all duration-200 cursor-pointer active:scale-[0.96] ${
                activeIndex === item.id
                  ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-600/30'
                  : 'bg-slate-100/90 text-slate-700 hover:bg-slate-200/80 hover:text-slate-900 border border-slate-200/70'
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
