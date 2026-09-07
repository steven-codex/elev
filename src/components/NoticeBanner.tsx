import { useState } from 'react';
import { Volume2, ArrowRight, X, Sparkles } from 'lucide-react';

interface NoticeBannerProps {
  onOpenDemo: () => void;
}

export default function NoticeBanner({ onOpenDemo }: NoticeBannerProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-[#EFF6FF] text-[#0A0D14] text-xs sm:text-[13px] py-2 px-4 relative z-50 border-b border-[#BFDBFE] transition-[background-color,border-color] duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1 flex items-center justify-center gap-2.5 flex-wrap text-center">
          <div className="flex items-center gap-1.5 font-medium">
            <Volume2 className="w-3.5 h-3.5 text-[#0055FF] shrink-0" />
            <span className="text-[#0A0D14] font-medium">
              Introducing elev <span className="tabular-nums font-semibold">2.4</span> — built to handle all of the work around meetings.
            </span>
          </div>
          
          <a
            href="/motion-clip.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-0.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-2xs hover:shadow-xs active:scale-[0.96] transition-[background-color,transform,box-shadow] duration-150 cursor-pointer group"
          >
            <Sparkles className="w-3 h-3 text-amber-300 group-hover:rotate-12 transition-transform duration-200" />
            <span>Watch Motion Clip</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-150" />
          </a>

          <button
            onClick={onOpenDemo}
            className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white hover:bg-slate-50 text-[#0A0D14] border border-[#BFDBFE] shadow-2xs active:scale-[0.96] transition-[background-color,transform,border-color] duration-150 cursor-pointer group"
          >
            <span>Explore updates</span>
            <ArrowRight className="w-3 h-3 text-[#0055FF] group-hover:translate-x-0.5 transition-transform duration-150" />
          </button>
        </div>

        <button
          onClick={() => setVisible(false)}
          aria-label="Dismiss announcement"
          className="text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-white/60 active:scale-[0.96] transition-[color,background-color,transform] duration-150 ml-2 cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
