import { atom } from 'recoil';

export const modalIsOpen = atom<boolean>({
  key: 'Modal',
  default: false,
});
