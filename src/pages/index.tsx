import type { NextPage } from 'next';
import { NextRouter, useRouter } from 'next/router';
import { Button } from 'src/components/common/Button';
import { Card } from 'src/components/common/Card';
import { SelectBox } from 'src/components/common/SelectBox';
import {
  FLATFORM_LIST,
  GENERATION_LIST,
  STACK_LIST,
} from 'src/core/constants/filter.constants';
import styled, { DefaultTheme, useTheme } from 'styled-components';

const Main: NextPage = () => {
  const router: NextRouter = useRouter();
  const theme: DefaultTheme = useTheme();

  return (
    <>
      <Banner />
      <Container>
        <TopWrapper>
          <Button
            width="126px"
            height="38px"
            content="이력서 등록하기"
            fontSize={theme.fonts.font14}
            color={theme.colors.White900}
            borderRadius="999px"
            backgroundColor={theme.colors.Main1}
            handleClick={() => {
              // TODO
            }}
          />
          <SelectBoxes>
            <SelectBox
              content={STACK_LIST}
              width="126px"
              height="38px"
              border={`2px solid ${theme.colors.Main1}`}
            />
            <SelectBox
              content={FLATFORM_LIST}
              width="126px"
              height="38px"
              border={`2px solid ${theme.colors.Main1}`}
            />
            <SelectBox
              content={GENERATION_LIST}
              width="126px"
              height="38px"
              border={`2px solid ${theme.colors.Main1}`}
            />
          </SelectBoxes>
        </TopWrapper>
        <Contents>
          <Card
            thumbnail="https://res.cloudinary.com/linkareer/image/fetch/f_auto,c_thumb,w_500,h_250/https://supple-attachment.s3.ap-northeast-2.amazonaws.com/post-thumbnail/7I6f998fmV42ptW-Wu3OY"
            title="FLO 합격한 제정민 포트폴리오"
            company="FLO"
            platform="PDF"
            stack="백엔드"
            generation={4}
            name="제정민"
          />
        </Contents>
      </Container>
    </>
  );
};

export default Main;

const Banner = styled.article`
  width: 1920px;
  height: 256px;
  background-image: url('/assets/Banner.svg');
  background-repeat: no-repeat;
  cursor: pointer;
  margin: -4px 0px 32px 0px;
`;

const Container = styled.section`
  width: 100%;
  max-width: 1920px;
  padding: 0px 215px;
`;

const TopWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  text-align: center;
  align-items: center;
  margin-bottom: 40px;
`;

const SelectBoxes = styled.div`
  width: 400px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const Contents = styled.div``;
