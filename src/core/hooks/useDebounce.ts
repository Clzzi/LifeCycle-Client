import { MutableRefObject, useCallback, useRef } from 'react';

export const useDebounce = () =>
  // any[] 참조로 callback함수 타입추론
  {
    const timer: MutableRefObject<NodeJS.Timeout | null> = useRef<ReturnType<
      typeof setTimeout
    > | null>(null); // Ref로 새로고침시에도 초기화 방지

    const debounce = useCallback(
      <T extends any[]>(callback: (...params: T) => void, time: number) => {
        return (...params: T) => {
          if (timer.current) clearTimeout(timer.current);

          timer.current = setTimeout(() => {
            callback(...params);
            timer.current = null;
          }, time);
        };
      },
      [],
    );

    return [debounce];
  };
