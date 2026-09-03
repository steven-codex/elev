import { useState } from 'react';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { BorderBeam } from 'border-beam';
import { PRICING_PLANS } from '../data/landingData';

interface PricingSectionProps {
  onOpenAuth: (mode: 'signup') => void;
  onOpenDemo: () => void;
}

export default function PricingSection({ onOpenAuth, onOpenDemo }: PricingSectionProps) {
  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual');

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Pick the plan that fits your growth
          </h2>
          <p className="mt-3.5 text-base sm:text-lg text-slate-600">
            Start free, scale with your team. All paid plans include a 14-day free trial. No credit card required.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="mt-8 inline-flex items-center p-1 bg-slate-100 rounded-full border border-slate-200">
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                billingCycle === 'annual'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Billed annually</span>
              <span className="ml-2 text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Billed monthly
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
            const isTeams = plan.id === 'teams';

            const cardBody = (
              <div
                className={`rounded-3xl p-7 flex flex-col justify-between transition-all relative h-full ${
                  isTeams
                    ? 'bg-white border-2 border-blue-600 shadow-xl shadow-blue-100/50 ring-1 ring-blue-600'
                    : 'bg-white border border-slate-200/90 shadow-xs hover:shadow-md'
                }`}
              >
                {isTeams && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full shadow-xs flex items-center gap-1 z-10">
                    <Sparkles className="w-3 h-3" />
                    <span>Most Popular</span>
                  </div>
                )}

                <div>
                  <div className="mb-4">
                    <h3 className="text-xl font-extrabold text-slate-900">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 min-h-[32px]">
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="py-4 border-y border-slate-100 mb-6">
                    {plan.id === 'enterprise' ? (
                      <div>
                        <span className="text-2xl font-black text-slate-900">Custom</span>
                        <div className="text-[11px] text-slate-500 mt-1 font-medium">Contact our team for 30+ seats</div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-black text-slate-900 tracking-tight">
                            ${price}
                          </span>
                          <span className="text-xs text-slate-500 font-semibold">
                            /seat/mo
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1">
                          {price === 0 ? 'Free forever' : billingCycle === 'annual' ? 'Billed annually' : 'Billed monthly'}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Button */}
                  <button
                    onClick={() => {
                      if (plan.id === 'enterprise') onOpenDemo();
                      else onOpenAuth('signup');
                    }}
                    className={`w-full py-3 px-4 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer mb-6 ${
                      isTeams
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                        : plan.ctaVariant === 'secondary'
                        ? 'bg-slate-900 hover:bg-black text-white'
                        : 'border border-slate-300 text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {/* Checklist */}
                  <div className="space-y-3">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Included in {plan.name}:
                    </span>
                    <ul className="space-y-2.5">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className={idx === 0 && isTeams ? 'font-bold text-slate-900' : ''}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 text-[11px] text-slate-400 text-center">
                  {plan.id === 'free' ? 'No credit card needed' : '14-day free trial'}
                </div>
              </div>
            );

            if (isTeams) {
              return (
                <div key={plan.id} className="h-full flex flex-col relative">
                  <BorderBeam
                    size="md"
                    colorVariant="ocean"
                    strength={0.8}
                    theme="light"
                    borderRadius={24}
                    className="h-full w-full"
                  >
                    {cardBody}
                  </BorderBeam>
                </div>
              );
            }

            return (
              <div key={plan.id} className="h-full flex flex-col">
                {cardBody}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
