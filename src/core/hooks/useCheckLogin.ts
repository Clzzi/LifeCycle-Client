import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ACCESS_TOKEN_KEY } from '../constants/api.constants';
import TokenUtil from '../utils/token';

export const useCheckLogin = () => {
  const router = useRouter();
  const token: string = TokenUtil.get(ACCESS_TOKEN_KEY);

  useEffect(() => {
    if (!token.length) {
      router.push('/login');
    }
  }, [token, router]);

};
