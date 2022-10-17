import styled from 'styled-components';
import { uid } from 'react-uid';
import { levels, levelsColor } from '../../../constants/level';
import { ProblemCntType, DoughnutType, ChartInfo, ChartInfoList } from '../../../types/profile';
import '../../../styles/font.css';
import { BoxStyle, BoldTextStyle } from '../../../styles/global';
import { getPercentile } from '../../../utils/getPercentile';
import { Children } from '../../../types/global';
import { ContentHeaderStyle, ContentHeaderInfoStyle } from '../../../styles/global';
import Book from '../../../../assets/icons/Book.svg';
import ArrowUp from '../../../../assets/icons/ArrowUp.svg';
import ArrowDown from '../../../../assets/icons/ArrowDown.svg';

export default function Problems() {
  return (
    <BoxStyle>
      <Problems.Header />
      <Problems.Sort />
    </BoxStyle>
  );
}

Problems.Header = () => {
  return (
    <HeaderStyle>
      <Book />
      <ContentHeaderInfoStyle>유저가 푼 문제</ContentHeaderInfoStyle>
    </HeaderStyle>
  );
};

Problems.Sort = () => {
  const sortList = ['정렬 —', '난이도', '완료한 사람', '정답률'];

  return (
    <SortStyle>
      {sortList.map((item, idx) => (
        <Problems.SortItem key={uid(idx)} item={item} idx={idx} />
      ))}
    </SortStyle>
  );
};

Problems.SortItem = ({ item, idx }: { item: string; idx: number }) => {
  if (!idx) {
    return <SortTextItemStyle>{item}</SortTextItemStyle>;
  }

  return (
    <SortSelectedItemStyle>
      <span>{item}</span>
      <ArrowUp />
      <ArrowDown />
    </SortSelectedItemStyle>
  );
};

const HeaderStyle = styled(ContentHeaderStyle)`
  display: flex;
  gap: 0.5rem;
`;

const SortStyle = styled.div`
  white-space: nowrap;
  height: 3rem;
  vertical-align: middle;
  display: flex;
  align-items: center;
  margin: 0 1rem;
  font-family: 'NotoSansCJKkr';
  font-weight: 500;
`;

const SortItemStyle = styled.span`
  text-align: left;
  display: inline-block;
  margin-right: 1ch;
  transition: background-color 0.3s ease;
  user-select: none;
  text-decoration: none;
  background: none;
  border-radius: 32px;
  font-weight: 400;
  cursor: pointer;
  padding: 0.5rem 1rem;
`;

const SortTextItemStyle = styled(SortItemStyle)`
  padding: 0;
  cursor: default;
`;

// TODO: 선택된 Item background => #dddfe0
const SortSelectedItemStyle = styled(SortItemStyle)`
  display: flex;
  align-item: center;
  &:hover {
    background-color: ${({ theme }) => theme.color.whiter};
  }
`;
