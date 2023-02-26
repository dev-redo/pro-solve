import React from 'react';
import styled, { keyframes } from 'styled-components';

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  animationDuration?: number;
}

const SkeletonUI = ({ width, height, borderRadius, animationDuration }: SkeletonProps) => {
  return (
    <SkeletonStyle
      width={width}
      height={height}
      borderRadius={borderRadius}
      animationDuration={animationDuration}
    />
  );
};

const SkeletonPulse = keyframes`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 1;
  }
`;

const SkeletonStyle = styled.div<SkeletonProps>`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '16px'};
  border-radius: ${({ borderRadius }) => borderRadius || '4px'};
  background-color: ${({ theme }) => theme.color.darkGrey};
  animation: ${SkeletonPulse} ${({ animationDuration }) => animationDuration || 1}s infinite
    ease-in-out;
`;

export default React.memo(SkeletonUI);
