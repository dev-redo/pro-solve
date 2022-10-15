import styled, { keyframes } from 'styled-components';
import '../../styles/font.css';
import { theme } from '../../styles/theme';

type DonutChartType = {
  color: string;
  percent: number;
  size: string;
};

const DonutChart = ({ color, percent, size }: DonutChartType) => {
  return (
    <ChartStyle size={size}>
      <AniSvgStyle viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke={theme.color.grayishWhite}
          strokeWidth="10"
        />
        <AnimatedCircleStyle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={`${2 * Math.PI * 90 * percent} ${2 * Math.PI * 90 * (1 - percent)}`}
          strokeDashoffset={2 * Math.PI * 90 * 0.25}
        />
      </AniSvgStyle>
      <SolvedStyle>
        <InfoStyle>
          <span>{percent * 100}</span>
          <span>%</span>
        </InfoStyle>
        <SuccessStyle>성공</SuccessStyle>
      </SolvedStyle>
    </ChartStyle>
  );
};

type SizeType = {
  size: string;
};
const ChartStyle = styled.div<SizeType>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  position: relative;
  padding: 10px;
`;

const AniSvgStyle = styled.svg`
  position: relative;
`;

const circleFill = keyframes`
  0%{
    stroke-dasharray:0 ${2 * Math.PI * 90};
  }
`;

const AnimatedCircleStyle = styled.circle`
  animation: ${circleFill} 2s ease;
`;

const SolvedStyle = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 35%;
  left: 50%;
  -webkit-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
  text-align: center;
  font-family: 'Nanum Gothic', sans-serif;
`;

const InfoStyle = styled.span`
  margin-bottom: 0.4rem;
  color: ${({ theme }) => theme.color.black};
  span:first-child {
    font-weight: 700;
    font-size: 1.5rem;
  }
  span:last-child {
    font-size: 0.75rem;
    font-weight: 300;
  }
`;

const SuccessStyle = styled.span`
  font-size: 0.75rem;
  font-weight: 300;
  color: ${({ theme }) => theme.color.darkGrey};
`;

export default DonutChart;
