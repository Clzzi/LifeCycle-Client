import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

export const useHover = <T extends HTMLElement>(): [
  ref: RefObject<T>,
  state: boolean,
] => {
  const ref = useRef<T>(null);
  const [state, setState] = useState<boolean>(false);

  const handleMouseOver = useCallback((): void => setState(true), []);
  const handleMouseOut = useCallback((): void => setState(false), []);

  useEffect(() => {
    const el: T | null = ref.current;
    if (!el) return;

    el.addEventListener('mouseover', handleMouseOver);
    el.addEventListener('mouseout', handleMouseOut);

    return () => {
      el.removeEventListener('mouseover', handleMouseOver);
      el.removeEventListener('mouseout', handleMouseOut);
    };
  }, [ref, handleMouseOver, handleMouseOut]);

  return [ref, state];
};
