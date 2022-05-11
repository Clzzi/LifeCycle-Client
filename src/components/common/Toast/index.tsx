import { useRecoilValue } from 'recoil';
import { toastAtom } from 'src/core/store/common.store';
import styled from 'styled-components';
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
  transform: translate(-50%, -50%);
  bottom: 0;
  left: 50%;
  position: fixed;
  z-index: 999999;
`;
