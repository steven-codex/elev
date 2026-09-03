import { useState, FormEvent } from 'react';
import { ArrowRight, Check, Sparkles, Shield, Zap, Bell, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import InteractiveScheduler from './InteractiveScheduler';

interface HeroProps {
  onOpenAuth: (mode: 'signup') => void;
}

export default function Hero({ onOpenAuth }: HeroProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubmitted(true);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {}
    setTimeout(() => {
      onOpenAuth('signup');
    }, 600);
  };

  return (
    <section className="relative pt-8 pb-20 lg:pt-14 lg:pb-28 overflow-hidden bg-gradient-to-b from-slate-50/70 via-white to-white">
      {/* Subtle background glow/grid */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Prop & Conversion Form */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3.5 py-1.5 rounded-full text-xs font-bold border border-blue-200/70 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>THE SCHEDULING AUTOMATION PLATFORM</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Easy scheduling <br />
              <span className="text-blue-600">ahead.</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal max-w-xl">
              Elev is your scheduling automation platform for eliminating the back-and-forth emails so you can get more done, close deals faster, and keep momentum high.
            </p>

            {/* Email Sign-up form */}
            <form onSubmit={handleSubmit} className="space-y-3 pt-2 max-w-lg">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  className="flex-1 px-4 py-3.5 rounded-full border border-slate-300 text-slate-800 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white shadow-2xs placeholder:text-slate-400 font-medium"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-sm px-7 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <span>Sign up free</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 pl-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Create your free account. No credit card required.</span>
              </div>
            </form>

            {/* Micro proof badges */}
            <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1.5">
                  <img className="w-6 h-6 rounded-full border border-white" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80" alt="User" />
                  <img className="w-6 h-6 rounded-full border border-white" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80" alt="User" />
                  <img className="w-6 h-6 rounded-full border border-white" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&auto=format&fit=crop&q=80" alt="User" />
                </div>
                <span>Joined by <strong>100,000+ teams</strong></span>
              </div>

              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-blue-600" />
                <span>SOC 2 Type II Certified</span>
              </div>
            </div>
          </div>

          {/* Right Column: Realistic Interactive Scheduling Card with Micro-annotations */}
          <div className="lg:col-span-6 relative">
            {/* Background decorative blob */}
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-blue-100/60 rounded-full blur-3xl pointer-events-none -z-10" />

            {/* Floating micro-badge 1: Top Right */}
            <div className="hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-slate-200/80 text-xs text-slate-700 font-semibold absolute -top-4 -right-4 z-20 animate-bounce duration-1000">
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Lead routed to Sarah based on territory</span>
            </div>

            {/* Interactive Scheduler Container */}
            <div className="relative z-10">
              <InteractiveScheduler />
            </div>

            {/* Floating micro-badge 2: Bottom Left */}
            <div className="hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-slate-200/80 text-xs text-slate-700 font-semibold absolute -bottom-5 -left-4 z-20">
              <Bell className="w-3.5 h-3.5 text-blue-600" />
              <span>Auto SMS reminder queued for 24h before</span>
            </div>

            {/* Floating micro-badge 3: Bottom Right */}
            <div className="hidden sm:flex items-center gap-2 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 text-[11px] text-emerald-800 font-semibold absolute -bottom-3 right-8 z-20 shadow-xs">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>0 double-bookings guaranteed</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
