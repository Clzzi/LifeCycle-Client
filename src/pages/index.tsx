import type { NextPage } from 'next';
import { Header } from 'src/components/common/Layout/Header';
import { Title } from 'src/components/common/Title';
import styled, { useTheme } from 'styled-components';

const Login: NextPage = () => {
  const theme = useTheme();
  return (
    <Wrapper>
      <Container>
        <Title
          mainSize="28px"
          subSize="16px"
          width="488px"
          height="76px"
          mainColor={theme.colors.White900}
          subColor={theme.colors.Gray500}
          mainText="로그인"
          subText="로그인하여 더 자세한 정보를 찾아봐요!"
        />
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  height: calc(100vh - 56px);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Container = styled.article`
  width: 580px;
  height: 560px;
  padding: 36px;
  display: flex;
  background-color: ${({ theme }) => theme.colors.Black900};
  border-radius: 12px;
`;

export default Login;
