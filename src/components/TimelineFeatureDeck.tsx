import { useState } from 'react';
import {
  Sparkles,
  Calendar,
  CreditCard,
  UserCheck,
  FileText,
  Mail,
  ArrowRight,
  CheckCircle2,
  Clock,
  Shield,
  MessageSquare
} from 'lucide-react';

interface TimelineFeatureDeckProps {
  onOpenAuth: (mode: 'signup') => void;
}

export default function TimelineFeatureDeck({ onOpenAuth }: TimelineFeatureDeckProps) {
  const [activeCard, setActiveCard] = useState<number>(0);

  const cards = [
    {
      id: 'book',
      stepNumber: '01',
      title: 'Book',
      restingDescription: 'Book the meeting and get paid with zero back-and-forth.',
      activeParagraph: 'A client emails asking to meet. Share a booking link or ask Callie, your AI assistant, to find times that work for everyone.',
      items: [
        { text: 'Callie replies with times to meet', product: 'callie', color: '#DBEE9F' },
        { text: 'Client picks Tuesday at 2 p.m.', product: 'scheduling', color: '#6BB1FF' },
        { text: 'Client pays $150 deposit upfront', product: 'payments', color: '#5DDFD7' }
      ],
      previewGraphic: (
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 space-y-2.5 text-xs w-full max-w-sm">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-800">Confirmed Booking</span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Paid $150</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            <span>Tue, Oct 14 · 2:00 PM – 2:30 PM</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Google Meet link auto-generated</span>
          </div>
        </div>
      )
    },
    {
      id: 'prep',
      stepNumber: '02',
      title: 'Prep',
      restingDescription: 'Never walk into a meeting cold.',
      activeParagraph: "Before the meeting, get all of the info you need in one place. Callie reviews your client's contact history and helps you show up prepared.",
      items: [
        { text: 'Contact details automatically update', product: 'contacts', color: '#F8961F' },
        { text: 'Your client interactions are in one place', product: 'contacts', color: '#F8961F' },
        { text: 'Callie helps you prep', product: 'callie', color: '#DBEE9F' }
      ],
      previewGraphic: (
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 space-y-2.5 text-xs w-full max-w-sm">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-800">Client Brief: David Miller</span>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">3 Prior Calls</span>
          </div>
          <p className="text-[11px] text-slate-600">
            "Key goal: Review enterprise security terms. Last action item: Sent SOC 2 report on Sept 18th."
          </p>
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Callie generated meeting brief</span>
          </div>
        </div>
      )
    },
    {
      id: 'capture',
      stepNumber: '03',
      title: 'Capture',
      restingDescription: 'Focus on the conversation. Notetaker handles the notes.',
      activeParagraph: 'While you run the meeting, Notetaker captures the conversation. The recap and action items are delivered right after the call.',
      items: [
        { text: 'Notetaker joins and takes notes', product: 'notetaker', color: '#B89FFA' },
        { text: 'You get a ready-to-share recap', product: 'notetaker', color: '#B89FFA' },
        { text: 'Recap is stored in contact profile', product: 'contacts', color: '#F8961F' }
      ],
      previewGraphic: (
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 space-y-2.5 text-xs w-full max-w-sm">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-800">Live Notetaker Active</span>
            <span className="flex items-center gap-1 text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
              Recording
            </span>
          </div>
          <div className="space-y-1.5">
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="w-3/4 h-full bg-purple-500 rounded-full" />
            </div>
            <p className="text-[11px] text-slate-600">
              Capturing: "Budget approved for 50 team seats. Implementation kickoff targeted for Nov 1st."
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'followup',
      stepNumber: '04',
      title: 'Follow up',
      restingDescription: 'Work moves forward after the meeting ends.',
      activeParagraph: 'Review a pre-drafted email based on the recap, add an additional invoice link if needed, and add Callie to the email to handle scheduling.',
      items: [
        { text: 'Notetaker drafts a follow-up email', product: 'notetaker', color: '#B89FFA' },
        { text: 'Callie finds time for the next call', product: 'callie', color: '#DBEE9F' },
        { text: 'Client pays via custom invoice', product: 'payments', color: '#5DDFD7' }
      ],
      previewGraphic: (
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 space-y-2.5 text-xs w-full max-w-sm">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-800">Drafted Follow-Up</span>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">Ready to send</span>
          </div>
          <p className="text-[11px] text-slate-600">
            "Hi David, great speaking today. Attached are the 3 action items agreed upon, along with next steps kickoff link."
          </p>
          <div className="flex items-center gap-2 text-[11px] text-emerald-700 font-bold">
            <CreditCard className="w-3.5 h-3.5" />
            <span>$400 invoice link attached</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="flex w-full justify-center p-2 sm:p-4 lg:p-6 bg-[#FAF7F2]">
      <div className="relative flex flex-col items-center w-full max-w-[1500px] overflow-clip rounded-3xl bg-[#F6F3EE] border border-stone-200/70 py-16 px-4 sm:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60 mb-3">
            AI meeting management
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-[3.25rem] text-[#071A31] font-normal leading-tight tracking-tight">
            Built for people whose work runs on meetings
          </h2>
          <p className="font-heading text-base sm:text-lg text-slate-600 mt-4 max-w-2xl leading-relaxed">
            Meetings move you forward, but the work around them can slow you down. elev handles the tasks before, during, and after meetings, so you have more space for what matters.
          </p>
          <button
            onClick={() => onOpenAuth('signup')}
            className="mt-6 bg-[#071A31] hover:bg-[#112D4E] text-white font-semibold text-sm px-6 py-2.5 rounded-full shadow-sm transition-all cursor-pointer"
          >
            Start for free
          </button>
        </div>

        {/* 4 Connected Cards Deck */}
        <div className="w-full max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
            {cards.map((card, idx) => {
              const isActive = activeCard === idx;
              return (
                <div
                  key={card.id}
                  onClick={() => setActiveCard(idx)}
                  className={`group relative flex flex-col justify-between rounded-3xl p-6 transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-white shadow-xl ring-2 ring-blue-500/20 z-10'
                      : 'bg-white/70 hover:bg-white border border-stone-200/70 shadow-xs'
                  }`}
                >
                  {/* Top card header */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold font-mono text-slate-400">
                        {card.stepNumber}
                      </span>
                      {isActive && (
                        <span className="text-[10px] font-extrabold uppercase tracking-wider bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                          Active Stage
                        </span>
                      )}
                    </div>

                    <h3 className="font-editorial text-2xl font-normal text-[#071A31] mb-2">
                      {card.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed min-h-[38px]">
                      {isActive ? card.activeParagraph : card.restingDescription}
                    </p>

                    {/* Step pills with vertical connector lines */}
                    <div className="mt-5 space-y-2">
                      {card.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="flex items-center gap-2.5">
                          <div
                            className="w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 border border-slate-300 shadow-2xs"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className={`text-[11px] font-medium leading-tight ${isActive ? 'text-slate-800' : 'text-slate-500'}`}>
                            {item.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Graphic preview on bottom */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center">
                    {card.previewGraphic}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Connected timeline indicator dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {cards.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => setActiveCard(dotIdx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  activeCard === dotIdx ? 'w-8 bg-blue-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to stage ${dotIdx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
