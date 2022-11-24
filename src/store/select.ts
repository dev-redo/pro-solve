import { atom } from 'recoil';

const solutionOption = atom<string>({
  key: 'Select/Solution',
  default: 'SUCCESS',
});

const sortedOption = atom<string>({
  key: 'Select/Sort',
  default: 'DESC',
});

const problemTitleOption = atom<string>({
  key: 'Select/ProblemTitle',
  default: '전체 문제',
});

export { solutionOption, sortedOption, problemTitleOption };
