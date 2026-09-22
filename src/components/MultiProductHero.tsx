import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Check,
  Calendar,
  Sparkles,
  Clock,
  Video,
  Shield,
  Zap,
  ArrowRight
} from 'lucide-react';
import GradientWaves from './GradientWaves';
import ScrollExpand from './ScrollExpand';
import { Reveal, ImageReveal } from '../motion';

interface MultiProductHeroProps {
  onOpenAuth: (mode: 'signup' | 'login') => void;
  onOpenDemo: () => void;
}

export default function MultiProductHero({ onOpenAuth, onOpenDemo }: MultiProductHeroProps) {
  const [taskChecked, setTaskChecked] = useState(true);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [workEmail, setWorkEmail] = useState('');
  const [activeProductTab, setActiveProductTab] = useState<'scheduling' | 'velie' | 'notetaker' | 'payments'>('velie');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workEmail) return;
    onOpenAuth('signup');
  };

  const [selectedDate, setSelectedDate] = useState<number | null>(14);
  const [calendarExpanded, setCalendarExpanded] = useState<boolean>(false);
  const [slotBooked, setSlotBooked] = useState<boolean>(false);
  const [cursorState, setCursorState] = useState({ x: 130, y: 160, clicking: false });

  // Expanding Calendar Animation Loop
  useEffect(() => {
    let t1: NodeJS.Timeout, t2: NodeJS.Timeout, t3: NodeJS.Timeout, t4: NodeJS.Timeout, t5: NodeJS.Timeout;

    const runSequence = () => {
      setSelectedDate(null);
      setCalendarExpanded(false);
      setSlotBooked(false);
      setCursorState({ x: 130, y: 190, clicking: false });

      // Step 1: Cursor moves to date 14 and clicks
      t1 = setTimeout(() => {
        setCursorState({ x: 125, y: 152, clicking: true });
        setSelectedDate(14);

        // Step 2: The EXACT SAME DIV expands to the right
        t2 = setTimeout(() => {
          setCalendarExpanded(true);
          setCursorState({ x: 125, y: 152, clicking: false });

          // Step 3: Cursor moves to '2:30 PM' slot and clicks
          t3 = setTimeout(() => {
            setCursorState({ x: 385, y: 112, clicking: true });

            // Step 4: Confirm slot booked
            t4 = setTimeout(() => {
              setSlotBooked(true);
              setCursorState({ x: 385, y: 112, clicking: false });

              // Step 5: Reset and shrink back to compact calendar
              t5 = setTimeout(() => {
                runSequence();
              }, 3000);
            }, 300);
          }, 1600);
        }, 350);
      }, 1500);
    };

    runSequence();

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  const handleSelectDate = (day: number) => {
    setSelectedDate(day);
    setCalendarExpanded(true);
  };

  const handleConfirmSlot = () => {
    setSlotBooked(true);
  };

  // Auto-looping animation for task checklist (clicks every 3.2 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setTaskChecked((prev) => !prev);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // Subtle booking confirmation pulse toggle
  useEffect(() => {
    const interval = setInterval(() => {
      setBookingConfirmed((prev) => !prev);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const handleProgressChange = (p: number) => {
    if (p < 0.32) {
      setActiveProductTab('scheduling');
    } else if (p < 0.52) {
      setActiveProductTab('velie');
    } else if (p < 0.72) {
      setActiveProductTab('notetaker');
    } else {
      setActiveProductTab('payments');
    }
  };

  return (
    <section className="w-full bg-white pt-12 sm:pt-16 lg:pt-20 pb-20 sm:pb-32 px-4 sm:px-6 lg:px-8 font-sans antialiased relative">
      {/* Massive Background Fluid Wave Asset (Bleeding through header zone matching Frame 11) */}
      <div 
        className="absolute -top-24 sm:-top-36 lg:-top-52 xl:-top-60 left-1/2 -translate-x-1/2 w-full max-w-[2600px] pointer-events-none -z-0 overflow-visible flex flex-col items-center select-none"
        aria-hidden="true"
      >
        {/* Atmospheric Blue Glow Clouds matching Frame 11 */}
        <div 
          className="absolute -top-20 sm:-top-32 lg:-top-44 -left-16 sm:-left-28 w-[600px] sm:w-[850px] h-[550px] sm:h-[750px] rounded-full bg-blue-400/22 blur-[130px] pointer-events-none" 
        />
        <div 
          className="absolute -top-16 sm:-top-28 lg:-top-40 -right-16 sm:-right-28 w-[650px] sm:w-[900px] h-[600px] sm:h-[800px] rounded-full bg-sky-300/20 blur-[140px] pointer-events-none" 
        />
        <div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] sm:w-[1100px] h-[500px] sm:h-[700px] rounded-full bg-sky-200/22 blur-[150px] pointer-events-none" 
        />

        {/* Full-Scale Fluid Wave Asset (Foto 1 matched exactly to Frame 11 size & position) */}
        <img
          src="/hero-bg-fluid.png"
          alt=""
          className="relative z-0 w-[1400px] sm:w-[1850px] lg:w-[2250px] xl:w-[2500px] max-w-none h-auto object-contain select-none pointer-events-none mx-auto"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* =========================================================================
            CENTERED HERO HEADER & SIGNATURE CONVERSION ENGINE (EXPANDED SPACING)
           ========================================================================= */}
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto mb-28 sm:mb-36 lg:mb-48">
          <Reveal delay={0.1} y={24}>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-normal tracking-tight text-[#0A0D14] leading-[1.08] text-balance">
              Easy scheduling ahead <br className="hidden sm:inline" />
              <span className="font-instrument italic font-normal bg-gradient-to-r from-[#418AC1] to-[#506DFD] bg-clip-text text-transparent inline-block pr-1">One platform for all of meetings</span>
            </h1>
          </Reveal>
          
          <Reveal delay={0.25} y={16}>
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mt-6 leading-relaxed font-normal text-pretty mx-auto">
              elev connects and simplifies all of the work around meetings — from scheduling, payments, and meeting prep to notetaking, contact intelligence, and follow-up.
            </p>
          </Reveal>

          {/* Email Sign-up Form */}
          <Reveal delay={0.38} y={16} className="w-full">
            <form onSubmit={handleEmailSubmit} className="mt-9 sm:mt-11 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-lg mx-auto">
              <input
                type="email"
                value={workEmail}
                onChange={(e) => setWorkEmail(e.target.value)}
                placeholder="Enter your work email"
                className="w-full sm:flex-1 h-13 px-6 rounded-full border border-[#E2E8F0] bg-white text-sm text-[#0A0D14] placeholder:text-slate-400 focus:outline-none focus:border-[#0055FF] focus:ring-4 focus:ring-[#0055FF]/10 shadow-2xs transition-[border-color,box-shadow] duration-150 ease-out font-normal"
                required
              />
              <button
                type="submit"
                className="w-full sm:w-auto h-13 px-8 rounded-full bg-gradient-to-r from-[#418AC1] to-[#506DFD] hover:brightness-105 active:scale-[0.96] text-white text-sm font-normal whitespace-nowrap shadow-xs hover:shadow-md hover:shadow-blue-500/20 transition-[transform,box-shadow,filter] duration-150 ease-out cursor-pointer flex items-center justify-center gap-2 shrink-0"
              >
                <span>Get started for free</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </Reveal>

          {/* Reassurance Micro-Copy */}
          <Reveal delay={0.48} y={12}>
            <div className="flex flex-wrap items-center justify-center gap-3.5 mt-5 sm:mt-6 text-xs text-slate-500">
              <span className="flex items-center gap-1.5 font-normal text-slate-700">
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                Create your free account
              </span>
              <span className="text-slate-300">•</span>
              <span>No credit card required</span>
              <span className="text-slate-300">•</span>
              <button
                type="button"
                onClick={onOpenDemo}
                className="text-[#0055FF] font-normal hover:underline active:scale-[0.96] transition-transform duration-150 ease-out cursor-pointer"
              >
                Talk to sales or view demo →
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Hero Interactive Stage Section */}
      <ImageReveal delay={0.6} y={32} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
        <div className="w-full relative rounded-[32px] sm:rounded-[36px] bg-[#1E60F2] bg-[url('/hero-fluid-wave-bg.png')] bg-cover bg-center overflow-hidden shadow-2xl group flex flex-col justify-center items-center p-6 sm:p-12 pt-8 sm:pt-12">
          
          {/* Subtle Ambient Vignette / Glass Depth */}
          <div className="absolute inset-0 bg-blue-600/5 mix-blend-overlay pointer-events-none z-0" />
          
          {/* Inner Content Wrapper */}
          <div className="relative z-10 w-full max-w-[1140px] mx-auto flex flex-col items-center justify-center">
            
            {/* Top Floating Product Pill Bar with Organic Shaping Fillet Neck (Matched to Reference Photo 1) */}
            <div className="flex flex-col items-center relative z-20 -mb-[2px]">
              
              {/* The Pill Dock Bar: Active Tab Elevated with Optical Proportions Centered on Icon */}
              <div className="inline-flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-full bg-white/95 backdrop-blur-xl shadow-[0_16px_40px_rgba(0,35,102,0.12),0_2px_8px_rgba(0,0,0,0.04)] border border-slate-100/90 relative z-20">
                {[
                  { 
                    id: 'scheduling', 
                    icon3d: '/icon-scheduling-3d.png', 
                    label: 'Scheduling',
                    svgPath: "M64 12C75.283 12 82 23.0983 82 34.3813V77.6175C82 88.9007 75.2832 100 64 100C39.6995 100 20 80.3005 20 56C20 31.6995 39.6995 12 64 12Z"
                  },
                  { 
                    id: 'velie', 
                    icon3d: '/icon-velie-3d.png', 
                    label: 'Velie AI',
                    svgPath: "M44 12H58C71.255 12 82 22.745 82 36V76C82 89.255 71.255 100 58 100H44C30.745 100 20 89.255 20 76V36C20 22.745 30.745 12 44 12Z"
                  },
                  { 
                    id: 'notetaker', 
                    icon3d: '/icon-notetaker-3d.png', 
                    label: 'Notetaker',
                    svgPath: "M44 12H58C71.255 12 82 22.745 82 36V76C82 89.255 71.255 100 58 100H44C30.745 100 20 89.255 20 76V36C20 22.745 30.745 12 44 12Z"
                  },
                  { 
                    id: 'payments', 
                    icon3d: '/icon-payments-3d.png', 
                    label: 'Payments',
                    svgPath: "M38 12C26.717 12 20 23.0983 20 34.3813V77.6175C20 88.9007 26.7168 100 38 100C62.3005 100 82 80.3005 82 56C82 31.6995 62.3005 12 38 12Z"
                  },
                ].map((item) => {
                  const active = activeProductTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveProductTab(item.id as any)}
                      className="relative w-[62px] sm:w-[70px] h-[82px] sm:h-[90px] flex items-center justify-center transition-transform duration-150 cursor-pointer active:scale-95 group select-none"
                      title={item.label}
                    >
                      {/* EBN/TIMBUL OPTICALLY CENTERED FIGMA VECTOR SHAPE */}
                      {active && (
                        <motion.div
                          layoutId="activeTabTimbul"
                          className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center filter drop-shadow-[0_8px_16px_rgba(0,85,255,0.22)]"
                          transition={{
                            type: 'spring',
                            stiffness: 380,
                            damping: 28,
                            mass: 0.85
                          }}
                        >
                          <svg
                            viewBox="20 12 62 88"
                            className="w-full h-full"
                            fill="none"
                            preserveAspectRatio="none"
                          >
                            <path
                              d={item.svgPath}
                              fill="white"
                            />
                          </svg>
                        </motion.div>
                      )}

                      {/* 3D Glassmorphic Icon */}
                      <img
                        src={item.icon3d}
                        alt={item.label}
                        className={`relative z-10 w-11 h-11 sm:w-12 sm:h-12 object-contain transition-all duration-200 pointer-events-none ${
                          active
                            ? 'scale-110 drop-shadow-md opacity-100'
                            : 'opacity-60 group-hover:opacity-100 group-hover:scale-105'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Organic Shaping Fillet Neck / Speech-Bubble Notch Connecting Dock to White Card */}
              <div className="w-28 h-5 -mt-1.5 relative z-10 flex justify-center pointer-events-none">
                <svg
                  viewBox="0 0 120 24"
                  className="w-full h-full fill-white"
                  preserveAspectRatio="none"
                >
                  <path d="M 0,24 C 28,24 34,0 46,0 L 74,0 C 86,0 92,24 120,24 Z" />
                </svg>
              </div>

            </div>

            {/* Inner White Stage Card */}
            <div className="bg-white rounded-[28px] p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,35,102,0.08),0_4px_12px_rgba(0,0,0,0.03)] border border-slate-100/80 flex flex-col lg:flex-row items-center justify-between gap-8 text-left relative z-10 overflow-hidden w-full min-h-[420px]">
            
            {/* Left Column: Product Info with Fade Effect on Tab Switch */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProductTab}
                initial={{ opacity: 0, y: 8, filter: 'blur(3px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -8, filter: 'blur(3px)' }}
                transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                className="flex-1 max-w-md"
              >
                <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-2xs mb-4">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white border border-slate-200/90 shadow-[0_3px_10px_rgba(0,0,0,0.04)] flex items-center justify-center p-1 shrink-0">
                    <img
                      src={
                        activeProductTab === 'scheduling' ? '/icon-scheduling-3d.png' :
                        activeProductTab === 'velie' ? '/icon-velie-3d.png' :
                        activeProductTab === 'notetaker' ? '/icon-notetaker-3d.png' :
                        '/icon-payments-3d.png'
                      }
                      alt={activeProductTab}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-sm sm:text-base font-normal text-[#0A0D14] tracking-tight">
                    {activeProductTab === 'velie' ? 'Velie AI' : activeProductTab === 'scheduling' ? 'Scheduling' : activeProductTab === 'notetaker' ? 'Notetaker' : 'Payments'}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-[#0A0D14] tracking-tight leading-snug">
                  {activeProductTab === 'scheduling' && "Book meetings with the world’s #1 scheduling tool"}
                  {activeProductTab === 'velie' && "Introducing your 24/7 AI scheduling assistant"}
                  {activeProductTab === 'notetaker' && "Actionable, shareable recaps for every meeting"}
                  {activeProductTab === 'payments' && "Flexible, built-in payment tools for your business"}
                </h2>

                <p className="text-sm sm:text-base text-[#475569] mt-3 leading-relaxed font-normal">
                  {activeProductTab === 'scheduling' && "Giving you complete control and total customization, elev is the easiest and most powerful way to find time to connect."}
                  {activeProductTab === 'velie' && "Add Velie to any email thread to coordinate scheduling on your behalf without switching tools or sacrificing control."}
                  {activeProductTab === 'notetaker' && "Finish the day knowing every meeting was captured, next steps were tracked, and follow-ups were handled automatically."}
                  {activeProductTab === 'payments' && "Charge upfront for meetings, sell consultation packages, and send invoices with payment features that make it easy to get paid."}
                </p>

                <a
                  href={`#${activeProductTab}`}
                  className="inline-flex items-center gap-2 text-sm font-normal text-[#0055FF] hover:text-[#0047D6] active:scale-[0.97] transition-transform duration-150 mt-6 group cursor-pointer"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            </AnimatePresence>

            {/* Right Column: Soft Blue Container */}
            <div className="w-full lg:w-auto flex-1 bg-[#EFF6FF] rounded-2xl p-4 sm:p-8 flex items-center justify-center min-h-[380px] overflow-hidden relative group/stage">
              
              {/* Faded Diagonal Dot Pattern Overlay with Looping Animation */}
              <div 
                className="absolute inset-0 opacity-20 bg-[radial-gradient(#0055FF_1.2px,transparent_1.2px)] [background-size:16px_16px] pointer-events-none animate-dot-pulse-dark group-hover/stage:opacity-35 transition-opacity duration-500"
                style={{
                  maskImage: 'linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0) 85%)',
                  WebkitMaskImage: 'linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0) 85%)'
                }}
              />

              {/* Subtle ambient fade glow backdrop */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-200/30 via-transparent to-blue-400/10 pointer-events-none rounded-2xl" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProductTab}
                  initial={{ opacity: 0, scale: 0.97, filter: 'blur(3px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.97, filter: 'blur(3px)' }}
                  transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                  className="w-full flex items-center justify-center relative z-10"
                >
                  {activeProductTab === 'scheduling' && (
                    <motion.div
                      layout
                      initial={false}
                      animate={{
                        width: calendarExpanded ? '100%' : '280px',
                        maxWidth: calendarExpanded ? '530px' : '280px'
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 220,
                        damping: 26,
                        mass: 0.8
                      }}
                      className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/90 shadow-[0_12px_32px_rgba(0,0,0,0.06)] relative overflow-hidden flex flex-col sm:flex-row gap-5 sm:gap-6 items-start select-none"
                    >
                      {/* Left Half: The Calendar Grid (240px min-width) */}
                      <div className="w-[240px] shrink-0 text-left">
                        
                        {/* Month Header */}
                        <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
                          <span className="text-xs font-normal text-slate-400 select-none">‹</span>
                          <span className="text-xs font-normal text-slate-800 tracking-wide font-sans tabular-nums">July 2026</span>
                          <span className="text-xs font-normal text-slate-400 select-none">›</span>
                        </div>

                        {/* Days of week */}
                        <div className="grid grid-cols-7 gap-1 text-[10px] font-normal text-slate-400 text-center mb-1">
                          <span>SUN</span>
                          <span>MON</span>
                          <span>TUE</span>
                          <span>WED</span>
                          <span>THU</span>
                          <span>FRI</span>
                          <span>SAT</span>
                        </div>

                        {/* Days Grid (1..31) */}
                        <div className="grid grid-cols-7 gap-1 text-center text-xs font-normal text-slate-700 tabular-nums">
                          <span className="text-slate-200"></span>
                          <span className="text-slate-200"></span>
                          <span className="text-slate-200"></span>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].map((d) => {
                            const isTarget = d === 14;
                            const isSelected = selectedDate === d;
                            return (
                              <button
                                key={d}
                                type="button"
                                onClick={() => handleSelectDate(d)}
                                className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-normal transition-all duration-150 cursor-pointer active:scale-[0.94] ${
                                  isSelected
                                    ? 'bg-[#0055FF] text-white shadow-xs scale-105'
                                    : isTarget
                                    ? 'bg-blue-100 text-[#0055FF] font-normal ring-2 ring-[#0055FF]/40'
                                    : 'hover:bg-slate-100 text-slate-700'
                                }`}
                              >
                                {d}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <AnimatePresence mode="wait">
                        {calendarExpanded && (
                          <motion.div
                            key="expanded-time-panel"
                            initial={{ opacity: 0, x: 16, filter: 'blur(3px)' }}
                            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, x: 12, filter: 'blur(3px)' }}
                            transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
                            className="flex-1 w-full shrink-0 border-t sm:border-t-0 sm:border-l border-slate-100/90 pt-3 sm:pt-0 sm:pl-6 text-left flex flex-col justify-between h-full"
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-3.5">
                                <div>
                                  <div className="text-xs font-normal text-slate-900 tracking-tight">Thursday</div>
                                  <div className="text-[11px] font-normal text-slate-500 tabular-nums">July 14, 2026</div>
                                </div>
                                <span className="text-[10px] font-normal text-blue-600 bg-blue-50/90 px-2.5 py-0.5 rounded-full border border-blue-100/80 shrink-0 shadow-2xs tabular-nums">
                                  2 slots open
                                </span>
                              </div>

                              <div className="space-y-2.5">
                                <button
                                  type="button"
                                  className="w-full py-2.5 px-3 rounded-xl border border-blue-100 bg-blue-50/40 text-[#0055FF] text-xs font-normal text-center hover:bg-blue-100/70 hover:border-blue-200 active:scale-[0.97] transition-all duration-150 ease-out cursor-pointer flex items-center justify-center gap-1.5 tabular-nums"
                                >
                                  <span>12:30 PM</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={handleConfirmSlot}
                                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-normal text-center active:scale-[0.97] transition-all duration-150 ease-out flex items-center justify-center gap-2 cursor-pointer tabular-nums ${
                                    slotBooked
                                      ? 'bg-[#0055FF] text-white shadow-md shadow-blue-500/25'
                                      : 'border border-blue-100 bg-blue-50/40 text-[#0055FF] hover:bg-blue-100/70 hover:border-blue-200'
                                  }`}
                                >
                                  {slotBooked ? (
                                    <motion.div
                                      initial={{ opacity: 0, scale: 0.85 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                                      className="flex items-center gap-1.5 font-normal"
                                    >
                                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                                      <span>Booked</span>
                                    </motion.div>
                                  ) : (
                                    <span>2:30 PM</span>
                                  )}
                                </button>
                              </div>
                            </div>

                            <AnimatePresence>
                              {slotBooked && (
                                <motion.div
                                  initial={{ opacity: 0, y: 6, scale: 0.95, filter: 'blur(3px)' }}
                                  animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                                  exit={{ opacity: 0, y: 4, scale: 0.95, filter: 'blur(3px)' }}
                                  transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                                  className="mt-3 py-2.5 px-3 rounded-xl bg-slate-900 text-white text-[11px] font-normal flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 border border-slate-800/80 w-full"
                                >
                                  <span className="relative flex h-2 w-2 shrink-0">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                  </span>
                                  <span className="tracking-tight font-normal text-slate-100">Calendar hold sent</span>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}

                  {/* Stage preview views for Velie, Notetaker & Payments tabs with fade effect */}
                  {activeProductTab === 'velie' && (
                    <LiveChatConversationAnimation />
                  )}

                  {activeProductTab === 'notetaker' && (
                    <LiveNotetakerSoundwaveAnimation />
                  )}

                  {activeProductTab === 'payments' && (
                    <LivePaymentsConveyorAnimation />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      </ImageReveal>

      {/* Bento Grid Section (Constrained inside max-w-7xl) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex flex-col gap-5 sm:gap-6">

          {/* -----------------------------------------------------------------------
              BOTTOM ROW: 3 Equal-Width Cards (33.3% / 33.3% / 33.3%)
             ----------------------------------------------------------------------- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            
            {/* CARD 3 (Bottom Left): Notetaker / Follow-up Backlog */}
            <div className="group rounded-2xl bg-white border border-[#E2E8F0] p-7 sm:p-8 overflow-hidden flex flex-col justify-between min-h-[360px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-shadow duration-300">
              
              {/* Header */}
              <div className="text-left">
                <h3 className="text-lg sm:text-[1.25rem] font-normal text-[#0A0D14] tracking-tight leading-snug">
                  Meeting automation <span className="font-normal text-[#94A3B8]">that</span>
                </h3>
                <p className="text-lg sm:text-[1.25rem] font-normal text-[#94A3B8] tracking-tight leading-snug">
                  clears the follow-up backlog
                </p>
              </div>

              {/* Miniature macOS Browser Window Mockup */}
              <div className="mt-6 rounded-2xl bg-slate-50/90 border border-slate-200/90 p-4 shadow-inner relative overflow-hidden">
                
                {/* Window Controls Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-400/80" />
                    <span className="w-2 h-2 rounded-full bg-amber-400/80" />
                    <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-normal text-slate-600 shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                    <span>elev.ai/notetaker</span>
                  </div>
                  <span className="w-4" />
                </div>

                {/* Interactive Task Checklist with Animated Cursor */}
                <div className="pt-3.5 space-y-2.5 text-left text-xs">
                  
                  {/* Task 1: Auto-clicking task */}
                  <div
                    onClick={() => setTaskChecked(!taskChecked)}
                    className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs relative cursor-pointer select-none"
                  >
                    <motion.div
                      animate={{ scale: taskChecked ? [0.9, 1.1, 1] : 1 }}
                      transition={{ duration: 0.2 }}
                      className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        taskChecked ? 'bg-emerald-500 text-white' : 'border border-slate-300 bg-white'
                      }`}
                    >
                      {taskChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </motion.div>
                    <div>
                      <p className="font-normal text-slate-800 text-xs leading-tight">
                        Sync action items to Notion & Slack
                      </p>
                      <p className="text-emerald-600 font-normal text-[10px] mt-1 flex items-center gap-1">
                        <span>Elena assigned • Due Friday</span>
                      </p>
                    </div>
                  </div>

                  {/* Task 2: Secondary task */}
                  <div className="flex items-start gap-2.5 bg-white/80 p-3 rounded-xl border border-slate-200/60">
                    <div className="w-4 h-4 rounded-md border border-slate-300 bg-white shrink-0 mt-0.5 flex items-center justify-center">
                      <Clock className="w-2.5 h-2.5 text-slate-400" />
                    </div>
                    <div>
                      <p className="font-normal text-slate-600 text-xs leading-tight">
                        Send Google Meet recap with video timestamps
                      </p>
                      <p className="text-blue-600 font-normal text-[10px] mt-1">
                        Generated in 1.4s post-call
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* CARD 4 (Bottom Center): VIP Smart Scheduling Card */}
            <div className="group rounded-2xl bg-white border border-[#E2E8F0] p-6 sm:p-7 overflow-hidden flex flex-col justify-between min-h-[360px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-shadow duration-300">
              
              {/* Header */}
              <div className="text-left mb-4">
                <h3 className="text-lg sm:text-xl font-normal text-[#0A0D14] tracking-tight">
                  VIP smart scheduling
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed text-pretty">
                  Intelligent routing, availability matching, and buffers to create the perfect meeting experience.
                </p>
              </div>

              {/* VIP Scheduling UI Mockup */}
              <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-[#E2E8F0]/80 shadow-2xs space-y-3">
                {/* Match Header */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-normal text-slate-600">Best match</span>
                  <span className="text-[11px] font-normal text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-200/60 tabular-nums">
                    90% fit
                  </span>
                </div>

                {/* Person Card */}
                <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200/70 shadow-2xs">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-500 text-white flex items-center justify-center font-normal text-xs shadow-2xs shrink-0 ring-2 ring-blue-100">
                      SC
                    </div>
                    <div>
                      <h4 className="text-xs font-normal text-slate-900 leading-tight">Sarah Chen</h4>
                      <p className="text-[11px] text-slate-500 leading-tight">Account Executive</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-normal text-blue-600 tabular-nums">
                    <span className="text-[10px]">▲</span>
                    <span>4.9</span>
                  </div>
                </div>

                {/* Optimal Time Section */}
                <div className="bg-white p-3 rounded-xl border border-slate-200/70 shadow-2xs space-y-2">
                  <span className="text-[11px] font-normal text-slate-700 block">Optimal time</span>
                  
                  <div className="flex items-center justify-between text-xs font-normal text-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <Calendar className="w-3 h-3" />
                      </div>
                      <span className="tabular-nums">10:00 AM – 10:30 AM</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-normal text-slate-600">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <Clock className="w-3 h-3" />
                      </div>
                      <span className="tabular-nums">10 min buffer before</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* CARD 5 (Bottom Right): Connected Meeting Stack Card with Gooey Liquid Motion */}
            <div className="group rounded-2xl bg-white border border-[#E2E8F0] p-6 sm:p-7 overflow-hidden flex flex-col justify-between min-h-[360px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-shadow duration-300 relative">
              
              {/* Header */}
              <div className="text-left mb-4 relative z-10">
                <h3 className="text-lg sm:text-xl font-normal text-[#0A0D14] tracking-tight">
                  Connected meeting stack
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed text-pretty">
                  Synced data, notes, and actions flow to the tools your team already uses.
                </p>
              </div>

              {/* Sliding Integration Tracks Container */}
              <div className="relative z-10 flex-1 flex flex-col justify-center gap-3 py-2 overflow-hidden">
                
                {/* Edge Fade Gradients */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

                {/* Track 1: Sliding Left */}
                <div className="w-full overflow-hidden">
                  <div className="flex gap-2.5 w-max animate-marquee hover:[animation-play-state:paused] py-1">
                    {[
                      {
                        name: 'Salesforce',
                        icon: (
                          <svg className="w-4 h-4 text-[#00A1E0]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
                          </svg>
                        )
                      },
                      {
                        name: 'HubSpot',
                        icon: (
                          <svg className="w-4 h-4 text-[#FF7A59]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.8 10.4V7.3L15.7 8.9v3.1l3.1-1.6zm-4.7 2.4V9.7L11 11.3v3.1l3.1-1.6zm-4.7 2.4V12.1L6.3 13.7v3.1l3.1-1.6zM22 12c0 5.5-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2s10 4.5 10 10z" />
                          </svg>
                        )
                      },
                      {
                        name: 'Slack',
                        icon: (
                          <svg className="w-4 h-4 text-[#4A154B]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165c0-1.394 1.127-2.52 2.522-2.52h2.52v2.52zM6.313 15.165c0-1.394 1.127-2.52 2.52-2.52h2.52v2.52a2.528 2.528 0 0 1-2.52 2.523 2.528 2.528 0 0 1-2.52-2.523zM8.833 5.042a2.528 2.528 0 0 1-2.52-2.52A2.528 2.528 0 0 1 8.833 0c1.394 0 2.52 1.127 2.52 2.522v2.52H8.833zM8.833 6.313c1.394 0 2.52 1.127 2.52 2.52v2.52H8.833a2.528 2.528 0 0 1-2.52-2.52 2.528 2.528 0 0 1 2.52-2.52z" />
                          </svg>
                        )
                      },
                      {
                        name: 'Notion',
                        icon: (
                          <svg className="w-4 h-4 text-slate-900" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l11.082-.746c.326 0 .093-.326-.047-.42C16.894 2.622 15.682 2 13.91 2c-1.352 0-2.427.326-4.664.886l-4.79 1.322zm.326 3.03v12.72c0 .886.42 1.398 1.445 1.49l11.782.747c.885.047 1.444-.373 1.444-1.398V7.985c0-.84-.373-1.306-1.258-1.353l-12.062-.746c-.886-.047-1.351.42-1.351 1.352z" />
                          </svg>
                        )
                      },
                      {
                        name: 'Zoom',
                        icon: (
                          <svg className="w-4 h-4 text-[#2D8CFF]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4.5 4.5A2.5 2.5 0 0 0 2 7v10a2.5 2.5 0 0 0 2.5 2.5h11a2.5 2.5 0 0 0 2.5-2.5v-3.2l3.5 2.6a1 1 0 0 0 1.6-.8V8.4a1 1 0 0 0-1.6-.8L18 10.2V7a2.5 2.5 0 0 0-2.5-2.5h-11z" />
                          </svg>
                        )
                      },
                      {
                        name: 'Google Meet',
                        icon: (
                          <svg className="w-4 h-4 text-[#00875A]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
                          </svg>
                        )
                      },
                      {
                        name: 'Salesforce',
                        icon: (
                          <svg className="w-4 h-4 text-[#00A1E0]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
                          </svg>
                        )
                      },
                      {
                        name: 'HubSpot',
                        icon: (
                          <svg className="w-4 h-4 text-[#FF7A59]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.8 10.4V7.3L15.7 8.9v3.1l3.1-1.6zm-4.7 2.4V9.7L11 11.3v3.1l3.1-1.6zm-4.7 2.4V12.1L6.3 13.7v3.1l3.1-1.6zM22 12c0 5.5-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2s10 4.5 10 10z" />
                          </svg>
                        )
                      },
                      {
                        name: 'Slack',
                        icon: (
                          <svg className="w-4 h-4 text-[#4A154B]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165c0-1.394 1.127-2.52 2.522-2.52h2.52v2.52zM6.313 15.165c0-1.394 1.127-2.52 2.52-2.52h2.52v2.52a2.528 2.528 0 0 1-2.52 2.523 2.528 2.528 0 0 1-2.52-2.523zM8.833 5.042a2.528 2.528 0 0 1-2.52-2.52A2.528 2.528 0 0 1 8.833 0c1.394 0 2.52 1.127 2.52 2.522v2.52H8.833zM8.833 6.313c1.394 0 2.52 1.127 2.52 2.52v2.52H8.833a2.528 2.528 0 0 1-2.52-2.52 2.528 2.528 0 0 1 2.52-2.52z" />
                          </svg>
                        )
                      },
                      {
                        name: 'Notion',
                        icon: (
                          <svg className="w-4 h-4 text-slate-900" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l11.082-.746c.326 0 .093-.326-.047-.42C16.894 2.622 15.682 2 13.91 2c-1.352 0-2.427.326-4.664.886l-4.79 1.322zm.326 3.03v12.72c0 .886.42 1.398 1.445 1.49l11.782.747c.885.047 1.444-.373 1.444-1.398V7.985c0-.84-.373-1.306-1.258-1.353l-12.062-.746c-.886-.047-1.351.42-1.351 1.352z" />
                          </svg>
                        )
                      },
                      {
                        name: 'Zoom',
                        icon: (
                          <svg className="w-4 h-4 text-[#2D8CFF]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4.5 4.5A2.5 2.5 0 0 0 2 7v10a2.5 2.5 0 0 0 2.5 2.5h11a2.5 2.5 0 0 0 2.5-2.5v-3.2l3.5 2.6a1 1 0 0 0 1.6-.8V8.4a1 1 0 0 0-1.6-.8L18 10.2V7a2.5 2.5 0 0 0-2.5-2.5h-11z" />
                          </svg>
                        )
                      },
                      {
                        name: 'Google Meet',
                        icon: (
                          <svg className="w-4 h-4 text-[#00875A]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
                          </svg>
                        )
                      }
                    ].map((pill, i) => (
                      <div
                        key={`${pill.name}-${i}`}
                        style={{ animationDelay: `${(i % 6) * 0.7}s` }}
                        className="animate-gooey-border flex items-center gap-2 px-3 py-2 bg-white border border-blue-200/80 shadow-[0_3px_12px_rgba(0,85,255,0.05)] hover:border-blue-400 hover:shadow-md transition-all duration-200 cursor-pointer shrink-0 active:scale-[0.96]"
                      >
                        <div className="w-5 h-5 rounded-md bg-slate-50 flex items-center justify-center shrink-0">
                          {pill.icon}
                        </div>
                        <span className="text-xs font-normal text-slate-800 tracking-tight whitespace-nowrap">
                          {pill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Track 2: Sliding Right */}
                <div className="w-full overflow-hidden">
                  <div className="flex gap-2.5 w-max animate-marquee-reverse hover:[animation-play-state:paused] py-1">
                    {[
                      {
                        name: 'Notion',
                        icon: (
                          <svg className="w-4 h-4 text-slate-900" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l11.082-.746c.326 0 .093-.326-.047-.42C16.894 2.622 15.682 2 13.91 2c-1.352 0-2.427.326-4.664.886l-4.79 1.322zm.326 3.03v12.72c0 .886.42 1.398 1.445 1.49l11.782.747c.885.047 1.444-.373 1.444-1.398V7.985c0-.84-.373-1.306-1.258-1.353l-12.062-.746c-.886-.047-1.351.42-1.351 1.352z" />
                          </svg>
                        )
                      },
                      {
                        name: 'Zoom',
                        icon: (
                          <svg className="w-4 h-4 text-[#2D8CFF]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4.5 4.5A2.5 2.5 0 0 0 2 7v10a2.5 2.5 0 0 0 2.5 2.5h11a2.5 2.5 0 0 0 2.5-2.5v-3.2l3.5 2.6a1 1 0 0 0 1.6-.8V8.4a1 1 0 0 0-1.6-.8L18 10.2V7a2.5 2.5 0 0 0-2.5-2.5h-11z" />
                          </svg>
                        )
                      },
                      {
                        name: 'Google Meet',
                        icon: (
                          <svg className="w-4 h-4 text-[#00875A]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
                          </svg>
                        )
                      },
                      {
                        name: 'Salesforce',
                        icon: (
                          <svg className="w-4 h-4 text-[#00A1E0]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
                          </svg>
                        )
                      },
                      {
                        name: 'HubSpot',
                        icon: (
                          <svg className="w-4 h-4 text-[#FF7A59]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.8 10.4V7.3L15.7 8.9v3.1l3.1-1.6zm-4.7 2.4V9.7L11 11.3v3.1l3.1-1.6zm-4.7 2.4V12.1L6.3 13.7v3.1l3.1-1.6zM22 12c0 5.5-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2s10 4.5 10 10z" />
                          </svg>
                        )
                      },
                      {
                        name: 'Slack',
                        icon: (
                          <svg className="w-4 h-4 text-[#4A154B]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165c0-1.394 1.127-2.52 2.522-2.52h2.52v2.52zM6.313 15.165c0-1.394 1.127-2.52 2.52-2.52h2.52v2.52a2.528 2.528 0 0 1-2.52 2.523 2.528 2.528 0 0 1-2.52-2.523zM8.833 5.042a2.528 2.528 0 0 1-2.52-2.52A2.528 2.528 0 0 1 8.833 0c1.394 0 2.52 1.127 2.52 2.522v2.52H8.833zM8.833 6.313c1.394 0 2.52 1.127 2.52 2.52v2.52H8.833a2.528 2.528 0 0 1-2.52-2.52 2.528 2.528 0 0 1 2.52-2.52z" />
                          </svg>
                        )
                      },
                      {
                        name: 'Notion',
                        icon: (
                          <svg className="w-4 h-4 text-slate-900" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l11.082-.746c.326 0 .093-.326-.047-.42C16.894 2.622 15.682 2 13.91 2c-1.352 0-2.427.326-4.664.886l-4.79 1.322zm.326 3.03v12.72c0 .886.42 1.398 1.445 1.49l11.782.747c.885.047 1.444-.373 1.444-1.398V7.985c0-.84-.373-1.306-1.258-1.353l-12.062-.746c-.886-.047-1.351.42-1.351 1.352z" />
                          </svg>
                        )
                      },
                      {
                        name: 'Zoom',
                        icon: (
                          <svg className="w-4 h-4 text-[#2D8CFF]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4.5 4.5A2.5 2.5 0 0 0 2 7v10a2.5 2.5 0 0 0 2.5 2.5h11a2.5 2.5 0 0 0 2.5-2.5v-3.2l3.5 2.6a1 1 0 0 0 1.6-.8V8.4a1 1 0 0 0-1.6-.8L18 10.2V7a2.5 2.5 0 0 0-2.5-2.5h-11z" />
                          </svg>
                        )
                      },
                      {
                        name: 'Google Meet',
                        icon: (
                          <svg className="w-4 h-4 text-[#00875A]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
                          </svg>
                        )
                      },
                      {
                        name: 'Salesforce',
                        icon: (
                          <svg className="w-4 h-4 text-[#00A1E0]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
                          </svg>
                        )
                      },
                      {
                        name: 'HubSpot',
                        icon: (
                          <svg className="w-4 h-4 text-[#FF7A59]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.8 10.4V7.3L15.7 8.9v3.1l3.1-1.6zm-4.7 2.4V9.7L11 11.3v3.1l3.1-1.6zm-4.7 2.4V12.1L6.3 13.7v3.1l3.1-1.6zM22 12c0 5.5-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2s10 4.5 10 10z" />
                          </svg>
                        )
                      },
                      {
                        name: 'Slack',
                        icon: (
                          <svg className="w-4 h-4 text-[#4A154B]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165c0-1.394 1.127-2.52 2.522-2.52h2.52v2.52zM6.313 15.165c0-1.394 1.127-2.52 2.52-2.52h2.52v2.52a2.528 2.528 0 0 1-2.52 2.523 2.528 2.528 0 0 1-2.52-2.523zM8.833 5.042a2.528 2.528 0 0 1-2.52-2.52A2.528 2.528 0 0 1 8.833 0c1.394 0 2.52 1.127 2.52 2.522v2.52H8.833zM8.833 6.313c1.394 0 2.52 1.127 2.52 2.52v2.52H8.833a2.528 2.528 0 0 1-2.52-2.52 2.528 2.528 0 0 1 2.52-2.52z" />
                          </svg>
                        )
                      }
                    ].map((pill, i) => (
                      <div
                        key={`${pill.name}-r2-${i}`}
                        style={{ animationDelay: `${(i % 6) * 0.7}s` }}
                        className="animate-gooey-border flex items-center gap-2 px-3 py-2 bg-white border border-blue-200/80 shadow-[0_3px_12px_rgba(0,85,255,0.05)] hover:border-blue-400 hover:shadow-md transition-all duration-200 cursor-pointer shrink-0 active:scale-[0.96]"
                      >
                        <div className="w-5 h-5 rounded-md bg-slate-50 flex items-center justify-center shrink-0">
                          {pill.icon}
                        </div>
                        <span className="text-xs font-normal text-slate-800 tracking-tight whitespace-nowrap">
                          {pill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Wide Pill (+ 50+ more integrations) */}
                <motion.div
                  style={{ animationDelay: '2.5s' }}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="animate-gooey-border w-full py-2.5 px-4 bg-blue-50/80 hover:bg-blue-100/90 text-[#0055FF] text-xs font-normal border border-blue-200/80 flex items-center justify-center gap-1.5 shadow-[0_4px_16px_rgba(0,85,255,0.06)] transition-colors duration-200 cursor-pointer mt-1"
                >
                  <span className="text-sm leading-none font-normal">+</span>
                  <span className="tabular-nums font-normal">50+ more integrations</span>
                </motion.div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

function LiveChatConversationAnimation() {
  const [currentConvoIndex, setCurrentConvoIndex] = useState(0);
  const [stageStep, setStageStep] = useState(0); // 0: empty, 1: left avatar+bubble, 2: right avatar+bubble

  const conversations = [
    {
      id: 1,
      clientName: "Alex R.",
      clientAvatar: "A",
      clientBg: "bg-slate-900",
      clientText: "We have a $25k budget & need to launch Q4, can we meet?",
      replyText: "Calendar hold sent for Thursday 2:30 PM!",
      tag: "$25k Budget • Qualified"
    },
    {
      id: 2,
      clientName: "Sophia C.",
      clientAvatar: "S",
      clientBg: "bg-[#0055FF]",
      clientText: "Looking for 50 seats demo for our team.",
      replyText: "Matched with Senior AE & hold confirmed!",
      tag: "50 Seats • High Intent"
    },
    {
      id: 3,
      clientName: "Marcus V.",
      clientAvatar: "M",
      clientBg: "bg-emerald-600",
      clientText: "Your works are fire, let's work!",
      replyText: "Sure! Calendar link & hold dispatched.",
      tag: "VIP Lead • Instant Booking"
    }
  ];

  useEffect(() => {
    let active = true;
    let t1: NodeJS.Timeout, t2: NodeJS.Timeout, t3: NodeJS.Timeout;

    const runStepSequence = () => {
      if (!active) return;
      setStageStep(0);

      // Step 1: Left bubble appears
      t1 = setTimeout(() => {
        if (active) setStageStep(1);
      }, 300);

      // Step 2: Right response bubble appears
      t2 = setTimeout(() => {
        if (active) setStageStep(2);
      }, 1200);

      // Step 3: Advance to next conversation
      t3 = setTimeout(() => {
        if (active) {
          setCurrentConvoIndex((prev) => (prev + 1) % conversations.length);
        }
      }, 4200);
    };

    runStepSequence();

    return () => {
      active = false;
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [currentConvoIndex]);

  const current = conversations[currentConvoIndex];

  return (
    <div className="w-full max-w-[390px] bg-white border border-slate-200/90 shadow-[0_12px_32px_rgba(0,0,0,0.05)] rounded-2xl p-5 relative overflow-hidden select-none text-left font-sans">
      
      {/* 1. Header Bar */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <h3 className="text-xs font-normal text-[#0A0D14] tracking-tight">
            Clients worth your time
          </h3>
        </div>
        <span className="text-[10px] font-normal text-[#0055FF] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/60 tracking-wide uppercase">
          Live Booking
        </span>
      </div>

      {/* 2. Conversation Bubble Area */}
      <div className="min-h-[148px] flex flex-col justify-between py-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, filter: 'blur(4px)', y: 6 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            exit={{ opacity: 0, filter: 'blur(4px)', y: -6 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3"
          >
            {/* Tag Badge */}
            <div className="flex items-center justify-center">
              <span className="text-[9px] font-normal text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200/60">
                {current.tag}
              </span>
            </div>

            {/* Left Chat Message Row (Client) */}
            <div className="flex items-end gap-2.5 justify-start min-h-[40px]">
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: stageStep >= 1 ? 1 : 0.7, opacity: stageStep >= 1 ? 1 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className={`w-7 h-7 rounded-full ${current.clientBg} text-white font-normal text-[11px] flex items-center justify-center shrink-0 shadow-2xs`}
              >
                {current.clientAvatar}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: -8 }}
                animate={{
                  opacity: stageStep >= 1 ? 1 : 0,
                  scale: stageStep >= 1 ? 1 : 0.9,
                  x: stageStep >= 1 ? 0 : -8
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                className="bg-slate-100 text-slate-800 text-xs font-normal px-3.5 py-2 rounded-2xl rounded-bl-xs border border-slate-200/60 max-w-[82%]"
              >
                {current.clientText}
              </motion.div>
            </div>

            {/* Right Chat Message Row (Velie / elev AI) */}
            <div className="flex items-end gap-2.5 justify-end min-h-[40px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: 8 }}
                animate={{
                  opacity: stageStep >= 2 ? 1 : 0,
                  scale: stageStep >= 2 ? 1 : 0.9,
                  x: stageStep >= 2 ? 0 : 8
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                className="bg-[#0055FF] text-white text-xs font-normal px-3.5 py-2 rounded-2xl rounded-br-xs shadow-xs max-w-[82%]"
              >
                {current.replyText}
              </motion.div>

              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: stageStep >= 2 ? 1 : 0.7, opacity: stageStep >= 2 ? 1 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="w-7 h-7 rounded-full bg-[#0055FF] text-white font-normal text-[11px] flex items-center justify-center shrink-0 shadow-2xs"
              >
                E
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. Interactive Pager Dots */}
      <div className="flex items-center justify-center gap-1.5 mt-2.5 pt-2 border-t border-slate-100">
        {conversations.map((c, i) => (
          <button
            key={c.id}
            onClick={() => setCurrentConvoIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              i === currentConvoIndex ? 'w-5 bg-[#0055FF]' : 'w-1.5 bg-slate-200 hover:bg-slate-300'
            }`}
          />
        ))}
      </div>

    </div>
  );
}

function LiveNotetakerSoundwaveAnimation() {
  const [deck, setDeck] = useState([0, 1, 2]);

  const cards = [
    {
      id: 1,
      title: "Follow-up Call",
      text: "Calendar hold set for Thursday 2:30 PM",
      subtext: "Auto-scheduled with AE team",
      badge: "Hold Sent",
      badgeStyle: "bg-emerald-50 text-emerald-700 border-emerald-200/80"
    },
    {
      id: 2,
      title: "Key Action Item",
      text: "Send revised contract & API docs to Sarah by EOD",
      subtext: "Assigned to Elena • High priority",
      badge: "Synced",
      badgeStyle: "bg-blue-50 text-[#0055FF] border-blue-200/80"
    },
    {
      id: 3,
      title: "CRM Update",
      text: "Synced deal terms & summary to Salesforce",
      subtext: "Pushed to CRM in 1.2s",
      badge: "Auto-Sync",
      badgeStyle: "bg-purple-50 text-purple-700 border-purple-200/80"
    }
  ];

  const handleShuffle = () => {
    setDeck((prev) => {
      const [top, ...rest] = prev;
      return [...rest, top];
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleShuffle();
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-[390px] bg-white border border-slate-200/80 shadow-[0_12px_32px_rgba(0,0,0,0.04)] rounded-2xl p-5 relative overflow-hidden select-none text-left font-sans">
      
      {/* SVG Gooey Filter Definition */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id="clean-gooey-wave">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 16 -7"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* 1. Header Bar */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0055FF]"></span>
          </span>
          <h3 className="text-xs font-normal text-[#0A0D14] tracking-tight">
            Live Meeting Transcript & Recap
          </h3>
        </div>
        <span className="text-[10px] font-normal text-[#0055FF] bg-blue-50/80 px-2.5 py-0.5 rounded-full border border-blue-100/80">
          Auto-Sync
        </span>
      </div>

      {/* 2. ULTRA-CLEAN GOOEY SOUNDWAVE BAR */}
      <div className="mb-4 p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-normal text-slate-700">
            Recording Audio...
          </span>
        </div>

        {/* Minimalist Gooey Soundwave */}
        <div 
          className="flex items-center gap-1 h-5 px-1"
          style={{ filter: 'url(#clean-gooey-wave)' }}
        >
          {[0.8, 1.4, 0.6, 1.8, 1.0, 1.3].map((speed, i) => (
            <motion.div
              key={i}
              animate={{
                height: ['5px', '18px', '8px', '20px', '5px'],
              }}
              transition={{
                duration: 1.1 / speed,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
                delay: i * 0.1,
              }}
              className="w-1.5 bg-gradient-to-t from-[#0055FF] to-[#38BDF8] rounded-full"
            />
          ))}
        </div>
      </div>

      {/* 3. STACKED SHUFFLE CARDS DECK CONTAINER */}
      <div 
        onClick={handleShuffle}
        className="relative h-[135px] w-full cursor-pointer active:scale-[0.98] transition-transform duration-150"
      >
        {cards.map((card, cardIndex) => {
          const positionInDeck = deck.indexOf(cardIndex);

          // Clean Concentric Stacked positions: Top (0), Middle (1), Back (2)
          const config = [
            { y: 0, x: 0, rotate: 0, scale: 1, opacity: 1, zIndex: 30 },
            { y: 8, x: 0, rotate: 0, scale: 0.95, opacity: 0.85, zIndex: 20 },
            { y: 16, x: 0, rotate: 0, scale: 0.90, opacity: 0.65, zIndex: 10 }
          ][positionInDeck] || { y: 20, x: 0, rotate: 0, scale: 0.85, opacity: 0, zIndex: 0 };

          return (
            <motion.div
              key={card.id}
              style={{ zIndex: config.zIndex, transformOrigin: 'bottom center' }}
              animate={{
                y: config.y,
                x: config.x,
                rotate: config.rotate,
                scale: config.scale,
                opacity: config.opacity,
              }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 22,
                mass: 0.85
              }}
              className="absolute inset-x-0 top-0 p-4 rounded-xl border border-slate-200/90 bg-white shadow-[0_6px_20px_rgba(0,0,0,0.05)] space-y-2 select-none"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#0055FF] text-white flex items-center justify-center text-[9px] font-normal shadow-2xs">
                    ✓
                  </div>
                  <span className="text-xs font-normal text-[#0A0D14] tracking-tight">
                    {card.title}
                  </span>
                </div>
                <span className={`text-[9px] font-normal px-2 py-0.5 rounded-full border ${card.badgeStyle}`}>
                  {card.badge}
                </span>
              </div>

              <p className="text-xs text-slate-700 font-normal leading-snug">
                {card.text}
              </p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-normal">
                <span>{card.subtext}</span>
                <span className="text-[#0055FF] font-normal">Active Sync</span>
              </div>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
}

function useAnimatedCounter(targetValue: number, startTrigger: boolean, durationMs = 900) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startTrigger) {
      setCount(0);
      return;
    }

    let startTime: number | null = null;
    let animFrame: number;

    const updateCounter = (now: number) => {
      if (!startTime) startTime = now;
      const progress = Math.min(1, (now - startTime) / durationMs);
      // Sleek easeOutExpo curve for smooth fast counter roll
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(eased * targetValue));

      if (progress < 1) {
        animFrame = requestAnimationFrame(updateCounter);
      }
    };

    animFrame = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animFrame);
  }, [startTrigger, targetValue, durationMs]);

  return count;
}

function LivePaymentsConveyorAnimation() {
  const [activeScene, setActiveScene] = useState<
    'payment1' | 'consultation1' | 'toggle' | 'payment2' | 'consultation2'
  >('payment1');
  const [toggleOn, setToggleOn] = useState(false);
  const [priceMorphedInCard, setPriceMorphedInCard] = useState(false);

  // Animated counter hooks for nominal field and final consultation cards
  const isPaymentScene = activeScene === 'payment1' || activeScene === 'payment2';
  const paymentCounter = useAnimatedCounter(100, isPaymentScene, 850);
  const consult1Counter = useAnimatedCounter(100, activeScene === 'consultation1', 850);
  const consult2Counter = useAnimatedCounter(100, priceMorphedInCard, 850);

  useEffect(() => {
    let active = true;
    let timers: NodeJS.Timeout[] = [];

    const runMasterTimeline = () => {
      if (!active) return;

      // Reset initial state
      setActiveScene('payment1');
      setToggleOn(false);
      setPriceMorphedInCard(false);

      // 2.0s: Transition 1 -> Consultation card WITH price
      timers.push(setTimeout(() => {
        if (active) setActiveScene('consultation1');
      }, 2000));

      // 4.0s: Transition 2 -> Toggle card ("Require payment to book")
      timers.push(setTimeout(() => {
        if (active) setActiveScene('toggle');
      }, 4000));

      // 5.2s: Toggle knob slides OFF -> ON
      timers.push(setTimeout(() => {
        if (active) setToggleOn(true);
      }, 5200));

      // 6.0s: Transition 3 -> Payment Settings Card (Filled)
      timers.push(setTimeout(() => {
        if (active) setActiveScene('payment2');
      }, 6000));

      // 7.8s: Transition 4 -> Consultation card in SIMPLE state (without price)
      timers.push(setTimeout(() => {
        if (active) {
          setActiveScene('consultation2');
          setPriceMorphedInCard(false);
        }
      }, 7800));

      // 9.2s: Internal DOM content morph ($100 counter appears inside SAME card)
      timers.push(setTimeout(() => {
        if (active) setPriceMorphedInCard(true);
      }, 9200));

      // 11.2s: Master timeline loop restart
      timers.push(setTimeout(() => {
        if (active) runMasterTimeline();
      }, 11200));
    };

    runMasterTimeline();

    return () => {
      active = false;
      timers.forEach((t) => clearTimeout(t));
    };
  }, []);

  return (
    <div className="w-full max-w-[390px] h-[380px] bg-[#FAFBFD] border border-slate-200/90 rounded-3xl relative overflow-hidden select-none font-sans shadow-[0_16px_36px_rgba(0,0,0,0.04)]">
      {/* Sleek neutral grid pattern with looping pulse animation */}
      <div 
        className="absolute inset-0 opacity-15 bg-[radial-gradient(#0055FF_1.2px,transparent_1.2px)] [background-size:16px_16px] pointer-events-none animate-dot-pulse-dark"
        style={{
          maskImage: 'linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0) 85%)',
          WebkitMaskImage: 'linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0) 85%)'
        }}
      />

      {/* Top Header Status Bar */}
      <div className="absolute top-4 inset-x-5 flex items-center justify-between pb-3 border-b border-slate-200/60 z-20">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-normal text-[#0A0D14] tracking-tight">Payments & Upfront Billing</span>
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        {/* SCENE 1 & SCENE 4: PAYMENT SETTINGS CARD WITH NOMINAL INPUT & COUNTER */}
        {isPaymentScene && (
          <motion.div
            key={`payment-${activeScene}`}
            initial={{ y: 60, opacity: 0, scale: 0.94, filter: 'blur(6px)' }}
            animate={{ y: 0, opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ y: -60, opacity: 0, scale: 0.94, filter: 'blur(6px)' }}
            transition={{
              type: 'spring',
              stiffness: 340,
              damping: 26,
              mass: 0.75
            }}
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[320px] bg-white rounded-2xl p-5 border border-slate-200/90 shadow-[0_16px_36px_rgba(0,0,0,0.06)] text-left z-10"
          >
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-normal text-slate-500 block mb-1.5">
                  Amount to collect
                </span>

                {/* Nominal Input Box with Typing Cursor + Animated Counter */}
                <div className="flex items-center gap-1.5 bg-slate-50 px-3.5 py-2.5 rounded-xl border border-blue-400/80 shadow-[0_0_12px_rgba(0,85,255,0.12)] ring-2 ring-blue-500/20 text-xs font-normal text-slate-900 transition-all duration-300">
                  <span className="text-slate-400 font-normal">$</span>
                  <span className="text-slate-900 font-normal text-base tabular-nums tracking-tight">
                    {paymentCounter}
                  </span>
                  {paymentCounter < 100 && (
                    <span className="w-0.5 h-4 bg-[#0055FF] animate-pulse inline-block -ml-0.5" />
                  )}
                  {paymentCounter === 100 && (
                    <motion.span
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-[10px] font-normal text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-200/80 ml-1.5"
                    >
                      ✓ Saved
                    </motion.span>
                  )}
                  <span className="text-[10px] font-normal text-slate-400 ml-auto">USD ▼</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <span className="text-[11px] font-normal text-slate-500">
                  Payment processor
                </span>
                <span className="text-xs font-normal text-slate-900 bg-slate-100/80 px-2.5 py-1 rounded-lg border border-slate-200/80 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Stripe
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* SCENE 2: CONSULTATION CARD WITH PRICE COUNTER */}
        {activeScene === 'consultation1' && (
          <motion.div
            key="consultation-1"
            initial={{ y: 60, opacity: 0, scale: 0.94, filter: 'blur(6px)' }}
            animate={{ y: 0, opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ y: -60, opacity: 0, scale: 0.94, filter: 'blur(6px)' }}
            transition={{
              type: 'spring',
              stiffness: 340,
              damping: 26,
              mass: 0.75
            }}
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[320px] bg-white rounded-2xl p-5 border border-slate-200/90 shadow-[0_16px_36px_rgba(0,0,0,0.06)] text-center z-10"
          >
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-[#0A0D14] text-white font-normal text-xs flex items-center justify-center mb-2 shadow-xs">
                D
              </div>
              <p className="text-xs font-normal text-slate-700">Dominic Mills</p>
              <h4 className="text-sm font-normal text-[#0A0D14] mt-0.5">Consultation</h4>

              {/* Solid Blue Focal Card with Bouncy Spring Finish & White Text */}
              <motion.div
                animate={{
                  scale: consult1Counter === 100 ? [0.94, 1.08, 0.97, 1] : 1
                }}
                transition={{
                  type: 'spring',
                  stiffness: 450,
                  damping: 18
                }}
                className="my-3 py-2.5 px-6 rounded-2xl bg-[#0055FF] border border-blue-600/50 shadow-lg shadow-blue-500/25 inline-block text-center relative overflow-hidden group"
              >
                {/* Faded Diagonal Dot Pattern Overlay with Looping Animation */}
                <div 
                  className="absolute inset-0 opacity-25 bg-[radial-gradient(#FFFFFF_1.2px,transparent_1.2px)] [background-size:14px_14px] pointer-events-none animate-dot-pulse-light group-hover:opacity-40 transition-opacity duration-500"
                  style={{
                    maskImage: 'linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0) 85%)',
                    WebkitMaskImage: 'linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0) 85%)'
                  }}
                />

                <div className="flex items-center justify-center relative z-10">
                  <span className="text-3xl font-normal text-white tracking-tight tabular-nums">
                    ${consult1Counter}
                  </span>
                </div>
                <p className="text-[10px] font-normal text-blue-100/90 mt-0.5 relative z-10">
                  Powered by Stripe
                </p>
              </motion.div>

              <div className="flex items-center gap-2 text-[11px] font-normal text-slate-500 pt-2 border-t border-slate-100 w-full justify-center">
                <span>45 min</span>
                <span>•</span>
                <span className="text-[#0055FF] font-normal">Zoom</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* SCENE 3: REQUIRE PAYMENT TO BOOK TOGGLE CARD */}
        {activeScene === 'toggle' && (
          <motion.div
            key="toggle-card"
            initial={{ y: 60, opacity: 0, scale: 0.94, filter: 'blur(6px)' }}
            animate={{ y: 0, opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ y: -60, opacity: 0, scale: 0.94, filter: 'blur(6px)' }}
            transition={{
              type: 'spring',
              stiffness: 340,
              damping: 26,
              mass: 0.75
            }}
            className={`absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[320px] bg-white rounded-2xl p-4.5 border transition-all duration-300 z-10 flex flex-col gap-3 ${
              toggleOn ? 'border-blue-300 shadow-[0_16px_36px_rgba(0,85,255,0.12)]' : 'border-slate-200/90 shadow-[0_16px_36px_rgba(0,0,0,0.06)]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-normal text-[#0A0D14]">Require payment to book</span>
              <button
                type="button"
                onClick={() => setToggleOn((prev) => !prev)}
                className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 flex items-center cursor-pointer active:scale-[0.94] ${
                  toggleOn ? 'bg-[#0055FF] shadow-sm shadow-blue-500/30' : 'bg-slate-200'
                }`}
              >
                <motion.div
                  animate={{ x: toggleOn ? 20 : 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 450,
                    damping: 26
                  }}
                  className="w-5 h-5 rounded-full bg-white shadow-sm flex items-center justify-center text-[10px]"
                />
              </button>
            </div>

            <AnimatePresence>
              {toggleOn && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -4 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]"
                >
                  <span className="font-normal text-emerald-600 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Payment Guard Active
                  </span>
                  <span className="text-slate-400 font-mono text-[10px]">$100 USD</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* SCENE 5: CONSULTATION CARD WITH DOM MORPHING & COUNTER */}
        {activeScene === 'consultation2' && (
          <motion.div
            key="consultation-2"
            layout
            initial={{ y: 60, opacity: 0, scale: 0.94, filter: 'blur(6px)' }}
            animate={{ y: 0, opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ y: -60, opacity: 0, scale: 0.94, filter: 'blur(6px)' }}
            transition={{
              type: 'spring',
              stiffness: 340,
              damping: 26,
              mass: 0.75
            }}
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[320px] bg-white rounded-2xl p-5 border border-slate-200/90 shadow-[0_16px_36px_rgba(0,0,0,0.06)] text-center z-10"
          >
            <motion.div layout className="flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-[#0A0D14] text-white font-normal text-xs flex items-center justify-center mb-2 shadow-xs">
                D
              </div>
              <motion.p layout className="text-xs font-normal text-slate-700">
                Dominic Mills
              </motion.p>
              <motion.h4 layout className="text-sm font-normal text-[#0A0D14] mt-0.5">
                Consultation
              </motion.h4>

              {/* $0 -> $100 Morphing Counter Focal Point with Bouncy Spring Finish */}
              <AnimatePresence>
                {priceMorphedInCard && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.92, filter: 'blur(4px)' }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      filter: 'blur(0px)',
                      scale: consult2Counter === 100 ? [0.94, 1.08, 0.97, 1] : 1
                    }}
                    exit={{ opacity: 0, y: 8, scale: 0.92, filter: 'blur(4px)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 25 }}
                    className="my-3 py-2.5 px-6 rounded-2xl bg-[#0055FF] border border-blue-600/50 shadow-lg shadow-blue-500/25 inline-block text-center relative overflow-hidden"
                  >
                    <div className="flex items-center justify-center">
                      <span className="text-3xl font-normal text-white tracking-tight tabular-nums">
                        ${consult2Counter}
                      </span>
                    </div>
                    <p className="text-[10px] font-normal text-blue-100/90 mt-0.5">
                      Powered by Stripe
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div layout className="flex items-center gap-2 text-[11px] font-normal text-slate-500 pt-2 border-t border-slate-100 w-full justify-center mt-2">
                <span>45 min</span>
                <span>•</span>
                <span className="text-[#0055FF] font-normal">Zoom</span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
