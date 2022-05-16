import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useKeyDown } from 'src/core/hooks/useKeyDown';
import ResumeUtil from 'src/core/utils/resume';

interface Props {
  visible: boolean;
  onClick: () => void;
}

const ScrollTop = ({ visible, onClick }: Props) => {
  const [focusVisible, setFocusVisible] = useState<boolean>(false);

  useEffect(() => {
    if (visible) setFocusVisible(false);
  }, [visible]);

  useKeyDown('Enter', onClick);
  useKeyDown('Tab', () => setFocusVisible(false));
  if (!visible) return null;

  return (
    <Wrapper>
      <ToolTip visible={focusVisible}>Enter키를 눌러도 올라가요!</ToolTip>
      <ScrollBtn
        onClick={onClick}
        onMouseOver={() => setFocusVisible(true)}
        tabIndex={0}
        onFocus={() => setFocusVisible(true)}>
        <div />
      </ScrollBtn>
    </Wrapper>
  );
};

export default ScrollTop;

const Wrapper = styled.div`
  width: fit-content;
  height: fit-content;
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 0 0% 2% 0;
  z-index: 99;
`;

const ScrollBtn = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.Main1};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  z-index: 99;
  &:focus {
    outline: 1.5px solid ${({ theme }) => theme.colors.White900};
  }
  & > div {
    width: 24px;
    height: 24px;
    background-image: ${() =>
      `url(${ResumeUtil.makeS3Url('/assets/UpArrow.svg')})`};
  }
`;

const ToolTip = styled.div<{ visible: boolean }>`
  width: fit-content;
  height: 30px;
  font-size: ${({ theme }) => theme.fonts.font12};
  color: ${({ theme }) => theme.colors.White900};
  background-color: ${({ theme }) => theme.colors.Black900};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  margin-bottom: 8px;
  border-radius: 4px;
  padding: 0px 16px;
  z-index: 99;
`;
