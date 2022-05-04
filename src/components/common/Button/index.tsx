import { CSSProperties } from 'react';
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
  handleClick?: () => void | Promise<void | boolean>;
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
    <StyledButton type="button" style={style} onClick={handleClick}>
      {content}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  border: none;
  cursor: pointer;
`;
