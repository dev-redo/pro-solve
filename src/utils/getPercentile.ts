import { ProblemCntType } from '@src/types/profile';

const getPercentile = ({ allCnt, solvedCnt }: ProblemCntType) =>
  String(((solvedCnt / allCnt) * 100).toFixed(1));

export { getPercentile };
