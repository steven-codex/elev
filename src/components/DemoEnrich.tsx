import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useLang } from '../i18n';
import { DEMO_ENRICH } from '../data/landingData';

const ROW_MS = 450;
const CELL_STAGGER_S = 0.09;
const CELL_EASE = [0.23, 1, 0.32, 1] as const;

export default function DemoEnrich() {
  const { t } = useLang();
  const reduceMotion = useReducedMotion() === true;
  const total = DEMO_ENRICH.rows.length;
  const [started, setStarted] = useState(false);
  const [filled, setFilled] = useState(0); // number of rows filled, 0..total
  const done = filled >= total;

  // Right-edge fade shows while the table has more columns to scroll to.
  const scrollRef = useRef<HTMLDivElement>(null);
  const [moreRight, setMoreRight] = useState(false);
  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    const update = () => setMoreRight(scroller.scrollLeft + scroller.clientWidth < scroller.scrollWidth - 2);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(scroller);
    if (scroller.firstElementChild) observer.observe(scroller.firstElementChild);
    scroller.addEventListener('scroll', update, { passive: true });
    return () => {
      observer.disconnect();
      scroller.removeEventListener('scroll', update);
    };
  }, []);

  // One row per tick. Cleanup clears the pending tick on reset, unmount or language change.
  useEffect(() => {
    if (!started || done) return;
    const id = window.setTimeout(() => setFilled((n) => n + 1), ROW_MS);
    return () => window.clearTimeout(id);
  }, [started, done, filled]);

  const onButton = () => {
    if (done) {
      setFilled(0);
      setStarted(false);
      return;
    }
    if (reduceMotion) {
      setFilled(total);
      return;
    }
    setStarted(true);
  };

  return (
    <div className="w-full flex flex-1 flex-col bg-white border border-slate-200/90 shadow-[0_12px_32px_rgba(0,0,0,0.05)] rounded-2xl p-5 sm:p-6 text-left font-sans">
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <span className="text-xs font-normal text-ink-tertiary tabular-nums" aria-live="polite">
          {filled}/{total} {t(DEMO_ENRICH.counter)}
        </span>
        <button
          type="button"
          onClick={onButton}
          disabled={started && !done}
          className="py-2 px-4 rounded-full bg-accent hover:brightness-105 text-white font-medium text-xs tracking-tight shadow-[0_8px_24px_rgba(0,85,255,0.24)] transition-[filter,box-shadow,transform,opacity] duration-160 enabled:active:scale-[0.96] cursor-pointer disabled:opacity-60 disabled:cursor-default disabled:active:scale-100"
        >
          {t(done ? DEMO_ENRICH.reset : DEMO_ENRICH.button)}
        </button>
      </div>

      <div className="relative flex-1">
        <div ref={scrollRef} className="h-full overflow-x-auto">
        <table className="w-full min-w-[520px] text-left border-separate border-spacing-0">
          <thead>
            <tr>
              {DEMO_ENRICH.columns.map((col, i) => (
                <th
                  key={i}
                  scope="col"
                  className={`px-3 py-2.5 text-[10px] font-normal uppercase tracking-wider text-ink-tertiary border-b border-slate-200 whitespace-nowrap bg-white ${i === 0 ? 'sticky left-0 z-20' : ''}`}
                >
                  {t(col)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DEMO_ENRICH.rows.map((row, r) => {
              const on = r < filled;
              const cells = [row.domain, row.size, t(row.industry), row.contact];
              return (
                <tr key={row.company}>
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-white px-3 py-3.5 text-sm font-normal text-ink whitespace-nowrap border-b border-slate-100"
                  >
                    {row.company}
                  </th>
                  {cells.map((value, c) => (
                    <td key={c} className="px-3 py-3.5 text-xs text-ink-secondary whitespace-nowrap border-b border-slate-100">
                      {on ? (
                        <motion.span
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: reduceMotion ? 0 : 0.3,
                            delay: reduceMotion ? 0 : c * CELL_STAGGER_S,
                            ease: CELL_EASE,
                          }}
                          className="block"
                        >
                          {value}
                        </motion.span>
                      ) : (
                        <span className="block h-2 w-16 rounded-full bg-slate-100" aria-hidden="true" />
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
        {moreRight && (
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent" />
        )}
      </div>
    </div>
  );
}
