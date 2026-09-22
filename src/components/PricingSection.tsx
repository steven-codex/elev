import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ShieldCheck, ArrowRight } from 'lucide-react';
import { Reveal } from '../motion';

interface PricingSectionProps {
  onOpenAuth: (mode: 'signup') => void;
  onOpenDemo: () => void;
}

export default function PricingSection({ onOpenAuth, onOpenDemo }: PricingSectionProps) {
  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual');

  const standardPrice = billingCycle === 'annual' ? 16 : 20;
  const proPrice = billingCycle === 'annual' ? 32 : 40;

  const standardFeatures = [
    'Multi-calendar 2-way sync (Google & Outlook)',
    'Unlimited booking links & custom buffer controls',
    'Velie AI Scheduling Assistant (Email autopilot)',
    'AI Meeting Notetaker & automated recap summaries',
    'Built-in Stripe payments for paid consultations',
    'Native Zoom, Google Meet & Microsoft Teams',
  ];

  const proFeatures = [
    'Round-robin team pooling & collective availability',
    'Inbound lead qualification routing forms',
    'Unlimited Velie AI autonomous negotiations',
    'Bi-directional Salesforce, HubSpot & Slack CRM sync',
    'Centralized team admin, shared templates & analytics',
    'Custom branding, domain & dedicated VIP support',
  ];

  return (
    <section id="pricing" className="py-24 lg:py-36 bg-[#F8FAFC] border-t border-[#E2E8F0] relative overflow-hidden text-slate-900 select-none">
      {/* Ambient background glows */}
      <div 
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(0,85,255,0.08)_0%,rgba(147,197,253,0.12)_45%,transparent_75%)] blur-3xl rounded-full" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <Reveal y={24}>
            <h2 className="text-3xl sm:text-4xl lg:text-[3.25rem] text-[#0A0D14] font-normal leading-[1.15] tracking-tight text-balance">
              Simple, transparent <span className="font-instrument italic font-normal bg-gradient-to-r from-[#418AC1] to-[#506DFD] bg-clip-text text-transparent inline-block pr-1">pricing for scale</span>
            </h2>
          </Reveal>

          <Reveal delay={0.12} y={16}>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed text-pretty max-w-xl mx-auto font-normal">
              Two focused plans tailored for high-growth teams. Every plan includes dedicated onboarding and a risk-free 14-day trial.
            </p>
          </Reveal>

          {/* Micro-interactive Billing Cycle Toggle with Spring Physics */}
          <Reveal delay={0.22} y={16}>
            <div className="mt-9 inline-flex items-center p-1.5 bg-slate-200/60 backdrop-blur-xl rounded-full border border-slate-300/70 shadow-inner relative">
              <button
                type="button"
                onClick={() => setBillingCycle('annual')}
                className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-normal transition-colors duration-160 cursor-pointer active:scale-[0.97] flex items-center gap-2 z-10 ${
                  billingCycle === 'annual' ? 'text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {billingCycle === 'annual' && (
                  <motion.div
                    layoutId="activePricingBillingPill"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    className="absolute inset-0 bg-gradient-to-r from-[#418AC1] to-[#506DFD] rounded-full shadow-sm -z-10"
                  />
                )}
                <span>Billed annually</span>
                <span className={`text-[10px] font-normal px-2 py-0.5 rounded-full transition-colors duration-160 ${
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
                className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-normal transition-colors duration-160 cursor-pointer active:scale-[0.97] z-10 ${
                  billingCycle === 'monthly' ? 'text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {billingCycle === 'monthly' && (
                  <motion.div
                    layoutId="activePricingBillingPill"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    className="absolute inset-0 bg-gradient-to-r from-[#418AC1] to-[#506DFD] rounded-full shadow-sm -z-10"
                  />
                )}
                <span>Billed monthly</span>
              </button>
            </div>
          </Reveal>
        </div>

        {/* 2-Card Clean Pricing Grid (Light Theme Matched to Reference Structure) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-8 items-stretch max-w-4xl mx-auto mb-16">
          
          {/* CARD 1: Standard */}
          <div className="relative rounded-[32px] bg-white border border-slate-200/90 p-8 sm:p-10 flex flex-col justify-between overflow-hidden shadow-[0_16px_48px_rgba(0,35,102,0.05),0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300 hover:border-slate-300 hover:shadow-[0_24px_56px_rgba(0,35,102,0.08)] group">
            <div>
              {/* Header */}
              <h3 className="text-xl sm:text-2xl font-normal text-[#0A0D14] tracking-tight">
                Standard
              </h3>

              {/* Price */}
              <div className="flex items-baseline gap-1 mt-4">
                <span className="text-2xl font-normal text-[#0A0D14] leading-none self-start mt-2">$</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`std-${standardPrice}`}
                    initial={{ opacity: 0, y: -6, filter: 'blur(2px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: 6, filter: 'blur(2px)' }}
                    transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                    className="text-5xl sm:text-6xl font-normal text-[#0A0D14] tracking-tight tabular-nums font-sans leading-none"
                  >
                    {standardPrice}
                  </motion.span>
                </AnimatePresence>
                <span className="text-base sm:text-lg font-normal text-slate-500 ml-1">
                  /seat/mo
                </span>
              </div>

              {/* Tagline */}
              <p className="text-sm text-slate-500 mt-4 leading-relaxed font-normal min-h-[44px]">
                Core AI scheduling, multi-calendar sync, and automated recaps for growing professionals and consultants.
              </p>

              {/* CTA Button */}
              <button
                type="button"
                onClick={onOpenDemo}
                className="w-full mt-7 py-3.5 px-6 rounded-full bg-gradient-to-r from-[#418AC1] to-[#506DFD] hover:brightness-105 text-white font-normal text-sm sm:text-base tracking-tight shadow-[0_8px_24px_rgba(0,85,255,0.24)] hover:shadow-[0_12px_28px_rgba(0,85,255,0.36)] transition-all duration-160 active:scale-[0.97] cursor-pointer"
              >
                Book Your Demo
              </button>

              {/* Subtext under button */}
              <p className="text-xs text-slate-400 text-center mt-2.5 font-normal tracking-tight">
                {billingCycle === 'annual' ? 'Billed annually ($192/seat/yr) • 14-day free trial' : 'Billed monthly • 14-day free trial'}
              </p>

              {/* Feature List */}
              <div className="mt-8 pt-7 border-t border-slate-100">
                <p className="text-sm font-normal text-[#0A0D14] mb-4">
                  Including:
                </p>
                <ul className="space-y-3.5">
                  {standardFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-slate-700 font-normal leading-relaxed">
                      <div className="w-5 h-5 rounded-full bg-blue-50 text-[#0055FF] flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Trial Guarantee note */}
            <div className="mt-8 pt-4 border-t border-slate-100 text-xs font-normal text-slate-400 text-center">
              No credit card required • Instant setup
            </div>
          </div>

          {/* CARD 2: Pro */}
          <div className="relative rounded-[32px] bg-white border-2 border-[#0055FF] p-8 sm:p-10 flex flex-col justify-between overflow-hidden shadow-[0_20px_60px_rgba(0,85,255,0.12),0_4px_16px_rgba(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_28px_72px_rgba(0,85,255,0.18)] group md:-translate-y-1">
            {/* Top-Right Soft Aurora Glow (Light Adaptation of Reference Glow) */}
            <div 
              className="pointer-events-none absolute -top-16 -right-16 w-80 h-80 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,85,255,0.09)_0%,rgba(168,85,247,0.05)_42%,transparent_72%)] blur-2xl transition-opacity duration-500 opacity-90 group-hover:opacity-100" 
              aria-hidden="true" 
            />

            <div>
              {/* Header */}
              <div className="flex items-center justify-between relative z-10">
                <h3 className="text-xl sm:text-2xl font-normal text-[#0A0D14] tracking-tight">
                  Pro
                </h3>
                <span className="text-[10px] font-normal uppercase tracking-wider text-[#0055FF] bg-blue-50 border border-blue-200/60 px-2.5 py-0.5 rounded-full">
                  Most Popular
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-1 mt-4 relative z-10">
                <span className="text-2xl font-normal text-[#0A0D14] leading-none self-start mt-2">$</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`pro-${proPrice}`}
                    initial={{ opacity: 0, y: -6, filter: 'blur(2px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: 6, filter: 'blur(2px)' }}
                    transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                    className="text-5xl sm:text-6xl font-normal text-[#0A0D14] tracking-tight tabular-nums font-sans leading-none"
                  >
                    {proPrice}
                  </motion.span>
                </AnimatePresence>
                <span className="text-base sm:text-lg font-normal text-slate-500 ml-1">
                  /seat/mo
                </span>
              </div>

              {/* Tagline */}
              <p className="text-sm text-slate-500 mt-4 leading-relaxed font-normal min-h-[44px] relative z-10">
                Complete meeting intelligence, autonomous negotiations, and team CRM sync for scaling businesses.
              </p>

              {/* CTA Button */}
              <button
                type="button"
                onClick={onOpenDemo}
                className="w-full mt-7 py-3.5 px-6 rounded-full bg-gradient-to-r from-[#418AC1] to-[#506DFD] hover:brightness-105 text-white font-normal text-sm sm:text-base tracking-tight shadow-[0_8px_24px_rgba(0,85,255,0.28)] hover:shadow-[0_12px_28px_rgba(0,85,255,0.4)] transition-all duration-160 active:scale-[0.97] cursor-pointer relative z-10"
              >
                Book Your Demo
              </button>

              {/* Subtext under button */}
              <p className="text-xs text-slate-400 text-center mt-2.5 font-normal tracking-tight relative z-10">
                {billingCycle === 'annual' ? 'Billed annually ($384/seat/yr) • 14-day free trial' : 'Billed monthly • 14-day free trial'}
              </p>

              {/* Feature List */}
              <div className="mt-8 pt-7 border-t border-slate-100 relative z-10">
                <p className="text-sm font-normal text-[#0A0D14] mb-4">
                  Standard plus:
                </p>
                <ul className="space-y-3.5">
                  {proFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-slate-700 font-normal leading-relaxed">
                      <div className="w-5 h-5 rounded-full bg-blue-100 text-[#0055FF] flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Trial Guarantee note */}
            <div className="mt-8 pt-4 border-t border-slate-100 text-xs font-normal text-slate-400 text-center relative z-10">
              14-day free trial • Cancel or upgrade anytime
            </div>
          </div>

        </div>

        {/* Enterprise Security Reassurance Banner */}
        <Reveal y={20} className="w-full">
          <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-xl border border-slate-200/90 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xs">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-normal text-slate-900">Need custom procurement, HIPAA, or dedicated BAA?</h4>
                <p className="text-xs text-slate-500 mt-0.5">We support custom Master Services Agreements, SAML SSO, and SCIM automated provisioning for large teams.</p>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenDemo}
              className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-normal border border-slate-200 transition-colors shrink-0 active:scale-[0.97] cursor-pointer flex items-center gap-1.5"
            >
              <span>Talk to Enterprise Sales</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
