import { MutableRefObject, useRef } from 'react';

export const useThrottle = <T extends any[]>(
  callback: (...params: T) => void,
  time: number,
) => {
  const timer: MutableRefObject<NodeJS.Timeout | null> = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  return (...params: T) => {
    if (!timer.current) {
      timer.current = setTimeout(() => {
        callback(...params);
        timer.current = null;
      }, time);
    }
  };
};