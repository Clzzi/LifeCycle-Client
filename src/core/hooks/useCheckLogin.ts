import { useEffect } from 'react';
import TokenUtil from '../utils/token';
import { NextRouter, useRouter } from 'next/router';
import { ACCESS_TOKEN_KEY } from '../constants/api.constants';

export const useCheckLogin = () => {
  const router: NextRouter = useRouter();
  const token: string = TokenUtil.get(ACCESS_TOKEN_KEY);

  useEffect(() => {
    if (!token.length) router.push('/login');
  }, [token, router]);
};
