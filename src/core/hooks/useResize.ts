import { useLayoutEffect, useState } from 'react';
import { useThrottle } from './useThrottle';

const useResize = () => {
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  const updateWidth = useThrottle(() => {
    setSize({ width: window.innerWidth, height: window.innerHeight });
  }, 500);

  useLayoutEffect(() => {
    updateWidth();
    window.addEventListener('resize', updateWidth, {
      passive: true,
    });
    return () => window.removeEventListener('resize', updateWidth);
  }, [updateWidth]);

  return { size };
};

export default useResize;
