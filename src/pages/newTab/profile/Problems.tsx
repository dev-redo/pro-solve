import React from 'react';
import styled, { css } from 'styled-components';
import { uid } from 'react-uid';
import { useRecoilState } from 'recoil';

import PartTitleSelect from '@src/components/select/PartTitleSelect';
import Pagination from '@src/components/section/Pagination';

import { sortOption } from '@src/store/profile';
import { BoxStyle } from '@src/styles/global';
import { ContentHeaderInfoStyle } from '@src/styles/global';

import { levelsColor } from '@src/constants/level';
import { PROBLEM_LIST, SORT_LIST, SORT_TYPE } from '@src/constants/profile';
import { SOLVING_PROBLEM_URL as BASE_URL } from '@src/constants/url';
import {
  ProblemType,
  SolvedProblemProps,
  SelectNameType,
  SortProps,
  SortItemProps,
  SortType,
  SortItemType,
  ProblemTableProps,
  ContentProps,
} from '@src/types/profile/profile-problems';
import Book from '@assets/icons/Book.svg';
import ArrowUp from '@assets/icons/ArrowUp.svg';
import ArrowDown from '@assets/icons/ArrowDown.svg';
import NoContent from '@assets/images/noContent.png';
import '@src/styles/font.css';

export default function Problems({ solvedProblems, partTitleList }: SolvedProblemProps) {
  const [pageIdx, setPageIdx] = React.useState(0);
  const limit = 10;
  const offset = pageIdx * limit;

  return (
    <BoxStyle>
      <Problems.Header />
      <Problems.Sort onChangePageIdx={setPageIdx} partTitleList={partTitleList} />
      <Problems.Content solvedProblems={solvedProblems}>
        <Problems.ItemList start={offset} end={offset + limit} solvedProblems={solvedProblems} />
        <Pagination
          total={solvedProblems.length}
          limit={limit}
          unit={5}
          pageIdx={pageIdx}
          onChangePageIdx={setPageIdx}
        />
      </Problems.Content>
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

Problems.Sort = ({ onChangePageIdx, partTitleList }: SortProps) => (
  <SortContainerStyle>
    <SortStyle>
      <SortTextItemStyle>정렬 —</SortTextItemStyle>
      {SORT_LIST.map((item, idx) => (
        <Problems.SortItem key={uid(idx)} item={item} onChangePageIdx={onChangePageIdx} />
      ))}
    </SortStyle>
    <PartTitleSelect partTitleList={partTitleList} onChangePageIdx={onChangePageIdx} />
  </SortContainerStyle>
);

Problems.SortItem = ({ item, onChangePageIdx }: SortItemProps) => {
  const [sortType, setSortType] = useRecoilState(sortOption);
  const itemName = (SORT_TYPE as SortItemType)[item];
  const { type, isAscending } = sortType as SortType;

  const onChangeSortRule = () => {
    if (type === item) {
      onChangePageIdx(0);
      return setSortType({ type, isAscending: !isAscending });
    }

    onChangePageIdx(0);
    setSortType({
      type: item,
      isAscending: true,
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

Problems.Content = ({ children, solvedProblems }: ContentProps) => {
  if (solvedProblems.length === 0) {
    return (
      <NoContentStyle>
        <img src={NoContent} />
        <span>아직 성공한 풀이가 없습니다.</span>
      </NoContentStyle>
    );
  }

  return <>{children}</>;
};

Problems.ItemList = ({ start, end, solvedProblems }: ProblemTableProps) => {
  return (
    <ItemTableStyle>
      <Problems.TableHead />
      <Problems.TableBody start={start} end={end} solvedProblems={solvedProblems} />
    </ItemTableStyle>
  );
};

Problems.TableHead = () => (
  <ItemTableHeadStyle>
    <tr>
      {PROBLEM_LIST.map(({ item, name }, idx) => (
        <ItemTableThStyle key={uid(idx)} item={item}>
          {name}
        </ItemTableThStyle>
      ))}
    </tr>
  </ItemTableHeadStyle>
);

Problems.TableBody = ({ start, end, solvedProblems }: ProblemTableProps) => {
  const paginatedProblems = solvedProblems.slice(start, end);
  return (
    <ItemTableBodyStyle>
      {paginatedProblems.map((problem, idx) => (
        <Problems.TableCell key={uid(idx)} problem={problem} />
      ))}
    </ItemTableBodyStyle>
  );
};

Problems.TableCell = ({ problem }: { problem: ProblemType }) => {
  const { id, title, partTitle, level, finishedCount, acceptanceRate } = problem;
  const levelColor = levelsColor[level];
  const problemUrl = BASE_URL + id;

  return (
    <tr>
      <ItemTableTdStyle item="level" levelColor={levelColor}>
        Lv. {level}
      </ItemTableTdStyle>
      <ItemTableTdStyle item="title">
        <a href={problemUrl} target="_blank">
          <span>{title}</span>
          <small>{partTitle}</small>
        </a>
      </ItemTableTdStyle>
      <ItemTableTdStyle item="finishedCount">{finishedCount}명</ItemTableTdStyle>
      <ItemTableTdStyle item="acceptanceRate">{acceptanceRate}%</ItemTableTdStyle>
    </tr>
  );
};

const HeaderStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SortContainerStyle = styled.div`
  white-space: nowrap;
  height: 3rem;
  vertical-align: middle;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 500;
  margin: 1rem 0;
`;

const SortStyle = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
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

const NoContentStyle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0 2rem 0;
  flex-direction: column;
  gap: 1rem;
  font-family: 'Noto Sans KR', sans-serif;
  img {
    width: 5rem;
  }
`;

const ItemTableStyle = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  padding: 0 1rem;
`;

const tableSectionCss = css`
  tr {
    border-bottom: 0.0625rem solid rgb(215, 226, 235);
  }
`;
const ItemTableHeadStyle = styled.thead`
  ${tableSectionCss}
`;
const ItemTableBodyStyle = styled.tbody`
  ${tableSectionCss}
  tr:hover {
    background-color: #f9fafc;
  }
`;

const tableItemCss = css`
  padding: 0.5625rem 0px;
  text-align: center;
  font-weight: 700;
  line-height: 150%;
  font-size: 1rem;
  color: ${({ theme }) => theme.color.black};
  font-weight: 500;
  text-align: center;
`;

const ItemTableThStyle = styled.th<{ item: string }>`
  ${tableItemCss}
  font-family: 'Noto Sans KR', sans-serif;
  ${({ item }) => {
    if (item === 'level') {
      return css`
        width: 6rem;
        text-align: center;
      `;
    }
    if (item === 'finished-count') {
      return css`
        text-align: right;
        width: 8rem;
      `;
    }
    if (item === 'acceptance-rate') {
      return css`
        text-align: right;
        width: 8rem;
        transform: translate(-10px, 0px);
      `;
    }
  }};
`;

const ItemTableTdStyle = styled.td<{ item: string; levelColor?: string }>`
  ${tableItemCss}
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  vertical-align: middle;
  ${({ item, levelColor }) => {
    if (item === 'level') {
      return css`
        color: ${levelColor};
        font-weight: 600;
      `;
    }
    if (item === 'title') {
      return css`
        a {
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        small {
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-top: 0.0625rem;
          font-size: 0.75rem;
          color: rgb(120, 144, 160);
          line-height: 150%;
        }
      `;
    }
    if (item === 'finishedCount') {
      return css`
        font-size: 0.875rem;
        color: rgb(38, 55, 71);
        text-align: right;
      `;
    }
    if (item === 'acceptanceRate') {
      return css`
        font-size: 0.875rem;
        color: rgb(38, 55, 71);
        text-align: right;
        transform: translate(-10px, 0px);
      `;
    }
  }}
`;
