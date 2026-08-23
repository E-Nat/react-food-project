import { useEffect, useRef } from 'react';

/**
 * Custom hook for smooth scroll reveal animations.
 * Observes DOM element and adds 'is-revealed' class once it enters the viewport.
 * Automatically respects user's 'prefers-reduced-motion' preference.
 */
export const useScrollReveal = (options = {}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      if (elementRef.current) {
        elementRef.current.classList.add('is-revealed');
      }
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          // Unobserve once revealed to save CPU
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: options.threshold || 0.12,
        rootMargin: options.rootMargin || '0px 0px -40px 0px',
      }
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
  }, [options.threshold, options.rootMargin]);

  return elementRef;
};

export default useScrollReveal;
