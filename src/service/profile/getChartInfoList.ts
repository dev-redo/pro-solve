import { levels, levelsColor } from '@src/constants/level';
import { ProblemsCntType } from '@src/types/profile/profile-layout';

import { getProblemsLevelList } from './getProblemsLevelList';

const getChartInfoList = ({ allProblems, solvedProblems }: ProblemsCntType) => {
  const problemsCnt = getProblemsLevelList(allProblems);
  const solvedCnt = getProblemsLevelList(solvedProblems);

  return levels.map((level, idx) => ({
    level,
    color: levelsColor[idx],
    allCnt: problemsCnt[idx],
    solvedCnt: solvedCnt[idx],
  }));
};

export { getChartInfoList };
