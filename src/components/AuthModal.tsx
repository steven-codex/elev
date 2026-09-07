import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, Check, Shield } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AuthModalProps {
  isOpen: boolean;
  mode: 'login' | 'signup';
  onClose: () => void;
  onSwitchMode: (newMode: 'login' | 'signup') => void;
}

export default function AuthModal({ isOpen, mode, onClose, onSwitchMode }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {}
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: [0.23, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: 'spring', stiffness: 450, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-white/95 backdrop-blur-3xl rounded-[28px] shadow-[0_24px_80px_rgba(0,0,0,0.2)] border border-white/90 p-6 sm:p-8 origin-center text-slate-800"
          >
            {/* Tactile Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100/80 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-transform duration-150 active:scale-[0.94] cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {success ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-2xs">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  {mode === 'signup' ? 'Welcome to elev!' : 'Welcome back!'}
                </h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                  Your calendar sync is ready. Launching your personal scheduling workspace...
                </p>
              </div>
            ) : (
              <div>
                {/* Logo Header */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-xl bg-[#0055FF] flex items-center justify-center text-white shadow-xs">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" className="opacity-40" />
                      <circle cx="12" cy="12" r="6" />
                      <path d="M12 9v3l2 2" />
                    </svg>
                  </div>
                  <span className="font-extrabold text-xl text-slate-900 tracking-tight">elev</span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {mode === 'signup' ? 'Get started with elev free' : 'Log in to your elev account'}
                </h3>
                <p className="text-xs text-slate-500 mt-1 mb-6 leading-relaxed">
                  {mode === 'signup'
                    ? 'No credit card required. Free 14-day trial of Teams plan.'
                    : 'Welcome back! Enter your work credentials below.'}
                </p>

                {/* Quick 1-click SSO buttons */}
                <div className="space-y-2.5 mb-5">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 font-bold text-xs text-slate-700 flex items-center justify-center gap-2.5 transition-all duration-150 active:scale-[0.97] cursor-pointer"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>Continue with Google</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 font-bold text-xs text-slate-700 flex items-center justify-center gap-2.5 transition-all duration-150 active:scale-[0.97] cursor-pointer"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#F25022" d="M1 1h10v10H1z" />
                      <path fill="#00A4EF" d="M1 13h10v10H1z" />
                      <path fill="#7FBA00" d="M13 1h10v10H13z" />
                      <path fill="#FFB900" d="M13 13h10v10H13z" />
                    </svg>
                    <span>Continue with Microsoft</span>
                  </button>
                </div>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase font-mono">
                    <span className="bg-white px-2.5 text-slate-400 font-bold tracking-wider">or with work email</span>
                  </div>
                </div>

                {/* Email Form */}
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Work Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#0055FF] bg-white font-medium shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#0055FF] bg-white font-medium shadow-2xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 bg-[#0055FF] hover:bg-blue-700 active:scale-[0.96] text-white font-bold text-xs py-3 rounded-full transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md group/btn"
                  >
                    <span>{mode === 'signup' ? 'Create Free Account' : 'Log In to Workspace'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </form>

                <div className="mt-5 text-center text-xs text-slate-500">
                  {mode === 'signup' ? (
                    <span>
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => onSwitchMode('login')}
                        className="font-bold text-[#0055FF] hover:underline cursor-pointer"
                      >
                        Log In
                      </button>
                    </span>
                  ) : (
                    <span>
                      Don't have an account yet?{' '}
                      <button
                        type="button"
                        onClick={() => onSwitchMode('signup')}
                        className="font-bold text-[#0055FF] hover:underline cursor-pointer"
                      >
                        Sign up free
                      </button>
                    </span>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-mono">
                  <Shield className="w-3.5 h-3.5 text-slate-400" />
                  <span>TLS 1.3 Bank-Grade Encryption · SOC 2 Type II</span>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
