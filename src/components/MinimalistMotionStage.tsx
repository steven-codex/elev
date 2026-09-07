import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  Sparkles,
  CreditCard,
  Check,
  Play,
  Clock,
  CheckCircle2,
  Mail
} from 'lucide-react';

type StageType = 'scheduling' | 'velie' | 'notetaker' | 'payments';

interface StageMeta {
  id: StageType;
  label: string;
  step: string;
  badge: string;
  icon: any;
  duration: number; // in seconds
  startTime: number;
}

const STAGES: StageMeta[] = [
  { id: 'scheduling', label: 'Smart Booking', step: '01', badge: 'Automated Calendar', icon: Calendar, duration: 3.60, startTime: 0 },
  { id: 'velie', label: 'Velie AI Copilot', step: '02', badge: 'Executive Assistant', icon: Sparkles, duration: 3.60, startTime: 3.60 },
  { id: 'notetaker', label: 'Instant Recaps', step: '03', badge: 'Live Transcription', icon: Clock, duration: 3.60, startTime: 7.20 },
  { id: 'payments', label: 'Upfront Pay', step: '04', badge: 'Stripe Secured', icon: CreditCard, duration: 3.60, startTime: 10.80 }
];

const TOTAL_LOOP_TIME = 14.4; // Relaxed & comfortable pacing matching Section 1 (14.4s)

