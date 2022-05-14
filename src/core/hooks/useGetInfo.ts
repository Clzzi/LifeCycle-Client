import { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { infoAtom } from '../store/auth.store';
import userApi from 'src/core/apis/user/user.api';
import TokenUtil from 'src/core/utils/token';
import { REFRESH_TOKEN_KEY } from '../constants/api.constants';

export const useGetInfo = () => {
  const [userInfo, setUserInfo] = useRecoilState(infoAtom);
  const [loading, setLoading] = useState<boolean>(false);
  const resetUserInfo = useResetRecoilState(infoAtom);

  const fetch = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      const { data } = await userApi.getAUserByToken();
      setUserInfo(data);
    } catch (e: any) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [setUserInfo]);

  useEffect(() => {
    if (TokenUtil.get(REFRESH_TOKEN_KEY)) fetch();
  }, [fetch]);

  return { userInfo, resetUserInfo, loading };
};
