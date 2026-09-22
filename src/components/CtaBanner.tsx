import { useState, FormEvent } from 'react';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CtaBannerProps {
  onOpenAuth: (mode: 'signup') => void;
}

export default function CtaBanner({ onOpenAuth }: CtaBannerProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.8 }
      });
    } catch {}
    setTimeout(() => {
      onOpenAuth('signup');
    }, 450);
  };

  return (
    <section className="py-20 lg:py-28 bg-slate-900 text-white relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-blue-950/80 text-blue-400 px-3.5 py-1.5 rounded-full text-xs font-normal border border-blue-800 mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>START IN LESS THAN 2 MINUTES</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-white max-w-3xl mx-auto leading-tight">
          Power up your team's scheduling today.
        </h2>

        <p className="mt-4 text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Join over 100,000 forward-thinking companies that eliminate back-and-forth emails, accelerate sales pipelines, and book meetings effortlessly.
        </p>

        {/* Input box */}
        <form onSubmit={handleSubmit} className="mt-10 max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your work email"
              className="flex-1 px-4 py-3.5 rounded-full border border-slate-700 bg-slate-800 text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400 font-normal"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-normal text-sm px-7 py-3.5 rounded-full shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <span>Get started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              Free 14-day trial
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              Cancel anytime
            </span>
          </div>
        </form>
      </div>
    </section>
  );
}
