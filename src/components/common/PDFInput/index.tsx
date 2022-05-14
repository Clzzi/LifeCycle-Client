import React, { ChangeEvent, CSSProperties, RefObject, useRef } from 'react';
import styled from 'styled-components';
import { Label } from '../Label';
import ResumeUtil from 'src/core/utils/resume';

interface Props {
  placeholder: string;
  title: string | undefined;
  width: string;
  height: string;
  fontSize?: string;
  borderRadius?: string;
  margin?: string;
  padding?: string;
  name: string;
  color?: string;
  customStyle?: CSSProperties;
  errorFontSize?: string;
  errorMessage: string | undefined;
  backgroundColor?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
}

export const PDFInput = ({
  errorMessage,
  isLoading,
  height = '56px',
  name,
  onChange,
  placeholder,
  title,
  width = '480px',
  backgroundColor,
  borderRadius,
  color,
  customStyle,
  errorFontSize = '14px',
  fontSize,
  margin,
  padding,
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
    fontSize,
  };

  return (
    <Label message={errorMessage} fontSize={errorFontSize}>
      <Input
        style={style}
        htmlFor="pdf-input"
        tabIndex={0}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.key === ' ') ref.current?.click();
        }}>
        {isLoading ? (
          <LoadingText>파일 가져오는중 . . . </LoadingText>
        ) : title && title.length ? (
          title
        ) : (
          placeholder
        )}
        <div />
      </Input>

      <input
        ref={ref}
        type="file"
        accept=".pdf"
        id="pdf-input"
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        style={{ display: 'none', opacity: 0, visibility: 'hidden' }}
      />
    </Label>
  );
};

const Input = styled.label`
  position: relative;
  border: none;
  margin-bottom: 4px;
  transition: 0.1s ease-in-out;
  cursor: pointer !important;
  min-height: 56px;
  &::placeholder {
    font-size: ${({ theme }) => theme.fonts.font14};
  }
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.Main1};
  }
  & > div {
    position: absolute;
    right: 0;
    margin-right: 12px;
    width: 24px;
    height: 24px;
    background-size: 24px;
    background-image: ${() =>
      `url(${ResumeUtil.makeS3Url('/assets/PDFUpload.svg')})`};
  }
`;

const LoadingText = styled.span`
  font-size: ${({ theme }) => theme.fonts.font14};
  color: ${({ theme }) => theme.colors.White900};
`;
