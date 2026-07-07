import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import * as THREE from 'three';

const mockCamera = {
  position: new THREE.Vector3(0, 0, 6),
  lookAt: vi.fn(),
};

vi.mock('@react-three/fiber', () => ({
  useThree: () => ({ camera: mockCamera }),
  useFrame: vi.fn((cb) => cb(undefined, 0.016)),
}));

import { useCameraZoom } from './useCameraZoom';

describe('useCameraZoom', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockCamera.position.set(0, 0, 6);
  });

  it('does not move camera when target is null', () => {
    const { result } = renderHook(() => useCameraZoom(null, 0));

    expect(result.current).toBeUndefined();
    expect(mockCamera.position.x).toBe(0);
  });

  it('does not move camera when target is undefined', () => {
    renderHook(() => useCameraZoom(undefined, 0));

    expect(mockCamera.position.x).toBe(0);
  });

  it('animates camera toward target when progress > 0', () => {
    renderHook(() => useCameraZoom([1, 0, 3], 0.5));

    expect(mockCamera.position.x).not.toBe(0);
    expect(mockCamera.lookAt).toHaveBeenCalled();
  });

  it('moves camera to destination at progress=1', () => {
    renderHook(() => useCameraZoom([1, 0, 3], 1));

    expect(mockCamera.position.x).not.toBe(0);
    expect(mockCamera.lookAt).toHaveBeenCalled();
  });

  it('does not crash with custom lerpSpeed', () => {
    renderHook(() => useCameraZoom([1, 0, 3], 0.5, { lerpSpeed: 5 }));

    expect(mockCamera.lookAt).toHaveBeenCalled();
  });
});
