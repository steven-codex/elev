import { Reveal, StaggerGroup } from '../motion';
import { useLang } from '../i18n';
import { TOOLS } from '../data/landingData';

export default function LogoTicker() {
  const { t } = useLang();

  return (
    <section className="py-20 sm:py-24 lg:py-28 border-y border-slate-100/90 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal y={16}>
          <div>
            <p className="text-center text-xs sm:text-sm font-normal text-slate-500 uppercase tracking-wider mb-3">
              {t(TOOLS.heading)}
            </p>
            <p className="text-center text-sm sm:text-base font-normal text-slate-500 mb-10 sm:mb-12">
              {t(TOOLS.sub)}
            </p>
          </div>
        </Reveal>

        <StaggerGroup
          stagger={0.06}
          className="flex flex-wrap items-center justify-center gap-10 sm:gap-14 lg:gap-20 text-slate-400 opacity-80 hover:opacity-100 transition-opacity"
        >
          {TOOLS.logos.map((name) => (
            <div
              key={name}
              className="hover:text-slate-700 transition-colors cursor-default hover-lift"
              title={name}
            >
              <span className="inline-flex h-6 items-center text-lg font-semibold tracking-tight whitespace-nowrap">
                {name}
              </span>
            </div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
