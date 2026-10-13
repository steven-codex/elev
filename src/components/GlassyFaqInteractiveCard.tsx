import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface FaqCardItem {
  id: number;
  tag: string;
  badge: string;
  question: string;
  fullAnswer: string;
  image: string;
  alt: string;
}

interface GlassyFaqInteractiveCardProps {
  item: FaqCardItem;
  isParentHovered?: boolean;
  forceStep?: 1 | 2 | 3 | null;
  onCardHoverChange?: (hovered: boolean) => void;
}

/**
 * Emil Kowalski-grade Interactive Frosted Glass FAQ Capsule/Card:
 * - Step 1: Collapsed pill at the bottom with Elev infinity logo.
 * - Step 2 (On hover): Smoothly expands upward with staggered word blur reveal for the question.
 * - Step 3: Gracefully transitions to the answer with staggered blur reveal.
 * - Long text handling: Contained height with smooth automatic scrolling without visible scrollbars.
 * - On unhover: Gracefully collapses back to Step 1 with interruptible spring physics.
 */
export default function GlassyFaqInteractiveCard({
  item,
  isParentHovered = false,
  forceStep = null,
  onCardHoverChange
}: GlassyFaqInteractiveCardProps) {
  // Step: 1 (Collapsed pill), 2 (Question), 3 (Answer)
  const [internalStep, setInternalStep] = useState<1 | 2 | 3>(1);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Active step priority: forceStep (demo preview) > internalStep
  const effectiveStep: 1 | 2 | 3 = forceStep !== null && forceStep !== undefined 
    ? forceStep 
    : (isParentHovered || isHovered ? internalStep : 1);

  // Auto-scroll state for long answer text in Step 3
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState<number>(0);
  const [scrollDuration, setScrollDuration] = useState<number>(0);
  const [hasOverflow, setHasOverflow] = useState<boolean>(false);

  // Timer refs to guarantee clean teardown and interruptibility
  const stepTimerRef = useRef<NodeJS.Timeout | null>(null);
  const scrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const scrollResetTimerRef = useRef<NodeJS.Timeout | null>(null);

  const clearAllTimers = () => {
    if (stepTimerRef.current) clearTimeout(stepTimerRef.current);
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    if (scrollResetTimerRef.current) clearTimeout(scrollResetTimerRef.current);
  };

  // Hover Lifecycle Orchestration
  useEffect(() => {
    // If demo forceStep is applied, don't auto-sequence
    if (forceStep !== null && forceStep !== undefined) {
      return;
    }

    const active = isParentHovered || isHovered;

    if (!active) {
      clearAllTimers();
      setInternalStep(1);
      setScrollY(0);
      setScrollDuration(0.2);
      return;
    }

    // When hovered, start at Step 2 (Question)
    setInternalStep(2);
    setScrollY(0);

    // Question word count determines natural reading pace before Step 3
    const qWordCount = item.question.split(' ').length;
    // Word reveal finishes at: ~150ms initial + (qWordCount * 40ms) + duration (340ms)
    const revealFinishMs = 150 + qWordCount * 40 + 340;
    // Comfortable, unhurried reading pause (~1100ms) before transitioning to answer
    const totalStep2Duration = revealFinishMs + 1100;

    clearAllTimers();
    stepTimerRef.current = setTimeout(() => {
      setInternalStep(3);
    }, totalStep2Duration);

    return () => {
      clearAllTimers();
    };
  }, [isParentHovered, isHovered, forceStep, item.question]);

  // Step 3: Long Text Auto-Scroll Orchestration
  useEffect(() => {
    if (effectiveStep !== 3) {
      setScrollY(0);
      setHasOverflow(false);
      return;
    }

    // Allow answer words to reveal first before measuring and scrolling
    const aWordCount = item.fullAnswer.split(' ').length;
    const answerRevealFinishMs = 150 + aWordCount * 35 + 340;

    const measureAndScrollTimer = setTimeout(() => {
      if (!scrollContainerRef.current || !scrollContentRef.current) return;

      const containerHeight = scrollContainerRef.current.clientHeight;
      const contentHeight = scrollContentRef.current.scrollHeight;
      const overflow = contentHeight - containerHeight;

      if (overflow > 4) {
        setHasOverflow(true);
        // Reading pause for the top text before slow pan begins (~1300ms)
        scrollTimerRef.current = setTimeout(() => {
          // Slow, comfortable reading speed: ~16px per second
          const duration = Math.max(2.4, overflow / 16);
          setScrollDuration(duration);
          setScrollY(-overflow);

          // Once reached the bottom, hold for 1800ms, then smoothly glide back up
          scrollResetTimerRef.current = setTimeout(() => {
            setScrollDuration(1.2);
            setScrollY(0);
          }, duration * 1000 + 1800);
        }, 1300);
      } else {
        setHasOverflow(false);
        setScrollY(0);
      }
    }, answerRevealFinishMs);

    return () => {
      clearTimeout(measureAndScrollTimer);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      if (scrollResetTimerRef.current) clearTimeout(scrollResetTimerRef.current);
    };
  }, [effectiveStep, item.fullAnswer]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onCardHoverChange?.(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onCardHoverChange?.(false);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Manual step toggle on tap/click for mobile and power users
    if (effectiveStep === 1) {
      setInternalStep(2);
    } else if (effectiveStep === 2) {
      clearAllTimers();
      setInternalStep(3);
    } else {
      clearAllTimers();
      setInternalStep(2);
    }
  };

  const questionWords = item.question.split(' ');
  const answerWords = item.fullAnswer.split(' ');

  const isExpanded = effectiveStep === 2 || effectiveStep === 3;

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative z-20 w-full flex justify-center items-end pb-3 sm:pb-4 pointer-events-none"
    >
      {/* 
        ========================================================================
        CALIBRATED FAQ GLASS PILL (FIGMA PHYSICAL SHADER RECONSTRUCTION):
        - Width: 370px, Height: 43px, Radius: 9999px
        - Frost: 0 (Pure clear glass with subtle 155deg reflection body sheen)
        - Light: 58° / 80% (Shifted primary specular rim -2px X, 1.5px Y)
        - Splay: 69 (Horizontal highlight flare on upper lip)
        - Dispersion: 64 (Cyan 140,220,255 top & Magenta 255,180,215 bottom fringing)
        - Refraction: 78 TIR Meniscus (Dark lensing shadow directed from left & right sides)
        - Depth: 17 (Ambient drop shadow elevation)
        - Contour Bevel + Sub-pixel perimeter rim
        ========================================================================
      */}
      <motion.div
        layout
        transition={{
          type: 'spring',
          stiffness: 190,
          damping: 25,
          mass: 0.9
        }}
        onClick={handleCardClick}
        whileTap={{ scale: 0.98 }}
        style={{
          borderRadius: isExpanded ? 24 : 9999,
          background: 'rgba(255, 255, 255, 0.22)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          boxShadow: 'none'
        }}
        className={`pointer-events-auto cursor-pointer relative overflow-hidden backdrop-blur-xl ${
          isExpanded
            ? 'w-[92%] sm:w-[370px] max-w-[370px] min-h-[142px] max-h-[168px] p-4 sm:p-5 flex flex-col items-center justify-center'
            : 'w-[90%] sm:w-[370px] max-w-[370px] h-[43px] px-6 flex items-center justify-center'
        }`}
      >

        {/* 
          PERSISTENT ELEV LOGO (Never unmounts, zero flicker/glitch):
          Glides seamlessly between center in Step 1 and top header in Step 2/3
        */}
        <motion.div
          layout="position"
          transition={{
            type: 'spring',
            stiffness: 190,
            damping: 25,
            mass: 0.9
          }}
          className={`flex items-center justify-center shrink-0 z-10 will-change-transform ${
            isExpanded ? 'w-full pt-0.5 mb-2' : 'w-full h-full'
          }`}
        >
          <img
            src="/elev-infinity-logo.png"
            alt="newseed"
            className="h-5 sm:h-5.5 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(0,102,255,0.4)] select-none pointer-events-none"
          />
        </motion.div>

        {/* Dynamic Content Morph: Only Question & Answer enter/exit */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              key="expanded-content-body"
              initial={{ opacity: 0, filter: 'blur(6px)', y: 6 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              exit={{
                opacity: 0,
                filter: 'blur(6px)',
                y: 6,
                transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] }
              }}
              transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
              className="w-full flex-1 flex items-center justify-center min-h-[76px] sm:min-h-[82px] relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {effectiveStep === 2 ? (
                  /* --------------------------------------------------------- */
                  /* STEP 2: STAGGERED WORD BLUR REVEAL FOR QUESTION           */
                  /* --------------------------------------------------------- */
                  <motion.div
                    key="step-2-question"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{
                      opacity: 0,
                      y: -6,
                      filter: 'blur(6px)',
                      transition: { duration: 0.24, ease: [0.23, 1, 0.32, 1] }
                    }}
                    transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                    className="w-full text-center px-1"
                  >
                    <p className="text-[13px] sm:text-[14px] font-medium text-white leading-[1.38] tracking-[-0.01em]">
                      {questionWords.map((word, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, filter: 'blur(8px)', y: 6 }}
                          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                          transition={{
                            duration: 0.38,
                            delay: 0.16 + i * 0.045,
                            ease: [0.23, 1, 0.32, 1]
                          }}
                          className="inline-block mr-1 will-change-[filter,opacity,transform]"
                        >
                          {word}
                        </motion.span>
                      ))}
                    </p>
                  </motion.div>
                ) : (
                  /* --------------------------------------------------------- */
                  /* STEP 3: STAGGERED BLUR REVEAL + AUTO-SCROLL CONTAINER     */
                  /* --------------------------------------------------------- */
                  <motion.div
                    key="step-3-answer"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{
                      opacity: 0,
                      y: -6,
                      filter: 'blur(6px)',
                      transition: { duration: 0.24, ease: [0.23, 1, 0.32, 1] }
                    }}
                    transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                    className="w-full h-full flex flex-col justify-center"
                  >
                    {/* 
                      Auto-Scroll Viewport:
                      - Fixed comfortable height
                      - Gradient mask so overflowing text fades gently at edges
                      - Zero scrollbars
                    */}
                    <div
                      ref={scrollContainerRef}
                      className="w-full max-h-[78px] sm:max-h-[84px] overflow-hidden relative px-1 py-0.5"
                      style={{
                        maskImage: hasOverflow
                          ? 'linear-gradient(to bottom, transparent 0%, black 8px, black calc(100% - 8px), transparent 100%)'
                          : undefined,
                        WebkitMaskImage: hasOverflow
                          ? 'linear-gradient(to bottom, transparent 0%, black 8px, black calc(100% - 8px), transparent 100%)'
                          : undefined
                      }}
                    >
                      <motion.div
                        ref={scrollContentRef}
                        animate={{ y: scrollY }}
                        transition={{
                          duration: scrollDuration,
                          ease: [0.25, 0.1, 0.25, 1]
                        }}
                        className="text-[12.5px] sm:text-[13px] font-normal text-white/95 text-center leading-[1.46] tracking-[-0.01em] will-change-transform"
                      >
                        {answerWords.map((word, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, filter: 'blur(8px)', y: 5 }}
                            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                            transition={{
                              duration: 0.3,
                              delay: 0.08 + i * 0.03,
                              ease: [0.23, 1, 0.32, 1]
                            }}
                            className="inline-block mr-1 will-change-[filter,opacity,transform]"
                          >
                            {word}
                          </motion.span>
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
