import { NextRouter, useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import resumeApi from 'src/core/apis/resume/resume.api';
import { useToast } from 'src/core/hooks/useToast';
import { Tag } from 'src/core/styles/shareStyle';
import { theme } from 'src/core/styles/theme';
import { handleProfileImg } from 'src/core/utils/style';
import styled from 'styled-components';
import { Button } from '../common/Button';
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
  const { fireToast } = useToast();
  const router: NextRouter = useRouter();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const handleDeleteResume = useCallback(async () => {
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
      <Wrapper>
        <ProfileAndBtns>
          <Profile generation={generation} />
          <Container>
            <span>{title}</span>
            <GenerationAndBtns>
              <div>{`${generation}기 ${name}`}</div>
              {isMyResume ? (
                <Buttons>
                  <Button
                    width="102px"
                    height="38px"
                    content="수정"
                    fontSize={theme.fonts.font14}
                    color={theme.colors.Black900}
                    borderRadius="999px"
                    backgroundColor={theme.colors.White900}
                    handleClick={() => router.push('/resume/edit')}
                  />
                  <Button
                    width="102px"
                    height="38px"
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
            type="GENERATION"
            maxWidth="330px"
            height="28px"
            padding="0px 34px"
            borderRadius="4px"
            fontSize={theme.fonts.font16}>
            {generation}기
          </Tag>
          <Tag
            type="STACK"
            maxWidth="330px"
            height="28px"
            padding="0px 34px"
            borderRadius="4px"
            fontSize={theme.fonts.font16}>
            {stack}
          </Tag>
          <Tag
            type="COMPANY"
            maxWidth="330px"
            height="28px"
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
              handleClick={() => setModalVisible(false)}
            />
            <Button
              width="102px"
              height="38px"
              content="삭제"
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

const ModalContainer = styled.section`
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
  margin-bottom: 26px;
`;

const Wrapper = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  margin: 60px 0px;
`;

const ProfileAndBtns = styled.div`
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
`;

const Container = styled.div`
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
