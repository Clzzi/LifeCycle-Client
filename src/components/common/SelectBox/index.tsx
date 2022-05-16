import { ChangeEvent, CSSProperties } from 'react';
import { theme } from 'src/core/styles/theme';
import styled from '@emotion/styled';
import ResumeUtil from 'src/core/utils/resume';
import { dragNone } from 'src/core/styles/styleMoudle';

interface Options {
  name: string;
  value: number | string | string;
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
  value: number | undefined | string;
}

const SelectBox = ({
  content,
  backgroundColor = 'transparent',
  border = `2px solid ${theme.colors.Main1}`,
  borderRadius = '999px',
  color = theme.colors.White900,
  customStyle,
  fontSize = theme.fonts.font14,
  height = '38px',
  onChange,
  value,
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
      <select style={style} onChange={onChange} name={name} value={value}>
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

export default SelectBox;

const Wrapper = styled.div`
  ${dragNone};
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  & > select {
    cursor: pointer;
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
  background-image: ${() =>
    `url(${ResumeUtil.makeS3Url('/assets/SelectBoxArrow.svg')})`};
  background-repeat: no-repeat;
  cursor: pointer;
`;
