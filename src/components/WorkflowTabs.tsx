import { useState } from 'react';
import { Check, ArrowRight, TrendingUp, Users, GitFork, ShieldCheck, Zap, UserCheck, Calendar } from 'lucide-react';
import { WORKFLOW_TABS } from '../data/landingData';

interface WorkflowTabsProps {
  onOpenDemo: () => void;
}

export default function WorkflowTabs({ onOpenDemo }: WorkflowTabsProps) {
  const [activeTabId, setActiveTabId] = useState('sales');

  const activeTab = WORKFLOW_TABS.find((t) => t.id === activeTabId) || WORKFLOW_TABS[0];

  return (
    <section id="workflows" className="py-20 lg:py-28 bg-slate-50/70 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-normal text-blue-600 uppercase tracking-wider bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Solutions by Team
          </span>
          <h2 className="text-3xl sm:text-4xl font-normal text-slate-900 tracking-tight">
            Scheduling built for every high-stakes workflow
          </h2>
          <p className="mt-3.5 text-base sm:text-lg text-slate-600">
            Whether closing enterprise deals, screening engineering talent, or onboarding new accounts, elev coordinates your team without the email ping-pong.
          </p>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {WORKFLOW_TABS.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-normal transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Tab Content Container */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Copy & Benefits */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-normal text-slate-500 bg-slate-100 px-3 py-1 rounded-md">
                <span>{activeTab.category}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-normal text-slate-900 tracking-tight leading-tight">
                {activeTab.headline}
              </h3>

              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {activeTab.description}
              </p>

              {/* Outcome Metric Badge */}
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-center gap-4">
                <div className="text-2xl sm:text-3xl font-normal text-blue-700">
                  {activeTab.stats.value}
                </div>
                <div className="text-xs sm:text-sm font-normal text-slate-700">
                  {activeTab.stats.label}
                </div>
              </div>

              {/* Checklist */}
              <ul className="space-y-2.5 pt-2">
                {activeTab.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-normal">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4">
                <button
                  onClick={onOpenDemo}
                  className="inline-flex items-center gap-2 text-sm font-normal text-blue-600 hover:text-blue-700 transition-colors cursor-pointer group"
                >
                  <span>Learn how {activeTab.name} teams use elev</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Column: Realistic Interactive Workflow Mockup */}
            <div className="lg:col-span-6">
              {activeTab.mockupType === 'sales' && (
                <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800 space-y-4 font-sans">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                    <span className="flex items-center gap-2 font-normal text-blue-400">
                      <GitFork className="w-4 h-4" />
                      Routing Logic Engine
                    </span>
                    <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-normal px-2 py-0.5 rounded-full border border-emerald-500/30">
                      Active Inbound Rule
                    </span>
                  </div>

                  {/* Visual logic block */}
                  <div className="space-y-2 text-xs">
                    <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                      <span className="text-slate-400">IF Lead Form:</span> Company size &gt; 250 employees
                    </div>
                    <div className="flex justify-center text-slate-500">↓</div>
                    <div className="bg-blue-950/80 p-3 rounded-xl border border-blue-800/60 flex items-center justify-between">
                      <div>
                        <span className="text-blue-300 font-normal">MATCH:</span> Senior Enterprise Pod (US-East)
                        <div className="text-[11px] text-slate-400 mt-0.5">Round-robin weighting: 100% availability</div>
                      </div>
                      <span className="text-xs bg-blue-500/30 text-blue-300 font-normal px-2 py-1 rounded-md">
                        0.8s speed
                      </span>
                    </div>
                    <div className="flex justify-center text-slate-500">↓</div>
                    <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80"
                          alt="Sarah"
                          className="w-8 h-8 rounded-full object-cover border border-slate-600"
                        />
                        <div>
                          <div className="font-normal text-slate-100">Sarah Jenkins booked</div>
                          <div className="text-[11px] text-slate-400">Salesforce Opp #8914 created automatically</div>
                        </div>
                      </div>
                      <span className="text-[11px] font-normal text-emerald-400 bg-emerald-950 px-2 py-1 rounded-md border border-emerald-800">
                        Booked Live
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab.mockupType === 'recruiting' && (
                <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                    <span className="font-normal text-slate-900 flex items-center gap-1.5">
                      <UserCheck className="w-4 h-4 text-blue-600" />
                      Senior Fullstack Engineer Panel
                    </span>
                    <span className="text-[11px] bg-blue-50 text-blue-700 font-normal px-2 py-0.5 rounded-full">
                      Collective Availability
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs text-slate-500 font-normal">3 Interviewers Required:</div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-slate-100 px-2.5 py-1 rounded-lg font-normal text-slate-700 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" /> Dave (VP Eng)
                      </span>
                      <span className="text-xs bg-slate-100 px-2.5 py-1 rounded-lg font-normal text-slate-700 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" /> Lisa (Tech Lead)
                      </span>
                      <span className="text-xs bg-slate-100 px-2.5 py-1 rounded-lg font-normal text-slate-700 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" /> Marcus (Recruiter)
                      </span>
                    </div>
                  </div>

                  <div className="bg-blue-50/70 p-3.5 rounded-xl border border-blue-100 text-xs space-y-2">
                    <div className="flex items-center justify-between font-normal text-blue-950">
                      <span>Mutually Available 45-min Windows:</span>
                      <span className="text-blue-600 font-normal">Today & Tomorrow</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white p-2 rounded-lg text-center font-normal text-blue-800 border border-blue-200">
                        Thu, 2:00 PM - 2:45 PM
                      </div>
                      <div className="bg-white p-2 rounded-lg text-center font-normal text-blue-800 border border-blue-200">
                        Fri, 10:30 AM - 11:15 AM
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
                    <span>Synced with Greenhouse ATS</span>
                    <span className="text-emerald-600 font-normal">0 scheduling conflicts</span>
                  </div>
                </div>
              )}

              {activeTab.mockupType === 'cs' && (
                <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                    <span className="font-normal text-slate-900 flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-blue-600" />
                      Round-Robin CS Onboarding Pool
                    </span>
                    <span className="text-emerald-600 font-normal text-[11px] bg-emerald-50 px-2 py-0.5 rounded-full">
                      Auto-Balanced
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      { name: 'Sarah Linwood', role: 'Enterprise CS', meetings: '4 this week', status: 'Next in queue' },
                      { name: 'David Park', role: 'Strategic CS', meetings: '5 this week', status: 'Available' },
                      { name: 'Chloe Taylor', role: 'Technical AM', meetings: '6 this week', status: 'In meeting' }
                    ].map((rep, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                        <div>
                          <div className="font-normal text-slate-900">{rep.name}</div>
                          <div className="text-[11px] text-slate-500">{rep.role} · {rep.meetings}</div>
                        </div>
                        <span className={`px-2 py-1 rounded-md text-[10px] font-normal ${
                          i === 0 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {rep.status}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
                    <span>Client satisfaction rating:</span>
                    <span className="font-normal text-emerald-800">4.96 / 5.0 ⭐</span>
                  </div>
                </div>
              )}

              {activeTab.mockupType === 'revops' && (
                <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                    <span className="font-normal text-slate-200 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      Organization Security & Governance
                    </span>
                    <span className="bg-slate-800 text-slate-300 text-[10px] font-normal px-2 py-0.5 rounded-full">
                      Admin Console
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                      <div className="text-slate-400 text-[11px]">SAML SSO</div>
                      <div className="font-normal text-slate-100 mt-1 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" /> Okta Active
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                      <div className="text-slate-400 text-[11px]">SCIM Provisioning</div>
                      <div className="font-normal text-slate-100 mt-1 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" /> 148 Seats Synced
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                      <div className="text-slate-400 text-[11px]">Compliance Audit</div>
                      <div className="font-normal text-slate-100 mt-1">SOC 2 Type II Verified</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                      <div className="text-slate-400 text-[11px]">Calendar Lock</div>
                      <div className="font-normal text-slate-100 mt-1">Enforced 15m Buffer</div>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-950/60 rounded-xl border border-blue-900 text-xs text-blue-200 flex items-center justify-between">
                    <span>Active Domain Governance:</span>
                    <span className="font-normal text-white">@company.com</span>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
