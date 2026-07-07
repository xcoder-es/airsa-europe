'use client';

import { useEffect, useState, type RefObject } from 'react';

export function useSvgDraw(ref: RefObject<SVGPathElement | null>): number {
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    try {
      const length = el.getTotalLength();
      setPathLength(Number.isFinite(length) ? length : 0);
    } catch {
      setPathLength(0);
    }
  }, [ref]);

  return pathLength;
}
