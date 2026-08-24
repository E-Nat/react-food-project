import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for smooth animated number counting when an element enters viewport.
 * @param {number} targetNumber - Target number to count up to (e.g. 10, 50, 4.9, 15)
 * @param {number} durationMs - Duration of count up animation in ms
 * @param {boolean} isDecimal - Whether to format as decimal (e.g. 4.9)
 */
export const useCountUp = (targetNumber, durationMs = 1800, isDecimal = false) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCount(targetNumber);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime = null;

          const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / durationMs, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = isDecimal 
              ? parseFloat((targetNumber * easeProgress).toFixed(1))
              : Math.floor(targetNumber * easeProgress);

            setCount(currentVal);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(targetNumber);
            }
          };

          requestAnimationFrame(animate);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.25 }
    );

    const currentEl = elementRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, [targetNumber, durationMs, isDecimal, hasAnimated]);

  return { count, elementRef };
};

export default useCountUp;
