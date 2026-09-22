import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Lock } from 'lucide-react';

interface ProductStage {
  id: 'scheduling' | 'velie' | 'notetaker' | 'payments';
  label: string;
  icon3d: string;
  svgPath: string;
}

const PRODUCT_STAGES: ProductStage[] = [
  {
    id: 'scheduling',
    label: 'Scheduling',
    icon3d: '/icon-scheduling-3d.png',
    svgPath: "M64 12C75.283 12 82 23.0983 82 34.3813V77.6175C82 88.9007 75.2832 100 64 100C39.6995 100 20 80.3005 20 56C20 31.6995 39.6995 12 64 12Z"
  },
  {
    id: 'velie',
    label: 'Velie AI',
    icon3d: '/icon-velie-3d.png',
    svgPath: "M44 12H58C71.255 12 82 22.745 82 36V76C82 89.255 71.255 100 58 100H44C30.745 100 20 89.255 20 76V36C20 22.745 30.745 12 44 12Z"
  },
  {
    id: 'notetaker',
    label: 'Notetaker',
    icon3d: '/icon-notetaker-3d.png',
    svgPath: "M44 12H58C71.255 12 82 22.745 82 36V76C82 89.255 71.255 100 58 100H44C30.745 100 20 89.255 20 76V36C20 22.745 30.745 12 44 12Z"
  },
  {
    id: 'payments',
    label: 'Payments',
    icon3d: '/icon-payments-3d.png',
    svgPath: "M38 12C26.717 12 20 23.0983 20 34.3813V77.6175C20 88.9007 26.7168 100 38 100C62.3005 100 82 80.3005 82 56C82 31.6995 62.3005 12 38 12Z"
  }
];

