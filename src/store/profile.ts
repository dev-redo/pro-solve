import { atom } from 'recoil';
import { SortType } from '../types/profile';

export const navOption = atom<string>({
  key: 'Nav/Option',
  default: 'MAIN',
});

export const sortOption = atom<SortType>({
  key: 'Nav/Sort',
  default: {},
});
