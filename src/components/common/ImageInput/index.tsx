import { ChangeEvent, CSSProperties } from 'react';
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
}

export const ImageInput = ({
  errorFontSize = '14px',
  errorMessage,
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
  return (
    <Label message={errorMessage} fontSize={errorFontSize}>
      <Input htmlFor="image-input" tabIndex={0} style={style}>
        <div />
        <span style={{ fontSize }}>{text}</span>
      </Input>
      <input
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
    background-image: url('/assets/ImageUpLoad.svg');
  }
`;
