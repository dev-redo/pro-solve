import { useRecoilValue } from 'recoil';

import { SolvedProblemType, SortType } from '@src/types/profile/profile-layout';
import { sortOption } from '@src/store/profile';

const sortSolvedProblems = (solvedProblems: SolvedProblemType) => {
  const sortType = useRecoilValue(sortOption);
  const { type, isAscending } = sortType as SortType;

  return solvedProblems.sort((prevProblem, currProblem) => {
    if (isAscending) return prevProblem[type] - currProblem[type];
    return currProblem[type] - prevProblem[type];
  });
};

export { sortSolvedProblems };
