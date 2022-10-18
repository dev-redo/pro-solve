import React from 'react';
import styled from 'styled-components';
import { uid } from 'react-uid';
import { useRecoilState, useRecoilValue } from 'recoil';
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
import { Children } from '../../../types/global';
import Pagination from '../../../components/section/Pagination';

export default function Problems({ solvedProblems }: { solvedProblems: SolvedProblemType }) {
  return (
    <BoxStyle>
      <Problems.Header />
      <Problems.Sort />
      <Problems.Content solvedProblems={solvedProblems} />
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
  const [sortType, setSortType] = useRecoilState(sortOption);
  const itemName = (SORT_TYPE as SortItemType)[item];
  const { type, isAscending } = sortType as SortType;

  const onChangeSortRule = () => {
    if (type === item) {
      setSortType({ type, isAscending: !isAscending });
      return;
    }

    setSortType({
      type: item,
      isAscending: false,
    });
  };

  if (type === undefined || type !== item) {
    return (
      <SortSelectedItemStyle selected={false} onClick={onChangeSortRule}>
        <span>{itemName}</span>
      </SortSelectedItemStyle>
    );
  }

  return (
    <SortSelectedItemStyle selected={true} onClick={onChangeSortRule}>
      <span>{itemName}</span>
      {isAscending && <ArrowUp />}
      {isAscending || <ArrowDown />}
    </SortSelectedItemStyle>
  );
};

// TODO: 페이지네이션 적용
Problems.Content = ({ solvedProblems }: { solvedProblems: SolvedProblemType }) => {
  const [posts, setPosts] = React.useState([...new Array(225).fill(0)]);
  const [pageIdx, setPageIdx] = React.useState(0);
  const limit = 10;
  const offset = pageIdx * limit;

  return (
    <>
      <Pagination
        total={posts.length}
        limit={limit}
        unit={5}
        pageIdx={pageIdx}
        setPageIdx={setPageIdx}
      />
    </>
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
  font-family: 'Noto Sans KR';
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

const SortSelectedItemStyle = styled(SortItemStyle)<{ selected: boolean }>`
  display: flex;
  align-items: center;
  font-weight: ${({ selected }) => selected && 700};
  background-color: ${({ selected }) => selected && '#dddfe0'};
  &:hover {
    background-color: ${({ theme }) => theme.color.whiter};
  }
`;
