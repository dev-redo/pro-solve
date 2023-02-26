import React from 'react';
import { useWindowScroll, useWindowSize } from 'react-use';
import styled from 'styled-components';

type Props = {
  children: JSX.Element[];
  itemHeight: number;
  columnGap?: number;
  renderAhead?: number;
};

const REM_SIZE = 16;

const VirtualScroll = ({ children, itemHeight, columnGap = 0, renderAhead = 0 }: Props) => {
  const { y } = useWindowScroll();
  const { height } = useWindowSize();

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [viewportY, setViewportY] = React.useState<number>(0);
  const offsetY = (y - viewportY) / REM_SIZE;
  React.useEffect(() => {
    const viewportY = scrollRef.current?.getBoundingClientRect().y ?? 0;
    setViewportY(viewportY);
  }, []);

  const containerHeight = (itemHeight + columnGap) * children.length;

  const startIndex = Math.max(Math.floor(offsetY / (itemHeight + columnGap)) - renderAhead, 0);

  const endIndex = Math.min(
    Math.ceil(height / REM_SIZE / (itemHeight + columnGap) + startIndex) + renderAhead,
    children.length,
  );

  const visibleItem = children.slice(
    Math.max(startIndex, 0),
    Math.min(endIndex + 1, children.length),
  );

  const translateY = Math.max((itemHeight + columnGap) * startIndex, columnGap);

  return (
    <ContainerStyle containerHeight={containerHeight} ref={scrollRef}>
      <ContentStyle translateY={translateY}>{visibleItem}</ContentStyle>
    </ContainerStyle>
  );
};

const ContainerStyle = styled.div<{ containerHeight: number }>`
  width: 100%;
  height: ${props => props.containerHeight}rem;
  will-change: transform;
`;

const ContentStyle = styled.div<{ translateY: number }>`
  transform: translateY(${props => props.translateY}rem);
`;

export default VirtualScroll;
