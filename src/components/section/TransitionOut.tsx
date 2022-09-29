import React from 'react';

export interface TransitionOutProps {
  isOpen: boolean;
  closeModal?: () => void;
  onCloseCallback?: () => void;
  children: React.ReactNode;
  duration?: number;
}

const TransitionOut = ({
  isOpen,
  closeModal,
  onCloseCallback,
  children,
  duration = 3000,
}: TransitionOutProps) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onCloseCallback?.();
      closeModal?.();
    }, duration);

    return () => timer && clearTimeout(timer);
  }, [isOpen]);

  return isOpen ? <>{children}</> : null;
};

export default TransitionOut;
