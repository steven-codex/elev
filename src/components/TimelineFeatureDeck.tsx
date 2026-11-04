import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  ChevronDown,
  Calendar,
  Shield,
  MessageSquare,
  CheckCircle2,
  Users
} from 'lucide-react';
import MinimalistMotionStage from './MinimalistMotionStage';
import LiquidOrb from './LiquidOrb';
import { Reveal, ImageReveal } from '../motion';
import { useLang } from '../i18n';
import { DECK, SERVICES, USE_CASES } from '../data/landingData';

// Agent modes map 1:1 to USE_CASES.tabs (Sales, Operations, Customer service).
const AGENT_MODES = [
  {
    orbState: 'idle' as const,
    icon: (active: boolean) => (
      <Mail className={`w-3.5 h-3.5 transition-colors duration-150 stroke-[2.2] shrink-0 ${active ? 'text-[#0055FF]' : 'text-slate-400 group-hover/tab:text-slate-600'}`} />
    )
  },
  {
    orbState: 'thinking' as const,
    icon: (active: boolean) => (
      <Calendar className={`w-3.5 h-3.5 transition-colors duration-150 stroke-[2.2] shrink-0 ${active ? 'text-emerald-500' : 'text-slate-400 group-hover/tab:text-slate-600'}`} />
    )
  },
  {
    orbState: 'thinking' as const,
    icon: (active: boolean) => (
      <Shield className={`w-3.5 h-3.5 transition-colors duration-150 stroke-[2.2] shrink-0 ${active ? 'text-violet-500' : 'text-slate-400 group-hover/tab:text-slate-600'}`} />
    )
  }
];

// Chart tabs map 1:1 to DECK.chart.sets (Chats, Leads, Hand-offs).
const CHART_TAB_ICONS = [
  (active: boolean) => (
    <MessageSquare className={`w-3.5 h-3.5 transition-colors duration-150 stroke-[2.2] shrink-0 ${active ? 'text-amber-500' : 'text-slate-400 group-hover/tab:text-slate-600'}`} />
  ),
  (active: boolean) => (
    <CheckCircle2 className={`w-3.5 h-3.5 transition-colors duration-150 stroke-[2.2] shrink-0 ${active ? 'text-emerald-500' : 'text-slate-400 group-hover/tab:text-slate-600'}`} />
  ),
  (active: boolean) => (
    <Users className={`w-3.5 h-3.5 transition-colors duration-150 stroke-[2.2] shrink-0 ${active ? 'text-rose-500' : 'text-slate-400 group-hover/tab:text-slate-600'}`} />
  )
];

function HoursSavedCard() {
  const { lang, t } = useLang();
  const [activeIndex, setActiveIndex] = useState(1);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const sets = DECK.chart.sets;
  const locale = lang === 'id' ? 'id-ID' : 'en-US';
  const formatValue = (value: number, hours: boolean) =>
    `${value.toLocaleString(locale, { maximumFractionDigits: hours ? 1 : 0 })}${hours ? ' h' : ''}`;

  // Bar heights are a percentage of the largest value in the active set.
  const current = sets[activeIndex];
  const maxValue = Math.max(...current.values);
  const bars = current.values.map((value) => (value / maxValue) * 100);
  const total = current.values.reduce((sum, value) => sum + value, 0);
  const bigValue = formatValue(total, current.hours);

  // Active auto-cycle showcase when user is idle (pauses on interaction or hover)
  useEffect(() => {
    if (isCardHovered || hasInteracted) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % sets.length);
    }, 3200);

    return () => clearInterval(timer);
  }, [isCardHovered, hasInteracted, sets.length]);

  return (
    <div
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
      className="bg-[#F8FAFD] rounded-[32px] p-7 sm:p-8 border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:shadow-[0_12px_36px_rgba(0,85,255,0.08)] hover:border-blue-200 transition-[box-shadow,border-color] duration-300 flex-1 relative overflow-hidden group min-h-[380px]"
    >
      <div className="relative z-10">
        {/* Top Row: card title & range */}
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[13px] sm:text-[14px] font-normal text-slate-400">
              {t(DECK.chart.title)}
            </span>

            {/* Dynamic Counter with Blur Shift Transition (Unconstrained layout) */}
            <div className="relative mt-1 min-h-[38px] sm:min-h-[44px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={bigValue}
                  initial={{ opacity: 0, y: 5, filter: 'blur(2px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -5, filter: 'blur(2px)' }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-3xl sm:text-[2.6rem] font-bold text-[#0A0D14] tracking-tight tabular-nums leading-none whitespace-nowrap"
                >
                  {bigValue}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)] text-xs font-normal text-slate-600 hover:text-slate-900 hover:border-slate-300 active:scale-[0.97] transition-[border-color,color,transform] duration-150 cursor-pointer select-none"
          >
            <span>{t(DECK.chart.range)}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>

        {/* Filter Tabs Segmented Control (Consistent 3-column grid matching the agent card) */}
        <div className="w-full grid grid-cols-3 gap-1 p-1 bg-[#EEF2F8] rounded-2xl border border-slate-200/60 mt-4 relative">
          {sets.map((set, index) => {
            const active = activeIndex === index;
            return (
              <button
                key={set.id}
                type="button"
                onClick={() => {
                  setHasInteracted(true);
                  setActiveIndex(index);
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
                {CHART_TAB_ICONS[index](active)}
                <span className="truncate">{t(set.label)}</span>
              </button>
            );
          })}
        </div>

        {/* Stadium Capsule Bar Chart (Clean, grid-free, luminous pills) */}
        <div className="h-44 sm:h-48 relative my-3 pt-6 flex items-end justify-between gap-2 sm:gap-2.5">
          {bars.map((fillPercent, index) => {
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
                      {formatValue(current.values[index], current.hours)}
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
                  {t(DECK.chart.days)[index]}
                </span>
              </div>
            );
          })}
        </div>

      </div>

      {/* Bottom Footer Description with Faint Divider */}
      <div className="relative z-10 pt-4 border-t border-slate-200/60 mt-auto">
        <p className="text-[13.5px] sm:text-[14px] leading-relaxed text-slate-500 text-pretty">
          <strong className="font-semibold text-[#0A0D14]">{t(DECK.chart.footerLead)}</strong>
          <span>{t(DECK.chart.footerRest)}</span>
        </p>
      </div>

    </div>
  );
}

