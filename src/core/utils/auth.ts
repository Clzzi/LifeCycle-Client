import TokenUtil from './token';
import { RegisterValues } from 'src/types/auth.type';
import { ACCESS_TOKEN_KEY } from '../constants/api.constants';

export const convertRegisterDto = (values: RegisterValues) => {
  return {
    userId: values.id,
    pw: values.pw,
    name: values.name,
    generation: Number(values.generation),
  };
};

export const checkToken = (): boolean => {
  if (TokenUtil.get(ACCESS_TOKEN_KEY)) {
    return true;
  }
  return false;
};

export const CheckRouter = (path: string): boolean => {
  if (path === '/login' || path === '/register' || path === '/404') {
    return false;
  }
  return true;
};
