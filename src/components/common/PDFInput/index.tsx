import { ChangeEvent, CSSProperties } from 'react';
import styled from 'styled-components';
import { Label } from '../Label';

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
}

export const PDFInput = ({
  errorMessage,
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
  //application/pdf
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
      <Input style={style} htmlFor="pdf-input" tabIndex={0}>
        {title && title.length ? title : placeholder}
        <div />
      </Input>

      <input
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
    background-image: url('/assets/PDFUpload.svg');
  }
`;