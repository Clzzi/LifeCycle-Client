import { useEffect, useState } from 'react';
import { useThrottle } from './useThrottle';

export const useScroll = () => {
  const [scrollY, setScrollY] = useState<number>(0);
  const onScroll = () => {
    console.log(window.pageYOffset);

    setScrollY(window.pageYOffset);
  };

  const throttleOnScroll = useThrottle(onScroll, 300);

  useEffect(() => {
    window.addEventListener('scroll', throttleOnScroll);
    return () => window.removeEventListener('scroll', throttleOnScroll);
  }, [throttleOnScroll]);

  return [scrollY];
};
