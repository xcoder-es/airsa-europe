'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const DEFAULT_POSITION = new THREE.Vector3(0, 0, 6);
const TARGET_LOOK = new THREE.Vector3(0, 0, 0);

interface UseCameraZoomOptions {
  lerpSpeed?: number;
}

export function useCameraZoom(
  target: [number, number, number] | null | undefined,
  progress: number,
  options: UseCameraZoomOptions = {},
) {
  const { camera } = useThree();
  const currentTarget = useRef(new THREE.Vector3(...DEFAULT_POSITION));
  const { lerpSpeed = 2 } = options;

  useFrame((_, delta) => {
    if (!target) return;

    const destination = new THREE.Vector3(...target);

    const effectiveProgress = Math.max(0, Math.min(1, progress));
    const targetPos = new THREE.Vector3()
      .copy(DEFAULT_POSITION)
      .lerp(destination, effectiveProgress);

    currentTarget.current.lerp(targetPos, Math.min(1, lerpSpeed * delta));

    camera.position.copy(currentTarget.current);
    camera.lookAt(TARGET_LOOK);
  });
}