export default function MinimalistMotionStage() {
  const [activeTab, setActiveTab] = useState<ProductStage['id']>('velie');
  const [subProgress, setSubProgress] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const animFrame = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());

  // Continuous smooth timer for active scene internal micro-progress
  useEffect(() => {
    const loop = (now: number) => {
      const delta = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      if (!isHovered) {
        setSubProgress((prev) => {
          const next = prev + delta * 0.22; // ~4.5s cycle per stage
          if (next >= 1) {
            // Advance to next tab
            setActiveTab((curr) => {
              const idx = PRODUCT_STAGES.findIndex((s) => s.id === curr);
              const nextIdx = (idx + 1) % PRODUCT_STAGES.length;
              return PRODUCT_STAGES[nextIdx].id;
            });
            return 0;
          }
          return next;
        });
      }

      animFrame.current = requestAnimationFrame(loop);
    };

    lastTimeRef.current = performance.now();
    animFrame.current = requestAnimationFrame(loop);

    return () => {
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, [isHovered]);

  const handleTabClick = (id: ProductStage['id']) => {
    setActiveTab(id);
    setSubProgress(0);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full h-full relative rounded-[32px] sm:rounded-[36px] bg-[#1E60F2] bg-[url('/hero-fluid-wave-bg.png')] bg-cover bg-center overflow-hidden shadow-2xl flex flex-col items-center justify-center p-6 sm:p-10 pt-8 sm:pt-10 select-none min-h-[660px]"
    >
      {/* Subtle Ambient Vignette / Glass Depth */}
      <div className="absolute inset-0 bg-blue-600/5 mix-blend-overlay pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-[460px] mx-auto flex flex-col items-center">
        
        {/* Top Floating Product Pill Bar Dock with Organic Fillet Notch (Matched to Reference) */}
        <div className="flex flex-col items-center relative z-20 -mb-[2px]">
          
          {/* Pill Dock Bar */}
          <div className="inline-flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-full bg-white/95 backdrop-blur-xl shadow-[0_16px_40px_rgba(0,35,102,0.12),0_2px_8px_rgba(0,0,0,0.04)] border border-slate-100/90 relative z-20">
            {PRODUCT_STAGES.map((item) => {
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleTabClick(item.id)}
                  className="relative w-[62px] sm:w-[68px] h-[82px] sm:h-[88px] flex items-center justify-center transition-transform duration-150 cursor-pointer active:scale-[0.96] group select-none"
                  title={item.label}
                >
                  {/* Figma Vector Active Pill Shape */}
                  {active && (
                    <motion.div
                      layoutId="deckActiveTabTimbul"
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
                        <path d={item.svgPath} fill="white" />
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
        <div className="bg-white rounded-[28px] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,35,102,0.08),0_4px_12px_rgba(0,0,0,0.03)] border border-slate-100/80 flex flex-col items-center justify-between text-center relative z-10 overflow-hidden w-full min-h-[480px]">
          <AnimatePresence mode="wait" initial={false}>
            
            {/* ========================================================= */}
            {/* SCENE 01: SCHEDULING                                      */}
            {/* ========================================================= */}
            {activeTab === 'scheduling' && (
              <motion.div
                key="stage-scheduling"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                className="w-full h-full flex flex-col items-center justify-between gap-4"
              >
                {subProgress < 0.65 ? (
                  <div className="w-full flex flex-col items-center justify-between gap-3 flex-1 py-1">
                    <div className="w-full bg-[#FAFBFD] rounded-2xl p-3 border border-slate-100 relative z-10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-normal text-slate-800">October 2024</span>
                        <span className="text-[10px] font-normal text-[#0055FF]">
                          {subProgress >= 0.25 ? 'Thu · Oct 14 ✓' : 'Select a date'}
                        </span>
                      </div>

                      <div className="grid grid-cols-7 gap-1 text-[10px] font-normal text-slate-400 text-center mb-1">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                          <span key={i}>{d}</span>
                        ))}
                      </div>

                      <div className="grid grid-cols-7 gap-1 text-xs text-center font-normal text-slate-700 items-center">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((d) => (
                          <span key={d} className="py-1 text-slate-400 opacity-40 inline-block">
                            {d}
                          </span>
                        ))}

                        <div className="flex items-center justify-center relative">
                          <motion.span
                            animate={{
                              scale: subProgress >= 0.25 ? [1, 1.25, 1.1] : 1,
                              backgroundColor: subProgress >= 0.25 ? '#0055FF' : '#FFFFFF',
                              color: subProgress >= 0.25 ? '#FFFFFF' : '#0F172A'
                            }}
                            transition={{ type: 'spring', stiffness: 450, damping: 20 }}
                            className="w-7 h-7 rounded-full flex items-center justify-center font-normal text-xs shadow-xs"
                          >
                            14
                          </motion.span>
                        </div>

                        {[15, 16, 17, 18, 19, 20, 21].map((d) => (
                          <span key={d} className="py-1 text-slate-400 opacity-40 inline-block">
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="w-full bg-[#F4F8FF] rounded-xl py-2 px-4 flex items-center justify-between text-xs font-normal text-[#0055FF] border border-blue-100/60">
                      <span>Selected Slot</span>
                      <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-lg border border-slate-200/90 shadow-2xs">
                        <span>2:00 PM</span>
                        <span className="text-[10px]">▼</span>
                      </div>
                    </div>

                    <img src="/icon-scheduling-3d.png" alt="Scheduling" className="w-20 h-20 object-contain my-1" />

                    <button
                      type="button"
                      onClick={() => setSubProgress(0.66)}
                      className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#418AC1] to-[#506DFD] hover:brightness-105 text-white font-normal text-sm flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(0,85,255,0.25)] hover:shadow-blue-500/20 active:scale-[0.96] transition-all duration-150"
                    >
                      <span>Book Now</span>
                      <span>→</span>
                    </button>
                  </div>
                ) : (
                  <div className="w-full flex flex-col items-center justify-between gap-4 flex-1 py-2">
                    <motion.div
                      initial={{ scale: 0.5 }}
                      animate={{ scale: [0.5, 1.15, 1] }}
                      className="w-12 h-12 rounded-full bg-[#ECFDF5] text-[#10B981] flex items-center justify-center border border-[#A7F3D0]/60 shadow-2xs"
                    >
                      <Check className="w-6 h-6 stroke-[2.5]" />
                    </motion.div>

                    <div>
                      <h3 className="text-2xl font-normal text-[#0F172A] tracking-tight">
                        Meeting scheduled
                      </h3>
                      <p className="text-xs text-[#64748B] mt-1 font-normal">
                        Thu, Oct 14 · 2:00 PM
                      </p>
                    </div>

                    <div className="w-full bg-[#F0FDF4] border border-[#DCFCE7] rounded-2xl p-3.5 flex items-center justify-between text-left shadow-2xs">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center p-1.5 shadow-2xs">
                          <img src="/icon-scheduling-3d.png" alt="Google Calendar" className="w-7 h-7 object-contain" />
                        </div>
                        <div>
                          <span className="text-xs sm:text-sm font-normal text-[#0F172A] block leading-tight">
                            Google Calendar
                          </span>
                          <span className="text-[11px] text-[#64748B] font-normal">
                            Invite sent ✓
                          </span>
                        </div>
                      </div>
                      <span className="w-6 h-6 rounded-full bg-[#16A34A] text-white flex items-center justify-center text-xs font-normal shadow-2xs">
                        ✓
                      </span>
                    </div>

                    <img src="/icon-scheduling-3d.png" alt="Scheduling" className="w-20 h-20 object-contain my-1" />
                  </div>
                )}
              </motion.div>
            )}

            {/* ========================================================= */}
            {/* SCENE 02: VELIE AI COPILOT (WITH SEGMENTED PROGRESS FILL) */}
            {/* ========================================================= */}
            {activeTab === 'velie' && (
              <motion.div
                key="stage-velie"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                className="w-full h-full flex flex-col items-center justify-between gap-4"
              >
                {subProgress < 0.70 ? (
                  <div className="w-full flex flex-col items-center justify-between gap-3 flex-1 py-1 text-center">
                    {/* Top 3D Icon with Subtle Sonar Aura */}
                    <div className="relative w-14 h-14 flex items-center justify-center mx-auto mt-1">
                      <motion.div
                        animate={{ scale: [0.8, 1.4], opacity: [0.5, 0] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                        className="absolute inset-0 rounded-full border border-[#0055FF]/30 pointer-events-none"
                      />
                      <img src="/icon-velie-3d.png" alt="Velie AI" className="w-12 h-12 object-contain relative z-10" />
                    </div>

                    <div>
                      <h3 className="text-2xl font-normal text-[#0F172A] tracking-tight">
                        AI Processing
                      </h3>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF6FF] text-[#0055FF] text-xs font-normal mt-2 shadow-2xs">
                        <span className="w-2 h-2 rounded-full bg-[#0055FF] animate-pulse" />
                        <span>Analyzing and organizing...</span>
                      </div>
                      <p className="text-xs text-[#64748B] mt-2 font-normal">
                        Turning your conversation into useful insights.
                      </p>
                    </div>

                    {/* ========================================================= */}
                    {/* USER REFERENCE IMAGE 3: SEGMENTED PROGRESS BAR CONTAINER  */}
                    {/* ========================================================= */}
                    <div className="w-full py-2">
                      <div className="relative w-full max-w-[320px] mx-auto h-11 rounded-full bg-[#F1F5F9] border border-slate-200/90 overflow-hidden shadow-inner flex items-center">
                        {/* Background Base Text Layer */}
                        <div className="absolute inset-0 flex items-center text-xs sm:text-sm font-normal text-slate-700 select-none">
                          <div className="flex-1 text-center py-1">Notes</div>
                          <div className="w-px h-4.5 bg-slate-300/80" />
                          <div className="flex-1 text-center py-1">Tasks</div>
                          <div className="w-px h-4.5 bg-slate-300/80" />
                          <div className="flex-1 text-center py-1">Follow-up</div>
                        </div>

                        {/* Animated Blue Progress Bar Fill with Pixel-Perfect Text Inversion */}
                        <div
                          className="absolute inset-y-0 left-0 bg-[#0055FF] overflow-hidden rounded-full transition-[width] duration-150 ease-out pointer-events-none"
                          style={{
                            width: `${Math.min(100, Math.max(0, (subProgress / 0.65) * 100))}%`
                          }}
                        >
                          <div className="w-[320px] h-full flex items-center text-xs sm:text-sm font-normal text-white select-none">
                            <div className="flex-1 text-center py-1">Notes</div>
                            <div className="w-px h-4.5 bg-white/40" />
                            <div className="flex-1 text-center py-1">Tasks</div>
                            <div className="w-px h-4.5 bg-white/40" />
                            <div className="flex-1 text-center py-1">Follow-up</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] font-normal text-[#94A3B8]">
                      This may take a few moments.
                    </p>
                  </div>
                ) : (
                  <div className="w-full flex flex-col items-center justify-between gap-4 flex-1 py-2">
                    <motion.div
                      initial={{ scale: 0.5 }}
                      animate={{ scale: [0.5, 1.15, 1] }}
                      className="w-12 h-12 rounded-full bg-[#ECFDF5] text-[#10B981] flex items-center justify-center border border-[#A7F3D0]/60 shadow-2xs"
                    >
                      <Check className="w-6 h-6 stroke-[2.5]" />
                    </motion.div>

                    <div>
                      <h3 className="text-2xl font-normal text-[#0F172A] tracking-tight">
                        Tasks Complete
                      </h3>
                      <p className="text-xs text-[#64748B] mt-1 font-normal">
                        All steps finished automatically.
                      </p>
                    </div>

                    <div className="w-full space-y-2 text-xs text-left">
                      {[
                        { title: 'Generating meeting notes' },
                        { title: 'Identifying action items' },
                        { title: 'Preparing follow-up email' }
                      ].map((item, idx) => (
                        <motion.div
                          key={item.title}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: idx * 0.05 }}
                          className="p-3 rounded-2xl flex items-center justify-between bg-[#F0FDF4] border border-[#DCFCE7] text-[#0F172A] shadow-2xs"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] bg-[#16A34A] text-white shadow-2xs">
                              ✓
                            </span>
                            <span className="text-xs font-normal">{item.title}</span>
                          </div>
                          <span className="text-[11px] text-[#94A3B8] font-normal">Done</span>
                        </motion.div>
                      ))}
                    </div>

                    <img src="/icon-velie-3d.png" alt="Velie AI" className="w-16 h-16 object-contain my-1" />
                  </div>
                )}
              </motion.div>
            )}

            {/* ========================================================= */}
            {/* SCENE 03: INSTANT RECAPS                                  */}
            {/* ========================================================= */}
            {activeTab === 'notetaker' && (
              <motion.div
                key="stage-notetaker"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                className="w-full h-full flex flex-col items-center justify-between gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-[#ECFDF5] text-[#10B981] flex items-center justify-center border border-[#A7F3D0]/60 shadow-2xs">
                  <Check className="w-6 h-6 stroke-[2.5]" />
                </div>

                <div>
                  <h3 className="text-2xl font-normal text-[#0F172A] tracking-tight">
                    Recaps ready
                  </h3>
                  <p className="text-xs text-[#64748B] mt-1 font-normal max-w-[280px] mx-auto">
                    Your meeting has been transcribed and action items have been synced.
                  </p>
                </div>

                <div className="w-full bg-[#F8FAFC] border border-[#F1F5F9] rounded-2xl p-3 flex items-center justify-between gap-3 shadow-2xs">
                  <div className="w-8 h-8 rounded-full bg-[#EDF2F7] text-[#0F172A] flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 translate-x-0.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>

                  <div className="flex items-center gap-1 flex-1 justify-center h-6">
                    {[4, 8, 12, 18, 24, 14, 20, 10, 16, 22, 12, 18, 10, 6, 4].map((h, i) => (
                      <motion.span
                        key={i}
                        animate={{ height: [4, h, 4] }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                          repeatType: 'reverse',
                          delay: i * 0.04,
                          ease: 'easeInOut'
                        }}
                        className="w-1 rounded-full bg-[#94A3B8] inline-block"
                      />
                    ))}
                  </div>

                  <span className="text-xs font-normal text-[#64748B] shrink-0">02:45</span>
                </div>

                <div className="w-full space-y-2 text-xs text-left">
                  {[
                    { title: 'Push final API schemas', status: 'Synced' },
                    { title: 'Sync summary to Notion & Slack', status: 'Synced' }
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="p-3 rounded-2xl flex items-center justify-between bg-[#F0FDF4] border border-[#DCFCE7] text-[#0F172A] shadow-2xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] bg-[#16A34A] text-white shadow-2xs">
                          ✓
                        </span>
                        <span className="text-xs font-normal">{item.title}</span>
                      </div>
                      <span className="text-[11px] text-[#94A3B8] font-normal">{item.status}</span>
                    </div>
                  ))}
                </div>

                <img src="/icon-notetaker-3d.png" alt="Notetaker" className="w-16 h-16 object-contain my-1" />
              </motion.div>
            )}

            {/* ========================================================= */}
            {/* SCENE 04: PAYMENTS (MATCHED TO REFERENCE IMAGE 1)         */}
            {/* ========================================================= */}
            {activeTab === 'payments' && (
              <motion.div
                key="stage-payments"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                className="w-full h-full flex flex-col items-center justify-between gap-4"
              >
                {subProgress < 0.40 ? (
                  <div className="w-full flex flex-col items-center justify-between gap-3 flex-1 py-1 text-center">
                    <div>
                      <h3 className="text-2xl font-normal text-[#0F172A] tracking-tight">
                        Meeting payment
                      </h3>
                      <p className="text-xs text-[#64748B] mt-1 font-normal">
                        Secure and powered by Stripe.
                      </p>
                    </div>

                    <div className="w-full bg-[#F8FAFC] border border-[#F1F5F9] rounded-2xl p-3 flex items-center justify-between text-left shadow-2xs">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-[#EFF6FF] flex items-center justify-center p-1.5 shrink-0">
                          <img src="/icon-scheduling-3d.png" alt="Strategy Call" className="w-6 h-6 object-contain" />
                        </div>
                        <div>
                          <span className="text-xs sm:text-sm font-normal text-[#0F172A] block leading-tight">
                            Strategy Call
                          </span>
                          <span className="text-[11px] text-[#64748B] font-normal">
                            Thu, Oct 14 · 1 hour
                          </span>
                        </div>
                      </div>
                      <span className="text-slate-400 text-sm">›</span>
                    </div>

                    <div className="w-full bg-white rounded-2xl p-3 border border-[#E2E8F0]/80 shadow-2xs text-center">
                      <span className="text-[10px] font-normal text-[#94A3B8] uppercase tracking-wider block">
                        AMOUNT
                      </span>
                      <span className="text-3xl font-normal text-[#0F172A] tracking-tight block my-0.5">
                        $360.00
                      </span>
                    </div>

                    <div className="w-full bg-[#F8FAFC] rounded-2xl p-2.5 border border-[#F1F5F9] flex items-center justify-between text-xs shadow-2xs">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-[#635BFF] text-white flex items-center justify-center text-xs font-normal shadow-2xs">
                          S
                        </div>
                        <div className="text-left">
                          <span className="block font-normal text-[#0F172A] leading-tight text-xs">Powered by Stripe</span>
                          <span className="text-[10px] text-[#64748B] font-normal">Secure payment processing</span>
                        </div>
                      </div>
                      <div className="px-2.5 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0]/60 text-[#059669] text-[11px] font-normal flex items-center gap-1">
                        <Lock className="w-3 h-3 stroke-[2.5]" />
                        <span>Secure</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSubProgress(0.45)}
                      className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#418AC1] to-[#506DFD] hover:brightness-105 text-white font-normal text-sm flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(0,85,255,0.25)] hover:shadow-blue-500/20 active:scale-[0.96] transition-all duration-150"
                    >
                      <span>Pay $360.00</span>
                      <span>→</span>
                    </button>
                  </div>
                ) : (
                  /* ========================================================= */
                  /* USER REFERENCE IMAGE 1: PAYMENT COMPLETE CLEAN CARD       */
                  /* ========================================================= */
                  <div className="w-full flex flex-col items-center justify-between flex-1 py-4 text-center">
                    <div className="my-auto flex flex-col items-center">
                      <h3 className="text-2xl sm:text-[28px] font-normal text-[#0A0D14] tracking-tight">
                        Payment complete
                      </h3>
                      <span className="text-3xl sm:text-4xl font-normal text-[#0A0D14] tracking-tight block mt-2">
                        $360.00
                      </span>
                    </div>

                    {/* Exact Replicating User Image 1 Bottom Tile */}
                    <div className="w-full bg-white rounded-2xl p-4 border border-slate-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.03)] flex items-center justify-between text-left">
                      <div>
                        <span className="block text-sm font-normal text-slate-900 leading-tight">
                          Invoice sent
                        </span>
                        <span className="text-xs text-slate-500 font-normal mt-1 block">
                          To your email
                        </span>
                      </div>

                      <div className="px-3.5 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0]/80 text-[#059669] text-xs font-normal flex items-center gap-1.5 shadow-2xs">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Paid</span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
