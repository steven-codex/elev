import { useState, useMemo, useRef, useId } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Search, X } from 'lucide-react';
import { Reveal, useInView } from '../motion';
import { useLang } from '../i18n';
import { INTEGRATIONS, SITE } from '../data/landingData';

// Logo files live in public/logos/ (Simple Icons, CC0).
const itemIcon = (name: string) => INTEGRATIONS.items.find((item) => item.name === name)?.icon ?? '';

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

function IntegrationPill({
  name,
  icon,
  inView,
  floatOffset = 2.5,
  floatDuration = 5,
  floatDelay = 0
}: {
  name: string;
  icon: string;
  inView: boolean;
  floatOffset?: number;
  floatDuration?: number;
  floatDelay?: number;
}) {
  return (
    <motion.div
      animate={inView ? { y: [-floatOffset, floatOffset, -floatOffset] } : { y: 0 }}
      transition={{
        duration: floatDuration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: floatDelay
      }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.96 }}
      className="bg-white border border-slate-100/90 shadow-[0_10px_25px_rgba(0,30,80,0.06),0_2px_6px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_36px_rgba(0,30,80,0.12)] px-4 sm:px-5 py-2.5 sm:py-3 rounded-[20px] sm:rounded-[22px] flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none transition-shadow shrink-0"
    >
      <img
        src={icon}
        alt={name}
        className="w-5 h-5 sm:w-5.5 sm:h-5.5 object-contain shrink-0"
        onError={(e) => {
          (e.target as HTMLElement).style.display = 'none';
        }}
      />
      <span className="text-xs sm:text-sm font-normal text-ink tracking-tight whitespace-nowrap">{name}</span>
    </motion.div>
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

function FluidIntegrationsStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef);
  return (
    <div ref={stageRef} className="relative w-full h-full min-h-[480px] sm:min-h-[520px] lg:min-h-[560px] flex flex-col justify-between pt-10 sm:pt-12 pb-8 sm:pb-10 pr-4 sm:pr-8 lg:pr-10 pl-2">
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

      {/* Row 1: Top Row (Sitting on Pristine White Field above Wave) */}
      <div className="relative z-10 w-full flex items-center justify-center gap-3 sm:gap-5 lg:gap-6">
        <IntegrationPill
          inView={inView}
          name="WhatsApp"
          icon={itemIcon('WhatsApp')}
          floatOffset={2.5}
          floatDuration={4.8}
          floatDelay={0}
        />
        <IntegrationPill
          inView={inView}
          name="n8n"
          icon={itemIcon('n8n')}
          floatOffset={3}
          floatDuration={5.2}
          floatDelay={0.5}
        />
        <IntegrationPill
          inView={inView}
          name="Google Sheets"
          icon={itemIcon('Google Sheets')}
          floatOffset={2.5}
          floatDuration={4.4}
          floatDelay={1.2}
        />
      </div>

      {/* Row 2: Middle Row (OpenAI, Newseed 3D Infinity with Radar Animation, HubSpot) */}
      <div className="relative z-10 w-full flex items-center justify-between px-1 sm:px-3 lg:px-4">
        <IntegrationPill
          inView={inView}
          name="OpenAI"
          icon={itemIcon('OpenAI')}
          floatOffset={3}
          floatDuration={5.6}
          floatDelay={0.8}
        />

        {/* Center 3D Infinity Logo with Animated Radar System */}
        <div className="relative shrink-0 flex items-center justify-center p-2">
          {/* Acoustic Ripple Animation Layer */}
          <AcousticRippleAnimation inView={inView} />

          {/* 3D Infinity Mark */}
          <motion.div
            animate={inView ? { y: [0, -4, 0] } : { y: 0 }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative z-10 flex items-center justify-center group cursor-pointer will-change-transform transform-gpu"
          >
            <img
              src="/elev-infinity-logo.png"
              alt="Newseed"
              className="w-24 sm:w-28 md:w-32 lg:w-36 h-auto object-contain filter drop-shadow-[0_12px_24px_rgba(0,85,255,0.25)] group-hover:scale-105 transition-transform duration-300 pointer-events-none select-none"
            />
          </motion.div>
        </div>

        <IntegrationPill
          inView={inView}
          name="HubSpot"
          icon={itemIcon('HubSpot')}
          floatOffset={2.5}
          floatDuration={4.9}
          floatDelay={1.5}
        />
      </div>

      {/* Row 3: Bottom Row (Claude, Make, Notion) */}
      <div className="relative z-10 w-full flex items-center justify-center gap-3 sm:gap-5 lg:gap-6">
        <IntegrationPill
          inView={inView}
          name="Claude"
          icon={itemIcon('Claude')}
          floatOffset={3}
          floatDuration={5.1}
          floatDelay={0.3}
        />
        <IntegrationPill
          inView={inView}
          name="Make"
          icon={itemIcon('Make')}
          floatOffset={2.5}
          floatDuration={4.6}
          floatDelay={1.0}
        />
        <IntegrationPill
          inView={inView}
          name="Notion"
          icon={itemIcon('Notion')}
          floatOffset={3}
          floatDuration={5.4}
          floatDelay={0.7}
        />
      </div>
    </div>
  );
}
