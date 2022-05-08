import customAxios from 'src/core/libs/axios/customAxios';
import { Response } from 'src/types/common.type';
import {
  aUserParam,
  updateGenerationParam,
  updatePasswordParam,
} from './user.param';

class User {
  public async getAUser(param: aUserParam) {
    const { data } = await customAxios.get(`/user/${param}`);
    return data;
  }

  public async updatePassword(param: updatePasswordParam): Promise<Response> {
    const { data } = await customAxios.put('/user/update/password', param);
    return data;
  }

  public async updateGeneration(
    param: updateGenerationParam,
  ): Promise<Response> {
    const { data } = await customAxios.put('/user/update/generation', param);
    return data;
  }

  public async accountWithdrawal(): Promise<Response> {
    const { data } = await customAxios.delete('/user');
    return data;
  }
}

export default User;
