import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Search,
  Zap,
  Video,
  Calendar as CalendarIcon,
  MessageSquare,
  Database,
  Sparkles,
  Layers,
  CreditCard,
  X,
  Bot
} from 'lucide-react';
import { Reveal, ImageReveal } from '../motion';

interface IntegrationsSectionProps {
  onOpenDemo: () => void;
}

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'calendars', label: 'Calendars' },
  { id: 'video', label: 'Video' },
  { id: 'crm', label: 'CRM & Pay' },
  { id: 'ai', label: 'AI Models' }
] as const;

const INTEGRATIONS = [
  { name: 'Zoom', category: 'video', desc: 'Auto-generate unique meeting URLs with passwords.', icon: 'https://cdn.calendlycms.com/Zoom-1.svg' },
  { name: 'Google Calendar', category: 'calendars', desc: 'Real-time multi-calendar conflict detection and sync.', icon: 'https://cdn.calendlycms.com/google-calendar-icon.svg' },
  { name: 'Gmail', category: 'calendars', desc: 'Embed free-time slots right into your compose box.', icon: 'https://cdn.calendlycms.com/google-gmail-icon.svg' },
  { name: 'Google Meet', category: 'video', desc: 'Instant 1-click video links for every booked invite.', icon: 'https://cdn.calendlycms.com/google-meet-icon.svg' },
  { name: 'Salesforce', category: 'crm', desc: 'Log meetings, leads, and custom activity records.', icon: 'https://cdn.calendlycms.com/saleforce.svg' },
  { name: 'Slack', category: 'crm', desc: 'Instant meeting notifications and booking reminders.', icon: 'https://cdn.calendlycms.com/slack-logo-icon.svg' },
  { name: 'Microsoft Teams', category: 'video', desc: 'Direct video link generation with Outlook sync.', icon: 'https://cdn.calendlycms.com/teams.svg' },
  { name: 'Outlook', category: 'calendars', desc: 'Native Microsoft 365 calendar synchronization.', icon: 'https://cdn.calendlycms.com/outlook.svg' },
  { name: 'Chrome Extension', category: 'all', desc: 'Quick-share booking links from your browser toolbar.', icon: 'https://cdn.calendlycms.com/chrome-logo.svg' },
  { name: 'OpenAI (ChatGPT)', category: 'ai', desc: 'Coordinate meeting requests directly from ChatGPT.', icon: 'https://cdn.calendlycms.com/openai-icon.svg' },
  { name: 'Claude', category: 'ai', desc: 'Prompt Claude to find availability and prepare agendas.', icon: 'https://cdn.calendlycms.com/claude-icon.svg' },
  { name: 'HubSpot', category: 'crm', desc: 'Map custom questions to contact properties.', icon: 'https://cdn.calendlycms.com/hubspot.svg' },
  { name: 'Stripe', category: 'crm', desc: 'Charge booking deposits and packages seamlessly.', icon: 'https://cdn.calendlycms.com/stripe-logo.svg' },
  { name: 'PayPal', category: 'crm', desc: 'Accept international payments and consultations.', icon: 'https://cdn.calendlycms.com/paypal-icon.svg' },
  { name: 'Zapier', category: 'all', desc: 'Connect elev with 5,000+ business productivity apps.', icon: 'https://cdn.calendlycms.com/zapier-icon.svg' }
];

