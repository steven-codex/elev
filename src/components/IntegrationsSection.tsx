import { useState, useMemo, useRef, useId, useEffect, useCallback, useSyncExternalStore, type CSSProperties } from 'react';
import { animate, motion, motionValue, useTransform, type MotionValue } from 'motion/react';
import { ArrowRight, Search, X } from 'lucide-react';
import { LoopReplayButton, Reveal, useLoopPlayback } from '../motion';
import { useLang } from '../i18n';
import { INTEGRATIONS, SITE } from '../data/landingData';

export default function IntegrationsSection() {
  const { t } = useLang();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  // Native modal: showModal() gives focus trapping, inert page, Escape to close and focus return.
  const openDialog = () => {
    dialogRef.current?.showModal();
    setIsModalOpen(true);
  };
  const closeDialog = () => {
    dialogRef.current?.close();
    ctaRef.current?.focus();
  };
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return INTEGRATIONS.items.filter(item => {
      const matchesCat = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = !query || item.name.toLowerCase().includes(query) || t(item.desc).toLowerCase().includes(query);
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery, t]);

  return (
    <section id="integrations" className="py-16 sm:py-24 lg:py-24 bg-white border-t border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Pristine White Hero Card Container */}
        <div className="relative w-full bg-white text-ink rounded-[36px] sm:rounded-[44px] border border-slate-200/80 shadow-[0_16px_50px_rgba(0,0,0,0.04)] overflow-hidden">

          {/* Ambient Soft Glow */}
          <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[160px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px] lg:min-h-[580px] items-center relative z-10">

            {/* Left Column: Text & CTA */}
            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 lg:pr-4 space-y-7 sm:space-y-8 text-left relative z-10">
              <Reveal y={24}>
                <h2 className="text-h2 xl:text-h2-lg font-medium text-ink text-balance">
                  {t(INTEGRATIONS.heading.lead)} <br />
                  <span className="font-instrument italic font-normal text-[#5A95FF] bg-gradient-to-r from-[#4A8DFF] via-[#60A5FA] to-[#93C5FD] bg-clip-text text-transparent">
                    {t(INTEGRATIONS.heading.accent)}
                  </span>
                </h2>
              </Reveal>

              <Reveal delay={0.12} y={16}>
                <p className="text-body text-ink-secondary max-w-[62ch] text-pretty">
                  {t(INTEGRATIONS.sub)}
                </p>
              </Reveal>

              <Reveal delay={0.22} y={16}>
                <div className="pt-2">
                  <button
                    ref={ctaRef}
                    type="button"
                    onClick={openDialog}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#2F6BEA] to-[#0055FF] hover:brightness-105 text-white font-medium text-xs sm:text-sm shadow-[0_8px_22px_rgba(59,130,246,0.28)] hover:shadow-[0_12px_28px_rgba(59,130,246,0.38)] enabled:active:scale-[0.96] transition-[filter,box-shadow,transform] duration-160 cursor-pointer"
                  >
                    <span>{t(INTEGRATIONS.cta)}</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              </Reveal>

            </div>

            {/* Right Column: Fluid Wave Background Stage with Fade Mask & Corner Clipping */}
            <div className="lg:col-span-6 h-full flex flex-col justify-end relative self-stretch">
              <FluidIntegrationsStage />
            </div>

          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* INTERACTIVE TOOLS EXPLORER MODAL                          */}
      {/* ========================================================= */}
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClose={() => {
          // close fires async; the dialog may have been reopened before it runs, so check the live state.
          const isOpen = dialogRef.current?.open ?? false;
          setIsModalOpen(isOpen);
          if (!isOpen) ctaRef.current?.focus();
        }}
        onClick={(e) => {
          // A click on the backdrop (the dialog's own padding area) closes it.
          if (e.target === e.currentTarget) closeDialog();
        }}
        className="hidden open:flex fixed inset-0 m-0 h-full w-full max-h-none max-w-none p-4 sm:p-6 items-center justify-center bg-transparent backdrop:bg-slate-950/80 backdrop:backdrop-blur-xl"
      >
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 450, damping: 30 }}
              className="w-full max-w-5xl max-h-[85vh] bg-white rounded-3xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden text-ink"
            >
              {/* Modal Header */}
              <div className="p-6 pb-4 border-b border-slate-100 flex items-center justify-between gap-4">
                <div>
                  <h3 id={titleId} className="text-h3 font-medium text-ink">{t(INTEGRATIONS.modal.title)}</h3>
                  <p className="text-caption text-ink-tertiary mt-0.5">{t(INTEGRATIONS.modal.sub)}</p>
                </div>
                <button
                  type="button"
                  autoFocus
                  onClick={closeDialog}
                  aria-label={t(SITE.a11y.closeDialog)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-ink-tertiary flex items-center justify-center transition-colors cursor-pointer enabled:active:scale-[0.96]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Search & Category Filter */}
              <div className="p-5 py-3.5 bg-slate-50/70 border-b border-slate-100 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-ink-tertiary absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t(INTEGRATIONS.modal.search)}
                    className="w-full pl-10 pr-4 py-2 text-base sm:text-xs rounded-full border border-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent bg-white shadow-2xs transition-[border-color,box-shadow]"
                  />
                </div>

                {/* Segmented category filter: aria-pressed carries the selected state */}
                <div role="group" aria-label={t(INTEGRATIONS.modal.title)} className="flex items-center gap-0.5 p-1 rounded-full bg-slate-100 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  {INTEGRATIONS.modal.categories.map(cat => {
                    const active = activeCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`text-xs font-medium px-3.5 py-1.5 rounded-full transition-[color,background-color,box-shadow,transform] duration-200 cursor-pointer enabled:active:scale-[0.96] whitespace-nowrap ${
                          active
                            ? 'bg-white text-ink shadow-[0_1px_3px_rgba(0,0,0,0.08),0_0_0_1px_rgba(10,13,20,0.06)]'
                            : 'text-ink-tertiary hover:text-ink'
                        }`}
                      >
                        {t(cat.label)}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tools Grid */}
              {/* Tools list: one row per tool, 2 columns from md, 1 column below */}
              <div className="p-6 overflow-y-auto overscroll-contain flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                {filtered.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-3.5 p-3.5 rounded-2xl border border-slate-200/80 bg-white hover:border-blue-400 transition-[border-color,box-shadow] duration-200 shadow-2xs min-w-0"
                  >
                    <div className="w-9 h-9 shrink-0 rounded-xl bg-slate-50 border border-slate-200/60 p-1.5 flex items-center justify-center">
                      {item.icon ? (
                        <img
                          src={item.icon}
                          alt={item.name}
                          className="w-5 h-5 object-contain"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <span
                          aria-hidden="true"
                          className="w-5 h-5 rounded-full bg-[#0055FF] text-white text-[10px] font-semibold flex items-center justify-center"
                        >
                          {item.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-medium text-sm text-ink">{item.name}</h4>
                      <p className="text-body-sm text-ink-tertiary line-clamp-2">
                        {t(item.desc)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="p-4 px-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-ink-tertiary">
                <span>{t(INTEGRATIONS.modal.showing)(filtered.length)}</span>
                <button
                  type="button"
                  onClick={closeDialog}
                  className="px-5 py-2 rounded-xl bg-accent hover:brightness-105 text-white font-medium transition-[color,background-color,border-color,box-shadow,transform,opacity] duration-200 shadow-xs hover:shadow-blue-500/20 cursor-pointer enabled:active:scale-[0.96]"
                >
                  {t(INTEGRATIONS.modal.done)}
                </button>
              </div>

            </motion.div>
          </>
        )}
      </dialog>

    </section>
  );
}

