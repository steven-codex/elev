import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  Sparkles,
  FileText,
  CreditCard,
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  X,
  Check,
  ArrowRight,
  Volume2,
  Clock,
  Send,
  Zap,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { BorderBeam } from 'border-beam';

interface MotionUiVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SceneId = 'scheduling' | 'velie' | 'notetaker' | 'payments';

interface SceneConfig {
  id: SceneId;
  label: string;
  duration: number; // in seconds
  icon: typeof Calendar;
  color: string;
}

const SCENES: SceneConfig[] = [
  { id: 'scheduling', label: '1. Smart Booking', duration: 4.5, icon: Calendar, color: '#3B82F6' },
  { id: 'velie', label: '2. Velie AI Copilot', duration: 4.5, icon: Sparkles, color: '#F59E0B' },
  { id: 'notetaker', label: '3. Meeting Notetaker', duration: 4.5, icon: FileText, color: '#8B5CF6' },
  { id: 'payments', label: '4. Instant Payments', duration: 4.0, icon: CreditCard, color: '#10B981' },
];

const TOTAL_DURATION = SCENES.reduce((sum, s) => sum + s.duration, 0); // 17.5s

export default function MotionUiVideoModal({ isOpen, onClose }: MotionUiVideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [isLooping, setIsLooping] = useState(true);

  // Simulated UI internal micro-states
  // Scene 1 (Scheduling)
  const [schedDateSelected, setSchedDateSelected] = useState(false);
  const [schedTimeSelected, setSchedTimeSelected] = useState(false);
  const [schedConfirmed, setSchedConfirmed] = useState(false);

  // Scene 2 (Velie AI)
  const [typedPrompt, setTypedPrompt] = useState('');
  const [isVelieThinking, setIsVelieThinking] = useState(false);
  const [velieReplied, setVelieReplied] = useState(false);

  // Scene 3 (Notetaker)
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [checkedItem1, setCheckedItem1] = useState(false);
  const [checkedItem2, setCheckedItem2] = useState(false);

  // Scene 4 (Payments)
  const [packageType, setPackageType] = useState<'single' | 'bundle'>('single');
  const [payConfirmed, setPayConfirmed] = useState(false);

  // Virtual cursor coordinates
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50, clicking: false, visible: true });

  const animFrameRef = useRef<number | null>(null);
  const lastTickRef = useRef<number>(performance.now());

  // Derive active scene
  let accumulated = 0;
  let activeScene: SceneConfig = SCENES[0];
  let sceneProgress = 0;

  for (const scene of SCENES) {
    if (currentTime < accumulated + scene.duration) {
      activeScene = scene;
      sceneProgress = (currentTime - accumulated) / scene.duration;
      break;
    }
    accumulated += scene.duration;
  }
  if (currentTime >= TOTAL_DURATION) {
    activeScene = SCENES[SCENES.length - 1];
    sceneProgress = 1;
  }

  // Master Motion Timeline Driver
  useEffect(() => {
    if (!isOpen) return;

    const tick = (now: number) => {
      const delta = (now - lastTickRef.current) / 1000;
      lastTickRef.current = now;

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

      animFrameRef.current = requestAnimationFrame(tick);
    };

    lastTickRef.current = performance.now();
    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isOpen, isPlaying, speed, isLooping]);

  // Choreograph UI states based on exact currentTime
  useEffect(() => {
    // -------------------------------------------------------------
    // SCENE 1: SCHEDULING (0s - 4.5s)
    // -------------------------------------------------------------
    if (currentTime < 4.5) {
      const t = currentTime;
      // Reset later scene states
      setTypedPrompt('');
      setIsVelieThinking(false);
      setVelieReplied(false);
      setAudioPlaying(false);
      setCheckedItem1(false);
      setCheckedItem2(false);
      setPackageType('single');
      setPayConfirmed(false);

      if (t < 1.0) {
        setSchedDateSelected(false);
        setSchedTimeSelected(false);
        setSchedConfirmed(false);
        setCursorPos({ x: 30, y: 35, clicking: false, visible: true });
      } else if (t < 2.0) {
        // Cursor moves to date 'Oct 14' and clicks
        setCursorPos({ x: 42, y: 44, clicking: t > 1.7 && t < 2.0, visible: true });
        setSchedDateSelected(t >= 1.9);
      } else if (t < 3.2) {
        // Cursor moves to time '2:00 PM' and clicks
        setCursorPos({ x: 68, y: 52, clicking: t > 2.8 && t < 3.1, visible: true });
        setSchedTimeSelected(t >= 3.0);
      } else if (t < 4.5) {
        // Cursor moves to 'Confirm' button and clicks
        setCursorPos({ x: 55, y: 82, clicking: t > 3.6 && t < 3.9, visible: true });
        if (t >= 3.8 && !schedConfirmed) {
          setSchedConfirmed(true);
        }
      }
    }

    // -------------------------------------------------------------
    // SCENE 2: VELIE AI COPILOT (4.5s - 9.0s)
    // -------------------------------------------------------------
    else if (currentTime < 9.0) {
      const t = currentTime - 4.5;
      const fullText = "Velie, coordinate 30m with Steven this Thursday.";

      if (t < 0.5) {
        setTypedPrompt('');
        setIsVelieThinking(false);
        setVelieReplied(false);
        setCursorPos({ x: 45, y: 75, clicking: false, visible: true });
      } else if (t < 2.2) {
        // Type out text letter by letter
        const charProgress = Math.min(fullText.length, Math.floor(((t - 0.5) / 1.7) * fullText.length));
        setTypedPrompt(fullText.slice(0, charProgress));
        setCursorPos({ x: 88, y: 78, clicking: false, visible: true });
      } else if (t < 2.8) {
        setTypedPrompt(fullText);
        // Click send
        setCursorPos({ x: 88, y: 78, clicking: t > 2.4 && t < 2.7, visible: true });
        setIsVelieThinking(true);
      } else if (t < 4.5) {
        // AI replied
        setIsVelieThinking(false);
        setVelieReplied(true);
        setCursorPos({ x: 92, y: 40, clicking: false, visible: false });
      }
    }

    // -------------------------------------------------------------
    // SCENE 3: MEETING NOTETAKER (9.0s - 13.5s)
    // -------------------------------------------------------------
    else if (currentTime < 13.5) {
      const t = currentTime - 9.0;
      if (t < 1.0) {
        setAudioPlaying(false);
        setCheckedItem1(false);
        setCheckedItem2(false);
        // Cursor moves to Play button
        setCursorPos({ x: 26, y: 38, clicking: t > 0.6 && t < 0.9, visible: true });
      } else if (t < 2.2) {
        setAudioPlaying(true);
        // Cursor moves to Action Item 1
        setCursorPos({ x: 30, y: 64, clicking: t > 1.8 && t < 2.1, visible: true });
        setCheckedItem1(t >= 2.0);
      } else if (t < 3.5) {
        // Cursor moves to Action Item 2
        setCursorPos({ x: 30, y: 76, clicking: t > 3.0 && t < 3.3, visible: true });
        setCheckedItem2(t >= 3.2);
      } else {
        setCursorPos({ x: 90, y: 90, clicking: false, visible: false });
      }
    }

    // -------------------------------------------------------------
    // SCENE 4: PAYMENTS & BILLING (13.5s - 17.5s)
    // -------------------------------------------------------------
    else {
      const t = currentTime - 13.5;
      if (t < 1.2) {
        setPackageType('single');
        setPayConfirmed(false);
        // Cursor moves to 'Bundle' toggle
        setCursorPos({ x: 62, y: 36, clicking: t > 0.8 && t < 1.1, visible: true });
      } else if (t < 2.6) {
        setPackageType('bundle');
        // Cursor moves to 'Pay with Card'
        setCursorPos({ x: 50, y: 82, clicking: t > 2.1 && t < 2.4, visible: true });
      } else {
        if (!payConfirmed) {
          setPayConfirmed(true);
        }
        setCursorPos({ x: 50, y: 82, clicking: false, visible: false });
      }
    }
  }, [currentTime]);

  const jumpToScene = (sceneId: SceneId) => {
    let t = 0;
    for (const s of SCENES) {
      if (s.id === sceneId) break;
      t += s.duration;
    }
    setCurrentTime(t);
  };

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(parseFloat(e.target.value));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200">
      
      {/* Container 16:9 Video Canvas Wrapper */}
      <div className="relative w-full max-w-5xl bg-[#090D16] border border-slate-800/90 rounded-3xl shadow-2xl overflow-hidden flex flex-col aspect-auto lg:aspect-[16/10] max-h-[95vh]">
        
        {/* Top Video Header Bar */}
        <div className="px-6 py-4 border-b border-slate-800/80 bg-slate-900/50 flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md">
              <Play className="w-4 h-4 fill-white ml-0.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-normal text-white">elev Motion UI Showcase</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 font-normal uppercase tracking-wider">
                  Live Product Engine
                </span>
              </div>
              <p className="text-xs text-slate-400">Watch the actual elev components execute in sequence</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scene Navigation Ribbon */}
        <div className="px-6 py-2.5 bg-slate-950/60 border-b border-slate-800/60 flex items-center gap-2 overflow-x-auto scrollbar-none z-10">
          <span className="text-[11px] font-normal uppercase tracking-wider text-slate-500 mr-2 shrink-0">Scenes:</span>
          {SCENES.map((scene) => {
            const Icon = scene.icon;
            const isActive = activeScene.id === scene.id;
            return (
              <button
                key={scene.id}
                onClick={() => jumpToScene(scene.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-normal transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs shadow-blue-500/20'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{scene.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Product Canvas / Stage Area */}
        <div className="relative flex-1 p-6 sm:p-8 flex items-center justify-center bg-radial from-slate-900/60 via-[#070B13] to-[#04060A] overflow-hidden">
          
          {/* Ambient Lighting Orbs */}
          <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />

          {/* VIRTUAL GLIDING CURSOR */}
          {cursorPos.visible && (
            <motion.div
              className="absolute pointer-events-none z-50 transition-all duration-300 ease-out"
              style={{
                left: `${cursorPos.x}%`,
                top: `${cursorPos.y}%`,
                transform: 'translate(-2px, -2px)'
              }}
            >
              <div className="relative flex items-center">
                <svg
                  className={`w-6 h-6 text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] transition-transform duration-100 ${
                    cursorPos.clicking ? 'scale-75' : 'scale-100'
                  }`}
                  viewBox="0 0 24 24"
                  fill="#0284c7"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                >
                  <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
                </svg>
                {cursorPos.clicking && (
                  <span className="absolute -inset-2 rounded-full border-2 border-cyan-400 animate-ping" />
                )}
                <span className="ml-2 text-[10px] font-normal px-2 py-0.5 rounded-full bg-slate-900/90 text-cyan-300 border border-slate-700 shadow-md">
                  elev cursor
                </span>
              </div>
            </motion.div>
          )}

          {/* DYNAMIC SCENE CONTAINER */}
          <div className="w-full max-w-3xl">
            <AnimatePresence mode="wait">
              
              {/* ======================================================= */}
              {/* SCENE 1: REAL SMART SCHEDULING UI                       */}
              {/* ======================================================= */}
              {activeScene.id === 'scheduling' && (
                <motion.div
                  key="scene-sched"
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.98 }}
                  transition={{ duration: 0.35 }}
                  className="bg-white rounded-2xl p-6 sm:p-8 text-slate-800 shadow-xl border border-slate-200/80"
                >
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
                    <div>
                      <div className="inline-flex items-center gap-1.5 text-xs font-normal text-blue-600 mb-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Interactive Booking Engine</span>
                      </div>
                      <h3 className="text-xl font-normal text-slate-900">Product Strategy 1:1</h3>
                      <p className="text-xs text-slate-500">30 min • Google Meet • Auto-timezones</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 font-normal flex items-center justify-center text-sm border border-blue-100">
                      SC
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Date Picker */}
                    <div>
                      <span className="text-xs font-normal text-slate-700 block mb-3 uppercase tracking-wider">Select Day:</span>
                      <div className="grid grid-cols-4 gap-2">
                        {['Oct 12', 'Oct 13', 'Oct 14', 'Oct 15'].map((d) => (
                          <div
                            key={d}
                            className={`p-3 rounded-xl text-center text-xs font-normal transition-all border ${
                              d === 'Oct 14' && schedDateSelected
                                ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-300'
                                : 'bg-slate-50 text-slate-700 border-slate-200'
                            }`}
                          >
                            {d}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Time Slot Picker */}
                    <div>
                      <span className="text-xs font-normal text-slate-700 block mb-3 uppercase tracking-wider">Select Slot:</span>
                      <div className="flex flex-col gap-2">
                        {['10:30 AM', '02:00 PM', '04:30 PM'].map((slot) => (
                          <div
                            key={slot}
                            className={`px-4 py-2.5 rounded-xl text-xs font-normal flex items-center justify-between border transition-all ${
                              slot === '02:00 PM' && schedTimeSelected
                                ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                                : 'bg-slate-50 text-slate-700 border-slate-200'
                            }`}
                          >
                            <span>{slot}</span>
                            <span className="text-[10px] font-normal opacity-75">30 mins</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Confirmation Button */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500">Auto-synced with Google Calendar</span>
                    <div
                      className={`px-5 py-2.5 rounded-xl font-normal text-xs flex items-center gap-2 transition-all ${
                        schedConfirmed
                          ? 'bg-emerald-600 text-white shadow-md'
                          : schedTimeSelected
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {schedConfirmed ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Invite Dispatched!</span>
                        </>
                      ) : (
                        <span>Confirm Booking</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ======================================================= */}
              {/* SCENE 2: REAL VELIE AI ASSISTANT UI                    */}
              {/* ======================================================= */}
              {activeScene.id === 'velie' && (
                <motion.div
                  key="scene-velie"
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.98 }}
                  transition={{ duration: 0.35 }}
                  className="bg-[#0F172A] rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-indigo-500/30 relative"
                >
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center font-normal border border-amber-400/30">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-normal text-white">Velie Executive AI</h3>
                          <span className="text-[10px] uppercase font-normal px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300">
                            Autonomous
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">Listening to email CC & calendar events</p>
                      </div>
                    </div>
                    <span className="text-xs text-emerald-400 flex items-center gap-1.5 font-mono">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Active 24/7
                    </span>
                  </div>

                  {/* Chat Message Thread */}
                  <div className="space-y-4 mb-6 min-h-[160px]">
                    {/* User Prompt */}
                    {typedPrompt && (
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex justify-end"
                      >
                        <div className="bg-blue-600 text-white text-xs sm:text-sm px-4 py-2.5 rounded-2xl rounded-tr-xs max-w-[85%] shadow-sm">
                          {typedPrompt}
                        </div>
                      </motion.div>
                    )}

                    {/* Thinking Indicator */}
                    {isVelieThinking && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 text-xs text-amber-300/90 font-mono"
                      >
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                        <span>Velie is reviewing availability, conflicts & constraints...</span>
                      </motion.div>
                    )}

                    {/* Velie Response Card */}
                    {velieReplied && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="bg-slate-800/90 border border-indigo-500/40 text-slate-200 text-xs sm:text-sm p-4 rounded-2xl rounded-tl-xs max-w-[90%] shadow-lg space-y-2">
                          <div className="flex items-center gap-2 text-amber-300 font-normal text-xs">
                            <Check className="w-3.5 h-3.5" />
                            <span>Conflict Resolved Automatically</span>
                          </div>
                          <p>
                            I found a free 30-min opening without disrupting your deep work block. I've sent the calendar invite to both parties for <span className="text-white font-normal underline">Thursday at 2:00 PM</span>.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Chat Input Bar */}
                  <div className="flex items-center gap-2 p-2 bg-slate-950/80 border border-slate-800 rounded-xl">
                    <input
                      type="text"
                      readOnly
                      value={typedPrompt}
                      placeholder="Type a command or CC velie@elev.io..."
                      className="flex-1 bg-transparent border-none text-xs text-white px-3 focus:outline-hidden"
                    />
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                      <Send className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ======================================================= */}
              {/* SCENE 3: REAL AI NOTETAKER & AUDIO RECAP UI             */}
              {/* ======================================================= */}
              {activeScene.id === 'notetaker' && (
                <motion.div
                  key="scene-notetaker"
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.98 }}
                  transition={{ duration: 0.35 }}
                  className="bg-white rounded-2xl p-6 sm:p-8 text-slate-800 shadow-xl border border-purple-200/80"
                >
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                    <div>
                      <div className="inline-flex items-center gap-1.5 text-xs font-normal text-purple-600 mb-1">
                        <FileText className="w-3.5 h-3.5" />
                        <span>Intelligent Meeting Notetaker 2.0</span>
                      </div>
                      <h3 className="text-xl font-normal text-slate-900">Q3 Growth & Pipeline Review</h3>
                      <p className="text-xs text-slate-500">4 participants • Recorded with Elev Notetaker</p>
                    </div>

                    {/* Audio Player Controller */}
                    <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200">
                      <div className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center">
                        {audioPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white ml-0.5" />}
                      </div>
                      <div className="flex items-center gap-1">
                        {[12, 24, 18, 28, 32, 16, 22, 14].map((h, i) => (
                          <span
                            key={i}
                            className={`w-1 rounded-full transition-all duration-300 ${
                              audioPlaying ? 'bg-purple-600 animate-pulse' : 'bg-purple-300'
                            }`}
                            style={{ height: `${audioPlaying ? h : 8}px` }}
                          />
                        ))}
                      </div>
                      <span className="text-[11px] font-mono font-normal text-purple-900">
                        {audioPlaying ? '08:42' : '00:00'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Live Transcript Snippet */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-3">
                      <span className="text-xs font-normal text-slate-700 block uppercase tracking-wider">Live Transcript:</span>
                      <div className="space-y-2 text-xs">
                        <p className="text-slate-600">
                          <strong className="text-slate-900">Sarah (VP Sales):</strong> Let's accelerate the partner rollout by next Monday.
                        </p>
                        <p className={`p-2 rounded-lg transition-colors ${audioPlaying ? 'bg-purple-100 text-purple-900 font-normal' : 'text-slate-600'}`}>
                          <strong className="text-slate-900">Steven (Lead Dev):</strong> Agreed. I will sync the action items directly to Slack and CRM.
                        </p>
                      </div>
                    </div>

                    {/* Action Items Auto-Checklist */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-3">
                      <span className="text-xs font-normal text-slate-700 block uppercase tracking-wider">AI Extracted Action Items:</span>
                      <div className="space-y-2.5">
                        <div
                          className={`p-2.5 rounded-lg border text-xs flex items-center justify-between transition-all ${
                            checkedItem1 ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-white border-slate-200 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className={`w-4 h-4 rounded-md flex items-center justify-center text-[10px] font-normal ${checkedItem1 ? 'bg-emerald-600 text-white' : 'border border-slate-300'}`}>
                              {checkedItem1 && '✓'}
                            </span>
                            <span>Finalize partner agreements</span>
                          </div>
                          <span className="text-[10px] text-slate-400">Assigned: Sarah</span>
                        </div>

                        <div
                          className={`p-2.5 rounded-lg border text-xs flex items-center justify-between transition-all ${
                            checkedItem2 ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-white border-slate-200 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className={`w-4 h-4 rounded-md flex items-center justify-center text-[10px] font-normal ${checkedItem2 ? 'bg-emerald-600 text-white' : 'border border-slate-300'}`}>
                              {checkedItem2 && '✓'}
                            </span>
                            <span>Push release to production</span>
                          </div>
                          <span className="text-[10px] text-slate-400">Assigned: Steven</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ======================================================= */}
              {/* SCENE 4: REAL PAYMENTS & CHECKOUT UI                    */}
              {/* ======================================================= */}
              {activeScene.id === 'payments' && (
                <motion.div
                  key="scene-payments"
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.98 }}
                  transition={{ duration: 0.35 }}
                  className="bg-white rounded-2xl p-6 sm:p-8 text-slate-800 shadow-xl border border-emerald-200/80"
                >
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
                    <div>
                      <div className="inline-flex items-center gap-1.5 text-xs font-normal text-emerald-600 mb-1">
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>elev Pay • Integrated Checkout</span>
                      </div>
                      <h3 className="text-xl font-normal text-slate-900">Executive Consulting Package</h3>
                      <p className="text-xs text-slate-500">Collect payments automatically before meetings</p>
                    </div>

                    <div className="text-right">
                      <span className="text-2xl font-normal text-slate-900">
                        {packageType === 'bundle' ? '$360' : '$150'}
                      </span>
                      <span className="text-xs text-slate-500 block">USD</span>
                    </div>
                  </div>

                  {/* Package Selector */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div
                      className={`p-3.5 rounded-xl border text-xs font-normal cursor-pointer transition-all ${
                        packageType === 'single'
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-200'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      <span>Single Session (60m)</span>
                      <span className="block font-normal text-slate-900 text-sm mt-1">$150</span>
                    </div>
                    <div
                      className={`p-3.5 rounded-xl border text-xs font-normal cursor-pointer transition-all ${
                        packageType === 'bundle'
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-200'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>Quarterly 3-Pack</span>
                        <span className="text-[10px] bg-emerald-600 text-white font-normal px-1.5 py-0.2 rounded-sm">Save 20%</span>
                      </div>
                      <span className="block font-normal text-slate-900 text-sm mt-1">$360</span>
                    </div>
                  </div>

                  {/* Payment Button State */}
                  <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-6 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center font-mono text-[10px] font-normal">
                        •••• 4242
                      </div>
                      <span className="text-xs text-slate-300">Stripe Secured Instant Checkout</span>
                    </div>

                    <div
                      className={`px-5 py-2 rounded-xl text-xs font-normal flex items-center gap-2 transition-all ${
                        payConfirmed ? 'bg-emerald-500 text-white' : 'bg-blue-600 text-white'
                      }`}
                    >
                      {payConfirmed ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Payment Completed!</span>
                        </>
                      ) : (
                        <span>Pay {packageType === 'bundle' ? '$360' : '$150'}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>

        {/* Bottom Video Controller Bar */}
        <div className="px-6 py-4 bg-slate-950/90 border-t border-slate-800 flex items-center gap-4 z-20">
          
          {/* Play / Pause Toggle */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 active:scale-95 text-white flex items-center justify-center shadow-md transition-all cursor-pointer"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
          </button>

          {/* Reset button */}
          <button
            onClick={() => setCurrentTime(0)}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Replay from start"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Scrubber Progress Bar */}
          <div className="flex-1 flex items-center gap-3">
            <input
              type="range"
              min="0"
              max={TOTAL_DURATION}
              step="0.05"
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <span className="text-xs font-mono text-slate-400 min-w-[75px] text-right tabular-nums">
              {formatTime(currentTime)} / {formatTime(TOTAL_DURATION)}
            </span>
          </div>

          {/* Speed switcher */}
          <button
            onClick={() => setSpeed((prev) => (prev === 1 ? 1.5 : prev === 1.5 ? 2 : 1))}
            className="text-xs font-mono font-normal px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
          >
            {speed}x
          </button>

          {/* Loop toggle */}
          <button
            onClick={() => setIsLooping(!isLooping)}
            className={`text-xs font-normal px-2.5 py-1 rounded-lg transition-colors ${
              isLooping ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-500'
            }`}
          >
            Loop: {isLooping ? 'ON' : 'OFF'}
          </button>
        </div>

      </div>
    </div>
  );
}
