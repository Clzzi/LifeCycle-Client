import {
  ACCESS_TOKEN_KEY,
  ALLOW_CORS_KEY,
  TOKEN_HEADER_KEY,
} from 'src/core/constants/api.constants';
import axios, { AxiosInstance } from 'axios';
import TokenUtil from 'src/core/utils/token';

const customAxios: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER,
  headers: {
    [ALLOW_CORS_KEY]: '*',
    [TOKEN_HEADER_KEY]: TokenUtil.get(ACCESS_TOKEN_KEY),
  },
});

export default customAxios;
