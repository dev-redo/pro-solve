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

export { ProblemType, SolvedProblemType, ProblemsCntType, ProblemCntType, DoughnutType };
