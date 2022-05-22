import axios, { AxiosInstance } from 'axios';
import {
  ACCESS_TOKEN_KEY,
  ALLOW_CORS_KEY,
  TOKEN_HEADER_KEY,
} from '../constants/api.constants';
import TokenUtil from 'src/core/utils/token';

export const customAxios: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER,
  headers: {
    [ALLOW_CORS_KEY]: '*',
    [TOKEN_HEADER_KEY]: TokenUtil.get(ACCESS_TOKEN_KEY),
  },
});
