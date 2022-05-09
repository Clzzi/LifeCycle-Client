import {
  ACCESS_TOKEN_KEY,
  ALLOW_CORS_KEY,
  TOKEN_HEADER_KEY,
} from 'src/core/constants/api.constants';
import axios, { AxiosError, AxiosInstance } from 'axios';
import TokenUtil from 'src/core/utils/token';
import requestHandler from './requestHandler';
import errorHandler from './errorHandler';

const customAxios: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER,
  headers: {
    [ALLOW_CORS_KEY]: '*',
    [TOKEN_HEADER_KEY]: TokenUtil.get(ACCESS_TOKEN_KEY),
  },
});

customAxios.interceptors.request.use(requestHandler);
customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => errorHandler(error.response?.status),
);

export default customAxios;
