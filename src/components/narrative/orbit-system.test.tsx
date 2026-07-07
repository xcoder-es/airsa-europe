import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { OrbitSystem } from './orbit-system';

const sampleNodes = [
  { id: 'a', label: 'Alpha', color: '#60a5fa' },
  { id: 'b', label: 'Beta', color: '#34d399' },
  { id: 'c', label: 'Gamma', color: '#f472b6' },
];

describe('OrbitSystem', () => {
  it('renders center text correctly', () => {
    const { getAllByText } = render(
      <OrbitSystem centerText="Mission Statement" nodes={sampleNodes} progress={1} />,
    );
    expect(getAllByText('Mission Statement')).toHaveLength(2);
  });

  it('renders all orbital node labels', () => {
    const { getAllByText } = render(
      <OrbitSystem centerText="Mission" nodes={sampleNodes} progress={1} />,
    );
    expect(getAllByText('Alpha')).toHaveLength(2);
    expect(getAllByText('Beta')).toHaveLength(2);
    expect(getAllByText('Gamma')).toHaveLength(2);
  });

  it('renders subtitle when provided', () => {
    const { getAllByText } = render(
      <OrbitSystem
        centerText="Mission"
        nodes={sampleNodes}
        progress={1}
        subtitle="A shared horizon"
      />,
    );
    expect(getAllByText('A shared horizon')).toHaveLength(2);
  });

  it('applies correct aria-label', () => {
    const { getByLabelText } = render(
      <OrbitSystem centerText="Mission" nodes={sampleNodes} progress={0} />,
    );
    expect(getByLabelText('Mission orbital system')).toBeInTheDocument();
  });
});
