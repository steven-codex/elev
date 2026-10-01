import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Check,
  Lock,
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
  ChevronDown,
  Clock,
  Calendar as CalendarIcon,
  FileText,
  CheckCircle2,
  User
} from 'lucide-react';

const TIME_SLOTS = [
  { time: '10:00 AM', label: 'Morning slot' },
  { time: '2:00 PM', label: 'Recommended' },
  { time: '4:30 PM', label: 'Afternoon slot' }
];

interface ProductStage {
  id: 'scheduling' | 'velie' | 'notetaker' | 'payments';
  label: string;
  badge: string;
  duration: number; // in seconds
  icon3d: string;
  svgPath: string;
}

interface PaymentDriftTile {
  id: string;
  type: 'avatar' | 'empty';
  avatar?: string;
  opacity?: number;
}

const PAYMENT_LEFT_ROW_1: PaymentDriftTile[] = [
  { id: 'pl1-1', type: 'avatar', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80' },
  { id: 'pl1-2', type: 'empty', opacity: 0.35 }
];

const PAYMENT_LEFT_ROW_2: PaymentDriftTile[] = [
  { id: 'pl2-1', type: 'empty', opacity: 0.25 },
  { id: 'pl2-2', type: 'avatar', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80' }
];

const PAYMENT_LEFT_ROW_3: PaymentDriftTile[] = [
  { id: 'pl3-1', type: 'avatar', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80' },
  { id: 'pl3-2', type: 'empty', opacity: 0.35 }
];

const PAYMENT_RIGHT_ROW_1: PaymentDriftTile[] = [
  { id: 'pr1-1', type: 'empty', opacity: 0.35 },
  { id: 'pr1-2', type: 'avatar', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80' }
];

const PAYMENT_RIGHT_ROW_2: PaymentDriftTile[] = [
  { id: 'pr2-1', type: 'avatar', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&auto=format&fit=crop&q=80' },
  { id: 'pr2-2', type: 'empty', opacity: 0.25 }
];

const PAYMENT_RIGHT_ROW_3: PaymentDriftTile[] = [
  { id: 'pr3-1', type: 'empty', opacity: 0.35 },
  { id: 'pr3-2', type: 'avatar', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&auto=format&fit=crop&q=80' }
];

const PRODUCT_STAGES: ProductStage[] = [
  {
    id: 'scheduling',
    label: 'Smart Booking',
    badge: '01 Booking',
    duration: 4.0,
    icon3d: '/icon-scheduling-3d.png',
    svgPath: "M64 12C75.283 12 82 23.0983 82 34.3813V77.6175C82 88.9007 75.2832 100 64 100C39.6995 100 20 80.3005 20 56C20 31.6995 39.6995 12 64 12Z"
  },
  {
    id: 'velie',
    label: 'AI Processing',
    badge: '02 AI Processing',
    duration: 4.5,
    icon3d: '/icon-velie-3d.png',
    svgPath: "M44 12H58C71.255 12 82 22.745 82 36V76C82 89.255 71.255 100 58 100H44C30.745 100 20 89.255 20 76V36C20 22.745 30.745 12 44 12Z"
  },
  {
    id: 'notetaker',
    label: 'Instant Recaps',
    badge: '03 Recaps',
    duration: 4.0,
    icon3d: '/icon-notetaker-3d.png',
    svgPath: "M44 12H58C71.255 12 82 22.745 82 36V76C82 89.255 71.255 100 58 100H44C30.745 100 20 89.255 20 76V36C20 22.745 30.745 12 44 12Z"
  },
  {
    id: 'payments',
    label: 'Upfront Pay',
    badge: '04 Pay',
    duration: 4.0,
    icon3d: '/icon-payments-3d.png',
    svgPath: "M38 12C26.717 12 20 23.0983 20 34.3813V77.6175C20 88.9007 26.7168 100 38 100C62.3005 100 82 80.3005 82 56C82 31.6995 62.3005 12 38 12Z"
  }
];

const TOTAL_DURATION = PRODUCT_STAGES.reduce((acc, s) => acc + s.duration, 0); // 16.5s

// Precise time mapping across all stages
const getStageFromTime = (time: number) => {
  let accum = 0;
  for (let i = 0; i < PRODUCT_STAGES.length; i++) {
    const stage = PRODUCT_STAGES[i];
    if (time < accum + stage.duration || i === PRODUCT_STAGES.length - 1) {
      const stageProgress = Math.max(0, Math.min(1, (time - accum) / stage.duration));
      return {
        stageId: stage.id,
        stageIndex: i,
        stageProgress,
        stageStartTime: accum,
        stageDuration: stage.duration
      };
    }
    accum += stage.duration;
  }
  return {
    stageId: PRODUCT_STAGES[0].id,
    stageIndex: 0,
    stageProgress: 0,
    stageStartTime: 0,
    stageDuration: PRODUCT_STAGES[0].duration
  };
};

const getStartTimeForStage = (id: ProductStage['id']) => {
  let accum = 0;
  for (const stage of PRODUCT_STAGES) {
    if (stage.id === id) return accum;
    accum += stage.duration;
  }
  return 0;
};

export default function MinimalistMotionStage() {
  // Start at 0.0s (Smart Booking) so user sees the booking flow right away
  const [currentTime, setCurrentTime] = useState<number>(0.0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(1);
  const [isLooping, setIsLooping] = useState<boolean>(true);
  const [isAudioSnippetPlaying, setIsAudioSnippetPlaying] = useState<boolean>(true);

  // Scene 01 Interactive overrides
  const [selectedDate, setSelectedDate] = useState<number>(14);
  const [selectedTime, setSelectedTime] = useState<string>('2:00 PM');
  const [manualDateSelected, setManualDateSelected] = useState<boolean | null>(null);
  const [manualDropdownOpen, setManualDropdownOpen] = useState<boolean | null>(null);
  const [manualBooked, setManualBooked] = useState<boolean>(false);
  const [manualPaid, setManualPaid] = useState<boolean>(false);

  const animFrame = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());

  // Derive active tab and subProgress directly from current timeline time
  const { stageId: activeTab, stageIndex, stageProgress: subProgress } = getStageFromTime(currentTime);

  // High-precision smooth animation loop with playback speed and pause support
  useEffect(() => {
    const loop = (now: number) => {
      const delta = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      if (isPlaying) {
        setCurrentTime((prev) => {
          const next = prev + delta * speed;
          if (next >= TOTAL_DURATION) {
            if (isLooping) {
              return 0;
            } else {
              setIsPlaying(false);
              return TOTAL_DURATION;
            }
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
  }, [isPlaying, speed, isLooping]);

  // Keyboard controls: Space to play/pause, Left/Right arrow to seek
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.code === 'Space') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        setCurrentTime((prev) => Math.max(0, prev - 1));
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        setCurrentTime((prev) => Math.min(TOTAL_DURATION, prev + 1));
      }
    };

    const handleCustomSeek = (e: Event) => {
      const customEvent = e as CustomEvent<{ stageId: ProductStage['id'] }>;
      if (customEvent.detail?.stageId) {
        handleTabClick(customEvent.detail.stageId);
        const stageEl = document.getElementById('minimalist-motion-stage');
        if (stageEl) {
          stageEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('elev:seek-stage', handleCustomSeek);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('elev:seek-stage', handleCustomSeek);
    };
  }, []);

  const handleSeek = (newTime: number) => {
    setCurrentTime(Math.max(0, Math.min(TOTAL_DURATION, newTime)));
    if (newTime < 2.8) {
      setManualBooked(false);
      setManualDropdownOpen(null);
      setManualDateSelected(null);
    }
    if (newTime < 12.5) {
      setManualPaid(false);
    }
  };

  const handleTabClick = (id: ProductStage['id']) => {
    const startTime = getStartTimeForStage(id);
    setCurrentTime(startTime);
    setManualBooked(false);
    setManualPaid(false);
    setManualDropdownOpen(null);
    setManualDateSelected(null);
  };

  const handlePrevScene = () => {
    const prevIdx = stageIndex > 0 ? stageIndex - 1 : PRODUCT_STAGES.length - 1;
    setCurrentTime(getStartTimeForStage(PRODUCT_STAGES[prevIdx].id));
    setManualBooked(false);
    setManualPaid(false);
    setManualDropdownOpen(null);
    setManualDateSelected(null);
  };

  const handleNextScene = () => {
    const nextIdx = (stageIndex + 1) % PRODUCT_STAGES.length;
    setCurrentTime(getStartTimeForStage(PRODUCT_STAGES[nextIdx].id));
    setManualBooked(false);
    setManualPaid(false);
    setManualDropdownOpen(null);
    setManualDateSelected(null);
  };

  const handleReset = () => {
    setCurrentTime(0);
    setIsPlaying(true);
    setManualBooked(false);
    setManualPaid(false);
    setManualDropdownOpen(null);
    setManualDateSelected(null);
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const cycleSpeed = () => {
    setSpeed((prev) => (prev === 0.25 ? 0.5 : prev === 0.5 ? 1 : prev === 1 ? 2 : 0.25));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 10);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms}`;
  };

  return (
    <div
      id="minimalist-motion-stage"
      className="w-full h-full relative rounded-[32px] sm:rounded-[36px] bg-[#1E60F2] bg-[url('/hero-fluid-wave-bg.png')] bg-cover bg-center overflow-hidden shadow-2xl flex flex-col items-center justify-between p-6 sm:p-8 pt-8 sm:pt-10 select-none min-h-[740px]"
    >
      {/* Subtle Ambient Vignette / Glass Depth */}
      <div className="absolute inset-0 bg-blue-600/5 mix-blend-overlay pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-[460px] mx-auto flex flex-col items-center">
        
        {/* Top Floating Product Pill Bar Dock with Organic Fillet Notch */}
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
        <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,35,102,0.08),0_4px_12px_rgba(0,0,0,0.03)] border border-slate-100/80 flex flex-col items-center justify-between text-center relative z-10 overflow-hidden w-full min-h-[520px]">
          <AnimatePresence mode="wait" initial={false}>
            
            {/* ========================================================= */}
            {/* SCENE 01: SCHEDULING                                      */}
            {/* ========================================================= */}
            {activeTab === 'scheduling' && (() => {
              const isDateActive = manualDateSelected !== null ? manualDateSelected : subProgress >= 0.22;
              const isDropdownActive = manualDropdownOpen !== null ? manualDropdownOpen : (subProgress >= 0.44 && subProgress < 0.64);
              const isCtaClicked = subProgress >= 0.64 && subProgress < 0.74;
              const isConfirmed = manualBooked || subProgress >= 0.74;

              return (
                <motion.div
                  key="stage-scheduling"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                  className="w-full h-full flex flex-col items-center justify-between gap-4"
                >
                  {!isConfirmed ? (
                    <div className="w-full flex flex-col items-center justify-between gap-3 flex-1 py-1">
                      {/* Calendar Card Container */}
                      <div className="w-full bg-[#FAFBFD] rounded-2xl p-3 border border-slate-100 relative z-10">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-1.5">
                            <CalendarIcon className="w-3.5 h-3.5 text-slate-500" />
                            <span className="text-xs font-medium text-slate-800">October 2024</span>
                          </div>
                          <motion.span
                            key={isDateActive ? 'active-date' : 'idle-date'}
                            initial={{ opacity: 0, y: -2 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            className={`text-[10px] font-medium px-2 py-0.5 rounded-full transition-colors ${
                              isDateActive
                                ? 'bg-blue-50 text-[#0055FF] border border-blue-200/60'
                                : 'text-slate-400'
                            }`}
                          >
                            {isDateActive ? `Thu · Oct ${selectedDate} ✓` : 'Select a date'}
                          </motion.span>
                        </div>

                        {/* Day headers */}
                        <div className="grid grid-cols-7 gap-1 text-[10px] font-medium text-slate-400 text-center mb-1">
                          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                            <span key={i}>{d}</span>
                          ))}
                        </div>

                        {/* Day numbers grid */}
                        <div className="grid grid-cols-7 gap-1 text-xs text-center font-normal text-slate-700 items-center">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((d) => (
                            <span key={d} className="py-1 text-slate-400 opacity-40 inline-block">
                              {d}
                            </span>
                          ))}

                          {/* Date 14 with Bounce In Animation */}
                          <div className="flex items-center justify-center relative">
                            {isDateActive && (
                              <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: [1, 1.4, 1.2], opacity: [0.6, 0.2, 0] }}
                                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
                                className="absolute inset-0 rounded-full bg-[#0055FF]/30 pointer-events-none"
                              />
                            )}
                            <motion.button
                              key={isDateActive ? 'date-14-selected' : 'date-14-idle'}
                              type="button"
                              onClick={() => {
                                setSelectedDate(14);
                                setManualDateSelected(true);
                                setTimeout(() => setManualDropdownOpen(true), 250);
                              }}
                              initial={isDateActive ? { scale: 0.8 } : false}
                              animate={
                                isDateActive
                                  ? {
                                      scale: [0.8, 1.36, 0.92, 1.08, 1],
                                      backgroundColor: '#0055FF',
                                      color: '#FFFFFF'
                                    }
                                  : {
                                      scale: 1,
                                      backgroundColor: '#FFFFFF',
                                      color: '#0F172A'
                                    }
                              }
                              transition={{
                                duration: 0.5,
                                ease: [0.175, 0.885, 0.32, 1.275]
                              }}
                              className="relative z-10 w-7 h-7 rounded-full flex items-center justify-center font-medium text-xs cursor-pointer active:scale-90 transition-colors shadow-none"
                              title="Click to select October 14"
                            >
                              14
                            </motion.button>
                          </div>

                          {[15, 16, 17, 18, 19, 20, 21].map((d) => (
                            <span key={d} className="py-1 text-slate-400 opacity-40 inline-block">
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Clean Time Slot Dropdown Container */}
                      <div className="relative w-full z-20">
                        <div className="w-full bg-[#F4F8FF] rounded-xl py-2 px-3.5 flex items-center justify-between text-xs font-normal text-[#0055FF] border border-blue-100/70">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#0055FF]" />
                            <span className="font-medium text-xs">Selected Slot</span>
                          </div>

                          {/* Dropdown Trigger Button */}
                          <button
                            type="button"
                            onClick={() => setManualDropdownOpen((prev) => !prev)}
                            className="flex items-center gap-1.5 bg-white hover:bg-slate-50 active:scale-95 px-3 py-1 rounded-lg border border-slate-200/90 text-[#0F172A] font-medium text-xs transition-all cursor-pointer shadow-none"
                          >
                            <span>{selectedTime}</span>
                            <ChevronDown
                              className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                                isDropdownActive ? 'rotate-180 text-[#0055FF]' : ''
                              }`}
                            />
                          </button>
                        </div>

                        {/* Clean Floating Dropdown Popover */}
                        <AnimatePresence>
                          {isDropdownActive && (
                            <motion.div
                              initial={{ opacity: 0, y: -6, scale: 0.96 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -6, scale: 0.96 }}
                              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                              className="absolute right-0 top-full mt-1.5 w-52 bg-white/98 backdrop-blur-xl rounded-2xl border border-slate-200/90 shadow-[0_16px_36px_rgba(0,35,102,0.15)] p-1.5 z-30 flex flex-col gap-1 text-left"
                            >
                              <div className="px-2 py-0.5 text-[9px] font-mono text-slate-400 uppercase tracking-wider">
                                Available Times
                              </div>
                              {TIME_SLOTS.map((slot) => {
                                const isSelected = selectedTime === slot.time;
                                return (
                                  <button
                                    key={slot.time}
                                    type="button"
                                    onClick={() => {
                                      setSelectedTime(slot.time);
                                      setManualDropdownOpen(false);
                                    }}
                                    className={`w-full px-2.5 py-1.5 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer shadow-none ${
                                      isSelected
                                        ? 'bg-[#EFF6FF] text-[#0055FF] font-medium'
                                        : 'hover:bg-slate-50 text-slate-700 font-normal'
                                    }`}
                                  >
                                    <div className="flex flex-col">
                                      <span className="leading-tight font-medium">{slot.time}</span>
                                      <span className="text-[9px] text-slate-400">{slot.label}</span>
                                    </div>
                                    {isSelected && (
                                      <Check className="w-3.5 h-3.5 text-[#0055FF] stroke-[2.5]" />
                                    )}
                                  </button>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* 3D Icon */}
                      <img src="/icon-scheduling-3d.png" alt="Scheduling" className="w-20 h-20 object-contain my-1" />

                      {/* CTA Button "Book Now →" with Press Bounce (Flat, Zero Drop Shadow) */}
                      <motion.button
                        type="button"
                        animate={
                          isCtaClicked
                            ? { scale: [1, 0.92, 1] }
                            : { scale: 1 }
                        }
                        transition={{ duration: 0.22 }}
                        onClick={() => {
                          setManualBooked(true);
                          handleSeek(3.1);
                        }}
                        className={`w-full py-3 px-4 rounded-2xl font-medium text-sm flex items-center justify-center gap-2 active:scale-[0.96] transition-colors duration-150 cursor-pointer border shadow-none ${
                          isDateActive
                            ? 'bg-[#0055FF] text-white hover:bg-blue-600 border-[#0055FF]'
                            : 'bg-slate-100 text-slate-400 border-slate-200/80'
                        }`}
                      >
                        <span>Book Now</span>
                        <span className="translate-x-0.5 font-normal">→</span>
                      </motion.button>
                    </div>
                  ) : (
                    <div className="w-full flex flex-col items-center justify-between gap-4 flex-1 py-2">
                      <motion.div
                        initial={{ scale: 0.5 }}
                        animate={{ scale: [0.5, 1.2, 1] }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        className="w-12 h-12 rounded-full bg-[#ECFDF5] text-[#10B981] flex items-center justify-center border border-[#A7F3D0]/60"
                      >
                        <Check className="w-6 h-6 stroke-[2.5]" />
                      </motion.div>

                      <div>
                        <h3 className="text-2xl font-normal text-[#0F172A] tracking-tight">
                          Meeting scheduled
                        </h3>
                        <p className="text-xs text-[#64748B] mt-1 font-normal">
                          Thu, Oct {selectedDate} · {selectedTime}
                        </p>
                      </div>

                      {/* Google Calendar Confirmation Tile Matched to Reference (Flat, No Drop Shadow) */}
                      <div className="w-full bg-white border border-slate-200/90 rounded-[20px] p-4 flex items-center justify-between text-left">
                        <div className="flex items-center gap-3.5">
                          <img
                            src="/icon-scheduling-3d.png"
                            alt="Google Calendar"
                            className="w-9 h-9 object-contain shrink-0"
                          />
                          <div>
                            <span className="text-base font-normal text-[#0A0D14] block leading-tight tracking-tight">
                              Google Calendar
                            </span>
                            <span className="text-xs text-[#64748B] font-normal mt-1 block">
                              Invite sent ✓
                            </span>
                          </div>
                        </div>

                        <div className="px-3.5 py-1.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0]/80 text-[#059669] text-xs font-normal flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>Invite Sent</span>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })()}

            {/* ========================================================= */}
            {/* SCENE 02: AI PROCESSING (SYNCHRONIZED TASK CARDS INGESTION) */}
            {/* ========================================================= */}
            {activeTab === 'velie' && (() => {
              // 3 Equal Continuous Intervals (Zero Dead Time, 100% Locked with Progress Bar)
              // Total subProgress: 0.0 -> 1.0 (Duration 4.5s)
              // Interval 1: 0.000 -> 0.333 (Task 1: Notes enters AI Processing)
              // Interval 2: 0.333 -> 0.666 (Task 2: Tasks enters AI Processing)
              // Interval 3: 0.666 -> 1.000 (Task 3: Follow-up enters AI Processing)
              // Finish state: All 3 tasks finished entering simultaneously with progress bar hitting 100%!

              const t = Math.max(0, Math.min(1, subProgress));

              // Card 1: Notes (Active ingestion: 0.000 -> 0.333)
              const u1 = Math.max(0, Math.min(1, t / 0.333));
              const ease1 = u1 < 0.5 ? 2 * u1 * u1 : 1 - Math.pow(-2 * u1 + 2, 2) / 2;
              const card1Y = ease1 * 54;
              const card1Scale = 1 - ease1 * 0.14;
              const card1Opacity = u1 < 0.45 ? 1 : Math.max(0, 1 - (u1 - 0.45) / 0.55);
              const card1Blur = u1 > 0.45 ? (u1 - 0.45) * 6 : 0;

              // Card 2: Tasks (Shifts down to slot 1: 0.000 -> 0.333, Active ingestion: 0.333 -> 0.666)
              const shift2 = Math.max(0, Math.min(1, t / 0.333));
              const easeShift2 = shift2 < 0.5 ? 2 * shift2 * shift2 : 1 - Math.pow(-2 * shift2 + 2, 2) / 2;
              const u2 = Math.max(0, Math.min(1, (t - 0.333) / 0.333));
              const ease2 = u2 < 0.5 ? 2 * u2 * u2 : 1 - Math.pow(-2 * u2 + 2, 2) / 2;
              const card2Y = -52 + easeShift2 * 52 + ease2 * 54;
              const card2Scale = (0.96 + easeShift2 * 0.04) - ease2 * 0.14;
              const card2Opacity = u2 < 0.45 ? 1 : Math.max(0, 1 - (u2 - 0.45) / 0.55);
              const card2Blur = u2 > 0.45 ? (u2 - 0.45) * 6 : 0;

              // Card 3: Follow-up (Shifts slot 3->2: 0.000 -> 0.333, slot 2->1: 0.333 -> 0.666, Active ingestion: 0.666 -> 1.000)
              const shift3a = Math.max(0, Math.min(1, t / 0.333));
              const easeShift3a = shift3a < 0.5 ? 2 * shift3a * shift3a : 1 - Math.pow(-2 * shift3a + 2, 2) / 2;
              const shift3b = Math.max(0, Math.min(1, (t - 0.333) / 0.333));
              const easeShift3b = shift3b < 0.5 ? 2 * shift3b * shift3b : 1 - Math.pow(-2 * shift3b + 2, 2) / 2;
              const u3 = Math.max(0, Math.min(1, (t - 0.666) / 0.334));
              const ease3 = u3 < 0.5 ? 2 * u3 * u3 : 1 - Math.pow(-2 * u3 + 2, 2) / 2;
              const card3Y = -104 + easeShift3a * 52 + easeShift3b * 52 + ease3 * 54;
              const card3Scale = (0.92 + (easeShift3a + easeShift3b) * 0.04) - ease3 * 0.14;
              const card3Opacity = u3 < 0.45 ? 1 : Math.max(0, 1 - (u3 - 0.45) / 0.55);
              const card3Blur = u3 > 0.45 ? (u3 - 0.45) * 6 : 0;

              // Reactive title absorption pulse
              const isAbsorbing = (u1 > 0.2 && u1 < 0.9) || (u2 > 0.2 && u2 < 0.9) || (u3 > 0.2 && u3 < 0.9);

              // Finish state: triggers right as task 3 finishes entering into AI processing (t >= 0.88 -> 1.0)
              const isFinished = t >= 0.88;

              // Synchronous Direct 60fps/120fps Progress Percentage (Zero CSS Lag)
              const beadPercent = Math.min(100, Math.max(0, t * 100));

              return (
                <motion.div
                  key="stage-velie"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                  className="w-full h-full flex flex-col items-center justify-between text-center relative select-none py-1"
                >
                  {/* Top 3D AI Logo with Soft Radial Halo */}
                  <div className="relative z-10 w-14 h-14 mx-auto flex items-center justify-center shrink-0">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-400/25 to-lime-300/25 blur-lg pointer-events-none" />
                    <motion.div
                      animate={{ y: [-2, 2, -2], scale: isFinished ? [1.05, 1.1, 1.05] : [1, 1.03, 1] }}
                      transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="relative z-10 w-12 h-12 flex items-center justify-center"
                    >
                      <img
                        src="/icon-velie-3d.png"
                        alt="Elev AI Core"
                        className="w-11 h-11 object-contain drop-shadow-[0_4px_12px_rgba(34,197,94,0.25)]"
                      />
                    </motion.div>
                  </div>

                  {/* Task Cards Cascading Ingestion Stack (Matched to Reference Image) */}
                  <div className="relative w-full max-w-[280px] h-[130px] mx-auto flex items-center justify-center overflow-visible my-1 shrink-0">
                    {/* Card 1: Notes (Blue Doc) - Enters first into AI Processing */}
                    {card1Opacity > 0.01 && (
                      <div
                        style={{
                          transform: `translateY(${card1Y}px) scale(${card1Scale}) rotate(-4deg)`,
                          opacity: card1Opacity,
                          filter: card1Blur > 0 ? `blur(${card1Blur}px)` : 'none'
                        }}
                        className="absolute z-20 w-[210px] sm:w-[230px] bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 shadow-[0_10px_24px_rgba(0,35,102,0.06),0_1px_3px_rgba(0,0,0,0.02)] border border-slate-100/90 flex items-center gap-3 will-change-transform"
                      >
                        <div className="w-7 h-7 rounded-xl bg-[#EFF6FF] text-[#0055FF] flex items-center justify-center shrink-0">
                          <FileText className="w-3.5 h-3.5 text-[#0055FF]" />
                        </div>
                        <div className="flex flex-col gap-1.5 text-left">
                          <div className="w-20 sm:w-24 h-2 bg-[#E2E8F0] rounded-full" />
                          <div className="w-12 sm:w-15 h-2 bg-[#EEF2F6] rounded-full" />
                        </div>
                      </div>
                    )}

                    {/* Card 2: Tasks (Green Check) - Shifts down and enters second */}
                    {card2Opacity > 0.01 && (
                      <div
                        style={{
                          transform: `translateY(${card2Y}px) scale(${card2Scale}) rotate(-7deg)`,
                          opacity: card2Opacity,
                          filter: card2Blur > 0 ? `blur(${card2Blur}px)` : 'none'
                        }}
                        className="absolute z-19 w-[210px] sm:w-[230px] bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 shadow-[0_10px_24px_rgba(0,35,102,0.06),0_1px_3px_rgba(0,0,0,0.02)] border border-slate-100/90 flex items-center gap-3 will-change-transform"
                      >
                        <div className="w-7 h-7 rounded-full bg-[#ECFDF5] text-[#10B981] flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 text-[#10B981] stroke-[2.5]" />
                        </div>
                        <div className="flex flex-col gap-1.5 text-left">
                          <div className="w-22 sm:w-26 h-2 bg-[#E2E8F0] rounded-full" />
                          <div className="w-14 sm:w-16 h-2 bg-[#EEF2F6] rounded-full" />
                        </div>
                      </div>
                    )}

                    {/* Card 3: Follow-up (Purple User) - Shifts down and enters third */}
                    {card3Opacity > 0.01 && (
                      <div
                        style={{
                          transform: `translateY(${card3Y}px) scale(${card3Scale}) rotate(-2deg)`,
                          opacity: card3Opacity,
                          filter: card3Blur > 0 ? `blur(${card3Blur}px)` : 'none'
                        }}
                        className="absolute z-18 w-[210px] sm:w-[230px] bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 shadow-[0_10px_24px_rgba(0,35,102,0.06),0_1px_3px_rgba(0,0,0,0.02)] border border-slate-100/90 flex items-center gap-3 will-change-transform"
                      >
                        <div className="w-7 h-7 rounded-xl bg-[#F5F3FF] text-[#8B5CF6] flex items-center justify-center shrink-0">
                          <User className="w-3.5 h-3.5 text-[#8B5CF6]" />
                        </div>
                        <div className="flex flex-col gap-1.5 text-left">
                          <div className="w-20 sm:w-24 h-2 bg-[#E2E8F0] rounded-full" />
                          <div className="w-12 sm:w-14 h-2 bg-[#EEF2F6] rounded-full" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* AI Processing Content Block: Moves Upward When Finished */}
                  <motion.div
                    animate={{
                      y: isFinished ? -36 : 0
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 220,
                      damping: 24,
                      mass: 0.8
                    }}
                    className="w-full flex flex-col items-center shrink-0"
                  >
                    {/* Title with Reactive Absorption Glow */}
                    <div className="relative">
                      <motion.div
                        animate={{
                          opacity: isAbsorbing ? 0.75 : 0,
                          scale: isAbsorbing ? 1.06 : 0.94
                        }}
                        transition={{ duration: 0.2 }}
                        className="absolute -inset-4 bg-gradient-to-r from-blue-400/20 via-sky-300/30 to-emerald-400/20 rounded-full blur-xl pointer-events-none"
                      />
                      <h3 className="text-[28px] sm:text-[32px] font-semibold text-[#0F172A] tracking-[-0.03em] leading-tight relative z-10">
                        AI Processing
                      </h3>
                    </div>

                    {/* Pill Badge (Morphs to Complete at Follow-up finish) */}
                    <div className="mt-3">
                      {isFinished ? (
                        <motion.div
                          key="badge-complete"
                          initial={{ opacity: 0, scale: 0.92, y: 3 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ duration: 0.25 }}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#ECFDF5] text-[#059669] text-[13px] font-medium border border-[#A7F3D0]/80 shadow-2xs"
                        >
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>All tasks organized & ready</span>
                        </motion.div>
                      ) : (
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDF5FF] text-[#0055FF] text-[13px] font-medium border border-[#DBEAFE]/80">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#0055FF] shrink-0 animate-pulse" />
                          <span>Analyzing and organizing...</span>
                        </div>
                      )}
                    </div>

                    {/* Subtitle */}
                    <p className="text-[14px] text-[#64748B] mt-2 font-normal tracking-tight">
                      Turning your conversation into useful insights.
                    </p>

                    {/* Progress Slider Track with Glowing Comet Bead (Synchronous Zero-Delay Motion) */}
                    <div className="w-full max-w-[340px] sm:max-w-[360px] mx-auto mt-6 sm:mt-7 mb-2">
                      {/* Linear Track Line */}
                      <div className="relative w-full h-[3px] bg-[#E8EEF5] rounded-full overflow-visible">
                        {/* Active Gradient Track (Instant Direct 120fps Width) */}
                        <div
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-sky-400 via-blue-500 to-[#0055FF] rounded-full will-change-[width]"
                          style={{
                            width: `${beadPercent}%`
                          }}
                        />

                        {/* Glowing Bead / Comet Head (Instant Direct 120fps Position) */}
                        <div
                          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#0055FF] border-[2px] border-white shadow-[0_0_12px_#0055FF,0_0_24px_rgba(0,85,255,0.7)] ring-4 ring-blue-500/20 z-10 pointer-events-none will-change-[left]"
                          style={{
                            left: `${beadPercent}%`
                          }}
                        />
                      </div>

                      {/* 3 Step Labels Below (Synchronized with Intervals) */}
                      <div className="w-full flex justify-between items-center text-[13px] sm:text-[14px] pt-3 px-2 select-none">
                        <span
                          className={`transition-colors duration-150 ${
                            t >= 0.20 ? 'text-[#0F172A] font-semibold' : 'text-[#64748B] font-normal'
                          }`}
                        >
                          Notes
                        </span>
                        <span
                          className={`transition-colors duration-150 ${
                            t >= 0.50 ? 'text-[#0F172A] font-semibold' : 'text-[#64748B] font-normal'
                          }`}
                        >
                          Tasks
                        </span>
                        <span
                          className={`transition-colors duration-150 ${
                            t >= 0.85 ? 'text-[#0F172A] font-semibold' : 'text-[#64748B] font-normal'
                          }`}
                        >
                          Follow-up
                        </span>
                      </div>
                    </div>

                    {/* Footer / Completion Status */}
                    {isFinished ? (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0FDF4] text-[#16A34A] text-xs font-medium border border-[#DCFCE7] mt-3"
                      >
                        <Check className="w-3 h-3 stroke-[2.5]" />
                        <span>3 of 3 tasks successfully processed</span>
                      </motion.div>
                    ) : (
                      <p className="text-[12px] font-normal text-[#94A3B8] tracking-tight mt-5 pb-1">
                        This may take a few moments.
                      </p>
                    )}
                  </motion.div>
                </motion.div>
              );
            })()}

            {/* ========================================================= */}
            {/* SCENE 03: INSTANT RECAPS (SOFT MAGNETIC VORTEX ABSORPTION)*/}
            {/* ========================================================= */}
            {activeTab === 'notetaker' && (() => {
              const t = Math.max(0, Math.min(1, subProgress));

              // 5 Scattered Task Cards Configuration (Matched to Reference Image)
              // Each card has a unique curved Bezier trajectory, non-linear staggered timing,
              // directional stretch, and a target waveform bar index for micro-ripple response.
              const VORTEX_CARDS = [
                { id: 1, startX: -92, startY: 22, ctrlX: -130, ctrlY: -22, rotStart: -18, rotEnd: -4, startT: 0.00, durT: 0.28, barTarget: 3 },
                { id: 2, startX: 84, startY: 14, ctrlX: 118, ctrlY: -28, rotStart: 8, rotEnd: 2, startT: 0.06, durT: 0.28, barTarget: 11 },
                { id: 3, startX: -12, startY: 56, ctrlX: 34, ctrlY: 2, rotStart: -38, rotEnd: -8, startT: 0.12, durT: 0.29, barTarget: 7 },
                { id: 4, startX: 78, startY: 86, ctrlX: 100, ctrlY: 18, rotStart: -6, rotEnd: 6, startT: 0.18, durT: 0.29, barTarget: 13 },
                { id: 5, startX: -46, startY: 132, ctrlX: -76, ctrlY: 42, rotStart: -42, rotEnd: -12, startT: 0.24, durT: 0.28, barTarget: 4 },
              ];

              // State flag: all cards have finished vortex absorption
              const isAllAbsorbed = t >= 0.54;

              return (
                <motion.div
                  key="stage-notetaker"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                  className="w-full h-full flex flex-col items-center justify-between text-center relative select-none py-1"
                >
                  {/* Recaps Ready Content Block: Smoothly moves to vertical center once cards are absorbed */}
                  <motion.div
                    animate={{
                      y: isAllAbsorbed ? 114 : 0
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 160,
                      damping: 22,
                      mass: 0.9
                    }}
                    className="w-full flex flex-col items-center gap-2.5 shrink-0 z-20"
                  >
                    {/* Top Confirmation Badge with celebratory scale pop on absorption completion */}
                    <motion.div
                      animate={isAllAbsorbed ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                      transition={{ duration: 0.35, ease: [0.175, 0.885, 0.32, 1.275] }}
                      className="w-12 h-12 rounded-full bg-[#ECFDF5] text-[#10B981] flex items-center justify-center border border-[#A7F3D0]/60 shrink-0"
                    >
                      <Check className="w-6 h-6 stroke-[2.5]" />
                    </motion.div>

                    {/* Header Typography */}
                    <div>
                      <h3 className="text-2xl sm:text-[28px] font-semibold text-[#0F172A] tracking-tight">
                        Recaps ready
                      </h3>
                      <p className="text-xs sm:text-[13px] text-[#64748B] mt-1 font-normal max-w-[310px] mx-auto">
                        Your meeting has been transcribed and action items have been synced.
                      </p>
                    </div>

                    {/* Interactive Waveform Audio Player with Card Ingestion Micro-Ripples */}
                    <div className="w-full bg-[#F8FAFC] border border-[#E2E8F0]/80 rounded-2xl p-3 flex items-center justify-between gap-3 shrink-0 relative z-20">
                      <button
                        type="button"
                        onClick={() => setIsAudioSnippetPlaying((prev) => !prev)}
                        className="w-8 h-8 rounded-full bg-[#EDF2F7] hover:bg-[#E2E8F0] text-[#0F172A] flex items-center justify-center shrink-0 cursor-pointer active:scale-95 transition-all shadow-none"
                      >
                        {isAudioSnippetPlaying ? (
                          <Pause className="w-3.5 h-3.5 fill-current" />
                        ) : (
                          <Play className="w-3.5 h-3.5 fill-current translate-x-0.5" />
                        )}
                      </button>

                      {/* Waveform Bars with Physical Amplitude Ripple on Ingestion */}
                      <div className="flex items-center gap-1 flex-1 justify-center h-7 overflow-visible">
                        {[4, 8, 12, 18, 24, 14, 20, 10, 16, 22, 12, 18, 10, 6, 4].map((baseHeight, i) => {
                          // Calculate micro-ripple perturbation when any card enters this bar section
                          let barRippleOffset = 0;
                          VORTEX_CARDS.forEach((card) => {
                            const p = Math.max(0, Math.min(1, (t - card.startT) / card.durT));
                            if (p > 0.72 && p <= 1.0) {
                              const pulse = Math.sin(((p - 0.72) / 0.28) * Math.PI); // 0 -> 1 -> 0
                              const dist = Math.abs(i - card.barTarget);
                              if (dist < 4) {
                                const damp = 1 - dist / 4;
                                barRippleOffset += pulse * 4.5 * damp;
                              }
                            }
                          });

                          // Standard audio playback wave
                          const audioWave = isAudioSnippetPlaying && isPlaying
                            ? Math.sin(currentTime * 8 + i * 0.55) * 8 + 12
                            : baseHeight;

                          const finalHeight = Math.max(4, audioWave + barRippleOffset);

                          return (
                            <span
                              key={i}
                              className={`w-1 rounded-full transition-colors duration-150 ${
                                isAudioSnippetPlaying && isPlaying ? 'bg-[#0055FF]' : 'bg-[#94A3B8]'
                              }`}
                              style={{
                                height: `${finalHeight}px`,
                                transform: barRippleOffset > 0.5 ? `scaleY(1.15)` : 'scaleY(1)',
                                willChange: 'height, transform'
                              }}
                            />
                          );
                        })}
                      </div>

                      <span className="text-xs font-mono font-normal text-[#64748B] shrink-0 tabular-nums">02:45</span>
                    </div>
                  </motion.div>

                  {/* ========================================================= */}
                  {/* SOFT MAGNETIC VORTEX CARDS INGESTION STAGE               */}
                  {/* ========================================================= */}
                  <div className="relative w-full h-[200px] flex items-center justify-center overflow-visible my-1 select-none pointer-events-none">
                    
                    {/* Render the 5 Scattered Task Cards */}
                    {!isAllAbsorbed && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
                        {VORTEX_CARDS.map((card) => {
                          const cardProgress = Math.max(0, Math.min(1, (t - card.startT) / card.durT));

                          // Ease: slow start -> acceleration toward recap container
                          const pEased = Math.pow(cardProgress, 1.85);

                          // Quadratic Bezier curved trajectory toward the waveform (targetX: 0, targetY: -48px)
                          const oneMinusP = 1 - pEased;
                          const currentX =
                            oneMinusP * oneMinusP * card.startX +
                            2 * oneMinusP * pEased * card.ctrlX +
                            pEased * pEased * 0;
                          const currentY =
                            oneMinusP * oneMinusP * card.startY +
                            2 * oneMinusP * pEased * card.ctrlY +
                            pEased * pEased * -48;

                          // Smooth rotational adjustment
                          const currentRot = card.rotStart + (card.rotEnd - card.rotStart) * pEased;

                          // Gradual scale down
                          const scale = 1.0 - pEased * 0.72;

                          // Directional stretch along motion in mid-flight
                          const stretchY = 1.0 + Math.sin(cardProgress * Math.PI) * 0.18;
                          const stretchX = 1.0 - Math.sin(cardProgress * Math.PI) * 0.08;

                          // Opacity fade in the last 28% of travel
                          const opacity = cardProgress < 0.72 ? 1 : Math.max(0, 1 - (cardProgress - 0.72) / 0.28);

                          // Soft directional motion blur (no flashy glow or light bursts)
                          const blur = cardProgress > 0.45 ? Math.min(3.5, (cardProgress - 0.45) * 6.5) : 0;

                          if (opacity <= 0.01) return null;

                          return (
                            <div
                              key={card.id}
                              style={{
                                transform: `translate3d(${currentX}px, ${currentY}px, 0) rotate(${currentRot}deg) scale(${scale * stretchX}, ${scale * stretchY})`,
                                opacity,
                                filter: blur > 0 ? `blur(${blur}px)` : 'none',
                                willChange: 'transform, opacity, filter'
                              }}
                              className="absolute w-[165px] sm:w-[185px] bg-white/95 backdrop-blur-md rounded-2xl p-2 sm:p-2.5 shadow-[0_8px_20px_rgba(0,35,102,0.06),0_1px_3px_rgba(0,0,0,0.02)] border border-slate-100/90 flex items-center gap-2.5 pointer-events-none"
                            >
                              <div className="w-6 h-6 rounded-lg bg-[#ECFDF5] text-[#10B981] flex items-center justify-center shrink-0">
                                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                              </div>
                              <div className="flex flex-col gap-1.5 text-left flex-1">
                                <div className="w-18 sm:w-22 h-1.5 bg-[#E2E8F0] rounded-full" />
                                <div className="w-11 sm:w-14 h-1.5 bg-[#EEF2F6] rounded-full" />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Elev Notetaker 3D Icon at Bottom Center (Smoothly fades out and scales down when recaps ready centers) */}
                  <motion.div
                    animate={{
                      y: isAllAbsorbed ? 14 : [-2, 2, -2],
                      opacity: isAllAbsorbed ? 0 : 1,
                      scale: isAllAbsorbed ? 0.75 : 1
                    }}
                    transition={
                      isAllAbsorbed
                        ? { duration: 0.35, ease: [0.23, 1, 0.32, 1] }
                        : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
                    }
                    className="shrink-0 flex items-center justify-center mt-1 pointer-events-none"
                  >
                    <img
                      src="/icon-notetaker-3d.png"
                      alt="Elev Notetaker"
                      className="w-11 h-11 object-contain drop-shadow-[0_4px_12px_rgba(99,102,241,0.2)]"
                    />
                  </motion.div>
                </motion.div>
              );
            })()}

            {/* ========================================================= */}
            {/* SCENE 04: PAYMENTS                                        */}
            {/* ========================================================= */}
            {activeTab === 'payments' && (() => {
              const isPaidComplete = manualPaid || subProgress >= 0.82;

              // Smooth amount count up from $0 to $360.00
              const countP = Math.min(1, subProgress / 0.28);
              const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
              const rawAmount = easeOutCubic(countP) * 360;
              const displayAmount = rawAmount.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              });

              return (
                <motion.div
                  key="stage-payments"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                  className="w-full h-full flex flex-col items-center justify-between text-center relative select-none py-1"
                >
                  <AnimatePresence mode="wait">
                    {!isPaidComplete ? (
                      <motion.div
                        key="payment-pending"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
                        transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                        className="w-full flex flex-col items-center justify-between gap-3 sm:gap-3.5 flex-1 relative"
                      >
                      
                      {/* Top Canvas with Ambient Looping Avatar & Frosted Grid Tiles */}
                      <div className="w-full relative pt-1 pb-1 flex flex-col items-center">
                        {/* Ambient Flowing / Drifting Grid Tiles: Symmetrical Left & Right Flank Streams with Absolute Center Protection */}
                        <div className="absolute -inset-x-6 -top-3 bottom-0 pointer-events-none overflow-hidden select-none z-0">
                          
                          {/* Left Wing Flank Stream (Columns 1 & 2) */}
                          <div
                            className="absolute left-0 top-0 bottom-0 w-[116px] sm:w-[126px] overflow-hidden flex flex-col justify-between py-1"
                            style={{
                              maskImage:
                                'linear-gradient(to right, transparent 0%, black 24%, black 80%, transparent 100%)',
                              WebkitMaskImage:
                                'linear-gradient(to right, transparent 0%, black 24%, black 80%, transparent 100%)'
                            }}
                          >
                            {/* Left Row 1 */}
                            <div className="flex overflow-hidden w-full select-none">
                              <motion.div
                                animate={{ x: ['0%', '-33.333%'] }}
                                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                className="flex items-center gap-2.5 sm:gap-3 shrink-0 will-change-transform"
                              >
                                {[...PAYMENT_LEFT_ROW_1, ...PAYMENT_LEFT_ROW_1, ...PAYMENT_LEFT_ROW_1].map((tile, idx) => (
                                  <div
                                    key={`pl1-${idx}`}
                                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-[16px] sm:rounded-[18px] shrink-0 flex items-center justify-center overflow-hidden border border-slate-200/50 bg-slate-100/60"
                                    style={{
                                      opacity: tile.type === 'avatar' ? 0.94 : tile.opacity || 0.3
                                    }}
                                  >
                                    {tile.type === 'avatar' && (
                                      <img
                                        src={tile.avatar}
                                        alt="User"
                                        className="w-full h-full object-cover select-none pointer-events-none rounded-[16px] sm:rounded-[18px]"
                                        loading="eager"
                                      />
                                    )}
                                  </div>
                                ))}
                              </motion.div>
                            </div>

                            {/* Left Row 2 */}
                            <div className="flex overflow-hidden w-full select-none">
                              <motion.div
                                animate={{ x: ['0%', '-33.333%'] }}
                                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                className="flex items-center gap-2.5 sm:gap-3 shrink-0 will-change-transform"
                              >
                                {[...PAYMENT_LEFT_ROW_2, ...PAYMENT_LEFT_ROW_2, ...PAYMENT_LEFT_ROW_2].map((tile, idx) => (
                                  <div
                                    key={`pl2-${idx}`}
                                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-[16px] sm:rounded-[18px] shrink-0 flex items-center justify-center overflow-hidden border border-slate-200/50 bg-slate-100/60"
                                    style={{
                                      opacity: tile.type === 'avatar' ? 0.94 : tile.opacity || 0.3
                                    }}
                                  >
                                    {tile.type === 'avatar' && (
                                      <img
                                        src={tile.avatar}
                                        alt="User"
                                        className="w-full h-full object-cover select-none pointer-events-none rounded-[16px] sm:rounded-[18px]"
                                        loading="eager"
                                      />
                                    )}
                                  </div>
                                ))}
                              </motion.div>
                            </div>

                            {/* Left Row 3 */}
                            <div className="flex overflow-hidden w-full select-none">
                              <motion.div
                                animate={{ x: ['0%', '-33.333%'] }}
                                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                className="flex items-center gap-2.5 sm:gap-3 shrink-0 will-change-transform"
                              >
                                {[...PAYMENT_LEFT_ROW_3, ...PAYMENT_LEFT_ROW_3, ...PAYMENT_LEFT_ROW_3].map((tile, idx) => (
                                  <div
                                    key={`pl3-${idx}`}
                                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-[16px] sm:rounded-[18px] shrink-0 flex items-center justify-center overflow-hidden border border-slate-200/50 bg-slate-100/60"
                                    style={{
                                      opacity: tile.type === 'avatar' ? 0.94 : tile.opacity || 0.3
                                    }}
                                  >
                                    {tile.type === 'avatar' && (
                                      <img
                                        src={tile.avatar}
                                        alt="User"
                                        className="w-full h-full object-cover select-none pointer-events-none rounded-[16px] sm:rounded-[18px]"
                                        loading="eager"
                                      />
                                    )}
                                  </div>
                                ))}
                              </motion.div>
                            </div>
                          </div>

                          {/* Center Static Frosted Bento Geometry (Exact Reference Geometry from reference behind Meeting payment) */}
                          <div className="absolute inset-x-0 top-0 bottom-0 flex flex-col justify-between items-center py-1 pointer-events-none z-0">
                            <div className="flex gap-2.5 sm:gap-3">
                              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-[16px] sm:rounded-[18px] border border-slate-200/40 bg-slate-100/50 opacity-25" />
                              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-[16px] sm:rounded-[18px] border border-slate-200/40 bg-slate-100/50 opacity-20" />
                            </div>
                            <div className="flex gap-2.5 sm:gap-3">
                              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-[16px] sm:rounded-[18px] border border-slate-200/40 bg-slate-100/50 opacity-20" />
                              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-[16px] sm:rounded-[18px] border border-slate-200/40 bg-slate-100/50 opacity-15" />
                            </div>
                            <div className="flex gap-2.5 sm:gap-3">
                              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-[16px] sm:rounded-[18px] border border-slate-200/40 bg-slate-100/50 opacity-15" />
                              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-[16px] sm:rounded-[18px] border border-slate-200/40 bg-slate-100/50 opacity-20" />
                            </div>
                          </div>

                          {/* Right Wing Flank Stream (Columns 5 & 6) */}
                          <div
                            className="absolute right-0 top-0 bottom-0 w-[116px] sm:w-[126px] overflow-hidden flex flex-col justify-between py-1"
                            style={{
                              maskImage:
                                'linear-gradient(to left, transparent 0%, black 24%, black 80%, transparent 100%)',
                              WebkitMaskImage:
                                'linear-gradient(to left, transparent 0%, black 24%, black 80%, transparent 100%)'
                            }}
                          >
                            {/* Right Row 1 */}
                            <div className="flex overflow-hidden w-full select-none">
                              <motion.div
                                animate={{ x: ['-33.333%', '0%'] }}
                                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                className="flex items-center gap-2.5 sm:gap-3 shrink-0 will-change-transform"
                              >
                                {[...PAYMENT_RIGHT_ROW_1, ...PAYMENT_RIGHT_ROW_1, ...PAYMENT_RIGHT_ROW_1].map((tile, idx) => (
                                  <div
                                    key={`pr1-${idx}`}
                                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-[16px] sm:rounded-[18px] shrink-0 flex items-center justify-center overflow-hidden border border-slate-200/50 bg-slate-100/60"
                                    style={{
                                      opacity: tile.type === 'avatar' ? 0.94 : tile.opacity || 0.3
                                    }}
                                  >
                                    {tile.type === 'avatar' && (
                                      <img
                                        src={tile.avatar}
                                        alt="User"
                                        className="w-full h-full object-cover select-none pointer-events-none rounded-[16px] sm:rounded-[18px]"
                                        loading="eager"
                                      />
                                    )}
                                  </div>
                                ))}
                              </motion.div>
                            </div>

                            {/* Right Row 2 */}
                            <div className="flex overflow-hidden w-full select-none">
                              <motion.div
                                animate={{ x: ['-33.333%', '0%'] }}
                                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                className="flex items-center gap-2.5 sm:gap-3 shrink-0 will-change-transform"
                              >
                                {[...PAYMENT_RIGHT_ROW_2, ...PAYMENT_RIGHT_ROW_2, ...PAYMENT_RIGHT_ROW_2].map((tile, idx) => (
                                  <div
                                    key={`pr2-${idx}`}
                                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-[16px] sm:rounded-[18px] shrink-0 flex items-center justify-center overflow-hidden border border-slate-200/50 bg-slate-100/60"
                                    style={{
                                      opacity: tile.type === 'avatar' ? 0.94 : tile.opacity || 0.3
                                    }}
                                  >
                                    {tile.type === 'avatar' && (
                                      <img
                                        src={tile.avatar}
                                        alt="User"
                                        className="w-full h-full object-cover select-none pointer-events-none rounded-[16px] sm:rounded-[18px]"
                                        loading="eager"
                                      />
                                    )}
                                  </div>
                                ))}
                              </motion.div>
                            </div>

                            {/* Right Row 3 */}
                            <div className="flex overflow-hidden w-full select-none">
                              <motion.div
                                animate={{ x: ['-33.333%', '0%'] }}
                                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                className="flex items-center gap-2.5 sm:gap-3 shrink-0 will-change-transform"
                              >
                                {[...PAYMENT_RIGHT_ROW_3, ...PAYMENT_RIGHT_ROW_3, ...PAYMENT_RIGHT_ROW_3].map((tile, idx) => (
                                  <div
                                    key={`pr3-${idx}`}
                                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-[16px] sm:rounded-[18px] shrink-0 flex items-center justify-center overflow-hidden border border-slate-200/50 bg-slate-100/60"
                                    style={{
                                      opacity: tile.type === 'avatar' ? 0.94 : tile.opacity || 0.3
                                    }}
                                  >
                                    {tile.type === 'avatar' && (
                                      <img
                                        src={tile.avatar}
                                        alt="User"
                                        className="w-full h-full object-cover select-none pointer-events-none rounded-[16px] sm:rounded-[18px]"
                                        loading="eager"
                                      />
                                    )}
                                  </div>
                                ))}
                              </motion.div>
                            </div>
                          </div>

                          {/* Outer Edge Feathering Masks */}
                          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
                          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
                        </div>

                        {/* Foreground Header Typography with gentle legibility halo */}
                        <div className="relative z-10 px-5 py-1">
                          <div className="absolute inset-0 bg-white/75 backdrop-blur-[2px] rounded-2xl pointer-events-none -z-10" />
                          <h3 className="text-2xl sm:text-[28px] font-semibold text-[#0F172A] tracking-tight">
                            Meeting payment
                          </h3>
                          <p className="text-xs sm:text-[13px] text-[#64748B] mt-1 font-normal">
                            Secure and powered by Stripe.
                          </p>
                        </div>

                        {/* Strategy Call Pill */}
                        <div className="relative z-10 inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl bg-white/92 backdrop-blur-md border border-slate-100/90 shadow-2xs mt-3.5 mx-auto">
                          <img src="/icon-scheduling-3d.png" alt="Strategy Call" className="w-7 h-7 object-contain shrink-0" />
                          <div className="text-left">
                            <span className="text-xs sm:text-sm font-semibold text-[#0F172A] block leading-tight">
                              Strategy Call
                            </span>
                            <span className="text-[11px] text-[#64748B] font-normal block">
                              Thu, Oct 14 · 1 hour
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Amount Card with live counting animation */}
                      <div className="w-full bg-white rounded-3xl p-4 sm:p-5 border border-slate-100 shadow-2xs text-center relative z-10">
                        <span className="text-[10px] sm:text-[11px] font-semibold text-[#94A3B8] uppercase tracking-widest block mb-1">
                          AMOUNT
                        </span>
                        <span className="text-4xl sm:text-[44px] font-semibold text-[#0F172A] tracking-tight block my-0.5 tabular-nums">
                          ${displayAmount}
                        </span>
                      </div>

                      {/* Stripe Secure Banner Row */}
                      <div className="w-full bg-[#F8FAFC] rounded-2xl p-2.5 sm:p-3 border border-slate-100 flex items-center justify-between text-xs relative z-10 shadow-2xs">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-xl bg-[#635BFF] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                            S
                          </div>
                          <div className="text-left">
                            <span className="block font-medium text-[#0F172A] leading-tight text-xs">Powered by Stripe</span>
                            <span className="text-[10px] text-[#64748B] font-normal">Secure payment processing</span>
                          </div>
                        </div>
                        <div className="px-2.5 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0]/60 text-[#059669] text-[11px] font-medium flex items-center gap-1.5 shrink-0">
                          <Lock className="w-3 h-3 stroke-[2.5]" />
                          <span>Secure</span>
                        </div>
                      </div>

                      {/* CTA Pay Button (Solid Brand Blue, Zero Drop Shadow, Active Scale) */}
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.96 }}
                        onClick={() => {
                          setManualPaid(true);
                          handleSeek(15.6);
                        }}
                        className="w-full py-3.5 px-4 rounded-2xl bg-[#0055FF] hover:bg-blue-600 text-white font-medium text-sm flex items-center justify-center gap-2 border border-[#0055FF] shadow-none active:scale-[0.96] transition-colors duration-150 cursor-pointer relative z-10"
                      >
                        <span>Pay ${displayAmount}</span>
                        <span>→</span>
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="payment-complete"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="w-full h-full flex flex-col items-center justify-center flex-1 py-2 text-center select-none"
                    >
                      <div className="flex flex-col items-center w-full max-w-[340px] mx-auto my-auto">
                        {/* Bouncy Morphing Check Badge with Organic Elastic Physics */}
                        <div className="relative mb-3 sm:mb-3.5 flex items-center justify-center">
                          {/* Ambient Pulse Ripple */}
                          <motion.div
                            initial={{ scale: 0.7, opacity: 0.8 }}
                            animate={{ scale: [0.7, 1.45, 1.6], opacity: [0.8, 0.3, 0] }}
                            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], times: [0, 0.6, 1] }}
                            className="absolute inset-0 rounded-full bg-[#10B981]/25 pointer-events-none -z-10"
                          />
                          
                          <motion.div
                            initial={{ scale: 0.35, opacity: 0, rotate: -25 }}
                            animate={{ scale: [0.35, 1.22, 0.94, 1.04, 1], opacity: 1, rotate: [-25, 6, -2, 0] }}
                            transition={{ duration: 0.75, ease: [0.34, 1.56, 0.64, 1] }}
                            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-b from-[#ECFDF5] to-[#D1FAE5] text-[#059669] flex items-center justify-center border border-[#A7F3D0] shadow-[0_8px_24px_rgba(16,185,129,0.18)] relative"
                          >
                            <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none">
                              <motion.path
                                d="M5 13.2l4.2 4.3L19 7.5"
                                stroke="#059669"
                                strokeWidth={2.75}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{
                                  pathLength: { duration: 0.38, delay: 0.14, ease: [0.23, 1, 0.32, 1] },
                                  opacity: { duration: 0.08, delay: 0.12 }
                                }}
                              />
                            </svg>
                          </motion.div>
                        </div>

                        {/* Morphing Bouncy Heading */}
                        <motion.h3
                          initial={{ opacity: 0, y: 18, scale: 0.85, filter: "blur(8px)", letterSpacing: "0.06em" }}
                          animate={{ opacity: 1, y: 0, scale: [0.85, 1.08, 0.97, 1], filter: "blur(0px)", letterSpacing: "-0.025em" }}
                          transition={{ duration: 0.68, delay: 0.12, ease: [0.34, 1.56, 0.64, 1] }}
                          className="text-2xl sm:text-[28px] font-semibold text-[#0F172A] tracking-tight will-change-transform"
                        >
                          Payment complete
                        </motion.h3>

                        {/* Morphing Bouncy Amount */}
                        <motion.span
                          initial={{ opacity: 0, y: 22, scale: 0.8, filter: "blur(10px)" }}
                          animate={{ opacity: 1, y: 0, scale: [0.8, 1.14, 0.95, 1.02, 1], filter: "blur(0px)" }}
                          transition={{ duration: 0.72, delay: 0.22, ease: [0.34, 1.56, 0.64, 1] }}
                          className="text-4xl sm:text-[46px] font-semibold text-[#0F172A] tracking-tight block mt-1.5 sm:mt-2 tabular-nums will-change-transform"
                        >
                          $360.00
                        </motion.span>

                        {/* Invoice Confirmation Badge / Card: Smoothly Centered */}
                        <motion.div
                          initial={{ opacity: 0, y: 28, scale: 0.92, filter: "blur(4px)" }}
                          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                          transition={{
                            type: "spring",
                            stiffness: 280,
                            damping: 24,
                            mass: 0.8,
                            delay: 0.32
                          }}
                          className="w-full bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.03)] flex items-center justify-between text-left relative z-10 mt-5 sm:mt-6 will-change-transform"
                        >
                          <div>
                            <span className="block text-sm font-medium text-slate-900 leading-tight">
                              Invoice sent
                            </span>
                            <span className="text-xs text-slate-500 font-normal mt-0.5 block">
                              To your email
                            </span>
                          </div>

                          <div className="px-3.5 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0]/80 text-[#059669] text-xs font-medium flex items-center gap-1.5 shadow-2xs">
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span>Paid</span>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              );
            })()}

          </AnimatePresence>
        </div>

        {/* ========================================================= */}
        {/* FLOATING MEDIA PLAYER CONTROLLER BAR                     */}
        {/* ========================================================= */}
        <div className="w-full max-w-[460px] mx-auto mt-4 z-20">
          <div className="bg-slate-950/85 backdrop-blur-2xl border border-white/20 rounded-2xl p-3 sm:p-3.5 shadow-[0_16px_40px_rgba(0,15,45,0.45)] text-white flex flex-col gap-2.5">
            {/* Top Row: Scene indicators & Timecode */}
            <div className="flex items-center justify-between text-xs px-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="font-medium text-white/95 text-xs">
                  {PRODUCT_STAGES[stageIndex].label}
                </span>
                <span className="text-[10px] font-mono text-white/60 px-1.5 py-0.5 rounded bg-white/10">
                  Step 0{stageIndex + 1}/04
                </span>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-white/70">
                <span className="text-white font-medium tabular-nums">{formatTime(currentTime)}</span>
                <span className="text-white/40">/</span>
                <span className="tabular-nums">{formatTime(TOTAL_DURATION)}</span>
              </div>
            </div>

            {/* Middle Row: Scrubber Timeline Slider with Stage markers */}
            <div className="relative flex flex-col px-0.5 group/scrub">
              <input
                type="range"
                min={0}
                max={TOTAL_DURATION}
                step={0.02}
                value={currentTime}
                onChange={(e) => handleSeek(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer accent-blue-400 focus:outline-none"
              />
              {/* Visual Stage Ticks */}
              <div className="w-full flex justify-between mt-1 text-[9px] font-mono text-white/40 select-none">
                <span>0s (Booking)</span>
                <span>4.0s (Velie)</span>
                <span>8.5s (Recaps)</span>
                <span>12.5s (Pay)</span>
                <span>16.5s</span>
              </div>
            </div>

            {/* Bottom Controls Row: Play/Pause, Steps, Speed, Replay */}
            <div className="flex items-center justify-between pt-0.5">
              <div className="flex items-center gap-1 sm:gap-1.5">
                {/* Play / Pause */}
                <button
                  type="button"
                  onClick={togglePlay}
                  className="w-8 h-8 rounded-full bg-white text-slate-900 flex items-center justify-center hover:bg-blue-50 active:scale-[0.92] transition-transform shadow-md cursor-pointer"
                  title={isPlaying ? "Pause (Space)" : "Play (Space)"}
                >
                  {isPlaying ? (
                    <Pause className="w-3.5 h-3.5 fill-current" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-current translate-x-0.5" />
                  )}
                </button>

                {/* Skip Prev Scene */}
                <button
                  type="button"
                  onClick={handlePrevScene}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 active:scale-[0.92] text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Previous Stage"
                >
                  <SkipBack className="w-3 h-3" />
                </button>

                {/* Skip Next Scene */}
                <button
                  type="button"
                  onClick={handleNextScene}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 active:scale-[0.92] text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Next Stage"
                >
                  <SkipForward className="w-3 h-3" />
                </button>

                {/* Replay */}
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 active:scale-[0.92] text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Reset to 0:00"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>

              {/* Stage Fast Jump Buttons */}
              <div className="hidden sm:flex items-center gap-1 bg-white/10 p-0.5 rounded-lg text-[10px]">
                {PRODUCT_STAGES.map((stage) => (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => handleTabClick(stage.id)}
                    className={`px-2 py-0.5 rounded transition-all cursor-pointer font-medium ${
                      activeTab === stage.id
                        ? 'bg-blue-500 text-white shadow-xs'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {stage.badge}
                  </button>
                ))}
              </div>

              {/* Speed & Loop Controls */}
              <div className="flex items-center gap-1 sm:gap-1.5">
                {/* Speed toggle */}
                <button
                  type="button"
                  onClick={cycleSpeed}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-mono font-medium transition-colors cursor-pointer ${
                    speed !== 1 ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30' : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                  title="Playback speed (0.25x slow-mo, 0.5x, 1x, 2x)"
                >
                  {speed}x
                </button>

                {/* Loop toggle */}
                <button
                  type="button"
                  onClick={() => setIsLooping(!isLooping)}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-medium transition-colors cursor-pointer ${
                    isLooping ? 'bg-blue-500/30 text-blue-300 border border-blue-400/40' : 'bg-white/5 text-white/40'
                  }`}
                  title="Toggle continuous looping"
                >
                  Loop
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
