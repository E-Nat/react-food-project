import { useEffect, useRef } from 'react';

/**
 * Custom hook for smooth scroll reveal animations.
 * Observes DOM elements with '.reveal-on-scroll' or the returned ref.
 * Automatically adds 'is-revealed' class once it enters the viewport.
 * Respects user's 'prefers-reduced-motion' preference.
 */
export const useScrollReveal = (options = {}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        el.classList.add('is-revealed');
      });
      if (elementRef.current) {
        elementRef.current.classList.add('is-revealed');
      }
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px 0px -50px 0px',
      }
    );

    // Observe ref if attached
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    // Also auto-observe all .reveal-on-scroll elements across the DOM
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [options.threshold, options.rootMargin]);

  return elementRef;
};

export default useScrollReveal;
