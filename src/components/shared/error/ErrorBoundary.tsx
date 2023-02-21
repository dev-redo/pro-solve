import React from 'react';

interface ErrorBoundaryProps {
  keys?: any;
  renderFallback: (args: { error: Error; reset: () => void }) => React.ReactNode;
  children: React.ReactNode;
}

const initialState = { error: null };

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  typeof initialState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = initialState;
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidUpdate(prev: ErrorBoundaryProps) {
    if (this.state.error === null) {
      return;
    }
    if (prev.keys !== this.props.keys) {
      this.resetErrorBoundary();
    }
  }

  resetErrorBoundary = () => {
    this.setState(initialState);
  };

  render() {
    const { children, renderFallback } = this.props;
    const { error } = this.state;

    if (error != null) {
      return renderFallback({
        error,
        reset: this.resetErrorBoundary,
      });
    }
    return children;
  }
}
