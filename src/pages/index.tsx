import type { NextPage } from 'next';
import { ChangeEvent } from 'react';
import { Button } from 'src/components/common/Button';
import { Input } from 'src/components/common/Input';
import { Title } from 'src/components/common/Title';
import { Error, useForm } from 'src/core/hooks/useForm';
import styled, { useTheme } from 'styled-components';

interface Values {
  id: string | undefined;
  pw: string | undefined;
}

const Login: NextPage = () => {
  const theme = useTheme();
  const { values, errors, isLoading, setValues, handleSubmit } =
    useForm<Values>({
      initialValue: {
        id: undefined,
        pw: undefined,
      },
      onSubmit: () => {
        // TODO
      },
      validate: ({ id, pw }) => {
        const errors: Error<Values> = {};
        if (id !== undefined && id.length === 0) {
          errors.id = 'ID를 입력해주세요';
        }
        if (pw !== undefined && pw.length === 0) {
          errors.pw = 'PW를 입력해주세요';
        }
        return errors;
      },
    });

  return (
    <Wrapper>
      <Container>
        <Title
          mainSize={theme.fonts.font28}
          subSize={theme.fonts.font16}
          width="488px"
          height="76px"
          mainColor={theme.colors.White900}
          subColor={theme.colors.Gray500}
          mainText="로그인"
          subText="로그인하여 더 자세한 정보를 찾아봐요!"
        />
        <InputContainer>
          <Input
            value={values.id}
            errorMessage={errors.id ? errors.id : ''}
            placeholder="ID"
            type="text"
            backgroundColor={theme.colors.White400}
            borderRadius="5px"
            fontSize={theme.fonts.font16}
            isAutoFocus
            errorFontSize={theme.fonts.font14}
            padding="6px 12px"
            name="id"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setValues({ ...values, [e.target.name]: e.target.value });
            }}
            width="100%"
            height="56px"
          />
          <Input
            value={values.pw}
            errorMessage={errors.pw ? errors.pw : ''}
            placeholder="PW"
            type="password"
            backgroundColor={theme.colors.White400}
            borderRadius="5px"
            fontSize={theme.fonts.font16}
            isAutoFocus
            errorFontSize={theme.fonts.font14}
            padding="6px 12px"
            name="pw"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setValues({ ...values, [e.target.name]: e.target.value });
            }}
            width="100%"
            height="56px"
          />
        </InputContainer>
        <ButtonContainer>
          <Button
            width="488px"
            height="56px"
            content="로그인"
            fontSize={theme.fonts.font20}
            color={theme.colors.White900}
            borderRadius="999px"
            backgroundColor={theme.colors.Main1}
            handleClick={() => {
              console.log('123');
            }}
          />
        </ButtonContainer>
        <GoToSignUp>
          <a>혹시 계정이 없으신가요?</a>
        </GoToSignUp>
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
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.Black900};
  border-radius: 12px;
`;

const InputContainer = styled.section`
  width: 100%;
  height: 160px;
  margin: 48px 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const GoToSignUp = styled.button`
  width: fit-content;
  text-align: start;
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-top: 40px;
  & > a {
    font-size: ${({ theme }) => theme.fonts.font14};
    color: ${({ theme }) => theme.colors.Gray500};
    text-decoration: underline;
    text-underline-position: under;
    &:hover {
      color: ${({ theme }) => theme.colors.Gray500};
      text-decoration: underline;
      text-underline-position: under;
    }
  }
`;

export default Login;
