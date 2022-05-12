import { NextRouter, useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { handleProfileImg } from 'src/core/utils/style';
import styled from 'styled-components';
import { useGetInfo } from 'src/core/hooks/useGetInfo';
import { useClickAway } from 'src/core/hooks/useClickAway';
import TokenUtil from 'src/core/utils/token';

export const Header = () => {
  const router: NextRouter = useRouter();
  const { userInfo, resetUserInfo } = useGetInfo();
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const ref = useClickAway<HTMLDivElement>(() => setIsVisibleModal(false));

  const onClickSetting = useCallback(() => {
    router.push('/profile');
    setIsVisibleModal(false);
  }, [router]);

  const onClickLogOut = useCallback(() => {
    router.push('/');
    TokenUtil.remove();
    setIsVisibleModal(false);
    resetUserInfo();
  }, [resetUserInfo, router]);

  return (
    <Wrapper>
      <Container>
        <Logo onClick={() => router.push('/')} />
        <div ref={ref}>
          {userInfo.generation ? (
            <Profile
              width="60px"
              height="60px"
              generation={userInfo.generation}
              onClick={() => setIsVisibleModal(!isVisibleModal)}
            />
          ) : (
            <DefaultProfile onClick={() => router.push('/login')} />
          )}

          {isVisibleModal && userInfo.name && (
            <Info>
              <InfoProfile>
                <Profile
                  width="40px"
                  height="40px"
                  generation={userInfo.generation}
                />
                <div>
                  <div>{userInfo.generation}기</div>
                  <span>{userInfo.name}</span>
                </div>
              </InfoProfile>

              <InfoSetting onClick={onClickSetting}>
                <div />
                <span>설정</span>
              </InfoSetting>

              <LogOut onClick={onClickLogOut}>
                <div />
                <span>로그아웃</span>
              </LogOut>
            </Info>
          )}
        </div>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  display: flex;
  width: 100vw;
  height: 4rem;
  background-color: ${({ theme }) => theme.colors.Black700};
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  max-width: 1920px;
  height: 100%;
  padding: 0px 215px;
  text-align: center;
  align-items: center;
  ${({ theme }) => theme.medias.smallDesktop} {
    padding: 0px 97px;
  }
  ${({ theme }) => theme.medias.mobile} {
    padding: 0px 38px;
  }
`;

const Logo = styled.div`
  width: 132px;
  height: 38.87px;
  background-image: url('/assets/Logo.svg');
  background-repeat: no-repeat;
  cursor: pointer;
`;

const DefaultProfile = styled.div`
  width: 60px;
  height: 60px;
  background-image: url('/assets/unsigned-profile.svg');
  background-size: 60px;
  background-repeat: no-repeat;
  background-position: center center;
  cursor: pointer;
`;

const Info = styled.div`
  width: 200px;
  height: fit-content;
  border-radius: 4px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  z-index: 99;
  background-color: ${({ theme }) => theme.colors.Black300};
  right: 0;
  top: 0;
  margin: 62px 222px 0px 0px;
`;

const InfoProfile = styled.div`
  padding: 16px;
  width: 100%;
  height: 72px;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid ${({ theme }) => theme.colors.Gray400};
  & > div {
    display: flex;
    flex-direction: column;
    margin-right: 8px;
    color: ${({ theme }) => theme.colors.White900};
    font-size: ${({ theme }) => theme.fonts.font14};
    text-align: center;
    justify-content: center;
    align-items: flex-start;
    & > span {
      font-weight: bold;
    }
  }
`;

const InfoSetting = styled.div`
  padding: 16px;
  width: 100%;
  height: 56px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background-color: ${({ theme }) => theme.colors.Gray900};
  }
  & > div {
    background-image: url('/assets/Settings.svg');
    background-size: 24px;
    width: 24px;
    height: 24px;
  }
  & > span {
    font-size: ${({ theme }) => theme.fonts.font14};
    color: ${({ theme }) => theme.colors.White900};
    margin-left: 12px;
  }
`;

const LogOut = styled.div`
  padding: 16px;
  width: 100%;
  height: 56px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background-color: ${({ theme }) => theme.colors.Gray900};
  }
  & > div {
    background-image: url('/assets/LogOut.svg');
    background-size: 24px;
    width: 24px;
    height: 24px;
  }
  & > span {
    font-size: ${({ theme }) => theme.fonts.font14};
    color: ${({ theme }) => theme.colors.White900};
    margin-left: 12px;
  }
`;

const Profile = styled.div<{
  width: string;
  height: string;
  generation: number;
}>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-image: ${(props) => handleProfileImg(props.generation)};
  background-size: ${(props) => props.width};
  background-repeat: no-repeat;
  background-position: center center;
  cursor: pointer;
`;
