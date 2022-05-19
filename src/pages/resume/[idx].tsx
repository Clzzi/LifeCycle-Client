import styled from '@emotion/styled';
import { ResumeInfo } from 'src/components/ResumeInfo';
import { GetStaticProps } from 'next';
import { NextRouter, useRouter } from 'next/router';
import { useScrollTop } from 'src/core/hooks/useScrollTop';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import resumeApi from 'src/core/apis/resume/resume.api';
import { AResumeResponse } from 'src/core/apis/resume/resume.param';
import { IResume } from 'src/types/resume.type';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { infoAtom } from 'src/core/store/auth.store';
import { useCheckLogin } from 'src/core/hooks/useCheckLogin';
import { ResumeDetailSkeleton } from 'src/components/Skeleton/ResumeDetail';
import dynamic from 'next/dynamic';
import DateUtil from 'src/core/utils/date';

const PDF = dynamic(() => import('src/components/PDF'));
const ScrollTop = dynamic(() => import('src/components/common/ScrollTop'));

const Resume = ({ idx }: { idx: number }) => {
  useCheckLogin();
  const router: NextRouter = useRouter();
  const userInfo = useRecoilValue(infoAtom);
  const [isIdx, setIsIdx] = useState<boolean>(false);
  const { showScrollVisible, onClickScrollTop } = useScrollTop();
  const [isMyResume, setIsMyResume] = useState<boolean>(false);

  useEffect(() => {
    if (idx) {
      setIsIdx(true);
    } else {
      setIsIdx(false);
    }
  }, [idx, router]);

  const { isLoading, isError, data } = useQuery<
    AResumeResponse,
    Error,
    IResume
  >(['AResume', idx], () => resumeApi.getAResume({ idx }), {
    select: (data) => {
      return data.data;
    },
  });

  useEffect(() => {
    if (data?.user.userId === userInfo.userId) {
      setIsMyResume(true);
    } else {
      setIsMyResume(false);
    }
  }, [data?.user.userId, userInfo.userId]);

  if (isLoading)
    return (
      <Wrapper>
        <ResumeDetailSkeleton />
      </Wrapper>
    );

  if (isError) {
    router.push('/404');
  }

  return (
    <Wrapper>
      <ScrollTop visible={showScrollVisible} onClick={onClickScrollTop} />
      {data && (
        <Container>
          <ResumeInfo
            generation={data.user.generation}
            name={data.user.name}
            stack={data.stack}
            company={data.company}
            title={data.title}
            isMyResume={isMyResume}
          />
          <PDF file={data.content} />
        </Container>
      )}
    </Wrapper>
  );
};

export default Resume;

export const getStaticProps: GetStaticProps = async (context: any) => {
  const idx = Number(context.params.idx);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['AResume', idx], () =>
    resumeApi.getAResume({ idx }),
  );

  return {
    props: {
      idx,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

const Wrapper = styled.section`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow-x: hidden;
`;

const Container = styled.main`
  max-width: 1200px;
  width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
