'use client';

import { useMemo } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { OrbitSystemProps } from '@/types/orbit';

const RADIUS_X = 180;
const RADIUS_Y = 120;
const NODE_REVEAL_START = 0.3;
const NODE_REVEAL_DURATION = 0.2;
const CENTER_FADE_START = 0.1;

export function OrbitSystem({
  centerText,
  nodes,
  progress,
  subtitle,
  className = '',
}: OrbitSystemProps) {
  const reducedMotion = useReducedMotion();

  const centerVisible = progress > CENTER_FADE_START;
  const centerOpacity = reducedMotion
    ? centerVisible
      ? 1
      : 0
    : Math.min(1, (progress - CENTER_FADE_START) / 0.15);

  const rotationAngle = useMemo(() => {
    if (reducedMotion) return 0;
    return (progress - 0.3) * 360 * 1.5;
  }, [progress, reducedMotion]);

  return (
    <div
      className={`relative flex min-h-[500px] w-full items-center justify-center ${className}`}
      role="region"
      aria-label="Mission orbital system"
    >
      {/* Orbital layout — hidden on mobile, visible on md+ */}
      <div className="hidden md:relative md:flex md:h-[400px] md:w-[400px] md:items-center md:justify-center">
        {/* Orbit ellipse path */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="-200 -200 400 400"
          aria-hidden="true"
        >
          <ellipse
            cx="0"
            cy="0"
            rx={RADIUS_X}
            ry={RADIUS_Y}
            fill="none"
            stroke="rgba(96, 165, 250, 0.15)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        </svg>

        {/* Orbital nodes */}
        {nodes.map((node, index) => {
          const baseAngle = (index / nodes.length) * Math.PI * 2;
          const angle = baseAngle + (rotationAngle * Math.PI) / 180;
          const x = Math.cos(angle) * RADIUS_X;
          const y = Math.sin(angle) * RADIUS_Y;

          const revealStart = NODE_REVEAL_START + index * 0.1;
          const nodeProgress = Math.max(
            0,
            Math.min(1, (progress - revealStart) / NODE_REVEAL_DURATION),
          );
          const nodeOpacity = reducedMotion
            ? progress > revealStart
              ? 1
              : 0
            : nodeProgress;
          const nodeScale = reducedMotion ? 1 : 0.5 + nodeProgress * 0.5;

          return (
            <div
              key={node.id}
              className="absolute flex flex-col items-center"
              style={{
                transform: `translate(${x}px, ${y}px) scale(${nodeScale})`,
                opacity: nodeOpacity,
                transition: reducedMotion ? 'opacity 300ms ease' : 'none',
              }}
            >
              <div
                className="flex h-3 w-3 rounded-full"
                style={{ backgroundColor: node.color ?? '#60a5fa' }}
                aria-hidden="true"
              />
              <span
                className="mt-2 whitespace-nowrap text-sm font-medium tracking-wide text-[var(--color-text-secondary)]"
                style={{ color: node.color ?? undefined }}
              >
                {node.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Center text */}
      <div
        className="absolute z-10 max-w-xs text-center transition-opacity duration-700 md:max-w-sm"
        style={{ opacity: centerOpacity }}
      >
        <p className="font-display text-[var(--text-headline)] leading-tight tracking-[-0.02em] text-[var(--color-text-primary)]">
          {centerText}
        </p>
        {subtitle && (
          <p className="mt-4 text-sm tracking-[0.15em] text-[var(--color-text-muted)] uppercase">
            {subtitle}
          </p>
        )}
      </div>

      {/* Mobile layout — stacked vertically */}
      <div className="flex flex-col items-center gap-6 px-6 md:hidden">
        <p className="font-display text-center text-[var(--text-headline)] leading-tight tracking-[-0.02em] text-[var(--color-text-primary)]">
          {centerText}
        </p>
        {subtitle && (
          <p className="text-center text-sm tracking-[0.15em] text-[var(--color-text-muted)] uppercase">
            {subtitle}
          </p>
        )}
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          {nodes.map((node) => (
            <div
              key={node.id}
              className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2"
            >
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: node.color ?? '#60a5fa' }}
                aria-hidden="true"
              />
              <span
                className="text-sm text-[var(--color-text-secondary)]"
                style={{ color: node.color ?? undefined }}
              >
                {node.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
