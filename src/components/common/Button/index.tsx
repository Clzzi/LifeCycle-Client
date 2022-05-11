import { props } from 'cypress/types/bluebird';
import { CSSProperties } from 'react';
import { loading } from 'src/core/styles/styleMoudle';
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

const Loader = styled.div<{ backgroundColor?: string }>`
  font-size: 13%;
  width: 11em;
  height: 11em;
  border-radius: 50%;
  background: #ffffff;
  background: -moz-linear-gradient(
    left,
    #ffffff 10%,
    rgba(255, 255, 255, 0) 42%
  );
  background: -webkit-linear-gradient(
    left,
    #ffffff 10%,
    rgba(255, 255, 255, 0) 42%
  );
  background: -o-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
  background: -ms-linear-gradient(
    left,
    #ffffff 10%,
    rgba(255, 255, 255, 0) 42%
  );
  background: linear-gradient(
    to right,
    #ffffff 10%,
    rgba(255, 255, 255, 0) 42%
  );
  position: relative;
  animation: ${loading} 1.4s infinite linear;
  left: 0;
  &::before {
    width: 50%;
    height: 50%;
    background: #ffffff;
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
  }
  &::after {
    background: ${(props) =>
      props.backgroundColor !== 'transparent'
        ? props.backgroundColor
        : props.theme.colors.Black400};
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: '';
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
`;
