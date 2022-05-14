import styled from 'styled-components';
import { useState } from 'react';
import useResize from 'src/core/hooks/useResize';
import ResumeUtil from 'src/core/utils/resume';
import { pdfjs, Document, Page } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDF = ({ file }: { file: string }) => {
  const { size } = useResize();
  const [numPages, setNumPages] = useState<number>(0);

  return (
    <Wrapper>
      <div onContextMenu={(e) => e.preventDefault()}>
        <Document
          options={{
            standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
          }}
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
                className="page"
              />
            ))}
        </Document>
      </div>
    </Wrapper>
  );
};

export default PDF;

const Wrapper = styled.main`
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
  .page {
    margin-bottom: 60px;
  }
  .annotationLayer {
    display: none;
  }
`;

const SkeletonContent = styled.div`
  width: 100%;
  height: 70%;
  background-color: ${({ theme }) => theme.colors.Gray700};
  border-radius: 4px;
`;
