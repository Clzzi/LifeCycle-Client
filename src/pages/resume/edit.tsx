import { NextRouter, useRouter } from 'next/router';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Button } from 'src/components/common/Button';
import { ImageInput } from 'src/components/common/ImageInput';
import { Input } from 'src/components/common/Input';
import { Label } from 'src/components/common/Label';
import { PDFInput } from 'src/components/common/PDFInput';
import { SelectBox } from 'src/components/common/SelectBox';
import { Title } from 'src/components/common/Title';
import resumeApi from 'src/core/apis/resume/resume.api';
import { STACK_LIST } from 'src/core/constants/filter.constants';
import { useCheckResume } from 'src/core/hooks/useCheckResume';
import { Error, useForm } from 'src/core/hooks/useForm';
import { infoAtom } from 'src/core/store/auth.store';
import { theme } from 'src/core/styles/theme';
import ResumeUtil from 'src/core/utils/resume';
import styled from 'styled-components';

interface Values {
  title: string | undefined;
  company: string | undefined;
  stack: string | undefined | number;
  content: string | undefined;
  thumbnail: string | undefined;
}

const EditResume = () => {
  useCheckResume('EDIT');
  const router: NextRouter = useRouter();
  const [pdfName, setPdfName] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string>('');

  const onChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const formData = new FormData();
      formData.append('files', e.target.files[0]);
      const { data } = await resumeApi.upload(formData);

      if (e.target.files[0].type.startsWith('image')) {
        setImagePreview(data[0]);
        setValues({ ...values, thumbnail: data[0] });
      } else {
        setPdfName(e.target.files![0].name);
        setValues({ ...values, content: data[0] });
      }
    }
  };

  const userInfo = useRecoilValue(infoAtom);
  const { values, errors, isLoading, setValues, handleSubmit } =
    useForm<Values>({
      initialValue: {
        title: undefined,
        company: undefined,
        stack: undefined,
        content: undefined,
        thumbnail: undefined,
      },
      onSubmit: async () => {
        try {
          values.stack = ResumeUtil.convertStackToString(Number(values.stack));
          const { data } = await resumeApi.updateResume(values);
          router.push(`/resume/${data.idx}`);
        } catch (e: any) {
          console.error(e);
        }
      },
      validate: ({ title, company, stack }) => {
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

  const onDeleteImage = useCallback(() => {
    setValues({ ...values, thumbnail: '' });
    setImagePreview('');
  }, [setValues, setImagePreview, values]);

  useEffect(() => {
    if (userInfo.name.length && userInfo.resume !== null) {
      setImagePreview(userInfo.resume.thumbnail);
      setPdfName(userInfo.resume.content);
      setValues({
        title: userInfo.resume.title,
        company: userInfo.resume.company,
        stack: ResumeUtil.convertStackToNumber(userInfo.resume.stack),
        content: userInfo.resume.content,
        thumbnail: userInfo.resume.thumbnail,
      });
    }
  }, [userInfo, setValues]);

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
          mainText="포트폴리오 수정"
          subText="포트폴리오 수정이 필요하신가요?"
        />
        {imagePreview.length ? (
          <PreviewDim onClick={onDeleteImage}>
            <Preview url={imagePreview} />
          </PreviewDim>
        ) : (
          <ImageInput
            text="썸네일을 등록해주세요"
            width="100%"
            height="245px"
            fontSize={theme.fonts.font16}
            color={theme.colors.Gray700}
            errorMessage={errors.thumbnail ? errors.thumbnail : ''}
            name="image"
            backgroundColor="transparent"
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeFile(e)}
            margin="60px 0px"
          />
        )}
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
            height="fit-content"
            width="100%"
            borderRadius="4px"
            backgroundColor={theme.colors.Black500}
            padding="16px 40px 16px 12px"
            title={pdfName}
            name="content"
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeFile(e)}
            color={theme.colors.White900}
            customStyle={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
              textAlign: 'start',
            }}
          />
        </Inputs>
        <Buttons>
          <Button
            width="102px"
            height="38px"
            content="수정"
            fontSize={theme.fonts.font14}
            color={theme.colors.White900}
            borderRadius="2px"
            backgroundColor={theme.colors.Main1}
            handleClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              handleSubmit(e)
            }
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
            handleClick={() => router.back()}
          />
        </Buttons>
      </Container>
    </Wrapper>
  );
};

export default EditResume;

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
  height: fit-content;
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

const PreviewDim = styled.div`
  width: 100%;
  height: 245px;
  border-radius: 4px;
  margin: 68px 0px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.Gray700};
  &:hover {
    &::after {
      position: absolute;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      content: url('/assets/Delete.svg');
    }
  }
`;

const Preview = styled.div<{ url: string }>`
  width: 100%;
  height: 245px;
  background-image: ${(props) => `url(${props.url})`};
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s;
  z-index: 999;
  &:hover {
    -webkit-filter: blur(1.5px);
    -moz-filter: blur(1.5px);
    -o-filter: blur(1.5px);
    -ms-filter: blur(1.5px);
    filter: blur(1.5px);
    transform: scale(1.02);
  }
`;
