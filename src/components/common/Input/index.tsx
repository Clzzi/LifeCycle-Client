import React, { ChangeEvent, CSSProperties, KeyboardEvent } from 'react';
import styled from 'styled-components';
import { Label } from '../Label';

interface Props {
  value: any | undefined;
  errorMessage: string;
  placeholder?: string;
  min?: number;
  max?: number;
  maxLen?: number;
  minLen?: number;
  type: string;
  backgroundColor?: string;
  borderRadius?: string;
  color?: string;
  fontSize?: string;
  height?: string;
  margin?: string;
  padding?: string;
  width?: string;
  name: string;
  isAutoFocus?: boolean;
  customStyle?: CSSProperties;
  errorFontSize?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleKeyPress?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export const Input = ({
  errorMessage,
  handleKeyPress,
  onChange,
  type,
  value,
  backgroundColor,
  borderRadius,
  color,
  customStyle,
  fontSize,
  height = '56px',
  isAutoFocus,
  margin,
  max,
  min,
  name,
  padding,
  placeholder,
  width = '480px',
  errorFontSize = '14px',
  maxLen,
  minLen,
}: Props) => {
  const style: CSSProperties = {
    ...customStyle,
    backgroundColor,
    borderRadius,
    color,
    fontSize,
    height,
    margin,
    padding,
    width,
  };

  return (
    <Label message={errorMessage} fontSize={errorFontSize}>
      <InputContent
        type={type}
        onKeyDown={handleKeyPress}
        onChange={onChange}
        value={value}
        maxLength={maxLen}
        minLength={minLen}
        max={max}
        min={min}
        autoFocus={isAutoFocus}
        placeholder={placeholder}
        style={style}
        name={name}
      />
    </Label>
  );
};

const InputContent = styled.input`
  border: none;
  margin-bottom: 4px;
  transition: 0.1s ease-in-out;
  &::placeholder {
    font-size: ${({ theme }) => theme.fonts.font14};
  }
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.Main1};
  }
`;
