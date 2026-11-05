import { AnimatePresence, motion } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';
import { Reveal, StaggerGroup } from '../motion';
import { useLang } from '../i18n';
import { ENGAGEMENT, SITE } from '../data/landingData';

export default function PricingSection() {
  const { t } = useLang();
  const whatsappHref = SITE.whatsapp(t(SITE.waPrefillDefault));
  const calendlyHref = SITE.calendly;

  return (
    <section id="engagement" className="py-16 sm:py-24 lg:py-24 bg-white border-t border-[#E2E8F0] relative overflow-hidden text-ink">
      {/* Ambient background glows */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(0,85,255,0.08)_0%,rgba(147,197,253,0.12)_45%,transparent_75%)] blur-3xl rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 lg:mb-24">
          <Reveal y={24}>
            <h2 className="text-h2 lg:text-h2-lg text-ink font-medium text-balance">
              {t(ENGAGEMENT.heading.lead)}{' '}
              <span className="font-instrument italic font-normal bg-gradient-to-r from-[#418AC1] to-[#506DFD] bg-clip-text text-transparent inline-block pr-1">
                {t(ENGAGEMENT.heading.accent)}
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.12} y={16}>
            <p className="mt-4 text-lead text-ink-secondary max-w-[62ch] text-pretty mx-auto">
              {t(ENGAGEMENT.sub)}
            </p>
          </Reveal>
        </div>

        {/* 2-Card Clean Pricing Grid with Cinematic Stagger Curtain */}
        <StaggerGroup
          stagger={0.16}
          y={32}
          blur={6}
          startScale={0.965}
          className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-8 items-stretch max-w-4xl mx-auto mb-16"
        >

          {/* CARD 1: Build */}
          <div className="relative rounded-[32px] bg-white border border-slate-200/90 p-8 sm:p-10 flex flex-col justify-between overflow-hidden shadow-[0_16px_48px_rgba(0,35,102,0.05),0_2px_8px_rgba(0,0,0,0.02)] transition-[border-color,box-shadow,transform] duration-300 hover:border-slate-300 hover:shadow-[0_24px_56px_rgba(0,35,102,0.08)] group">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-h3 font-medium text-ink">
                  {t(ENGAGEMENT.build.name)}
                </h3>
                <span className="text-label font-medium uppercase text-ink-tertiary bg-slate-100 border border-slate-200/80 px-2.5 py-0.5 rounded-full">
                  {t(ENGAGEMENT.build.badge)}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2 mt-4 flex-wrap">
                <AnimatePresence mode="wait">
                  <motion.span
                    key="build-price"
                    initial={{ opacity: 0, y: -6, filter: 'blur(2px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: 6, filter: 'blur(2px)' }}
                    transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                    className="text-5xl sm:text-6xl font-semibold text-ink tracking-tight tabular-nums font-sans leading-none"
                  >
                    {t(ENGAGEMENT.build.price)}
                  </motion.span>
                </AnimatePresence>
                <span className="text-base sm:text-lg font-normal text-ink-tertiary">
                  {t(ENGAGEMENT.build.unit)}
                </span>
              </div>

              {/* Tagline */}
              <p className="text-sm text-ink-tertiary mt-4 leading-relaxed font-normal min-h-[44px]">
                {t(ENGAGEMENT.build.body)}
              </p>

              {/* CTA Button */}
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center w-full mt-7 py-3.5 px-6 rounded-full bg-gradient-to-r from-[#2F6BEA] to-[#0055FF] hover:brightness-105 text-white font-medium text-sm sm:text-base tracking-tight shadow-[0_8px_24px_rgba(0,85,255,0.24)] hover:shadow-[0_12px_28px_rgba(0,85,255,0.36)] transition-[filter,box-shadow,transform] duration-160 active:scale-[0.96] cursor-pointer"
              >
                {t(ENGAGEMENT.build.cta)}
              </a>

              {/* Subtext under button */}
              <p className="text-caption text-ink-tertiary text-center mt-2.5">
                {t(ENGAGEMENT.build.note)}
              </p>

              {/* Feature List */}
              <div className="mt-8 pt-7 border-t border-slate-100">
                <p className="text-sm font-normal text-ink mb-4">
                  {t(ENGAGEMENT.build.includesHeading)}
                </p>
                <ul className="space-y-3.5">
                  {ENGAGEMENT.build.features.map((feature) => (
                    <li key={feature.en} className="flex items-center gap-3 text-sm text-ink-secondary font-normal leading-relaxed">
                      <div className="w-5 h-5 rounded-full bg-blue-50 text-accent flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[1.75]" />
                      </div>
                      <span>{t(feature)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 text-xs font-normal text-ink-tertiary text-center">
              {t(ENGAGEMENT.build.footer)}
            </div>
          </div>

          {/* CARD 2: Grow (highlighted) */}
          <div className="relative rounded-[32px] bg-white border-2 border-[#0055FF] p-8 sm:p-10 flex flex-col justify-between overflow-hidden shadow-[0_20px_60px_rgba(0,85,255,0.12),0_4px_16px_rgba(0,0,0,0.03)] transition-[border-color,box-shadow,transform] duration-300 hover:shadow-[0_28px_72px_rgba(0,85,255,0.18)] group md:-translate-y-1">
            {/* Top-Right Soft Aurora Glow (Light Adaptation of Reference Glow) */}
            <div
              className="pointer-events-none absolute -top-16 -right-16 w-80 h-80 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,85,255,0.09)_0%,rgba(168,85,247,0.05)_42%,transparent_72%)] blur-2xl transition-opacity duration-500 opacity-90 group-hover:opacity-100"
              aria-hidden="true"
            />

            <div>
              {/* Header */}
              <div className="flex items-center justify-between relative z-10">
                <h3 className="text-h3 font-medium text-ink">
                  {t(ENGAGEMENT.grow.name)}
                </h3>
                <span className="text-label font-medium uppercase text-accent bg-blue-50 border border-blue-200/60 px-2.5 py-0.5 rounded-full">
                  {t(ENGAGEMENT.grow.badge)}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2 mt-4 flex-wrap relative z-10">
                <AnimatePresence mode="wait">
                  <motion.span
                    key="grow-price"
                    initial={{ opacity: 0, y: -6, filter: 'blur(2px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: 6, filter: 'blur(2px)' }}
                    transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                    className="text-5xl sm:text-6xl font-semibold text-ink tracking-tight tabular-nums font-sans leading-none"
                  >
                    {t(ENGAGEMENT.grow.price)}
                  </motion.span>
                </AnimatePresence>
                <span className="text-base sm:text-lg font-normal text-ink-tertiary">
                  {t(ENGAGEMENT.grow.unit)}
                </span>
              </div>

              {/* Tagline */}
              <p className="text-sm text-ink-tertiary mt-4 leading-relaxed font-normal min-h-[44px] relative z-10">
                {t(ENGAGEMENT.grow.body)}
              </p>

              {/* CTA Button */}
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center w-full mt-7 py-3.5 px-6 rounded-full bg-gradient-to-r from-[#2F6BEA] to-[#0055FF] hover:brightness-105 text-white font-medium text-sm sm:text-base tracking-tight shadow-[0_8px_24px_rgba(0,85,255,0.28)] hover:shadow-[0_12px_28px_rgba(0,85,255,0.4)] transition-[filter,box-shadow,transform] duration-160 active:scale-[0.96] cursor-pointer relative z-10"
              >
                {t(ENGAGEMENT.grow.cta)}
              </a>

              {/* Subtext under button */}
              <p className="text-caption text-ink-tertiary text-center mt-2.5 relative z-10">
                {t(ENGAGEMENT.grow.note)}
              </p>

              {/* Feature List */}
              <div className="mt-8 pt-7 border-t border-slate-100 relative z-10">
                <p className="text-sm font-normal text-ink mb-4">
                  {t(ENGAGEMENT.grow.includesHeading)}
                </p>
                <ul className="space-y-3.5">
                  {ENGAGEMENT.grow.features.map((feature) => (
                    <li key={feature.en} className="flex items-center gap-3 text-sm text-ink-secondary font-normal leading-relaxed">
                      <div className="w-5 h-5 rounded-full bg-blue-50 text-accent flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[1.75]" />
                      </div>
                      <span>{t(feature)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 text-xs font-normal text-ink-tertiary text-center relative z-10">
              {t(ENGAGEMENT.grow.footer)}
            </div>
          </div>

        </StaggerGroup>

        {/* Audit row: quiet full-width line, text left and action right */}
        <Reveal y={20} className="w-full mt-16 sm:mt-20 lg:mt-24">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-y border-slate-200/80 text-center sm:text-left">
            <div>
              <h4 className="text-sm font-medium text-ink">{t(ENGAGEMENT.audit.title)}</h4>
              <p className="text-body-sm text-ink-tertiary mt-0.5">{t(ENGAGEMENT.audit.body)}</p>
            </div>

            <a
              href={calendlyHref}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-11 px-5 rounded-full bg-slate-100 hover:bg-slate-200 text-ink text-sm font-medium border border-slate-200 transition-colors shrink-0 active:scale-[0.96] cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>{t(ENGAGEMENT.audit.cta)}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
