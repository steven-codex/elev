import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Calendar,
  FileText,
  CreditCard,
  RefreshCw,
  Zap,
  CheckCircle2,
  Sliders,
  Play
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface GooeyElevShowcaseProps {
  onOpenDemo: () => void;
  onOpenAuth?: (mode: 'login' | 'signup') => void;
}

export default function GooeyElevShowcase({ onOpenDemo }: GooeyElevShowcaseProps) {
  const [isMerged, setIsMerged] = useState(false);
  const [viscosity, setViscosity] = useState<number>(9);
  const [activePillar, setActivePillar] = useState<'all' | 'scheduling' | 'callie' | 'notetaker' | 'payments'>('all');
  const [fusionState, setFusionState] = useState<'idle' | 'fusing' | 'fused'>('idle');

  const pillars = [
    {
      id: 'scheduling',
      name: 'elev Schedule',
      label: 'Autonomous Booking',
      color: 'bg-blue-600',
      glow: 'shadow-blue-500/50',
      icon: <Calendar className="w-4 h-4 text-white" />,
      offset: { x: -80, y: -65 },
      desc: 'Smart availability, calendar conflict guards & routing rules'
    },
    {
      id: 'callie',
      name: 'elev Callie',
      label: 'AI Executive Copilot',
      color: 'bg-amber-500',
      glow: 'shadow-amber-500/50',
      icon: <Sparkles className="w-4 h-4 text-white" />,
      offset: { x: 80, y: -65 },
      desc: 'Email CC coordination, pre-call briefs & attendee intel'
    },
    {
      id: 'notetaker',
      name: 'elev Notetaker',
      label: 'Automated Recaps',
      color: 'bg-purple-600',
      glow: 'shadow-purple-500/50',
      icon: <FileText className="w-4 h-4 text-white" />,
      offset: { x: -80, y: 65 },
      desc: '99.4% speech-to-text, CRM field updates & instant action items'
    },
    {
      id: 'payments',
      name: 'elev Pay',
      label: 'Instant Upfront Checkout',
      color: 'bg-teal-500',
      glow: 'shadow-teal-500/50',
      icon: <CreditCard className="w-4 h-4 text-white" />,
      offset: { x: 80, y: 65 },
      desc: 'Multi-currency invoicing, zero no-show deposits & Stripe sync'
    }
  ];

  const handleTriggerFusion = () => {
    setFusionState('fusing');
    setIsMerged(true);

    setTimeout(() => {
      setFusionState('fused');
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}
    }, 600);
  };

  const handleSeparate = () => {
    setIsMerged(false);
    setFusionState('idle');
    setActivePillar('all');
  };

  return (
    <section className="py-20 lg:py-28 bg-[#FAF7F2] border-t border-stone-200/80 relative overflow-hidden">
      {/* Background ambient radial aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-blue-200/30 via-purple-200/20 to-amber-100/40 blur-3xl pointer-events-none rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-300/80 shadow-2xs mb-4">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
            </span>
            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-800 font-bricolage">
              Liquid Intelligence Engine
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-blue-100 text-blue-800">
              SVG Gooey Physics
            </span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-5xl lg:text-[3.25rem] text-[#071A31] font-normal leading-tight tracking-tight">
            Meetings used to require four different apps. <br className="hidden sm:inline" />
            <span className="italic text-blue-600 font-medium">elev</span> dissolves them into one.
          </h2>

          <p className="font-heading text-base sm:text-lg text-slate-600 mt-4 max-w-2xl mx-auto leading-relaxed">
            Test the live liquid metaball engine below. Watch how scheduling, AI intelligence, voice transcription, and payments melt together with zero friction.
          </p>
        </div>

        {/* Interactive Gooey Stage Card */}
        <div className="bg-white rounded-[32px] p-6 sm:p-10 border border-stone-200/80 shadow-xl shadow-stone-200/50 max-w-5xl mx-auto">
          
          {/* Controls Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#071A31] flex items-center justify-center text-white shadow-sm">
                <Zap className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="font-bricolage font-bold text-slate-900 text-base">
                  Interactive Workflow Fusion
                </h3>
                <p className="text-xs text-slate-500">
                  Click or drag blobs to feel the surface tension
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5">
              {!isMerged ? (
                <button
                  onClick={handleTriggerFusion}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.97] text-white text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Fuse Into elev Core</span>
                </button>
              ) : (
                <button
                  onClick={handleSeparate}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-[0.97] text-slate-800 text-xs sm:text-sm font-bold transition-all cursor-pointer"
                >
                  <Sliders className="w-4 h-4 text-slate-600" />
                  <span>Separate Workflows</span>
                </button>
              )}

              <button
                onClick={onOpenDemo}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                <span>Live Walkthrough</span>
                <Play className="w-3 h-3 fill-slate-700" />
              </button>
            </div>
          </div>

          {/* Liquid Interactive Canvas with SVG Gooey Filter */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
            
            {/* Gooey Stage (7 cols) */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center min-h-[360px] sm:min-h-[420px] bg-slate-950 rounded-2xl p-6 relative overflow-hidden shadow-inner">
              
              {/* Subtle Grid Pattern inside dark canvas */}
              <div className="absolute inset-0 bg-dot-grid-dark opacity-35 pointer-events-none" />

              {/* Status Header inside Stage */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs text-slate-400 z-20">
                <span className="font-mono text-[11px] flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${isMerged ? 'bg-emerald-400 animate-pulse' : 'bg-blue-400'}`} />
                  ENGINE: {isMerged ? 'UNIFIED_ELEV_FLOW' : 'DISPERSED_NODES'}
                </span>
                <span className="text-[11px] text-slate-500 font-mono">
                  VISCOSITY: {viscosity}px
                </span>
              </div>

              {/* THE GOOEY METABALL CONTAINER (Applies SVG filter: url(#gooey-heavy)) */}
              <div
                className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center"
                style={{
                  filter: `url(#gooey-heavy)`
                }}
              >
                {/* Central elev Brand Core Blob */}
                <motion.div
                  animate={{
                    scale: isMerged ? [1.15, 1.25, 1.18] : [1, 1.05, 0.98, 1],
                    borderRadius: isMerged
                      ? ['50%', '42% 58% 65% 35% / 40% 60% 40% 60%', '55% 45% 40% 60% / 60% 40% 55% 45%', '50%']
                      : ['50%', '48% 52% 56% 44% / 54% 46% 54% 46%', '50%']
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: isMerged ? 4.5 : 7,
                    ease: 'easeInOut'
                  }}
                  className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-500 ${
                    isMerged
                      ? 'bg-gradient-to-tr from-blue-500 via-indigo-500 to-amber-400'
                      : 'bg-blue-600'
                  }`}
                  onClick={() => setIsMerged(!isMerged)}
                >
                  <div className="w-16 h-16 rounded-full bg-slate-950/20 flex items-center justify-center text-white font-extrabold text-xl tracking-tight">
                    elev
                  </div>
                </motion.div>

                {/* Satellite Liquid Blobs (Gooey Droplets) */}
                {pillars.map((pillar) => {
                  const targetX = isMerged ? 0 : pillar.offset.x;
                  const targetY = isMerged ? 0 : pillar.offset.y;

                  return (
                    <motion.div
                      key={pillar.id}
                      animate={{
                        x: targetX,
                        y: targetY,
                        scale: isMerged ? 0.8 : 1
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 180,
                        damping: 18,
                        mass: 1.1
                      }}
                      drag={!isMerged}
                      dragConstraints={{ left: -120, right: 120, top: -120, bottom: 120 }}
                      dragElastic={0.4}
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={() => {
                        setActivePillar(pillar.id as any);
                        if (!isMerged) {
                          handleTriggerFusion();
                        }
                      }}
                      className={`absolute w-14 h-14 sm:w-16 sm:h-16 rounded-full ${pillar.color} flex items-center justify-center shadow-lg cursor-grab active:cursor-grabbing select-none`}
                    >
                      <div className="pointer-events-none">{pillar.icon}</div>
                    </motion.div>
                  );
                })}

                {/* Micro Liquid Orbiters for organic gooey texture */}
                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-400/80 translate-x-24" />
                </motion.div>

                <motion.div
                  animate={{
                    rotate: -360,
                  }}
                  transition={{ repeat: Infinity, duration: 9, ease: 'linear' }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <div className="w-5 h-5 rounded-full bg-purple-400/80 -translate-x-20 translate-y-12" />
                </motion.div>
              </div>

              {/* Bottom Instructions Badge */}
              <div className="mt-6 text-center z-20">
                <span className="text-[11px] font-medium text-slate-300 bg-slate-900/90 px-3 py-1 rounded-full border border-slate-800 backdrop-blur-xs">
                  {isMerged
                    ? '✨ Unified State: All 4 tools operating in seamless liquid synchronization'
                    : '👆 Click or drag any satellite droplet toward the center to watch them fuse'}
                </span>
              </div>
            </div>

            {/* Context & Pillar Details (5 cols) */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <div className="space-y-1.5">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 font-mono">
                  THE ELEV ADVANTAGE
                </span>
                <h4 className="font-bricolage text-xl sm:text-2xl font-bold text-slate-900">
                  {isMerged
                    ? 'One platform. No context switching.'
                    : 'Four fragmented tasks, unified.'}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Traditional stacks make you string Calendly to Otter, Zapier, and Stripe. With elev, everything flows through a single intelligent layer.
                </p>
              </div>

              {/* Interactive Pillar List */}
              <div className="space-y-2.5 pt-2">
                {pillars.map((pillar) => {
                  const isSelected = activePillar === pillar.id || activePillar === 'all';
                  return (
                    <div
                      key={pillar.id}
                      onClick={() => setActivePillar(pillar.id as any)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                        isSelected
                          ? 'bg-slate-50 border-slate-300 shadow-2xs'
                          : 'bg-white border-slate-100 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl ${pillar.color} flex items-center justify-center shrink-0 text-white shadow-xs`}>
                        {pillar.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-bricolage font-bold text-xs text-slate-900">
                            {pillar.name}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium">
                            {pillar.label}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                          {pillar.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Viscosity Slider */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-slate-500" />
                  Liquid Surface Tension
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400">Crisp</span>
                  <input
                    type="range"
                    min="6"
                    max="16"
                    value={viscosity}
                    onChange={(e) => setViscosity(Number(e.target.value))}
                    className="w-24 accent-blue-600 cursor-pointer"
                  />
                  <span className="text-[11px] text-slate-400">Fluid</span>
                </div>
              </div>

              {/* Live Metric Banner */}
              <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-100 flex items-center gap-2.5 text-xs text-blue-900">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="font-medium">
                  Average team saves <strong>4.2 hours/week</strong> eliminating tool handoffs.
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
