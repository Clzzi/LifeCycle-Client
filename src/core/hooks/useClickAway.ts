import { MutableRefObject, RefObject, useEffect, useRef } from 'react';

export const useClickAway = <T extends HTMLElement>(
  handler: (e: Event) => void,
  deps?: boolean,
) => {
  const ref: RefObject<T> = useRef<T>(null);
  const savedHandler: MutableRefObject<(e: Event) => void> = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);
  useEffect(() => {
    const el = ref.current;
    const handleEvent = (e: Event): void => {
      if (el && !el.contains(e.target as Node)) savedHandler.current(e);
    };

    document.addEventListener('touchstart', handleEvent);
    document.addEventListener('mousedown', handleEvent);

    return () => {
      document.removeEventListener('touchstart', handleEvent);
      document.removeEventListener('mousedown', handleEvent);
    };
  }, [ref, deps]);

  return ref;
};
