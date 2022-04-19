import { useClickAway } from 'src/core/hooks/useClickAway';
import { CSSProperties, ReactNode, RefObject, useMemo } from 'react';
import styled from 'styled-components';

interface Props {
  children?: ReactNode;
  width?: string;
  height?: string;
  borderRadius?: string;
  backgroundColor?: string;
  visible: boolean;
  onClose: () => void;
  onYes?: () => void;
  customStyle?: CSSProperties;
}

export const Modal = ({
  onClose,
  visible,
  children,
  height = '500px',
  width = '510px',
  borderRadius = '12px',
  backgroundColor,
  onYes,
  customStyle,
}: Props) => {
  const ref: RefObject<HTMLDivElement> = useClickAway<HTMLDivElement>(() => {
    onClose();
  });

  const style: CSSProperties = useMemo(() => {
    return { ...customStyle, width, height, borderRadius, backgroundColor };
  }, [width, height, borderRadius, backgroundColor, customStyle]);

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
  align-items: center;
  text-align: center;
`;

const ModalCard = styled.div`
  background-color: ${({ theme }) => theme.colors.White400};
  padding: 36px;
`;
