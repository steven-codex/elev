import { ArrowRight, Check } from 'lucide-react';
import OrbitalMotionStage from './OrbitalMotionStage';

interface ConversionMarqueeProps {
  onOpenAuth: (mode: 'signup') => void;
}

export default function ConversionMarquee({ onOpenAuth }: ConversionMarqueeProps) {
  const cards = [
    {
      product: 'Velie',
      label1: 'Discovery',
      label2: 'Scheduled',
      tagColor: '#DBEE9F',
      tagText: 'Velie AI',
      icon3d: '/icon-velie-3d.png',
      detail: 'Free-slot coordination email approved by client'
    },
    {
      product: 'Notetaker',
      label1: 'Meeting',
      label2: 'Summarized',
      tagColor: '#B89FFA',
      tagText: 'Notetaker',
      icon3d: '/icon-notetaker-3d.png',
      detail: '3 action items extracted and dispatched to Slack'
    },
    {
      product: 'Scheduling',
      label1: 'Interview',
      label2: 'Booked',
      tagColor: '#6BB1FF',
      tagText: 'Scheduling',
      icon3d: '/icon-scheduling-3d.png',
      detail: 'Round-robin assigned to Lead Engineer in 4 seconds'
    },
    {
      product: 'Payments',
      label1: 'Payment',
      label2: 'Received',
      tagColor: '#5DDFD7',
      tagText: 'Payments',
      icon3d: '/icon-payments-3d.png',
      detail: '$150 upfront consultation fee settled via Stripe'
    }
  ];

  return (
    <section className="py-24 lg:py-32 bg-[#F8FAFC] border-t border-[#E2E8F0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E2E8F0] shadow-2xs mb-4">
          <span className="w-2 h-2 rounded-full bg-[#0055FF] animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#0A0D14]">
            Instant Onboarding
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-bold leading-tight tracking-tight text-[#0A0D14] text-balance">
          From the first meeting <span className="font-editorial italic font-normal text-[#0055FF]">to the follow-up</span>
        </h2>
        <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed max-w-2xl mx-auto text-pretty">
          All of the work around meetings, handled in one place. Book time, capture every discussion, and keep next steps moving without the manual work.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 mb-12 sm:mb-14">
          <button
            onClick={() => onOpenAuth('signup')}
            className="w-full sm:w-auto bg-[#0055FF] hover:bg-[#0047D6] text-white font-semibold text-sm px-8 py-3 rounded-full shadow-xs hover:shadow-md active:scale-[0.96] transition-[background-color,box-shadow,transform] duration-150 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Start for free</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Dedicated Orbital Motion Stage (#root > div > main > section:nth-child(7) centerpiece) */}
        <div className="max-w-4xl mx-auto mb-14 sm:mb-18">
          <OrbitalMotionStage />
        </div>
      </div>

      {/* Marquee Row */}
      <div className="relative w-full overflow-hidden">
        <div className="flex gap-4 w-max animate-marquee py-4 px-4">
          {[...cards, ...cards, ...cards].map((card, i) => (
            <div
              key={i}
              className="w-[280px] sm:w-[320px] bg-white hover:border-blue-400 rounded-2xl p-6 border border-[#E2E8F0] shadow-xs hover:shadow-md transition-all shrink-0 text-left flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <img
                    src={card.icon3d}
                    alt={card.label1}
                    className="w-9 h-9 object-contain drop-shadow-xs group-hover:scale-110 transition-transform duration-200 shrink-0 pointer-events-none"
                  />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-white px-2 py-0.5 rounded-full border border-[#E2E8F0]">
                    {card.tagText}
                  </span>
                </div>

                <div className="space-y-0.5 mb-3">
                  <span className="text-xl font-bold text-[#0A0D14] block leading-tight">
                    {card.label1}
                  </span>
                  <span className="font-editorial text-2xl text-[#0A0D14] block leading-tight">
                    {card.label2}
                  </span>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  {card.detail}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#E2E8F0]/60 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
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
