'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Earth } from '@/three/globe/earth';
import { Starfield } from '@/three/effects/starfield';
import { ConnectionLines } from '@/three/effects/connection-lines';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const Canvas = dynamic(() => import('@react-three/fiber').then((mod) => mod.Canvas), {
  ssr: false,
});

interface EarthCanvasProps {
  europeGlow?: number;
  africaGlow?: number;
  showConnections?: boolean;
  connectionProgress?: number;
  scrollOffset?: number;
  rotationSpeed?: number;
}

function SceneContent({
  europeGlow = 0,
  africaGlow = 0.3,
  showConnections = false,
  connectionProgress = 0,
  scrollOffset = 0,
  rotationSpeed = 0.05,
}: EarthCanvasProps) {
  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 3, 5]} intensity={0.4} />
      <Starfield scrollOffset={scrollOffset} />
      <Earth
        europeGlow={europeGlow}
        africaGlow={africaGlow}
        rotationSpeed={rotationSpeed}
      />
      {showConnections && <ConnectionLines progress={connectionProgress} />}
    </>
  );
}

function StaticFallback() {
  return (
    <div
      className="flex h-full w-full items-center justify-center"
      role="img"
      aria-label="Earth"
    >
      <div className="relative h-48 w-48 rounded-full bg-gradient-to-br from-[#1a2a4a] to-[#0a1628] shadow-[0_0_60px_rgba(59,130,246,0.2)]">
        <div className="absolute inset-0 rounded-full border border-white/5" />
      </div>
    </div>
  );
}

export function EarthCanvas(props: EarthCanvasProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <StaticFallback />;
  }

  return (
    <Suspense fallback={<StaticFallback />}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <SceneContent {...props} />
      </Canvas>
    </Suspense>
  );
}
