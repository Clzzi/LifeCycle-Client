import { useEffect, useState } from 'react';
import { fadeIn, fadeOut } from 'src/core/styles/styleMoudle';
import { IToast } from 'src/types/common.type';
import styled from 'styled-components';

export const ToastItem = (props: IToast) => {
  const { content, bottom, duration } = props;
  const [isClosing, setIsClosing] = useState<boolean>(false);

  useEffect(() => {
    const setExistTimeout = setTimeout(() => {
      setIsClosing(true);
      clearTimeout(setExistTimeout);
    }, duration ?? 1000);
  });
  return (
    <StyledToastItem bottom={bottom} isClosing={isClosing}>
      {content}
    </StyledToastItem>
  );
};

const StyledToastItem = styled.div<{ bottom?: number; isClosing: boolean }>`
  position: absolute;
  bottom: ${(props) => props.bottom ?? 24}px;
  animation: 0.3s forwards ${({ isClosing }) => (isClosing ? fadeOut : fadeIn)};
  padding: 12px 40px;
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fonts.font14};
  width: fit-content;
  height: fit-content;
  color: white;
  background-color: black;
  white-space: nowrap;
  box-shadow: 0px 0px 3px 0px rgba(255, 5, 88, 0.7),
    0px 1px 4px 1px rgba(255, 5, 88, 0.7), 1px 0px 2px 1px rgba(255, 5, 88, 0.7),
    0px 0px 4px 0px rgba(255, 5, 88, 0.7);
`;
