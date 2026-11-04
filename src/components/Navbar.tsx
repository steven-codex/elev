import { Fragment, useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV, SITE } from '../data/landingData';
import { useLang } from '../i18n';

function LangSwitch() {
  const { lang, setLang } = useLang();
  const options = ['en', 'id'] as const;
  return (
    <div
      role="group"
      aria-label="Language"
      className="flex items-center gap-0.5 text-[15px] font-normal text-slate-700"
    >
      {options.map((code, i) => (
        <Fragment key={code}>
          {i > 0 && <span aria-hidden="true" className="text-slate-400">·</span>}
          <button
            type="button"
            aria-pressed={lang === code}
            onClick={() => setLang(code)}
            className={`px-2 py-2 rounded-full active:scale-[0.96] transition-[color,background-color,transform] duration-150 cursor-pointer select-none ${
              lang === code
                ? 'font-semibold text-[#0A0D14] bg-slate-100/60'
                : 'hover:text-[#0A0D14] hover:bg-slate-100/60'
            }`}
          >
            {code.toUpperCase()}
          </button>
        </Fragment>
      ))}
    </div>
  );
}

export default function Navbar() {
  const { t } = useLang();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const navRef = useRef<HTMLDivElement>(null);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href?: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (!href || href === '#' || href === '#hero' || href === '#top') {
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

  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        setIsScrolled(currentScrollY > 20);

        // Always visible when near top
        if (currentScrollY < 40) {
          setIsVisible(true);
        } else {
          const delta = currentScrollY - lastScrollY.current;
          // Threshold of 6px eliminates micro-jitter while scrolling
          if (delta > 6) {
            // Scrolling down -> fade out
            setIsVisible(false);
          } else if (delta < -6) {
            // Scrolling up -> fade in
            setIsVisible(true);
          }
        }

        lastScrollY.current = currentScrollY;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const showNav = isVisible || mobileMenuOpen;

  return (
    <header
      className={`sticky top-3 sm:top-4 z-50 w-full px-3 sm:px-6 transition-[opacity,transform] duration-200 ease-out ${
        showNav
          ? 'opacity-100 translate-y-0 pointer-events-none'
          : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
    >
      <div
        ref={navRef}
        className={`w-full max-w-[1190px] mx-auto flex justify-center transition-opacity duration-200 ${
          showNav ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div
          className={`relative w-full flex items-center justify-between rounded-[16px] sm:rounded-[18px] h-[64px] sm:h-[68px] px-5 sm:px-8 transition-[background-color,border-color,box-shadow] duration-200 ${
            isScrolled
              ? 'bg-white/95 backdrop-blur-md border border-slate-200 shadow-sm'
              : 'bg-white/90 backdrop-blur-md border border-slate-200/80'
          }`}
        >
          {/* ========================================================= */}
          {/* LEFT GROUP: BRAND LOGO + DIRECT NAVIGATION LINKS          */}
          {/* ========================================================= */}
          <div className="flex items-center gap-7 sm:gap-9 lg:gap-10">
            {/* Brand Logo & Name */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              className="flex items-center gap-2.5 group cursor-pointer select-none"
              aria-label="Newseed home"
            >
              <img
                src="/elev-infinity-logo.png"
                alt="Newseed"
                className="h-8 sm:h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              />
              <span className="font-normal text-[22px] sm:text-[26px] tracking-[-0.03em] text-[#0A0D14] group-hover:text-blue-600 transition-colors duration-150">
                Newseed
              </span>
            </a>

            {/* Desktop Direct Links */}
            <nav className="hidden lg:flex items-center gap-6 sm:gap-7 lg:gap-8 text-[15px] font-normal text-slate-700">
              {NAV.items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="py-2 hover:text-[#0A0D14] transition-colors duration-150 cursor-pointer select-none"
                >
                  {t(item.label)}
                </a>
              ))}
            </nav>
          </div>

          {/* ========================================================= */}
          {/* RIGHT GROUP: LANGUAGE SWITCH + OBSIDIAN BLACK PILL BUTTON */}
          {/* ========================================================= */}
          <div className="hidden lg:flex items-center gap-5 sm:gap-6">
            <LangSwitch />

            <a
              href={SITE.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap bg-[#0A0D14] hover:bg-[#1E2330] text-white font-normal text-sm sm:text-[15px] px-6 sm:px-7 py-2.5 sm:py-3 rounded-full active:scale-[0.96] transition-[background-color,transform] duration-150 cursor-pointer select-none"
            >
              {t(NAV.cta)}
            </a>
          </div>

          {/* ========================================================= */}
          {/* MOBILE ACTIONS & DRAWER TOGGLE                            */}
          {/* ========================================================= */}
          <div className="flex lg:hidden items-center gap-2.5">
            <LangSwitch />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-full text-slate-700 hover:bg-slate-100 min-w-[40px] min-h-[40px] flex items-center justify-center cursor-pointer active:scale-[0.96] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Floating Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden max-w-[1190px] mx-auto mt-2 pointer-events-auto">
          <div className="bg-white/98 backdrop-blur-xl rounded-[16px] border border-slate-200/90 p-4 space-y-4 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="space-y-1">
              {NAV.items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="block px-3.5 py-2.5 rounded-xl text-sm font-normal text-slate-800 hover:text-black hover:bg-slate-50 active:scale-[0.98] transition-[background-color,transform] duration-150 cursor-pointer"
                >
                  {t(item.label)}
                </a>
              ))}
            </div>

            <div className="pt-3.5 border-t border-slate-100 flex flex-col gap-2">
              <a
                href={SITE.calendly}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center text-xs sm:text-sm font-normal bg-[#0A0D14] text-white rounded-full shadow-xs hover:bg-[#1E2330] cursor-pointer active:scale-[0.96] transition-[background-color,transform]"
              >
                {t(NAV.cta)}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
