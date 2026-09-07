import { useState, useEffect } from 'react';
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  GitFork,
  Clock,
  Zap,
  Users,
  Layers,
  TrendingUp,
  UserCheck,
  HeartHandshake,
  Megaphone,
  ShieldCheck,
  BookOpen,
  HelpCircle,
  Calculator,
  Lock
} from 'lucide-react';
import { NAV_MENU_SECTIONS } from '../data/landingData';

interface NavbarProps {
  onOpenDemo: () => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export default function Navbar({ onOpenDemo, onOpenAuth }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY;
        // Interpolate scroll progress from 0 (top of page) to 1 (scrolled 100px+)
        const p = Math.min(1, Math.max(0, y / 100));
        setScrollProgress(p);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const isFloating = scrollProgress > 0.08;
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  // Responsive dynamic morph calculations (ultra wide & spacious floating capsule)
  const floatingTop = isMobile ? 10 : 14;
  const marginTop = scrollProgress * floatingTop;

  const floatingWidthPercent = isMobile ? 96 : 97; // Ultra-wide floating width (97%)
  const widthVal = 100 - (100 - floatingWidthPercent) * scrollProgress;

  const maxWidthPx = 1560; // Expanded maximum width ceiling to 1560px

  const heightPx = 68 - 4 * scrollProgress; // 68px -> 64px (comfortable height)
  const paddingPx = 36 - 6 * scrollProgress; // 36px -> 30px (spacious padding so content doesn't squeeze against rounded pill ends)
  const borderRadiusPx = 9999 * scrollProgress; // 0px -> 9999px pill capsule

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'GitFork': return <GitFork className="w-4 h-4 text-blue-600" />;
      case 'Clock': return <Clock className="w-4 h-4 text-blue-600" />;
      case 'Zap': return <Zap className="w-4 h-4 text-blue-600" />;
      case 'Users': return <Users className="w-4 h-4 text-blue-600" />;
      case 'Layers': return <Layers className="w-4 h-4 text-blue-600" />;
      case 'TrendingUp': return <TrendingUp className="w-4 h-4 text-blue-600" />;
      case 'UserCheck': return <UserCheck className="w-4 h-4 text-blue-600" />;
      case 'HeartHandshake': return <HeartHandshake className="w-4 h-4 text-blue-600" />;
      case 'Megaphone': return <Megaphone className="w-4 h-4 text-blue-600" />;
      case 'ShieldCheck': return <ShieldCheck className="w-4 h-4 text-blue-600" />;
      case 'BookOpen': return <BookOpen className="w-4 h-4 text-blue-600" />;
      case 'HelpCircle': return <HelpCircle className="w-4 h-4 text-blue-600" />;
      case 'Calculator': return <Calculator className="w-4 h-4 text-blue-600" />;
      case 'Lock': return <Lock className="w-4 h-4 text-blue-600" />;
      default: return <Zap className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full flex justify-center pointer-events-none transition-all duration-300">
      <div className="w-full max-w-[1560px] mx-auto px-3 sm:px-6 lg:px-8 flex justify-center pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
        <div
          className={`relative flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isFloating
              ? 'bg-white/88 backdrop-blur-md border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)]'
              : 'bg-white border-b border-transparent shadow-none'
          }`}
          style={{
            marginTop: `${marginTop}px`,
            width: `${widthVal}%`,
            maxWidth: `${maxWidthPx}px`,
            height: `${heightPx}px`,
            paddingLeft: `${paddingPx}px`,
            paddingRight: `${paddingPx}px`,
            borderRadius: `${borderRadiusPx}px`,
          }}
        >
          {/* Logo */}
          <div className="flex items-center gap-10 lg:gap-14">
            <a href="#" className="flex items-center gap-3 group cursor-pointer" aria-label="elev home">
              <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0F172A] via-[#1E40AF] to-[#3B82F6] flex items-center justify-center shadow-md shadow-blue-950/20 group-hover:shadow-blue-500/30 transition-[shadow,transform] duration-300 group-hover:scale-105">
                {/* Custom elevated Mobius & droplet mark */}
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17a5 5 0 0 1-5-5c0-2.76 2.24-5 5-5h10a5 5 0 0 1 5 5c0 2.76-2.24 5-5 5" className="opacity-70" />
                  <path d="M12 7c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5" strokeWidth="2.6" />
                  <circle cx="12" cy="12" r="2" fill="white" stroke="none" />
                  <path d="M16 4l2 2-2 2" className="text-amber-300" stroke="currentColor" strokeWidth="2" />
                </svg>
                {/* Micro accent dot */}
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-white animate-pulse" />
              </div>

              <div className="flex items-center gap-2">
                <span className="font-bold text-xl tracking-[-0.03em] text-[#0A0D14] group-hover:text-[#0055FF] transition-colors duration-150">
                  elev
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60 font-sans tabular-nums">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  2.4
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_MENU_SECTIONS.map((section) => {
                const hasDropdown = !!section.dropdown;
                const isOpen = activeDropdown === section.label;

                if (!hasDropdown) {
                  return (
                    <a
                      key={section.label}
                      href={section.href || '#'}
                      className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 rounded-xl hover:bg-slate-50 transition-[color,background-color] duration-150"
                    >
                      {section.label}
                    </a>
                  );
                }

                return (
                  <div
                    key={section.label}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(section.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-xl transition-[color,background-color] duration-150 cursor-pointer ${
                        isOpen ? 'text-blue-600 bg-slate-50' : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                      }`}
                      aria-expanded={isOpen}
                    >
                      {section.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {isOpen && (
                      <div className="absolute top-full left-0 pt-2 w-[540px] z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                        <div className="bg-white rounded-3xl shadow-xl shadow-slate-950/5 border border-[#E2E8F0] p-5 overflow-hidden text-slate-900">
                          <div className="grid grid-cols-1 gap-1">
                            {section.dropdown?.items.map((item) => (
                              <a
                                key={item.title}
                                href="#workflows"
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-start gap-3.5 p-3 rounded-2xl hover:bg-slate-50 transition-[background-color] duration-150"
                              >
                                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-[background-color,color] duration-150 shrink-0">
                                  {getIcon(item.icon)}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-150">
                                      {item.title}
                                    </span>
                                    {item.badge && (
                                      <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100/80 text-blue-700 px-2 py-0.5 rounded-md font-sans">
                                        {item.badge}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5 font-normal">
                                    {item.description}
                                  </p>
                                </div>
                              </a>
                            ))}
                          </div>

                          {section.dropdown?.featured && (
                            <div className="mt-4 pt-3.5 border-t border-slate-100 bg-slate-50/80 -mx-5 -mb-5 p-5">
                              <div className="flex items-center justify-between">
                                <div>
                                  <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider font-sans">
                                    {section.dropdown.featured.tag}
                                  </span>
                                  <h4 className="text-xs font-bold text-slate-900 mt-0.5">
                                    {section.dropdown.featured.title}
                                  </h4>
                                </div>
                                <button
                                  onClick={() => {
                                    setActiveDropdown(null);
                                    onOpenDemo();
                                  }}
                                  className="text-xs font-bold text-[#0055FF] hover:text-blue-700 flex items-center gap-1 active:scale-[0.96] transition-[color,transform] duration-150 cursor-pointer group/feat"
                                >
                                  <span>{section.dropdown.featured.linkText}</span>
                                  <ArrowRight className="w-3.5 h-3.5 group-hover/feat:translate-x-0.5 transition-transform duration-150" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Right Action CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => onOpenAuth('login')}
              className="text-sm font-semibold text-slate-700 hover:text-slate-900 px-3.5 py-2 rounded-full hover:bg-slate-100/70 active:scale-[0.96] transition-all duration-150 cursor-pointer"
            >
              Log In
            </button>
            <button
              onClick={() => onOpenAuth('signup')}
              className="bg-[#0055FF] hover:bg-[#0047D6] text-white font-semibold text-sm px-5 py-2.5 rounded-full shadow-xs hover:shadow-md active:scale-[0.96] transition-all duration-150 cursor-pointer flex items-center gap-1.5 group"
            >
              <span>Get started for free</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => onOpenAuth('signup')}
              className="bg-[#0055FF] hover:bg-[#0047D6] text-white font-semibold text-xs px-3.5 py-2 rounded-full active:scale-[0.96] transition-[background-color,transform] duration-150 cursor-pointer"
            >
              Get started for free
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 min-w-[40px] min-h-[40px] flex items-center justify-center cursor-pointer active:scale-[0.96] transition-[background-color,transform] duration-150"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-4 right-4 mt-2 bg-white rounded-3xl border border-slate-200/90 p-4 space-y-4 shadow-2xl pointer-events-auto z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            <a
              href="#workflows"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-base font-semibold text-slate-900 hover:bg-slate-50"
            >
              Workflows
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-base font-semibold text-slate-900 hover:bg-slate-50"
            >
              Pricing
            </a>
            <a
              href="#stats-bento"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-base font-semibold text-slate-900 hover:bg-slate-50"
            >
              Metrics & Impact
            </a>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth('login');
              }}
              className="w-full py-2.5 text-center text-sm font-semibold text-slate-700 rounded-xl hover:bg-slate-50 border border-slate-200 cursor-pointer active:scale-[0.96] transition-[background-color,transform]"
            >
              Log In
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemo();
              }}
              className="w-full py-2.5 text-center text-sm font-bold bg-blue-600 text-white rounded-xl shadow-xs hover:bg-blue-700 cursor-pointer active:scale-[0.96] transition-[background-color,transform]"
            >
              Book a Demo
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
