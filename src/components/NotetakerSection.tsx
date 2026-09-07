import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BorderBeam } from 'border-beam';
import {
  FileText,
  ListOrdered,
  Mail,
  Zap,
  Sparkles,
  ArrowUpRight,
  Play,
  Pause,
  RotateCcw,
  Scissors,
  Check,
  Send,
  Download,
  Search,
  Lock,
  Volume2,
  ShieldCheck,
  Clock,
  Copy,
  Sliders,
  Share2,
  ExternalLink,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface NotetakerSectionProps {
  onOpenDemo: () => void;
}

interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  icon?: 'check' | 'sparkles' | 'copy';
}

// Framer-motion entrance & staggered appearance variants for Bento Grid items
const bentoContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.05,
    },
  },
};

const bentoItemVariants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.985,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function NotetakerSection({ onOpenDemo }: NotetakerSectionProps) {
  // Video playback & scrubber state
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(42);
  const [hoveredTimeMarker, setHoveredTimeMarker] = useState<string | null>(null);

  // Email draft state
  const [emailSent, setEmailSent] = useState(false);
  const [includeVideo, setIncludeVideo] = useState(true);
  const [restrictPasscode, setRestrictPasscode] = useState(false);
  const [passcodeCopied, setPasscodeCopied] = useState(false);
  const passcode = 'ELEV-9241';

  // Integrations state
  const [toggles, setToggles] = useState({
    salesforce: true,
    hubspot: true,
    zapier: false
  });

  // Action items completion checklist
  const [checkedActions, setCheckedActions] = useState<Record<number, boolean>>({
    0: true,
    1: false,
    2: true
  });

  // Selected recap item state
  const [selectedRecapIndex, setSelectedRecapIndex] = useState(0);

  // Instant Recall interactive state
  const recallPrompts = [
    {
      q: 'What contact details were discussed in the demo?',
      speaker: 'Jessica Barnes (VP Procurement)',
      time: '14:32',
      answer: 'Jessica confirmed direct mobile (+1 415-829-1038) and designated David Miller (dmiller@acme.corp) for the primary MSA security signoff.',
      context: 'Product Demo • Pricing & Procurement'
    },
    {
      q: 'What was the agreed budget for 200 seats?',
      speaker: 'Alex Chen (Account Exec)',
      time: '09:15',
      answer: 'Agreed on an enterprise 15% tier volume discount for 200 team seats ($22/seat/mo), conditional on concluding the SOC 2 security review by Friday.',
      context: 'Product Demo • License Tiering'
    },
    {
      q: 'Who owns the security and compliance review?',
      speaker: 'Marcus Vance (Head of InfoSec)',
      time: '21:04',
      answer: 'Alex Chen is delivering the updated SOC 2 Type II audit package, ISO 27001 certificate, and standard GDPR data addendum before November 1st.',
      context: 'Product Demo • Security & Compliance'
    }
  ];

  const [activePromptIndex, setActivePromptIndex] = useState(0);
  const [typedQuery, setTypedQuery] = useState(recallPrompts[0].q);
  const [isTyping, setIsTyping] = useState(false);
  const [isPlayingAudioQuote, setIsPlayingAudioQuote] = useState(false);

  // Emil Kowalski style tactile Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (msg: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev.slice(-2), { ...msg, id }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3600);
  };

  // Video progress timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isVideoPlaying) {
      interval = setInterval(() => {
        setVideoProgress(prev => (prev >= 98 ? 10 : prev + 1.2));
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isVideoPlaying]);

  // Keyboard shortcut listener: Space to toggle video if hovered over section
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && (e.target as HTMLElement).tagName !== 'INPUT' && (e.target as HTMLElement).tagName !== 'TEXTAREA') {
        const rect = sectionRef.current?.getBoundingClientRect();
        if (rect && rect.top < window.innerHeight && rect.bottom > 0) {
          // Inside view
          // e.preventDefault();
          // setIsVideoPlaying(prev => !prev);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectPrompt = (index: number) => {
    setActivePromptIndex(index);
    setIsTyping(true);
    setTypedQuery('');
    const target = recallPrompts[index].q;
    let curr = 0;
    const interval = setInterval(() => {
      if (curr <= target.length) {
        setTypedQuery(target.slice(0, curr));
        curr++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 24);
  };

  const handleSendEmail = () => {
    setEmailSent(true);
    try {
      confetti({ particleCount: 45, spread: 60, origin: { y: 0.65 } });
    } catch {}
    addToast({
      title: 'Recap Email Dispatched',
      description: 'Sent to Jessica Barnes & 2 guests with action items attached.',
      icon: 'check'
    });
    setTimeout(() => setEmailSent(false), 3500);
  };

  const handleCopyPasscode = () => {
    try {
      navigator.clipboard.writeText(passcode);
    } catch {}
    setPasscodeCopied(true);
    addToast({
      title: 'Passcode Copied',
      description: `Copied ${passcode} to clipboard for attendee access.`,
      icon: 'copy'
    });
    setTimeout(() => setPasscodeCopied(false), 2000);
  };

  const toggleSwitch = (key: 'salesforce' | 'hubspot' | 'zapier') => {
    const nextState = !toggles[key];
    setToggles(prev => ({ ...prev, [key]: nextState }));
    const label = key.charAt(0).toUpperCase() + key.slice(1);
    addToast({
      title: `${label} Sync ${nextState ? 'Enabled' : 'Paused'}`,
      description: nextState ? 'Auto-mapping call takeaways & deal stages.' : 'Sync temporarily disabled.',
      icon: 'sparkles'
    });
  };

  const toggleAction = (idx: number) => {
    const next = !checkedActions[idx];
    setCheckedActions(prev => ({ ...prev, [idx]: next }));
    addToast({
      title: next ? 'Action item marked completed' : 'Action item reopened',
      description: 'Updated in meeting recap and synced to team task queue.',
      icon: 'check'
    });
  };

  const handleClipHighlight = () => {
    addToast({
      title: 'Highlight Clipped at 14:32',
      description: 'Added 30s snippet to customer deal room.',
      icon: 'sparkles'
    });
  };

  return (
    <section
      ref={sectionRef}
      id="notetaker"
      className="py-24 lg:py-32 bg-white border-t border-[#E2E8F0] relative overflow-hidden"
    >
      {/* Subtle Dot Grid Background for Depth */}
      <div className="absolute inset-0 bg-dot-grid opacity-40 pointer-events-none" />

      {/* Top Ambient Light Flare */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-blue-100/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* ================= SECTION HEADER ================= */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs mb-4"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white border border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center justify-center p-1 shrink-0">
              <img src="/icon-notetaker-3d.png" alt="Notetaker" className="w-full h-full object-contain" />
            </div>
            <span className="text-sm sm:text-base font-semibold text-[#0A0D14] tracking-tight">
              Notetaker
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="font-editorial text-4xl sm:text-5xl lg:text-[3.5rem] text-[#0A0D14] font-normal leading-[1.06] tracking-tight"
          >
            Actionable recaps for every meeting. <br className="hidden sm:inline" />
            <span className="italic text-purple-900/90">Zero manual note-taking.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-sans max-w-2xl"
          >
            elev automatically joins Zoom, Google Meet, and Teams. It transcribes with 99.4% precision, writes your follow-up emails, and logs structured deal intelligence directly into your CRM before you even close your laptop.
          </motion.p>

          {/* Social Proof Metric Bar (Landing Page Copywriter) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200/70"
          >
            {[
              { stat: '4.2 hrs', label: 'Saved per rep / week' },
              { stat: '99.4%', label: 'Transcription precision' },
              { stat: '< 15 sec', label: 'Post-call CRM sync time' },
              { stat: '0 drops', label: 'In lost meeting action items' }
            ].map((metric, i) => (
              <div key={i} className="space-y-0.5">
                <div className="font-bold text-xl sm:text-2xl text-[#0A0D14] tracking-tight">
                  {metric.stat}
                </div>
                <div className="text-[11px] sm:text-xs text-slate-500 font-medium leading-tight">
                  {metric.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ================= BENTO GRID (Emil Kowalski Craft & Jakub Antalik Transitions) ================= */}
        <motion.div
          variants={bentoContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8"
        >

          {/* ---------------- CARD 1: CLEAR SUMMARIES (Large Hero Card - 7 Cols) ---------------- */}
          <motion.div
            variants={bentoItemVariants}
            className="lg:col-span-7 bg-[#FBFBFC] rounded-[32px] p-6 sm:p-8 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden relative group"
          >
            {/* Top Card Info Header */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 uppercase tracking-wider mb-2">
                  <ListOrdered className="w-3.5 h-3.5" />
                  <span>Call Intelligence</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-normal text-[#0A0D14] font-editorial tracking-tight">
                  Clear summaries with next steps
                </h3>
                <p className="text-sm text-slate-600 font-sans mt-1.5 max-w-xl">
                  End every call with verified summaries, speaker-attributed takeaways, and interactive action items so commitments are never forgotten.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenDemo}
                className="w-9 h-9 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 shrink-0 transition-colors shadow-xs cursor-pointer"
                aria-label="Explore summaries demo"
              >
                <ArrowUpRight className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Signature Dusk Gradient Canvas (Atmospheric Visual) with BorderBeam */}
            <BorderBeam
              size="md"
              colorVariant="ocean"
              strength={0.8}
              theme="dark"
              borderRadius={24}
              className="w-full"
            >
              <div
                className="relative w-full rounded-[24px] p-5 sm:p-7 overflow-hidden shadow-xl"
                style={{
                  background: 'linear-gradient(135deg, #182046 0%, #2E4DA8 28%, #8580DE 65%, #F7A88C 100%)'
                }}
              >
              {/* Reactive Equalizer Bars (Jakub Antalik Transitions & Emil Kowalski Motion) */}
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 hidden sm:flex flex-col gap-1.5 pointer-events-none opacity-45">
                {[14, 28, 44, 22, 50, 32, 18, 40, 26, 12, 34, 48, 20].map((h, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: isVideoPlaying ? [h * 0.7, h * 1.35, h * 0.9] : h,
                      opacity: isVideoPlaying ? 0.9 : 0.4
                    }}
                    transition={{
                      duration: 0.8 + (i % 5) * 0.15,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      ease: 'easeInOut'
                    }}
                    className="w-1 bg-white rounded-full"
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 relative z-10">
                
                {/* Floating Video Call Player Card (Signature UI Component) */}
                <div className="w-full sm:w-[240px] bg-white rounded-[20px] p-4 shadow-2xl border border-white/95 ring-1 ring-slate-900/5 space-y-3 shrink-0">
                  {/* Card Header matching signature layout */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-[#0A0D14] leading-snug">
                        Video Call Stream
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium">Emily Watson (Host) + 2 guests</p>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-300/70 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>1080p</span>
                    </span>
                  </div>

                  {/* 4:3 Video Viewport with Hover Overlay */}
                  <div className="relative rounded-[14px] overflow-hidden aspect-[4/3] bg-slate-900 shadow-inner group/video">
                    <img
                      src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=700&auto=format&fit=crop"
                      alt="Emily on video conference"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Speaker Badge */}
                    <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
                      <span>Emily (Host)</span>
                    </div>

                    {/* Live Speaking Indicator */}
                    <div className="absolute bottom-2 right-2 bg-black/55 backdrop-blur-md text-white text-[10px] font-mono px-1.5 py-0.5 rounded-md flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${isVideoPlaying ? 'bg-emerald-400 animate-ping' : 'bg-emerald-400'}`} />
                      <span>{isVideoPlaying ? 'Speaking' : 'Active'}</span>
                    </div>

                    {/* Quick Play Overlay on Hover */}
                    <button
                      onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                      className="absolute inset-0 bg-black/20 opacity-0 group-hover/video:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                      aria-label="Toggle video playback"
                    >
                      <div className="w-10 h-10 rounded-full bg-white/90 text-blue-600 flex items-center justify-center shadow-lg">
                        {isVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5 fill-blue-600" />}
                      </div>
                    </button>
                  </div>

                  {/* Player Controls & Scrubber */}
                  <div className="px-0.5 space-y-2">
                    <div className="flex items-center justify-between text-slate-500 text-xs">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          setVideoProgress(prev => Math.max(0, prev - 12));
                          addToast({ title: 'Rewound 10s', icon: 'sparkles' });
                        }}
                        className="hover:text-blue-600 transition-colors p-1 cursor-pointer"
                        title="Rewind 10 seconds"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </motion.button>
                      
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={handleClipHighlight}
                        className="hover:text-blue-600 transition-colors p-1 cursor-pointer"
                        title="Clip key moment"
                      >
                        <Scissors className="w-3.5 h-3.5" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                        className="w-7 h-7 rounded-full bg-[#006BFF] hover:bg-[#0055D4] text-white flex items-center justify-center shadow-md transition-colors cursor-pointer"
                        aria-label={isVideoPlaying ? 'Pause' : 'Play'}
                      >
                        {isVideoPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 ml-0.5 fill-white" />}
                      </motion.button>

                      <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded-md">
                        1x
                      </span>
                    </div>

                    {/* Interactive Progress Seekbar with Tooltip */}
                    <div
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const clickX = e.clientX - rect.left;
                        const pct = Math.round((clickX / rect.width) * 100);
                        setVideoProgress(pct);
                      }}
                      className="h-1.5 bg-slate-100 rounded-full overflow-hidden relative cursor-pointer group/bar"
                    >
                      <div
                        className="h-full bg-[#006BFF] rounded-full transition-all duration-200"
                        style={{ width: `${videoProgress}%` }}
                      />
                    </div>
                  </div>

                  {/* Footer Timeline indicator */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                    <span>Audio Waveform</span>
                    <span className="text-blue-600 font-bold">24:15 full length</span>
                  </div>
                </div>

                {/* Selected Floating Product Demo Summary Card (Benchmark Archetype) */}
                <div className="w-full sm:w-[270px] bg-white rounded-[20px] p-4 sm:p-5 shadow-2xl border border-white/95 ring-1 ring-slate-900/5 space-y-3.5 transition-all">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-[#0A0D14] leading-snug">
                        Product Demo Recap
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium">Jessica Barnes (VP) + 2 guests</p>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-300/70 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Live Call</span>
                    </span>
                  </div>

                  {/* Summary Bullets */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-800">Key Decisions</span>
                      <div className="w-14 h-1 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                    </div>
                    <div className="space-y-1 text-[11px] text-slate-600 leading-tight">
                      <div className="flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                        <span>Agreed on 200 team seats with 15% enterprise volume tier.</span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                        <span>Reviewed SOC 2 Type II audit report & GDPR addendum.</span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Action Items Checklist */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-800">Next Steps</span>
                      <span className="text-[10px] font-bold text-purple-700 bg-purple-100/90 border border-purple-200/60 px-2 py-0.5 rounded-full">
                        3 assigned
                      </span>
                    </div>
                    
                    <div className="space-y-1.5 text-[11px] text-slate-600">
                      {[
                        'Send custom MSA to procurement team',
                        'Confirm kickoff onboarding date for Nov 1st',
                        'Connect Salesforce sandbox for testing'
                      ].map((task, i) => (
                        <motion.div
                          key={i}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => toggleAction(i)}
                          className="flex items-center gap-2 cursor-pointer group/item select-none py-0.5"
                        >
                          <div className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center transition-all shrink-0 ${
                            checkedActions[i] ? 'bg-purple-600 text-white shadow-xs' : 'border border-slate-300 group-hover/item:border-purple-500'
                          }`}>
                            {checkedActions[i] && <Check className="w-2.5 h-2.5" />}
                          </div>
                          <span className={`truncate text-xs transition-colors ${
                            checkedActions[i] ? 'line-through text-slate-400' : 'text-slate-700 font-medium'
                          }`}>
                            {task}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Footer Timeline indicator */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                    <span>Timeline Markers</span>
                    <span className="text-purple-600 font-bold">18 moments indexed</span>
                  </div>
                </div>

              </div>
            </div>
            </BorderBeam>

          </motion.div>

          {/* ---------------- CARD 2: PRE-DRAFTED FOLLOW-UP EMAILS (5 Cols) ---------------- */}
          <motion.div
            variants={bentoItemVariants}
            className="lg:col-span-5 bg-[#FBFBFC] rounded-[32px] p-6 sm:p-8 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
          >
            {/* Top Header */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 uppercase tracking-wider mb-2">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Zero-Delay Follow-Up</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-normal text-[#0A0D14] font-editorial tracking-tight">
                  Pre-drafted follow-up emails
                </h3>
                <p className="text-sm text-slate-600 font-sans mt-1.5">
                  Ship recaps in 30 seconds. One click creates a personalized summary with action items, recording links, and optional passcode access.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenDemo}
                className="w-9 h-9 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 shrink-0 transition-colors shadow-xs cursor-pointer"
                aria-label="Explore email composer"
              >
                <ArrowUpRight className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Email Composer Simulation Card (Signature UI Archetype) */}
            <div className="bg-white rounded-[20px] p-4 sm:p-5 shadow-2xl border border-white/95 ring-1 ring-slate-900/5 space-y-3.5">
              
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-sm text-[#0A0D14] leading-snug">
                    Pre-Drafted Follow-Up
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium">To: Jessica Barnes (VP) + 2 attendees</p>
                </div>
                <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50 border border-amber-300/70 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  <span>Ready in 15s</span>
                </span>
              </div>

              {/* Formatted Content Section */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-800">Executive Summary</span>
                  <div className="w-14 h-1 rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500" />
                </div>
                <div className="space-y-1 text-[11px] text-slate-600 leading-tight">
                  <div className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                    <span>Thanked Jessica for walking through Acme's Q4 compliance checklist.</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                    <span>Confirmed 200 team seats proposal with 15% volume discount.</span>
                  </div>
                </div>
              </div>

              {/* Interactive Inclusions Checklist */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-800">Included in Dispatch</span>
                  <span className="text-[10px] font-bold text-purple-700 bg-purple-100/90 border border-purple-200/60 px-2 py-0.5 rounded-full">
                    3 selected
                  </span>
                </div>

                <div className="space-y-1.5 text-[11px] text-slate-600">
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIncludeVideo(!includeVideo)}
                    className="flex items-center gap-2 cursor-pointer group/item select-none py-0.5"
                  >
                    <div className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center transition-all shrink-0 ${
                      includeVideo ? 'bg-purple-600 text-white shadow-xs' : 'border border-slate-300 group-hover/item:border-purple-500'
                    }`}>
                      {includeVideo && <Check className="w-2.5 h-2.5" />}
                    </div>
                    <span className="truncate text-xs font-medium text-slate-700">
                      Include 1080p recording & indexed transcript
                    </span>
                  </motion.div>

                  <div className="flex items-center justify-between">
                    <motion.div
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        const next = !restrictPasscode;
                        setRestrictPasscode(next);
                        if (next) {
                          addToast({ title: 'Passcode Protection Activated', icon: 'sparkles' });
                        }
                      }}
                      className="flex items-center gap-2 cursor-pointer group/item select-none py-0.5"
                    >
                      <div className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center transition-all shrink-0 ${
                        restrictPasscode ? 'bg-purple-600 text-white shadow-xs' : 'border border-slate-300 group-hover/item:border-purple-500'
                      }`}>
                        {restrictPasscode && <Check className="w-2.5 h-2.5" />}
                      </div>
                      <span className="truncate text-xs font-medium text-slate-700">
                        Restrict with passcode (AES-256)
                      </span>
                    </motion.div>

                    {restrictPasscode && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={handleCopyPasscode}
                        className="text-[10px] font-mono bg-purple-50 hover:bg-purple-100 text-purple-700 px-2 py-0.5 rounded-md border border-purple-200/60 font-semibold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                        title="Click to copy passcode"
                      >
                        <Lock className="w-2.5 h-2.5" />
                        <span>{passcode}</span>
                        <Copy className="w-2.5 h-2.5 ml-0.5 opacity-60" />
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>

              {/* Send Email Action Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSendEmail}
                className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                  emailSent
                    ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                    : 'bg-gradient-to-r from-[#9B51E0] to-[#7952F5] hover:opacity-95 text-white shadow-purple-500/25'
                }`}
              >
                {emailSent ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Recap Dispatched to Attendees!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3 h-3" />
                    <span>Send Recap Email</span>
                  </>
                )}
              </motion.button>

              {/* Footer matching signature card layout */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                <span>Delivery Pipeline</span>
                <span className="text-purple-600 font-bold">Auto-BCC to Salesforce</span>
              </div>

            </div>

          </motion.div>

          {/* ---------------- CARD 3: WORKS WITH YOUR TOOLS (5 Cols) ---------------- */}
          <motion.div
            variants={bentoItemVariants}
            className="lg:col-span-5 bg-[#FBFBFC] rounded-[32px] p-6 sm:p-8 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 uppercase tracking-wider mb-2">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Two-Way CRM Sync</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-normal text-[#0A0D14] font-editorial tracking-tight">
                  Works with your tools
                </h3>
                <p className="text-sm text-slate-600 font-sans mt-1.5">
                  Eliminate manual CRM data entry. Automatically map customer objections, timelines, and next steps to Salesforce, HubSpot, and Zapier.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenDemo}
                className="w-9 h-9 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 shrink-0 transition-colors shadow-xs cursor-pointer"
                aria-label="Explore tool sync"
              >
                <ArrowUpRight className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Overlapping Tool Modules (Matching Signature UI Archetype) */}
            <div className="relative flex flex-col sm:flex-row gap-4 items-center justify-center">
              
              {/* CRM Deal Record Module (Signature Layout) */}
              <div className="w-full sm:w-[245px] bg-white rounded-[20px] p-4 shadow-2xl border border-white/95 ring-1 ring-slate-900/5 space-y-3 shrink-0">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-[#0A0D14] leading-snug">
                      Salesforce Deal Record
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">Acme Global Enterprise</p>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-300/70 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Auto-Synced</span>
                  </span>
                </div>

                {/* Section 1: Synced Deal Intelligence */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-800">Synced Intelligence</span>
                    <div className="w-14 h-1 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                  </div>
                  <div className="space-y-1 text-[11px] text-slate-600 leading-tight">
                    <div className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                      <span>Stage: Contract & Legal Review</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                      <span>Estimated ARR: $58,000 / yr</span>
                    </div>
                  </div>
                </div>

                {/* Section 2: Meeting Recaps Checklist */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-800">Meeting Recaps</span>
                    <span className="text-[10px] font-bold text-purple-700 bg-purple-100/90 border border-purple-200/60 px-2 py-0.5 rounded-full">
                      3 indexed
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {[
                      { title: 'Product Demo', time: '9:00 am • 24 min' },
                      { title: 'Security Review', time: '10:45 am • 38 min' },
                      { title: 'Executive Sync', time: '2:00 pm • 17 min' }
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ x: 2 }}
                        onClick={() => setSelectedRecapIndex(i)}
                        className={`flex items-center gap-2 p-1.5 rounded-xl cursor-pointer transition-colors ${
                          selectedRecapIndex === i ? 'bg-purple-50/80 border border-purple-200/70' : 'hover:bg-slate-50'
                        }`}
                      >
                        <div className="w-3.5 h-3.5 rounded-sm bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <div className="overflow-hidden flex-1">
                          <div className="font-bold text-xs text-slate-800 truncate">{item.title}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{item.time}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                  <span>Sync Latency</span>
                  <span className="text-emerald-600 font-bold">&lt; 0.4s real-time</span>
                </div>
              </div>

              {/* Connected Tool Hub Panel (Signature Layout) */}
              <div className="w-full sm:w-[215px] bg-white rounded-[20px] p-4 shadow-2xl border border-white/95 ring-1 ring-slate-900/5 space-y-3 shrink-0">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h5 className="font-bold text-sm text-[#0A0D14] leading-snug">
                      Integrations
                    </h5>
                    <p className="text-[11px] text-slate-500 font-medium">Active Webhook Relays</p>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-blue-800 bg-blue-50 border border-blue-300/70 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    <span>3 Active</span>
                  </span>
                </div>

                {/* Section 1: Spring Toggles */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-800">Connected Hub</span>
                    <div className="w-14 h-1 rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500" />
                  </div>

                  <div className="space-y-2 pt-1">
                    {/* Salesforce */}
                    <div className="flex items-center justify-between py-0.5">
                      <div className="flex items-center gap-2">
                        <img src="https://cdn.calendlycms.com/saleforce.svg" alt="Salesforce" className="w-4 h-4 object-contain" />
                        <span className="text-xs font-semibold text-slate-700">Salesforce</span>
                      </div>
                      <button
                        onClick={() => toggleSwitch('salesforce')}
                        className={`w-8 h-4.5 rounded-full p-0.5 transition-colors cursor-pointer ${
                          toggles.salesforce ? 'bg-blue-600' : 'bg-slate-300'
                        }`}
                        aria-label="Toggle Salesforce"
                      >
                        <motion.div
                          layout
                          transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                          className={`w-3.5 h-3.5 rounded-full bg-white shadow-xs ${
                            toggles.salesforce ? 'translate-x-3.5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    {/* HubSpot */}
                    <div className="flex items-center justify-between py-0.5">
                      <div className="flex items-center gap-2">
                        <img src="https://cdn.calendlycms.com/hubspot.svg" alt="HubSpot" className="w-4 h-4 object-contain" />
                        <span className="text-xs font-semibold text-slate-700">HubSpot</span>
                      </div>
                      <button
                        onClick={() => toggleSwitch('hubspot')}
                        className={`w-8 h-4.5 rounded-full p-0.5 transition-colors cursor-pointer ${
                          toggles.hubspot ? 'bg-blue-600' : 'bg-slate-300'
                        }`}
                        aria-label="Toggle HubSpot"
                      >
                        <motion.div
                          layout
                          transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                          className={`w-3.5 h-3.5 rounded-full bg-white shadow-xs ${
                            toggles.hubspot ? 'translate-x-3.5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Zapier */}
                    <div className="flex items-center justify-between py-0.5">
                      <div className="flex items-center gap-2">
                        <img src="https://cdn.calendlycms.com/zapier-icon.svg" alt="Zapier" className="w-4 h-4 object-contain" />
                        <span className="text-xs font-semibold text-slate-700">Zapier</span>
                      </div>
                      <button
                        onClick={() => toggleSwitch('zapier')}
                        className={`w-8 h-4.5 rounded-full p-0.5 transition-colors cursor-pointer ${
                          toggles.zapier ? 'bg-blue-600' : 'bg-slate-300'
                        }`}
                        aria-label="Toggle Zapier"
                      >
                        <motion.div
                          layout
                          transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                          className={`w-3.5 h-3.5 rounded-full bg-white shadow-xs ${
                            toggles.zapier ? 'translate-x-3.5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                  <span>Coverage</span>
                  <span className="text-blue-600 font-bold">Zero Manual Entry</span>
                </div>

              </div>

            </div>

          </motion.div>

          {/* ---------------- CARD 4: INSTANT MEETING RECALL (7 Cols) ---------------- */}
          <motion.div
            variants={bentoItemVariants}
            className="lg:col-span-7 bg-[#FBFBFC] rounded-[32px] p-6 sm:p-8 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Company Memory & Semantic Recall</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-normal text-[#0A0D14] font-editorial tracking-tight">
                  Instant cross-meeting recall
                </h3>
                <p className="text-sm text-slate-600 font-sans mt-1.5 max-w-xl">
                  Ask Velie anything across your company's entire call archive. Get instant verified answers linked directly to the exact audio second.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenDemo}
                className="w-9 h-9 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 shrink-0 transition-colors shadow-xs cursor-pointer"
                aria-label="Explore semantic recall"
              >
                <ArrowUpRight className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Interactive Search + Instant Citation */}
            <div className="space-y-4">
              
              {/* Clickable Suggestion Chips (Jakub Antalik Transitions) */}
              <div className="flex flex-wrap gap-2">
                {recallPrompts.map((p, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectPrompt(idx)}
                    className={`text-[11px] font-semibold px-3 py-1.5 rounded-full transition-all cursor-pointer font-sans ${
                      activePromptIndex === idx
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200/90 hover:border-purple-300 hover:bg-purple-50/50'
                    }`}
                  >
                    "{p.q}"
                  </motion.button>
                ))}
              </div>

              {/* Typewriter Search Input Capsule */}
              <div className="bg-white rounded-full px-5 py-3 shadow-md border border-slate-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 overflow-hidden flex-1">
                  <Search className="w-4 h-4 text-purple-600 shrink-0" />
                  <span className="text-xs font-semibold text-slate-800 truncate font-mono">
                    {typedQuery}
                    {isTyping && <span className="inline-block w-1.5 h-3.5 bg-purple-600 ml-0.5 animate-pulse align-middle" />}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => {
                    addToast({
                      title: 'Query Verified by Velie',
                      description: 'Exact citation matched with 99.8% confidence.',
                      icon: 'sparkles'
                    });
                  }}
                  className="w-7 h-7 rounded-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center shrink-0 shadow-xs cursor-pointer transition-colors"
                  aria-label="Submit search query"
                >
                  <Send className="w-3 h-3" />
                </motion.button>
              </div>

              {/* Velie Answer Pop-up Card with BorderBeam */}
              <BorderBeam
                size="sm"
                colorVariant="sunset"
                strength={0.75}
                theme="light"
                borderRadius={20}
                className="w-full"
              >
                <motion.div
                  key={activePromptIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white rounded-[20px] p-4 sm:p-5 shadow-2xl border border-white/95 ring-1 ring-slate-900/5 space-y-3.5"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-[#0A0D14] leading-snug">
                        Semantic Memory Citation
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium">Cited from {recallPrompts[activePromptIndex].context}</p>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-purple-800 bg-purple-50 border border-purple-300/70 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                      <span>99.8% Match</span>
                    </span>
                  </div>

                  {/* Section 1: Verified Transcript */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-800">Verified Audio Transcript</span>
                      <div className="w-14 h-1 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500" />
                    </div>
                    <div className="space-y-1 text-xs text-slate-700 leading-relaxed pl-3 border-l-2 border-purple-400 font-sans">
                      <p className="italic">"{recallPrompts[activePromptIndex].answer}"</p>
                      <span className="text-[10px] font-bold text-purple-700 block">
                        Speaker: {recallPrompts[activePromptIndex].speaker} • Timestamp {recallPrompts[activePromptIndex].time}
                      </span>
                    </div>
                  </div>

                  {/* Section 2: Audio Stream & Evidence */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-800">Direct Audio Jump</span>
                      <span className="text-[10px] font-bold text-purple-700 bg-purple-100/90 border border-purple-200/60 px-2 py-0.5 rounded-full">
                        1 verified source
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-0.5">
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          const next = !isPlayingAudioQuote;
                          setIsPlayingAudioQuote(next);
                          if (next) {
                            addToast({
                              title: `Streaming audio at ${recallPrompts[activePromptIndex].time}`,
                              description: recallPrompts[activePromptIndex].speaker,
                              icon: 'sparkles'
                            });
                          }
                        }}
                        className="text-purple-600 hover:text-purple-800 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors bg-purple-50/80 hover:bg-purple-100/80 px-2.5 py-1.5 rounded-lg border border-purple-200/60 shadow-2xs"
                      >
                        {isPlayingAudioQuote ? (
                          <>
                            <Pause className="w-3.5 h-3.5" />
                            <span>Playing {recallPrompts[activePromptIndex].speaker}...</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 fill-purple-600" />
                            <span>Play at {recallPrompts[activePromptIndex].time} in recording →</span>
                          </>
                        )}
                      </motion.button>

                      <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                        <span>SOC 2 Verified</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                    <span>Indexed Knowledge</span>
                    <span className="text-purple-600 font-bold">Zero Model Retention</span>
                  </div>
                </motion.div>
              </BorderBeam>

            </div>

          </motion.div>

        </motion.div>

      </div>

      {/* ================= EMIL KOWALSKI CRAFT: TACTILE SPRING TOAST CONTAINER ================= */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
        <AnimatePresence>
          {toasts.map(t => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 16, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 450, damping: 30 }}
              className="pointer-events-auto bg-[#0B1222] text-white rounded-2xl p-4 shadow-2xl border border-white/10 flex items-start gap-3 backdrop-blur-md"
            >
              <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0 mt-0.5">
                {t.icon === 'check' && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                {t.icon === 'copy' && <Copy className="w-3.5 h-3.5 text-blue-300" />}
                {(!t.icon || t.icon === 'sparkles') && <Sparkles className="w-3.5 h-3.5 text-purple-300" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-white leading-tight">
                  {t.title}
                </div>
                {t.description && (
                  <div className="text-[11px] text-slate-300 leading-snug mt-0.5">
                    {t.description}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </section>
  );
}
