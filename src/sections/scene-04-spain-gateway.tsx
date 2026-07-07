'use client';

import { useRef } from 'react';
import { useAtlas } from '@/three/globe/atlas';
import { StatementReveal } from '@/components/narrative/statement-reveal';
import { useSceneProgress } from '@/hooks/useSceneProgress';
import { usePinnedScene } from '@/lib/animation/use-pinned-scene';

export function Scene04SpainGateway() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useSceneProgress(sectionRef, {
    start: 'top top',
    end: 'bottom top',
  });
  const { update } = useAtlas();

  usePinnedScene(sectionRef);

  const madridGlow = Math.min(1, progress * 1.2);
  const showFirstText = progress > 0.2;
  const showSecondText = progress > 0.5;

  update({
    madridGlow,
    scrollOffset: progress,
    rotationSpeed: 0.02,
  });

  return (
    <section
      ref={sectionRef}
      id="scene-04"
      aria-label="Spain Gateway"
      className="relative h-screen"
    >
      <div className="absolute inset-0 bg-black" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <StatementReveal
          visible={showFirstText}
          className="font-display max-w-4xl text-[var(--text-display)] leading-[1.1] tracking-[-0.02em] text-[var(--color-text-primary)]"
        >
          Spain is not just at the edge of Europe.
        </StatementReveal>

        <StatementReveal
          visible={showSecondText}
          delay={0.2}
          className="font-display mt-6 max-w-4xl text-[var(--text-display)] leading-[1.1] tracking-[-0.02em] text-[var(--color-accent-bright)]"
        >
          It is the bridge between two worlds.
        </StatementReveal>
      </div>

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80"
        aria-hidden="true"
      />
    </section>
  );
}
