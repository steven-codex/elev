import { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Calendar,
  FileText,
  CreditCard,
  Check
} from 'lucide-react';

interface ConversionMarqueeProps {
  onOpenAuth: (mode: 'signup') => void;
}

export default function ConversionMarquee({ onOpenAuth }: ConversionMarqueeProps) {
  const cards = [
    {
      product: 'Callie',
      label1: 'Discovery',
      label2: 'Scheduled',
      tagColor: '#DBEE9F',
      tagText: 'Callie AI',
      icon: <Sparkles className="w-4 h-4 text-[#071A31]" />,
      detail: 'Free-slot coordination email approved by client'
    },
    {
      product: 'Notetaker',
      label1: 'Meeting',
      label2: 'Summarized',
      tagColor: '#B89FFA',
      tagText: 'Notetaker',
      icon: <FileText className="w-4 h-4 text-[#071A31]" />,
      detail: '3 action items extracted and dispatched to Slack'
    },
    {
      product: 'Scheduling',
      label1: 'Interview',
      label2: 'Booked',
      tagColor: '#6BB1FF',
      tagText: 'Scheduling',
      icon: <Calendar className="w-4 h-4 text-[#071A31]" />,
      detail: 'Round-robin assigned to Lead Engineer in 4 seconds'
    },
    {
      product: 'Payments',
      label1: 'Payment',
      label2: 'Received',
      tagColor: '#5DDFD7',
      tagText: 'Payments',
      icon: <CreditCard className="w-4 h-4 text-[#071A31]" />,
      detail: '$150 upfront consultation fee settled via Stripe'
    }
  ];

  return (
    <section className="py-24 bg-white border-t border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60 mb-3 inline-block">
          Get started
        </span>
        <h2 className="font-editorial text-3xl sm:text-5xl lg:text-[3.5rem] text-[#071A31] font-normal leading-tight tracking-tight">
          From the first meeting to the follow-up
        </h2>
        <p className="font-heading text-base sm:text-lg text-slate-600 mt-4 leading-relaxed max-w-2xl mx-auto">
          All of the work around meetings, handled in one place. Book time, capture every discussion, and keep next steps moving without the manual work.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => onOpenAuth('signup')}
            className="w-full sm:w-auto bg-[#071A31] hover:bg-[#112D4E] text-white font-semibold text-sm px-8 py-3 rounded-full shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Start for free</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Marquee Row */}
      <div className="relative w-full overflow-hidden">
        <div className="flex gap-4 w-max animate-marquee py-4 px-4">
          {[...cards, ...cards, ...cards].map((card, i) => (
            <div
              key={i}
              className="w-[280px] sm:w-[320px] bg-[#FAF8F5] hover:bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs hover:shadow-md transition-all shrink-0 text-left flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center shadow-2xs"
                    style={{ backgroundColor: card.tagColor }}
                  >
                    {card.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-white px-2 py-0.5 rounded-full border border-stone-200">
                    {card.tagText}
                  </span>
                </div>

                <div className="space-y-0.5 mb-3">
                  <span className="font-heading text-xl font-bold text-[#071A31] block leading-tight">
                    {card.label1}
                  </span>
                  <span className="font-editorial text-2xl text-[#071A31] block leading-tight">
                    {card.label2}
                  </span>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  {card.detail}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-200/60 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                <Check className="w-3.5 h-3.5" />
                <span>Automated by elev</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
