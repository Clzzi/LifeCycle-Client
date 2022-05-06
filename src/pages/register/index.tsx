import { NextRouter, useRouter } from 'next/router';
import React, { ChangeEvent, useState } from 'react';
import { Button } from 'src/components/common/Button';
import { CheckBox } from 'src/components/common/CheckBox';
import { Input } from 'src/components/common/Input';
import { Modal } from 'src/components/common/Modal';
import { Title } from 'src/components/common/Title';
import authApi from 'src/core/apis/auth/auth.api';
import { TERM_MESSAGE } from 'src/core/constants/register.constants';
import { Error, useForm } from 'src/core/hooks/useForm';
import { UnderLineText } from 'src/core/styles/shareStyle';
import styled, { DefaultTheme, useTheme } from 'styled-components';
import { Label } from 'src/components/common/Label';
import { RegisterValues } from 'src/types/auth.type';
import { convertRegisterDto } from 'src/core/utils/auth';

const Register = () => {
  const router: NextRouter = useRouter();
  const theme: DefaultTheme = useTheme();
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const { values, errors, isLoading, setValues, handleSubmit } =
    useForm<RegisterValues>({
      initialValue: {
        id: undefined,
        pw: undefined,
        name: undefined,
        generation: undefined,
        isTermsCheck: undefined,
      },
      onSubmit: async () => {
        try {
          await authApi.register(convertRegisterDto(values));
          router.push('/login');
        } catch (e: any) {
          console.error(e);
        }
      },
      validate: ({ id, pw, name, generation, isTermsCheck }) => {
        const errors: Error<RegisterValues> = new Object();
        if (id?.length === 0) {
          errors.id = 'ID를 입력해주세요';
        }
        if (pw?.length === 0) {
          errors.pw = 'PW를 입력해주세요';
        }
        if (name !== undefined && name.length === 0) {
          errors.name = '이름을 입력해주세요';
        }
        if (generation !== undefined && (generation > 7 || generation < 1)) {
          errors.generation = '기수를 입력해주세요';
        }
        if (isTermsCheck !== undefined && isTermsCheck === false) {
          errors.isTermsCheck = '약관동의에 체크해주세요';
        }
        return { ...errors };
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
              setValues({
                ...values,
                [e.target.name]: e.target.value,
              })
            }
            width="100%"
            height="56px"
            max={7}
            min={1}
          />
        </InputContainer>
        <Label
          message={errors.isTermsCheck ? errors.isTermsCheck : ''}
          fontSize={theme.fonts.font14}>
          <CheckBoxContainer>
            <CheckBox
              className="test"
              checked={
                typeof values.isTermsCheck === 'boolean'
                  ? (values.isTermsCheck as boolean)
                  : false
              }
              onClick={() =>
                setValues({
                  ...values,
                  isTermsCheck:
                    typeof values.isTermsCheck !== 'boolean'
                      ? true
                      : !values.isTermsCheck,
                })
              }
            />
            <TermMessage onClick={() => setIsVisibleModal(true)}>
              <a>약관동의</a>
            </TermMessage>
          </CheckBoxContainer>
        </Label>
        <ButtonContainer>
          <Button
            width="488px"
            height="56px"
            content="회원가입"
            fontSize={theme.fonts.font20}
            color={theme.colors.White900}
            borderRadius="999px"
            backgroundColor={theme.colors.Main1}
            handleClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              handleSubmit(e)
            }
          />
        </ButtonContainer>
        <GoToLogin onClick={() => router.push('/login')}>
          <a>이미 계정이 있나요?</a>
        </GoToLogin>
      </Container>
      <Modal visible={isVisibleModal} onClose={() => setIsVisibleModal(false)}>
        <Title
          mainSize={theme.fonts.font28}
          width="100%"
          height="48px"
          mainColor={theme.colors.Black900}
          mainText="이용약관"
          customStyle={{ marginBottom: '16px' }}
        />
        {TERM_MESSAGE.map((term) => {
          return (
            <TermMsg key={term.title}>
              <span>{term.title}</span>
              <p>{term.content}</p>
            </TermMsg>
          );
        })}
      </Modal>
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

const TermMsg = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: center;
  margin-bottom: 22px;
  font-size: ${({ theme }) => theme.fonts.font16};
  line-height: 1.3;
  & > p {
    text-align: start;
    word-break: keep-all;
  }

  & > span {
    text-align: start;
    font-weight: bold;
  }
`;
