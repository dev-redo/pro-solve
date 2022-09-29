import React from 'react';
import { createPortal } from 'react-dom';

type Props = {
  children: JSX.Element | JSX.Element[];
  domNode?: HTMLElement;
};

const Portal = ({ children, domNode = document.body }: Props) => {
  const [mount, setMount] = React.useState(false);
  const body = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    body.current = domNode;
    setMount(true);
  }, [domNode]);

  if (mount) {
    return createPortal(children, body.current!);
  }
  return null;
};

export default Portal;
