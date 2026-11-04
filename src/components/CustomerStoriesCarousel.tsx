import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Reveal, StaggerGroup } from '../motion';
import { useLang } from '../i18n';
import { CASE_STUDIES, DEMO_CHAT, DEMO_ENRICH } from '../data/landingData';
import DemoChat from './DemoChat';
import DemoEnrich from './DemoEnrich';

const PANEL_EASE = [0.23, 1, 0.32, 1] as const;

export default function CustomerStoriesCarousel() {
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const item = CASE_STUDIES.items[active];

  return (
    <section id="work" className="py-28 sm:py-36 lg:py-44 bg-white border-t border-[#E2E8F0] relative overflow-hidden text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 lg:mb-24">
          <Reveal y={16}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E2E8F0] shadow-2xs mb-6">
              <span className="w-2 h-2 rounded-full bg-[#0055FF]" />
              <span className="text-[11px] font-normal uppercase tracking-widest text-[#0A0D14]">
                {t(CASE_STUDIES.eyebrow)}
              </span>
            </div>
          </Reveal>

          <Reveal y={24} delay={0.08}>
            <h2 className="text-3xl sm:text-4xl lg:text-[3.25rem] text-[#0A0D14] font-normal leading-[1.15] tracking-tight text-balance">
              {t(CASE_STUDIES.headingLead)}{' '}
              <span className="font-instrument italic font-normal bg-gradient-to-r from-[#418AC1] to-[#506DFD] bg-clip-text text-transparent inline-block pr-1">
                {t(CASE_STUDIES.headingAccent)}
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.12} y={16}>
            <p className="mt-4 text-sm sm:text-base text-slate-500 leading-relaxed text-pretty max-w-xl mx-auto">
              {t(CASE_STUDIES.footnote)}
            </p>
          </Reveal>
        </div>

        {/* Case tabs: 4 across on desktop, horizontal snap scroll on mobile */}
        <div
          role="tablist"
          className="flex md:grid md:grid-cols-4 gap-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none pb-2 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {CASE_STUDIES.items.map((cs, i) => {
            const isActive = i === active;
            return (
              <button
                key={cs.title.en}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(i)}
                className={`relative snap-start shrink-0 w-[72vw] sm:w-72 md:w-auto md:shrink text-left rounded-[20px] p-4 sm:p-5 border transition-[color,border-color,background-color,transform] duration-200 active:scale-[0.96] cursor-pointer ${
                  isActive
                    ? 'text-slate-900 border-slate-200/90 bg-white'
                    : 'text-slate-500 border-transparent hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="workActiveTab"
                    transition={{ type: 'spring', stiffness: 500, damping: 35, bounce: 0 }}
                    className="absolute inset-0 rounded-[20px] bg-white border border-slate-200/90 shadow-[0_8px_24px_rgba(0,35,102,0.06),0_2px_6px_rgba(0,0,0,0.02)]"
                  />
                )}
                <span className="relative block text-[11px] font-normal uppercase tracking-widest text-slate-500 tabular-nums">
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
                  <p className="text-[11px] font-normal uppercase tracking-widest text-slate-500">
                    {t(CASE_STUDIES.labels.problem)}
                  </p>
                  <p className="font-editorial text-xl sm:text-2xl text-[#0A0D14] leading-snug text-pretty">
                    {t(item.problem)}
                  </p>

                  {item.flow && (
                    <ol className="flex flex-wrap items-center gap-2">
                      {t(item.flow).map((step, i, steps) => (
                        <li key={step} className="flex items-center gap-2">
                          <span className="text-xs font-normal text-slate-700 bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-full">
                            {step}
                          </span>
                          {i < steps.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />}
                        </li>
                      ))}
                    </ol>
                  )}

                  {item.quote && !item.quote.confirm && (
                    <blockquote className="pl-4 border-l-2 border-[#0055FF]/40">
                      <p className="font-editorial italic text-lg text-slate-700 leading-relaxed">
                        {t(item.quote.text)}
                      </p>
                      <footer className="mt-2 text-xs text-slate-500">{t(item.quote.by)}</footer>
                    </blockquote>
                  )}
                </div>

                {/* Right: metrics */}
                <ul className="lg:col-span-6 divide-y divide-slate-100">
                  {item.metrics.map((metric) => (
                    <li key={metric.value} className="py-5 first:pt-0 last:pb-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                        <span className="font-editorial text-4xl sm:text-5xl text-[#0A0D14] leading-none tracking-tight tabular-nums">
                          {metric.value}
                        </span>
                        <span
                          className={`text-[10px] font-normal uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                            metric.basis === 'actual'
                              ? 'text-[#0055FF] bg-blue-50 border-blue-200/60'
                              : 'text-slate-600 bg-slate-100 border-slate-200/60'
                          }`}
                        >
                          {t(CASE_STUDIES.basis[metric.basis])}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed">{t(metric.label)}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom: built with */}
              <div className="mt-10 pt-6 border-t border-slate-100">
                <p className="text-[11px] font-normal uppercase tracking-widest text-slate-500 mb-3">
                  {t(CASE_STUDIES.labels.builtWith)}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {item.builtWith.map((tool) => (
                    <li
                      key={tool}
                      className="text-xs font-normal text-slate-700 bg-white border border-slate-200/80 shadow-2xs px-3 py-1 rounded-full"
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
            <h3 className="text-center text-2xl sm:text-3xl text-[#0A0D14] font-normal leading-tight tracking-tight text-balance">
              {t(CASE_STUDIES.demosHeading)}
            </h3>
          </Reveal>

          <StaggerGroup
            stagger={0.16}
            y={32}
            blur={6}
            startScale={0.965}
            className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-7 lg:gap-8 items-start"
          >
            <div className="min-w-0">
              <DemoChat />
              <p className="mt-4 text-xs text-slate-400 text-center">{t(DEMO_CHAT.caption)}</p>
            </div>
            <div className="min-w-0">
              <DemoEnrich />
              <p className="mt-4 text-xs text-slate-400 text-center">{t(DEMO_ENRICH.caption)}</p>
            </div>
          </StaggerGroup>
        </div>

      </div>
    </section>
  );
}
