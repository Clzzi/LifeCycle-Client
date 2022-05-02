import { useThrottle } from './useThrottle';
import { useEffect, useState } from 'react';

export const useScroll = () => {
  const [throttle] = useThrottle();
  const [scrollY, setScrollY] = useState<number>(0);

  const onScroll = () => {
    setScrollY(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener('scroll', throttle(onScroll, 100));
    return () => window.removeEventListener('scroll', throttle(onScroll, 100));
  }, [throttle]);

  return [scrollY];
};
