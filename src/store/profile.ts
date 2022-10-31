import { atom } from 'recoil';
import { SortType } from '@src/types/profile';

export const navOption = atom<string>({
  key: 'Nav/Option',
  default: 'MAIN',
});

export const sortOption = atom<SortType>({
  key: 'Nav/Sort',
  default: {
    type: 'level',
    isAscending: true,
  },
});
