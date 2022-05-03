import { ChangeEvent, CSSProperties } from 'react';
import { theme } from 'src/core/styles/theme';
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
  name?: string;
  customStyle?: CSSProperties;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void | Promise<void>;
}

export const SelectBox = ({
  content,
  backgroundColor = 'transparent',
  border = `2px solid ${theme.colors.Main1}`,
  borderRadius = '999px',
  color = theme.colors.White900,
  customStyle,
  fontSize = theme.fonts.font14,
  height = '38px',
  onChange,
  name,
  width = '126px',
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
      <select style={style} onChange={onChange} name={name}>
        {content.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
      <Icon />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
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
  right: 0;
  width: 14px;
  height: 8px;
  margin: 24px 12px 0px 0px;
  background-image: url('/assets/SelectBoxArrow.svg');
  background-repeat: no-repeat;
  cursor: pointer;
`;
