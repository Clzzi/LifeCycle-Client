import { IUser } from './auth.type';

export interface IResume {
  idx: number;
  createdAt: string;
  title: string;
  company: string;
  stack: string;
  thumbnail: string;
  content: string;
  user: IUser;
}
