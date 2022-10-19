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
};

type ProblemsCntType = {
  allProblems: SolvedProblemType;
  solvedProblems: SolvedProblemType;
};

interface ProblemCntType {
  allCnt: number;
  solvedCnt: number;
}

type DoughnutType = {
  problemCnt: ProblemCntType;
  solvedLevelCnt: number[];
};

interface LevelsInfo {
  level: string;
  color: string;
}

type LevelsInfoList = LevelsInfo[];

interface ChartInfo {
  level: number;
  color: string;
  allCnt: number;
  solvedCnt: number;
}

type ChartInfoList = ChartInfo[];

type TableType = {
  levelsInfo: LevelsInfoList;
  chartInfoList: ChartInfoList;
};

type NavType = {
  [key: string]: string;
  MAIN: string;
  PROBLEM: string;
};

type SelectNameType = 'level' | 'finishedCount' | 'acceptanceRate';
type SelectSortType = boolean;

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

export {
  ProblemType,
  SolvedProblemType,
  SolvedProblemProps,
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
  ProblemTableProps,
};
