import { useEffect, useState, type RefObject } from 'react';

/** Tracks whether an element is on screen (small margin so loops resume just before they enter). */
export function useInView(ref: RefObject<Element | null>): boolean {
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: '80px 0px',
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return inView;
}
