'use client';
import { useState, useEffect } from 'react';

export function useCountUp(end: number, duration: number = 2000, trigger: boolean = true) {
  // Initialize to 'end' so the SSR markup contains the final number for crawlers
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!trigger) return;
    if (hasStarted) return;
    setHasStarted(true);

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // easeOutQuart
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeProgress * end));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [end, duration, trigger, hasStarted]);

  return count;
}
