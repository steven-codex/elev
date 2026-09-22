import React, { useEffect, useRef, ElementType } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  yOffset?: number; // Clamped ±20px to 50px subtle movement
  as?: ElementType;
}

export default function Parallax({
  children,
  className = '',
  yOffset = 36,
  as: Component = 'div',
}: ParallaxProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(el, { y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          y: -yOffset / 2,
        },
        {
          y: yOffset / 2,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [yOffset]);

  const Comp = Component as any;

  return (
    <Comp ref={ref} className={className}>
      {children}
    </Comp>
  );
}
