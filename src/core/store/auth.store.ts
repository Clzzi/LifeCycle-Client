import { atom } from 'recoil';
import { IUser } from 'src/types/auth.type';

export const infoAtom = atom<IUser>({
  key: 'infoAtom',
  default: {
    userId: '',
    name: '',
    generation: 0,
    resume: {
      company: '',
      content: '',
      createdAt: '',
      idx: 0,
      stack: '',
      thumbnail: '',
      title: '',
    },
  },
});
