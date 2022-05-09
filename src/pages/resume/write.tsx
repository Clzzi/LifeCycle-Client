import { ChangeEvent, useEffect } from 'react';
import { Button } from 'src/components/common/Button';
import { ImageInput } from 'src/components/common/ImageInput';
import { Input } from 'src/components/common/Input';
import { Label } from 'src/components/common/Label';
import { PDFInput } from 'src/components/common/PDFInput';
import { SelectBox } from 'src/components/common/SelectBox';
import { Title } from 'src/components/common/Title';
import { STACK_LIST } from 'src/core/constants/filter.constants';
import { Error, useForm } from 'src/core/hooks/useForm';
import { theme } from 'src/core/styles/theme';
import styled from 'styled-components';

interface Values {
  title: string | undefined;
  company: string | undefined;
  stack: string | undefined;
  content: string | undefined;
  thumbnail: string | undefined;
}

const ResumeWrite = () => {
  const { values, errors, isLoading, setValues, handleSubmit } =
    useForm<Values>({
      initialValue: {
        title: undefined,
        company: undefined,
        stack: undefined,
        content: undefined,
        thumbnail: undefined,
      },
      onSubmit: () => {
        // TODO
      },
      validate: ({ title, company, content, thumbnail, stack }) => {
        const errors: Error<Values> = {};

        if (title !== undefined && title.length === 0) {
          errors.title = '제목을 입력해주세요';
        }

        if (company !== undefined && company.length === 0) {
          errors.company = '회사이름을 입력해주세요';
        }

        if (stack !== undefined && stack === '0') {
          errors.stack = '기술분야를 선택해주세요';
        }

        return errors;
      },
    });

  return (
    <Wrapper>
      <Container>
        <Title
          mainSize={theme.fonts.font22}
          subSize={theme.fonts.font14}
          width="480px"
          height="58px"
          mainColor={theme.colors.White900}
          subColor={theme.colors.White700}
          mainText="포트폴리오 등록"
          subText="여러분들의 멋진 포트폴리오를 공유해보세요!"
        />
        <ImageInput
          text="썸네일을 등록해주세요"
          width="100%"
          height="245px"
          fontSize={theme.fonts.font16}
          color={theme.colors.Gray700}
          errorMessage={errors.thumbnail ? errors.thumbnail : ''}
          name="image"
          backgroundColor="transparent"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            console.log(e.target.files)
          }
          margin="60px 0px"
        />
        <Inputs>
          <Input
            value={values.title}
            errorMessage={errors.title ? errors.title : ''}
            placeholder="제목"
            type="text"
            backgroundColor={theme.colors.Black500}
            borderRadius="4px"
            fontSize={theme.fonts.font16}
            errorFontSize={theme.fonts.font14}
            color={theme.colors.White900}
            padding="6px 12px"
            name="title"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
            width="100%"
            height="56px"
          />
          <Input
            value={values.company}
            errorMessage={errors.company ? errors.company : ''}
            placeholder="회사명"
            type="text"
            backgroundColor={theme.colors.Black500}
            borderRadius="4px"
            fontSize={theme.fonts.font16}
            errorFontSize={theme.fonts.font14}
            color={theme.colors.White900}
            padding="6px 12px"
            name="company"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
            width="100%"
            height="56px"
          />
          <Label
            message={errors.stack ? errors.stack : ''}
            fontSize={theme.fonts.font14}>
            <SelectBox
              content={STACK_LIST}
              width="100%"
              height="56px"
              border="none"
              borderRadius="4px"
              backgroundColor={theme.colors.Black500}
              customStyle={{
                padding: '6px 12px',
                margin: '0px 0px 4px 0px',
              }}
              name="stack"
              value={values.stack}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </Label>
          <PDFInput
            placeholder="PDF파일"
            errorMessage={errors.content ? errors.content : ''}
            height="56px"
            width="100%"
            borderRadius="4px"
            backgroundColor={theme.colors.Black500}
            padding="6px 12px"
            title={values.content}
            name="content"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              console.log(e.target.files);
              setValues({
                ...values,
                [e.target.name]: e.target.files![0].name,
              });
            }}
            color={theme.colors.White900}
            customStyle={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
              textAlign: 'center',
            }}
          />
        </Inputs>
        <Buttons>
          <Button
            width="102px"
            height="38px"
            content="등록"
            fontSize={theme.fonts.font14}
            color={theme.colors.White900}
            borderRadius="2px"
            backgroundColor={theme.colors.Main1}
            handleClick={() => {
              // TODO
            }}
          />
          <Button
            width="102px"
            height="38px"
            content="뒤로"
            fontSize={theme.fonts.font14}
            color={theme.colors.White500}
            borderRadius="2px"
            backgroundColor="transparent"
            customStyle={{
              border: `1px solid ${theme.colors.Gray900}`,
              marginLeft: '16px',
            }}
            handleClick={() => {
              // TODO
            }}
          />
        </Buttons>
      </Container>
    </Wrapper>
  );
};

export default ResumeWrite;

const Wrapper = styled.div`
  width: 100vw;
  height: calc(100vh - 56px);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Container = styled.main`
  width: 482px;
  display: flex;
  flex-direction: column;
`;

const Inputs = styled.div`
  width: 100%;
  height: 342px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
  text-align: center;
  align-items: center;
  margin-top: 12px;
`;
