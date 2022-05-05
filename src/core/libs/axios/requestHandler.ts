import { AxiosRequestConfig } from 'axios';
import TokenUtil from 'src/core/utils/token';
import Auth from 'src/core/apis/auth/auth.api';
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  TOKEN_HEADER_KEY,
} from 'src/core/constants/api.constants';

const requestHandler = async (
  config: AxiosRequestConfig,
): Promise<AxiosRequestConfig> => {
  const tokenUtil: TokenUtil = new TokenUtil();
  let accessToken: string = tokenUtil.get(ACCESS_TOKEN_KEY);
  let usingRefreshToken: string = tokenUtil.get(REFRESH_TOKEN_KEY);

  if (accessToken && usingRefreshToken) {
    const decode: any = tokenUtil.decode(ACCESS_TOKEN_KEY);
    const nowDate: number = Date.now() / 1000;

    if (decode.exp < nowDate) {
      try {
        const data: any = await Auth.tokenReissuance({
          refreshToken: usingRefreshToken,
        });
        tokenUtil.set(ACCESS_TOKEN_KEY, data.data);
        accessToken = data.data;
      } catch (e: any) {
        if (e.response.data.status === 410) {
          tokenUtil.remove();
        }
      }
    }
    config.headers![TOKEN_HEADER_KEY] = accessToken;
  }

  return config;
};

export default requestHandler;
