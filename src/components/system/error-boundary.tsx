'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Experience error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div
            role="alert"
            className="flex min-h-screen items-center justify-center bg-black px-6 text-center"
          >
            <div>
              <p className="font-display text-2xl text-white/90">Something went wrong.</p>
              <p className="mt-4 text-white/50">
                Please refresh the page to continue the experience.
              </p>
            </div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
