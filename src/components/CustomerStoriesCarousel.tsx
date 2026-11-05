import { useRef, useState, type KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Reveal, StaggerGroup } from '../motion';
import { useLang } from '../i18n';
import { CASE_STUDIES, DEMO_CHAT, DEMO_ENRICH, SITE } from '../data/landingData';
import DemoChat from './DemoChat';
import DemoEnrich from './DemoEnrich';

const PANEL_EASE = [0.23, 1, 0.32, 1] as const;

export default function CustomerStoriesCarousel() {
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const item = CASE_STUDIES.items[active];
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Arrow keys, Home and End move between tabs (roving tabindex), and the new tab takes focus.
  const onTabKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const count = CASE_STUDIES.items.length;
    const nextIndex: Record<string, number> = {
      ArrowRight: (active + 1) % count,
      ArrowLeft: (active - 1 + count) % count,
      Home: 0,
      End: count - 1,
    };
    const next = nextIndex[e.key];
    if (next === undefined) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="work" className="py-16 sm:py-24 lg:py-24 bg-white border-t border-[#E2E8F0] relative overflow-hidden text-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 lg:mb-24">
          <Reveal y={24} delay={0.08}>
            <h2 className="text-h2 lg:text-h2-lg text-ink font-medium text-balance">
              {t(CASE_STUDIES.headingLead)}{' '}
              <span className="font-instrument italic font-normal bg-gradient-to-r from-[#418AC1] to-[#506DFD] bg-clip-text text-transparent inline-block pr-1">
                {t(CASE_STUDIES.headingAccent)}
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.12} y={16}>
            <p className="mt-4 text-body text-ink-tertiary max-w-[62ch] text-pretty mx-auto">
              {t(CASE_STUDIES.footnote)}
            </p>
          </Reveal>
        </div>

        {/* Case tabs: 4 across on desktop, horizontal snap scroll on mobile */}
        <div
          role="tablist"
          aria-label={t(SITE.a11y.caseStudies)}
          onKeyDown={onTabKeyDown}
          className="flex md:grid md:grid-cols-4 gap-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none pb-2 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {CASE_STUDIES.items.map((cs, i) => {
            const isActive = i === active;
            return (
              <button
                key={cs.title.en}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                id={`case-tab-${i}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="case-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(i)}
                className={`relative isolate snap-start shrink-0 w-[72vw] sm:w-72 md:w-auto md:shrink text-left rounded-[20px] p-4 sm:p-5 border border-transparent transition-[color,transform] duration-200 enabled:active:scale-[0.96] cursor-pointer ${
                  isActive ? 'text-ink' : 'text-ink-tertiary hover:text-ink'
                }`}
              >
                {/* Sliding active surface: shared layoutId keeps the spring between cases */}
                {isActive && (
                  <motion.div
                    layoutId="workActiveTab"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    className="absolute inset-0 -z-10 rounded-[20px] bg-white shadow-[0_8px_24px_rgba(0,35,102,0.06),0_0_0_1px_rgba(10,13,20,0.06)]"
                  />
                )}
                <span className="relative block text-label font-medium uppercase text-ink-tertiary tabular-nums">
                  {t(cs.industry)}
                </span>
                <span className="relative block mt-1.5 text-base sm:text-lg font-normal tracking-tight">
                  {t(cs.title)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active case detail panel */}
        <div
          role="tabpanel"
          id="case-panel"
          aria-labelledby={`case-tab-${active}`}
          tabIndex={0}
          className="mt-6 sm:mt-8 bg-white rounded-[28px] p-6 sm:p-10 lg:p-12 shadow-[0_20px_50px_rgba(0,35,102,0.08),0_4px_12px_rgba(0,0,0,0.03)] border border-slate-100/80"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, filter: 'blur(6px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(6px)' }}
              transition={{ duration: 0.22, ease: PANEL_EASE }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
                {/* Left: problem, flow and quote */}
                <div className="lg:col-span-6 space-y-6">
                  <p className="text-label font-medium uppercase text-ink-tertiary">
                    {t(CASE_STUDIES.labels.problem)}
                  </p>
                  <p className="text-lead text-ink max-w-[62ch] text-pretty">
                    {t(item.problem)}
                  </p>

                  {item.flow && (
                    <ol className="flex flex-wrap items-center gap-2">
                      {t(item.flow).map((step, i, steps) => (
                        <li key={step} className="flex items-center gap-2">
                          <span className="text-xs font-normal text-ink-secondary bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-full">
                            {step}
                          </span>
                          {i < steps.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-ink-tertiary shrink-0" aria-hidden="true" />}
                        </li>
                      ))}
                    </ol>
                  )}

                  {item.quote && !item.quote.confirm && (
                    <blockquote className="pl-4 border-l-2 border-[#0055FF]/40">
                      <p className="font-editorial italic text-lg text-ink-secondary leading-relaxed">
                        {t(item.quote.text)}
                      </p>
                      <footer className="mt-2 text-xs text-ink-tertiary">{t(item.quote.by)}</footer>
                    </blockquote>
                  )}
                </div>

                {/* Right: metrics */}
                <ul className="lg:col-span-6 divide-y divide-slate-100">
                  {item.metrics.map((metric) => (
                    <li key={metric.value} className="py-5 first:pt-0 last:pb-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                        <span className="text-display font-semibold text-ink tabular-nums">
                          {metric.value}
                        </span>
                        <span
                          className={`text-label font-medium uppercase px-2 py-0.5 rounded-full border ${
                            metric.basis === 'actual'
                              ? 'text-emerald-700 bg-emerald-50 border-emerald-200/80'
                              : 'text-ink-secondary bg-slate-100 border-slate-200/60'
                          }`}
                        >
                          {t(CASE_STUDIES.basis[metric.basis])}
                        </span>
                      </div>
                      <p className="mt-2 text-body-sm text-ink-secondary">{t(metric.label)}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom: built with */}
              <div className="mt-10 pt-6 border-t border-slate-100">
                <p className="text-label font-medium uppercase text-ink-tertiary mb-3">
                  {t(CASE_STUDIES.labels.builtWith)}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {item.builtWith.map((tool) => (
                    <li
                      key={tool}
                      className="text-xs font-normal text-ink-secondary bg-white border border-slate-200/80 shadow-2xs px-3 py-1 rounded-full"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Demos */}
        <div className="mt-20 sm:mt-24 lg:mt-28">
          <Reveal y={24}>
            <h3 className="text-center text-h3 font-medium text-ink text-balance">
              {t(CASE_STUDIES.demosHeading)}
            </h3>
          </Reveal>

          <StaggerGroup
            stagger={0.16}
            y={32}
            blur={6}
            startScale={0.965}
            className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-7 lg:gap-8 items-stretch"
          >
            <div className="min-w-0 flex flex-col">
              <DemoChat />
              <p className="mt-4 text-caption text-ink-tertiary text-center">{t(DEMO_CHAT.caption)}</p>
            </div>
            <div className="min-w-0 flex flex-col">
              <DemoEnrich />
              <p className="mt-4 text-caption text-ink-tertiary text-center">{t(DEMO_ENRICH.caption)}</p>
            </div>
          </StaggerGroup>
        </div>

      </div>
    </section>
  );
}
