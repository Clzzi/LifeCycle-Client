import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { infoAtom } from '../store/auth.store';
import userApi from 'src/core/apis/user/user.api';

export const useGetInfo = () => {
  const [userInfo, setUserInfo] = useRecoilState(infoAtom);

  const getUserInfo = useCallback(async () => {
    try {
      const { data } = await userApi.getAUserByToken();
      setUserInfo(data);
    } catch (e: any) {
      console.error(e);
    }
  }, [setUserInfo]);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  return userInfo;
};
