import { atom } from 'recoil';
import { IUser } from 'src/types/auth.type';

export const infoAtom = atom<IUser>({
  key: 'infoAtom',
  default: {
    userId: 'id',
    name: 'name',
    generation: 5,
  },
});
