'use client';

import { useRef, useEffect } from 'react';
import { EarthCanvas } from '@/three/globe/earth-canvas';
import { useSceneProgress } from '@/hooks/useSceneProgress';
import { useAtlas } from '@/three/globe/atlas';

export function Scene02ContinentLink() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useSceneProgress(sectionRef, {
    start: 'top top',
    end: 'bottom top',
  });
  const { update } = useAtlas();

  useEffect(() => {
    const init = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=250%',
        pin: true,
        pinSpacing: true,
      });
    };
    init();
  }, []);

  const europeGlow = Math.min(1, progress * 1.5);
  const connectionProgress = Math.max(0, (progress - 0.3) / 0.7);

  useEffect(() => {
    update({ europeGlow, connectionProgress });
  }, [europeGlow, connectionProgress, update]);

  return (
    <section
      ref={sectionRef}
      id="scene-02"
      aria-label="Europe and Africa connection"
      className="relative h-screen"
    >
      <div className="absolute inset-0 bg-black" />

      <div className="absolute inset-0">
        <EarthCanvas
          europeGlow={europeGlow}
          africaGlow={0.5}
          showConnections
          connectionProgress={connectionProgress}
          rotationSpeed={0.03}
        />
      </div>

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
