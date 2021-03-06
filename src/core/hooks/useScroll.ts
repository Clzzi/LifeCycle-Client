import { useThrottle } from './useThrottle';
import { useEffect, useState } from 'react';

export const useScroll = () => {
  const [scrollY, setScrollY] = useState<number>(0);

  const onScroll = useThrottle((): void => {
    setScrollY(window.pageYOffset);
  }, 300);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  return [scrollY];
};
