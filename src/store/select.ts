import { atom } from 'recoil';

export const selectedOption = atom<string>({
  key: 'Select/Solution',
  default: '전체 풀이',
});
