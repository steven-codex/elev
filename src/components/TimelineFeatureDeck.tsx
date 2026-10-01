import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Mail,
  ChevronDown,
  Check
} from 'lucide-react';
import MinimalistMotionStage from './MinimalistMotionStage';
import LiquidOrb from './LiquidOrb';
import { Reveal, ImageReveal } from '../motion';

function EarningsPayoutsCard({ onOpenAuth }: { onOpenAuth: (mode: 'signup') => void }) {
  const [activeTab, setActiveTab] = useState<'pending' | 'completed' | 'declined'>('completed');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isCardHovered, setIsCardHovered] = useState(false);

  const data = {
    pending: {
      amount: '$4,820.00',
      capsuleHeights: [80, 64, 74, 46, 92, 66, 50],
      bars: [28, 40, 22, 50, 36, 25, 18],
      values: ['$850', '$1,200', '$420', '$950', '$680', '$450', '$270']
    },
    completed: {
      amount: '$53,089.90',
      capsuleHeights: [80, 64, 74, 46, 92, 66, 50],
      bars: [52, 76, 40, 44, 78, 56, 58],
      values: ['$6,420', '$9,850', '$5,210', '$3,140', '$14,280', '$6,840', '$7,349']
    },
    declined: {
      amount: '$1,150.00',
      capsuleHeights: [80, 64, 74, 46, 92, 66, 50],
      bars: [16, 14, 24, 12, 28, 16, 10],
      values: ['$180', '$120', '$250', '$90', '$320', '$110', '$80']
    }
  };

  // Active auto-cycle showcase when user is idle (pauses on hover)
  useEffect(() => {
    if (isCardHovered) return;
    const tabList: ('completed' | 'pending' | 'declined')[] = ['completed', 'pending', 'declined'];
    const timer = setInterval(() => {
      setActiveTab((prev) => {
        const nextIdx = (tabList.indexOf(prev) + 1) % tabList.length;
        return tabList[nextIdx];
      });
    }, 2400);

    return () => clearInterval(timer);
  }, [isCardHovered]);

  const current = data[activeTab];

  const tabsConfig = [
    {
      id: 'pending' as const,
      label: 'Pending',
      icon: (active: boolean) => (
        <svg className={`w-3.5 h-3.5 transition-colors duration-200 ${active ? 'text-[#0055FF]' : 'text-blue-500/70'}`} viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeDasharray="28 8" strokeLinecap="round" />
        </svg>
      )
    },
    {
      id: 'completed' as const,
      label: 'Completed',
      icon: (active: boolean) => (
        <div className={`w-3.5 h-3.5 rounded-[4px] flex items-center justify-center transition-colors duration-200 ${active ? 'bg-[#D6E6FF] text-[#0055FF]' : 'bg-slate-200/80 text-slate-500'}`}>
          <Check className="w-2.5 h-2.5 stroke-[3]" />
        </div>
      )
    },
    {
      id: 'declined' as const,
      label: 'Declined',
      icon: (active: boolean) => (
        <svg className={`w-3.5 h-3.5 transition-colors duration-200 ${active ? 'text-[#0055FF]' : 'text-slate-400'}`} viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.75" />
          <path d="M5.5 5.5L10.5 10.5M10.5 5.5L5.5 10.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      )
    }
  ];

  return (
    <div 
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
      className="bg-[#F8FAFD] rounded-[32px] p-6 sm:p-7 border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:shadow-[0_12px_36px_rgba(0,85,255,0.08)] hover:border-blue-200 transition-[box-shadow,border-color] duration-300 flex-1 relative overflow-hidden group min-h-[360px]"
    >
      
      {/* Faded Diagonal Dot Pattern Overlay with Looping Animation */}
      <div 
        className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(#0055FF_1.2px,transparent_1.2px)] [background-size:16px_16px] pointer-events-none animate-dot-pulse-dark group-hover:opacity-[0.15] transition-opacity duration-500"
        style={{
          maskImage: 'linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 85%)',
          WebkitMaskImage: 'linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 85%)'
        }}
      />

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
                  className="text-3xl sm:text-[2.6rem] font-normal text-[#0A0D14] tracking-tight tabular-nums leading-none whitespace-nowrap"
                >
                  {current.amount}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)] text-xs font-normal text-slate-600 hover:text-slate-900 hover:border-slate-300 active:scale-[0.97] transition-[border-color,color,transform] duration-150 cursor-pointer"
          >
            <span>This month</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>

        {/* Filter Tabs with Sliding layoutId Indicator */}
        <div className="flex items-center gap-1 mt-5 border-b border-slate-200/60 relative">
          {tabsConfig.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-t-lg text-xs font-normal transition-colors duration-200 cursor-pointer active:scale-[0.97] z-10 ${
                  active ? 'text-[#0055FF] font-normal' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100/50'
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="activePayoutTabPill"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    className="absolute inset-0 bg-[#E5EFFF] rounded-t-lg border-b-2 border-[#0055FF] -z-10"
                  />
                )}
                {tab.icon(active)}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Stadium Capsule Bar Chart with Sound Wave Equalizer Looping Motion */}
        <div className="h-44 sm:h-48 relative my-3 pt-3 flex items-end justify-between gap-2 sm:gap-2.5">
          
          {/* Background Grid Lines behind bars */}
          <div 
            className="absolute inset-x-2 inset-y-0 opacity-[0.4] pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(to right, #E2E8F0 1px, transparent 1px), linear-gradient(to bottom, #E2E8F0 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />

          {/* Soft Atmospheric Fog Gradient at base of chart */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#F8FAFD] via-[#F8FAFD]/70 to-transparent z-10" />

          {/* 7 Stadium Capsule Columns with Continuous Sound Wave Equalizer Pulse */}
          {current.bars.map((fillPercent, index) => {
            const isHovered = hoveredIndex === index;
            const capsuleHeight = current.capsuleHeights[index];
            const waveDelta = index % 2 === 0 ? 14 : -12;
            const peakHeight = Math.min(95, Math.max(14, fillPercent + waveDelta));
            const dipHeight = Math.min(90, Math.max(10, fillPercent - waveDelta * 0.6));

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ height: `${capsuleHeight}%` }}
                className="flex-1 max-w-[44px] sm:max-w-[48px] rounded-[22px] sm:rounded-[24px] bg-white border border-slate-200/70 shadow-[0_2px_8px_rgba(0,0,0,0.02)] relative flex flex-col justify-end overflow-hidden group/bar transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1.5 hover:border-blue-400 hover:shadow-md cursor-pointer"
              >
                {/* Micro Hover Tooltip with Elastic Spring */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.85 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 3, scale: 0.9 }}
                      transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                      className="absolute top-1.5 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-normal font-mono px-2 py-0.5 rounded-md shadow-lg z-30 whitespace-nowrap tabular-nums pointer-events-none"
                    >
                      {current.values[index]}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Filled Bar with Continuous Sound Wave Equalizer Looping & Spring Transitions */}
                <motion.div
                  initial={false}
                  animate={
                    isCardHovered
                      ? { height: `${fillPercent}%` }
                      : { height: [`${fillPercent}%`, `${peakHeight}%`, `${dipHeight}%`, `${fillPercent}%`] }
                  }
                  transition={
                    isCardHovered
                      ? { type: 'spring', stiffness: 260, damping: 22, delay: index * 0.03 }
                      : {
                          duration: 1.5 + (index % 3) * 0.25,
                          repeat: Infinity,
                          repeatType: 'mirror',
                          ease: 'easeInOut',
                          delay: index * 0.08
                        }
                  }
                  className="w-full rounded-t-[18px] sm:rounded-t-[20px] relative overflow-hidden"
                  style={{
                    background: isHovered
                      ? 'repeating-linear-gradient(-45deg, rgba(255,255,255,0.48) 0px, rgba(255,255,255,0.48) 2.5px, transparent 2.5px, transparent 6px), linear-gradient(180deg, #2563EB 0%, #1D4ED8 100%)'
                      : 'repeating-linear-gradient(-45deg, rgba(255,255,255,0.42) 0px, rgba(255,255,255,0.42) 2.5px, transparent 2.5px, transparent 6px), linear-gradient(180deg, #3B82F6 0%, #2563EB 50%, #1D4ED8 100%)',
                    maskImage: 'linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 18%, rgba(0,0,0,0.9) 55%, rgba(0,0,0,1) 100%)',
                    WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 18%, rgba(0,0,0,0.9) 55%, rgba(0,0,0,1) 100%)'
                  }}
                />
              </div>
            );
          })}
        </div>

      </div>

      {/* Bottom Footer Description matching reference */}
      <div className="relative z-10 pt-4">
        <p className="text-[14px] sm:text-[15px] leading-relaxed text-slate-500 text-pretty">
          <strong className="font-normal text-[#0A0D14]">Instant Payouts</strong>{' '}
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



  return (
    <section id="timeline-deck" className="w-full py-24 lg:py-32 bg-white border-t border-[#E2E8F0] relative overflow-hidden">
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
            
            {/* Side Card 1: Meet Velie AI with Interactive Liquid Orb */}
            <div className="bg-gradient-to-b from-white via-[#FAFBFD] to-[#F3F6FC] rounded-[32px] p-6 sm:p-7 border border-slate-200/80 shadow-[0_12px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:shadow-[0_20px_50px_rgba(0,85,255,0.08)] hover:border-blue-300/80 transition-all duration-300 flex-1 relative group z-10 overflow-hidden">
              
              {/* Faded Diagonal Dot Pattern Overlay with Looping Animation */}
              <div 
                className="absolute inset-0 opacity-15 bg-[radial-gradient(#0055FF_1.2px,transparent_1.2px)] [background-size:16px_16px] pointer-events-none animate-dot-pulse-dark group-hover:opacity-30 transition-opacity duration-500"
                style={{
                  maskImage: 'linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0) 85%)',
                  WebkitMaskImage: 'linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0) 85%)'
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-[#0055FF] border border-blue-200/60 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform duration-300">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-normal uppercase tracking-wider bg-slate-900 text-white px-3 py-1 rounded-full font-mono shadow-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    24/7 AI Copilot
                  </span>
                </div>

                <h3 className="text-2xl font-normal text-[#0A0D14] tracking-tight mb-2">
                  Meet <span className="font-editorial italic font-normal text-[#0055FF]">Velie</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-pretty">
                  CC <span className="font-mono font-normal text-[#0055FF] bg-blue-50/80 border border-blue-200/80 px-2 py-0.5 rounded-md text-[11px] inline-flex items-center gap-1 shadow-2xs"><Mail className="w-3 h-3" />velie@elev.io</span> on any email. She opens smart workflows, weighs conflicts, and auto-books meetings.
                </p>
              </div>

              {/* Interactive Liquid Glass Orb Showcase Stage */}
              <div className="mt-5 relative w-full h-[220px] sm:h-[240px] rounded-2xl bg-[#010208] border border-slate-800/80 overflow-hidden flex flex-col items-center justify-center shadow-[inset_0_2px_14px_rgba(0,0,0,0.8),0_12px_32px_rgba(0,85,255,0.06)] group/orb transition-all duration-300">
                {/* Background Ambient Radial Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,85,255,0.18),transparent_70%)] pointer-events-none" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent pointer-events-none" />

                {/* Liquid Glass Orb Canvas */}
                <LiquidOrb
                  state={orbState}
                  onStateChange={setOrbState}
                  interactive={true}
                  className="w-full h-full"
                />

                {/* Top Quick Status Pill (Interactive state switch) */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOrbState(prev => prev === 'thinking' ? 'idle' : 'thinking');
                  }}
                  className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-tight bg-slate-900/85 hover:bg-slate-800 text-slate-300 border border-slate-700/70 shadow-xs flex items-center gap-1.5 transition-all duration-200 cursor-pointer hover:border-blue-500/50 active:scale-95"
                  title="Click to toggle Velie Orb state"
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${orbState === 'thinking' ? 'bg-cyan-400 animate-ping' : 'bg-emerald-400'}`} />
                  <span className="capitalize">{orbState}</span>
                </button>
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

