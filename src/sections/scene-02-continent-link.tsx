'use client';

import { useRef, useEffect } from 'react';
import { useAtlas } from '@/three/globe/atlas';
import { useSceneProgress } from '@/hooks/useSceneProgress';
import { usePinnedScene } from '@/lib/animation/use-pinned-scene';

export function Scene02ContinentLink() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useSceneProgress(sectionRef, {
    start: 'top top',
    end: 'bottom top',
  });
  const { update } = useAtlas();

  usePinnedScene(sectionRef, '+=250%');

  const europeGlow = Math.min(1, progress * 1.5);
  const connectionProgress = Math.max(0, (progress - 0.3) / 0.7);

  useEffect(() => {
    update({
      europeGlow,
      africaGlow: 0.5,
      showConnections: true,
      connectionProgress,
      rotationSpeed: 0.03,
    });
  }, [europeGlow, connectionProgress, update]);

  return (
    <section
      ref={sectionRef}
      id="scene-02"
      aria-label="Europe and Africa connection"
      className="relative h-screen"
    >
      <div className="absolute inset-0 bg-black" />

      <div className="relative z-10 flex h-full items-end justify-center pb-24">
        <p
          className="text-sm tracking-[0.2em] text-[var(--color-text-muted)] uppercase transition-opacity duration-700"
          style={{ opacity: progress > 0.7 ? 0.6 : 0 }}
          aria-hidden={progress <= 0.7}
        >
          Two continents. One horizon.
        </p>
      </div>
    </section>
  );
}
