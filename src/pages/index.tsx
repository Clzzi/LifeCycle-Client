import {
  STACK_LIST,
  GENERATION_LIST,
} from 'src/core/constants/filter.constants';
import { NextRouter, useRouter } from 'next/router';
import { Card } from 'src/components/common/Card';
import resumeApi from 'src/core/apis/resume/resume.api';
import { useScrollTop } from 'src/core/hooks/useScrollTop';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { ResumesResponse } from 'src/core/apis/resume/resume.param';
import { IResume } from 'src/types/resume.type';
import { ChangeEvent, memo, useCallback, useState } from 'react';
import ResumeUtil from 'src/core/utils/resume';
import ResumeCard from 'src/components/Skeleton/ResumeCard';
import dynamic from 'next/dynamic';
import { useGetInfo } from 'src/core/hooks/useGetInfo';
// import ScrollTop from 'src/components/common/ScrollTop';
// import Banner from 'src/components/Banner';
// import Button from 'src/components/common/Button';
// import SelectBox from 'src/components/common/SelectBox';
import { Theme, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

const SelectBox = dynamic(() => import('src/components/common/SelectBox'));
const Button = dynamic(() => import('src/components/common/Button'));
const Banner = dynamic(() => import('src/components/Banner'));
const ScrollTop = dynamic(() => import('src/components/common/ScrollTop'));

interface Filter {
  stackFilter: number;
  generationFilter: number;
}

const Main = ({ dehydratedState }: any): JSX.Element => {
  const { userInfo } = useGetInfo();
  const router: NextRouter = useRouter();
  const theme: Theme = useTheme();
  const { showScrollVisible, onClickScrollTop } = useScrollTop();
  const [filter, setFilter] = useState<Filter>({
    generationFilter: 0,
    stackFilter: 0,
  });

  const { error, data, isFetching } = useQuery<
    ResumesResponse,
    Error,
    IResume[]
  >(['resumes', filter], () => resumeApi.getResumes(), {
    refetchOnWindowFocus: false,
    select: (data) => {
      return ResumeUtil.filterResume(
        filter.generationFilter,
        filter.stackFilter,
        data.data,
      );
    },
  });

  const Cards = useCallback(() => {
    return (
      <Contents>
        {dehydratedState.queries[0].state.data.data?.map((v: any) => {
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
    );
  }, [dehydratedState.queries]);

  const LoadingCards = useCallback(() => {
    return (
      <Contents>
        <ResumeCard />
        <ResumeCard />
        <ResumeCard />
        <ResumeCard />
        <ResumeCard />
        <ResumeCard />
        <ResumeCard />
        <ResumeCard />
        <ResumeCard />
      </Contents>
    );
  }, []);

  const NoResume = useCallback(() => {
    return (
      <NoCard>
        <div>이력서가 없습니다</div>
      </NoCard>
    );
  }, []);

  if (error) router.push('/404');

  return (
    <>
      <ScrollTop visible={showScrollVisible} onClick={onClickScrollTop} />
      <Banner />
      <Wrapper>
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
                  setFilter({
                    ...filter,
                    [e.target.name]: Number(e.target.value),
                  })
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
                  setFilter({
                    ...filter,
                    [e.target.name]: Number(e.target.value),
                  })
                }
              />
            </SelectBoxes>
          </TopWrapper>
          {false ? <LoadingCards /> : true ? <Cards /> : <NoResume />}
        </Container>
      </Wrapper>
    </>
  );
};

export default memo(Main);

const Container = styled.div`
  width: 100%;
  max-width: 1920px;
  padding: 0px 215px;
  ${({ theme }) => theme.medias.smallDesktop} {
    padding: 0px 97px;
  }

  ${({ theme }) => theme.medias.mobile} {
    padding: 0px 38px;
  }
`;

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
`;

const TopWrapper = styled.div`
  width: 100%;
  height: 38px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  text-align: center;
  align-items: center;
  margin-bottom: 40px;

  ${({ theme }) => theme.medias.smallDesktop} {
    margin-bottom: 30px;
  }

  ${({ theme }) => theme.medias.mobile} {
    flex-direction: row;
    justify-content: space-between;
    text-align: center;
    align-items: center;
    row-gap: 12px;
  }
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
  min-height: 260px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(295px, 350px));
  grid-row-gap: 50px;
  grid-column-gap: 30px;
  place-items: center;
  justify-content: center;

  ${({ theme }) => theme.medias.smallDesktop} {
    grid-template-columns: repeat(auto-fill, 295px);
  }

  ${({ theme }) => theme.medias.mobile} {
    grid-template-columns: repeat(auto-fill, 295px);
  }
`;

const NoCard = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  & > div {
    font-size: ${({ theme }) => theme.fonts.font28};
    color: ${({ theme }) => theme.colors.Main1};
    font-weight: bolder;
  }
`;

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('resumes', () => resumeApi.getResumes());
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
