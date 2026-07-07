'use client';

import { useEffect, useRef, type RefObject } from 'react';
import { initScrollOrchestrator } from '@/lib/animation/orchestrator';

export function usePinnedScene(
  sectionRef: RefObject<HTMLElement | null>,
  scrollHeight: string = '+=300%',
) {
  const triggerRef = useRef<{ kill: () => void } | null>(null);

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      const { ScrollTrigger } = await initScrollOrchestrator();
      if (cancelled || !sectionRef.current) return;

      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: scrollHeight,
        pin: true,
        pinSpacing: true,
      });

      triggerRef.current = trigger;
    };

    init();

    return () => {
      cancelled = true;
      triggerRef.current?.kill();
      triggerRef.current = null;
    };
  }, [sectionRef, scrollHeight]);
}
