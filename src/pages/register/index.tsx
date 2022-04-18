import { NextRouter, useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import { Button } from 'src/components/common/Button';
import { CheckBox } from 'src/components/common/CheckBox';
import { Input } from 'src/components/common/Input';
import { Title } from 'src/components/common/Title';
import { Error, useForm } from 'src/core/hooks/useForm';
import { UnderLineText } from 'src/core/styles/shareStyle';
import styled, { DefaultTheme, useTheme } from 'styled-components';

interface Values {
  id: string | undefined;
  pw: string | undefined;
  name: string | undefined;
  generation: number | undefined;
}

const Register = () => {
  const router: NextRouter = useRouter();
  const theme: DefaultTheme = useTheme();
  const [isTermsCheck, setIsTermsCheck] = useState<boolean>(false);
  const { values, errors, isLoading, setValues, handleSubmit } =
    useForm<Values>({
      initialValue: {
        id: undefined,
        pw: undefined,
        name: undefined,
        generation: undefined,
      },
      onSubmit: () => {
        // TODO
      },
      validate: ({ id, pw, name, generation }) => {
        const errors: Error<Values> = new Object();
        if (id !== undefined && id.length === 0) {
          errors.id = 'ID를 입력해주세요';
        }
        if (pw !== undefined && pw.length === 0) {
          errors.pw = 'PW를 입력해주세요';
        }
        if (name !== undefined && name.length === 0) {
          errors.name = '이름을 입력해주세요';
        }
        if (generation !== undefined && generation > 7) {
          errors.generation = '기수를 입력해주세요';
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
          height="78px"
          mainColor={theme.colors.White900}
          subColor={theme.colors.Gray500}
          mainText="회원가입"
          subText="LifeCycle에서 여러분의 이력서를 공유해보세요!"
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
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
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
            errorFontSize={theme.fonts.font14}
            padding="6px 12px"
            name="pw"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
            width="100%"
            height="56px"
          />
          <Input
            value={values.name}
            errorMessage={errors.name ? errors.name : ''}
            placeholder="이름"
            type="text"
            backgroundColor={theme.colors.White400}
            borderRadius="5px"
            fontSize={theme.fonts.font16}
            errorFontSize={theme.fonts.font14}
            padding="6px 12px"
            name="name"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
            width="100%"
            height="56px"
          />
          <Input
            value={values.generation}
            errorMessage={errors.generation ? errors.generation : ''}
            placeholder="기수"
            type="number"
            backgroundColor={theme.colors.White400}
            borderRadius="5px"
            fontSize={theme.fonts.font16}
            errorFontSize={theme.fonts.font14}
            padding="6px 12px"
            name="generation"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
            width="100%"
            height="56px"
            max={7}
            min={1}
          />
        </InputContainer>
        <CheckBoxContainer>
          <CheckBox
            className="test"
            checked={isTermsCheck}
            onClick={() => setIsTermsCheck(!isTermsCheck)}
          />
          <TermMessage>
            <a>약관동의</a>
          </TermMessage>
        </CheckBoxContainer>
        <ButtonContainer>
          <Button
            width="488px"
            height="56px"
            content="회원가입"
            fontSize={theme.fonts.font20}
            color={theme.colors.White900}
            borderRadius="999px"
            backgroundColor={theme.colors.Main1}
            handleClick={() => {
              // TODO
            }}
          />
        </ButtonContainer>
        <GoToLogin onClick={() => router.push('/')}>
          <a>이미 계정이 있나요?</a>
        </GoToLogin>
      </Container>
    </Wrapper>
  );
};

export default Register;

const Wrapper = styled.section`
  width: 100%;
  height: calc(100vh - 56px);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Container = styled.article`
  width: 560px;
  height: 720px;
  padding: 36px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.Black900};
  border-radius: 12px;
`;

const InputContainer = styled.section`
  width: 100%;
  height: 336px;
  margin: 48px 0px 0px 0px;
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
  margin-top: 12px;
`;

const CheckBoxContainer = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  text-align: center;
  align-items: center;
  margin-left: 4px;
`;

const TermMessage = styled(UnderLineText)`
  margin-left: 6px;
`;

const GoToLogin = styled(UnderLineText)`
  margin-top: 40px;
`;
