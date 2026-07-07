'use client';

import { useEffect, useState, useRef, type RefObject } from 'react';
import { initScrollOrchestrator } from '@/lib/animation/orchestrator';

interface UseSceneProgressOptions {
  start?: string;
  end?: string;
}

export function useSceneProgress(
  ref: RefObject<HTMLElement | null>,
  options: UseSceneProgressOptions = {},
): number {
  const [progress, setProgress] = useState(0);
  const triggerRef = useRef<{ kill: () => void } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let cancelled = false;

    const init = async () => {
      const { ScrollTrigger } = await initScrollOrchestrator();
      if (cancelled) return;

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: options.start ?? 'top top',
        end: options.end ?? 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          if (!cancelled) setProgress(self.progress);
        },
      });

      triggerRef.current = trigger;
    };

    init();

    return () => {
      cancelled = true;
      triggerRef.current?.kill();
      triggerRef.current = null;
    };
  }, [ref, options.start, options.end]);

  return progress;
}
