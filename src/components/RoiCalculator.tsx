import { useState } from 'react';
import { Calculator, ArrowRight, DollarSign, Clock, TrendingUp } from 'lucide-react';

interface RoiCalculatorProps {
  onOpenAuth: (mode: 'signup') => void;
}

export default function RoiCalculator({ onOpenAuth }: RoiCalculatorProps) {
  const [teamSize, setTeamSize] = useState(15);
  const [meetingsPerWeek, setMeetingsPerWeek] = useState(8);

  // Math: Average 15 mins saved per scheduled meeting by eliminating email ping-pong & rescheduling
  // (15 mins * meetingsPerWeek * teamSize * 50 weeks) / 60 = hours saved per year
  const hoursSavedPerMeeting = 0.25; // 15 mins
  const totalAnnualMeetings = teamSize * meetingsPerWeek * 50;
  const annualHoursSaved = Math.round(totalAnnualMeetings * hoursSavedPerMeeting);
  
  // Assuming average hourly knowledge worker cost of $60/hr
  const estimatedAnnualSavings = annualHoursSaved * 60;
  const hoursSavedPerRepMonthly = Math.round((meetingsPerWeek * hoursSavedPerMeeting * 50) / 12);

  return (
    <section id="roi" className="py-24 lg:py-32 bg-white border-t border-[#E2E8F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Sliders */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E2E8F0] shadow-2xs mb-4">
                <span className="w-2 h-2 rounded-full bg-[#0055FF] animate-pulse" />
                <span className="text-[11px] font-normal uppercase tracking-widest text-[#0A0D14]">
                  Productivity ROI Estimator
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[3.25rem] text-[#0A0D14] font-normal leading-[1.08] tracking-tight">
                Calculate the real value <span className="font-instrument italic font-normal bg-gradient-to-r from-[#418AC1] to-[#506DFD] bg-clip-text text-transparent inline-block pr-1">of automated scheduling</span>
              </h2>
              <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl">
                See how much focused productive time your sales, recruiting, and customer success teams reclaim when email ping-pong is eliminated.
              </p>
            </div>

            {/* Slider 1: Team Size */}
            <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-[#E2E8F0] space-y-3 shadow-2xs">
              <div className="flex items-center justify-between text-sm">
                <span className="font-normal text-slate-700">Team members booking meetings:</span>
                <span className="font-normal text-[#0055FF] text-sm bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60 tabular-nums">
                  {teamSize} people
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0055FF]"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>1 member</span>
                <span>50 members</span>
                <span>100+ members</span>
              </div>
            </div>

            {/* Slider 2: Meetings Per Week */}
            <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-[#E2E8F0] space-y-3 shadow-2xs">
              <div className="flex items-center justify-between text-sm">
                <span className="font-normal text-slate-700">Average weekly meetings per person:</span>
                <span className="font-normal text-[#0055FF] text-sm bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60 tabular-nums">
                  {meetingsPerWeek} meetings
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="30"
                value={meetingsPerWeek}
                onChange={(e) => setMeetingsPerWeek(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0055FF]"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>2 meetings</span>
                <span>15 meetings</span>
                <span>30 meetings</span>
              </div>
            </div>
          </div>

          {/* Right Column: Calculated Results Display */}
          <div className="lg:col-span-6 bg-[#F8FAFC] rounded-2xl p-8 sm:p-10 border border-[#E2E8F0] shadow-sm relative">
            <div className="text-xs font-normal uppercase tracking-wider text-slate-500 mb-6 flex items-center justify-between">
              <span>Estimated Annual Impact</span>
              <span className="text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full font-normal text-[11px] flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-emerald-600" />
                High ROI Impact
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
              <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-2xs">
                <div className="flex items-center gap-2 text-slate-500 text-xs mb-2">
                  <Clock className="w-4 h-4 text-[#0055FF]" />
                  <span>Annual Time Saved</span>
                </div>
                <div className="text-3xl sm:text-4xl font-normal text-[#0A0D14] tracking-tight tabular-nums">
                  {annualHoursSaved.toLocaleString()} <span className="text-sm font-normal text-slate-500">hrs</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  ~{hoursSavedPerRepMonthly} hrs saved / employee / month
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-2xs">
                <div className="flex items-center gap-2 text-slate-500 text-xs mb-2">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  <span>Value Reclaimed</span>
                </div>
                <div className="text-3xl sm:text-4xl font-normal text-emerald-600 tracking-tight tabular-nums">
                  ${estimatedAnnualSavings.toLocaleString()}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Based on $60/hr industry benchmark
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] mb-6 text-xs text-blue-900 flex items-center justify-between">
              <span className="font-normal">Average lead conversion acceleration:</span>
              <span className="font-normal text-[#0055FF]">+320% faster</span>
            </div>

            <button
              onClick={() => onOpenAuth('signup')}
              className="w-full bg-gradient-to-r from-[#418AC1] to-[#506DFD] hover:brightness-105 active:scale-[0.96] text-white font-normal text-sm py-3.5 px-6 rounded-full shadow-xs hover:shadow-md hover:shadow-blue-500/20 transition-[transform,box-shadow,filter] duration-150 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Unlock these savings with elev</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
