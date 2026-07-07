'use client';

import { useMemo } from 'react';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

interface ConnectionLinesProps {
  progress?: number;
  pulse?: number;
}

const EUROPE: [number, number, number] = [0.8, 1.2, 1.2];
const AFRICA: [number, number, number] = [-0.3, -0.5, 1.5];

export function ConnectionLines({ progress = 0, pulse = 0 }: ConnectionLinesProps) {
  const points = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...EUROPE),
      new THREE.Vector3(0.25, 1.9, 1.35),
      new THREE.Vector3(...AFRICA),
    );
    return curve.getPoints(64).map((p) => [p.x, p.y, p.z] as [number, number, number]);
  }, []);

  const opacity = progress * 0.9 + pulse * 0.2;
  const glowOpacity = progress * 0.3 + pulse * 0.15;

  return (
    <group>
      <Line
        points={points}
        color="#60a5fa"
        transparent
        opacity={glowOpacity}
        lineWidth={2}
      />
      <Line points={points} color="#3b82f6" transparent opacity={opacity} lineWidth={1} />

      {progress > 0.5 && (
        <>
          <mesh position={EUROPE}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshBasicMaterial color="#60a5fa" />
          </mesh>
          <mesh position={AFRICA}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshBasicMaterial color="#3b82f6" />
          </mesh>
        </>
      )}
    </group>
  );
}
