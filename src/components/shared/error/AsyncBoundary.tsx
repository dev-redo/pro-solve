import React, { Suspense } from 'react';
import ErrorBoundary from './ErrorBoundary';

type ErrorBoundaryProps = React.ComponentProps<typeof ErrorBoundary>;

interface AsyncBoundaryProps extends Omit<ErrorBoundaryProps, 'renderFallback'> {
  pendingFallback: React.ComponentProps<typeof Suspense>['fallback'];
  rejectedFallback: ErrorBoundaryProps['renderFallback'];
  children: React.ReactNode;
}

const AsyncBoundary = ({ pendingFallback, rejectedFallback, children }: AsyncBoundaryProps) => {
  return (
    <ErrorBoundary renderFallback={rejectedFallback}>
      <Suspense fallback={pendingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default AsyncBoundary;