function AcousticRippleAnimation({ inView }: { inView: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 overflow-visible">
      <style>{`
        @keyframes etherealAcousticPulse {
          0% {
            transform: scale(0.92);
            opacity: 0;
          }
          22% {
            opacity: 0.38;
          }
          75% {
            opacity: 0.12;
          }
          100% {
            transform: scale(1.52);
            opacity: 0;
          }
        }
      `}</style>

      {/* Ambient Central Luminous Breathing Glow */}
      <motion.div
        animate={inView ? { scale: [1, 1.14, 1], opacity: [0.3, 0.5, 0.3] } : { scale: 1, opacity: 0.3 }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-44 h-44 rounded-full bg-gradient-to-tr from-white/60 via-cyan-200/25 to-blue-200/20 blur-2xl pointer-events-none"
      />

      {/* Static Concentric White Orbital Rings (Subtle, Faint, Elegant) */}
      <div className="absolute w-[170px] h-[170px] rounded-full border border-white/20 shadow-[0_0_12px_rgba(255,255,255,0.15)] pointer-events-none" />
      <div className="absolute w-[260px] h-[260px] rounded-full border border-white/12 shadow-[0_0_14px_rgba(255,255,255,0.08)] pointer-events-none" />

      {/* Single Meditative Expanding Acoustic Wave */}
      <div
        style={{
          animation: 'etherealAcousticPulse 4.8s cubic-bezier(0.22, 1, 0.36, 1) infinite',
          animationPlayState: inView ? 'running' : 'paused',
          willChange: 'transform, opacity'
        }}
        className="absolute w-[170px] h-[170px] rounded-full border border-white/35 shadow-[0_0_14px_rgba(255,255,255,0.22)] pointer-events-none"
      />
    </div>
  );
}

type Arc = { cx: number; bow: number; span: number };

// Percentages of the stage box. Slot 0 is the centre (nearest the hub), slots +-2 are the edges.
const ARC_WIDE: Arc = { cx: 68, bow: 3.5, span: 19 };
const ARC_NARROW: Arc = { cx: 58, bow: 3.5, span: 19 };

// The single curve: the SVG path and every pill position both come from here.
const arcPoint = (slot: number, arc: Arc) => ({ x: arc.cx + arc.bow * slot * slot, y: 50 + arc.span * slot });

const arcPath = (arc: Arc) => {
  const points: string[] = [];
  for (let i = -30; i <= 30; i += 1) {
    const { x, y } = arcPoint(i / 10, arc);
    points.push(`${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return `M${points.join(' L')}`;
};

const TOOLS = INTEGRATIONS.stage.tools;
const RING = TOOLS.length;
// Slots beyond +-HIDDEN_SLOT are off the stage. Pills only wrap from there, so the wrap is never visible.
const HIDDEN_SLOT = 4;
const STEP_MS = 2200;
const SPRING = { type: 'spring' as const, duration: 0.7, bounce: 0 };
const ARC_FADE = 'linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)';
const WIDE_QUERY = '(min-width: 1024px)';

// Offset of a tool from the active one, in -3..4. Positive slots sit below the active pill.
const ringSlot = (index: number, active: number) => {
  const d = (((index - active) % RING) + RING) % RING;
  return d > RING / 2 ? d - RING : d;
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

const logoMask = (src: string): CSSProperties => ({
  maskImage: `url(${src})`,
  WebkitMaskImage: `url(${src})`,
  maskSize: 'contain',
  WebkitMaskSize: 'contain',
  maskRepeat: 'no-repeat',
  WebkitMaskRepeat: 'no-repeat',
  maskPosition: 'center',
  WebkitMaskPosition: 'center',
});

function useIsWide() {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(WIDE_QUERY);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    () => window.matchMedia(WIDE_QUERY).matches,
    () => true,
  );
}

function ToolPill({
  tool,
  slot,
  rel,
  arc,
  onSelect,
}: {
  tool: (typeof TOOLS)[number];
  slot: MotionValue<number>;
  rel: number;
  arc: Arc;
  onSelect: () => void;
}) {
  const { t } = useLang();
  const active = rel === 0;
  const edge = Math.abs(rel) === 2;
  const near = Math.abs(rel) === 1;
  const left = useTransform(slot, (s) => `${arcPoint(s, arc).x}%`);
  const top = useTransform(slot, (s) => `${arcPoint(s, arc).y}%`);
  const opacity = useTransform(slot, (s) => clamp01(1 - (Math.abs(s) - 1) * 0.6));
  const scale = useTransform(slot, (s) => 1 + 0.06 * clamp01(1 - Math.abs(s)));

  return (
    <motion.div
      className="absolute w-max max-w-[min(11.5rem,52%)] -translate-x-1/2 -translate-y-1/2"
      style={{ left, top, opacity, scale }}
      inert={Math.abs(rel) > 2}
      aria-hidden={edge || undefined}
    >
      <button
        type="button"
        tabIndex={edge ? -1 : undefined}
        aria-pressed={active}
        aria-label={`${tool.name}, ${t(tool.sub)}`}
        onClick={onSelect}
        className={`flex w-full cursor-pointer select-none items-center gap-2 rounded-[20px] px-3 py-2.5 text-left sm:gap-2.5 sm:px-3.5 transition-[background-color,box-shadow] duration-300 ease-[var(--ease-out)] enabled:active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:rounded-[22px] ${
          active
            ? 'bg-white shadow-[0_1px_2px_rgba(0,20,60,0.06),0_14px_30px_rgba(0,30,80,0.14)]'
            : near
              ? 'bg-white/80 shadow-[0_6px_16px_rgba(0,30,80,0.05)] ring-1 ring-white/80 backdrop-blur-md'
              : 'bg-white/55 shadow-[0_6px_16px_rgba(0,30,80,0.05)] ring-1 ring-white/80 backdrop-blur-md'
        }`}
      >
        <span
          aria-hidden="true"
          className={`h-5 w-5 shrink-0 transition-[background-color] duration-300 ${active ? '' : 'bg-ink-tertiary'}`}
          style={{ ...logoMask(tool.logo), backgroundColor: active ? tool.color : undefined }}
        />
        <span className="min-w-0">
          <span className={`block whitespace-nowrap text-body-sm transition-[color] duration-300 ${active ? 'font-medium text-ink' : 'text-ink-secondary'}`}>
            {tool.name}
          </span>
          <span className={`block text-caption text-pretty transition-[color] duration-300 ${active || near ? 'text-ink-secondary' : 'text-ink-tertiary'}`}>
            {t(tool.sub)}
          </span>
        </span>
      </button>
    </motion.div>
  );
}

function FluidIntegrationsStage() {
  const { t } = useLang();
  const stageRef = useRef<HTMLDivElement>(null);
  const playback = useLoopPlayback(stageRef);
  const arc = useIsWide() ? ARC_WIDE : ARC_NARROW;
  const arcD = useMemo(() => arcPath(arc), [arc]);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const stepCount = useRef(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [slots] = useState(() => TOOLS.map((_, i) => motionValue(ringSlot(i, 0))));
  const paused = hovered || focused;

  // Moves every pill `steps` slots along the curve. A pill only wraps while it is off-stage.
  const moveBy = useCallback(
    (steps: number) => {
      if (steps === 0) return;
      slots.forEach((slot) => {
        let from = slot.get();
        let to = from - steps;
        if (to > HIDDEN_SLOT) {
          from -= RING;
          to -= RING;
        } else if (to < -HIDDEN_SLOT) {
          from += RING;
          to += RING;
        }
        if (playback.reduced) {
          slot.set(to);
          return;
        }
        slot.set(from);
        animate(slot, to, SPRING);
      });
      const next = (((activeRef.current + steps) % RING) + RING) % RING;
      activeRef.current = next;
      setActive(next);
    },
    [slots, playback.reduced],
  );

  useEffect(() => {
    if (!playback.enabled || paused) return;
    const timer = window.setInterval(() => {
      moveBy(1);
      stepCount.current += 1;
      if (stepCount.current % RING === 0 && !playback.endCycle()) window.clearInterval(timer);
    }, STEP_MS);
    return () => window.clearInterval(timer);
  }, [playback.enabled, paused, moveBy, playback.endCycle]);

  return (
    <div
      ref={stageRef}
      role="group"
      aria-label={t(INTEGRATIONS.stage.aria)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={(e) => {
        if (e.target instanceof HTMLElement && e.target.matches(':focus-visible')) setFocused(true);
      }}
      onBlur={() => setFocused(false)}
      className="relative h-[440px] w-full lg:h-full lg:min-h-[560px]"
    >
      <style>{`@keyframes integrationsArcFlow { to { stroke-dashoffset: -10; } }`}</style>

      {/* Background Fluid Wave Artwork Flush to Bottom-Right Corner & Clipped by Parent Card */}
      <div
        className="absolute right-0 bottom-0 w-full h-[76%] sm:h-[80%] rounded-bl-[140px] sm:rounded-bl-[180px] overflow-hidden pointer-events-none"
        style={{
          WebkitMaskImage: 'linear-gradient(to top, black 35%, rgba(0,0,0,0.85) 65%, transparent 100%)',
          maskImage: 'linear-gradient(to top, black 35%, rgba(0,0,0,0.85) 65%, transparent 100%)'
        }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 bg-[url('/integrations-bg.png')] bg-cover bg-right-bottom"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 6%, rgba(0,0,0,0.9) 25%, black 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 6%, rgba(0,0,0,0.9) 25%, black 100%)'
          }}
        />
      </div>

      {/* Hub link: runs from the hub to the centre slot, under the active pill */}
      <span aria-hidden="true" className="system-flow-x absolute left-0 top-1/2 h-px" style={{ width: `${arc.cx}%` }} />

      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ maskImage: ARC_FADE, WebkitMaskImage: ARC_FADE }}
      >
        <path
          d={arcD}
          fill="none"
          stroke="#CBD5E1"
          strokeWidth={1.25}
          strokeDasharray="4 6"
          vectorEffect="non-scaling-stroke"
          style={{
            animation: 'integrationsArcFlow 1.2s linear infinite',
            animationPlayState: playback.inView ? 'running' : 'paused'
          }}
        />
      </svg>

      {TOOLS.map((tool, i) => {
        const rel = ringSlot(i, active);
        return (
          <ToolPill
            key={tool.name}
            tool={tool}
            slot={slots[i]}
            rel={rel}
            arc={arc}
            onSelect={() => moveBy(ringSlot(i, activeRef.current))}
          />
        );
      })}

      {/* Hub: from xl one white pill holds the text and the logo circle (8px padding = concentric radius). Below xl it is the logo circle alone. */}
      <div className="absolute left-2 top-1/2 z-10 flex -translate-y-1/2 items-center gap-2.5 sm:left-4 xl:left-3 xl:gap-3 xl:rounded-full xl:bg-white xl:py-2 xl:pl-5 xl:pr-2 xl:shadow-[0_0_0_1px_rgba(15,23,42,0.04),0_10px_25px_rgba(0,30,80,0.06),0_2px_6px_rgba(0,0,0,0.02)]">
        <div className="sr-only text-right xl:not-sr-only">
          <p className="text-body-sm font-medium text-ink">{t(INTEGRATIONS.stage.hub.title)}</p>
          <p className="text-caption text-ink-tertiary">{t(INTEGRATIONS.stage.hub.sub)}</p>
        </div>

        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/80 shadow-[0_12px_30px_rgba(0,30,80,0.08)] ring-1 ring-white lg:h-[88px] lg:w-[88px]">
          <AcousticRippleAnimation inView={playback.inView} />
          <motion.div
            animate={playback.inView ? { y: [0, -4, 0] } : { y: 0 }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative z-10 flex items-center justify-center will-change-transform transform-gpu"
          >
            <img
              src="/elev-infinity-logo.png"
              alt=""
              className="h-auto w-11 object-contain filter drop-shadow-[0_12px_24px_rgba(0,85,255,0.25)] pointer-events-none select-none lg:w-14"
            />
          </motion.div>
        </div>
      </div>

      {playback.finished && <LoopReplayButton onClick={playback.replay} className="absolute bottom-3 right-3 z-20" />}
    </div>
  );
}
