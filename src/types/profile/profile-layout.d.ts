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

type ProblemsCntType = {
  allProblems: SolvedProblemType;
  solvedProblems: SolvedProblemType;
};

interface ProblemCntType {
  allCnt: number;
  solvedCnt: number;
}

type FilterProps = {
  solvedProblems: SolvedProblemType;
  type: SelectNameType;
  isAscending: boolean;
};

type SortType = {
  [key: string]: string | boolean;
  type: SelectNameType;
  isAscending: SelectSortType;
};

type SelectNameType = 'level' | 'finishedCount' | 'acceptanceRate';
type SelectSortType = boolean;

type SortItemType = {
  [key: string]: string;
  level: string;
  finishedCount: string;
  acceptanceRate: string;
};

type LevelListFunc = (problems: SolvedProblemType) => number[];

export {
  ProblemType,
  SolvedProblemType,
  ProblemsCntType,
  ProblemCntType,
  FilterProps,
  SortType,
  SortItemType,
  LevelListFunc,
};
