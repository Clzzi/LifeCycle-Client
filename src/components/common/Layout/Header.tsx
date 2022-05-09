import { NextRouter, useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { pxToRem } from 'src/core/utils/style';
import styled from 'styled-components';

export const Header = () => {
  // url에 따라 profile보여줄지 결정, 내정보가져오는거에서 있으면 profile 설정까지 하는것
  const router: NextRouter = useRouter();
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (router.asPath === '/register' || router.asPath === '/login') {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [setVisible, router.asPath]);

  return (
    <Wrapper visible={visible}>
      <Logo onClick={() => router.push('/')} />
      <Profile />
    </Wrapper>
  );
};

const Wrapper = styled.nav<{ visible: boolean }>`
  display: ${(props) => (props.visible ? 'none' : 'flex')};
  width: 100vw;
  height: ${pxToRem(56)};
  background-color: ${({ theme }) => theme.colors.Black700};
  padding: 0px 215px;
  text-align: center;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  width: 132px;
  height: 38.87px;
  background-image: url('/assets/Logo.svg');
  background-repeat: no-repeat;
  cursor: pointer;
`;

const Profile = styled.div`
  width: 40px;
  height: 40px;
  background-image: url('/assets/unsigned-profile.svg');
  background-repeat: no-repeat;
  cursor: pointer;
`;