export default function MinimalistMotionStage() {
  const [elapsed, setElapsed] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Micro-interaction states across multi-scenes
  // Stage 1: Scheduling
  const [dateSelected, setDateSelected] = useState(false);
  const [timeSelected, setTimeSelected] = useState(false);

  // Stage 2: Velie
  const [typedMsg, setTypedMsg] = useState('');
  const [velieThinking, setVelieThinking] = useState(false);

  // Stage 3: Notetaker
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [task1Checked, setTask1Checked] = useState(false);
  const [task2Checked, setTask2Checked] = useState(false);

  // Stage 4: Payments (Section 1 Pay Tab Signature Controls)
  const [depositToggleOn, setDepositToggleOn] = useState(false);
  const [isBundleSelected, setIsBundleSelected] = useState(false);

  const animFrame = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());

  // Derive current stage
  let currentStage: StageMeta = STAGES[0];
  for (let i = STAGES.length - 1; i >= 0; i--) {
    if (elapsed >= STAGES[i].startTime) {
      currentStage = STAGES[i];
      break;
    }
  }

  // Self-looping animation clock (Pauses on hover for user interaction)
  useEffect(() => {
    const loop = (now: number) => {
      const delta = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      if (!isPaused) {
        setElapsed((prev) => {
          const next = prev + delta;
          return next >= TOTAL_LOOP_TIME ? 0 : next;
        });
      }

      animFrame.current = requestAnimationFrame(loop);
    };

    lastTimeRef.current = performance.now();
    animFrame.current = requestAnimationFrame(loop);

    return () => {
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, [isPaused]);

  // Handle manual stage click
  const handleSelectStage = (stage: StageMeta) => {
    setElapsed(stage.startTime + 0.05);
  };

  // Choreograph precise sub-scene states following Section 1 Pay Tab motion cadence
  useEffect(() => {
    // Stage 1: Smart Booking (0s - 3.60s)
    if (elapsed < 3.60) {
      const t = elapsed;
      if (t < 1.20) {
        setDateSelected(false);
        setTimeSelected(false);
      } else if (t < 2.40) {
        setDateSelected(true);
        setTimeSelected(t >= 1.80);
      } else {
        setDateSelected(true);
        setTimeSelected(true);
      }
    }
    // Stage 2: Velie AI (3.60s - 7.20s)
    else if (elapsed < 7.20) {
      const t = elapsed - 3.60;
      const prompt = "Velie, find 30m with Steven this Thursday.";
      if (t < 1.20) {
        setTypedMsg('');
        setVelieThinking(false);
      } else if (t < 2.40) {
        const progress = Math.min(prompt.length, Math.floor(((t - 1.20) / 0.9) * prompt.length));
        setTypedMsg(prompt.slice(0, progress));
        setVelieThinking(t >= 1.80);
      } else {
        setTypedMsg(prompt);
        setVelieThinking(false);
      }
    }
    // Stage 3: Notetaker (7.20s - 10.80s)
    else if (elapsed < 10.80) {
      const t = elapsed - 7.20;
      if (t < 1.20) {
        setIsPlayingAudio(true);
        setTask1Checked(false);
        setTask2Checked(false);
      } else if (t < 2.40) {
        setIsPlayingAudio(true);
        setTask1Checked(true);
        setTask2Checked(t >= 1.80);
      } else {
        setIsPlayingAudio(true);
        setTask1Checked(true);
        setTask2Checked(true);
      }
    }
    // Stage 4: Payments (10.80s - 14.40s)
    else {
      const t = elapsed - 10.80;
      if (t < 1.20) {
        setDepositToggleOn(t >= 0.60);
        setIsBundleSelected(false);
      } else if (t < 2.40) {
        setDepositToggleOn(true);
        setIsBundleSelected(t >= 1.80);
      } else {
        setDepositToggleOn(true);
        setIsBundleSelected(true);
      }
    }
  }, [elapsed]);

  // Determine specific sub-scene key for vertical conveyor transitions
  const getSubSceneKey = () => {
    if (elapsed < 1.20) return 'sched-1';
    if (elapsed < 2.40) return 'sched-2';
    if (elapsed < 3.60) return 'sched-3';

    if (elapsed < 4.80) return 'velie-1';
    if (elapsed < 6.00) return 'velie-2';
    if (elapsed < 7.20) return 'velie-3';

    if (elapsed < 8.40) return 'note-1';
    if (elapsed < 9.60) return 'note-2';
    if (elapsed < 10.80) return 'note-3';

    if (elapsed < 12.00) return 'pay-1';
    if (elapsed < 13.20) return 'pay-2';
    return 'pay-3';
  };

  const subSceneKey = getSubSceneKey();

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full h-full min-h-[440px] sm:min-h-[480px] flex flex-col justify-between p-5 sm:p-7 bg-white/40 backdrop-blur-3xl rounded-[28px] sm:rounded-[36px] border border-white/90 shadow-[0_20px_60px_rgba(0,85,255,0.06),0_1px_3px_rgba(0,0,0,0.03),inset_0_1.5px_1.5px_rgba(255,255,255,0.9)] select-none overflow-hidden"
    >
      {/* Specular Gloss Reflection Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-blue-500/5 pointer-events-none rounded-[28px] sm:rounded-[36px]" />

      {/* Ambient Glass Glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-400/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Floating Product Pill Bar (Clean, Proportional & Free of Any Overflow) */}
      <div className="relative z-10 flex flex-col items-center justify-center pb-3 mb-2 border-b border-slate-200/50">
        
        {/* Floating Product Switcher Buttons */}
        <div className="inline-flex items-center gap-1 sm:gap-1.5 p-1.5 rounded-full bg-white/70 backdrop-blur-2xl shadow-xs border border-white/90 ring-1 ring-black/[0.03] relative max-w-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {STAGES.map((s) => {
            const Icon = s.icon;
            const active = currentStage.id === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => handleSelectStage(s)}
                className={`relative flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-colors duration-200 cursor-pointer active:scale-[0.96] z-10 shrink-0 ${
                  active ? 'text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
                title={s.label}
              >
                {active && (
                  <motion.div
                    layoutId="activeProductStagePill"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    className="absolute inset-0 bg-[#0055FF] rounded-full shadow-sm -z-10"
                  />
                )}
                <Icon className="w-4 h-4 shrink-0" />
                <span className="tabular-nums opacity-75 text-[11px] sm:text-xs font-mono">{s.step}</span>
                <span className="whitespace-nowrap hidden sm:inline">{s.label}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Main Living UI Stage Area - Proportional & Scaled Efficiently */}
      <div className="relative z-10 flex-1 flex items-center justify-center py-2 min-h-[300px]">
        <div className="w-full max-w-2xl relative min-h-[260px] flex items-center justify-center">

          <AnimatePresence mode="popLayout">
            {/* ==================================================== */}
            {/* STAGE 1: SMART BOOKING CONVEYOR SCENES               */}
            {/* ==================================================== */}
            {subSceneKey === 'sched-1' && (
              <motion.div
                key="sched-1"
                initial={{ y: 60, opacity: 0, scale: 0.97 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -80, opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="absolute w-full bg-white/80 backdrop-blur-3xl rounded-3xl p-6 sm:p-8 border border-white/95 shadow-[0_20px_50px_rgba(0,85,255,0.07),inset_0_1.5px_1.5px_rgba(255,255,255,0.95)] text-slate-800 space-y-5"
              >
                <div className="flex items-center justify-between pb-4 border-b border-slate-100/80">
                  <div>
                    <h4 className="font-bold text-xl sm:text-2xl text-[#0A0D14] tracking-tight">Product Strategy & Architecture</h4>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">30 min · Auto-conflict calendar protection</p>
                  </div>
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-sm flex items-center justify-center shadow-md shrink-0 ring-3 ring-blue-100">
                    SC
                  </div>
                </div>

                <div className="bg-white/70 backdrop-blur-2xl border border-white/80 rounded-2xl p-4.5 sm:p-5 flex items-center justify-between text-sm sm:text-base text-slate-800 shadow-2xs">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-[#0055FF]" />
                    <span className="font-bold text-slate-900">3 Calendars Connected</span>
                  </div>
                  <span className="text-xs font-mono font-bold bg-[#0055FF] text-white px-3.5 py-1 rounded-full shadow-xs">
                    Zero Overlaps
                  </span>
                </div>

                <div className="flex items-center justify-between px-1 text-xs sm:text-sm text-slate-500 font-mono">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                    Google Cal · Outlook · iCloud
                  </span>
                  <span className="text-slate-400 font-semibold">All synced</span>
                </div>
              </motion.div>
            )}

            {subSceneKey === 'sched-2' && (
              <motion.div
                key="sched-2"
                initial={{ y: 60, opacity: 0, scale: 0.97 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -80, opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="absolute w-full bg-white/80 backdrop-blur-3xl rounded-3xl p-6 sm:p-8 border border-white/95 shadow-[0_20px_50px_rgba(0,85,255,0.07),inset_0_1.5px_1.5px_rgba(255,255,255,0.95)] text-slate-800 space-y-5"
              >
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <h4 className="font-bold text-xl sm:text-2xl text-[#0A0D14] tracking-tight">Select Meeting Time</h4>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                    Oct 2026
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 relative">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2 font-mono">Select Day</span>
                    <div className="grid grid-cols-2 gap-2.5">
                      {['Oct 13', 'Oct 14'].map((d) => (
                        <div
                          key={d}
                          className={`p-3 sm:p-3.5 rounded-xl text-center text-xs sm:text-sm font-bold transition-colors duration-200 border ${
                            d === 'Oct 14' && dateSelected
                              ? 'bg-[#0055FF] text-white border-[#0055FF] shadow-xs scale-[1.02]'
                              : 'bg-white/80 text-slate-600 border-slate-200/80'
                          }`}
                        >
                          {d}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2 font-mono">Select Time</span>
                    <div className="space-y-2.5">
                      {['10:00 AM', '02:00 PM'].map((slot) => (
                        <div
                          key={slot}
                          className={`px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between border transition-colors duration-200 ${
                            slot === '02:00 PM' && timeSelected
                              ? 'bg-[#0055FF] text-white border-[#0055FF] shadow-xs scale-[1.02]'
                              : 'bg-white/80 text-slate-600 border-slate-200/80'
                          }`}
                        >
                          <span>{slot}</span>
                          <span className="text-[11px] opacity-80 font-mono">30m</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {subSceneKey === 'sched-3' && (
              <motion.div
                key="sched-3"
                initial={{ y: 60, opacity: 0, scale: 0.97 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -80, opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="absolute w-full bg-white/80 backdrop-blur-3xl rounded-3xl p-6 sm:p-8 border border-white/95 shadow-[0_20px_50px_rgba(0,85,255,0.07),inset_0_1.5px_1.5px_rgba(255,255,255,0.95)] text-slate-800 space-y-5"
              >
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <h4 className="font-bold text-xl sm:text-2xl text-[#0A0D14] tracking-tight">Calendar Invites Dispatched</h4>
                  </div>
                  <div className="w-11 h-11 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                </div>

                <div className="bg-white/70 backdrop-blur-2xl border border-white/80 shadow-xs rounded-2xl p-4.5 sm:p-5 space-y-2 text-sm sm:text-base text-slate-800">
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-slate-900">Thursday, Oct 14 at 2:00 PM</span>
                    <span className="text-xs font-mono font-bold bg-emerald-600 text-white px-3 py-1 rounded-full shadow-xs">
                      Google Calendar
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Zoom meeting link generated and sent to all 3 attendees. Zero back-and-forth ping pong.
                  </p>
                </div>
              </motion.div>
            )}

            {/* ==================================================== */}
            {/* STAGE 2: VELIE AI COPILOT CONVEYOR SCENES             */}
            {/* ==================================================== */}
            {subSceneKey === 'velie-1' && (
              <motion.div
                key="velie-1"
                initial={{ y: 60, opacity: 0, scale: 0.97 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -80, opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="absolute w-full bg-white/80 backdrop-blur-3xl rounded-3xl p-6 sm:p-8 border border-white/95 shadow-[0_20px_50px_rgba(0,85,255,0.07),inset_0_1.5px_1.5px_rgba(255,255,255,0.95)] text-slate-800 space-y-5"
              >
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-600 border border-amber-300/40 flex items-center justify-center">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg sm:text-xl text-[#0A0D14]">Velie Executive AI</h4>
                      <p className="text-xs text-slate-500 font-medium">Incoming Email Request</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold bg-amber-600 text-white px-3 py-1 rounded-full shadow-xs">
                    cc: velie@elev.io
                  </span>
                </div>

                <div className="bg-white/70 backdrop-blur-2xl border border-white/80 shadow-xs p-4.5 sm:p-5 rounded-2xl space-y-1.5">
                  <span className="text-slate-500 text-xs font-bold block">From: sarah@acme.com</span>
                  <p className="text-slate-700 text-xs sm:text-sm italic leading-relaxed">
                    "Hey Steven, let's connect for 30m this Thursday to review the roadmap design specs."
                  </p>
                </div>
              </motion.div>
            )}

            {subSceneKey === 'velie-2' && (
              <motion.div
                key="velie-2"
                initial={{ y: 60, opacity: 0, scale: 0.97 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -80, opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="absolute w-full bg-white/80 backdrop-blur-3xl rounded-3xl p-6 sm:p-8 border border-white/95 shadow-[0_20px_50px_rgba(0,85,255,0.07),inset_0_1.5px_1.5px_rgba(255,255,255,0.95)] text-slate-800 space-y-5"
              >
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-600 border border-amber-300/40 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-amber-600 animate-spin-slow" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg sm:text-xl text-[#0A0D14]">Velie Executive AI</h4>
                      <p className="text-xs text-slate-500 font-medium">Autonomous Negotiation Thread</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold bg-amber-600 text-white px-3 py-1 rounded-full shadow-xs">
                    Solving Constraints
                  </span>
                </div>

                <div className="space-y-3 min-h-[100px]">
                  {typedMsg && (
                    <div className="flex justify-end">
                      <div className="bg-[#0055FF] text-white text-xs sm:text-sm px-4.5 py-2.5 rounded-xl rounded-tr-xs shadow-xs font-medium">
                        {typedMsg}
                      </div>
                    </div>
                  )}

                  {velieThinking && (
                    <div className="text-xs sm:text-sm text-slate-600 flex items-center gap-2.5 font-mono font-semibold pt-1">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                      <span>Checking mutual calendar constraints & timezone rules...</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {subSceneKey === 'velie-3' && (
              <motion.div
                key="velie-3"
                initial={{ y: 60, opacity: 0, scale: 0.97 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -80, opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="absolute w-full bg-white/80 backdrop-blur-3xl rounded-3xl p-6 sm:p-8 border border-white/95 shadow-[0_20px_50px_rgba(0,85,255,0.07),inset_0_1.5px_1.5px_rgba(255,255,255,0.95)] text-slate-800 space-y-5"
              >
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-600 border border-emerald-300/40 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg sm:text-xl text-[#0A0D14]">Velie Executive AI</h4>
                      <p className="text-xs text-slate-500 font-medium">Meeting Locked & Confirmed</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold bg-emerald-600 text-white px-3 py-1 rounded-full shadow-xs">
                    Done
                  </span>
                </div>

                <div className="bg-white/70 backdrop-blur-2xl border border-white/80 shadow-xs text-slate-800 text-xs sm:text-sm p-4.5 sm:p-5 rounded-2xl space-y-1.5">
                  <span className="text-emerald-700 font-bold text-xs sm:text-sm block">✓ Zero Email Ping-Pong</span>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Booked <strong className="text-slate-900">Thursday at 2:00 PM</strong>. Both calendars updated automatically.
                  </p>
                </div>
              </motion.div>
            )}

            {/* ==================================================== */}
            {/* STAGE 3: INSTANT RECAPS CONVEYOR SCENES              */}
            {/* ==================================================== */}
            {subSceneKey === 'note-1' && (
              <motion.div
                key="note-1"
                initial={{ y: 60, opacity: 0, scale: 0.97 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -80, opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="absolute w-full bg-white/80 backdrop-blur-3xl rounded-3xl p-6 sm:p-8 border border-white/95 shadow-[0_20px_50px_rgba(0,85,255,0.07),inset_0_1.5px_1.5px_rgba(255,255,255,0.95)] text-slate-800 space-y-5"
              >
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <h4 className="font-bold text-xl sm:text-2xl text-[#0A0D14] tracking-tight">Sprint Architecture Sync</h4>
                  </div>

                  <div className="flex items-center gap-2.5 bg-purple-600 text-white px-4 py-1.5 rounded-full shadow-xs">
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <Play className="w-3 h-3 fill-white ml-0.5" />
                    </div>
                    <div className="flex items-center gap-1 h-6">
                      {[12, 22, 16, 26, 14].map((h, i) => (
                        <motion.span
                          key={i}
                          animate={{ height: isPlayingAudio ? [4, h, 4] : [4, h * 0.7, 4] }}
                          transition={{
                            duration: 0.45,
                            repeat: Infinity,
                            repeatType: 'reverse',
                            delay: i * 0.08,
                            ease: 'easeInOut'
                          }}
                          className="w-1 rounded-full bg-white shadow-2xs inline-block"
                        />
                      ))}
                    </div>
                    <span className="text-xs font-mono font-bold ml-0.5">Live</span>
                  </div>
                </div>

                <div className="bg-white/70 backdrop-blur-2xl border border-white/80 shadow-xs p-4.5 sm:p-5 rounded-2xl text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                  "Let's finalize the database schema migration and broadcast the release notes..."
                </div>
              </motion.div>
            )}

            {subSceneKey === 'note-2' && (
              <motion.div
                key="note-2"
                initial={{ y: 60, opacity: 0, scale: 0.97 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -80, opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="absolute w-full bg-white/80 backdrop-blur-3xl rounded-3xl p-6 sm:p-8 border border-white/95 shadow-[0_20px_50px_rgba(0,85,255,0.07),inset_0_1.5px_1.5px_rgba(255,255,255,0.95)] text-slate-800 space-y-5"
              >
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <h4 className="font-bold text-xl sm:text-2xl text-[#0A0D14] tracking-tight">AI Extracted Tasks</h4>
                  </div>
                  <span className="text-xs font-mono font-bold bg-purple-600 text-white px-3 py-1 rounded-full shadow-xs">
                    2 Tasks Found
                  </span>
                </div>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div
                    className={`p-4 sm:p-4.5 rounded-xl border flex items-center justify-between transition-colors duration-200 ${
                      task1Checked ? 'bg-slate-50/90 border-slate-200 text-slate-900 font-medium scale-[1.01]' : 'bg-white/80 border-slate-200/80 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${task1Checked ? 'bg-emerald-600 text-white' : 'border border-slate-300'}`}>
                        {task1Checked && '✓'}
                      </span>
                      <span className="text-sm sm:text-base">Push final API schemas</span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">Sarah</span>
                  </div>

                  <div
                    className={`p-4 sm:p-4.5 rounded-xl border flex items-center justify-between transition-colors duration-200 ${
                      task2Checked ? 'bg-slate-50/90 border-slate-200 text-slate-900 font-medium scale-[1.01]' : 'bg-white/80 border-slate-200/80 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${task2Checked ? 'bg-emerald-600 text-white' : 'border border-slate-300'}`}>
                        {task2Checked && '✓'}
                      </span>
                      <span className="text-sm sm:text-base">Sync task summary to Slack</span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">Steven</span>
                  </div>
                </div>
              </motion.div>
            )}

            {subSceneKey === 'note-3' && (
              <motion.div
                key="note-3"
                initial={{ y: 60, opacity: 0, scale: 0.97 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -80, opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="absolute w-full bg-white/80 backdrop-blur-3xl rounded-3xl p-6 sm:p-8 border border-white/95 shadow-[0_20px_50px_rgba(0,85,255,0.07),inset_0_1.5px_1.5px_rgba(255,255,255,0.95)] text-slate-800 space-y-5"
              >
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <h4 className="font-bold text-xl sm:text-2xl text-[#0A0D14] tracking-tight">Recaps Broadcasted</h4>
                  </div>
                  <div className="w-11 h-11 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                </div>

                <div className="bg-white/70 backdrop-blur-2xl border border-white/80 shadow-xs rounded-2xl p-4.5 sm:p-5 space-y-1.5 text-xs sm:text-sm text-slate-800">
                  <span className="font-bold block text-slate-900 text-sm sm:text-base">✓ Sent to 5 attendees</span>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Meeting notes & action items automatically synced to Notion & Slack #dev-sync channel.
                  </p>
                </div>
              </motion.div>
            )}

            {/* ==================================================== */}
            {/* STAGE 4: UPFRONT PAY CONVEYOR SCENES                 */}
            {/* ==================================================== */}
            {subSceneKey === 'pay-1' && (
              <motion.div
                key="pay-1"
                initial={{ y: 60, opacity: 0, scale: 0.97 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -80, opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="absolute w-full bg-white/80 backdrop-blur-3xl rounded-3xl p-6 sm:p-8 border border-white/95 shadow-[0_20px_50px_rgba(0,85,255,0.07),inset_0_1.5px_1.5px_rgba(255,255,255,0.95)] text-slate-800 space-y-5"
              >
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <h4 className="font-bold text-xl sm:text-2xl text-[#0A0D14] tracking-tight">Payment Control Switch</h4>
                  </div>
                  <span className="text-xs font-mono font-bold text-white bg-slate-900 px-3 py-1 rounded-full shadow-xs">
                    Stripe
                  </span>
                </div>

                {/* Section 1 Pay Tab Signature Spring Toggle Knob Card */}
                <div className="bg-slate-50/90 p-5 sm:p-6 rounded-2xl border border-slate-200/90 flex items-center justify-between">
                  <span className="text-sm sm:text-base font-bold text-slate-900">Require upfront deposit to book</span>
                  <motion.div
                    animate={{ scale: depositToggleOn ? [0.94, 1.06, 1] : 1 }}
                    className={`w-16 h-9 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                      depositToggleOn ? 'bg-emerald-600 justify-end' : 'bg-slate-300 justify-start'
                    }`}
                  >
                    <motion.div
                      layout
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className="w-7 h-7 rounded-full bg-white shadow-md"
                    />
                  </motion.div>
                </div>
              </motion.div>
            )}

            {subSceneKey === 'pay-2' && (
              <motion.div
                key="pay-2"
                initial={{ y: 60, opacity: 0, scale: 0.97 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -80, opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="absolute w-full bg-white/80 backdrop-blur-3xl rounded-3xl p-6 sm:p-8 border border-white/95 shadow-[0_20px_50px_rgba(0,85,255,0.07),inset_0_1.5px_1.5px_rgba(255,255,255,0.95)] text-slate-800 space-y-5"
              >
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <h4 className="font-bold text-xl sm:text-2xl text-[#0A0D14] tracking-tight">Advisory Retainer</h4>
                  </div>
                  <span className="font-bold text-3xl sm:text-4xl text-[#0A0D14] tabular-nums font-mono">
                    {isBundleSelected ? '$360' : '$150'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className={`p-4 rounded-xl border font-bold transition-colors duration-200 text-xs sm:text-sm ${!isBundleSelected ? 'bg-[#0055FF] text-white border-[#0055FF] shadow-xs' : 'bg-white/80 border-slate-200/80 text-slate-600'}`}>
                    Single ($150)
                  </div>
                  <div className={`p-4 rounded-xl border font-bold transition-colors duration-200 text-xs sm:text-sm ${isBundleSelected ? 'bg-[#0055FF] text-white border-[#0055FF] shadow-xs scale-[1.02]' : 'bg-white/80 border-slate-200/80 text-slate-600'}`}>
                    Quarterly 3-Pack ($360)
                  </div>
                </div>
              </motion.div>
            )}

            {subSceneKey === 'pay-3' && (
              <motion.div
                key="pay-3"
                initial={{ y: 60, opacity: 0, scale: 0.97 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -80, opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="absolute w-full bg-white/80 backdrop-blur-3xl rounded-3xl p-6 sm:p-8 border border-white/95 shadow-[0_20px_50px_rgba(0,85,255,0.07),inset_0_1.5px_1.5px_rgba(255,255,255,0.95)] text-slate-800 space-y-5"
              >
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <h4 className="font-bold text-xl sm:text-2xl text-[#0A0D14] tracking-tight">Payment Complete</h4>
                  </div>
                  <div className="w-11 h-11 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                </div>

                <div className="bg-white/70 backdrop-blur-2xl border border-white/80 shadow-xs rounded-2xl p-4.5 sm:p-5 space-y-1.5 text-xs sm:text-sm text-slate-800">
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-slate-900 text-sm sm:text-base">Paid $360.00 USD</span>
                    <span className="text-xs text-slate-400 font-mono">•••• 4242</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Stripe payout settled instantly. Slot reserved on calendar & client receipt dispatched.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

      {/* Subtle Bottom Progress Ticker (Clean Glass Blue Line) */}
      <div className="relative z-10 w-full bg-slate-200/50 h-1.5 rounded-full overflow-hidden mt-3">
        <motion.div
          className="h-full bg-[#0055FF] rounded-full"
          style={{ width: `${(elapsed / TOTAL_LOOP_TIME) * 100}%` }}
        />
      </div>

    </div>
  );
}
