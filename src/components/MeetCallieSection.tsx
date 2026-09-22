import { useState } from 'react';
import {
  Sparkles,
  AtSign,
  Calendar,
  MessageSquare,
  ArrowRight,
  Check,
  Send,
  Clock,
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MeetVelieSectionProps {
  onOpenDemo: () => void;
}

export default function MeetVelieSection({ onOpenDemo }: MeetVelieSectionProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [chatPrompt, setChatPrompt] = useState('');
  const [simulatedReply, setSimulatedReply] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const items = [
    {
      title: 'Conversational scheduling',
      description: 'Instead of managing scheduling links and calendars yourself, just add velie@elev.io to the email thread. Say what you need and let Velie take it from there.',
      icon: <AtSign className="w-5 h-5 text-[#0055FF]" />,
      tag: 'Autonomous Email CC'
    },
    {
      title: 'Precise coordination',
      description: 'Velie runs on your elev availability preferences, weighs conflicts and constraints, and always checks with you before making one-off updates.',
      icon: <Calendar className="w-5 h-5 text-[#0055FF]" />,
      tag: 'Conflict Protection'
    },
    {
      title: '24/7 assistance with meeting tasks',
      description: 'In elev, ask Velie for help with scheduling, meeting prep, recalling conversation and contact details, and more.',
      icon: <MessageSquare className="w-5 h-5 text-[#0055FF]" />,
      tag: 'Executive Copilot'
    }
  ];

  const handleTestChat = (preset?: string) => {
    const text = preset || chatPrompt;
    if (!text) return;
    setIsTyping(true);
    setSimulatedReply(null);

    setTimeout(() => {
      setIsTyping(false);
      if (text.toLowerCase().includes('prep') || text.toLowerCase().includes('brief')) {
        setSimulatedReply('Here is your brief for David Miller: Met 3 times previously. Priority: Cloud compliance. Action: Review SOC 2 Section 4.5 before 2 PM.');
      } else {
        setSimulatedReply('Checked 3 calendars. Alex and Sarah have overlapping openings Thursday at 2:00 PM and Friday at 10:30 AM PT. Shall I send holds?');
      }
      try {
        confetti({ particleCount: 25, spread: 45, origin: { y: 0.7 } });
      } catch {}
    }, 600);
  };

  return (
    <section className="py-24 lg:py-32 bg-[#F8FAFC] border-t border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Velie Badge */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs mb-4">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white border border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center justify-center p-1 shrink-0">
              <img src="/icon-velie-3d.png" alt="Velie AI" className="w-full h-full object-contain" />
            </div>
            <span className="text-sm sm:text-base font-normal text-[#0A0D14] tracking-tight">
              Velie AI
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[3.25rem] text-[#0A0D14] font-normal leading-[1.08] tracking-tight">
            Meet Velie, <span className="font-instrument italic font-normal bg-gradient-to-r from-[#418AC1] to-[#506DFD] bg-clip-text text-transparent inline-block pr-1">your AI assistant</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-4 max-w-2xl leading-relaxed">
            Eliminate scheduling ping-pong completely. Put meeting coordination on autopilot with an assistant that honors your strict boundaries and buffers.
          </p>
        </div>

        {/* Interactive layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Feature accordions */}
          <div className="lg:col-span-6 space-y-3.5">
            {items.map((item, idx) => {
              const isSelected = activeTab === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`rounded-2xl p-5 transition-all duration-200 cursor-pointer border ${
                    isSelected
                      ? 'bg-white border-amber-300/80 shadow-md ring-1 ring-amber-200'
                      : 'bg-white/60 border-[#E2E8F0] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        isSelected ? 'bg-[#DBEE9F] text-[#0A0D14]' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {item.icon}
                      </div>
                      <h3 className="font-normal text-base text-[#0A0D14]">
                        {item.title}
                      </h3>
                    </div>
                    <span className="text-[10px] font-normal uppercase tracking-wider bg-stone-100 text-slate-600 px-2 py-0.5 rounded-sm">
                      {item.tag}
                    </span>
                  </div>

                  {isSelected && (
                    <div className="mt-3 pl-11 text-xs text-slate-600 leading-relaxed animate-in fade-in">
                      {item.description}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Live Interactive Velie Sandbox */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-md border border-[#E2E8F0] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#DBEE9F] flex items-center justify-center font-normal text-xs text-[#0A0D14]">
                    V
                  </div>
                  <div>
                    <h4 className="text-xs font-normal text-slate-900">Velie Copilot Console</h4>
                    <span className="text-[10px] text-emerald-600 flex items-center gap-1 font-normal">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Listening on threads & calendars
                    </span>
                  </div>
                </div>
                <button
                  onClick={onOpenDemo}
                  className="text-xs font-normal text-blue-600 hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  Full Specs <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Sample conversation box */}
              <div className="bg-slate-50/80 rounded-2xl p-4 space-y-3 text-xs border border-slate-200/70">
                <div className="space-y-1">
                  <span className="text-[10px] font-normal text-slate-400 uppercase tracking-wider">Try Asking Velie:</span>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      onClick={() => handleTestChat('Find 30m with Sarah and Mark next week')}
                      className="text-[11px] font-normal bg-white px-2.5 py-1 rounded-full border border-slate-200 hover:border-amber-300 text-slate-700 transition-colors cursor-pointer"
                    >
                      "Find 30m with Sarah next week"
                    </button>
                    <button
                      onClick={() => handleTestChat('Prepare my executive briefing for David')}
                      className="text-[11px] font-normal bg-white px-2.5 py-1 rounded-full border border-slate-200 hover:border-amber-300 text-slate-700 transition-colors cursor-pointer"
                    >
                      "Prepare brief for David"
                    </button>
                  </div>
                </div>

                {/* Simulated response */}
                {isTyping && (
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-slate-600 text-xs flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600 animate-spin" />
                    <span>Velie is checking working hours, buffer constraints, and time zones...</span>
                  </div>
                )}

                {simulatedReply && (
                  <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-200 text-slate-800 text-xs space-y-2 animate-in fade-in">
                    <div className="flex items-center gap-1.5 font-normal text-[#0A0D14] text-[11px]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Velie's Recommendation</span>
                    </div>
                    <p className="text-xs leading-relaxed">{simulatedReply}</p>
                    <div className="flex items-center gap-2 pt-1">
                      <span className="inline-flex items-center gap-1 text-[10px] font-normal text-emerald-700 bg-white px-2 py-0.5 rounded-md border border-emerald-200">
                        <Check className="w-3 h-3 text-emerald-600" />
                        Zero Calendar Conflicts
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Input field */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleTestChat();
                }}
                className="flex items-center gap-2 pt-1"
              >
                <input
                  type="text"
                  value={chatPrompt}
                  onChange={(e) => setChatPrompt(e.target.value)}
                  placeholder="Ask Velie to schedule, summarize, or prep..."
                  className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-amber-400 bg-white"
                />
                <button
                  type="submit"
                  className="bg-[#0B1222] hover:bg-slate-800 text-white p-2.5 rounded-xl transition-colors cursor-pointer"
                  aria-label="Send prompt to Velie"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
