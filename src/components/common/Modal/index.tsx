import { useClickAway } from 'src/core/hooks/useClickAway';
import { CSSProperties, ReactNode, RefObject, useEffect, useMemo } from 'react';
import styled from '@emotion/styled';

interface Props {
  children?: ReactNode;
  width?: string;
  height?: string;
  borderRadius?: string;
  backgroundColor?: string;
  visible: boolean;
  onClose: () => void;
  customStyle?: CSSProperties;
}

export const Modal = ({
  onClose,
  visible,
  children,
  width = '510px',
  height = '500px',
  borderRadius = '12px',
  backgroundColor,
  customStyle,
}: Props) => {
  const ref: RefObject<HTMLDivElement> = useClickAway<HTMLDivElement>(() => {
    onClose();
  }, visible);

  const style: CSSProperties = useMemo(() => {
    return { ...customStyle, width, height, borderRadius, backgroundColor };
  }, [width, height, borderRadius, backgroundColor, customStyle]);

  useEffect(() => {
    if (visible) {
      document.body.style.cssText = `
        position: fixed; 
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;`;
      return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = '';
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      };
    }
  }, [visible]);

  return visible ? (
    <BackgroundDim>
      <ModalCard style={style} ref={ref}>
        {children}
      </ModalCard>
    </BackgroundDim>
  ) : null;
};

const BackgroundDim = styled.section`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.Gray800};
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  z-index: 999;
`;

const ModalCard = styled.div`
  background-color: ${({ theme }) => theme.colors.White400};
  padding: 36px;
`;
