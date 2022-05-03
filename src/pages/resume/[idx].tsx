import styled from 'styled-components';
import { ResumeInfo } from 'src/components/ResumeInfo';
import { PDF } from 'src/components/PDF';
import { GetStaticPaths, GetStaticProps } from 'next';
import { NextRouter, useRouter } from 'next/router';
import { useScrollTop } from 'src/core/hooks/useScrollTop';
import { ScrollTop } from 'src/components/common/ScrollTop';

const Resume = ({ idx }: { idx: string }) => {
  const router: NextRouter = useRouter();
  const { showScrollVisible, onClickScrollTop } = useScrollTop();

  if (router.isFallback) {
    // 스켈레톤 UI
    return <div>loading</div>;
  }

  return (
    <Wrapper>
      <ScrollTop visible={showScrollVisible} onClick={onClickScrollTop} />
      <Container>
        <ResumeInfo
          generation={4}
          name="제정민"
          stack="백엔드"
          company="FLO"
          title="🔥 FLO 합격한 제정민 포트폴리오"
        />
        <PDF file="https://lifecycle-s3.s3.ap-northeast-2.amazonaws.com/a341fa34-fc1b-4c9c-8b30-e9a0ae3bafd1.pdf" />
      </Container>
    </Wrapper>
  );
};

export default Resume;

export const getStaticProps: GetStaticProps = async (context: any) => {
  const idx = context.params.idx as string;

  // if (false) { TODO -> API 통신후 에러시 notFound 리턴
  //   return { notFound: true };
  // }

  return {
    props: {
      idx,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = [{ params: { idx: '2' } }];
  return {
    paths,
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
`;
