import { useState } from 'react';
import { Volume2, ArrowRight, X } from 'lucide-react';

interface NoticeBannerProps {
  onOpenDemo: () => void;
}

export default function NoticeBanner({ onOpenDemo }: NoticeBannerProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-[#EBF3FE] text-[#071A31] text-xs sm:text-[13px] py-2 px-4 relative z-50 border-b border-[#D5E5FC] transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1 flex items-center justify-center gap-2.5 flex-wrap text-center">
          <div className="flex items-center gap-1.5 font-medium">
            <Volume2 className="w-3.5 h-3.5 text-[#2E7DD7] shrink-0" />
            <span className="text-[#071A31] font-medium">
              Introducing the new elev, built to handle all of the work around meetings.
            </span>
          </div>
          <button
            onClick={onOpenDemo}
            className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white text-[#071A31] border border-[#CBDFF9] shadow-2xs hover:bg-[#F5F9FF] transition-colors cursor-pointer"
          >
            <span>Learn more</span>
            <ArrowRight className="w-3 h-3 text-[#2E7DD7]" />
          </button>
        </div>
        <button
          onClick={() => setVisible(false)}
          aria-label="Dismiss announcement"
          className="text-slate-400 hover:text-slate-700 p-1 rounded-sm transition-colors ml-2 cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
