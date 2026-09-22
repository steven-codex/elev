import { useState } from 'react';
import {
  Calendar,
  Layers,
  Wind,
  LayoutTemplate,
  Smartphone,
  Users,
  ArrowUpRight,
  Check,
  Clock,
  Shield,
  Sliders,
  Filter
} from 'lucide-react';

interface StickyAccordionSchedulingProps {
  onOpenDemo: () => void;
}

export default function StickyAccordionScheduling({ onOpenDemo }: StickyAccordionSchedulingProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const features = [
    {
      id: 'control',
      title: 'Full control over your calendar',
      description: "Connect your calendars, set your hours, and control exactly when you're available to meet.",
      icon: <Calendar className="w-5 h-5 text-blue-600" />,
      interactivePreview: (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-600" />
              <span className="font-normal text-slate-800">Custom Working Hours & Buffers</span>
            </div>
            <span className="text-[10px] font-normal text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Conflict Guard</span>
          </div>

          <div className="space-y-2">
            {[
              { day: 'Monday – Thursday', hours: '9:00 AM – 5:00 PM', active: true },
              { day: 'Friday (Deep Focus)', hours: '10:00 AM – 2:00 PM', active: true },
              { day: 'Saturday – Sunday', hours: 'Unavailable (Protected)', active: false }
            ].map((schedule, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
                <span className="font-normal text-slate-700">{schedule.day}</span>
                <span className={`text-xs font-mono font-normal ${schedule.active ? 'text-slate-900' : 'text-slate-400'}`}>
                  {schedule.hours}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-blue-50/70 p-3 rounded-xl border border-blue-100 flex items-center justify-between text-[11px] text-blue-900 font-normal">
            <span>Automatic Buffer Time:</span>
            <span className="font-normal bg-white px-2 py-0.5 rounded-md border border-blue-200">15 min after each call</span>
          </div>
        </div>
      )
    },
    {
      id: 'templates',
      title: 'Meeting templates for every scenario',
      description: 'From one-on-one calls to multi-host meetings, pre-built event types make scheduling easy for everyone.',
      icon: <Layers className="w-5 h-5 text-blue-600" />,
      interactivePreview: (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-3 text-xs">
          <span className="text-[11px] font-normal uppercase tracking-wider text-slate-400 block mb-1">Pre-configured Event Types</span>
          <div className="space-y-2">
            {[
              { title: '15 Min Quick Connect', type: '1-on-1', color: 'bg-blue-100 text-blue-800' },
              { title: '30 Min Discovery Demo', type: 'Round Robin Team', color: 'bg-emerald-100 text-emerald-800' },
              { title: '60 Min Strategy & Review', type: 'Collective (Multi-Host)', color: 'bg-purple-100 text-purple-800' }
            ].map((tmpl, idx) => (
              <div key={idx} className="p-3 rounded-xl border border-slate-200 hover:border-blue-400 bg-white flex items-center justify-between transition-colors">
                <div>
                  <h5 className="font-normal text-slate-900 text-xs">{tmpl.title}</h5>
                  <span className="text-[11px] text-slate-400">Includes video conferencing link</span>
                </div>
                <span className={`text-[10px] font-normal px-2 py-0.5 rounded-full ${tmpl.color}`}>
                  {tmpl.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'workflows',
      title: 'Automated email & text workflows',
      description: 'Reduce no-shows with personalized email and text reminders, and let invitees reschedule when needed without the back-and-forth.',
      icon: <Wind className="w-5 h-5 text-blue-600" />,
      interactivePreview: (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-3 text-xs">
          <span className="text-[11px] font-normal uppercase tracking-wider text-slate-400 block mb-1">Active Automated Sequence</span>
          <div className="space-y-2 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-blue-100">
            {[
              { step: 'Immediate', desc: 'Calendar invitation + Confirmation email sent' },
              { step: '24 Hours Before', desc: 'SMS Reminder with 1-click reschedule link' },
              { step: '1 Hour Before', desc: 'Agenda checklist & Meet room URL push' }
            ].map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 relative pl-1">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 text-[10px] font-normal z-10">
                  {idx + 1}
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 flex-1">
                  <span className="font-normal text-slate-900 block text-[11px]">{step.step}</span>
                  <span className="text-slate-600 text-[11px]">{step.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'embeds',
      title: 'Website embeds and routing forms',
      description: 'Let visitors schedule right from your website. Add routing forms to qualify leads and match them with the right team member.',
      icon: <LayoutTemplate className="w-5 h-5 text-blue-600" />,
      interactivePreview: (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-3 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="font-normal text-slate-800">Interactive Lead Routing Form</span>
            <span className="text-[10px] font-normal text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">Live Route</span>
          </div>
          <div className="space-y-2">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <label className="text-[10px] font-normal uppercase text-slate-400 block mb-1">Company Size</label>
              <div className="text-xs font-normal text-slate-800">50 – 250 Employees (Enterprise Tier)</div>
            </div>
            <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-emerald-900">
              <span className="font-normal text-xs block mb-0.5">Matched Account Executive:</span>
              <span className="text-xs">Rachel Vance (Assigned via Round-Robin Pool)</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'wherever',
      title: 'Scheduling whenever, wherever',
      description: 'Access elev from the mobile app or browser extension, or use it with your favorite AI tool, LinkedIn, or 150+ other integrations.',
      icon: <Smartphone className="w-5 h-5 text-blue-600" />,
      interactivePreview: (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-3 text-xs">
          <span className="text-[11px] font-normal uppercase tracking-wider text-slate-400 block mb-1">Available Everywhere You Work</span>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1">
              <span className="font-normal text-slate-800 block text-xs">Chrome Extension</span>
              <span className="text-[10px] text-slate-500">Insert available times directly inside Gmail</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1">
              <span className="font-normal text-slate-800 block text-xs">iOS & Android App</span>
              <span className="text-[10px] text-slate-500">Share single-use links on the go</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1">
              <span className="font-normal text-slate-800 block text-xs">Outlook Add-In</span>
              <span className="text-[10px] text-slate-500">One-click calendar scheduling</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1">
              <span className="font-normal text-slate-800 block text-xs">AI & API Webhooks</span>
              <span className="text-[10px] text-slate-500">Trigger Zapier & CRM workflows</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'teams',
      title: 'Tools for teams of all sizes',
      description: 'Grow your business with scheduling that scales. Add teammates, set permissions, and manage access without switching tools.',
      icon: <Users className="w-5 h-5 text-blue-600" />,
      interactivePreview: (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-3 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="font-normal text-slate-800">Team Admin & Governance</span>
            <span className="text-[10px] font-normal text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">SCIM / SSO Active</span>
          </div>
          <div className="space-y-1.5">
            {[
              { role: 'Sales Lead', members: '14 Seats', status: 'Managed' },
              { role: 'Customer Success', members: '8 Seats', status: 'Managed' },
              { role: 'Talent Acquisition', members: '5 Seats', status: 'Managed' }
            ].map((group, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="font-normal text-slate-800">{group.role}</span>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 text-[11px]">{group.members}</span>
                  <span className="text-[10px] bg-slate-200 text-slate-700 font-normal px-1.5 py-0.2 rounded-xs">
                    {group.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="scheduling" className="py-24 lg:py-32 bg-white border-t border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs mb-4">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white border border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center justify-center p-1 shrink-0">
              <img src="/icon-scheduling-3d.png" alt="Scheduling" className="w-full h-full object-contain" />
            </div>
            <span className="text-sm sm:text-base font-normal text-[#0A0D14] tracking-tight">
              Scheduling
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[3.25rem] text-[#0A0D14] font-normal leading-[1.08] tracking-tight">
            A better way to <span className="font-instrument italic font-normal bg-gradient-to-r from-[#418AC1] to-[#506DFD] bg-clip-text text-transparent inline-block pr-1">book your meetings</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed max-w-2xl">
            Connect your calendars, protect focus time with automated buffer guards, and let clients self-schedule in seconds without back-and-forth emails.
          </p>
        </div>

        {/* Side-by-side interactive accordion & sticky visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Feature Accordion List */}
          <div className="lg:col-span-7 space-y-3">
            {features.map((feature, idx) => {
              const isOpen = activeIndex === idx;
              return (
                <div
                  key={feature.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`rounded-2xl p-5 transition-all duration-200 cursor-pointer border ${
                    isOpen
                      ? 'bg-slate-50/90 border-blue-200 shadow-xs'
                      : 'bg-white border-slate-200/70 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                        isOpen ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {feature.icon}
                      </div>
                      <h3 className="font-normal text-base text-[#0A0D14]">
                        {feature.title}
                      </h3>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenDemo();
                      }}
                      className="text-slate-400 hover:text-blue-600 p-1.5 rounded-lg transition-colors cursor-pointer"
                      aria-label="View feature details"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>

                  {isOpen && (
                    <div className="mt-3 pl-12 pr-4 animate-in fade-in duration-200">
                      <p className="text-sm text-slate-600 leading-relaxed font-normal">
                        {feature.description}
                      </p>
                      <div className="mt-4 lg:hidden">
                        {feature.interactivePreview}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Live Interactive Preview on desktop */}
          <div className="hidden lg:block lg:col-span-5 sticky top-28">
            <div className="bg-[#F8FAFC] rounded-3xl p-6 border border-[#E2E8F0] shadow-sm transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-normal uppercase tracking-wider text-slate-400">
                  Live Capability Preview
                </span>
                <span className="text-xs font-normal text-blue-600">
                  {features[activeIndex].title}
                </span>
              </div>

              {features[activeIndex].interactivePreview}

              <div className="mt-5 pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-slate-500">
                <span>Part of elev Enterprise & Teams</span>
                <button
                  onClick={onOpenDemo}
                  className="font-normal text-blue-600 hover:underline cursor-pointer"
                >
                  Request guided tour →
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
