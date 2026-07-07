import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('@/hooks/useSceneProgress', () => ({
  useSceneProgress: () => 0,
}));

import { Scene06NorthStar } from './scene-06-north-star';

describe('Scene06NorthStar', () => {
  it('renders a section with correct id and aria-label', () => {
    const { container } = render(<Scene06NorthStar />);
    const section = container.querySelector('section#scene-06');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('aria-label', 'North Star mission');
  });

  it('renders center mission text', () => {
    const { getAllByText } = render(<Scene06NorthStar />);
    expect(getAllByText('Building the Africa-Europe AI Corridor.')).toHaveLength(2);
  });

  it('renders gradient overlay', () => {
    const { container } = render(<Scene06NorthStar />);
    const overlay = container.querySelector('[aria-hidden="true"]');
    expect(overlay).toBeInTheDocument();
  });
});
