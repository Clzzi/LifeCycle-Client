import { ILogin } from 'src/types/auth.type';

export interface TokenReissuanceParam {
  refreshToken: string;
}

export interface LoginParam {
  id: string | undefined;
  pw: string | undefined;
}

export interface RegisterParam {
  userId: string | undefined;
  name: string | undefined;
  pw: string | undefined;
  generation: number | undefined;
}

export interface LoginResponse extends Response {
  data: ILogin;
}
