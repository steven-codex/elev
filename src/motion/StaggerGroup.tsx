import React, { useEffect, useRef, ElementType } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StaggerGroupProps {
  children: React.ReactNode;
  className?: string;
  selector?: string;
  stagger?: number;
  y?: number;
  duration?: number;
  ease?: string;
  start?: string;
  as?: ElementType;
}

export default function StaggerGroup({
  children,
  className = '',
  selector = ':scope > *',
  stagger = 0.06,
  y = 20,
  duration = 0.95,
  ease = 'power4.out',
  start = 'top 89%',
  as: Component = 'div',
}: StaggerGroupProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      const items = el.querySelectorAll(selector);
      items.forEach((item) => gsap.set(item, { opacity: 1, y: 0 }));
      return;
    }

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll(selector);
      if (items.length === 0) return;

      gsap.fromTo(
        items,
        {
          opacity: 0,
          y,
          force3D: true,
        },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease,
          force3D: true,
          clearProps: 'transform',
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [selector, stagger, y, duration, ease, start]);

  const Comp = Component as any;

  return (
    <Comp ref={ref} className={className}>
      {children}
    </Comp>
  );
}
