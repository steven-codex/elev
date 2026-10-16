import { useState } from 'react';
import { motion } from 'motion/react';
import { HelpCircle } from 'lucide-react';
import { Reveal, ImageReveal } from '../motion';
import GlassyFaqInteractiveCard, { type FaqCardItem } from './GlassyFaqInteractiveCard';

// 4 FAQ Cards ordered precisely matching elev master design:
// 0: Top-Left (Man with glasses in gray buttoned shirt - as shown in user reference)
// 1: Top-Right (Person pointing at elev pricing on laptop)
// 2: Bottom-Left (Asian man in burgundy sweater at laptop with cactus)
// 3: Bottom-Right (Man on phone by office window)
const FAQ_ITEMS: FaqCardItem[] = [
  {
    id: 0,
    tag: 'Enterprise Security',
    badge: 'SOC 2 Type II',
    question: 'How secure is newseed with enterprise calendar and client data?',
    fullAnswer:
      'SOC 2 Type II certified with end-to-end TLS 1.3 encryption. Your calendar data stays private and is never stored or monetized.',
    image: '/images/elev-team-collaboration-laptop.jpg',
    alt: 'Team member collaborating on laptop in glassy office'
  },
  {
    id: 1,
    tag: 'Round-Robin Routing',
    badge: 'Smart Distribution',
    question: 'What is Round-Robin scheduling and how does team routing work?',
    fullAnswer:
      'Automatically distributes inbound leads across available team reps by priority, territory, or availability to maximize pipeline velocity.',
    image: '/images/elev-pricing-laptop-showcase.jpg',
    alt: 'newseed pricing plan displayed on laptop in office'
  },
  {
    id: 2,
    tag: 'Flexible Plans',
    badge: '14-Day Free Trial',
    question: 'Can I start with the free plan and upgrade when my team grows?',
    fullAnswer:
      'Yes. The Basic plan is free forever. Upgrade anytime with a 14-day trial without entering a credit card.',
    image: '/images/elev-focused-coworking-laptop.jpg',
    alt: 'Person working on laptop in modern coworking office'
  },
  {
    id: 3,
    tag: 'Calendar Intelligence',
    badge: 'Real-Time Sync',
    question: 'How does newseed prevent double bookings across multiple calendars?',
    fullAnswer:
      'Real-time sync across Google Calendar and Outlook validates slot availability and locks bookings instantly to eliminate overlaps.',
    image: '/images/elev-workplace-sales-call.jpg',
    alt: 'Executive taking a call at standing desk overlooking city'
  }
];

