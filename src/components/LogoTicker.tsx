import { useRef } from 'react';
import { Reveal, useInView, usePrefersReducedMotion } from '../motion';
import { useLang } from '../i18n';
import { INTEGRATIONS, TOOLS } from '../data/landingData';

// Logo files come from the integrations list (public/logos). A tool with no file shows its name only.
const LOGO_BY_NAME = Object.fromEntries(INTEGRATIONS.items.map((item) => [item.name, item.icon]));

export default function LogoTicker() {
  const { t } = useLang();
  const reduced = usePrefersReducedMotion();
  const marqueeRef = useRef<HTMLDivElement>(null);
  const inView = useInView(marqueeRef);

  const renderItems = () =>
    TOOLS.items.map((name) => {
      const logo = LOGO_BY_NAME[name];
      return (
        <li key={name} className="group flex shrink-0 items-center gap-2.5">
          {logo && (
            <img
              src={logo}
              alt=""
              width={24}
              height={24}
              loading="lazy"
              className="h-6 w-6 object-contain grayscale opacity-60 transition-[filter,opacity] duration-200 ease-out group-hover:grayscale-0 group-hover:opacity-100"
            />
          )}
          <span className="whitespace-nowrap text-body-sm font-medium text-ink-tertiary transition-colors duration-200 group-hover:text-ink-secondary">
            {name}
          </span>
        </li>
      );
    });

  return (
    <section className="py-16 sm:py-24 lg:py-24 border-y border-slate-100/90 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal y={16}>
          <h2 className="text-center text-label font-medium text-ink-tertiary uppercase mb-10 sm:mb-12">
            {t(TOOLS.heading)}
          </h2>
        </Reveal>
      </div>

      {reduced ? (
        // Reduced motion: a static wrapped list instead of a marquee.
        <ul className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-6 px-4 sm:px-6 lg:px-8">
          {renderItems()}
        </ul>
      ) : (
        // Edge-faded marquee. Two identical copies make the -50% loop seamless. Paused off-screen by data-motion-paused.
        <div
          ref={marqueeRef}
          data-motion-paused={!inView || undefined}
          className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)] [-webkit-mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
        >
          <div className="flex w-max animate-[marquee_40s_linear_infinite]">
            <ul className="flex shrink-0 items-center gap-14 pr-14">{renderItems()}</ul>
            <ul aria-hidden="true" className="flex shrink-0 items-center gap-14 pr-14">{renderItems()}</ul>
          </div>
        </div>
      )}
    </section>
  );
}
