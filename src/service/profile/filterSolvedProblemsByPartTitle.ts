import { useRecoilValue } from 'recoil';

import { SolvedProblemType } from '@src/types/profile/profile-layout';
import { problemTitleOption } from '@src/store/select';

const filterSolvedProblemsByPartTitle = (solvedProblems: SolvedProblemType) => {
  const selectedPartTitle = useRecoilValue(problemTitleOption);

  if (selectedPartTitle.includes('전체 문제')) return solvedProblems;
  return solvedProblems.filter(({ partTitle }) => selectedPartTitle.includes(partTitle));
};

export { filterSolvedProblemsByPartTitle };
