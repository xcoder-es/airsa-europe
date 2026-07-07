import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SvgPath } from './svg-path';

vi.mock('@/hooks/useSvgDraw', () => ({
  useSvgDraw: () => 200,
}));

const samplePath = 'M10 10 L100 100 L190 10';

describe('SvgPath', () => {
  it('renders an SVG element with the correct d attribute', () => {
    const { container } = render(<SvgPath d={samplePath} progress={0} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-hidden', 'true');

    const path = container.querySelector('path');
    expect(path).toHaveAttribute('d', samplePath);
  });

  it('applies strokeDashoffset proportional to draw progress', () => {
    const { container } = render(<SvgPath d={samplePath} progress={0.5} />);
    const path = container.querySelector('path');
    const offset = path?.getAttribute('stroke-dashoffset');
    expect(offset).toBeDefined();
    expect(Number(offset)).toBe(100);
  });

  it('sets strokeDashoffset to 0 at progress 1', () => {
    const { container } = render(<SvgPath d={samplePath} progress={1} />);
    const path = container.querySelector('path');
    const offset = path?.getAttribute('stroke-dashoffset');
    expect(Number(offset)).toBe(0);
  });

  it('applies custom color and stroke width', () => {
    const { container } = render(
      <SvgPath d={samplePath} progress={1} color="#ff0000" strokeWidth={4} />,
    );
    const path = container.querySelector('path');
    expect(path).toHaveAttribute('stroke', '#ff0000');
    expect(path).toHaveAttribute('stroke-width', '4');
  });

  it('handles empty path string without error', () => {
    const { container } = render(<SvgPath d="" progress={0} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <SvgPath d={samplePath} progress={0} className="custom-path" />,
    );
    const svg = container.querySelector('svg.custom-path');
    expect(svg).toBeInTheDocument();
  });
});
