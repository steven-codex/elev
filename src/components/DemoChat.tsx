import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { User } from 'lucide-react';
import { useLang } from '../i18n';
import { DEMO_CHAT } from '../data/landingData';

// Items store chip indexes, never strings, so a language switch re-renders the whole chat.
type Item =
  | { kind: 'user'; chip: number }
  | { kind: 'typing' }
  | { kind: 'bot'; chip: number }
  | { kind: 'handoff' };

const REPLY_DELAY_MS = 900;
const BUBBLE_EASE = [0.16, 1, 0.3, 1] as const;

export default function DemoChat() {
  const { t } = useLang();
  const [items, setItems] = useState<Item[]>([]);
  const timers = useRef(new Set<number>());
  const pending = useRef(false);

  // Clear any queued reply when the demo unmounts.
  useEffect(() => {
    const pendingTimers = timers.current;
    return () => {
      pendingTimers.forEach((id) => window.clearTimeout(id));
      pendingTimers.clear();
    };
  }, []);

  const ask = (chip: number) => {
    if (pending.current) return;
    pending.current = true;
    setItems((prev) => [...prev, { kind: 'user', chip }, { kind: 'typing' }]);

    const id = window.setTimeout(() => {
      timers.current.delete(id);
      pending.current = false;
      setItems((prev) => {
        const next = prev.filter((item) => item.kind !== 'typing');
        next.push({ kind: 'bot', chip });
        const replies = next.filter((item) => item.kind === 'bot').length;
        if (replies === DEMO_CHAT.chips.length) next.push({ kind: 'handoff' });
        return next;
      });
    }, REPLY_DELAY_MS);
    timers.current.add(id);
  };

  const reset = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current.clear();
    pending.current = false;
    setItems([]);
  };

  const busy = items.some((item) => item.kind === 'typing');
  const askedChips = new Set(
    items.flatMap((item) => (item.kind === 'user' ? [item.chip] : [])),
  );

  return (
    <div className="w-full flex flex-1 flex-col bg-white border border-slate-200/90 shadow-[0_12px_32px_rgba(0,0,0,0.05)] rounded-2xl p-5 sm:p-6 text-left font-sans">
      {/* Chat header */}
      <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-[#0055FF] text-white font-normal text-xs flex items-center justify-center shrink-0 shadow-2xs">
            H
          </div>
          <span className="text-sm font-normal text-ink truncate">{DEMO_CHAT.business}</span>
        </div>
        <button
          type="button"
          onClick={reset}
          disabled={items.length === 0}
          className="text-xs font-medium text-ink-tertiary hover:text-ink transition-[color,opacity,transform] duration-160 enabled:active:scale-[0.96] cursor-pointer disabled:opacity-40 disabled:cursor-default disabled:hover:text-ink-tertiary"
        >
          {t(DEMO_CHAT.reset)}
        </button>
      </div>

      {/* Messages */}
      <div aria-live="polite" className="min-h-[260px] py-5 flex flex-col gap-3">
        {items.map((item, i) => {
          if (item.kind === 'handoff') {
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, filter: 'blur(4px)', y: 6 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                transition={{ duration: 0.25, ease: BUBBLE_EASE }}
                className="flex justify-center pt-1"
              >
                <span className="text-[10px] font-normal text-ink-tertiary bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200/60">
                  {t(DEMO_CHAT.handoff)}
                </span>
              </motion.div>
            );
          }

          if (item.kind === 'typing') {
            return (
              <div key={i} className="flex items-end gap-2.5 justify-end">
                <div className="bg-[#0055FF] text-white px-3.5 py-2.5 rounded-2xl rounded-br-xs shadow-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse [animation-delay:300ms]" />
                </div>
                <div className="w-7 h-7 rounded-full bg-[#0055FF] text-white font-normal text-[11px] flex items-center justify-center shrink-0 shadow-2xs">
                  H
                </div>
              </div>
            );
          }

          const isUser = item.kind === 'user';
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, filter: 'blur(4px)', y: 6 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              transition={{ duration: 0.25, ease: BUBBLE_EASE }}
              className={`flex items-end gap-2.5 ${isUser ? 'justify-start' : 'justify-end'}`}
            >
              {isUser ? (
                <>
                  <div className="w-7 h-7 rounded-full bg-slate-200 text-ink-secondary flex items-center justify-center shrink-0">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <div className="bg-slate-100 text-ink text-xs font-normal px-3.5 py-2 rounded-2xl rounded-bl-xs border border-slate-200/60 max-w-[82%]">
                    {t(DEMO_CHAT.chips[item.chip])}
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-[#0055FF] text-white text-xs font-normal px-3.5 py-2 rounded-2xl rounded-br-xs shadow-xs max-w-[82%]">
                    {t(DEMO_CHAT.replies[item.chip])}
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#0055FF] text-white font-normal text-[11px] flex items-center justify-center shrink-0 shadow-2xs">
                    H
                  </div>
                </>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Suggestion chips */}
      <div className="mt-auto flex flex-wrap gap-2 pt-4 border-t border-slate-100">
        {DEMO_CHAT.chips.map((chip, i) => {
          const asked = askedChips.has(i);
          return (
            <button
              key={i}
              type="button"
              onClick={() => ask(i)}
              disabled={busy || asked}
              className="text-xs font-medium text-accent bg-blue-50 border border-blue-200/60 px-3 py-1.5 rounded-full transition-[background-color,opacity,transform] duration-160 enabled:active:scale-[0.96] cursor-pointer hover:bg-blue-100/60 disabled:opacity-40 disabled:cursor-default disabled:hover:bg-blue-50 disabled:active:scale-100"
            >
              {t(chip)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
