import jwt, { JwtPayload } from 'jsonwebtoken';
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from '../constants/api.constants';
import StorageUtil from './storage';

class TokenUtil {
  constructor() {}

  get(key: string): string {
    return StorageUtil.get(key);
  }

  set(key: string, token: string): void {
    StorageUtil.set(key, token);
  }

  remove(): void {
    StorageUtil.remove(REFRESH_TOKEN_KEY);
    StorageUtil.remove(ACCESS_TOKEN_KEY);
  }

  decode(key: string): JwtPayload {
    return jwt.decode(this.get(key)) as JwtPayload;
  }
}

export default new TokenUtil() as TokenUtil;
