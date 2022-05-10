import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { IToast } from 'src/types/common.type';
import { toastAtom } from '../store/common.store';

export const useToast = () => {
  const [toasts, setToasts] = useRecoilState(toastAtom);

  const removeToast = useCallback(
    (toastID: IToast['id']) =>
      setToasts((prev) => prev.filter((toast) => toast.id !== toastID)),
    [setToasts],
  );

  const fireToast = useCallback(
    (toast: IToast) => {
      setToasts((prev) => [
        ...prev,
        { ...toast, id: String(new Date().getTime()) },
      ]);
      setTimeout(() => removeToast(toast.id), 600 + (toast.duration ?? 1000));
    },
    [removeToast, setToasts],
  );

  return {
    toasts,
    fireToast,
  };
};
