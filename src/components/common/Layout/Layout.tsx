import { Header } from './Header';
import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { CheckRouter } from 'src/core/utils/auth';
import { useAxiosInterceptor } from 'src/core/hooks/useAxiosInterceptor';

export const Layout = ({ children }: { children: ReactNode }) => {
  useAxiosInterceptor();
  const { asPath } = useRouter();

  return (
    <>
      {<Header visible={CheckRouter(asPath)} />}
      {children}
    </>
  );
};
