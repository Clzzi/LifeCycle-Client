import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { theme } from 'src/core/styles/theme';
import { GlobalStyle } from 'src/core/styles/globalStyle';
import { Layout } from 'src/components/common/Layout/Layout';
import { pdfjs } from 'react-pdf';
import React from 'react';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>lifecycle</title>
        </Head>
        <ThemeProvider theme={theme}>
          <Layout>
            <GlobalStyle />
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
