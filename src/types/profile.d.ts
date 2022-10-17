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
  level: string;
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
type SelectSortType = 'ASC' | 'DESC';

type SortType = {
  [key: string]: string;
  type: SelectNameType;
  sort: SelectSortType;
};

type SortItemType = {
  [key: string]: string;
  level: string;
  finishedCount: string;
  acceptanceRate: string;
};

export {
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
};
