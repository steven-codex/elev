import { RotateCcw } from 'lucide-react';
import { SITE } from '../data/landingData';
import { useLang } from '../i18n';

/** Small text control shown when an auto-playing loop has stopped on its own. */
export default function LoopReplayButton({ onClick, className = '' }: { onClick: () => void; className?: string }) {
  const { t } = useLang();
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 min-h-6 px-3 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-2xs text-caption font-medium text-ink-tertiary hover:text-ink hover:bg-slate-50 cursor-pointer select-none enabled:active:scale-[0.96] transition-[background-color,color,transform] duration-150 ease-[var(--ease-out)] ${className}`}
    >
      <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
      <span>{t(SITE.a11y.playAgain)}</span>
    </button>
  );
}
