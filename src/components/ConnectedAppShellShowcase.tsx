import React, { useState } from 'react';
import {
  Search,
  Bell,
  ChevronDown,
  Plus,
  Home,
  Video,
  Calendar,
  Users,
  CreditCard,
  FileText,
  CheckSquare,
  BarChart3,
  Settings,
  ArrowUpRight,
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react';

interface ConnectedAppShellShowcaseProps {
  onOpenAuth: (mode: 'signup' | 'login') => void;
  onOpenDemo?: () => void;
}

type FeatureKey = 'notetaker' | 'velie' | 'scheduling' | 'payments' | null;

export default function ConnectedAppShellShowcase({ onOpenAuth }: ConnectedAppShellShowcaseProps) {
  const [activeFeature, setActiveFeature] = useState<FeatureKey>(null);
  const [activeNav, setActiveNav] = useState('Home');
  const [joinedMeeting, setJoinedMeeting] = useState<string | null>(null);

  const handleJoin = (meetingName: string) => {
    setJoinedMeeting(meetingName);
    setTimeout(() => setJoinedMeeting(null), 3000);
  };

  const navItems = [
    { name: 'Home', icon: Home },
    { name: 'Meetings', icon: Video },
    { name: 'Calendar', icon: Calendar },
    { name: 'Contacts', icon: Users },
    { name: 'Payments', icon: CreditCard },
  ];

  const meetings = [
    {
      id: 'm1',
      time: '09:00 AM',
      color: 'bg-blue-500',
      title: 'Product sync',
      platform: 'Google Meet',
      avatars: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80',
      ]
    },
    {
      id: 'm2',
      time: '11:00 AM',
      color: 'bg-emerald-500',
      title: 'Client onboarding',
      platform: 'Zoom',
      avatars: [
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
      ]
    },
    {
      id: 'm3',
      time: '02:00 PM',
      color: 'bg-purple-500',
      title: 'Design review',
      platform: 'Google Meet',
      avatars: [
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
      ]
    }
  ];

  const activityData = [
    { day: 'Mon', height: 42 },
    { day: 'Tue', height: 60 },
    { day: 'Wed', height: 50 },
    { day: 'Thu', height: 86, active: true },
    { day: 'Fri', height: 54 },
    { day: 'Sat', height: 75 },
    { day: 'Sun', height: 92 },
  ];

  return (
    <section className="relative w-full min-h-[920px] lg:min-h-[980px] bg-[#FBFCFE] overflow-hidden select-none py-10 lg:py-14 flex flex-col items-center justify-between">
      
      {/* ====================================================================
          BACKGROUND: Perimeter Frame Tile Pattern with Soft Fade Mask & 40% Opacity
          ==================================================================== */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,black_15%,transparent_82%)] [-webkit-mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,black_15%,transparent_82%)] opacity-40 transition-opacity duration-500"
        aria-hidden="true"
      >
        <div className="grid grid-cols-6 sm:grid-cols-9 lg:grid-cols-12 gap-3.5 sm:gap-4 lg:gap-5 w-full max-w-[1600px] px-4">
          {Array.from({ length: 6 }).flatMap((_, r) =>
            Array.from({ length: 12 }).map((_, c) => {
              const isBorderTile = r < 2 || r >= 4 || c < 2 || c >= 10;
              return isBorderTile ? (
                <div
                  key={`${r}-${c}`}
                  className="w-full aspect-square rounded-[18px] sm:rounded-[22px] bg-[#E2E8F0]/50 border border-slate-200/40 backdrop-blur-[1px]"
                />
              ) : (
                <div key={`${r}-${c}`} className="w-full aspect-square opacity-0 pointer-events-none" />
              );
            })
          )}
        </div>
      </div>

      <div className="relative z-10 w-full max-w-[1540px] px-4 sm:px-6 lg:px-8 flex flex-col items-center">

        {/* ====================================================================
            ECOSYSTEM VISUALIZATION (Centerpiece Brand + 4 Connected Feature Nodes)
            ==================================================================== */}
        <div className="relative w-full max-w-5xl h-[340px] sm:h-[370px] flex items-center justify-center">
          
          {/* UNIFIED SVG SYSTEM: Lines, Elbows, Anchor Dots, Traveling Pulses, and Docking Nodes */}
          <svg 
            className="w-full h-full"
            viewBox="0 0 1000 370"
            preserveAspectRatio="xMidYMid meet"
            fill="none"
          >
            <defs>
              <linearGradient id="glow-purple" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#0055FF" />
              </linearGradient>

              <linearGradient id="glow-green" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#84CC16" />
                <stop offset="100%" stopColor="#0055FF" />
              </linearGradient>

              <linearGradient id="glow-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#0055FF" />
              </linearGradient>

              <linearGradient id="glow-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#0055FF" />
              </linearGradient>

              {/* Radial glow filter for docking nodes */}
              <filter id="cyan-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* ------------------------------------------------------------
                CONNECTOR PATHS WITH SMOOTH 90-DEGREE ROUNDED ELBOWS (R=30)
                ------------------------------------------------------------ */}
            
            {/* Path 1: Top-Left Notetaker (Purple) -> (255, 75) to (405, 370) */}
            <path
              d="M 255 75 L 375 75 Q 405 75, 405 105 L 405 370"
              stroke={activeFeature === 'notetaker' ? 'url(#glow-purple)' : '#CBD5E1'}
              strokeWidth={activeFeature === 'notetaker' ? '2.5' : '1.5'}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
            {/* Path 1 Anchor Dot on Card Right Edge */}
            <circle cx="255" cy="75" r="5" fill="#A855F7" stroke="#FFFFFF" strokeWidth="2" />
            {/* Path 1 Traveling Pulse */}
            <circle r="3.5" fill="#A855F7">
              <animateMotion
                path="M 255 75 L 375 75 Q 405 75, 405 105 L 405 370"
                dur="3.2s"
                repeatCount="indefinite"
              />
            </circle>
            {/* Path 1 Docking Node at Dashboard Top */}
            <circle cx="405" cy="366" r="9" fill="#A855F7" opacity="0.25">
              <animate attributeName="r" values="6;11;6" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.35;0.1;0.35" dur="2.4s" repeatCount="indefinite" />
            </circle>
            <circle cx="405" cy="366" r="4.5" fill="#A855F7" stroke="#FFFFFF" strokeWidth="1.5" />

            {/* Path 2: Bottom-Left Velie (Green) -> (155, 220) to (255, 370) */}
            <path
              d="M 155 220 L 225 220 Q 255 220, 255 250 L 255 370"
              stroke={activeFeature === 'velie' ? 'url(#glow-green)' : '#CBD5E1'}
              strokeWidth={activeFeature === 'velie' ? '2.5' : '1.5'}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
            {/* Path 2 Anchor Dot on Card Right Edge */}
            <circle cx="155" cy="220" r="5" fill="#84CC16" stroke="#FFFFFF" strokeWidth="2" />
            {/* Path 2 Traveling Pulse */}
            <circle r="3.5" fill="#84CC16">
              <animateMotion
                path="M 155 220 L 225 220 Q 255 220, 255 250 L 255 370"
                dur="3.6s"
                repeatCount="indefinite"
                begin="0.8s"
              />
            </circle>
            {/* Path 2 Docking Node at Dashboard Top */}
            <circle cx="255" cy="366" r="9" fill="#84CC16" opacity="0.25">
              <animate attributeName="r" values="6;11;6" dur="2.6s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.35;0.1;0.35" dur="2.6s" repeatCount="indefinite" />
            </circle>
            <circle cx="255" cy="366" r="4.5" fill="#84CC16" stroke="#FFFFFF" strokeWidth="1.5" />

            {/* Path 3: Top-Right Scheduling (Blue) -> (745, 75) to (595, 370) */}
            <path
              d="M 745 75 L 625 75 Q 595 75, 595 105 L 595 370"
              stroke={activeFeature === 'scheduling' ? 'url(#glow-blue)' : '#CBD5E1'}
              strokeWidth={activeFeature === 'scheduling' ? '2.5' : '1.5'}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
            {/* Path 3 Anchor Dot on Card Left Edge */}
            <circle cx="745" cy="75" r="5" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="2" />
            {/* Path 3 Traveling Pulse */}
            <circle r="3.5" fill="#38BDF8">
              <animateMotion
                path="M 745 75 L 625 75 Q 595 75, 595 105 L 595 370"
                dur="3.4s"
                repeatCount="indefinite"
                begin="1.2s"
              />
            </circle>
            {/* Path 3 Docking Node at Dashboard Top */}
            <circle cx="595" cy="366" r="9" fill="#38BDF8" opacity="0.25">
              <animate attributeName="r" values="6;11;6" dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.35;0.1;0.35" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="595" cy="366" r="4.5" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="1.5" />

            {/* Path 4: Bottom-Right Payments (Cyan) -> (845, 220) to (745, 370) */}
            <path
              d="M 845 220 L 775 220 Q 745 220, 745 250 L 745 370"
              stroke={activeFeature === 'payments' ? 'url(#glow-cyan)' : '#CBD5E1'}
              strokeWidth={activeFeature === 'payments' ? '2.5' : '1.5'}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
            {/* Path 4 Anchor Dot on Card Left Edge */}
            <circle cx="845" cy="220" r="5" fill="#06B6D4" stroke="#FFFFFF" strokeWidth="2" />
            {/* Path 4 Traveling Pulse */}
            <circle r="3.5" fill="#06B6D4">
              <animateMotion
                path="M 845 220 L 775 220 Q 745 220, 745 250 L 745 370"
                dur="3s"
                repeatCount="indefinite"
                begin="0.4s"
              />
            </circle>
            {/* Path 4 Docking Node at Dashboard Top */}
            <circle cx="745" cy="366" r="9" fill="#06B6D4" opacity="0.25">
              <animate attributeName="r" values="6;11;6" dur="2.3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.35;0.1;0.35" dur="2.3s" repeatCount="indefinite" />
            </circle>
            <circle cx="745" cy="366" r="4.5" fill="#06B6D4" stroke="#FFFFFF" strokeWidth="1.5" />



            {/* ------------------------------------------------------------
                EMBEDDED INTERACTIVE CARDS VIA FOREIGNOBJECT (100% Pinned)
                ------------------------------------------------------------ */}

            {/* Card 1: Top-Left Notetaker (Purple) -> x=145..255, y=20..130 */}
            <foreignObject x="145" y="20" width="110" height="110" className="overflow-visible">
              <div 
                onMouseEnter={() => setActiveFeature('notetaker')}
                onMouseLeave={() => setActiveFeature(null)}
                className="w-full h-full cursor-pointer group"
              >
                <div className="w-[110px] h-[110px] rounded-[24px] bg-white border border-slate-200/80 shadow-[0_14px_36px_-6px_rgba(168,85,247,0.22),0_2px_8px_rgba(0,0,0,0.03)] flex items-center justify-center p-3.5 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_20px_45px_-6px_rgba(168,85,247,0.35)]">
                  <img 
                    src="/icon-notetaker-3d.png" 
                    alt="AI Notetaker" 
                    className="w-[60px] h-[60px] object-contain pointer-events-none group-hover:rotate-3 transition-transform" 
                  />
                </div>
              </div>
            </foreignObject>

            {/* Card 2: Bottom-Left Velie (Green) -> x=45..155, y=165..275 */}
            <foreignObject x="45" y="165" width="110" height="110" className="overflow-visible">
              <div 
                onMouseEnter={() => setActiveFeature('velie')}
                onMouseLeave={() => setActiveFeature(null)}
                className="w-full h-full cursor-pointer group"
              >
                <div className="w-[110px] h-[110px] rounded-[24px] bg-white border border-slate-200/80 shadow-[0_14px_36px_-6px_rgba(132,204,22,0.24),0_2px_8px_rgba(0,0,0,0.03)] flex items-center justify-center p-3.5 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_20px_45px_-6px_rgba(132,204,22,0.38)]">
                  <img 
                    src="/icon-velie-3d.png" 
                    alt="Velie AI" 
                    className="w-[60px] h-[60px] object-contain pointer-events-none group-hover:rotate-6 transition-transform" 
                  />
                </div>
              </div>
            </foreignObject>

            {/* Center Logo: 3D Infinity Ribbon -> x=390..610, y=95..205 */}
            <foreignObject x="390" y="95" width="220" height="105" className="overflow-visible">
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-[200px] h-[95px] flex items-center justify-center drop-shadow-[0_16px_32px_rgba(0,85,255,0.26)]">
                  <img 
                    src="/elev-infinity-logo.png" 
                    alt="elev Brandmark" 
                    className="w-full h-full object-contain pointer-events-none" 
                  />
                </div>
              </div>
            </foreignObject>

            {/* Card 3: Top-Right Scheduling (Blue) -> x=745..855, y=20..130 */}
            <foreignObject x="745" y="20" width="110" height="110" className="overflow-visible">
              <div 
                onMouseEnter={() => setActiveFeature('scheduling')}
                onMouseLeave={() => setActiveFeature(null)}
                className="w-full h-full cursor-pointer group"
              >
                <div className="w-[110px] h-[110px] rounded-[24px] bg-white border border-slate-200/80 shadow-[0_14px_36px_-6px_rgba(56,189,248,0.26),0_2px_8px_rgba(0,0,0,0.03)] flex items-center justify-center p-3.5 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_20px_45px_-6px_rgba(56,189,248,0.4)]">
                  <img 
                    src="/icon-scheduling-3d.png" 
                    alt="Scheduling" 
                    className="w-[60px] h-[60px] object-contain pointer-events-none group-hover:-rotate-3 transition-transform" 
                  />
                </div>
              </div>
            </foreignObject>

            {/* Card 4: Bottom-Right Payments (Cyan) -> x=845..955, y=165..275 */}
            <foreignObject x="845" y="165" width="110" height="110" className="overflow-visible">
              <div 
                onMouseEnter={() => setActiveFeature('payments')}
                onMouseLeave={() => setActiveFeature(null)}
                className="w-full h-full cursor-pointer group"
              >
                <div className="w-[110px] h-[110px] rounded-[24px] bg-white border border-slate-200/80 shadow-[0_14px_36px_-6px_rgba(6,182,212,0.24),0_2px_8px_rgba(0,0,0,0.03)] flex items-center justify-center p-3.5 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_20px_45px_-6px_rgba(6,182,212,0.38)]">
                  <img 
                    src="/icon-payments-3d.png" 
                    alt="Payments" 
                    className="w-[60px] h-[60px] object-contain pointer-events-none group-hover:-rotate-6 transition-transform" 
                  />
                </div>
              </div>
            </foreignObject>

          </svg>
        </div>

        {/* ====================================================================
            THE ELEV DASHBOARD APP SHELL (gpt-taste Ultra-Clean Design Engineering)
            ==================================================================== */}
        <div className="relative w-full max-w-[1360px] w-[95vw] lg:w-[88vw] z-20 pt-7">
          
          {/* STACKED GLASS LAYER 2 (Backmost stacked card sheet) */}
          <div className="absolute top-0 inset-x-12 h-10 rounded-t-[32px] bg-white/60 backdrop-blur-md pointer-events-none z-0" />

          {/* STACKED GLASS LAYER 1 (Middle stacked card sheet) */}
          <div className="absolute top-3 inset-x-6 h-10 rounded-t-[30px] bg-white/80 backdrop-blur-xl pointer-events-none z-10" />

          {/* FOREGROUND MAIN DASHBOARD WINDOW SHELL (Clean Single Border, Layered Shadows, Rounded 36px) */}
          <div className="relative z-20 rounded-[32px] sm:rounded-[36px] bg-white border border-slate-200/80 shadow-[0_32px_90px_-20px_rgba(15,23,42,0.08),0_4px_24px_rgba(0,0,0,0.02)] overflow-hidden transition-all duration-500">
            <div className="grid grid-cols-1 md:grid-cols-12 min-h-[640px]">
              
              {/* ================================================================
                  SIDEBAR NAVIGATION (Col-span-3) - Clean Architectural Layout
                  ================================================================ */}
              <aside className="md:col-span-3 border-r border-slate-100 bg-[#FAFBFD] p-4 sm:p-5 flex flex-col justify-between select-none">
                <div>
                  {/* Brand Header: elev Infinity Logo + Sidebar Control */}
                  <div className="flex items-center justify-between px-2 mb-7">
                    <div className="flex items-center gap-3">
                      <img 
                        src="/elev-infinity-logo.png" 
                        alt="elev" 
                        className="h-8.5 sm:h-9.5 w-auto object-contain" 
                      />
                      <span className="text-2xl font-normal text-[#0A0D14] tracking-tight">
                        elev
                      </span>
                    </div>
                    {/* Sidebar Collapsible / Info Button */}
                    <button 
                      aria-label="Toggle sidebar"
                      className="w-8 h-8 rounded-lg border border-slate-200/70 text-slate-400 hover:text-slate-700 hover:bg-white active:scale-[0.94] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <rect x="2" y="2" width="12" height="12" rx="2" />
                        <line x1="6" y1="2" x2="6" y2="14" />
                      </svg>
                    </button>
                  </div>

                  {/* Nav Links */}
                  <nav className="space-y-1">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeNav === item.name;
                      return (
                        <button
                          key={item.name}
                          onClick={() => setActiveNav(item.name)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-normal transition-all text-left cursor-pointer active:scale-[0.98] ${
                            isActive
                              ? 'bg-[#EEF4FF] text-[#0055FF] shadow-2xs'
                              : 'text-slate-500 hover:text-[#0A0D14] hover:bg-slate-100/70'
                          }`}
                        >
                          <Icon className={`w-4 h-4 ${isActive ? 'text-[#0055FF]' : 'text-slate-400'}`} />
                          <span>{item.name}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>

                {/* Bottom Upgrade to Pro Aurora Glass Card */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="relative overflow-hidden bg-gradient-to-br from-[#EEF4FF] via-[#F3EEFF] to-[#FAF5FF] border border-blue-100/80 rounded-2xl p-3.5 flex items-center justify-between cursor-pointer hover:shadow-md active:scale-[0.98] transition-all group">
                    <div className="flex items-center gap-3 relative z-10">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs text-xs font-normal">
                        ★
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-normal text-[#0A0D14] group-hover:text-[#0055FF] transition-colors">
                          Upgrade to Pro
                        </p>
                        <p className="text-[10px] text-slate-500">
                          Unlock all features
                        </p>
                      </div>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-white text-slate-700 flex items-center justify-center shadow-2xs group-hover:translate-x-0.5 transition-transform text-xs relative z-10">
                      →
                    </div>
                  </div>
                </div>
              </aside>

              {/* ================================================================
                  MAIN DASHBOARD CONTENT AREA (Col-span-9)
                  ================================================================ */}
              <main className="md:col-span-9 p-5 sm:p-7 bg-white flex flex-col justify-between relative overflow-hidden">
                <div className="relative z-10">
                  {/* Top Application Bar */}
                  <header className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
                    {/* Search Field */}
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search meetings, contacts, or anything..."
                        className="w-full bg-[#F8FAFC] border border-slate-200/80 rounded-full pl-9 pr-14 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-normal text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                        ⌘K
                      </span>
                    </div>

                    {/* Right Tools & User Profile */}
                    <div className="flex items-center justify-end gap-3 shrink-0">
                      {/* Bell with notification indicator */}
                      <button 
                        aria-label="Notifications"
                        className="relative w-8 h-8 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 active:scale-[0.94] transition-all cursor-pointer border border-slate-200/60"
                      >
                        <Bell className="w-4 h-4" />
                        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-white" />
                      </button>

                      {/* Brand / Profile */}
                      <div className="flex items-center gap-2 pl-1 cursor-pointer group">
                        <img
                          src="/elev-infinity-logo.png"
                          alt="elev"
                          className="w-8 h-8 rounded-full object-contain p-1 bg-slate-50 border border-slate-200 group-hover:border-blue-400 transition-colors"
                        />
                        <div className="text-left hidden sm:block">
                          <p className="text-xs font-normal text-[#0A0D14] leading-none group-hover:text-[#0055FF] transition-colors">
                            elev
                          </p>
                          <p className="text-[10px] text-slate-400 mt-0.5 leading-none">
                            Workspace
                          </p>
                        </div>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                      </div>

                      {/* New Meeting Primary CTA Button */}
                      <button 
                        onClick={() => onOpenAuth('signup')}
                        className="bg-[#0B1222] hover:bg-slate-800 text-white text-xs font-normal px-4 py-2 rounded-full flex items-center gap-1.5 shadow-2xs hover:shadow-md active:scale-[0.96] transition-all cursor-pointer shrink-0"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>New Meeting</span>
                      </button>
                    </div>
                  </header>

                  {/* Greeting Header Banner with Subtitle */}
                  <div className="pt-5 pb-4">
                    <h2 className="text-xl sm:text-2xl font-normal text-[#0A0D14] tracking-tight">
                      Good morning, Steven
                    </h2>
                    <p className="text-xs text-slate-400 mt-1 font-normal">
                      Here's what's happening with your meetings today.
                    </p>
                  </div>

                  {/* ============================================================
                      4 TOP METRIC CARDS (Bento Grid Density)
                      ============================================================ */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 my-3 grid-flow-dense">
                    
                    {/* Card 1: Upcoming Meetings */}
                    <div className="p-4 rounded-2xl bg-white border border-slate-200/70 shadow-2xs hover:border-blue-200 hover:shadow-sm transition-all duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                            <Calendar className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs font-normal text-slate-600">
                            Upcoming Meetings
                          </span>
                        </div>
                      </div>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-2xl font-normal text-[#0A0D14]">12</span>
                        <span className="inline-flex items-center text-[10px] font-normal text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200/50">
                          ↑ 20%
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 font-normal">this week</p>
                    </div>

                    {/* Card 2: Payments */}
                    <div className="p-4 rounded-2xl bg-white border border-slate-200/70 shadow-2xs hover:border-emerald-200 hover:shadow-sm transition-all duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                            <CreditCard className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs font-normal text-slate-600">
                            Payments
                          </span>
                        </div>
                      </div>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-2xl font-normal text-[#0A0D14]">$2,480</span>
                        <span className="inline-flex items-center text-[10px] font-normal text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200/50">
                          ↑ 18%
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 font-normal">this month</p>
                    </div>

                    {/* Card 3: New Contacts */}
                    <div className="p-4 rounded-2xl bg-white border border-slate-200/70 shadow-2xs hover:border-purple-200 hover:shadow-sm transition-all duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                            <Users className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs font-normal text-slate-600">
                            New Contacts
                          </span>
                        </div>
                      </div>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-2xl font-normal text-[#0A0D14]">28</span>
                        <span className="inline-flex items-center text-[10px] font-normal text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200/50">
                          ↑ 32%
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 font-normal">this month</p>
                    </div>

                    {/* Card 4: Follow-ups */}
                    <div className="p-4 rounded-2xl bg-white border border-slate-200/70 shadow-2xs hover:border-amber-200 hover:shadow-sm transition-all duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                            <CheckSquare className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs font-normal text-slate-600">
                            Follow-ups
                          </span>
                        </div>
                      </div>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-2xl font-normal text-[#0A0D14]">16</span>
                        <span className="inline-flex items-center text-[10px] font-normal text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200/50">
                          ↑ 12%
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 font-normal">pending</p>
                    </div>

                  </div>

                  {/* ============================================================
                      2-COLUMN WORKSPACE (Today's Meetings & Meeting Activity Wave Chart)
                      ============================================================ */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-4">
                    
                    {/* Left Column: Today's Meetings (Col-span-6) */}
                    <div className="lg:col-span-6 border border-slate-200/70 rounded-2xl p-5 bg-white shadow-2xs hover:shadow-xs transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-normal text-[#0A0D14]">
                          Today's Meetings
                        </h3>
                        <button className="text-xs font-normal text-slate-500 hover:text-[#0055FF] flex items-center gap-1 transition-colors cursor-pointer active:scale-95">
                          <span>View all</span>
                          <span className="text-xs">→</span>
                        </button>
                      </div>

                      {/* Vertical Timeline */}
                      <div className="relative space-y-3.5 pl-1">
                        {/* Continuous timeline guide */}
                        <div className="absolute left-[72px] top-3 bottom-3 w-0.5 bg-slate-100" />
                        
                        {meetings.map((m) => (
                          <div
                            key={m.id}
                            className="relative flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50/80 border border-transparent hover:border-slate-100 transition-all group"
                          >
                            <div className="flex items-center gap-3">
                              {/* Timeline Dot */}
                              <span className={`w-2.5 h-2.5 rounded-full ${m.color} shrink-0 z-10 ring-4 ring-white`} />
                              <span className="text-xs font-normal text-slate-500 shrink-0 w-16">
                                {m.time}
                              </span>
                              <div>
                                <p className="text-xs font-normal text-[#0A0D14] leading-tight">
                                  {m.title}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  {/* Attendees Overlapping Avatars */}
                                  <div className="flex -space-x-1.5 overflow-hidden">
                                    {m.avatars.map((av, idx) => (
                                      <img
                                        key={idx}
                                        src={av}
                                        alt="Attendee"
                                        className="inline-block h-4 w-4 rounded-full ring-1 ring-white object-cover"
                                      />
                                    ))}
                                  </div>
                                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                                    <Video className="w-3 h-3 text-slate-400" />
                                    <span>{m.platform}</span>
                                  </span>
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={() => handleJoin(m.title)}
                              className={`text-xs font-normal px-4 py-1.5 rounded-full transition-all cursor-pointer active:scale-[0.94] ${
                                joinedMeeting === m.title
                                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                                  : 'bg-[#EEF4FF] text-[#0055FF] hover:bg-blue-100'
                              }`}
                            >
                              {joinedMeeting === m.title ? 'Joined ✓' : 'Join'}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Column: Meeting Activity (Calm, Smooth Continuous Wave Chart) (Col-span-6) */}
                    <div className="lg:col-span-6 border border-slate-200/70 rounded-2xl p-5 bg-white flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-sm font-normal text-[#0A0D14]">
                            Meeting Activity
                          </h3>
                          <div className="flex items-center gap-1 text-[11px] font-normal text-slate-600 bg-slate-50 border border-slate-200/70 px-2.5 py-1 rounded-lg cursor-pointer hover:bg-slate-100 active:scale-95 transition-all">
                            <span>Last 7 days</span>
                            <ChevronDown className="w-3 h-3 text-slate-400" />
                          </div>
                        </div>

                        {/* SVG Smooth Wave Area Chart */}
                        <div className="relative pt-6 pb-1">
                          {/* Floating Tooltip Pill on Thursday Peak */}
                          <div className="absolute top-0 left-[52.5%] -translate-x-1/2 bg-[#0B1222] text-white text-[10px] font-normal px-2.5 py-1 rounded-lg shadow-md flex items-center gap-1.5 whitespace-nowrap z-20">
                            <span>12 meetings</span>
                            <span className="text-emerald-400 font-normal">↑ 40%</span>
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0B1222] rotate-45" />
                          </div>

                          <svg className="w-full h-24 overflow-visible" viewBox="0 0 400 90" preserveAspectRatio="none">
                            <defs>
                              <linearGradient id="wave-area-gradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#0055FF" stopOpacity="0.18" />
                                <stop offset="100%" stopColor="#0055FF" stopOpacity="0.0" />
                              </linearGradient>
                            </defs>
                            
                            {/* Wave Area Fill */}
                            <path 
                              d="M 0,58 C 40,58 60,44 90,44 C 120,44 135,52 160,52 C 185,52 195,18 210,18 C 225,18 245,52 270,52 C 295,52 310,44 330,44 C 355,44 375,54 400,54 L 400,90 L 0,90 Z" 
                              fill="url(#wave-area-gradient)" 
                            />
                            
                            {/* Wave Continuous Stroke Line */}
                            <path 
                              d="M 0,58 C 40,58 60,44 90,44 C 120,44 135,52 160,52 C 185,52 195,18 210,18 C 225,18 245,52 270,52 C 295,52 310,44 330,44 C 355,44 375,54 400,54" 
                              fill="none" 
                              stroke="#0055FF" 
                              strokeWidth="2.5" 
                              strokeLinecap="round" 
                            />

                            {/* Thursday Peak Vertical Hairline Guideline */}
                            <line 
                              x1="210" 
                              y1="18" 
                              x2="210" 
                              y2="90" 
                              stroke="#0055FF" 
                              strokeWidth="1" 
                              strokeDasharray="2 2" 
                              opacity="0.35" 
                            />

                            {/* Peak Node Circle on Thursday */}
                            <circle cx="210" cy="18" r="4" fill="#0055FF" stroke="#FFFFFF" strokeWidth="2.5" />
                          </svg>

                          {/* Days Axis */}
                          <div className="flex items-center justify-between text-[10px] font-normal text-slate-400 pt-1 border-t border-slate-100">
                            <span>Mon</span>
                            <span>Tue</span>
                            <span>Wed</span>
                            <span className="font-normal text-[#0A0D14]">Thu</span>
                            <span>Fri</span>
                            <span>Sat</span>
                            <span>Sun</span>
                          </div>
                        </div>
                      </div>

                      {/* Footer Submetrics */}
                      <div className="grid grid-cols-2 gap-3 pt-3 mt-3 border-t border-slate-100">
                        {/* Completion Rate Gauge */}
                        <div className="flex items-center gap-2.5">
                          <div className="relative w-8 h-8 shrink-0 flex items-center justify-center">
                            <svg className="w-8 h-8 -rotate-90" viewBox="0 0 36 36">
                              <circle cx="18" cy="18" r="15" fill="none" stroke="#E2E8F0" strokeWidth="3" />
                              <circle cx="18" cy="18" r="15" fill="none" stroke="#10B981" strokeWidth="3" strokeDasharray="94.2" strokeDashoffset="4" strokeLinecap="round" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400 leading-none">Completion rate</p>
                            <div className="flex items-center gap-1 mt-1">
                              <span className="text-sm font-normal text-[#0A0D14]">98%</span>
                              <span className="text-[10px] font-normal text-emerald-600">↑ 12%</span>
                            </div>
                          </div>
                        </div>

                        {/* Average Length Clock */}
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                            <Clock className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400 leading-none">Average length</p>
                            <div className="flex items-center gap-1 mt-1">
                              <span className="text-sm font-normal text-[#0A0D14]">28 min</span>
                              <span className="text-[10px] font-normal text-rose-500">↓ 6%</span>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

              </main>

            </div>

            {/* ====================================================================
                PROGRESSIVE FADE MASK & LOWERED BRAND CALL TO ACTION
                ==================================================================== */}
            {/* Progressive Optical Fade Mask Scrim across bottom of dashboard shell */}
            <div 
              className="absolute inset-x-0 bottom-0 h-[280px] sm:h-[320px] pointer-events-none z-30"
              style={{
                background: 'linear-gradient(to top, #FBFCFE 0%, rgba(251, 252, 254, 0.99) 16%, rgba(251, 252, 254, 0.93) 32%, rgba(251, 252, 254, 0.8) 48%, rgba(251, 252, 254, 0.58) 64%, rgba(251, 252, 254, 0.32) 78%, rgba(251, 252, 254, 0.1) 90%, rgba(251, 252, 254, 0) 100%)'
              }}
            />

            {/* Centered Brandmark, Headline, Subtitle, and Pill CTA Overlay (Lowered to avoid covering cards) */}
            <div className="absolute inset-x-0 bottom-4 sm:bottom-6 z-40 flex flex-col items-center justify-end px-4 text-center pointer-events-auto">
              
              {/* elev Brandmark Infinity Ribbon - Direct Floating, No Fill / No Border Card */}
              <div className="mb-3.5 sm:mb-4 flex items-center justify-center transition-transform duration-300 hover:scale-105 active:scale-[0.96]">
                <img 
                  src="/elev-infinity-logo.png" 
                  alt="elev Logo" 
                  className="h-12 sm:h-14 md:h-16 w-auto object-contain pointer-events-none drop-shadow-[0_8px_20px_rgba(0,85,255,0.22)]" 
                />
              </div>

              {/* Main Headline (Lowered position, does not obstruct dashboard cards) */}
              <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-normal text-[#0A0D14] tracking-tight leading-snug text-balance max-w-xl">
                One connected workspace for all your meetings
              </h2>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1.5 sm:mt-2 max-w-md leading-relaxed text-balance">
                Seamlessly unify AI note-taking, automated scheduling, and client payments in a single dashboard.
              </p>

              {/* Solid Blue Pill CTA Button */}
              <button
                onClick={() => onOpenAuth('signup')}
                className="mt-3.5 sm:mt-4.5 bg-[#0055FF] hover:bg-[#0044CC] text-white text-xs sm:text-sm font-normal px-7 sm:px-8 py-3 sm:py-3.5 rounded-full flex items-center gap-2 shadow-[0_8px_24px_-4px_rgba(0,85,255,0.38)] active:scale-[0.96] transition-all cursor-pointer border border-blue-400/30"
              >
                <span>Get started for free</span>
                <ArrowRight className="w-4 h-4 stroke-[2.2]" />
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
