import styled from 'styled-components';
import { Document, Page } from 'react-pdf';
import { useState } from 'react';
import useResize from 'src/core/hooks/useResize';
import ResumeUtil from 'src/core/utils/resume';

export const PDF = ({ file }: { file: string }) => {
  const { size } = useResize();
  const [numPages, setNumPages] = useState<number>(0);

  return (
    <Wrapper>
      <div onContextMenu={(e) => e.preventDefault()}>
        <Document
          file={file}
          loading={<SkeletonContent className="animated" />}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
          {Array.apply(null, Array(numPages))
            .map((_, i) => i + 1)
            .map((page) => (
              <Page
                pageNumber={page}
                key={page}
                width={ResumeUtil.calculatePDFWidth(size.width)}
              />
            ))}
        </Document>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  max-width: 1200px;
  height: fit-content;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0px 215px;
  ${({ theme }) => theme.medias.smallDesktop} {
    padding: 0px 97px;
  }

  ${({ theme }) => theme.medias.mobile} {
    padding: 0px 38px;
  }
`;

const SkeletonContent = styled.div`
  width: 100%;
  height: 70%;
  background-color: ${({ theme }) => theme.colors.Gray700};
  border-radius: 4px;
`;
