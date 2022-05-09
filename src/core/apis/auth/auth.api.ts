import customAxios from 'src/core/libs/axios/customAxios';
import { Response } from 'src/types/common.type';
import {
  LoginParam,
  LoginResponse,
  RegisterParam,
  TokenReissuanceParam,
  TokenReissuanceResponse,
} from './auth.param';

class Auth {
  public async tokenReissuance(
    param: TokenReissuanceParam,
  ): Promise<TokenReissuanceResponse> {
    const { data } = await customAxios.post<TokenReissuanceResponse>(
      '/login/refresh',
      param,
    );
    return data;
  }

  public async login(param: LoginParam): Promise<LoginResponse> {
    const { data } = await customAxios.post<LoginResponse>(
      '/user/login',
      param,
    );
    return data;
  }

  public async register(param: RegisterParam): Promise<Response> {
    const { data } = await customAxios.post<Response>('/user/register', param);
    return data;
  }

  public async accountWithDrawal(): Promise<Response> {
    const { data } = await customAxios.delete<Response>('/user');
    return data;
  }
}

export default new Auth();
