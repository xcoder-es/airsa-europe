'use client';

import { useRef, useEffect } from 'react';
import { EarthCanvas } from '@/three/globe/earth-canvas';
import { StatementReveal } from '@/components/narrative/statement-reveal';
import { useSceneProgress } from '@/hooks/useSceneProgress';

export function Scene04SpainGateway() {
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

  const madridGlow = Math.min(1, progress * 1.2);
  const showFirstText = progress > 0.2;
  const showSecondText = progress > 0.5;

  return (
    <section
      ref={sectionRef}
      id="scene-04"
      aria-label="Spain Gateway"
      className="relative h-screen"
    >
      <div className="absolute inset-0 bg-black" />

      <div className="absolute inset-0">
        <EarthCanvas
          madridGlow={madridGlow}
          cameraTarget={[0.5, 0.3, 3.5]}
          scrollOffset={progress}
          rotationSpeed={0.02}
        />
      </div>

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
