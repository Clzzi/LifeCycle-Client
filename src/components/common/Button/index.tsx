import { CSSProperties } from 'react';
import { Loader } from 'src/core/styles/shareStyle';
import styled from 'styled-components';

interface Props {
  width?: string;
  height?: string;
  content: string;
  fontSize?: string;
  color?: string;
  borderRadius?: string;
  backgroundColor?: string;
  customStyle?: CSSProperties;
  handleClick?: (e?: any) => void | Promise<void | boolean>;
  isLoading?: boolean;
}

export const Button = ({
  content,
  backgroundColor,
  borderRadius,
  color,
  customStyle,
  fontSize,
  handleClick,
  height,
  width,
  isLoading = false,
}: Props) => {
  const style: CSSProperties = {
    ...customStyle,
    fontSize,
    width,
    height,
    color,
    borderRadius,
    backgroundColor,
  };
  return (
    <StyledButton
      type="button"
      style={style}
      onClick={isLoading ? () => null : handleClick}>
      {isLoading ? <Loader backgroundColor={backgroundColor} /> : content}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  position: relative;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