export default function IntegrationsSection({ onOpenDemo }: IntegrationsSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'calendars' | 'video' | 'crm' | 'ai'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [connectedApps, setConnectedApps] = useState<Record<string, boolean>>({
    'Google Calendar': true,
    'Zoom': true,
    'Stripe': true
  });

  const filtered = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return INTEGRATIONS.filter(item => {
      const matchesCat = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = !query || item.name.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query);
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const toggleConnect = (name: string) => {
    setConnectedApps(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <section id="integrations" className="py-20 sm:py-28 bg-[#F8FAFC] border-t border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Pristine White Hero Card Container */}
        <div className="relative w-full bg-white text-slate-900 rounded-[36px] sm:rounded-[44px] border border-slate-200/80 shadow-[0_16px_50px_rgba(0,0,0,0.04)] overflow-hidden">
          
          {/* Ambient Soft Glow */}
          <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[160px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px] lg:min-h-[580px] items-center relative z-10">
            
            {/* Left Column: Text & CTA */}
            <div className="lg:col-span-5 p-7 sm:p-10 lg:p-14 lg:pr-4 space-y-6 text-left relative z-10">
              <Reveal y={24}>
                <h2 className="text-3xl sm:text-4xl lg:text-[3.1rem] font-normal text-[#0A0D14] tracking-tight leading-[1.08] text-balance">
                  Connect elev to <br />
                  <span className="font-instrument italic font-normal text-[#5A95FF] bg-gradient-to-r from-[#4A8DFF] via-[#60A5FA] to-[#93C5FD] bg-clip-text text-transparent">
                    everything you use
                  </span>
                </h2>
              </Reveal>

              <Reveal delay={0.12} y={16}>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-sm text-pretty">
                  elev.ai fits right into your existing stack and automates the busywork in between.
                </p>
              </Reveal>

              <Reveal delay={0.22} y={16}>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#80B5FF] to-[#3B82F6] hover:from-[#6BA3FF] hover:to-[#2563EB] text-white font-normal text-xs sm:text-sm shadow-[0_8px_22px_rgba(59,130,246,0.28)] hover:shadow-[0_12px_28px_rgba(59,130,246,0.38)] active:scale-[0.97] transition-all duration-160 cursor-pointer"
                  >
                    <span>Explore 150+ integrations</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              </Reveal>

            </div>

            {/* Right Column: Fluid Wave Background Stage with Fade Mask & Corner Clipping */}
            <div className="lg:col-span-7 h-full flex flex-col justify-end relative self-stretch">
              <FluidIntegrationsStage />
            </div>

          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* INTERACTIVE INTEGRATIONS EXPLORER MODAL                   */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-xl">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 450, damping: 30 }}
              className="w-full max-w-4xl max-h-[85vh] bg-white rounded-3xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden text-slate-900"
            >
              {/* Modal Header */}
              <div className="p-6 pb-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-normal text-[#0A0D14] tracking-tight">150+ Native Integrations</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Explore native apps and single-click connections with elev.</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer active:scale-95"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Search & Category Filter */}
              <div className="p-5 py-3.5 bg-slate-50/70 border-b border-slate-100 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search 150+ integrations..."
                    className="w-full pl-10 pr-4 py-2 text-xs rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0055FF] bg-white shadow-2xs transition-all"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-0.5">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id as any)}
                      className={`text-xs font-normal px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer active:scale-[0.96] whitespace-nowrap ${
                        activeCategory === cat.id
                          ? 'bg-[#0055FF] text-white shadow-xs'
                          : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Integrations Grid */}
              <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                {filtered.map((item) => {
                  const isConnected = !!connectedApps[item.name];
                  return (
                    <div
                      key={item.name}
                      className="p-4 rounded-2xl border border-slate-200/80 bg-white hover:border-blue-400 transition-all shadow-2xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200/60 p-1.5 flex items-center justify-center">
                            <img
                              src={item.icon}
                              alt={item.name}
                              className="w-5 h-5 object-contain"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                          </div>
                          <button
                            onClick={() => toggleConnect(item.name)}
                            className={`text-[10px] font-normal px-2.5 py-0.5 rounded-full border transition-colors cursor-pointer active:scale-95 ${
                              isConnected
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                            }`}
                          >
                            {isConnected ? '✓ Connected' : '+ Connect'}
                          </button>
                        </div>
                        <h4 className="font-normal text-xs text-slate-900 mb-1">{item.name}</h4>
                        <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Modal Footer */}
              <div className="p-4 px-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Showing {filtered.length} integrations</span>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#418AC1] to-[#506DFD] hover:brightness-105 text-white font-normal transition-all duration-200 shadow-xs hover:shadow-blue-500/20 cursor-pointer active:scale-95"
                >
                  Done
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}

function ZoomIconSvg() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none">
      <rect width="24" height="24" rx="5.5" fill="#2D8CFF"/>
      <path d="M5 8.5C5 7.67157 5.67157 7 6.5 7H12.5C13.3284 7 14 7.67157 14 8.5V15.5C14 16.3284 13.3284 17 12.5 17H6.5C5.67157 17 5 16.3284 5 15.5V8.5Z" fill="white"/>
      <path d="M15 10.2L18.4 7.8C18.7333 7.55 19.2 7.788 19.2 8.2V15.8C19.2 16.212 18.7333 16.45 18.4 16.2L15 13.8V10.2Z" fill="white"/>
    </svg>
  );
}

function IntegrationPill({ 
  name, 
  icon, 
  floatOffset = 2.5, 
  floatDuration = 5, 
  floatDelay = 0 
}: { 
  name: string; 
  icon: string | React.ReactNode; 
  floatOffset?: number; 
  floatDuration?: number; 
  floatDelay?: number; 
}) {
  return (
    <motion.div
      animate={{ y: [-floatOffset, floatOffset, -floatOffset] }}
      transition={{ 
        duration: floatDuration, 
        repeat: Infinity, 
        ease: 'easeInOut', 
        delay: floatDelay 
      }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.96 }}
      className="bg-white border border-slate-100/90 shadow-[0_10px_25px_rgba(0,30,80,0.06),0_2px_6px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_36px_rgba(0,30,80,0.12)] px-4 sm:px-5 py-2.5 sm:py-3 rounded-[20px] sm:rounded-[22px] flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none transition-shadow shrink-0"
    >
      {typeof icon === 'string' ? (
        <img 
          src={icon} 
          alt={name} 
          className="w-5 h-5 sm:w-5.5 sm:h-5.5 object-contain shrink-0"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
      ) : (
        icon
      )}
      <span className="text-xs sm:text-sm font-normal text-[#0A0D14] tracking-tight whitespace-nowrap">{name}</span>
    </motion.div>
  );
}

function RadarAnimation() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 overflow-visible">
      <style>{`
        @keyframes seamlessRadarRipple {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          18% {
            opacity: 0.65;
          }
          100% {
            transform: scale(2.45);
            opacity: 0;
          }
        }
      `}</style>

      {/* Ambient Central White Breathing Glow */}
      <motion.div
        animate={{ scale: [1, 1.22, 1], opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-44 h-44 rounded-full bg-white/40 blur-2xl pointer-events-none"
      />

      {/* Static Concentric White Radar Range Rings with Soft Bloom */}
      <div className="absolute w-[140px] h-[140px] rounded-full border border-white/50 shadow-[0_0_12px_rgba(255,255,255,0.3)] pointer-events-none" />
      <div className="absolute w-[240px] h-[240px] rounded-full border border-white/35 shadow-[0_0_14px_rgba(255,255,255,0.2)] pointer-events-none" />
      <div className="absolute w-[340px] h-[340px] rounded-full border border-white/20 shadow-[0_0_16px_rgba(255,255,255,0.12)] pointer-events-none" />

      {/* Continuously Staggered Expanding Radar Waves (Zero-Flicker GPU Composited) */}
      {[0, -1.6, -3.2].map((delay, idx) => (
        <div
          key={idx}
          style={{
            animation: 'seamlessRadarRipple 4.8s cubic-bezier(0.16, 1, 0.3, 1) infinite',
            animationDelay: `${delay}s`,
            willChange: 'transform, opacity'
          }}
          className="absolute w-[160px] h-[160px] rounded-full border border-white/70 shadow-[0_0_16px_rgba(255,255,255,0.4)] pointer-events-none"
        />
      ))}
    </div>
  );
}

function FluidIntegrationsStage() {
  return (
    <div className="relative w-full h-full min-h-[480px] sm:min-h-[520px] lg:min-h-[560px] flex flex-col justify-between pt-10 sm:pt-12 pb-8 sm:pb-10 pr-4 sm:pr-8 lg:pr-10 pl-2 select-none">
      {/* Background Fluid Wave Artwork (Foto 2) Flush to Bottom-Right Corner & Clipped by Parent Card */}
      <div 
        className="absolute right-0 bottom-0 w-full h-[76%] sm:h-[80%] rounded-bl-[140px] sm:rounded-bl-[180px] overflow-hidden pointer-events-none"
        style={{
          WebkitMaskImage: 'linear-gradient(to top, black 35%, rgba(0,0,0,0.85) 65%, transparent 100%)',
          maskImage: 'linear-gradient(to top, black 35%, rgba(0,0,0,0.85) 65%, transparent 100%)'
        }}
        aria-hidden="true"
      >
        <div 
          className="absolute inset-0 bg-[url('/integrations-bg.png')] bg-cover bg-right-bottom"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 6%, rgba(0,0,0,0.9) 25%, black 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 6%, rgba(0,0,0,0.9) 25%, black 100%)'
          }}
        />
      </div>

      {/* Row 1: Top Row (Sitting on Pristine White Field above Wave) */}
      <div className="relative z-10 w-full flex items-center justify-center gap-3 sm:gap-5 lg:gap-6">
        <IntegrationPill 
          name="Google Calendar" 
          icon="https://cdn.calendlycms.com/google-calendar-icon.svg" 
          floatOffset={2.5} 
          floatDuration={4.8} 
          floatDelay={0} 
        />
        <IntegrationPill 
          name="Zoom" 
          icon={<ZoomIconSvg />} 
          floatOffset={3} 
          floatDuration={5.2} 
          floatDelay={0.5} 
        />
        <IntegrationPill 
          name="Slack" 
          icon="https://cdn.calendlycms.com/slack-logo-icon.svg" 
          floatOffset={2.5} 
          floatDuration={4.4} 
          floatDelay={1.2} 
        />
      </div>

      {/* Row 2: Middle Row (Spanning Salesforce, elev 3D Infinity with Radar Animation, Stripe) */}
      <div className="relative z-10 w-full flex items-center justify-between px-1 sm:px-3 lg:px-4">
        <IntegrationPill 
          name="Salesforce" 
          icon="https://cdn.calendlycms.com/saleforce.svg" 
          floatOffset={3} 
          floatDuration={5.6} 
          floatDelay={0.8} 
        />

        {/* Center 3D Infinity Logo with Animated Radar System */}
        <div className="relative shrink-0 flex items-center justify-center p-2">
          {/* Radar Animation Layer */}
          <RadarAnimation />

          {/* 3D Infinity Mark */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative z-10 flex items-center justify-center group cursor-pointer will-change-transform transform-gpu"
          >
            <img
              src="/elev-infinity-logo.png"
              alt="elev"
              className="w-24 sm:w-28 md:w-32 lg:w-36 h-auto object-contain filter drop-shadow-[0_12px_24px_rgba(0,85,255,0.25)] group-hover:scale-105 transition-transform duration-300 pointer-events-none select-none"
            />
          </motion.div>
        </div>

        <IntegrationPill 
          name="Stripe" 
          icon="https://cdn.calendlycms.com/stripe-logo.svg" 
          floatOffset={2.5} 
          floatDuration={4.9} 
          floatDelay={1.5} 
        />
      </div>

      {/* Row 3: Bottom Row (OpenAI, HubSpot, Zapier) */}
      <div className="relative z-10 w-full flex items-center justify-center gap-3 sm:gap-5 lg:gap-6">
        <IntegrationPill 
          name="OpenAI" 
          icon="https://cdn.calendlycms.com/openai-icon.svg" 
          floatOffset={3} 
          floatDuration={5.1} 
          floatDelay={0.3} 
        />
        <IntegrationPill 
          name="HubSpot" 
          icon="https://cdn.calendlycms.com/hubspot.svg" 
          floatOffset={2.5} 
          floatDuration={4.6} 
          floatDelay={1.0} 
        />
        <IntegrationPill 
          name="Zapier" 
          icon="https://cdn.calendlycms.com/zapier-icon.svg" 
          floatOffset={3} 
          floatDuration={5.4} 
          floatDelay={0.7} 
        />
      </div>
    </div>
  );
}

