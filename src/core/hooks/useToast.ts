import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { IToast } from 'src/types/common.type';
import { toastAtom } from '../store/common.store';

export const useToast = () => {
  const [toasts, setToasts] = useRecoilState(toastAtom);

  const removeToast = useCallback(
    (toastId: IToast['id']): void => {
      setToasts((prev) => prev.filter((toast) => toast.id !== toastId));
    },
    [setToasts],
  );

  const fireToast = useCallback(
    (toast: IToast): void => {
      const id: string = String(new Date().getTime());
      setToasts((prev) => [...prev, { ...toast, id }]);
      setTimeout(() => removeToast(id), 600 + (toast.duration ?? 1000));
    },
    [removeToast, setToasts],
  );

  return {
    toasts,
    fireToast,
  };
};
