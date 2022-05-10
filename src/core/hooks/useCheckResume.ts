import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { infoAtom } from '../store/auth.store';
import { useCheckLogin } from './useCheckLogin';

export const useCheckResume = (type: 'EDIT' | 'WRITE') => {
  useCheckLogin();
  const router = useRouter();
  const userInfo = useRecoilValue(infoAtom);

  useEffect(() => {
    if (userInfo.name.length) {
      if (type === 'EDIT' && userInfo.resume === null) {
        router.push('/');
      } else if (type === 'WRITE' && userInfo.resume !== null) {
        router.push('/');
      }
    }
  }, [userInfo, router, type]);
};
