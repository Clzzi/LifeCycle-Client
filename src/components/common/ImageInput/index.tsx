import React, { ChangeEvent, CSSProperties, RefObject, useRef } from 'react';
import { Loader } from 'src/core/styles/shareStyle';
import styled from 'styled-components';
import { Label } from '../Label';

interface Props {
  width?: string;
  height?: string;
  fontSize?: string;
  color?: string;
  border?: string;
  errorFontSize?: string;
  errorMessage: string | undefined;
  borderRadius?: string;
  margin?: string;
  padding?: string;
  name: string;
  customStyle?: CSSProperties;
  backgroundColor?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  text: string;
  isLoading: boolean;
}

export const ImageInput = ({
  errorFontSize = '14px',
  errorMessage,
  isLoading,
  name,
  onChange,
  backgroundColor,
  border,
  borderRadius,
  color,
  customStyle,
  fontSize = '16px',
  height = '245px',
  margin,
  padding,
  width = '140px',
  text,
}: Props) => {
  const ref: RefObject<HTMLInputElement> = useRef(null);
  const style: CSSProperties = {
    ...customStyle,
    margin,
    padding,
    height,
    width,
    borderRadius,
    backgroundColor,
    color,
    border,
  };
  if (isLoading) {
    return (
      <LoadingWrapper style={style}>
        <Loader backgroundColor="transparent" fontSize="16%" />
      </LoadingWrapper>
    );
  }
  return (
    <Label message={errorMessage} fontSize={errorFontSize}>
      <Input
        htmlFor="image-input"
        tabIndex={0}
        style={style}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.key === ' ') ref.current?.click();
        }}>
        <div />
        <span style={{ fontSize }}>{text}</span>
      </Input>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        id="image-input"
        onChange={onChange}
        name={name}
        style={{ display: 'none', opacity: 0, visibility: 'hidden' }}
      />
    </Label>
  );
};

const Input = styled.label`
  border: 2px dashed ${({ theme }) => theme.colors.Gray700};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer !important;
  & > div {
    width: 100px;
    height: 100px;
    background-size: 100px;
    background-image: url('http://lifecycle-s3.s3.ap-northeast-2.amazonaws.com/assets/ImageUpLoad.svg');
  }
`;

const LoadingWrapper = styled.div`
  border: 2px dashed ${({ theme }) => theme.colors.Gray700};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer !important;
`;
