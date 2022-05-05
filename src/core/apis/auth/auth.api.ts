import customAxios from 'src/core/libs/axios/customAxios';
import { LoginParam, RegisterParam, TokenReissuanceParam } from './auth.param';

class Auth {
  public async tokenReissuance(param: TokenReissuanceParam): Promise<any> {
    const { data } = await customAxios.post('/login/refresh', param);
    return data;
  }

  public async login(param: LoginParam): Promise<any> {
    const { data } = await customAxios.post('/user/login', param);
    return data;
  }

  public async register(param: RegisterParam): Promise<any> {
    const { data } = await customAxios.post('/user/register', param);
    return data;
  }
}

export default new Auth();
