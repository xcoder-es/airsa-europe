import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useSvgDraw } from './useSvgDraw';

function createMockPath(d?: string) {
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  if (d) path.setAttribute('d', d);
  Object.defineProperty(path, 'getTotalLength', {
    value: () => (d ? 120 : 0),
    writable: true,
  });
  return path;
}

describe('useSvgDraw', () => {
  it('returns 0 when ref is null', () => {
    const { result } = renderHook(() => useSvgDraw({ current: null }));
    expect(result.current).toBe(0);
  });

  it('returns path length for a valid path element', () => {
    const path = createMockPath('M10 10 L100 100');
    const ref = { current: path };
    const { result } = renderHook(() => useSvgDraw(ref));
    expect(result.current).toBe(120);
  });

  it('handles empty path gracefully', () => {
    const path = createMockPath();
    const ref = { current: path };
    const { result } = renderHook(() => useSvgDraw(ref));
    expect(result.current).toBe(0);
  });
});
