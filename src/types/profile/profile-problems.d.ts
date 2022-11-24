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

type SolvedProblemProps = {
  solvedProblems: SolvedProblemType;
  partTitleList: Array<string>;
};

type SelectNameType = 'level' | 'finishedCount' | 'acceptanceRate';

type SortProps = {
  onChangePageIdx: (page: number) => void;
  partTitleList: Array<string>;
};

type SortItemProps = {
  item: SelectNameType;
  onChangePageIdx: (page: number) => void;
};

type SortType = {
  [key: string]: string | boolean;
  type: SelectNameType;
  isAscending: SelectSortType;
};

type SortItemType = {
  [key: string]: string;
  level: string;
  finishedCount: string;
  acceptanceRate: string;
};

type ProblemTableProps = {
  start: number;
  end: number;
  solvedProblems: SolvedProblemType;
};

type ContentProps = {
  children: JSX.Element | JSX.Element[];
  solvedProblems: SolvedProblemType;
};

export {
  ProblemType,
  SolvedProblemProps,
  SelectNameType,
  SortProps,
  SortItemProps,
  SortType,
  SortItemType,
  ProblemTableProps,
  ContentProps,
};
