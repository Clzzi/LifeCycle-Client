import styled from 'styled-components';
import { ResumeInfo } from 'src/components/ResumeInfo';
import { PDF } from 'src/components/PDF';
import { GetStaticProps } from 'next';
import { NextRouter, useRouter } from 'next/router';
import { useScrollTop } from 'src/core/hooks/useScrollTop';
import { ScrollTop } from 'src/components/common/ScrollTop';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import resumeApi from 'src/core/apis/resume/resume.api';
import { AResumeResponse } from 'src/core/apis/resume/resume.param';
import { IResume } from 'src/types/resume.type';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { infoAtom } from 'src/core/store/auth.store';
import { useCheckLogin } from 'src/core/hooks/useCheckLogin';
import { ResumeDetailSkeleton } from 'src/components/Skeleton/ResumeDetail';

const Resume = ({ idx }: { idx: number }) => {
  useCheckLogin();
  const router: NextRouter = useRouter();
  const userInfo = useRecoilValue(infoAtom);
  const [isIdx, setIsIdx] = useState<boolean>(false);
  const [isMyResume, setIsMyResume] = useState<boolean>(false);
  const { showScrollVisible, onClickScrollTop } = useScrollTop();

  useEffect(() => {
    if (idx) {
      setIsIdx(true);
    } else {
      setIsIdx(false);
    }
  }, [idx, router]);

  const { isLoading, error, data } = useQuery<AResumeResponse, Error, IResume>(
    'AResume',
    () => resumeApi.getAResume({ idx }),
    {
      select: (data) => {
        return data.data;
      },
      enabled: isIdx,
    },
  );

  useEffect(() => {
    if (data?.user.userId === userInfo.userId) {
      setIsMyResume(true);
    } else {
      setIsMyResume(false);
    }
  }, [data?.user.userId, userInfo.userId]);

  if (isLoading) {
    return <ResumeDetailSkeleton />;
  }

  if (error) {
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
  await queryClient.prefetchQuery('AResume', () =>
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
