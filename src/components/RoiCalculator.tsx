import { useState } from 'react';
import { ArrowRight, Clock, DollarSign } from 'lucide-react';
import { useLang } from '../i18n';
import { ROI, SITE } from '../data/landingData';

// Share of repetitive work assumed automatable (00 §9). Fixed by the formula, not a user input.
const AUTOMATABLE_SHARE = 0.6;

export default function RoiCalculator() {
  const { lang, t } = useLang();
  const salaryRange = ROI.inputs.salary.range[lang];
  const locale = lang === 'id' ? 'id-ID' : 'en-US';

  const [people, setPeople] = useState<number>(ROI.inputs.people.default);
  const [hours, setHours] = useState<number>(ROI.inputs.hours.default);
  const [salary, setSalary] = useState<number>(salaryRange.default);
  const [salaryLang, setSalaryLang] = useState(lang);

  // Switching language resets the salary to that language's default (USD or IDR).
  if (salaryLang !== lang) {
    setSalaryLang(lang);
    setSalary(salaryRange.default);
  }

  const money = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: lang === 'id' ? 'IDR' : 'USD',
    maximumFractionDigits: 0,
  });

  const hoursPerYear = Math.round(people * hours * 52 * AUTOMATABLE_SHARE);
  const costPerYear = Math.round(people * salary * 12 * (hours / 40) * AUTOMATABLE_SHARE);
  const costPerMonth = Math.round(costPerYear / 12);

  const prefill = t(ROI.waPrefill)
    .replace('{cost}', money.format(costPerYear))
    .replace('{people}', String(people));

  return (
    <section id="roi" className="py-24 lg:py-32 bg-white border-t border-[#E2E8F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Sliders */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-[3.25rem] text-[#0A0D14] font-normal leading-[1.08] tracking-tight text-balance">
              {t(ROI.heading)}
            </h2>

            {/* Slider 1: People */}
            <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-[#E2E8F0] space-y-3 shadow-2xs">
              <div className="flex items-center justify-between text-sm">
                <label htmlFor="roi-people" className="font-normal text-slate-700">
                  {t(ROI.inputs.people.label)}
                </label>
                <span className="font-normal text-[#0055FF] text-sm bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60 tabular-nums">
                  {people}
                </span>
              </div>
              <input
                id="roi-people"
                type="range"
                min={ROI.inputs.people.min}
                max={ROI.inputs.people.max}
                value={people}
                onChange={(e) => setPeople(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0055FF]"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono tabular-nums">
                <span>{ROI.inputs.people.min}</span>
                <span>{ROI.inputs.people.max}</span>
              </div>
            </div>

            {/* Slider 2: Hours per person per week */}
            <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-[#E2E8F0] space-y-3 shadow-2xs">
              <div className="flex items-center justify-between text-sm">
                <label htmlFor="roi-hours" className="font-normal text-slate-700">
                  {t(ROI.inputs.hours.label)}
                </label>
                <span className="font-normal text-[#0055FF] text-sm bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60 tabular-nums">
                  {hours}
                </span>
              </div>
              <input
                id="roi-hours"
                type="range"
                min={ROI.inputs.hours.min}
                max={ROI.inputs.hours.max}
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0055FF]"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono tabular-nums">
                <span>{ROI.inputs.hours.min}</span>
                <span>{ROI.inputs.hours.max}</span>
              </div>
            </div>

            {/* Slider 3: Average monthly salary */}
            <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-[#E2E8F0] space-y-3 shadow-2xs">
              <div className="flex items-center justify-between text-sm">
                <label htmlFor="roi-salary" className="font-normal text-slate-700">
                  {t(ROI.inputs.salary.label)}
                </label>
                <span className="font-normal text-[#0055FF] text-sm bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60 tabular-nums">
                  {money.format(salary)}
                </span>
              </div>
              <input
                id="roi-salary"
                type="range"
                min={salaryRange.min}
                max={salaryRange.max}
                step={salaryRange.step}
                value={salary}
                onChange={(e) => setSalary(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0055FF]"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono tabular-nums">
                <span>{money.format(salaryRange.min)}</span>
                <span>{money.format(salaryRange.max)}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Calculated Results Display */}
          <div className="lg:col-span-6 bg-[#F8FAFC] rounded-2xl p-8 sm:p-10 border border-[#E2E8F0] shadow-sm relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
              <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-2xs">
                <div className="flex items-center gap-2 text-slate-500 text-xs mb-2">
                  <Clock className="w-4 h-4 text-[#0055FF]" />
                  <span>{t(ROI.outputs.hours)}</span>
                </div>
                <div className="text-3xl sm:text-4xl font-normal text-[#0A0D14] tracking-tight tabular-nums">
                  {hoursPerYear.toLocaleString(locale)}
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-2xs">
                <div className="flex items-center gap-2 text-slate-500 text-xs mb-2">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  <span>{t(ROI.outputs.savings)}</span>
                </div>
                <div className="text-3xl sm:text-4xl font-normal text-emerald-600 tracking-tight tabular-nums">
                  {money.format(costPerYear)}
                </div>
                <p className="text-[11px] text-slate-500 mt-1 tabular-nums">
                  {t(ROI.outputs.perMonth).replace('{x}', money.format(costPerMonth))}
                </p>
              </div>
            </div>

            {/* Formula and assumption, small grey text */}
            <div className="space-y-1.5 mb-6 text-[11px] leading-relaxed text-slate-500 font-mono break-words">
              <p>{ROI.formula.hours}</p>
              <p>{ROI.formula.cost}</p>
              <p className="font-sans">{t(ROI.assumption)}</p>
            </div>

            <a
              href={SITE.whatsapp(prefill)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-[#418AC1] to-[#506DFD] hover:brightness-105 active:scale-[0.96] text-white font-normal text-sm py-3.5 px-6 rounded-full shadow-xs hover:shadow-md hover:shadow-blue-500/20 transition-[transform,box-shadow,filter] duration-150 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{t(ROI.cta)}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
