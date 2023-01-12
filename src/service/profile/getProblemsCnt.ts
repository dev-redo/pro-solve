import { ProblemsCntType } from '@src/types/profile/profile-layout';

const getProblemsCnt = ({ allProblems, solvedProblems }: ProblemsCntType) => ({
  allCnt: allProblems.length,
  solvedCnt: solvedProblems.length,
});

export { getProblemsCnt };
