import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { theme } from 'src/core/styles/theme';
import { GlobalStyle } from 'src/core/styles/globalStyle';
import { Layout } from 'src/components/common/Layout/Layout';
import React, { useState } from 'react';
import { RecoilRoot } from 'recoil';
import { Toast } from 'src/components/common/Toast';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>lifecycle</title>
        </Head>
        <RecoilRoot>
          <ThemeProvider theme={theme}>
            <Layout>
              <GlobalStyle />
              <Toast />
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </RecoilRoot>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
