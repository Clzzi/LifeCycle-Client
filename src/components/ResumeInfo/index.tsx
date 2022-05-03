import { Tag } from 'src/core/styles/shareStyle';
import { theme } from 'src/core/styles/theme';
import styled from 'styled-components';
import { Button } from '../common/Button';

interface Props {
  generation: number;
  name: string;
  stack: string;
  company: string;
  title: string;
}

export const ResumeInfo = ({
  company,
  generation,
  name,
  stack,
  title,
}: Props) => {
  return (
    <Wrapper>
      <ProfileAndBtns>
        <Profile>
          <div />
          <span>{`${generation}기 ${name}`}</span>
        </Profile>
        <Buttons>
          <Button
            width="102px"
            height="38px"
            content="수정"
            fontSize={theme.fonts.font14}
            color={theme.colors.Black900}
            borderRadius="999px"
            backgroundColor={theme.colors.White900}
            handleClick={() => {
              // TODO
            }}
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
            handleClick={() => {
              // TODO
            }}
          />
        </Buttons>
      </ProfileAndBtns>
      <Title>{title}</Title>
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
  );
};

const Wrapper = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  margin: 60px 0px;
`;

const ProfileAndBtns = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  text-align: center;
  margin-bottom: 12px;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  & > div {
    width: 34px;
    height: 34px;
    background-image: url('/assets/unsigned-profile.svg');
    background-size: 34px;
    margin-right: 12px;
  }
  & > span {
    font-size: ${({ theme }) => theme.fonts.font14};
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

const Title = styled.div`
  text-align: start;
  width: 100%;
  font-size: ${({ theme }) => theme.fonts.font28};
  color: ${({ theme }) => theme.colors.White900};
  margin-bottom: 12px;
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
