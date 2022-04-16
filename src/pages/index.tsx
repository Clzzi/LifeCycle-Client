import type { NextPage } from 'next';
import { ChangeEvent, useCallback } from 'react';
import { Input } from 'src/components/common/Input';
import { Header } from 'src/components/common/Layout/Header';
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
          mainSize="28px"
          subSize="16px"
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
            fontSize="16px"
            isAutoFocus
            errorFontSize="14px"
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
            fontSize="16px"
            isAutoFocus
            errorFontSize="14px"
            padding="6px 12px"
            name="pw"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setValues({ ...values, [e.target.name]: e.target.value });
            }}
            width="100%"
            height="56px"
          />
        </InputContainer>
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

export default Login;
