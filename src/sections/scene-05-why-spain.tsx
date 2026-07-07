'use client';

import { useRef, useEffect } from 'react';
import { StatementReveal } from '@/components/narrative/statement-reveal';
import { SvgPath } from '@/components/narrative/svg-path';
import { useSceneProgress } from '@/hooks/useSceneProgress';
import {
  EU_STARS_PATH,
  MEDITERRANEAN_ARC_PATH,
  DIASPORA_NODES_PATH,
} from '@/content/paths';
import { motionTokens } from '@/lib/animation/tokens';

const statements = [
  {
    text: "Europe's southernmost hub.",
    threshold: 0.15,
    path: EU_STARS_PATH,
    color: '#60a5fa',
  },
  {
    text: 'Three cultures meet here.',
    threshold: 0.4,
    path: MEDITERRANEAN_ARC_PATH,
    color: '#3b82f6',
  },
  {
    text: 'This is where continents connect.',
    threshold: 0.65,
    path: DIASPORA_NODES_PATH,
    color: '#93c5fd',
  },
];

function subProgress(progress: number, threshold: number): number {
  if (progress <= threshold) return 0;
  if (progress >= threshold + 0.25) return 1;
  return (progress - threshold) / 0.25;
}

export function Scene05WhySpain() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useSceneProgress(sectionRef, {
    start: 'top top',
    end: 'bottom top',
  });

  useEffect(() => {
    const init = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=300%',
        pin: true,
        pinSpacing: true,
      });
    };
    init();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="scene-05"
      aria-label="Why Spain"
      className="relative h-screen bg-black"
    >
      <div className="absolute inset-0 flex items-start justify-center pt-[10vh]">
        {statements.map((stmt) => {
          const pathProgress = subProgress(progress, stmt.threshold);
          const isVisible = progress > stmt.threshold - 0.05;

          return (
            <div
              key={stmt.text}
              className="absolute"
              style={{
                opacity: isVisible ? 1 : 0,
                transition: `opacity ${motionTokens.duration.medium}s ${motionTokens.ease.enter}`,
                pointerEvents: isVisible ? 'auto' : 'none',
              }}
            >
              <SvgPath
                d={stmt.path}
                progress={pathProgress}
                color={stmt.color}
                strokeWidth={2.5}
                width="40vw"
                height="40vh"
                viewBox="0 0 400 250"
              />
            </div>
          );
        })}
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-end pb-[15vh] px-6 text-center">
        {statements.map((stmt, idx) => (
          <StatementReveal
            key={stmt.text}
            visible={progress > stmt.threshold}
            delay={idx * 0.1}
            className={`font-display max-w-4xl leading-[1.15] tracking-[-0.02em] ${
              idx === statements.length - 1
                ? 'text-[var(--text-headline)] text-[var(--color-accent-bright)]'
                : 'text-[var(--text-headline)] text-[var(--color-text-primary)]'
            }`}
          >
            {stmt.text}
          </StatementReveal>
        ))}
      </div>

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"
        aria-hidden="true"
      />
    </section>
  );
}
