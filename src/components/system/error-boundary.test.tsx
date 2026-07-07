import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ErrorBoundary } from './error-boundary';

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <p>Child content</p>
      </ErrorBoundary>,
    );

    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('renders default fallback when a child throws', () => {
    const ThrowingComponent = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
  });
});
