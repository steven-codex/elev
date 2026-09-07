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
        <div className="relative w-full bg-white text-slate-900 rounded-[36px] sm:rounded-[44px] p-7 sm:p-11 lg:p-14 border border-slate-200/80 shadow-[0_16px_50px_rgba(0,0,0,0.04)] overflow-hidden">
          
          {/* Ambient Soft Glow */}
          <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[160px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center relative z-10">
            
            {/* Left Column: Text & CTA */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100/90 border border-slate-200/80 text-slate-700 text-xs font-semibold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>NATIVE INTEGRATIONS ENGINE</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-bold text-[#0A0D14] tracking-tight leading-[1.12] text-balance">
                Connect elev to <br />
                everything you use.
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-sm text-pretty">
                elev.ai fits right into your existing stack and automates the busywork in between.
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#0055FF] hover:bg-[#0047D6] text-white font-semibold text-xs sm:text-sm shadow-md shadow-blue-500/20 transition-all duration-200 cursor-pointer active:scale-[0.96]"
                >
                  <span>Explore 150+ integrations</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>

            </div>

            {/* Right Column: Complex & Ultra-Clean Neural Data Fusion Stage */}
            <div className="lg:col-span-7">
              <NeuralDataFusionStage />
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
                  <h3 className="text-xl font-bold text-[#0A0D14] tracking-tight">150+ Native Integrations</h3>
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
                      className={`text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer active:scale-[0.96] whitespace-nowrap ${
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
                            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border transition-colors cursor-pointer active:scale-95 ${
                              isConnected
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                            }`}
                          >
                            {isConnected ? '✓ Connected' : '+ Connect'}
                          </button>
                        </div>
                        <h4 className="font-bold text-xs text-slate-900 mb-1">{item.name}</h4>
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
                  className="px-5 py-2 rounded-xl bg-[#0055FF] hover:bg-[#0047D6] text-white font-bold transition-all duration-200 shadow-xs cursor-pointer active:scale-95"
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

const STAGE_NODES = [
  {
    id: 0,
    name: 'Google Calendar',
    category: 'Calendar',
    sub: '2-Way Sync',
    icon: 'https://cdn.calendlycms.com/google-calendar-icon.svg',
    toast: '📅 Synced Google & Outlook (0.12s)',
    floatY: [0, -5, 0, 5, 0],
    duration: 5.2,
    delay: 0
  },
  {
    id: 1,
    name: 'Zoom',
    category: 'Video',
    sub: 'Auto-Links',
    icon: 'https://cdn.calendlycms.com/Zoom-1.svg',
    toast: '🎥 Unique Zoom link generated',
    floatY: [0, 5, 0, -5, 0],
    duration: 5.6,
    delay: 0.4
  },
  {
    id: 2,
    name: 'Slack',
    category: 'Chat & Alerts',
    sub: 'Instant Notify',
    icon: 'https://cdn.calendlycms.com/slack-logo-icon.svg',
    toast: '💬 Slack channel notified',
    floatY: [0, -5, 0, 5, 0],
    duration: 4.8,
    delay: 0.8
  },
  {
    id: 3,
    name: 'Salesforce',
    category: 'CRM',
    sub: 'Auto-Log',
    icon: 'https://cdn.calendlycms.com/saleforce.svg',
    toast: '💼 Lead synced to Salesforce',
    floatY: [0, -5, 0, 5, 0],
    duration: 5.4,
    delay: 0.2
  },
  {
    id: 4,
    name: 'Stripe',
    category: 'Payments',
    sub: 'Instant Pay',
    icon: 'https://cdn.calendlycms.com/stripe-logo.svg',
    toast: '💳 $150 Stripe deposit captured',
    floatY: [0, 5, 0, -5, 0],
    duration: 5.0,
    delay: 0.6
  },
  {
    id: 5,
    name: 'OpenAI',
    category: 'AI Assistant',
    sub: 'Copilot',
    icon: 'https://cdn.calendlycms.com/openai-icon.svg',
    toast: '🤖 ChatGPT scheduled meeting',
    floatY: [0, -5, 0, 5, 0],
    duration: 5.8,
    delay: 1.0
  },
  {
    id: 6,
    name: 'HubSpot',
    category: 'Marketing',
    sub: 'Forms',
    icon: 'https://cdn.calendlycms.com/hubspot.svg',
    toast: '📊 Contact updated in HubSpot',
    floatY: [0, 5, 0, -5, 0],
    duration: 5.1,
    delay: 0.5
  },
  {
    id: 7,
    name: 'Zapier',
    category: 'Automations',
    sub: '5k+ Apps',
    icon: 'https://cdn.calendlycms.com/zapier-icon.svg',
    toast: '⚡ Zapier automation triggered',
    floatY: [0, -5, 0, 5, 0],
    duration: 5.5,
    delay: 0.9
  }
];

function NeuralDataFusionStage() {
  const [activeNode, setActiveNode] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const guidePathRefs = useRef<(SVGPathElement | null)[]>([]);
  const activePathRefs = useRef<(SVGPathElement | null)[]>([]);

  const updateLinePositions = useCallback(() => {
    if (!containerRef.current || !hubRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const hubRect = hubRef.current.getBoundingClientRect();

    const endX = hubRect.left + hubRect.width / 2 - containerRect.left;
    const endY = hubRect.top + hubRect.height / 2 - containerRect.top;

    STAGE_NODES.forEach((node) => {
      const cardEl = cardRefs.current[node.id];
      const guidePathEl = guidePathRefs.current[node.id];
      const activePathEl = activePathRefs.current[node.id];

      if (!cardEl || !guidePathEl || !activePathEl) return;

      const cardRect = cardEl.getBoundingClientRect();
      const startX = cardRect.left + cardRect.width / 2 - containerRect.left;
      const startY = cardRect.top + cardRect.height / 2 - containerRect.top;

      const dx = endX - startX;
      const dy = endY - startY;

      let cp1X = startX + dx * 0.45;
      let cp1Y = startY + dy * 0.05;
      let cp2X = startX + dx * 0.55;
      let cp2Y = startY + dy * 0.95;

      if (Math.abs(dx) < 30) {
        cp1X = startX;
        cp1Y = startY + dy * 0.5;
        cp2X = endX;
        cp2Y = startY + dy * 0.5;
      } else if (Math.abs(dy) < 30) {
        cp1X = startX + dx * 0.5;
        cp1Y = startY;
        cp2X = startX + dx * 0.5;
        cp2Y = endY;
      }

      const d = `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;
      guidePathEl.setAttribute('d', d);
      activePathEl.setAttribute('d', d);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % STAGE_NODES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let animFrameId: number;
    const loop = () => {
      updateLinePositions();
      animFrameId = requestAnimationFrame(loop);
    };
    animFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrameId);
  }, [updateLinePositions]);

  const currentNode = STAGE_NODES[activeNode];

  return (
    <div ref={containerRef} className="w-full relative min-h-[460px] sm:min-h-[500px] flex items-center justify-center p-2 select-none overflow-hidden">
      {/* Real-Time Dynamic Laser Beams SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
        <defs>
          <linearGradient id="laserGradActive" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0055FF" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#38BDF8" stopOpacity="1" />
            <stop offset="100%" stopColor="#0055FF" stopOpacity="0.9" />
          </linearGradient>
          <filter id="hyperBeamGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {STAGE_NODES.map((node) => {
          const isActive = node.id === activeNode;
          return (
            <g key={node.id}>
              <path
                ref={(el) => { guidePathRefs.current[node.id] = el; }}
                d="M 0 0 L 0 0"
                fill="none"
                stroke="rgba(203, 213, 225, 0.65)"
                strokeWidth={1.5}
                strokeDasharray="4 6"
              />
              <path
                id={`active-beam-path-${node.id}`}
                ref={(el) => { activePathRefs.current[node.id] = el; }}
                d="M 0 0 L 0 0"
                fill="none"
                stroke="url(#laserGradActive)"
                strokeWidth={2.5}
                filter="url(#hyperBeamGlow)"
                style={{ opacity: isActive ? 1 : 0, transition: 'opacity 300ms ease' }}
              />
            </g>
          );
        })}

        <g filter="url(#hyperBeamGlow)">
          <circle r="4" fill="#0055FF">
            <animateMotion dur="1.4s" repeatCount="indefinite">
              <mpath href={`#active-beam-path-${activeNode}`} />
            </animateMotion>
          </circle>
          <circle r="2.5" fill="#38BDF8">
            <animateMotion dur="1.4s" repeatCount="indefinite" begin="0.25s">
              <mpath href={`#active-beam-path-${activeNode}`} />
            </animateMotion>
          </circle>
        </g>
      </svg>

      <div className="w-full max-w-2xl space-y-6 relative z-20">
        <div className="flex items-center justify-center gap-4 sm:gap-8">
          {[STAGE_NODES[0], STAGE_NODES[1], STAGE_NODES[2]].map((node) => {
            const isActive = node.id === activeNode;
            return (
              <motion.div
                key={node.id}
                ref={(el) => { cardRefs.current[node.id] = el; }}
                onClick={() => setActiveNode(node.id)}
                animate={{ y: node.floatY, scale: isActive ? 1.05 : 0.98, opacity: isActive ? 1 : 0.82 }}
                transition={{ y: { duration: node.duration, delay: node.delay, repeat: Infinity, ease: 'easeInOut' }, scale: { type: 'spring', stiffness: 380, damping: 26 }, opacity: { duration: 0.25 } }}
                className={`group px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-2xl border backdrop-blur-2xl flex items-center gap-2.5 transition-all duration-300 cursor-pointer active:scale-[0.96] ${isActive ? 'bg-white border-blue-400 ring-4 ring-blue-500/15 shadow-[0_12px_32px_rgba(0,85,255,0.16)]' : 'bg-white/70 hover:bg-white/95 border-white/90 hover:border-slate-200 shadow-[0_6px_20px_rgba(0,0,0,0.03)]'}`}
              >
                <img src={node.icon} alt={node.name} className="w-6 h-6 object-contain shrink-0 group-hover:scale-105 transition-transform duration-200" />
                <div className="text-left hidden sm:block">
                  <p className="text-[11px] font-bold text-slate-900 leading-tight">{node.name}</p>
                  <p className="text-[9px] font-medium text-slate-500">{node.sub}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-4 sm:gap-8">
          <motion.div
            ref={(el) => { cardRefs.current[STAGE_NODES[3].id] = el; }}
            onClick={() => setActiveNode(STAGE_NODES[3].id)}
            animate={{ y: STAGE_NODES[3].floatY, scale: activeNode === 3 ? 1.05 : 0.98, opacity: activeNode === 3 ? 1 : 0.82 }}
            transition={{ y: { duration: STAGE_NODES[3].duration, delay: STAGE_NODES[3].delay, repeat: Infinity, ease: 'easeInOut' }, scale: { type: 'spring', stiffness: 380, damping: 26 }, opacity: { duration: 0.25 } }}
            className={`group px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-2xl border backdrop-blur-2xl flex items-center gap-2.5 transition-all duration-300 cursor-pointer active:scale-[0.96] ${activeNode === 3 ? 'bg-white border-blue-400 ring-4 ring-blue-500/15 shadow-[0_12px_32px_rgba(0,85,255,0.16)]' : 'bg-white/70 hover:bg-white/95 border-white/90 hover:border-slate-200 shadow-[0_6px_20px_rgba(0,0,0,0.03)]'}`}
          >
            <img src={STAGE_NODES[3].icon} alt={STAGE_NODES[3].name} className="w-6 h-6 object-contain shrink-0 group-hover:scale-105 transition-transform duration-200" />
            <div className="text-left hidden sm:block">
              <p className="text-[11px] font-bold text-slate-900 leading-tight">{STAGE_NODES[3].name}</p>
              <p className="text-[9px] font-medium text-slate-500">{STAGE_NODES[3].sub}</p>
            </div>
          </motion.div>

          <div ref={hubRef} className="flex flex-col items-center justify-center relative py-1 px-2">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
              <div className="relative w-48 h-48 filter-gooey opacity-50">
                <div className="absolute inset-2 rounded-full bg-blue-400/20 blur-md animate-gooey-morph" />
                <div className="absolute w-24 h-24 rounded-full bg-sky-400/25 blur-md animate-gooey-orbit" />
              </div>
            </div>

            <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentNode.id}
                  initial={{ opacity: 0, y: 6, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.94 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                  className="px-3.5 py-1 rounded-full bg-white/95 text-slate-900 text-[11px] font-semibold border border-slate-200/80 shadow-[0_8px_24px_rgba(0,0,0,0.06)] backdrop-blur-xl whitespace-nowrap flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
                  <span>{currentNode.toast}</span>
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.div
              animate={{ y: [0, -5, 0, 5, 0] }}
              transition={{ duration: 6.0, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              className="relative z-20 w-28 h-28 sm:w-34 sm:h-34 rounded-full bg-gradient-to-b from-white via-white/95 to-blue-50/80 backdrop-blur-2xl border-2 border-white text-slate-900 flex flex-col items-center justify-center shadow-[0_16px_40px_rgba(0,85,255,0.14),inset_0_2px_4px_rgba(255,255,255,1)] ring-4 ring-blue-100/60 cursor-pointer transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(0,85,255,0.22)]"
            >
              <Sparkles className="w-5 h-5 text-[#0055FF] animate-pulse mb-0.5" />
              <span className="tracking-tight text-xl sm:text-2xl text-slate-900 font-bold drop-shadow-2xs">elev.ai</span>
              <span className="text-[9px] font-bold tracking-widest text-[#0055FF] uppercase mt-0.5 flex items-center gap-1">HUB ACTIVE</span>
            </motion.div>
          </div>

          <motion.div
            ref={(el) => { cardRefs.current[STAGE_NODES[4].id] = el; }}
            onClick={() => setActiveNode(STAGE_NODES[4].id)}
            animate={{ y: STAGE_NODES[4].floatY, scale: activeNode === 4 ? 1.05 : 0.98, opacity: activeNode === 4 ? 1 : 0.82 }}
            transition={{ y: { duration: STAGE_NODES[4].duration, delay: STAGE_NODES[4].delay, repeat: Infinity, ease: 'easeInOut' }, scale: { type: 'spring', stiffness: 380, damping: 26 }, opacity: { duration: 0.25 } }}
            className={`group px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-2xl border backdrop-blur-2xl flex items-center gap-2.5 transition-all duration-300 cursor-pointer active:scale-[0.96] ${activeNode === 4 ? 'bg-white border-blue-400 ring-4 ring-blue-500/15 shadow-[0_12px_32px_rgba(0,85,255,0.16)]' : 'bg-white/70 hover:bg-white/95 border-white/90 hover:border-slate-200 shadow-[0_6px_20px_rgba(0,0,0,0.03)]'}`}
          >
            <img src={STAGE_NODES[4].icon} alt={STAGE_NODES[4].name} className="w-6 h-6 object-contain shrink-0 group-hover:scale-105 transition-transform duration-200" />
            <div className="text-left hidden sm:block">
              <p className="text-[11px] font-bold text-slate-900 leading-tight">{STAGE_NODES[4].name}</p>
              <p className="text-[9px] font-medium text-slate-500">{STAGE_NODES[4].sub}</p>
            </div>
          </motion.div>
        </div>

        <div className="flex items-center justify-center gap-4 sm:gap-8">
          {[STAGE_NODES[5], STAGE_NODES[6], STAGE_NODES[7]].map((node) => {
            const isActive = node.id === activeNode;
            return (
              <motion.div
                key={node.id}
                ref={(el) => { cardRefs.current[node.id] = el; }}
                onClick={() => setActiveNode(node.id)}
                animate={{ y: node.floatY, scale: isActive ? 1.05 : 0.98, opacity: isActive ? 1 : 0.82 }}
                transition={{ y: { duration: node.duration, delay: node.delay, repeat: Infinity, ease: 'easeInOut' }, scale: { type: 'spring', stiffness: 380, damping: 26 }, opacity: { duration: 0.25 } }}
                className={`group px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-2xl border backdrop-blur-2xl flex items-center gap-2.5 transition-all duration-300 cursor-pointer active:scale-[0.96] ${isActive ? 'bg-white border-blue-400 ring-4 ring-blue-500/15 shadow-[0_12px_32px_rgba(0,85,255,0.16)]' : 'bg-white/70 hover:bg-white/95 border-white/90 hover:border-slate-200 shadow-[0_6px_20px_rgba(0,0,0,0.03)]'}`}
              >
                <img src={node.icon} alt={node.name} className="w-6 h-6 object-contain shrink-0 group-hover:scale-105 transition-transform duration-200" />
                <div className="text-left hidden sm:block">
                  <p className="text-[11px] font-bold text-slate-900 leading-tight">{node.name}</p>
                  <p className="text-[9px] font-medium text-slate-500">{node.sub}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
