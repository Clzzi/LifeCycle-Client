import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  TOKEN_HEADER_KEY,
} from 'src/core/constants/api.constants';
import { useEffect } from 'react';
import { useToast } from './useToast';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import customAxios from '../libs/axios/customAxios';
import TokenUtil from 'src/core/utils/token';
import Auth from 'src/core/apis/auth/auth.api';
import { Response } from 'src/types/common.type';

export const useAxiosInterceptor = () => {
  const { fireToast } = useToast();

  const errorHandler = (error: Response): void => {
    fireToast({ content: ` ${error.message} 🔥 `, duration: 2000 });
  };

  const responseHandler = (response: AxiosResponse): AxiosResponse => {
    return response;
  };

  const requestHandler = async (
    config: AxiosRequestConfig,
  ): Promise<AxiosRequestConfig> => {
    let accessToken: string = TokenUtil.get(ACCESS_TOKEN_KEY);
    let usingRefreshToken: string = TokenUtil.get(REFRESH_TOKEN_KEY);

    if (accessToken && usingRefreshToken) {
      const decode: any = TokenUtil.decode(ACCESS_TOKEN_KEY);
      const nowDate: number = Date.now() / 1000;

      if (decode.exp < nowDate) {
        try {
          const data: any = await Auth.tokenReissuance({
            refreshToken: usingRefreshToken,
          });
          TokenUtil.set(ACCESS_TOKEN_KEY, data.data);
          accessToken = data.data;
        } catch (e: any) {
          if (e.response.data.status === 410) {
            TokenUtil.remove();
          }
        }
      }
      config.headers![TOKEN_HEADER_KEY] = accessToken;
    }

    return config;
  };

  const responseInterceptor: number = customAxios.interceptors.response.use(
    (response: AxiosResponse) => responseHandler(response),
    (error) => errorHandler(error.response.data),
  );

  const requestInterceptor: number =
    customAxios.interceptors.request.use(requestHandler);

  useEffect(() => {
    return () => {
      customAxios.interceptors.request.eject(requestInterceptor);
      customAxios.interceptors.response.eject(responseInterceptor);
    };
  }, [responseInterceptor, requestInterceptor]);
};
