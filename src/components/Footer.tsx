import type { MouseEvent } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { ImageReveal } from '../motion';
import { useLang } from '../i18n';
import type { Lang } from '../i18n';
import { FOOTER, NAV, SERVICES, SITE } from '../data/landingData';

export default function Footer() {
  const { lang, setLang, t } = useLang();
  // Email row stays hidden until SITE.email is provided.
  const showEmail = !SITE.email.startsWith('[CONFIRM]');
  const whatsappHref = SITE.whatsapp(t(SITE.waPrefillDefault));
  const companyLinks = NAV.items.filter((item) => item.href !== '#services');

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', ' ');
      return;
    }

    const targetEl = document.querySelector(href);
    if (targetEl) {
      const targetTop = targetEl.getBoundingClientRect().top + window.scrollY - 76;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
      window.history.pushState(null, '', href);
    }
  };

  const linkClass = 'text-body-sm text-ink-inverse/70 hover:text-ink-inverse transition-colors cursor-pointer';

  return (
    <footer className="w-full bg-transparent pt-16 sm:pt-20 lg:pt-24 pb-20 sm:pb-28 lg:pb-32 px-4 relative z-10">
      {/* FLOATING ROUNDED CARD CONTAINER */}
      <ImageReveal delay={0.1} y={28} className="w-full flex justify-center">
        <div className="max-w-[1360px] w-[95vw] lg:w-[88vw] mx-auto rounded-[32px] sm:rounded-[40px] bg-[#0A0D18] border border-slate-800/80 shadow-[0_25px_80px_-15px_rgba(0,0,0,0.4)] p-9 sm:p-14 lg:p-16 text-white">

          {/* TOP ROW: BRAND & HEADLINE */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 pb-12">
            <div className="space-y-4 max-w-xl">
              <div className="flex items-center gap-3.5 sm:gap-4">
                <img
                  src="/elev-infinity-logo.png"
                  alt={SITE.brand}
                  className="h-10 sm:h-12 md:h-14 w-auto object-contain"
                />
                <span className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight">
                  {SITE.brand}
                </span>
              </div>

              <h2 className="text-h2 lg:text-h2-lg text-white font-medium text-balance">
                {t(FOOTER.heading.lead)} <br />
                <span className="font-instrument italic font-normal bg-gradient-to-r from-[#418AC1] to-[#506DFD] bg-clip-text text-transparent inline-block pr-1">
                  {t(FOOTER.heading.accent)}
                </span>
              </h2>

              <p className="text-slate-400 text-sm leading-relaxed max-w-md font-normal">
                {t(FOOTER.tagline)}
              </p>
            </div>
          </div>

          {/* MIDDLE ROW: LINKS */}
          <div className="pt-12 pb-14 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 max-w-2xl">
            {/* Col 1: SERVICES */}
            <div>
              <h4 className="text-label font-medium uppercase text-ink-inverse/60 mb-4">
                {t(FOOTER.headings.services)}
              </h4>
              <ul className="space-y-2.5 text-body-sm">
                {SERVICES.items.map((service) => (
                  <li key={service.title.en}>
                    <a href="#services" onClick={(e) => handleNavClick(e, '#services')} className={linkClass}>
                      {t(service.title)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 2: COMPANY */}
            <div>
              <h4 className="text-label font-medium uppercase text-ink-inverse/60 mb-4">
                {t(FOOTER.headings.company)}
              </h4>
              <ul className="space-y-2.5 text-body-sm">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} onClick={(e) => handleNavClick(e, link.href)} className={linkClass}>
                      {t(link.label)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: CONTACT */}
            <div>
              <h4 className="text-label font-medium uppercase text-ink-inverse/60 mb-4">
                {t(FOOTER.headings.contact)}
              </h4>
              <ul className="space-y-2.5 text-body-sm">
                <li>
                  <a href={SITE.calendly} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {t(FOOTER.bookAudit)}
                  </a>
                </li>
                <li>
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {t(FOOTER.whatsapp)}
                  </a>
                </li>
                {showEmail && (
                  <li>
                    <a href={`mailto:${SITE.email}`} className={linkClass}>
                      {SITE.email}
                    </a>
                  </li>
                )}
                <li>
                  <a href="#top" onClick={(e) => handleNavClick(e, '#top')} className={`${linkClass} flex items-center gap-1`}>
                    {t(FOOTER.backToTop)} ↑
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* BOTTOM ROW: COPYRIGHT & LANGUAGE */}
          <div className="pt-8 border-t border-slate-800/80 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 text-caption">
            <span className="text-ink-inverse/60">{FOOTER.copyright}</span>

            {/* Language select styled as a pill, matching the Navbar switch */}
            <div className="flex items-center gap-1.5 pl-3 pr-2 rounded-full bg-white/5 hover:bg-white/10 transition-[background-color] duration-150">
              <Globe className="w-3.5 h-3.5 text-ink-inverse/60" />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as Lang)}
                aria-label={t(FOOTER.language)}
                className="bg-transparent border-0 text-ink-inverse/90 font-medium cursor-pointer text-base sm:text-body-sm py-2"
              >
                {FOOTER.languages.map((option) => (
                  <option key={option.code} value={option.code} className="bg-[#0A0D18] text-white">
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3 h-3 text-ink-inverse/60" />
            </div>
          </div>

        </div>
      </ImageReveal>
    </footer>
  );
}
