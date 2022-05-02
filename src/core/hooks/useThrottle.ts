import { MutableRefObject, useCallback, useRef } from 'react';

export const useThrottle = () => {
  const timer: MutableRefObject<NodeJS.Timeout | null> = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  const throttle = useCallback(
    <T extends any[]>(callback: (...params: T) => void, time: number) => {
      return (...params: T) => {
        if (!timer.current) {
          timer.current = setTimeout(() => {
            callback(...params);
            timer.current = null;
          }, time);
        }
      };
    },
    [],
  );

  return [throttle];
};
