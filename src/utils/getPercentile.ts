import { ProblemCntType } from '@src/types/profile/profile-statistics';

const getPercentile = ({ allCnt, solvedCnt }: ProblemCntType) =>
  String(((solvedCnt / allCnt) * 100).toFixed(1));

export { getPercentile };
