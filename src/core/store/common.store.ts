import { atom } from 'recoil';
import { IToast } from 'src/types/common.type';

export const toastAtom = atom<IToast[]>({
  key: 'toastAtom',
  default: [],
});
