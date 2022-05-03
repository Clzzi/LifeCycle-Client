import { ChangeEvent, useEffect } from 'react';
import { Input } from 'src/components/common/Input';
import { Label } from 'src/components/common/Label';
import { ProfileEdit } from 'src/components/common/ProfileEdit';
import { SelectBox } from 'src/components/common/SelectBox';
import { GENERATION_LIST } from 'src/core/constants/filter.constants';
import { Error, useForm } from 'src/core/hooks/useForm';
import { theme } from 'src/core/styles/theme';
import styled from 'styled-components';

interface Values {
  generation: string | undefined;
}

const EditGeneration = () => {
  const { values, errors, isLoading, setValues, handleSubmit } =
    useForm<Values>({
      initialValue: {
        generation: undefined,
      },
      onSubmit: () => {
        // TODO
      },
      validate: ({ generation }) => {
        const errors: Error<Values> = {};
        if (generation !== undefined && generation === '0') {
          errors.generation = '바꿀 기수를 선택해주세요';
        }
        return errors;
      },
    });

  useEffect(() => {
    console.log(values);
  }, [values]);

  return (
    <Wrapper>
      <ProfileEdit
        title="기수 변경"
        subTitle="기수를 변경합니다"
        onSave={() => console.log('save')}>
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
            name="generation"
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setValues({ ...values, [e.target.name]: e.target.value })
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
