import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('@/hooks/useSceneProgress', () => ({
  useSceneProgress: () => 0,
}));

import { Scene05WhySpain } from './scene-05-why-spain';

describe('Scene05WhySpain', () => {
  it('renders a section with correct id and aria-label', () => {
    const { container } = render(<Scene05WhySpain />);
    const section = container.querySelector('section#scene-05');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('aria-label', 'Why Spain');
  });

  it('renders all three narrative statements', () => {
    const { getByText } = render(<Scene05WhySpain />);
    expect(getByText("Europe's southernmost hub.")).toBeInTheDocument();
    expect(getByText('Three cultures meet here.')).toBeInTheDocument();
    expect(getByText('This is where continents connect.')).toBeInTheDocument();
  });

  it('renders gradient overlay', () => {
    const { container } = render(<Scene05WhySpain />);
    const overlay = container.querySelector('[aria-hidden="true"]');
    expect(overlay).toBeInTheDocument();
  });
});
