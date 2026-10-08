import React, { useEffect, useRef, ElementType } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ImageRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  startScale?: number;
  start?: string;
  as?: ElementType;
}

export default function ImageReveal({
  children,
  className = '',
  delay = 0,
  duration = 1.15,
  y = 24,
  startScale = 0.985,
  start = 'top 89%',
  as: Component = 'div',
}: ImageRevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y,
          scale: startScale,
          force3D: true,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration,
          delay,
          ease: 'power4.out',
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
  }, [delay, duration, y, startScale, start]);

  const Comp = Component as any;

  return (
    <Comp ref={ref} className={className}>
      {children}
    </Comp>
  );
}
