import type { NextPage } from 'next';
import { NextRouter, useRouter } from 'next/router';
import { Button } from 'src/components/common/Button';
import { SelectBox } from 'src/components/common/SelectBox';
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
              content={[
                { name: '모든분야', value: '1' },
                { name: '프론트엔드', value: '2' },
                { name: '백엔드', value: '3' },
                { name: '안드로이드', value: '4' },
                { name: 'IOS', value: '5' },
                { name: 'AI', value: '6' },
                { name: '임베디드', value: '7' },
              ]}
              defaultValue="1"
              width="126px"
              height="38px"
              backgroundColor="transparent"
              border={`2px solid ${theme.colors.Main1}`}
              borderRadius="999px"
              color={theme.colors.White900}
              fontSize={theme.fonts.font14}
            />
            <SelectBox
              content={[
                { name: '모든플랫폼', value: '1' },
                { name: '노션', value: '2' },
                { name: 'PDF', value: '3' },
              ]}
              defaultValue="1"
              width="126px"
              height="38px"
              backgroundColor="transparent"
              border={`2px solid ${theme.colors.Main1}`}
              borderRadius="999px"
              color={theme.colors.White900}
              fontSize={theme.fonts.font14}
            />
            <SelectBox
              content={[
                { name: '전체기수', value: '전체기수' },
                { name: '1기', value: '1기' },
                { name: '2기', value: '2기' },
                { name: '3기', value: '3기' },
                { name: '4기', value: '4기' },
                { name: '5기', value: '5기' },
                { name: '6기', value: '6기' },
                { name: '7기', value: '7기' },
              ]}
              defaultValue="1"
              width="126px"
              height="38px"
              backgroundColor="transparent"
              border={`2px solid ${theme.colors.Main1}`}
              borderRadius="999px"
              color={theme.colors.White900}
              fontSize={theme.fonts.font14}
            />
          </SelectBoxes>
        </TopWrapper>
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
`;

const SelectBoxes = styled.div`
  width: 400px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;
