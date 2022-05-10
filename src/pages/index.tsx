import {
  STACK_LIST,
  GENERATION_LIST,
} from 'src/core/constants/filter.constants';
import { NextRouter, useRouter } from 'next/router';
import { Card } from 'src/components/common/Card';
import { Button } from 'src/components/common/Button';
import resumeApi from 'src/core/apis/resume/resume.api';
import { useScrollTop } from 'src/core/hooks/useScrollTop';
import { ScrollTop } from 'src/components/common/ScrollTop';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { SelectBox } from 'src/components/common/SelectBox';
import styled, { DefaultTheme, useTheme } from 'styled-components';
import { ResumesResponse } from 'src/core/apis/resume/resume.param';
import { IResume } from 'src/types/resume.type';
import { ChangeEvent, useEffect, useState } from 'react';
import { useGetInfo } from 'src/core/hooks/useGetInfo';

interface Filter {
  stackFilter: number;
  generationFilter: number;
}

const Main = (): JSX.Element => {
  const { userInfo } = useGetInfo();
  const router: NextRouter = useRouter();
  const theme: DefaultTheme = useTheme();
  const { showScrollVisible, onClickScrollTop } = useScrollTop();
  const [filter, setFilter] = useState<Filter>({
    generationFilter: 0,
    stackFilter: 0,
  });

  const { isLoading, error, data } = useQuery<
    ResumesResponse,
    Error,
    IResume[]
  >('resumes', () => resumeApi.getResumes(), {
    select: (data) => {
      return data.data;
    },
  });

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
            content={userInfo.resume ? '내 이력서 보기' : '이력서 등록하기'}
            fontSize={theme.fonts.font14}
            color={theme.colors.White900}
            borderRadius="999px"
            backgroundColor={theme.colors.Main1}
            customStyle={{
              visibility: userInfo.generation ? 'visible' : 'hidden',
            }}
            handleClick={() =>
              router.push(
                userInfo.resume
                  ? `/resume/${userInfo.resume.idx}`
                  : '/resume/write',
              )
            }
          />
          <SelectBoxes>
            <SelectBox
              content={STACK_LIST}
              width="126px"
              height="38px"
              border={`2px solid ${theme.colors.Main1}`}
              value={filter.stackFilter}
              name="stackFilter"
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setFilter({ ...filter, [e.target.name]: e.target.value })
              }
            />
            <SelectBox
              value={filter.generationFilter}
              content={GENERATION_LIST}
              width="126px"
              height="38px"
              border={`2px solid ${theme.colors.Main1}`}
              name="generationFilter"
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setFilter({ ...filter, [e.target.name]: e.target.value })
              }
            />
          </SelectBoxes>
        </TopWrapper>
        <Contents>
          {data?.map((v) => {
            return (
              <Card
                key={v.idx}
                thumbnail={v.thumbnail}
                title={v.title}
                company={v.company}
                stack={v.stack}
                generation={v.user.generation}
                name={v.user.name}
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
  height: 256px;
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
