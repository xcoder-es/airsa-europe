'use client';

import { useRef, useEffect } from 'react';
import { StatementReveal } from '@/components/narrative/statement-reveal';
import { useSceneProgress } from '@/hooks/useSceneProgress';

const statements = [
  { text: 'Europe has research.', threshold: 0.15 },
  { text: 'Africa has momentum.', threshold: 0.4 },
  {
    text: 'Together they create something neither can build alone.',
    threshold: 0.65,
  },
];

export function Scene03Thesis() {
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
      id="scene-03"
      aria-label="Strategic thesis"
      className="relative h-screen bg-black"
    >
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-8 px-6 text-center">
        {statements.map((stmt, i) => (
          <StatementReveal
            key={stmt.text}
            visible={progress > stmt.threshold}
            delay={i * 0.1}
            className={`font-display max-w-5xl leading-[1.15] tracking-[-0.02em] ${
              i === statements.length - 1
                ? 'text-[var(--text-headline)] text-[var(--color-accent-bright)]'
                : 'text-[var(--text-headline)] text-[var(--color-text-primary)]'
            }`}
          >
            {stmt.text}
          </StatementReveal>
        ))}
      </div>

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"
        aria-hidden="true"
      />
    </section>
  );
}
