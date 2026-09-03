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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'GitFork': return <GitFork className="w-5 h-5 text-blue-600" />;
      case 'Clock': return <Clock className="w-5 h-5 text-blue-600" />;
      case 'Zap': return <Zap className="w-5 h-5 text-blue-600" />;
      case 'Users': return <Users className="w-5 h-5 text-blue-600" />;
      case 'Layers': return <Layers className="w-5 h-5 text-blue-600" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-blue-600" />;
      case 'UserCheck': return <UserCheck className="w-5 h-5 text-blue-600" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-blue-600" />;
      case 'Megaphone': return <Megaphone className="w-5 h-5 text-blue-600" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-blue-600" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-blue-600" />;
      case 'HelpCircle': return <HelpCircle className="w-5 h-5 text-blue-600" />;
      case 'Calculator': return <Calculator className="w-5 h-5 text-blue-600" />;
      case 'Lock': return <Lock className="w-5 h-5 text-blue-600" />;
      default: return <Zap className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-100'
          : 'bg-white border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <a href="#" className="flex items-center gap-3 group cursor-pointer" aria-label="elev home">
              <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0F172A] via-[#1E40AF] to-[#3B82F6] flex items-center justify-center shadow-md shadow-blue-950/20 group-hover:shadow-blue-500/30 transition-all duration-300 group-hover:scale-105">
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
                <span className="font-extrabold text-2xl tracking-[-0.03em] text-[#071A31] group-hover:text-blue-600 transition-colors font-bricolage">
                  elev
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60 font-mono">
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
                      className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 rounded-lg hover:bg-slate-50 transition-colors"
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
                      className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
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
                        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-5 overflow-hidden">
                          <div className="grid grid-cols-1 gap-1">
                            {section.dropdown?.items.map((item) => (
                              <a
                                key={item.title}
                                href="#workflows"
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                              >
                                <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                                  {getIcon(item.icon)}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                      {item.title}
                                    </span>
                                    {item.badge && (
                                      <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-sm">
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
                                  <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
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
                                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                                >
                                  {section.dropdown.featured.linkText}
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
              onClick={onOpenDemo}
              className="text-sm font-semibold text-slate-700 hover:text-slate-900 px-3.5 py-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Contact sales
            </button>
            <button
              onClick={() => onOpenAuth('login')}
              className="text-sm font-semibold text-slate-700 hover:text-slate-900 px-3.5 py-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Log In
            </button>
            <button
              onClick={() => onOpenAuth('signup')}
              className="bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-sm px-5 py-2.5 rounded-full shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Get started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => onOpenAuth('signup')}
              className="bg-blue-600 text-white font-bold text-xs px-3.5 py-2 rounded-full cursor-pointer"
            >
              Get started
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 shadow-xl">
          <div className="space-y-1">
            <a
              href="#workflows"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 text-base font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
            >
              Product & Features
            </a>
            <a
              href="#workflows"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 text-base font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
            >
              Solutions
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 text-base font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
            >
              Pricing
            </a>
            <a
              href="#integrations"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 text-base font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
            >
              Integrations
            </a>
            <a
              href="#roi"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 text-base font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
            >
              ROI Calculator
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 text-base font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
            >
              FAQ
            </a>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemo();
              }}
              className="w-full text-center py-2.5 text-sm font-semibold text-slate-700 bg-slate-50 rounded-xl hover:bg-slate-100"
            >
              Contact sales
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth('login');
              }}
              className="w-full text-center py-2.5 text-sm font-semibold text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50"
            >
              Log In
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth('signup');
              }}
              className="w-full text-center py-2.5 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-sm"
            >
              Get started free
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
