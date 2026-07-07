'use client';

import { useEffect, useState, type RefObject } from 'react';

interface UseSceneProgressOptions {
  start?: string;
  end?: string;
}

export function useSceneProgress(
  ref: RefObject<HTMLElement | null>,
  options: UseSceneProgressOptions = {},
): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let cleanup: (() => void) | undefined;

    const init = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: options.start ?? 'top top',
        end: options.end ?? 'bottom top',
        scrub: true,
        onUpdate: (self) => setProgress(self.progress),
      });

      cleanup = () => trigger.kill();
    };

    init();
    return () => cleanup?.();
  }, [ref, options.start, options.end]);

  return progress;
}
