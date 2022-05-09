import customAxios from 'src/core/libs/axios/customAxios';
import { Response } from 'src/types/common.type';
import {
  aUserParam,
  updateGenerationParam,
  updatePasswordParam,
  UserResponse,
} from './user.param';

class User {
  public async getAUser(param: aUserParam): Promise<UserResponse> {
    const { data } = await customAxios.get<UserResponse>(`/user/${param}`);
    return data;
  }

  public async updatePassword(param: updatePasswordParam): Promise<Response> {
    const { data } = await customAxios.put<Response>(
      '/user/update/password',
      param,
    );
    return data;
  }

  public async updateGeneration(
    param: updateGenerationParam,
  ): Promise<Response> {
    const { data } = await customAxios.put<Response>(
      '/user/update/generation',
      param,
    );
    return data;
  }

  public async accountWithdrawal(): Promise<Response> {
    const { data } = await customAxios.delete<Response>('/user');
    return data;
  }

  public async getAUserByToken(): Promise<UserResponse> {
    const { data } = await customAxios.get<UserResponse>('/user');
    return data;
  }
}

export default new User();
