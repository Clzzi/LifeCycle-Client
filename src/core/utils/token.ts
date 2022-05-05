import jwt, { JwtPayload } from 'jsonwebtoken';
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from '../constants/api.constants';
import StorageUtil from './storage';

class TokenUtil {
  constructor() {}

  get(key: string): string {
    return new StorageUtil().get(key);
  }

  set(key: string, token: string): void {
    new StorageUtil().set(key, token);
  }

  remove(): void {
    new StorageUtil().remove(REFRESH_TOKEN_KEY);
    new StorageUtil().remove(ACCESS_TOKEN_KEY);
  }

  decode(key: string): JwtPayload {
    return jwt.decode(this.get(key)) as JwtPayload;
  }
}

export default TokenUtil;
