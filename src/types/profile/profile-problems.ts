import { SelectSortType } from './profile-layout';

interface ProblemType {
  id: number;
  title: string;
  partTitle: string;
  level: number;
  finishedCount: number;
  acceptanceRate: number;
  status: string;
}

type SolvedProblemType = ProblemType[];

type SelectNameType = 'level' | 'finishedCount' | 'acceptanceRate';

interface SortProps {
  allSolvedCnt: number;
  onChangePageIdx: (page: number) => void;
  partTitleList: Array<string>;
}

interface SortItemProps {
  item: SelectNameType;
  onChangePageIdx: (page: number) => void;
}

interface SortType {
  [key: string]: string | boolean;
  type: SelectNameType;
  isAscending: SelectSortType;
}

interface SortItemType {
  [key: string]: string;
  level: string;
  finishedCount: string;
  acceptanceRate: string;
}

interface ProblemTableProps {
  start: number;
  end: number;
  solvedProblems: SolvedProblemType;
}

interface ContentProps {
  children: JSX.Element | JSX.Element[];
  solvedProblems: SolvedProblemType;
}

export {
  ProblemType,
  SelectNameType,
  SortProps,
  SortItemProps,
  SortType,
  SortItemType,
  ProblemTableProps,
  ContentProps,
};
