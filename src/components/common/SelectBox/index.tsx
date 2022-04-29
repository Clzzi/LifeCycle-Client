import { CSSProperties } from 'react';
import styled from 'styled-components';

interface Options {
  name: string;
  value: number | string;
}

interface Props {
  width?: string;
  height?: string;
  content: Options[];
  fontSize?: string;
  color?: string;
  border?: string;
  borderRadius?: string;
  backgroundColor?: string;
  customStyle?: CSSProperties;
  defaultValue: string | number;
  onChange?: () => void | Promise<void>;
}

export const SelectBox = ({
  content,
  backgroundColor,
  border,
  borderRadius,
  color,
  customStyle,
  fontSize,
  height,
  onChange,
  width,
  defaultValue,
}: Props) => {
  const style: CSSProperties = {
    ...customStyle,
    width,
    height,
    fontSize,
    backgroundColor,
    border,
    borderRadius,
    color,
  };

  return (
    <Wrapper>
      <select style={style}>
        {content.map((option) => (
          <option
            key={option.value}
            value={option.value}
            defaultChecked={defaultValue === option.value}>
            {option.name}
          </option>
        ))}
      </select>
      <Icon />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  & > select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 100%;
    padding-left: 18px;
  }
`;

const Icon = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  right: 0;
  top: 50%;
  width: 14px;
  height: 8px;
  margin-right: 4px;
  background-image: url('/assets/SelectBoxArrow.svg');
  background-repeat: no-repeat;
  cursor: pointer;
`;
