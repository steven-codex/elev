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
  blur?: number;
  ease?: string;
  as?: ElementType;
}

export default function ImageReveal({
  children,
  className = '',
  delay = 0,
  duration = 1.35,
  y = 32,
  startScale = 0.965,
  start = 'top 86%',
  blur = 6,
  ease = 'power3.out',
  as: Component = 'div',
}: ImageRevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, y: 0, scale: 1, filter: 'none' });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y,
          scale: startScale,
          filter: blur > 0 ? `blur(${blur}px)` : 'none',
          force3D: true,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
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
  }, [delay, duration, y, startScale, start, blur, ease]);

  const Comp = Component as any;

  return (
    <Comp ref={ref} className={className}>
      {children}
    </Comp>
  );
}
