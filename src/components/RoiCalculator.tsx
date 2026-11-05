import { useState, type CSSProperties } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useLang } from '../i18n';
import { ROI, SITE } from '../data/landingData';

// Share of repetitive work assumed automatable (00 §9). Fixed by the formula, not a user input.
const AUTOMATABLE_SHARE = 0.6;

// Feeds `.roi-range`, which paints the accent fill up to the thumb.
const sliderFill = (value: number, min: number, max: number) =>
  ({ '--roi-fill': `${((value - min) / (max - min)) * 100}%` }) as CSSProperties;

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
    <section id="roi" className="py-16 sm:py-24 lg:py-24 bg-white border-t border-[#E2E8F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Sliders */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-h2 lg:text-h2-lg text-ink font-medium text-balance">
              {t(ROI.heading)}
            </h2>

            {/* Slider 1: People */}
            <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-[#E2E8F0] space-y-3 shadow-2xs">
              <div className="flex items-center justify-between text-sm">
                <label htmlFor="roi-people" className="font-medium text-ink-secondary">
                  {t(ROI.inputs.people.label)}
                </label>
                <span className="font-normal text-accent text-sm bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60 tabular-nums">
                  {people}
                </span>
              </div>
              <input
                id="roi-people"
                type="range"
                min={ROI.inputs.people.min}
                max={ROI.inputs.people.max}
                value={people}
                aria-valuetext={String(people)}
                onChange={(e) => setPeople(Number(e.target.value))}
                style={sliderFill(people, ROI.inputs.people.min, ROI.inputs.people.max)}
                className="roi-range"
              />
              <div className="flex justify-between text-[11px] text-ink-tertiary font-mono tabular-nums">
                <span>{ROI.inputs.people.min}</span>
                <span>{ROI.inputs.people.max}</span>
              </div>
            </div>

            {/* Slider 2: Hours per person per week */}
            <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-[#E2E8F0] space-y-3 shadow-2xs">
              <div className="flex items-center justify-between text-sm">
                <label htmlFor="roi-hours" className="font-medium text-ink-secondary">
                  {t(ROI.inputs.hours.label)}
                </label>
                <span className="font-normal text-accent text-sm bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60 tabular-nums">
                  {hours}
                </span>
              </div>
              <input
                id="roi-hours"
                type="range"
                min={ROI.inputs.hours.min}
                max={ROI.inputs.hours.max}
                value={hours}
                aria-valuetext={String(hours)}
                onChange={(e) => setHours(Number(e.target.value))}
                style={sliderFill(hours, ROI.inputs.hours.min, ROI.inputs.hours.max)}
                className="roi-range"
              />
              <div className="flex justify-between text-[11px] text-ink-tertiary font-mono tabular-nums">
                <span>{ROI.inputs.hours.min}</span>
                <span>{ROI.inputs.hours.max}</span>
              </div>
            </div>

            {/* Slider 3: Average monthly salary */}
            <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-[#E2E8F0] space-y-3 shadow-2xs">
              <div className="flex items-center justify-between text-sm">
                <label htmlFor="roi-salary" className="font-medium text-ink-secondary">
                  {t(ROI.inputs.salary.label)}
                </label>
                <span className="font-normal text-accent text-sm bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60 tabular-nums">
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
                aria-valuetext={money.format(salary)}
                onChange={(e) => setSalary(Number(e.target.value))}
                style={sliderFill(salary, salaryRange.min, salaryRange.max)}
                className="roi-range"
              />
              <div className="flex justify-between text-[11px] text-ink-tertiary font-mono tabular-nums">
                <span>{money.format(salaryRange.min)}</span>
                <span>{money.format(salaryRange.max)}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Calculated Results Display */}
          <div className="lg:col-span-6 bg-[#F8FAFC] rounded-2xl p-8 sm:p-10 border border-[#E2E8F0] shadow-sm relative">
            {/* Yearly savings leads as the one large number */}
            <div className="text-caption text-ink-tertiary">{t(ROI.outputs.savings)}</div>
            <div className="mt-2 text-display font-semibold text-ink tabular-nums break-words">
              {money.format(costPerYear)}
            </div>

            {/* Secondary row: hours freed and the monthly equivalent */}
            <div className="mt-8 grid grid-cols-2 gap-5 pt-6 border-t border-[#E2E8F0]">
              <div>
                <div className="text-caption text-ink-tertiary">{t(ROI.outputs.hours)}</div>
                <div className="mt-1.5 text-h3 font-semibold text-ink tabular-nums">
                  {hoursPerYear.toLocaleString(locale)}
                </div>
              </div>
              <p className="self-end text-body-sm text-ink-secondary tabular-nums">
                {t(ROI.outputs.perMonth).replace('{x}', money.format(costPerMonth))}
              </p>
            </div>

            {/* Formula and assumption, collapsed behind a disclosure */}
            <details className="group mt-6 text-caption text-ink-tertiary">
              <summary className="flex items-center justify-between gap-3 cursor-pointer list-none select-none rounded-md text-ink-secondary hover:text-ink [&::-webkit-details-marker]:hidden">
                <span>{t(ROI.howWeCalculate)}</span>
                <ChevronDown className="w-4 h-4 shrink-0 transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <div className="mt-3 space-y-1.5 leading-relaxed font-mono break-words">
                <p>{ROI.formula.hours}</p>
                <p>{ROI.formula.cost}</p>
                <p className="font-sans">{t(ROI.assumption)}</p>
              </div>
            </details>

            <div className="mt-8">
              <a
                href={SITE.whatsapp(prefill)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-[#2F6BEA] to-[#0055FF] hover:brightness-105 active:scale-[0.96] text-white font-medium text-sm py-3.5 px-6 rounded-full shadow-xs hover:shadow-md hover:shadow-blue-500/20 transition-[transform,box-shadow,filter] duration-150 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t(ROI.cta)}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
