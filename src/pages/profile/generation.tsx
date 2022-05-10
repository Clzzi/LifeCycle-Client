import { NextRouter, useRouter } from 'next/router';
import { ChangeEvent, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { Label } from 'src/components/common/Label';
import { ProfileEdit } from 'src/components/common/ProfileEdit';
import { SelectBox } from 'src/components/common/SelectBox';
import userApi from 'src/core/apis/user/user.api';
import { GENERATION_LIST } from 'src/core/constants/filter.constants';
import { useCheckLogin } from 'src/core/hooks/useCheckLogin';
import { Error, useForm } from 'src/core/hooks/useForm';
import { infoAtom } from 'src/core/store/auth.store';
import { theme } from 'src/core/styles/theme';
import styled from 'styled-components';

interface Values {
  generation: number | undefined;
}

const EditGeneration = () => {
  useCheckLogin();
  const router: NextRouter = useRouter();
  const userInfo = useRecoilValue(infoAtom);
  const { values, errors, isLoading, setValues, handleSubmit } =
    useForm<Values>({
      initialValue: {
        generation: undefined,
      },
      onSubmit: async () => {
        try {
          await userApi.updateGeneration({ generation: values.generation! });
          router.push('/profile');
        } catch (e: any) {
          console.error(e);
        }
      },
      validate: ({ generation }) => {
        const errors: Error<Values> = {};
        if (generation !== undefined && generation === 0) {
          errors.generation = '바꿀 기수를 선택해주세요';
        }
        return errors;
      },
    });

  useEffect(() => {
    setValues({ generation: userInfo.generation });
  }, [userInfo, setValues]);

  return (
    <Wrapper>
      <ProfileEdit
        title="기수 변경"
        subTitle="기수를 변경합니다"
        onSave={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
          handleSubmit(e)
        }>
        <Label
          message={errors.generation ? errors.generation : ''}
          fontSize={theme.fonts.font14}
          customStyle={{ margin: '26px 0px' }}>
          <SelectBox
            content={GENERATION_LIST}
            width="100%"
            height="56px"
            border="none"
            borderRadius="4px"
            backgroundColor={theme.colors.Black500}
            customStyle={{
              padding: '6px 12px',
              margin: '0px 0px 4px 0px',
            }}
            value={values.generation}
            name="generation"
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setValues({ ...values, [e.target.name]: Number(e.target.value) })
            }
          />
        </Label>
      </ProfileEdit>
    </Wrapper>
  );
};

export default EditGeneration;

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
