import { Header } from './Header';
import { NextRouter, useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';

export const Layout = ({ children }: { children: ReactNode }) => {
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
      {visible && <Header />}
      {children}
    </>
  );
};
