import { NextRouter, useRouter } from 'next/router';
import { Card } from 'src/components/common/Card';
import { Button } from 'src/components/common/Button';
import { useScrollTop } from 'src/core/hooks/useScrollTop';
import { ScrollTop } from 'src/components/common/ScrollTop';
import { SelectBox } from 'src/components/common/SelectBox';
import styled, { DefaultTheme, useTheme } from 'styled-components';
import {
  GENERATION_LIST,
  STACK_LIST,
} from 'src/core/constants/filter.constants';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import resumeApi from 'src/core/apis/resume/resume.api';
import { ResumesResponse } from 'src/core/apis/resume/resume.param';
import { useEffect } from 'react';

const Main = (): JSX.Element => {
  const router: NextRouter = useRouter();
  const theme: DefaultTheme = useTheme();
  const { showScrollVisible, onClickScrollTop } = useScrollTop();

  const { isLoading, error, data } = useQuery<ResumesResponse, Error>(
    'resumes',
    () => resumeApi.getResumes(),
  );

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (isLoading) return <div>Loading</div>;
  if (error) router.push('/404');
  return (
    <>
      <ScrollTop visible={showScrollVisible} onClick={onClickScrollTop} />
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
            handleClick={() => router.push('/resume/write')}
          />
          <SelectBoxes>
            <SelectBox
              content={STACK_LIST}
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
          {data?.data?.map((v) => {
            return (
              <Card
                key={v.idx}
                thumbnail={v.thumbnail}
                title={v.title}
                company={v.company}
                stack={v.stack}
                generation={4}
                name="제정민"
                idx={v.idx}
              />
            );
          })}
        </Contents>
      </Container>
    </>
  );
};

export default Main;

const Banner = styled.article`
  width: 100%;
  /* height: 256px; */
  height: 15vh;
  background: url('/assets/Banner.svg') no-repeat center;
  cursor: pointer;
  margin: -4px 0px 32px 0px;
  background-size: 100%;
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
  width: 272px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const Contents = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 50px;
  grid-column-gap: 30px;
`;

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('resumes', () => resumeApi.getResumes());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
