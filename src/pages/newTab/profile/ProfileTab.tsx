import styled from 'styled-components';
import { uid } from 'react-uid';
import LogoWhite from '../../../../assets/images/logo-white.png';
import { HeaderStyle } from '../../../styles/global';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import { level, levelColor } from '../../../constants/level';
import '../../../styles/font.css';

export default function ProfileTab({ children }: { children: JSX.Element | JSX.Element[] }) {
  return <ContainerStyle>{children}</ContainerStyle>;
}

ProfileTab.Header = () => {
  return (
    <HeaderStyle>
      <img src={LogoWhite} />
      <div>
        <span>성공한 문제 정보</span>
      </div>
    </HeaderStyle>
  );
};

ProfileTab.Statistics = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return <BoxStyle>{children}</BoxStyle>;
};

type DoughnutType = {
  problemCnt: {
    allCnt: number;
    solvedCnt: number;
  };
  solvedLevelCnt: number[];
};

ProfileTab.Doughnut = ({ problemCnt, solvedLevelCnt }: DoughnutType) => {
  const data = {
    labels: level,
    datasets: [
      {
        labels: level,
        data: solvedLevelCnt,
        backgroundColor: levelColor,
        fill: true,
      },
    ],
  };

  const { allCnt, solvedCnt } = problemCnt;
  const [int, decimal] = String(((solvedCnt / allCnt) * 100).toFixed(1)).split('.');
  return (
    <DoughnutWrapperStyle>
      <CenterTextStyle>
        <ProblemCntStyle>{solvedCnt}</ProblemCntStyle>
        <ProblemPercentStyle>
          <span>{int}</span>
          <span>{decimal === '0' ? '' : `.${decimal}`}%</span>
        </ProblemPercentStyle>
        <SolvedStyle>문제 성공</SolvedStyle>
      </CenterTextStyle>
      <Doughnut data={data} width={400} height={400} options={{ maintainAspectRatio: false }} />
    </DoughnutWrapperStyle>
  );
};

const ContainerStyle = styled.div`
  height: 100vh;
  background-color: #f7f8fa;
`;

const BoxStyle = styled.div`
  margin: 4.813rem;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: 0 0 #0000, 0 0 #0000, 0px 1px 3px rgba(0, 0, 0, 0.04),
    0px 6px 16px rgba(0, 0, 0, 0.12);
  border-radius: 0.5rem;
`;

const DoughnutWrapperStyle = styled.div`
  position: relative;
`;

const CenterTextStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.5;
  font-family: 'NotoSansCJKkr';
  position: absolute;
  top: 52%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  &:not(:hover) {
    div:first-child {
      display: inline-block;
    }
    div:nth-child(2) {
      display: none;
    }
  }
  &:hover {
    div:first-child {
      display: none;
    }
    div:nth-child(2) {
      display: inline-block;
    }
  }
`;

const ProblemCntStyle = styled.div`
  font-weight: 500;
`;

const ProblemPercentStyle = styled.div`
  font-weight: 500;
  span:last-child {
    font-size: 1.2rem;
    font-weight: 400;
  }
`;

const SolvedStyle = styled.span`
  font-size: 1rem;
  font-weight: 400;
`;
