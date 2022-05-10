import { NextRouter, useRouter } from 'next/router';
import { Button } from 'src/components/common/Button';
import { theme } from 'src/core/styles/theme';
import styled from 'styled-components';

const NotFound = () => {
  const router: NextRouter = useRouter();
  return (
    <Wrapper>
      <Title> 4 0 4 </Title>
      <Text>이 URL은 존재하지 않는 URL이에요</Text>
      <Button
        width="102px"
        height="38px"
        content="홈으로 가기"
        fontSize={theme.fonts.font14}
        color={theme.colors.White900}
        backgroundColor={theme.colors.Main1}
        handleClick={() => router.push('/')}
      />
    </Wrapper>
  );
};

export default NotFound;

const Wrapper = styled.section`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.Black900};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Title = styled.div`
  font-size: 100px;
  font-size: bolder;
  color: ${({ theme }) => theme.colors.White900};
`;

const Text = styled.div`
  font-size: ${({ theme }) => theme.fonts.font20};
  font-size: bold;
  color: ${({ theme }) => theme.colors.White900};
  margin-bottom: 34px;
`;
