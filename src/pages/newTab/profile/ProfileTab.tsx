import styled from 'styled-components';
import { uid } from 'react-uid';
import LogoWhite from '../../../../assets/images/logo-white.png';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import { levels, levelsColor } from '../../../constants/level';
import Chart from '../../../../assets/icons/Chart.svg';
import {
  ProblemType,
  SolvedProblemType,
  ProblemsCntType,
  ProblemCntType,
  DoughnutType,
  ChartInfo,
  ChartInfoList,
  NavType,
} from '../../../types/profile';
import '../../../styles/font.css';
import { HeaderStyle } from '../../../styles/global';
import { BoldTextStyle } from '../../../styles/global';
import { getPercentile } from '../../../utils/getPercentile';
import { NAV_LIST, NAV_TYPE } from '../../../constants/profile';
import { useRecoilState } from 'recoil';
import { navOption } from '../../../store/profile';

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

ProfileTab.Nav = () => {
  return (
    <NavStyle>
      {NAV_LIST.map((item, idx) => (
        <ProfileTab.NavItem key={uid(idx)} item={item} />
      ))}
    </NavStyle>
  );
};

ProfileTab.NavItem = ({ item }: { item: string }) => {
  const [selectedItem, setSelectedItem] = useRecoilState(navOption);
  const itemName = (NAV_TYPE as NavType)[item];
  const onChangeOption = () => setSelectedItem(item);

  return (
    <NavItemStyle selected={selectedItem === item} onClick={onChangeOption}>
      {itemName}
    </NavItemStyle>
  );
};

ProfileTab.Statistics = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return <BoxStyle>{children}</BoxStyle>;
};

ProfileTab.StatisticsHeader = ({ problemCnt }: { problemCnt: ProblemCntType }) => {
  const { allCnt, solvedCnt } = problemCnt;
  return (
    <StatisticsHeaderStyle>
      <ChartHeaderStyle>
        <Chart />
        <span>난이도 분포</span>
      </ChartHeaderStyle>
      <SolvedHeaderStyle>
        <BoldTextStyle>{allCnt}</BoldTextStyle>
        <span>문제 중 </span>
        <BoldTextStyle>{solvedCnt}</BoldTextStyle>
        <span>문제 성공</span>
      </SolvedHeaderStyle>
    </StatisticsHeaderStyle>
  );
};

ProfileTab.StatisticsContent = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
  <StatisticsContentStyle>{children}</StatisticsContentStyle>
);

ProfileTab.Doughnut = ({ problemCnt, solvedLevelCnt }: DoughnutType) => {
  const options = { maintainAspectRatio: false, responsive: false };
  const data = {
    labels: levels,
    datasets: [
      {
        labels: levels,
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

ProfileTab.Table = ({ chartInfoList }: { chartInfoList: ChartInfoList }) => {
  return (
    <TableStyle>
      <ProfileTab.TableHead />
      <ProfileTab.TableBody chartInfoList={chartInfoList} />
    </TableStyle>
  );
};

ProfileTab.TableHead = () => {
  const headInfo = ['레벨', '푼 문제', '전체 문제', '백분위'];

  return (
    <TableHeadStyle>
      <tr>
        {headInfo.map((info, idx) => (
          <td key={uid(idx)}>{info}</td>
        ))}
      </tr>
    </TableHeadStyle>
  );
};

ProfileTab.TableBody = ({ chartInfoList }: { chartInfoList: ChartInfoList }) => {
  return (
    <TableBodyStyle>
      {chartInfoList.map((chart, idx) => (
        <ProfileTab.TableCell key={uid(idx)} chart={chart} />
      ))}
    </TableBodyStyle>
  );
};

ProfileTab.TableCell = ({ chart }: { chart: ChartInfo }) => {
  const { level, color, allCnt, solvedCnt } = chart;
  const [int, decimal] = getPercentile({ allCnt, solvedCnt }).split('.');
  const percentile = decimal === '0' ? `${int}` : `${int}.${decimal}`;

  return (
    <TableCellStyle color={color}>
      <td>
        <b>{level}</b>
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

ProfileTab.Footer = () => {
  return <FooterStyle />;
};

const ContainerStyle = styled.div`
  background-color: #f7f8fa;
  min-width: 768px;
`;

const NavStyle = styled.nav`
  display: flex;
  width: 100%;
  border-bottom: 2px solid ${({ theme }) => theme.color.grey};
  padding: 0 2rem;
  margin-top: 0.5rem;
  font-family: 'NotoSansCJKkr';
  font-size: 1.1rem;
  cursor: pointer;
`;

const NavItemStyle = styled.span<{ selected: boolean }>`
  padding: 1rem 2.5rem;
  font-weight: 300;
  padding: 1rem 2.5rem;
  font-weight: ${({ selected }) => (selected ? 500 : 300)};
  border-bottom: ${({ selected }) => selected && '2px solid black'};
`;

const BoxStyle = styled.div`
  margin: 2rem;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: 0 0 #0000, 0 0 #0000, 0px 1px 3px rgba(0, 0, 0, 0.04),
    0px 6px 16px rgba(0, 0, 0, 0.12);
  border-radius: 0.5rem;
`;

const StatisticsHeaderStyle = styled.div`
  font-family: 'NotoSansCJKkr';
  padding: 1rem;
`;

const ChartHeaderStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.color.darkGrey};
  font-size: 1.05rem;
`;

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
    font-family: 'NotoSansCJKkr';
    font-weight: 500;
    text-align: center;
    border-bottom: 1px solid #dddfe0;
    padding: 1rem;
  }
`;

const TableBodyStyle = styled.tbody`
  display: table-row-group;
  font-family: 'NotoSansCJKkr';
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
  font-family: 'NotoSansCJKkr';
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

const FooterStyle = styled.div`
  height: 2rem;
`;
