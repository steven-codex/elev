import { ArrowRight } from 'lucide-react';
import OrbitalMotionStage from './OrbitalMotionStage';

interface ConversionMarqueeProps {
  onOpenAuth: (mode: 'signup') => void;
}

export default function ConversionMarquee({ onOpenAuth }: ConversionMarqueeProps) {
  return (
    <section className="py-24 lg:py-32 bg-[#F8FAFC] border-t border-[#E2E8F0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E2E8F0] shadow-2xs mb-4">
          <span className="w-2 h-2 rounded-full bg-[#0055FF] animate-pulse" />
          <span className="text-[11px] font-normal uppercase tracking-widest text-[#0A0D14]">
            Instant Onboarding
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-normal leading-tight tracking-tight text-[#0A0D14] text-balance">
          From the first meeting <span className="font-editorial italic font-normal text-[#0055FF]">to the follow-up</span>
        </h2>
        <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed max-w-2xl mx-auto text-pretty">
          All of the work around meetings, handled in one place. Book time, capture every discussion, and keep next steps moving without the manual work.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 mb-12 sm:mb-14">
          <button
            onClick={() => onOpenAuth('signup')}
            className="w-full sm:w-auto bg-gradient-to-r from-[#418AC1] to-[#506DFD] hover:brightness-105 active:scale-[0.96] text-white font-normal text-sm px-8 py-3 rounded-full shadow-xs hover:shadow-md hover:shadow-blue-500/20 transition-[transform,box-shadow,filter] duration-150 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Start for free</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Dedicated Orbital Motion Stage (#root > div > main > section:nth-child(7) centerpiece) */}
        <div className="max-w-4xl mx-auto">
          <OrbitalMotionStage />
        </div>
      </div>
    </section>
  );
}
