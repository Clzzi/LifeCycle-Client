import { ChangeEvent } from 'react';
import { Input } from 'src/components/common/Input';
import { ProfileEdit } from 'src/components/common/ProfileEdit';
import { Error, useForm } from 'src/core/hooks/useForm';
import { theme } from 'src/core/styles/theme';
import styled from 'styled-components';

interface Values {
  currentPassword: string | undefined;
  newPassword: string | undefined;
  re_newPassword: string | undefined;
}

const EditPassword = () => {
  const { values, errors, isLoading, setValues, handleSubmit } =
    useForm<Values>({
      initialValue: {
        currentPassword: undefined,
        newPassword: undefined,
        re_newPassword: undefined,
      },
      onSubmit: () => {
        // TODO
      },
      validate: ({ currentPassword, newPassword, re_newPassword }) => {
        const errors: Error<Values> = {};
        if (currentPassword !== undefined && currentPassword.length === 0) {
          errors.currentPassword = '현재 비밀번호를 입력해주세요';
        }
        if (newPassword !== undefined && newPassword.length === 0) {
          errors.newPassword = '새 비밀번호를 입력해주세요';
        }
        if (re_newPassword !== undefined && re_newPassword.length === 0) {
          errors.re_newPassword = '새 비밀번호를 다시 입력해주세요';
        }
        return errors;
      },
    });
  return (
    <Wrapper>
      <ProfileEdit
        title="비밀번호 변경"
        subTitle="비밀번호를 변경합니다"
        onSave={() => console.log('save')}>
        <Inputs>
          <Input
            value={values.currentPassword}
            errorMessage={errors.currentPassword ? errors.currentPassword : ''}
            placeholder="현재 비밀번호"
            type="password"
            backgroundColor={theme.colors.Black500}
            borderRadius="4px"
            fontSize={theme.fonts.font16}
            errorFontSize={theme.fonts.font14}
            color={theme.colors.White900}
            padding="6px 12px"
            name="currentPassword"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setValues({ ...values, [e.target.name]: e.target.value });
            }}
            width="100%"
            height="56px"
          />
          <Input
            value={values.newPassword}
            errorMessage={errors.newPassword ? errors.newPassword : ''}
            placeholder="새 비밀번호"
            type="password"
            backgroundColor={theme.colors.Black500}
            borderRadius="4px"
            fontSize={theme.fonts.font16}
            errorFontSize={theme.fonts.font14}
            color={theme.colors.White900}
            padding="6px 12px"
            name="newPassword"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setValues({ ...values, [e.target.name]: e.target.value });
            }}
            width="100%"
            height="56px"
          />
          <Input
            value={values.re_newPassword}
            errorMessage={errors.re_newPassword ? errors.re_newPassword : ''}
            placeholder="새 비밀번호 확인"
            type="password"
            backgroundColor={theme.colors.Black500}
            borderRadius="4px"
            fontSize={theme.fonts.font16}
            errorFontSize={theme.fonts.font14}
            color={theme.colors.White900}
            padding="6px 12px"
            name="re_newPassword"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setValues({ ...values, [e.target.name]: e.target.value });
            }}
            width="100%"
            height="56px"
          />
        </Inputs>
      </ProfileEdit>
    </Wrapper>
  );
};

export default EditPassword;

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Inputs = styled.section`
  width: 100%;
  height: 248px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  margin: 30px 0px;
`;
