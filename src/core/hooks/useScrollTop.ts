import { useScroll } from './useScroll';
import { useDebounce } from './useDebounce';
import { useCallback, useEffect, useState } from 'react';

export const useScrollTop = () => {
  const [scrollY] = useScroll();
  const [debounce] = useDebounce();
  const [showScrollVisible, setShowScrollVisible] = useState<boolean>(false);

  const handleScroll = useCallback(() => {
    if (scrollY > 500) setShowScrollVisible(true);
    else setShowScrollVisible(false);
  }, [scrollY]);

  const onClickScrollTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', debounce(handleScroll, 30));
    return () =>
      window.removeEventListener('scroll', debounce(handleScroll, 30));
  }, [debounce, handleScroll]);

  return { showScrollVisible, onClickScrollTop };
};
