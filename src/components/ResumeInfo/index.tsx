import { NextRouter, useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import resumeApi from 'src/core/apis/resume/resume.api';
import useResize from 'src/core/hooks/useResize';
import { useToast } from 'src/core/hooks/useToast';
import { Tag } from 'src/core/styles/shareStyle';
import { theme } from 'src/core/styles/theme';
import ResumeUtil from 'src/core/utils/resume';
import { handleProfileImg } from 'src/core/utils/style';
import styled from '@emotion/styled';
import Button from '../common/Button';
import { Modal } from '../common/Modal';

interface Props {
  generation: number;
  name: string;
  stack: string;
  company: string;
  title: string;
  isMyResume: boolean;
}

export const ResumeInfo = ({
  company,
  generation,
  name,
  stack,
  title,
  isMyResume,
}: Props) => {
  const { size } = useResize();
  const { fireToast } = useToast();
  const router: NextRouter = useRouter();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const handleDeleteResume = useCallback(async (): Promise<void> => {
    try {
      setDeleteLoading(true);
      await resumeApi.deleteResume();
      router.push('/');
      fireToast({ content: ' 이력서 삭제 성공 🦋 ', duration: 2000 });
    } catch (e: any) {
      console.error(e);
    } finally {
      setDeleteLoading(false);
    }
  }, [router, fireToast]);

  return (
    <>
      <Wrapper width={size.width}>
        <ProfileAndBtns>
          <Profile generation={generation} data-cy="resume-detail-profile" />
          <Container>
            <span data-cy="resume-detail-title">{title}</span>
            <GenerationAndBtns>
              <div data-cy="resume-detail-userInfo">{`${generation}기 ${name}`}</div>
              {isMyResume ? (
                <Buttons>
                  <Button
                    width={
                      ResumeUtil.calculateResumeInfoButtonWidth(size.width)[0]
                    }
                    height={
                      ResumeUtil.calculateResumeInfoButtonWidth(size.width)[1]
                    }
                    name="resume-detail-edit"
                    content="수정"
                    fontSize={theme.fonts.font14}
                    color={theme.colors.Black900}
                    borderRadius="999px"
                    backgroundColor={theme.colors.White900}
                    handleClick={() => router.push('/resume/edit')}
                  />
                  <Button
                    width={
                      ResumeUtil.calculateResumeInfoButtonWidth(size.width)[0]
                    }
                    height={
                      ResumeUtil.calculateResumeInfoButtonWidth(size.width)[1]
                    }
                    name="resume-detail-delete"
                    content="삭제"
                    fontSize={theme.fonts.font14}
                    color={theme.colors.Gray600}
                    borderRadius="999px"
                    backgroundColor="transparent"
                    customStyle={{
                      border: `2px solid ${theme.colors.Gray600}`,
                    }}
                    handleClick={() => setModalVisible(true)}
                  />
                </Buttons>
              ) : null}
            </GenerationAndBtns>
          </Container>
        </ProfileAndBtns>
        <Tags>
          <Tag
            data-cy="resume-detail-generation"
            type="GENERATION"
            maxWidth="330px"
            height={ResumeUtil.calculateResumeInfoTagHeight(size.width)}
            padding="0px 34px"
            borderRadius="4px"
            fontSize={theme.fonts.font16}>
            {generation}기
          </Tag>
          <Tag
            data-cy="resume-detail-stack"
            type="STACK"
            maxWidth="330px"
            height={ResumeUtil.calculateResumeInfoTagHeight(size.width)}
            padding="0px 34px"
            borderRadius="4px"
            fontSize={theme.fonts.font16}>
            {stack}
          </Tag>
          <Tag
            data-cy="resume-detail-company"
            type="COMPANY"
            maxWidth="330px"
            height={ResumeUtil.calculateResumeInfoTagHeight(size.width)}
            padding="0px 34px"
            borderRadius="4px"
            fontSize={theme.fonts.font16}>
            {company}
          </Tag>
        </Tags>
      </Wrapper>

      <Modal
        onClose={() => setModalVisible(false)}
        visible={modalVisible}
        height="196px">
        <ModalContainer>
          <Title>이력서 삭제</Title>
          <Desc>정말 삭제하시겠습니까?</Desc>
          <ModalButtons>
            <Button
              width="102px"
              height="38px"
              content="뒤로"
              fontSize={theme.fonts.font14}
              color={theme.colors.White700}
              borderRadius="4px"
              backgroundColor={theme.colors.Gray900}
              customStyle={{
                border: `2px solid ${theme.colors.Gray900}`,
                margin: '0px 12px 0px 0px',
              }}
              name="resume-detail-modal-back"
              handleClick={() => setModalVisible(false)}
            />
            <Button
              width="102px"
              height="38px"
              content="삭제"
              name="resume-detail-modal-delete"
              isLoading={deleteLoading}
              fontSize={theme.fonts.font14}
              color={theme.colors.White900}
              borderRadius="4px"
              backgroundColor={theme.colors.Main1}
              handleClick={handleDeleteResume}
            />
          </ModalButtons>
        </ModalContainer>
      </Modal>
    </>
  );
};

const ModalContainer = styled.article`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  text-align: center;
`;

const ModalButtons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  text-align: center;
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.fonts.font24};
  color: ${({ theme }) => theme.colors.Black900};
  font-weight: bold;
`;

const Desc = styled.div`
  font-size: ${({ theme }) => theme.fonts.font18};
  color: ${({ theme }) => theme.colors.Black900};
  margin-bottom: 26px;
`;

const Wrapper = styled.main<{ width: number }>`
  width: ${(props) => ResumeUtil.calculatePDFWidth(props.width)}px;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  margin: 60px 0px;
  ${({ theme }) => theme.medias.smallDesktop} {
    margin: 45px 0px;
  }
  ${({ theme }) => theme.medias.mobile} {
    margin: 30px 0px;
  }
`;

const ProfileAndBtns = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-content: center;
  text-align: center;
  width: 100%;
  position: relative;
`;

const Profile = styled.div<{ generation: number }>`
  width: 124px;
  height: 124px;
  background-image: ${(props) => handleProfileImg(props.generation)};
  background-size: 124px;
  background-repeat: no-repeat;
  background-position: center center;
  margin-right: 12px;

  ${({ theme }) => theme.medias.smallDesktop} {
    width: 100px;
    height: 100px;
    background-size: 100px;
  }

  ${({ theme }) => theme.medias.mobile} {
    width: 80px;
    height: 80px;
    background-size: 80px;
  }
`;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  width: 100%;
  padding: 16px 0px;
  & > span {
    width: 100%;
    text-align: start;
    font-size: ${({ theme }) => theme.fonts.font28};
    color: ${({ theme }) => theme.colors.White900};
    padding-bottom: 12px;
    ${({ theme }) => theme.medias.smallDesktop} {
      font-size: ${({ theme }) => theme.fonts.font24};
    }
    ${({ theme }) => theme.medias.mobile} {
      font-size: ${({ theme }) => theme.fonts.font20};
    }
  }
`;

const GenerationAndBtns = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  & > div {
    font-size: ${({ theme }) => theme.fonts.font22};
    color: ${({ theme }) => theme.colors.White900};
    ${({ theme }) => theme.medias.smallDesktop} {
      font-size: ${({ theme }) => theme.fonts.font20};
    }
    ${({ theme }) => theme.medias.mobile} {
      font-size: ${({ theme }) => theme.fonts.font16};
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Tags = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  text-align: center;
  column-gap: 16px;
  width: 100%;
`;
