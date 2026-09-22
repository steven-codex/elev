import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Calendar,
  Play,
  X,
  Share2,
  Check
} from 'lucide-react';

interface GooeyElevDockProps {
  onOpenDemo: () => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export default function GooeyElevDock({ onOpenDemo, onOpenAuth }: GooeyElevDockProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none">
      {/* GOOEY LIQUID WRAPPER (Applies SVG filter: url(#gooey-effect)) */}
      <div
        className="relative flex items-center justify-center"
        style={{
          filter: 'url(#gooey-effect)'
        }}
      >
        {/* Child Bubble 1: Quick Interactive Demo */}
        <AnimatePresence>
          {isOpen && (
            <motion.button
              key="dock-demo"
              initial={{ x: 0, y: 0, scale: 0.2, opacity: 0 }}
              animate={{ x: -16, y: -68, scale: 1, opacity: 1 }}
              exit={{ x: 0, y: 0, scale: 0.2, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 450, damping: 24 }}
              onClick={onOpenDemo}
              className="absolute w-12 h-12 rounded-full bg-[#0055FF] hover:bg-[#0047D6] text-white flex items-center justify-center shadow-lg cursor-pointer"
              title="Interactive elev Demo"
            >
              <Play className="w-5 h-5 fill-white ml-0.5" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Child Bubble 2: Velie AI Copilot */}
        <AnimatePresence>
          {isOpen && (
            <motion.button
              key="dock-velie"
              initial={{ x: 0, y: 0, scale: 0.2, opacity: 0 }}
              animate={{ x: -68, y: -44, scale: 1, opacity: 1 }}
              exit={{ x: 0, y: 0, scale: 0.2, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 450, damping: 24, delay: 0.03 }}
              onClick={() => onOpenAuth('signup')}
              className="absolute w-12 h-12 rounded-full bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center shadow-lg cursor-pointer"
              title="Try Velie AI Free"
            >
              <Sparkles className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Child Bubble 3: Quick Booking */}
        <AnimatePresence>
          {isOpen && (
            <motion.button
              key="dock-book"
              initial={{ x: 0, y: 0, scale: 0.2, opacity: 0 }}
              animate={{ x: -74, y: 16, scale: 1, opacity: 1 }}
              exit={{ x: 0, y: 0, scale: 0.2, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 450, damping: 24, delay: 0.06 }}
              onClick={onOpenDemo}
              className="absolute w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center shadow-lg cursor-pointer"
              title="Schedule with elev"
            >
              <Calendar className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Child Bubble 4: Share Link */}
        <AnimatePresence>
          {isOpen && (
            <motion.button
              key="dock-share"
              initial={{ x: 0, y: 0, scale: 0.2, opacity: 0 }}
              animate={{ x: -20, y: 64, scale: 1, opacity: 1 }}
              exit={{ x: 0, y: 0, scale: 0.2, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 450, damping: 24, delay: 0.09 }}
              onClick={handleShare}
              className="absolute w-11 h-11 rounded-full bg-teal-600 hover:bg-teal-700 text-white flex items-center justify-center shadow-lg cursor-pointer"
              title="Copy elev link"
            >
              {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
            </motion.button>
          )}
        </AnimatePresence>

        {/* Main Central Gooey Core Orb (elev Brand Trigger) */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle elev Gooey Menu"
          className="relative z-10 w-14 h-14 rounded-full bg-[#0B1222] text-white flex items-center justify-center shadow-2xl ring-2 ring-white/80 cursor-pointer overflow-hidden group"
        >
          {/* Animated liquid gradient sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-400 opacity-85 group-hover:opacity-100 transition-opacity" />

          {/* Icon / Brand mark */}
          <div className="relative z-20 flex items-center justify-center">
            {isOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <div className="flex flex-col items-center">
                <span className="font-normal text-sm tracking-tight text-white">
                  elev
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-0.5 animate-pulse" />
              </div>
            )}
          </div>
        </motion.button>
      </div>

      {/* Floating Tooltip Label when closed */}
      {!isOpen && (
        <div className="absolute -top-7 right-0 pointer-events-none whitespace-nowrap bg-slate-900/90 text-white text-[10px] font-normal px-2 py-0.5 rounded-full shadow-xs border border-slate-700/80 backdrop-blur-xs">
          elev flow
        </div>
      )}
    </div>
  );
}
