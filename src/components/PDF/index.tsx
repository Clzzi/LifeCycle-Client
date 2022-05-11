import styled from 'styled-components';
import { Document, Page } from 'react-pdf';
import { useState } from 'react';

export const PDF = ({ file }: { file: string }) => {
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
              <Page pageNumber={page} key={page} width={1200} />
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
`;

const SkeletonContent = styled.div`
  width: 100%;
  height: 70%;
  background-color: ${({ theme }) => theme.colors.Gray700};
  border-radius: 4px;
`;
