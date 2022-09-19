import React from 'react';

interface ComponentProps {
  onClose: () => void;
  children: JSX.Element | JSX.Element[];
}

interface HookProps {
  ref: React.RefObject<HTMLDivElement>;
  onClose: () => void;
}

const CloseBoxOnOutside = ({ onClose, children }: ComponentProps) => {
  const useCloseBoxOnOutside = ({ ref, onClose }: HookProps) => {
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          onClose();
        }
      };

      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, [ref]);
  };

  const wrapRef = React.useRef<HTMLDivElement>(null);
  useCloseBoxOnOutside({ ref: wrapRef, onClose });

  return <div ref={wrapRef}>{children}</div>;
};

export default CloseBoxOnOutside;
