import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

export type Lang = 'en' | 'id';
export type L<T = string> = { en: T; id: T };

const STORAGE_KEY = 'newseed-lang';

function detectLang(): Lang {
  const { pathname } = window.location;
  if (pathname === '/id' || pathname.startsWith('/id/')) return 'id';
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'id') return saved;
  } catch {
    // localStorage can throw in private mode; fall through to the browser language.
  }
  return navigator.language.startsWith('id') ? 'id' : 'en';
}

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: <T>(value: L<T>) => T;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore storage failures; the in-memory language still switches.
    }
    const path = next === 'id' ? '/id' : '/';
    window.history.replaceState(window.history.state, '', path + window.location.hash);
  }, []);

  const t = useCallback(<T,>(value: L<T>): T => value[lang], [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used inside <LangProvider>');
  return ctx;
}
