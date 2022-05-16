import { Header } from './Header';
import { NextRouter, useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { useAxiosInterceptor } from 'src/core/hooks/useAxiosInterceptor';

export const Layout = ({ children }: { children: ReactNode }) => {
  useAxiosInterceptor();
  const router: NextRouter = useRouter();
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (
      router.asPath === '/register' ||
      router.asPath === '/login' ||
      router.asPath === '/404'
    ) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [setVisible, router.asPath]);

  return (
    <>
      <Header visible={true} />
      {children}
    </>
  );
};
