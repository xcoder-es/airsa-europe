'use client';

import { useRef } from 'react';
import { useSvgDraw } from '@/hooks/useSvgDraw';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface SvgPathProps {
  d: string;
  progress: number;
  color?: string;
  strokeWidth?: number;
  fill?: string;
  className?: string;
  viewBox?: string;
  width?: string | number;
  height?: string | number;
}

export function SvgPath({
  d,
  progress,
  color = '#60a5fa',
  strokeWidth = 2,
  fill = 'none',
  className = '',
  viewBox = '0 0 400 300',
  width = '100%',
  height = '100%',
}: SvgPathProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const pathLength = useSvgDraw(pathRef);
  const reducedMotion = useReducedMotion();

  const clampedProgress = Math.max(0, Math.min(1, progress));

  const drawOffset = reducedMotion ? 0 : pathLength * (1 - clampedProgress);
  const opacity = reducedMotion
    ? clampedProgress > 0
      ? 1
      : 0
    : Math.min(1, clampedProgress / 0.15);

  return (
    <svg
      className={className}
      viewBox={viewBox}
      width={width}
      height={height}
      aria-hidden="true"
      role="img"
    >
      <path
        ref={pathRef}
        d={d}
        fill={fill}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={pathLength}
        strokeDashoffset={drawOffset}
        opacity={opacity}
        style={{
          transition: reducedMotion ? 'opacity 150ms' : 'none',
        }}
      />
    </svg>
  );
}