// Dynamic liquid morph paths matching the master SVG container
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
  // State 3: Card 3 active (expands bottom-right)
  3: {
    0: { left: '4.50%', top: '31.50%', width: '42.50%', height: '28.50%' },
    1: { left: '56.00%', top: '31.50%', width: '39.50%', height: '28.50%' },
    2: { left: '13.00%', top: '65.50%', width: '35.50%', height: '27.50%' },
    3: { left: '53.00%', top: '65.00%', width: '42.50%', height: '28.00%' }
  }
};

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="py-24 sm:py-32 bg-white relative overflow-hidden"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================= */}
        {/* EDITORIAL HEADER WITH ETHEREAL RADIAL AMBIENT AURA        */}
        {/* ========================================================= */}
        <Reveal y={24} duration={0.9} className="relative text-center mb-10 sm:mb-14 pt-4 sm:pt-6">
          {/* Giant Typographic FAQ Watermark SVG */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[46%] w-[720px] sm:w-[820px] max-w-[92vw] pointer-events-none -z-10 select-none flex items-center justify-center"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 820 373"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto"
            >
              <g opacity="0.22">
                <path
                  d="M0 341.486V7.52584H216.961V54.0921H24.0022L50.8281 26.3405V179.68L24.0022 155.691H208.489V200.846H24.0022L50.8281 176.857V341.486H0Z"
                  fill="url(#paint0_linear_150_88)"
                />
                <path
                  d="M200.669 341.486L321.15 7.52584H385.626L506.108 341.486H451.985L421.394 254.468H284.912L254.791 341.486H200.669ZM300.913 208.372H405.864L353.153 55.9735L300.913 208.372Z"
                  fill="url(#paint1_linear_150_88)"
                />
                <path
                  d="M750.817 373L723.991 338.193C716.461 341.329 707.676 343.837 697.636 345.719C687.596 347.914 676.771 349.011 665.163 349.011C632.846 349.011 605.236 341.329 582.332 325.963C559.428 310.598 541.701 289.902 529.15 263.875C516.914 237.535 510.796 207.902 510.796 174.976C510.796 142.05 516.757 112.417 528.68 86.0769C540.602 59.7364 558.016 38.8836 580.92 23.5183C604.138 7.83942 632.218 0 665.163 0C698.734 0 726.972 7.83942 749.876 23.5183C773.094 38.8836 790.507 59.7364 802.116 86.0769C814.039 112.417 820 142.05 820 174.976C820 205.707 814.509 233.615 803.528 258.701C792.86 283.787 777.329 304.17 756.935 319.849L799.292 373H750.817ZM665.163 302.445C671.124 302.445 676.458 302.132 681.164 301.504C685.87 300.877 690.106 299.78 693.871 298.212L646.337 238.475H694.812L726.815 280.808C740.307 269.833 750.347 255.565 756.935 238.005C763.838 220.131 767.289 199.121 767.289 174.976C767.289 151.771 763.524 130.448 755.994 111.006C748.778 91.5645 737.64 76.0424 722.58 64.4401C707.519 52.5242 688.38 46.5662 665.163 46.5662C642.259 46.5662 623.276 52.5242 608.216 64.4401C593.156 76.0424 581.861 91.5645 574.331 111.006C567.115 130.448 563.506 151.771 563.506 174.976C563.506 197.867 567.115 219.034 574.331 238.475C581.861 257.917 593.156 273.439 608.216 285.042C623.59 296.644 642.572 302.445 665.163 302.445Z"
                  fill="url(#paint2_linear_150_88)"
                />
              </g>
              <defs>
                <linearGradient id="paint0_linear_150_88" x1="384.5" y1="100.5" x2="396" y2="296.5" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#A5D6FB" />
                  <stop offset="1" stopColor="#506DFD" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="paint1_linear_150_88" x1="384.5" y1="100.5" x2="396" y2="296.5" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#A5D6FB" />
                  <stop offset="1" stopColor="#506DFD" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="paint2_linear_150_88" x1="384.5" y1="100.5" x2="396" y2="296.5" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#A5D6FB" />
                  <stop offset="1" stopColor="#506DFD" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Soft Ethereal Radial Ambient Glow Cloud */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] sm:w-[950px] h-[400px] sm:h-[480px] bg-gradient-to-r from-blue-300/35 via-sky-200/30 to-indigo-200/25 rounded-full blur-[130px] pointer-events-none -z-20" 
            aria-hidden="true"
          />

          <h2 className="relative z-10 text-3xl sm:text-5xl lg:text-[3.75rem] text-[#0A0D14] font-medium tracking-tight leading-[1.12]">
            Everything you need to know
            <br />
            <span className="font-instrument italic font-normal text-[#2563EB] inline-block mt-1 sm:mt-2">
              about newseed
            </span>
          </h2>
        </Reveal>

        {/* ========================================================= */}
        {/* MASTER BENTO SHOWCASE (CUSTOM FIGMA 1011 x 941 SVG FRAME) */}
        {/* ========================================================= */}
        <ImageReveal delay={0.15} y={32} className="w-full max-w-[1120px] xl:max-w-[1180px] mx-auto relative z-10">
          
          {/* DESKTOP / TABLET (lg+): Lockstep 1011:941 Aspect Ratio Container */}
          <div className="relative w-full aspect-[1011/941] hidden lg:block">
            
            {/* EXACT FIGMA SVG BACKDROP (1011 x 941) */}
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
                  stiffness: 220,
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

            {/* 4 DYNAMIC MORPHING CARDS */}
            {FAQ_ITEMS.map((item) => {
              const coords = CARD_POCKETS[activeIndex][item.id];
              const isHovered = hoveredCardId === item.id;

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
                    stiffness: 240,
                    damping: 25,
                    mass: 0.85
                  }}
                  onMouseEnter={() => {
                    setHoveredCardId(item.id);
                    setActiveIndex(item.id);
                  }}
                  onMouseLeave={() => {
                    setHoveredCardId(null);
                  }}
                  className="absolute group rounded-[28px] sm:rounded-[32px] border-[2.5px] border-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] overflow-hidden cursor-pointer active:scale-[0.99] flex flex-col justify-end"
                >
                  {/* Background Image with Cinematic Hover Zoom */}
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
                  />

                  {/* Natural Light Overlay matching crystal glass reference */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/15 via-transparent to-transparent pointer-events-none" />

                  {/* Emil Kowalski Glassy Morphing Capsule/Card */}
                  <GlassyFaqInteractiveCard
                    item={item}
                    isParentHovered={isHovered}
                    onCardHoverChange={(hovered) => {
                      if (hovered) {
                        setHoveredCardId(item.id);
                        setActiveIndex(item.id);
                      } else if (hoveredCardId === item.id) {
                        setHoveredCardId(null);
                      }
                    }}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* MOBILE / SMALL SCREENS (< lg): Clean Responsive Vertical Stack */}
          <div className="block lg:hidden w-full max-w-[640px] mx-auto rounded-[36px] bg-white p-5 sm:p-6 border border-blue-200/50 shadow-[0_20px_45px_rgba(0,85,255,0.06)] space-y-4">
            <div className="flex items-center justify-between px-2 pt-1 pb-1">
              <span className="text-2xl sm:text-3xl font-bold tracking-widest text-[#93C5FD]">
                FAQ
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Tap card to explore
              </span>
            </div>

            {FAQ_ITEMS.map((item) => {
              const isHovered = hoveredCardId === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setHoveredCardId((prev) => (prev === item.id ? null : item.id));
                    setActiveIndex(item.id);
                  }}
                  className="relative rounded-[28px] border-2 border-white shadow-md overflow-hidden cursor-pointer min-h-[300px] sm:min-h-[340px] flex flex-col justify-end p-2"
                >
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-slate-950/15 to-transparent pointer-events-none" />
                  <GlassyFaqInteractiveCard
                    item={item}
                    isParentHovered={isHovered}
                    onCardHoverChange={(hovered) => {
                      if (hovered) setHoveredCardId(item.id);
                      else if (hoveredCardId === item.id) setHoveredCardId(null);
                    }}
                  />
                </div>
              );
            })}
          </div>

        </ImageReveal>

        {/* Quick Navigator Pill Bar below Bento Frame & Support Help Box */}
        <Reveal delay={0.25} y={16}>
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mt-9 pt-2 px-4">
            {FAQ_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveIndex(item.id);
                  setHoveredCardId(item.id);
                }}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-[13px] font-medium tracking-tight transition-[background-color,border-color,color,box-shadow,transform] duration-200 cursor-pointer active:scale-[0.96] ${
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
        </Reveal>

      </div>
    </section>
  );
}
