'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Earth } from '@/three/globe/earth';
import { Starfield } from '@/three/effects/starfield';
import { ConnectionLines } from '@/three/effects/connection-lines';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useAtlasSafe } from '@/three/globe/atlas';

const Canvas = dynamic(() => import('@react-three/fiber').then((mod) => mod.Canvas), {
  ssr: false,
});

interface EarthCanvasProps {
  europeGlow?: number;
  africaGlow?: number;
  madridGlow?: number;
  showConnections?: boolean;
  connectionProgress?: number;
  scrollOffset?: number;
  rotationSpeed?: number;
  cameraTarget?: [number, number, number];
}

function SceneContent(props: EarthCanvasProps) {
  const atlas = useAtlasSafe();

  const europeGlow = props.europeGlow ?? atlas?.state.europeGlow ?? 0;
  const africaGlow = props.africaGlow ?? atlas?.state.africaGlow ?? 0.3;
  const madridGlow = props.madridGlow ?? atlas?.state.madridGlow ?? 0;
  const showConnections = props.showConnections ?? atlas?.state.showConnections ?? false;
  const connectionProgress =
    props.connectionProgress ?? atlas?.state.connectionProgress ?? 0;
  const scrollOffset = props.scrollOffset ?? atlas?.state.scrollOffset ?? 0;
  const rotationSpeed = props.rotationSpeed ?? atlas?.state.rotationSpeed ?? 0.05;

  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 3, 5]} intensity={0.4} />
      <Starfield scrollOffset={scrollOffset} />
      <Earth
        europeGlow={europeGlow}
        africaGlow={africaGlow}
        madridGlow={madridGlow}
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
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <SceneContent {...props} />
        </Suspense>
      </Canvas>
    </Suspense>
  );
}
