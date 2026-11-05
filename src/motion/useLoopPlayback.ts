import { useCallback, useRef, useState, type RefObject } from 'react';
import usePrefersReducedMotion from './usePrefersReducedMotion';
import { useInView } from './useInView';

export const LOOP_CYCLES = 3;

/**
 * Gates an auto-playing loop. It runs only when the visitor has not asked for reduced motion,
 * the element is on screen, and fewer than `maxCycles` cycles have finished.
 * Call `endCycle()` at the end of each cycle: it returns false once the loop should stop.
 * `replay()` restarts it (bump `round` in a `key` to restart CSS animations too).
 */
export function useLoopPlayback(ref: RefObject<Element | null>, maxCycles = LOOP_CYCLES) {
  const reduced = usePrefersReducedMotion();
  const inView = useInView(ref);
  const [finished, setFinished] = useState(false);
  const [round, setRound] = useState(0);
  const cycles = useRef(0);

  const endCycle = useCallback(() => {
    cycles.current += 1;
    if (cycles.current >= maxCycles) {
      setFinished(true);
      return false;
    }
    return true;
  }, [maxCycles]);

  const replay = useCallback(() => {
    cycles.current = 0;
    setFinished(false);
    setRound((r) => r + 1);
  }, []);

  return { reduced, inView, finished, round, endCycle, replay, enabled: !reduced && inView && !finished };
}
