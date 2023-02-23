import { ProblemsType } from '@src/types/profile/profile-layout';

const getProblemsCnt = ({ allProblems, solvedProblems }: ProblemsType) => ({
  allCnt: allProblems.length,
  solvedCnt: solvedProblems.length,
});

export { getProblemsCnt };
