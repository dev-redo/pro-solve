interface ProblemCntType {
  allCnt: number;
  solvedCnt: number;
}

type DoughnutType = {
  problemCnt: ProblemCntType;
  solvedLevelCnt: number[];
};

interface ChartInfo {
  level: number;
  color: string;
  allCnt: number;
  solvedCnt: number;
}

type ChartInfoList = ChartInfo[];

export { ProblemCntType, DoughnutType, ChartInfo, ChartInfoList };
