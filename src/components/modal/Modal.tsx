import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import TransitionOut from '../section/TransitionOut';
import Portal from './Portal';

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  onCloseCallback?: () => void;
  children: JSX.Element | JSX.Element[];
}

const Modal: React.FC<ModalProps> = ({ isOpen, closeModal, onCloseCallback, children }) => {
  const child = React.useRef<React.ReactNode>(null);
  const childInstance = React.useMemo(() => {
    if (isOpen) {
      child.current = children;
    }
    return child.current;
  }, [children, isOpen]);

  return (
    <Portal>
      <TransitionOut isOpen={isOpen} closeModal={closeModal} onCloseCallback={onCloseCallback}>
        <ModalStyle isOpen={isOpen.toString()}>{childInstance}</ModalStyle>
      </TransitionOut>
    </Portal>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  to {
    opacity: 1;
    transform: translateZ(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 0;
    transform: translateZ(0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 100%, 0);
  }
`;

const ModalStyle = styled.div<{ isOpen: string }>`
  display: flex;
  justify-content: center;
  position: fixed;
  left: 50%;
  bottom: 2rem;
  z-index: 10000;
  animation: 300ms ${({ isOpen }) => (isOpen === 'true' ? fadeIn : fadeOut)} forwards;
  visibility: ${({ isOpen }) => (isOpen === 'true' ? 'visible' : 'hidden')};
`;

export default Modal;
