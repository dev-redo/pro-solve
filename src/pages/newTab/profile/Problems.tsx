import styled from 'styled-components';
import { uid } from 'react-uid';
import { useRecoilValue } from 'recoil';
import { levels, levelsColor } from '../../../constants/level';
import { BoxStyle, BoldTextStyle } from '../../../styles/global';
import { ContentHeaderStyle, ContentHeaderInfoStyle } from '../../../styles/global';
import Book from '../../../../assets/icons/Book.svg';
import ArrowUp from '../../../../assets/icons/ArrowUp.svg';
import ArrowDown from '../../../../assets/icons/ArrowDown.svg';
import { sortOption } from '../../../store/profile';
import { SORT_LIST, SORT_TYPE } from '../../../constants/profile';
import '../../../styles/font.css';
import {
  ProblemType,
  SolvedProblemType,
  ProblemsCntType,
  ProblemCntType,
  DoughnutType,
  LevelsInfoList,
  ChartInfo,
  ChartInfoList,
  NavType,
  SelectNameType,
  SelectSortType,
  SortType,
  SortItemType,
} from '../../../types/profile';

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
  return (
    <SortStyle>
      <SortTextItemStyle>정렬 —</SortTextItemStyle>
      {SORT_LIST.map((item, idx) => (
        <Problems.SortItem key={uid(idx)} item={item} />
      ))}
    </SortStyle>
  );
};

Problems.SortItem = ({ item }: { item: SelectNameType }) => {
  const sortType = useRecoilValue(sortOption);
  const itemName = (SORT_TYPE as SortItemType)[item];

  if (sortType === null) {
    return (
      <SortSelectedItemStyle selected={false}>
        <span>{itemName}</span>
      </SortSelectedItemStyle>
    );
  }

  const { type, sort } = sortType!;
  if (type === item) {
    return (
      <SortSelectedItemStyle selected={true}>
        <span>{itemName}</span>
        {sort === 'ASC' && <ArrowUp />}
        {sort === 'DESC' && <ArrowDown />}
      </SortSelectedItemStyle>
    );
  }

  return (
    <SortSelectedItemStyle selected={false}>
      <span>{itemName}</span>
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
const SortSelectedItemStyle = styled(SortItemStyle)<{ selected: boolean }>`
  display: flex;
  align-item: center;
  font-weight: ${({ selected }) => selected && 700};
  background-color: ${({ theme, selected }) => selected && theme.color.grey};
  &:hover {
    background-color: ${({ theme }) => theme.color.whiter};
  }
`;
