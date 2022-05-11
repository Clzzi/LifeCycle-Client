import { useScroll } from './useScroll';
import { useCallback, useEffect, useState } from 'react';
import { useThrottle } from './useThrottle';

export const useScrollTop = () => {
  const [scrollY] = useScroll();
  const [showScrollVisible, setShowScrollVisible] = useState<boolean>(false);

  const handleScroll = useThrottle(
    useCallback(() => {
      if (scrollY > 500) setShowScrollVisible(true);
      else setShowScrollVisible(false);
    }, [scrollY]),
    100,
  );

  const onClickScrollTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { showScrollVisible, onClickScrollTop };
};
