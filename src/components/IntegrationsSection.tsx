import { useState } from 'react';
import {
  ArrowRight,
  Search,
  Check,
  Zap,
  ArrowUpRight,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

interface IntegrationsSectionProps {
  onOpenDemo: () => void;
}

export default function IntegrationsSection({ onOpenDemo }: IntegrationsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'calendars' | 'video' | 'crm' | 'ai'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [connectedApps, setConnectedApps] = useState<Record<string, boolean>>({
    'Google Calendar': true,
    'Zoom': true
  });

  const integrations = [
    { name: 'Zoom', category: 'video', desc: 'Auto-generate unique meeting URLs with passwords.', icon: 'https://cdn.calendlycms.com/Zoom-1.svg', isSvgUrl: true },
    { name: 'Google Calendar', category: 'calendars', desc: 'Real-time multi-calendar conflict detection and sync.', icon: 'https://cdn.calendlycms.com/google-calendar-icon.svg', isSvgUrl: true },
    { name: 'Gmail', category: 'calendars', desc: 'Embed free-time slots right into your compose box.', icon: 'https://cdn.calendlycms.com/google-gmail-icon.svg', isSvgUrl: true },
    { name: 'Google Meet', category: 'video', desc: 'Instant 1-click video links for every booked invite.', icon: 'https://cdn.calendlycms.com/google-meet-icon.svg', isSvgUrl: true },
    { name: 'Salesforce', category: 'crm', desc: 'Log meetings, leads, and custom activity records.', icon: 'https://cdn.calendlycms.com/saleforce.svg', isSvgUrl: true },
    { name: 'Slack', category: 'crm', desc: 'Instant meeting notifications and booking reminders.', icon: 'https://cdn.calendlycms.com/slack-logo-icon.svg', isSvgUrl: true },
    { name: 'Microsoft Teams', category: 'video', desc: 'Direct video link generation with Outlook sync.', icon: 'https://cdn.calendlycms.com/teams.svg', isSvgUrl: true },
    { name: 'Outlook', category: 'calendars', desc: 'Native Microsoft 365 calendar synchronization.', icon: 'https://cdn.calendlycms.com/outlook.svg', isSvgUrl: true },
    { name: 'Chrome Extension', category: 'all', desc: 'Quick-share booking links from your browser toolbar.', icon: 'https://cdn.calendlycms.com/chrome-logo.svg', isSvgUrl: true },
    { name: 'OpenAI (ChatGPT)', category: 'ai', desc: 'Coordinate meeting requests directly from ChatGPT.', icon: 'https://cdn.calendlycms.com/openai-icon.svg', isSvgUrl: true },
    { name: 'Claude', category: 'ai', desc: 'Prompt Claude to find availability and prepare agendas.', icon: 'https://cdn.calendlycms.com/claude-icon.svg', isSvgUrl: true },
    { name: 'HubSpot', category: 'crm', desc: 'Map custom questions to contact properties.', icon: 'https://cdn.calendlycms.com/hubspot.svg', isSvgUrl: true },
    { name: 'Stripe', category: 'crm', desc: 'Charge booking deposits and packages seamlessly.', icon: 'https://cdn.calendlycms.com/stripe-logo.svg', isSvgUrl: true },
    { name: 'PayPal', category: 'crm', desc: 'Accept international payments and consultations.', icon: 'https://cdn.calendlycms.com/paypal-icon.svg', isSvgUrl: true },
    { name: 'Zapier', category: 'all', desc: 'Connect elev with 5,000+ business productivity apps.', icon: 'https://cdn.calendlycms.com/zapier-icon.svg', isSvgUrl: true }
  ];

  const filtered = integrations.filter(item => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleConnect = (name: string) => {
    setConnectedApps(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <section id="integrations" className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60 mb-3 inline-block">
            150+ integrations
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl lg:text-[3.25rem] text-[#071A31] font-normal leading-tight tracking-tight">
            Connect elev with your favorite tools
          </h2>
          <p className="font-heading text-base sm:text-lg text-slate-600 mt-4 leading-relaxed max-w-xl mx-auto">
            Our extensive list of native integrations makes elev fit right into your existing tech stack without disruption.
          </p>

          {/* Search & Category Filter */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8 max-w-xl mx-auto">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 150+ integrations..."
                className="w-full pl-10 pr-4 py-2 text-xs rounded-full border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-600 bg-slate-50"
              />
            </div>
            <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1">
              {[
                { id: 'all', label: 'All' },
                { id: 'calendars', label: 'Calendars' },
                { id: 'video', label: 'Video' },
                { id: 'crm', label: 'CRM & Pay' },
                { id: 'ai', label: 'AI Models' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-full transition-colors shrink-0 cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-[#071A31] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Integration Grid with Connected Toggles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 mb-14">
          {filtered.map((item) => {
            const isConnected = !!connectedApps[item.name];
            return (
              <div
                key={item.name}
                className="group relative bg-[#FAF8F5] hover:bg-white p-4 rounded-2xl border border-stone-200 transition-all shadow-2xs hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-stone-200/80 p-2 flex items-center justify-center shadow-2xs">
                      <img src={item.icon} alt={item.name} className="w-6 h-6 object-contain" />
                    </div>
                    <button
                      onClick={() => toggleConnect(item.name)}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition-colors cursor-pointer ${
                        isConnected
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      {isConnected ? 'Connected' : '+ Connect'}
                    </button>
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 mb-1">{item.name}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlighted Dual Cards: Google Suite & Microsoft Suite */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Google Suite */}
          <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white p-1.5 shadow-2xs border border-stone-200">
                    <svg className="w-full h-full" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                  </div>
                  <h4 className="font-editorial text-2xl text-[#071A31] font-normal">Google Workspace Suite</h4>
                </div>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  Native Partnership
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Get your job done faster by connecting elev directly to Google Calendar, Google Meet video, Gmail, Google Analytics, and Chrome Extensions.
              </p>
            </div>
            <button
              onClick={onOpenDemo}
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
            >
              <span>Explore Google integration features</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Microsoft Suite */}
          <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white p-1.5 shadow-2xs border border-stone-200">
                    <svg className="w-full h-full" viewBox="0 0 24 24">
                      <path fill="#F25022" d="M1 1h10v10H1z" />
                      <path fill="#00A4EF" d="M1 13h10v10H1z" />
                      <path fill="#7FBA00" d="M13 1h10v10H13z" />
                      <path fill="#FFB900" d="M13 13h10v10H13z" />
                    </svg>
                  </div>
                  <h4 className="font-editorial text-2xl text-[#071A31] font-normal">Microsoft 365 Suite</h4>
                </div>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  Certified Ecosystem
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Make your workday seamless with elev integrations built for Microsoft Teams video rooms, Outlook calendar workflows, and Azure Active Directory SSO.
              </p>
            </div>
            <button
              onClick={onOpenDemo}
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
            >
              <span>Explore Microsoft integration features</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
