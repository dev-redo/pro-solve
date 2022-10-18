import React from 'react';
import styled, { css } from 'styled-components';
import { uid } from 'react-uid';
import { useRecoilState, useRecoilValue } from 'recoil';
import { levels, levelsColor } from '../../../constants/level';
import { BoxStyle } from '../../../styles/global';
import { ContentHeaderInfoStyle } from '../../../styles/global';
import Book from '../../../../assets/icons/Book.svg';
import ArrowUp from '../../../../assets/icons/ArrowUp.svg';
import ArrowDown from '../../../../assets/icons/ArrowDown.svg';
import { sortOption } from '../../../store/profile';
import { SORT_LIST, SORT_TYPE } from '../../../constants/profile';
import '../../../styles/font.css';
import { SolvedProblemType, SelectNameType, SortType, SortItemType } from '../../../types/profile';
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

Problems.Content = ({ solvedProblems }: { solvedProblems: SolvedProblemType }) => {
  const [pageIdx, setPageIdx] = React.useState(0);
  const limit = 10;
  const offset = pageIdx * limit;

  return (
    <>
      <Problems.ItemList />
      <Pagination
        total={solvedProblems.length}
        limit={limit}
        unit={5}
        pageIdx={pageIdx}
        setPageIdx={setPageIdx}
      />
    </>
  );
};

Problems.ItemList = () => {
  const headList = [
    { item: 'id', name: '문제 번호' },
    { item: 'title', name: '제목' },
    { item: 'level', name: '난이도' },
    { item: 'finished-count', name: '완료한 사람' },
    { item: 'acceptance-rate', name: '정답률' },
  ];

  return (
    <ItemTableStyle>
      <ItemTableHeadStyle>
        <tr>
          {headList.map(({ item, name }, idx) => (
            <ItemTableThStyle key={uid(idx)} item={item}>
              {name}
            </ItemTableThStyle>
          ))}
        </tr>
      </ItemTableHeadStyle>
    </ItemTableStyle>
  );
};

const ItemTableStyle = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  padding: 0 1rem;
`;

const ItemTableHeadStyle = styled.thead`
  tr {
    border-bottom: 0.0625rem solid rgb(215, 226, 235);
  }
`;

const ItemTableThStyle = styled.th<{ item: string }>`
  padding: 0.5625rem 0px;
  text-align: center;
  font-weight: 700;
  line-height: 150%;
  font-size: 1rem;
  color: ${({ theme }) => theme.color.black};
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 500;
  text-align: center;
  ${({ item }) => {
    if (item === 'id') {
      return css`
        width: 10rem;
        text-align: center;
      `;
    }
    if (item === 'level') {
      return css`
        width: 6rem;
      `;
    }
    if (item === 'finished-count') {
      return css`
        text-align: right;
        padding: 0.5625rem 0.75rem;
        width: 8rem;
      `;
    }
    if (item === 'acceptance-rate') {
      return css`
        text-align: right;
        padding: 0.5625rem 0.75rem;
        width: 6rem;
      `;
    }
  }};
`;

const HeaderStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SortStyle = styled.div`
  white-space: nowrap;
  height: 3rem;
  vertical-align: middle;
  display: flex;
  align-items: center;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 500;
  margin: 1rem 0;
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
