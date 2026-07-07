'use client';

import { useRef } from 'react';
import { useAtlas } from '@/three/globe/atlas';
import { StatementReveal } from '@/components/narrative/statement-reveal';
import { useSceneProgress } from '@/hooks/useSceneProgress';
import { usePinnedScene } from '@/lib/animation/use-pinned-scene';

export function Scene01CosmicIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useSceneProgress(sectionRef, {
    start: 'top top',
    end: 'bottom top',
  });
  const { update } = useAtlas();

  usePinnedScene(sectionRef);

  const showFirst = progress > 0.15;
  const showSecond = progress > 0.55;

  update({
    africaGlow: 0.3 + progress * 0.2,
    scrollOffset: progress,
    rotationSpeed: 0.04,
  });

  return (
    <section
      ref={sectionRef}
      id="scene-01"
      aria-label="Cosmic introduction"
      className="relative h-screen"
    >
      <div className="absolute inset-0 bg-black" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <StatementReveal
          visible={showFirst}
          className="font-display max-w-4xl text-[var(--text-display)] leading-[1.1] tracking-[-0.02em] text-[var(--color-text-primary)]"
        >
          Africa is not the future.
        </StatementReveal>

        <StatementReveal
          visible={showSecond}
          delay={0.2}
          className="font-display mt-6 max-w-4xl text-[var(--text-display)] leading-[1.1] tracking-[-0.02em] text-[var(--color-accent-bright)]"
        >
          Africa is already building it.
        </StatementReveal>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div
          className="h-8 w-px bg-gradient-to-b from-transparent to-white/30"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