export default function TimelineFeatureDeck() {
  const { t } = useLang();
  const [orbState, setOrbState] = useState<'idle' | 'thinking'>('thinking');
  const [copied, setCopied] = useState(false);
  const [activeMode, setActiveMode] = useState(1);

  const heading = SERVICES.heading;

  return (
    <section id="services" className="w-full py-28 sm:py-36 lg:py-44 bg-white border-t border-[#E2E8F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 sm:mb-20 lg:mb-24">
          <Reveal y={24}>
            <h2 className="text-3xl sm:text-4xl lg:text-[3.25rem] text-[#0A0D14] font-normal leading-[1.14] tracking-tight text-balance">
              {t(heading.lead)}{' '}
              <span className="font-instrument italic font-normal bg-gradient-to-r from-[#418AC1] to-[#506DFD] bg-clip-text text-transparent inline-block pr-1">{t(heading.accent)}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12} y={16}>
            <p className="text-base sm:text-lg text-slate-600 mt-4 max-w-2xl leading-relaxed text-pretty">
              {t(SERVICES.sub)}
            </p>
          </Reveal>
        </div>

        {/* ========================================================= */}
        {/* BENTO GRID SHOWCASE (TRANSPARENT GLASSY TEXTURE STAGE)   */}
        {/* ========================================================= */}
        <div className="w-full max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-8 items-stretch">

          {/* Main Bento Cell: Standalone Transparent Glassy Motion Stage (Span 8) */}
          <ImageReveal delay={0.1} y={28} className="lg:col-span-8 group flex flex-col">
            <MinimalistMotionStage />
          </ImageReveal>

          {/* Right Side Column: Standalone Transparent Glassy Companion Cards (Span 4) */}
          <ImageReveal delay={0.25} y={28} className="lg:col-span-4 flex flex-col gap-7 lg:gap-8 justify-between">

            {/* Side Card 1: AI agent */}
            <div className="bg-[#F8FAFD] rounded-[32px] p-7 sm:p-8 border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:shadow-[0_12px_36px_rgba(0,85,255,0.08)] hover:border-blue-200 transition-[box-shadow,border-color] duration-300 flex-1 relative overflow-hidden group min-h-[380px]">

              <div className="relative z-10">
                {/* Header Title with Tilted Copy Chip */}
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h3 className="text-2xl sm:text-[1.75rem] font-bold text-[#0A0D14] tracking-tight">
                    {t(DECK.agent.title)}{' '}
                    <span className="font-editorial italic font-normal text-[#0055FF]">{t(DECK.agent.accent)}</span>
                    {t(DECK.agent.suffix) ? ` ${t(DECK.agent.suffix)}` : ''}
                  </h3>

                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(`https://${DECK.agent.chip}`);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#F0F5FF] hover:bg-[#E5EFFF] border border-[#BFDBFE] text-[#0055FF] shadow-[0_1px_4px_rgba(0,85,255,0.08)] rotate-[6deg] hover:rotate-0 active:scale-[0.95] transition-[transform,background-color,border-color,box-shadow] duration-200 cursor-pointer select-none group/copy"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#0055FF] stroke-[2.2]" />
                    <span className="font-mono text-[11px] font-medium tracking-tight">{DECK.agent.chip}</span>
                    <span className="text-[10px] font-sans font-medium text-blue-500/80 group-hover/copy:text-blue-600 transition-colors ml-0.5">
                      {copied ? t(DECK.agent.copied) : t(DECK.agent.copy)}
                    </span>
                  </button>
                </div>

                {/* Subtitle */}
                <p className="text-xs sm:text-[13.5px] text-slate-500 leading-relaxed mt-2 text-pretty">
                  {t(DECK.agent.sub)}
                </p>

                {/* Segmented Control Pill Bar (Clean 3-column grid), one button per use case */}
                <div className="w-full grid grid-cols-3 gap-1 p-1 bg-[#EEF2F8] rounded-2xl border border-slate-200/60 mt-4 relative">
                  {USE_CASES.tabs.map((useCase, index) => {
                    const mode = AGENT_MODES[index];
                    const active = activeMode === index;
                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          setActiveMode(index);
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
                        <span className="text-center leading-tight">{t(useCase.name)}</span>
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

              {/* Active use case line */}
              <p className="relative z-10 text-xs sm:text-[13.5px] text-slate-500 leading-relaxed text-pretty text-center -mt-1">
                {t(USE_CASES.tabs[activeMode].line)}
              </p>

              {/* Bottom Footer Description with Faint Divider */}
              <div className="relative z-10 pt-4 border-t border-slate-200/60 mt-auto">
                <p className="text-[13.5px] sm:text-[14px] leading-relaxed text-slate-500 text-pretty">
                  <strong className="font-semibold text-[#0A0D14]">{t(DECK.agent.handoffLead)}</strong>
                  <span>{t(DECK.agent.handoffRest)}</span>
                </p>
              </div>
            </div>

            {/* Side Card 2: Hours saved chart */}
            <HoursSavedCard />

          </ImageReveal>

        </div>

      </div>
    </section>
  );
}
