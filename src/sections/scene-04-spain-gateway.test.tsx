import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('@/hooks/useSceneProgress', () => ({
  useSceneProgress: () => 0,
}));

vi.mock('@/three/globe/earth-canvas', () => ({
  EarthCanvas: () => <div data-testid="earth-canvas" />,
}));

import { Scene04SpainGateway } from './scene-04-spain-gateway';

describe('Scene04SpainGateway', () => {
  it('renders a section with correct id and aria-label', () => {
    const { container } = render(<Scene04SpainGateway />);
    const section = container.querySelector('section#scene-04');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('aria-label', 'Spain Gateway');
  });

  it('renders EarthCanvas component', () => {
    const { getByTestId } = render(<Scene04SpainGateway />);
    expect(getByTestId('earth-canvas')).toBeInTheDocument();
  });

  it('renders first narrative text line', () => {
    const { getByText } = render(<Scene04SpainGateway />);
    expect(getByText('Spain is not just at the edge of Europe.')).toBeInTheDocument();
  });

  it('renders second narrative text line', () => {
    const { getByText } = render(<Scene04SpainGateway />);
    expect(getByText('It is the bridge between two worlds.')).toBeInTheDocument();
  });

  it('renders with gradient overlay', () => {
    const { container } = render(<Scene04SpainGateway />);
    const overlay = container.querySelector('[aria-hidden="true"]');
    expect(overlay).toBeInTheDocument();
  });
});
