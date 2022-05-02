import { useEffect } from 'react';
import { fadeIn } from 'src/core/styles/styleMoudle';
import styled from 'styled-components';

interface Props {
  visible: boolean;
  onClick: () => void;
}

export const ScrollTop = ({ visible, onClick }: Props) => {
  if (!visible) return null;
  return (
    <ScrollBtn onClick={onClick}>
      <div />
    </ScrollBtn>
  );
};

const ScrollBtn = styled.div`
  width: 40px;
  height: 40px;
  position: fixed;
  bottom: 0;
  right: 0;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.Main1};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0 215px 40px 0;
  cursor: pointer;
  & > div {
    width: 24px;
    height: 24px;
    background-image: url('/assets/UpArrow.svg');
  }
`;
