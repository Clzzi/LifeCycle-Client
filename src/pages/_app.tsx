import type { AppProps } from 'next/app';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { theme } from 'src/core/styles/theme';
import { Layout } from 'src/components/common/Layout/Layout';
import  { useState } from 'react';
import { RecoilRoot } from 'recoil';
import { Toast } from 'src/components/common/Toast';
import { DefaultSeo } from 'next-seo';
import { DEFAULT_SEO } from 'src/core/constants/seo.constants';
import Favicon from 'src/components/Favicon';
import { Global, ThemeProvider } from '@emotion/react';
import { global } from 'src/core/styles/globalStyle';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Global styles={global} />
          <Favicon />
          <DefaultSeo {...DEFAULT_SEO} />
          <RecoilRoot>
            <Layout>
              <Toast />
              <Component {...pageProps} />
            </Layout>
          </RecoilRoot>
        </Hydrate>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default MyApp;
