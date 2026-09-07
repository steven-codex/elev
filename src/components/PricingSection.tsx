import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { PRICING_PLANS } from '../data/landingData';

interface PricingSectionProps {
  onOpenAuth: (mode: 'signup') => void;
  onOpenDemo: () => void;
}

export default function PricingSection({ onOpenAuth, onOpenDemo }: PricingSectionProps) {
  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual');

  return (
    <section id="pricing" className="py-24 lg:py-32 bg-[#F8FAFC] border-t border-[#E2E8F0] relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-blue-500/5 via-indigo-500/5 to-purple-500/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-[3.25rem] text-[#0A0D14] font-bold leading-[1.15] tracking-tight text-balance">
            Pick the plan that <span className="font-editorial italic font-normal text-[#0055FF]">fits your growth</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed text-pretty max-w-2xl mx-auto">
            Start free, scale with your team. All paid plans include a risk-free 14-day trial with zero credit card required.
          </p>

          {/* Micro-interactive Billing Cycle Toggle with Motion Physics */}
          <div className="mt-9 inline-flex items-center p-1.5 bg-slate-200/60 backdrop-blur-xl rounded-full border border-slate-300/70 shadow-inner relative">
            <button
              type="button"
              onClick={() => setBillingCycle('annual')}
              className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-colors duration-200 cursor-pointer active:scale-[0.96] flex items-center gap-2 z-10 ${
                billingCycle === 'annual' ? 'text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {billingCycle === 'annual' && (
                <motion.div
                  layoutId="activeBillingCyclePill"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  className="absolute inset-0 bg-[#0055FF] rounded-full shadow-sm -z-10"
                />
              )}
              <span>Billed annually</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors duration-200 ${
                billingCycle === 'annual'
                  ? 'bg-white/20 text-white backdrop-blur-xs'
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-300/60'
              }`}>
                Save 20%
              </span>
            </button>

            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-colors duration-200 cursor-pointer active:scale-[0.96] z-10 ${
                billingCycle === 'monthly' ? 'text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {billingCycle === 'monthly' && (
                <motion.div
                  layoutId="activeBillingCyclePill"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  className="absolute inset-0 bg-[#0055FF] rounded-full shadow-sm -z-10"
                />
              )}
              <span>Billed monthly</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid (4 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7 items-stretch mb-16">
          {PRICING_PLANS.map((plan) => {
            const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
            const isTeams = plan.id === 'teams';

            return (
              <div
                key={plan.id}
                className={`rounded-[28px] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative h-full group ${
                  isTeams
                    ? 'bg-white border-2 border-[#0055FF] shadow-[0_16px_48px_rgba(0,85,255,0.12)] md:-translate-y-2 z-10'
                    : 'bg-white/80 backdrop-blur-xl border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:border-slate-300'
                }`}
              >
                {/* Popular Pill Header Badge for Teams */}
                {isTeams && (
                  <div className="absolute top-0 right-7 -translate-y-1/2 bg-[#0055FF] text-white text-[10px] font-bold uppercase tracking-widest px-3.5 py-1 rounded-full shadow-md flex items-center gap-1 z-20">
                    <Sparkles className="w-3 h-3 fill-white" />
                    <span>Most Popular</span>
                  </div>
                )}

                <div>
                  {/* Plan Name & Description */}
                  <div className="mb-5">
                    <h3 className="text-xl font-bold text-[#0A0D14] tracking-tight">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1.5 min-h-[36px] leading-relaxed">
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Pricing Header */}
                  <div className="py-4 border-y border-slate-100 mb-6">
                    {plan.id === 'enterprise' ? (
                      <div>
                        <div className="text-3xl font-bold text-[#0A0D14] tracking-tight font-sans">
                          Custom
                        </div>
                        <div className="text-xs text-slate-500 mt-1 font-medium">
                          Custom seats & SLA for 30+ users
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <AnimatePresence mode="wait">
                            <motion.span
                              key={`${plan.id}-${price}`}
                              initial={{ opacity: 0, y: -8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 8 }}
                              transition={{ duration: 0.2 }}
                              className="text-4xl sm:text-5xl font-bold text-[#0A0D14] tracking-tight font-sans tabular-nums"
                            >
                              ${price}
                            </motion.span>
                          </AnimatePresence>
                          <span className="text-xs text-slate-500 font-semibold">
                            /seat/mo
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1 font-medium">
                          {price === 0
                            ? 'Free forever'
                            : billingCycle === 'annual'
                            ? `Billed annually ($${price * 12}/yr)`
                            : 'Billed monthly'}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action CTA Button */}
                  <button
                    type="button"
                    onClick={() => {
                      if (plan.id === 'enterprise') onOpenDemo();
                      else onOpenAuth('signup');
                    }}
                    className={`w-full py-3.5 px-5 rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer mb-7 active:scale-[0.96] transition-all duration-200 group/btn ${
                      isTeams
                        ? 'bg-[#0055FF] hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                        : plan.ctaVariant === 'secondary'
                        ? 'bg-slate-800 hover:bg-slate-700 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-900'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-150" />
                  </button>

                  {/* Included Features Checklist */}
                  <div className="space-y-3.5">
                    <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                      Included in {plan.name}:
                    </span>
                    <ul className="space-y-2.5">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            isTeams ? 'bg-blue-100 text-[#0055FF]' : 'bg-emerald-100 text-emerald-600'
                          }`}>
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                          <span className={idx === 0 && isTeams ? 'font-bold text-slate-900' : 'text-slate-700'}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Guarantee */}
                <div className="mt-8 pt-4 border-t border-slate-100 text-[11px] font-mono font-medium text-slate-400 text-center">
                  {plan.id === 'free' ? 'No credit card needed' : '14-day risk-free trial'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Enterprise Security Reassurance Banner */}
        <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-xl border border-slate-200/80 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Need custom procurement, HIPAA, or dedicated BAA?</h4>
              <p className="text-xs text-slate-500 mt-0.5">We support custom Master Services Agreements, SAML SSO, and SCIM automated provisioning for 30+ seats.</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenDemo}
            className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold border border-slate-200 transition-colors shrink-0 active:scale-[0.96] cursor-pointer"
          >
            Talk to Enterprise Sales
          </button>
        </div>

      </div>
    </section>
  );
}
