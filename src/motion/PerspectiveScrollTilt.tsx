import React, { useEffect, useRef, ElementType } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PerspectiveScrollTiltProps {
  children: React.ReactNode;
  className?: string;
  initialRotateX?: number; // Starting tilt angle (e.g. 20deg tilted back)
  initialScale?: number; // Starting scale (e.g. 0.94)
  initialY?: number; // Starting vertical offset (e.g. 36px)
  perspective?: number; // 3D Camera distance (e.g. 1200px)
  start?: string; // ScrollTrigger start (e.g. 'top 95%')
  end?: string; // ScrollTrigger end (e.g. 'center 55%')
  scrub?: number | boolean; // Momentum smoothing (default: 1.2s)
  as?: ElementType;
}

export default function PerspectiveScrollTilt({
  children,
  className = '',
  initialRotateX = 20,
  initialScale = 0.94,
  initialY = 36,
  perspective = 1200,
  start = 'top 95%',
  end = 'center 55%',
  scrub = 1.2,
  as: Component = 'div',
}: PerspectiveScrollTiltProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const card = cardRef.current;
    if (!container || !card) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(card, { rotateX: 0, scale: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        {
          rotateX: initialRotateX,
          scale: initialScale,
          y: initialY,
          transformOrigin: '50% 0%',
          transformStyle: 'preserve-3d',
          force3D: true,
        },
        {
          rotateX: 0,
          scale: 1,
          y: 0,
          ease: 'power2.out',
          force3D: true,
          scrollTrigger: {
            trigger: container,
            start,
            end,
            scrub,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [initialRotateX, initialScale, initialY, perspective, start, end, scrub]);

  const Comp = Component as any;

  return (
    <Comp
      ref={containerRef}
      className={className}
      style={{ perspective: `${perspective}px` }}
    >
      <div
        ref={cardRef}
        style={{
          transformStyle: 'preserve-3d',
          transformOrigin: '50% 0%',
          willChange: 'transform',
        }}
        className="w-full h-full"
      >
        {children}
      </div>
    </Comp>
  );
}
