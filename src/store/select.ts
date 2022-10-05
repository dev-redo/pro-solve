import { atom } from 'recoil';

const solutionOption = atom<string>({
  key: 'Select/Solution',
  default: 'SUCCESS',
});

const sortedOption = atom<string>({
  key: 'Select/Sort',
  default: 'DESC',
});

export { solutionOption, sortedOption };
