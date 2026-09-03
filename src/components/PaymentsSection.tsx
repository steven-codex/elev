import { useState } from 'react';
import {
  CreditCard,
  Package,
  Receipt,
  Link as LinkIcon,
  Check,
  ShieldCheck,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PaymentsSectionProps {
  onOpenAuth: (mode: 'signup') => void;
}

export default function PaymentsSection({ onOpenAuth }: PaymentsSectionProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [packageType, setPackageType] = useState<'single' | 'bundle'>('single');
  const [isPaid, setIsPaid] = useState(false);

  const features = [
    {
      title: 'Upfront meeting payments',
      description: 'Collect payment when clients book with you, so you can get paid sooner and reduce no-shows.',
      icon: <CreditCard className="w-5 h-5 text-teal-800" />
    },
    {
      title: 'Meeting packages',
      description: 'Sell multi-session bundles clients can purchase once and schedule over time — ideal for ongoing client work like coaching and consulting.',
      icon: <Package className="w-5 h-5 text-teal-800" />
    },
    {
      title: 'Invoices',
      description: 'Send professional branded invoices for post-meeting billing, installments, or project-based work, with built-in tracking and reminders.',
      icon: <Receipt className="w-5 h-5 text-teal-800" />
    },
    {
      title: 'Payment links',
      description: 'Share payment links to quickly request payment for anything, anytime — from one-off services to follow-up fees.',
      icon: <LinkIcon className="w-5 h-5 text-teal-800" />
    }
  ];

  const handleSimulatePayment = () => {
    setIsPaid(true);
    try {
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
    } catch {}
  };

  return (
    <section className="py-20 bg-[#FAF7F2] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5DDFD7]/20 text-teal-950 font-bold text-xs mb-3 border border-teal-200">
            <CreditCard className="w-3.5 h-3.5 text-teal-700" />
            <span>elev Payments</span>
            <span className="text-[10px] uppercase tracking-wider bg-teal-100 text-teal-900 px-1.5 py-0.2 rounded-full font-extrabold">New</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-[3.25rem] text-[#071A31] font-normal leading-tight tracking-tight">
            Flexible payment options that fit your business
          </h2>
          <p className="font-heading text-base sm:text-lg text-slate-600 mt-3 max-w-2xl leading-relaxed">
            Eliminate awkward invoice follow-ups. Collect payment at booking, bundle sessions, or generate custom Stripe-backed payment links with one click.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: 4 Features */}
          <div className="lg:col-span-6 space-y-3">
            {features.map((item, idx) => {
              const isSelected = activeTab === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`rounded-2xl p-5 transition-all duration-200 cursor-pointer border ${
                    isSelected
                      ? 'bg-white border-teal-300 shadow-md ring-1 ring-teal-200'
                      : 'bg-white/60 border-stone-200/80 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        isSelected ? 'bg-[#5DDFD7] text-[#071A31]' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {item.icon}
                      </div>
                      <h3 className="font-bold text-base text-[#071A31]">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="mt-3 pl-12 text-xs text-slate-600 leading-relaxed animate-in fade-in">
                      {item.description}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Interactive Payments Widget */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-md border border-stone-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Integrated Checkout</span>
                  <h4 className="text-xs font-bold text-slate-900">Dr. Maya Lin · 1:1 Advisory Session</h4>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>256-bit SSL</span>
                </div>
              </div>

              {isPaid ? (
                <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200 text-center space-y-2.5 animate-in fade-in">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-emerald-900">Receipt Dispatched & Booking Locked!</h4>
                  <p className="text-xs text-emerald-700">
                    Your {packageType === 'single' ? '$200.00' : '$500.00'} deposit has been received. You can reschedule anytime up to 24h prior.
                  </p>
                  <button
                    onClick={() => setIsPaid(false)}
                    className="text-xs font-bold text-emerald-800 underline cursor-pointer pt-2 block mx-auto"
                  >
                    Reset simulator
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Select option */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div
                      onClick={() => setPackageType('single')}
                      className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                        packageType === 'single'
                          ? 'border-teal-500 bg-teal-50/50 ring-1 ring-teal-500'
                          : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50'
                      }`}
                    >
                      <span className="block text-xs font-bold text-slate-900">Single Session</span>
                      <span className="text-sm font-extrabold text-teal-800">$200.00</span>
                      <span className="block text-[10px] text-slate-500 mt-0.5">Pay upfront</span>
                    </div>

                    <div
                      onClick={() => setPackageType('bundle')}
                      className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                        packageType === 'bundle'
                          ? 'border-teal-500 bg-teal-50/50 ring-1 ring-teal-500'
                          : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="block text-xs font-bold text-slate-900">3-Session Pack</span>
                        <span className="text-[9px] bg-teal-100 text-teal-800 font-bold px-1.5 rounded-sm">Save $100</span>
                      </div>
                      <span className="text-sm font-extrabold text-teal-800">$500.00</span>
                      <span className="block text-[10px] text-slate-500 mt-0.5">3 credits issued</span>
                    </div>
                  </div>

                  {/* Payment method selector */}
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-700 font-semibold text-[11px]">
                      <span>Accepted Methods</span>
                      <span className="text-slate-400">Credit Card, Apple Pay, Google Pay</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-900 font-bold pt-1">
                      <span>Total Amount:</span>
                      <span className="text-base font-extrabold text-teal-800">
                        {packageType === 'single' ? '$200.00' : '$500.00'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleSimulatePayment}
                    className="w-full bg-[#071A31] hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-full shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Authorize & Book Slot</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
