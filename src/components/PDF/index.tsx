import styled from 'styled-components';
import { Document, Page } from 'react-pdf';
import { useState } from 'react';

export const PDF = ({ file }: { file: string }) => {
  const [numPages, setNumPages] = useState<number>(0);
  return (
    <Wrapper>
      <Document
        file={file}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
        {Array.apply(null, Array(numPages))
          .map((_, i) => i + 1)
          .map((page) => (
            <Page pageNumber={page} key={page} width={1200} />
          ))}
      </Document>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  max-width: 1200px;
  height: fit-content;
  border-radius: 12px;
`;
