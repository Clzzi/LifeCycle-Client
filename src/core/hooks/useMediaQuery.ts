import { useEffect, useState } from 'react';
import { TMediaQuerySize } from '../constants/media.constants';
import { makeMediaQuery } from '../utils/style';

export const useMediaQuery = (size: number, type: TMediaQuerySize) => {
  const query: string = makeMediaQuery(size, type);
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const media: MediaQueryList = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const changeEventListener = (): void => {
      setMatches(media.matches);
    };

    media.addEventListener('change', changeEventListener);
    return () => media.removeEventListener('change', changeEventListener);
  }, [matches, query]);

  return matches;
};
