'use client';
import { useState, useEffect, useRef, RefObject } from 'react';

/**
 * Observes a DOM element and returns true once it enters the viewport.
 * Fires once then unobserves.
 *
 * NOTE: Do NOT pass an inline object literal as `options` — it will be a new
 * reference on every render and cause the effect to re-run on every tick.
 * Either pass a stable reference (module-level const) or use the default.
 */
export function useIntersection<T extends HTMLElement>(
  threshold = 0.1,
  rootMargin = '0px',
): [RefObject<T | null>, boolean] {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, isIntersecting];
}
