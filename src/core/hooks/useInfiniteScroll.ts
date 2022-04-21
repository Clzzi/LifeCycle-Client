import { useEffect, useState } from 'react';
import { useThrottle } from './useThrottle';
import {
  DefaultOptions,
  THROTTLE_WAIT,
} from '../constants/hooks/infiniteScroll.constants';

export const useInfiniteScroll = <
  T extends any[],
  E extends HTMLElement = HTMLFormElement,
>({
  fetchCallback,
  targetElement,
  options = DefaultOptions,
}: {
  fetchCallback: (...args: T) => void;
  targetElement: E;
  options: any;
}) => {
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const intersectionCallbackFnThrottle: IntersectionObserverCallback =
    useThrottle((entries) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          setIsFetching(true);
        }
      });
      setIsFetching(false);
    }, THROTTLE_WAIT);

  useEffect(() => {
    let observer: IntersectionObserver;

    if (targetElement) {
      observer = new IntersectionObserver(
        intersectionCallbackFnThrottle,
        options,
      );
      observer.observe(targetElement);
    }

    return () => observer?.disconnect();
  }, []);

  useEffect(() => {
    if (!isFetching) {
      return;
    }
    fetchCallback;
  }, []);

  return [isFetching, setIsFetching];
};
