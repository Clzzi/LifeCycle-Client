import { useEffect } from 'react';

export const useKeyDown = (key: string, onKeyDown: () => void) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === key) onKeyDown();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [key, onKeyDown]);
};
