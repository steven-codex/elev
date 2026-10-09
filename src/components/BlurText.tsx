'use client';

import { motion, type Transition } from 'motion/react';
import React, { useEffect, useRef, useState, useMemo, ElementType } from 'react';

const buildKeyframes = (from: Record<string, any>, steps: Record<string, any>[]) => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap((s) => Object.keys(s))]);

  const keyframes: Record<string, any[]> = {};
  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s) => s[k])];
  });
  return keyframes;
};

export interface BlurTextProps {
  text?: string;
  delay?: number;
  initialDelay?: number;
  className?: string;
  spanClassName?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, any>;
  animationTo?: Record<string, any>[];
  easing?: Transition['ease'];
  onAnimationComplete?: () => void;
  stepDuration?: number;
  as?: ElementType;
  style?: React.CSSProperties;
}

const BlurText: React.FC<BlurTextProps> = ({
  text = '',
  delay = 200,
  initialDelay = 0,
  className = '',
  spanClassName = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = [0.25, 0.1, 0.25, 1],
  onAnimationComplete,
  stepDuration = 0.35,
  as: Component = 'p',
  style = {},
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(
    () =>
      direction === 'top'
        ? { filter: 'blur(10px)', opacity: 0, y: -24 }
        : { filter: 'blur(10px)', opacity: 0, y: 24 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      {
        filter: 'blur(5px)',
        opacity: 0.5,
        y: direction === 'top' ? 3 : -3,
      },
      { filter: 'blur(0px)', opacity: 1, y: 0 },
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1)
  );

  const Comp = Component as any;
  const isInline = Component === 'span';

  return (
    <Comp
      ref={ref}
      className={className}
      style={{
        display: isInline ? 'inline' : 'flex',
        flexWrap: isInline ? undefined : 'wrap',
        justifyContent:
          !isInline && (className.includes('justify-center') || className.includes('text-center'))
            ? 'center'
            : undefined,
        ...style,
      }}
    >
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

        const spanTransition: Transition = {
          duration: totalDuration,
          times,
          delay: (initialDelay + index * delay) / 1000,
          ease: easing,
        };

        return (
          <React.Fragment key={index}>
            <motion.span
              className={`inline-block will-change-[transform,filter,opacity] ${spanClassName}`}
              initial={fromSnapshot}
              animate={inView ? animateKeyframes : fromSnapshot}
              transition={spanTransition}
              onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
            >
              {segment === ' ' ? '\u00A0' : segment}
            </motion.span>
            {animateBy === 'words' && index < elements.length - 1 && ' '}
          </React.Fragment>
        );
      })}
    </Comp>
  );
};

export default BlurText;
