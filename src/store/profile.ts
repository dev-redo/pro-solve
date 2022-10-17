import { atom } from 'recoil';

export const navOption = atom<string>({
  key: 'Nav/Option',
  default: 'MAIN',
});
