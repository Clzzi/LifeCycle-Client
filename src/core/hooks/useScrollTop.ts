import { useCallback, useEffect, useState } from 'react';
import { useScroll } from './useScroll';
import { useThrottle } from './useThrottle';

export const useScrollTop = () => {
  const [scrollY] = useScroll();
  const [showScrollVisible, setShowScrollVisible] = useState<boolean>(false);

  const handleScroll = useCallback(() => {
    if (scrollY > 500) setShowScrollVisible(true);
    else setShowScrollVisible(false);
  }, [scrollY]);

  const onClickScrollTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const throttleHandleScroll = useThrottle(handleScroll, 300);
  useEffect(() => {
    window.addEventListener('scroll', throttleHandleScroll);
    return () => window.removeEventListener('scroll', throttleHandleScroll);
  }, [throttleHandleScroll]);

  return [showScrollVisible, onClickScrollTop];
};
