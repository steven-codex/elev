import { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Clock,
  Zap,
  BookOpen,
  Lock,
  Layers,
  TrendingUp,
  UserCheck,
  HeartHandshake,
  Megaphone,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { NAV_MENU_SECTIONS } from '../data/landingData';

interface NavbarProps {
  onOpenDemo: () => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export default function Navbar({ onOpenDemo, onOpenAuth }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        setIsScrolled(currentScrollY > 20);

        // Always visible when near the very top of the page
        if (currentScrollY < 40) {
          setIsVisible(true);
        } else {
          const delta = currentScrollY - lastScrollY.current;
          // Threshold of 6px eliminates micro-jitter while scrolling
          if (delta > 6) {
            // Scrolling down -> fade out
            setIsVisible(false);
            setActiveDropdown(null);
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

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Clock': return <Clock className="w-4 h-4 text-blue-600" />;
      case 'Zap': return <Zap className="w-4 h-4 text-blue-600" />;
      case 'BookOpen': return <BookOpen className="w-4 h-4 text-blue-600" />;
      case 'Lock': return <Lock className="w-4 h-4 text-blue-600" />;
      case 'Layers': return <Layers className="w-4 h-4 text-blue-600" />;
      case 'TrendingUp': return <TrendingUp className="w-4 h-4 text-blue-600" />;
      case 'UserCheck': return <UserCheck className="w-4 h-4 text-blue-600" />;
      case 'HeartHandshake': return <HeartHandshake className="w-4 h-4 text-blue-600" />;
      case 'Megaphone': return <Megaphone className="w-4 h-4 text-blue-600" />;
      case 'ShieldCheck': return <ShieldCheck className="w-4 h-4 text-blue-600" />;
      default: return <Sparkles className="w-4 h-4 text-blue-600" />;
    }
  };

  const productSection = NAV_MENU_SECTIONS.find((s) => s.label === 'Product');
  const solutionsSection = NAV_MENU_SECTIONS.find((s) => s.label === 'Solutions');

  const showNav = isVisible || mobileMenuOpen;

  return (
    <header
      className={`sticky top-3 sm:top-4 z-50 w-full px-3 sm:px-6 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        showNav
          ? 'opacity-100 translate-y-0 pointer-events-none'
          : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
    >
      <div
        ref={navRef}
        className={`w-full max-w-[1190px] mx-auto flex justify-center transition-opacity duration-300 ${
          showNav ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div
          className={`relative w-full flex items-center justify-between rounded-[16px] sm:rounded-[18px] h-[64px] sm:h-[68px] px-5 sm:px-8 transition-all duration-300 ${
            isScrolled
              ? 'bg-white/95 backdrop-blur-md border border-slate-200'
              : 'bg-white/90 backdrop-blur-md border border-slate-200/80'
          }`}
        >
          {/* ========================================================= */}
          {/* LEFT GROUP: BRAND LOGO + LEFT-ALIGNED NAVIGATION          */}
          {/* ========================================================= */}
          <div className="flex items-center gap-7 sm:gap-9 lg:gap-10">
            {/* Brand Logo & Name */}
            <a
              href="#"
              className="flex items-center gap-2.5 group cursor-pointer select-none"
              aria-label="elev home"
            >
              <img
                src="/elev-infinity-logo.png"
                alt="elev"
                className="h-8 sm:h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              />
              <span className="font-normal text-[22px] sm:text-[26px] tracking-[-0.03em] text-[#0A0D14] group-hover:text-blue-600 transition-colors duration-150">
                elev
              </span>
            </a>

            {/* Desktop Navigation Links (Authentic elev Project Content) */}
            <nav className="hidden md:flex items-center gap-6 sm:gap-7 text-[15px] font-normal text-slate-700">
              
              {/* 1. Product Dropdown (Scheduling, Velie AI, Notetaker, Payments, Integrations) */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('Product')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === 'Product' ? null : 'Product')}
                  className={`flex items-center gap-1.5 py-2 hover:text-[#0A0D14] transition-colors cursor-pointer select-none ${
                    activeDropdown === 'Product' ? 'text-[#0A0D14]' : 'text-slate-700'
                  }`}
                  aria-expanded={activeDropdown === 'Product'}
                >
                  <span>Product</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                      activeDropdown === 'Product' ? 'rotate-180 text-slate-900' : ''
                    }`}
                  />
                </button>

                {/* Product Floating Panel */}
                {activeDropdown === 'Product' && productSection?.dropdown && (
                  <div className="absolute top-full -left-4 pt-3 w-[520px] z-50 animate-in fade-in slide-in-from-top-1.5 duration-150">
                    <div className="bg-white rounded-[24px] shadow-2xl shadow-slate-950/12 border border-slate-200/90 p-4.5 overflow-hidden text-slate-900">
                      <div className="grid grid-cols-1 gap-1">
                        {productSection.dropdown.items.map((item) => (
                          <a
                            key={item.title}
                            href="#workflows"
                            onClick={() => setActiveDropdown(null)}
                            className="group flex items-start gap-3.5 p-2.5 rounded-2xl hover:bg-slate-50 transition-[background-color] duration-150"
                          >
                            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-[background-color,color] duration-150 shrink-0">
                              {getIcon(item.icon)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-normal text-slate-900 group-hover:text-blue-600 transition-colors duration-150">
                                  {item.title}
                                </span>
                                {item.badge && (
                                  <span className="text-[10px] font-normal uppercase tracking-wider bg-blue-100/80 text-blue-700 px-2 py-0.5 rounded-md">
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

                      {productSection.dropdown.featured && (
                        <div className="mt-3.5 pt-3.5 border-t border-slate-100 bg-slate-50/70 -mx-4.5 -mb-4.5 p-4.5">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-[11px] font-normal text-blue-600 uppercase tracking-wider">
                                {productSection.dropdown.featured.tag}
                              </span>
                              <h4 className="text-xs font-normal text-slate-900 mt-0.5">
                                {productSection.dropdown.featured.title}
                              </h4>
                            </div>
                            <button
                              onClick={() => {
                                setActiveDropdown(null);
                                onOpenDemo();
                              }}
                              className="text-xs font-normal text-[#0055FF] hover:text-blue-700 flex items-center gap-1 active:scale-[0.96] transition-[color,transform] duration-150 cursor-pointer group/feat"
                            >
                              <span>{productSection.dropdown.featured.linkText}</span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover/feat:translate-x-0.5 transition-transform duration-150" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Solutions Dropdown (Sales, Recruiting, Customer Success, Marketing, IT) */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('Solutions')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === 'Solutions' ? null : 'Solutions')}
                  className={`flex items-center gap-1.5 py-2 hover:text-[#0A0D14] transition-colors cursor-pointer select-none ${
                    activeDropdown === 'Solutions' ? 'text-[#0A0D14]' : 'text-slate-700'
                  }`}
                  aria-expanded={activeDropdown === 'Solutions'}
                >
                  <span>Solutions</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                      activeDropdown === 'Solutions' ? 'rotate-180 text-slate-900' : ''
                    }`}
                  />
                </button>

                {/* Solutions Floating Panel */}
                {activeDropdown === 'Solutions' && solutionsSection?.dropdown && (
                  <div className="absolute top-full -left-12 pt-3 w-[520px] z-50 animate-in fade-in slide-in-from-top-1.5 duration-150">
                    <div className="bg-white rounded-[24px] shadow-2xl shadow-slate-950/12 border border-slate-200/90 p-4.5 overflow-hidden text-slate-900">
                      <div className="grid grid-cols-1 gap-1">
                        {solutionsSection.dropdown.items.map((item) => (
                          <a
                            key={item.title}
                            href="#workflows"
                            onClick={() => setActiveDropdown(null)}
                            className="group flex items-start gap-3.5 p-2.5 rounded-2xl hover:bg-slate-50 transition-[background-color] duration-150"
                          >
                            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-[background-color,color] duration-150 shrink-0">
                              {getIcon(item.icon)}
                            </div>
                            <div>
                              <span className="text-sm font-normal text-slate-900 group-hover:text-blue-600 transition-colors duration-150 block">
                                {item.title}
                              </span>
                              <p className="text-xs text-slate-500 line-clamp-1 mt-0.5 font-normal">
                                {item.description}
                              </p>
                            </div>
                          </a>
                        ))}
                      </div>

                      <div className="mt-3.5 pt-3.5 border-t border-slate-100 bg-slate-50/70 -mx-4.5 -mb-4.5 p-4.5">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[11px] font-normal text-blue-600 uppercase tracking-wider">
                              Enterprise Workflows
                            </span>
                            <h4 className="text-xs font-normal text-slate-900 mt-0.5">
                              Built for teams from 5 to 5,000
                            </h4>
                          </div>
                          <button
                            onClick={() => {
                              setActiveDropdown(null);
                              onOpenDemo();
                            }}
                            className="text-xs font-normal text-[#0055FF] hover:text-blue-700 flex items-center gap-1 active:scale-[0.96] transition-[color,transform] duration-150 cursor-pointer group/feat"
                          >
                            <span>Explore Solutions →</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover/feat:translate-x-0.5 transition-transform duration-150" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Integrations Link */}
              <a
                href="#integrations"
                className="py-2 hover:text-[#0A0D14] transition-colors cursor-pointer select-none"
              >
                Integrations
              </a>

              {/* 4. Pricing Link */}
              <a
                href="#pricing"
                className="py-2 hover:text-[#0A0D14] transition-colors cursor-pointer select-none"
              >
                Pricing
              </a>

            </nav>
          </div>

          {/* ========================================================= */}
          {/* RIGHT GROUP: LOGIN LINK + OBSIDIAN BLACK PILL BUTTON      */}
          {/* ========================================================= */}
          <div className="hidden md:flex items-center gap-5 sm:gap-6">
            <button
              onClick={() => onOpenAuth('login')}
              className="text-[15px] font-normal text-slate-700 hover:text-[#0A0D14] px-3.5 py-2 rounded-full hover:bg-slate-100/60 active:scale-[0.96] transition-all duration-150 cursor-pointer select-none"
            >
              Login
            </button>

            <button
              onClick={() => onOpenDemo()}
              className="bg-[#0A0D14] hover:bg-[#1E2330] text-white font-normal text-sm sm:text-[15px] px-6 sm:px-7 py-2.5 sm:py-3 rounded-full active:scale-[0.96] transition-all duration-150 cursor-pointer select-none"
            >
              Get Started
            </button>
          </div>

          {/* ========================================================= */}
          {/* MOBILE ACTIONS & DRAWER TOGGLE                            */}
          {/* ========================================================= */}
          <div className="flex md:hidden items-center gap-2.5">
            <button
              onClick={() => onOpenDemo()}
              className="bg-[#0A0D14] text-white font-normal text-xs sm:text-sm px-4 py-2 rounded-full active:scale-[0.96] transition-all cursor-pointer"
            >
              Get Started
            </button>
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
        <div className="md:hidden max-w-[1190px] mx-auto mt-2 pointer-events-auto">
          <div className="bg-white/98 backdrop-blur-xl rounded-[16px] border border-slate-200/90 p-4.5 space-y-4 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="space-y-1">
              <a
                href="#workflows"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-normal text-slate-900 hover:bg-slate-50"
              >
                Product Suite (Scheduling, AI, Notetaker)
              </a>
              <a
                href="#workflows"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-normal text-slate-900 hover:bg-slate-50"
              >
                Solutions (Sales, Recruiting, Success)
              </a>
              <a
                href="#integrations"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-normal text-slate-900 hover:bg-slate-50"
              >
                150+ Integrations
              </a>
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-normal text-slate-900 hover:bg-slate-50"
              >
                Pricing
              </a>
            </div>

            <div className="pt-3.5 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('login');
                }}
                className="w-full py-2.5 text-center text-xs sm:text-sm font-normal text-slate-700 rounded-full hover:bg-slate-50 border border-slate-200 cursor-pointer active:scale-[0.96] transition-[background-color,transform]"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDemo();
                }}
                className="w-full py-2.5 text-center text-xs sm:text-sm font-normal bg-[#0A0D14] text-white rounded-full shadow-xs hover:bg-[#1E2330] cursor-pointer active:scale-[0.96] transition-[background-color,transform]"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
