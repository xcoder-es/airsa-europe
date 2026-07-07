'use client';

import { useRef } from 'react';
import { OrbitSystem } from '@/components/narrative/orbit-system';
import { StatementReveal } from '@/components/narrative/statement-reveal';
import { useSceneProgress } from '@/hooks/useSceneProgress';
import { usePinnedScene } from '@/lib/animation/use-pinned-scene';

const pillars = [
  { id: 'research', label: 'Research', color: '#60a5fa' },
  { id: 'innovation', label: 'Innovation', color: '#34d399' },
  { id: 'community', label: 'Community', color: '#f472b6' },
  { id: 'partnerships', label: 'Partnerships', color: '#fbbf24' },
];

export function Scene06NorthStar() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useSceneProgress(sectionRef, {
    start: 'top top',
    end: 'bottom top',
  });

  usePinnedScene(sectionRef);

  const showSubtitle = progress > 0.75;

  return (
    <section
      ref={sectionRef}
      id="scene-06"
      aria-label="North Star mission"
      className="relative h-screen bg-black"
    >
      <div className="flex h-full flex-col items-center justify-center px-6">
        <OrbitSystem
          centerText="Building the Africa-Europe AI Corridor."
          subtitle="A shared horizon for two continents."
          nodes={pillars}
          progress={progress}
        />

        <div className="mt-8">
          <StatementReveal
            visible={showSubtitle}
            delay={0.3}
            className="max-w-2xl text-center text-sm tracking-[0.2em] text-[var(--color-text-secondary)] uppercase"
          >
            A shared horizon for two continents.
          </StatementReveal>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60"
        aria-hidden="true"
      />
    </section>
  );
}
