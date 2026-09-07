import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import InteractiveScheduler from './InteractiveScheduler';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: 'spring', stiffness: 450, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-white/95 backdrop-blur-3xl rounded-[32px] shadow-[0_32px_96px_rgba(0,0,0,0.25)] border border-white/90 overflow-hidden text-slate-800 origin-center"
          >
            {/* Tactile Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-slate-100/90 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200/80 shadow-xs flex items-center justify-center transition-transform duration-150 active:scale-[0.94] cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-1 sm:p-2">
              <InteractiveScheduler />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
