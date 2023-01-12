import { SolvedProblemType } from '@src/types/profile/profile-layout';
import { sortSolvedProblems } from './sortSolvedProblems';
import { filterSolvedProblemsByPartTitle } from './filterSolvedProblemsByPartTitle';

const getFilteredSolvedProblems = (solvedProblems: SolvedProblemType) => {
  const sortedSolvedProblems = sortSolvedProblems(solvedProblems);
  return filterSolvedProblemsByPartTitle(sortedSolvedProblems);
};

export { getFilteredSolvedProblems };
