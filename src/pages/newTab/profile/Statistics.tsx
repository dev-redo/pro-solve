import styled from 'styled-components';
import { uid } from 'react-uid';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import { levels, levelsColor } from '../../../constants/level';
import Chart from '../../../../assets/icons/Chart.svg';
import { ProblemCntType, DoughnutType, ChartInfo, ChartInfoList } from '../../../types/profile';
import '../../../styles/font.css';
import { BoxStyle, BoldTextStyle } from '../../../styles/global';
import { getPercentile } from '../../../utils/getPercentile';
import { Children } from '../../../types/global';
import { ContentHeaderInfoStyle } from '../../../styles/global';
import { STATIST_HEAD } from '../../../constants/profile';

interface StatisticsType {
  problemCnt: ProblemCntType;
  solvedLevelCnt: number[];
  chartInfoList: ChartInfoList;
}

export default function Statistics({ problemCnt, solvedLevelCnt, chartInfoList }: StatisticsType) {
  return (
    <BoxStyle>
      <Statistics.Header problemCnt={problemCnt} />
      <Statistics.Content>
        <Statistics.Doughnut problemCnt={problemCnt} solvedLevelCnt={solvedLevelCnt} />
        <Statistics.Table chartInfoList={chartInfoList} />
      </Statistics.Content>
    </BoxStyle>
  );
}

Statistics.Header = ({ problemCnt }: { problemCnt: ProblemCntType }) => {
  const { allCnt, solvedCnt } = problemCnt;
  return (
    <>
      <ContentHeaderInfoStyle>
        <Chart />
        <span>난이도 분포</span>
      </ContentHeaderInfoStyle>
      <SolvedHeaderStyle>
        <BoldTextStyle>{allCnt}</BoldTextStyle>
        <span>문제 중 </span>
        <BoldTextStyle>{solvedCnt}</BoldTextStyle>
        <span>문제 성공</span>
      </SolvedHeaderStyle>
    </>
  );
};

Statistics.Content = ({ children }: Children) => (
  <StatisticsContentStyle>{children}</StatisticsContentStyle>
);

Statistics.Doughnut = ({ problemCnt, solvedLevelCnt }: DoughnutType) => {
  const levelsName = levels.map(level => `Lv. ${level}`);
  const options = { maintainAspectRatio: false, responsive: false };
  const data = {
    labels: levelsName,
    datasets: [
      {
        labels: levelsName,
        data: solvedLevelCnt,
        backgroundColor: levelsColor,
        fill: true,
      },
    ],
  };

  const { allCnt, solvedCnt } = problemCnt;
  const [int, decimal] = getPercentile({ allCnt, solvedCnt }).split('.');
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
      <Doughnut data={data} width={350} height={350} options={options} />
    </DoughnutWrapperStyle>
  );
};

Statistics.Table = ({ chartInfoList }: { chartInfoList: ChartInfoList }) => {
  return (
    <TableStyle>
      <Statistics.TableHead />
      <Statistics.TableBody chartInfoList={chartInfoList} />
    </TableStyle>
  );
};

Statistics.TableHead = () => {
  return (
    <TableHeadStyle>
      <tr>
        {STATIST_HEAD.map((info, idx) => (
          <td key={uid(idx)}>{info}</td>
        ))}
      </tr>
    </TableHeadStyle>
  );
};

Statistics.TableBody = ({ chartInfoList }: { chartInfoList: ChartInfoList }) => {
  return (
    <TableBodyStyle>
      {chartInfoList.map((chart, idx) => (
        <Statistics.TableCell key={uid(idx)} chart={chart} />
      ))}
    </TableBodyStyle>
  );
};

Statistics.TableCell = ({ chart }: { chart: ChartInfo }) => {
  const { level, color, allCnt, solvedCnt } = chart;
  const [int, decimal] = getPercentile({ allCnt, solvedCnt }).split('.');
  const percentile = decimal === '0' ? `${int}` : `${int}.${decimal}`;

  return (
    <TableCellStyle color={color}>
      <td>
        <b>Lv. {level}</b>
      </td>
      <td>
        <span>{solvedCnt}</span>
      </td>
      <td>
        <span>{allCnt}</span>
      </td>
      <td>
        <span>{percentile}</span>
      </td>
    </TableCellStyle>
  );
};

const StatisticsContentStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 2rem;
  ${({ theme }) => theme.media.desktop`
    display:flex;
    flex-direction: column;
    gap: 5rem;
  `}
`;

const SolvedHeaderStyle = styled.div`
  padding: 0.75rem 0;
  font-size: 1.5rem;
`;

const DoughnutWrapperStyle = styled.div`
  position: relative;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem;
`;

const TableStyle = styled.table`
  width: 100%;
  min-width: 400px;
  height: 15rem;
  ${({ theme }) => theme.media.desktop`
    margin-bottom: 2rem;
  `}
`;

const TableHeadStyle = styled.thead`
  display: table-header-group;
  tr {
    display: table-row;
  }
  td {
    font-size: 1rem;
    font-family: 'Noto Sans KR';
    font-weight: 500;
    text-align: center;
    border-bottom: 1px solid #dddfe0;
    padding: 1rem;
  }
`;

const TableBodyStyle = styled.tbody`
  display: table-row-group;
  font-family: 'Noto Sans KR';
  font-size: 1.1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.color.darkGrey};
`;

const TableCellStyle = styled.tr`
  tr {
    display: table-row;
  }
  td {
    display: table-cell;
    vertical-align: middle;
    border-bottom: 1px solid #dddfe0;
    padding: 1rem;
    text-align: center;
  }
  b {
    color: ${({ color }) => color};
    font-weight: 700;
  }
`;

const CenterTextStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.5;
  font-family: 'Noto Sans KR';
  position: absolute;
  top: 57%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2.5rem;
  user-select: none;
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
  color: ${({ theme }) => theme.color.darkGrey};
`;
