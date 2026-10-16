import React, { useEffect, useRef, ElementType } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  y?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  start?: string;
  blur?: number;
  as?: ElementType;
}

export default function Reveal({
  children,
  className = '',
  y = 28,
  duration = 1.25,
  delay = 0,
  ease = 'power3.out',
  start = 'top 86%',
  blur = 8,
  as: Component = 'div',
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, y: 0, filter: 'none' });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y,
          filter: blur > 0 ? `blur(${blur}px)` : 'none',
          force3D: true,
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration,
          delay,
          ease,
          force3D: true,
          clearProps: 'transform,filter,opacity',
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [y, duration, delay, ease, start, blur]);

  const Comp = Component as any;

  return (
    <Comp ref={ref} className={className}>
      {children}
    </Comp>
  );
}
