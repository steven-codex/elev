import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  ChevronDown,
  Calendar,
  Shield,
  Clock,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import MinimalistMotionStage from './MinimalistMotionStage';
import LiquidOrb from './LiquidOrb';
import { Reveal, ImageReveal } from '../motion';

function EarningsPayoutsCard({ onOpenAuth }: { onOpenAuth: (mode: 'signup') => void }) {
  const [activeTab, setActiveTab] = useState<'pending' | 'completed' | 'declined'>('completed');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const data = {
    pending: {
      amount: '$4,820.00',
      bars: [35, 52, 28, 65, 48, 30, 20],
      values: ['$850', '$1,200', '$420', '$950', '$680', '$450', '$270']
    },
    completed: {
      amount: '$53,089.90',
      bars: [55, 82, 40, 58, 96, 64, 70],
      values: ['$6,420', '$9,850', '$5,210', '$3,140', '$14,280', '$6,840', '$7,349']
    },
    declined: {
      amount: '$1,150.00',
      bars: [22, 16, 32, 14, 38, 18, 12],
      values: ['$180', '$120', '$250', '$90', '$320', '$110', '$80']
    }
  };

  // Active auto-cycle showcase when user is idle (pauses on interaction or hover)
  useEffect(() => {
    if (isCardHovered || hasInteracted) return;
    const tabList: ('pending' | 'completed' | 'declined')[] = ['pending', 'completed', 'declined'];
    const timer = setInterval(() => {
      setActiveTab((prev) => {
        const nextIdx = (tabList.indexOf(prev) + 1) % tabList.length;
        return tabList[nextIdx];
      });
    }, 3200);

    return () => clearInterval(timer);
  }, [isCardHovered, hasInteracted]);

  const current = data[activeTab];

  const tabsConfig = [
    {
      id: 'pending' as const,
      label: 'Pending',
      icon: (active: boolean) => (
        <Clock className={`w-3.5 h-3.5 transition-colors duration-150 stroke-[2.2] shrink-0 ${active ? 'text-amber-500' : 'text-slate-400 group-hover/tab:text-slate-600'}`} />
      )
    },
    {
      id: 'completed' as const,
      label: 'Completed',
      icon: (active: boolean) => (
        <CheckCircle2 className={`w-3.5 h-3.5 transition-colors duration-150 stroke-[2.2] shrink-0 ${active ? 'text-emerald-500' : 'text-slate-400 group-hover/tab:text-slate-600'}`} />
      )
    },
    {
      id: 'declined' as const,
      label: 'Declined',
      icon: (active: boolean) => (
        <XCircle className={`w-3.5 h-3.5 transition-colors duration-150 stroke-[2.2] shrink-0 ${active ? 'text-rose-500' : 'text-slate-400 group-hover/tab:text-slate-600'}`} />
      )
    }
  ];

  return (
    <div 
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
      className="bg-[#F8FAFD] rounded-[32px] p-6 sm:p-7 border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:shadow-[0_12px_36px_rgba(0,85,255,0.08)] hover:border-blue-200 transition-[box-shadow,border-color] duration-300 flex-1 relative overflow-hidden group min-h-[360px]"
    >
      <div className="relative z-10">
        {/* Top Row: "Your earnings" & "This month ⌵" */}
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[13px] sm:text-[14px] font-normal text-slate-400">
              Your earnings
            </span>
            
            {/* Dynamic Counter with Blur Shift Transition (Unconstrained layout) */}
            <div className="relative mt-1 min-h-[38px] sm:min-h-[44px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.amount}
                  initial={{ opacity: 0, y: 5, filter: 'blur(2px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -5, filter: 'blur(2px)' }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-3xl sm:text-[2.6rem] font-bold text-[#0A0D14] tracking-tight tabular-nums leading-none whitespace-nowrap"
                >
                  {current.amount}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)] text-xs font-normal text-slate-600 hover:text-slate-900 hover:border-slate-300 active:scale-[0.97] transition-[border-color,color,transform] duration-150 cursor-pointer select-none"
          >
            <span>This month</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>

        {/* Filter Tabs Segmented Control (Consistent 3-column grid matching Velie card) */}
        <div className="w-full grid grid-cols-3 gap-1 p-1 bg-[#EEF2F8] rounded-2xl border border-slate-200/60 mt-4 relative">
          {tabsConfig.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setHasInteracted(true);
                  setActiveTab(tab.id);
                }}
                className={`group/tab relative flex items-center justify-center gap-1.5 py-2 px-1 rounded-xl text-xs transition-[color,transform] duration-150 cursor-pointer active:scale-[0.97] select-none z-10 ${
                  active ? 'text-[#0A0D14] font-medium' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="activePayoutTabPill"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    className="absolute inset-0 bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] border border-slate-200/70 -z-10"
                  />
                )}
                {tab.icon(active)}
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Stadium Capsule Bar Chart (Clean, grid-free, luminous pills) */}
        <div className="h-44 sm:h-48 relative my-3 pt-6 flex items-end justify-between gap-2 sm:gap-2.5">
          {current.bars.map((fillPercent, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="flex-1 max-w-[42px] sm:max-w-[46px] h-full flex flex-col items-center justify-end relative group/bar cursor-pointer"
              >
                {/* Tooltip on Hover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 4, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 2, scale: 0.94 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                      className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#0A0D14] text-white text-[10px] font-mono px-2 py-0.5 rounded-lg shadow-lg z-30 whitespace-nowrap tabular-nums pointer-events-none border border-white/10"
                    >
                      {current.values[index]}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Stadium Track (Outer Pill Housing) */}
                <div className="w-full flex-1 max-h-[145px] sm:max-h-[155px] rounded-full bg-[#EBF1FA]/80 border border-slate-200/50 p-1 flex flex-col justify-end overflow-hidden transition-[background-color,border-color,transform] duration-200 group-hover/bar:bg-[#E2ECF8] group-hover/bar:border-blue-300/70 group-hover/bar:-translate-y-0.5 shadow-[inset_0_1px_3px_rgba(0,0,0,0.03)]">
                  {/* Filled Inner Pill */}
                  <motion.div
                    initial={false}
                    animate={{ height: `${fillPercent}%` }}
                    transition={{
                      type: 'spring',
                      stiffness: 280,
                      damping: 24,
                      delay: index * 0.035
                    }}
                    className="w-full rounded-full relative overflow-hidden transition-all duration-300 group-hover/bar:shadow-[0_4px_16px_rgba(0,85,255,0.4)]"
                    style={{
                      background: isHovered
                        ? 'linear-gradient(180deg, #60A5FA 0%, #2563EB 50%, #0055FF 100%)'
                        : 'linear-gradient(180deg, #3B82F6 0%, #1D4ED8 60%, #0055FF 100%)',
                      boxShadow: '0 2px 8px rgba(0,85,255,0.22), inset 0 1px 1px rgba(255,255,255,0.6)'
                    }}
                  >
                    {/* Subtle Top Specular Sheen */}
                    <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-b from-white/60 to-transparent rounded-t-full pointer-events-none" />
                  </motion.div>
                </div>

                {/* Day of Week Label */}
                <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 mt-2 transition-colors duration-150 group-hover/bar:text-[#0055FF] group-hover/bar:font-medium select-none">
                  {days[index]}
                </span>
              </div>
            );
          })}
        </div>

      </div>

      {/* Bottom Footer Description with Faint Divider (Matching Meet Velie) */}
      <div className="relative z-10 pt-4 border-t border-slate-200/60 mt-auto">
        <p className="text-[13.5px] sm:text-[14px] leading-relaxed text-slate-500 text-pretty">
          <strong className="font-semibold text-[#0A0D14]">Instant Payouts</strong>{' '}
          <span>– Get paid quickly for completed and approved jobs.</span>
        </p>
      </div>

    </div>
  );
}

interface TimelineFeatureDeckProps {
  onOpenAuth: (mode: 'signup') => void;
}

export default function TimelineFeatureDeck({ onOpenAuth }: TimelineFeatureDeckProps) {
  const [orbState, setOrbState] = useState<'idle' | 'thinking'>('thinking');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeVelieMode, setActiveVelieMode] = useState<'threads' | 'booking' | 'briefing'>('booking');

  const velieModes = [
    {
      id: 'threads' as const,
      label: 'Email Sync',
      orbState: 'idle' as const,
      icon: (active: boolean) => (
        <Mail className={`w-3.5 h-3.5 transition-colors duration-150 stroke-[2.2] shrink-0 ${active ? 'text-[#0055FF]' : 'text-slate-400 group-hover/tab:text-slate-600'}`} />
      )
    },
    {
      id: 'booking' as const,
      label: 'Auto-Book',
      orbState: 'thinking' as const,
      icon: (active: boolean) => (
        <Calendar className={`w-3.5 h-3.5 transition-colors duration-150 stroke-[2.2] shrink-0 ${active ? 'text-emerald-500' : 'text-slate-400 group-hover/tab:text-slate-600'}`} />
      )
    },
    {
      id: 'briefing' as const,
      label: 'Shield',
      orbState: 'thinking' as const,
      icon: (active: boolean) => (
        <Shield className={`w-3.5 h-3.5 transition-colors duration-150 stroke-[2.2] shrink-0 ${active ? 'text-violet-500' : 'text-slate-400 group-hover/tab:text-slate-600'}`} />
      )
    }
  ];

  return (
    <section id="workflows" className="w-full py-24 lg:py-32 bg-white border-t border-[#E2E8F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <Reveal y={24}>
            <h2 className="text-3xl sm:text-4xl lg:text-[3.25rem] text-[#0A0D14] font-normal leading-[1.14] tracking-tight text-balance">
              Built for teams whose work <span className="font-instrument italic font-normal bg-gradient-to-r from-[#418AC1] to-[#506DFD] bg-clip-text text-transparent inline-block pr-1">runs on meetings</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12} y={16}>
            <p className="text-base sm:text-lg text-slate-600 mt-4 max-w-2xl leading-relaxed text-pretty">
              elev automates the workflow before, during, and after every session — so your team can focus on high-impact execution.
            </p>
          </Reveal>
        </div>

        {/* ========================================================= */}
        {/* BENTO GRID SHOWCASE (TRANSPARENT GLASSY TEXTURE STAGE)   */}
        {/* ========================================================= */}
        <div className="w-full max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Bento Cell: Standalone Transparent Glassy Motion Stage (Span 8) */}
          <ImageReveal delay={0.1} y={28} className="lg:col-span-8 group flex flex-col">
            <MinimalistMotionStage />
          </ImageReveal>

          {/* Right Side Column: Standalone Transparent Glassy Companion Cards (Span 4) */}
          <ImageReveal delay={0.25} y={28} className="lg:col-span-4 flex flex-col gap-6 justify-between">
            
            {/* Side Card 1: Meet Velie AI Copilot */}
            <div className="bg-[#F8FAFD] rounded-[32px] p-6 sm:p-7 border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:shadow-[0_12px_36px_rgba(0,85,255,0.08)] hover:border-blue-200 transition-[box-shadow,border-color] duration-300 flex-1 relative overflow-hidden group min-h-[360px]">
              
              <div className="relative z-10">
                {/* Header Title with Tilted Interactive Email Badge */}
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h3 className="text-2xl sm:text-[1.75rem] font-bold text-[#0A0D14] tracking-tight">
                    Meet <span className="font-editorial italic font-normal text-[#0055FF]">Velie</span>
                  </h3>

                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText('velie@elev.io');
                      setCopiedEmail(true);
                      setTimeout(() => setCopiedEmail(false), 2000);
                    }}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#F0F5FF] hover:bg-[#E5EFFF] border border-[#BFDBFE] text-[#0055FF] shadow-[0_1px_4px_rgba(0,85,255,0.08)] rotate-[6deg] hover:rotate-0 active:scale-[0.95] transition-all duration-200 cursor-pointer select-none group/copy"
                    title="Click to copy email address"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#0055FF] stroke-[2.2]" />
                    <span className="font-mono text-[11px] font-medium tracking-tight">velie@elev.io</span>
                    <span className="text-[10px] font-sans font-medium text-blue-500/80 group-hover/copy:text-blue-600 transition-colors ml-0.5">
                      {copiedEmail ? 'Copied!' : 'Copy'}
                    </span>
                  </button>
                </div>

                {/* Subtitle */}
                <p className="text-xs sm:text-[13.5px] text-slate-500 leading-relaxed mt-2 text-pretty">
                  on any thread to triage scheduling and auto-book slots.
                </p>

                {/* Segmented Control Pill Bar (Clean 3-column grid) */}
                <div className="w-full grid grid-cols-3 gap-1 p-1 bg-[#EEF2F8] rounded-2xl border border-slate-200/60 mt-4 relative">
                  {velieModes.map((mode) => {
                    const active = activeVelieMode === mode.id;
                    return (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => {
                          setActiveVelieMode(mode.id);
                          setOrbState(mode.orbState);
                        }}
                        className={`group/tab relative flex items-center justify-center gap-1.5 py-2 px-1 rounded-xl text-xs transition-[color,transform] duration-150 cursor-pointer active:scale-[0.97] select-none z-10 ${
                          active ? 'text-[#0A0D14] font-medium' : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        {active && (
                          <motion.div
                            layoutId="activeVelieModePill"
                            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                            className="absolute inset-0 bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] border border-slate-200/70 -z-10"
                          />
                        )}
                        {mode.icon(active)}
                        <span className="truncate">{mode.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Interactive Liquid Glass Orb Showcase Stage with Soft Atmospheric Aura */}
              <div className="relative w-full h-[180px] sm:h-[195px] my-3 flex items-center justify-center group/orb transition-all duration-300">
                {/* Soft Radial Ambient Aura & Grounding Shadow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,85,255,0.12)_0%,rgba(99,102,241,0.05)_45%,transparent_70%)] pointer-events-none" />
                <div className="absolute bottom-2 w-32 h-6 bg-blue-500/10 blur-xl rounded-full pointer-events-none" />

                {/* Liquid Glass Orb Canvas */}
                <LiquidOrb
                  state={orbState}
                  onStateChange={setOrbState}
                  interactive={true}
                  className="w-full h-full"
                />
              </div>

              {/* Bottom Footer Description with Faint Divider */}
              <div className="relative z-10 pt-4 border-t border-slate-200/60 mt-auto">
                <p className="text-[13.5px] sm:text-[14px] leading-relaxed text-slate-500 text-pretty">
                  <strong className="font-semibold text-[#0A0D14]">Velie Copilot</strong>{' '}
                  <span>– Autonomous meeting prep & conflict protection.</span>
                </p>
              </div>
            </div>

            {/* Side Card 2: Instant Payouts Earnings & Stadium Chart */}
            <EarningsPayoutsCard onOpenAuth={onOpenAuth} />

          </ImageReveal>

        </div>

      </div>
    </section>
  );
}

