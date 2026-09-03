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
    <section id="roi" className="py-20 lg:py-28 bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Sliders */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 bg-blue-950/80 px-3 py-1.5 rounded-full border border-blue-800 mb-3">
                <Calculator className="w-3.5 h-3.5" />
                <span>Interactive Productivity ROI Estimator</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Calculate the real value of automated scheduling
              </h2>
              <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
                See how much focused productive time your sales, recruiting, and customer success teams reclaim when email ping-pong is removed.
              </p>
            </div>

            {/* Slider 1: Team Size */}
            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/80 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-slate-200">How many team members book meetings?</span>
                <span className="font-extrabold text-blue-400 text-lg bg-blue-950 px-3 py-1 rounded-xl border border-blue-800">
                  {teamSize} people
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>1 member</span>
                <span>50 members</span>
                <span>100+ members</span>
              </div>
            </div>

            {/* Slider 2: Meetings Per Week */}
            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/80 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-slate-200">Average meetings booked per person/week:</span>
                <span className="font-extrabold text-blue-400 text-lg bg-blue-950 px-3 py-1 rounded-xl border border-blue-800">
                  {meetingsPerWeek} meetings
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="30"
                value={meetingsPerWeek}
                onChange={(e) => setMeetingsPerWeek(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>2 meetings</span>
                <span>15 meetings</span>
                <span>30 meetings</span>
              </div>
            </div>
          </div>

          {/* Right Column: Calculated Results Display */}
          <div className="lg:col-span-6 bg-slate-800/90 rounded-3xl p-8 sm:p-10 border border-slate-700 shadow-2xl relative">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6 flex items-center justify-between">
              <span>Your Estimated Annual Returns</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                High ROI Impact
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-700">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span>Annual Team Time Saved</span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white">
                  {annualHoursSaved.toLocaleString()} <span className="text-sm font-semibold text-slate-400">hours</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  ~{hoursSavedPerRepMonthly} hours saved per employee every month
                </p>
              </div>

              <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-700">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-2">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span>Productivity Value Reclaimed</span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400">
                  ${estimatedAnnualSavings.toLocaleString()}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Based on $60/hr average loaded salary benchmark
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-950/60 border border-blue-900/80 mb-6 text-xs text-blue-200 flex items-center justify-between">
              <span>Average inbound lead conversion acceleration:</span>
              <span className="font-extrabold text-white text-sm">+320% faster</span>
            </div>

            <button
              onClick={() => onOpenAuth('signup')}
              className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold text-sm py-4 px-6 rounded-full shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Unlock these savings with elev free trial</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
