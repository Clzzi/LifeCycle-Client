import { useCallback, useEffect } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { infoAtom } from '../store/auth.store';
import userApi from 'src/core/apis/user/user.api';
import TokenUtil from 'src/core/utils/token';
import { REFRESH_TOKEN_KEY } from '../constants/api.constants';

export const useGetInfo = () => {
  const [userInfo, setUserInfo] = useRecoilState(infoAtom);
  const resetUserInfo = useResetRecoilState(infoAtom);
  const getUserInfo = useCallback(async () => {
    try {
      const { data } = await userApi.getAUserByToken();
      setUserInfo(data);
    } catch (e: any) {
      console.error(e);
    }
  }, [setUserInfo]);

  useEffect(() => {
    if (TokenUtil.get(REFRESH_TOKEN_KEY)) getUserInfo();
  }, [getUserInfo]);

  return { userInfo, resetUserInfo };
};
