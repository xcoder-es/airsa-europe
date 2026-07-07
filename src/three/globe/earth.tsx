'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface EarthProps {
  rotationSpeed?: number;
  europeGlow?: number;
  africaGlow?: number;
  madridGlow?: number;
  madridScale?: number;
  scale?: number;
}

export function Earth({
  rotationSpeed = 0.05,
  europeGlow = 0,
  africaGlow = 0.3,
  madridGlow = 0,
  madridScale = 1,
  scale = 1,
}: EarthProps) {
  const groupRef = useRef<THREE.Group>(null);
  const earthRef = useRef<THREE.Mesh>(null);
  const europeRef = useRef<THREE.Mesh>(null);
  const africaRef = useRef<THREE.Mesh>(null);
  const madridRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * rotationSpeed;
    }
    if (europeRef.current) {
      const mat = europeRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = europeGlow * 0.8;
    }
    if (africaRef.current) {
      const mat = africaRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0.2, africaGlow);
    }
    if (madridRef.current) {
      const mat = madridRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = madridGlow * 0.8;
      const baseScale = 0.35;
      const targetScale =
        baseScale + madridScale * 0.4 * (1 + Math.sin(Date.now() * 0.002) * 0.1);
      madridRef.current.scale.setScalar(targetScale / baseScale);
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          color="#0a1628"
          roughness={0.9}
          metalness={0.1}
          emissive="#1a2a4a"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Atmosphere glow */}
      <mesh scale={1.02}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Europe region highlight */}
      <mesh ref={europeRef} position={[0.8, 1.2, 1.2]} rotation={[0, 0, 0]}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0} />
      </mesh>

      {/* Africa region highlight */}
      <mesh ref={africaRef} position={[-0.3, -0.5, 1.5]}>
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.3} />
      </mesh>

      {/* Madrid highlight — Spain gateway zoom target */}
      <mesh ref={madridRef} position={[0.7, 0.9, 1.6]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0} />
      </mesh>
    </group>
  );
}
