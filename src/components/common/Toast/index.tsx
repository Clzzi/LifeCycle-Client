import { useRecoilValue } from 'recoil';
import { toastAtom } from 'src/core/store/common.store';
import styled from '@emotion/styled';
import { ToastItem } from './ToastItem';

export const Toast = () => {
  const toasts = useRecoilValue(toastAtom);

  return (
    <ToastList>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} {...toast} />
      ))}
    </ToastList>
  );
};

const ToastList = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  z-index: 999999;
`;
