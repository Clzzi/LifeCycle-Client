import { CSSProperties } from 'react';
import styled from '@emotion/styled';
import * as M from 'src/core/styles/styleMoudle';

interface Props {
  mainSize?: string;
  subSize?: string;
  width?: string;
  height?: string;
  mainColor?: string;
  subColor?: string;
  mainText: string;
  subText?: string;
  customStyle?: CSSProperties;
}

export const Title = ({
  height = '78px',
  mainColor = '#ffffff',
  subColor = '#c4c4c4',
  mainSize = '28px',
  subSize = '16px',
  width = '488px',
  mainText,
  subText,
  customStyle,
}: Props) => {
  const mainStyle: CSSProperties = {
    color: mainColor,
    fontSize: mainSize,
  };
  const subStyle: CSSProperties = {
    color: subColor,
    fontSize: subSize,
  };
  const wrappperStyle: CSSProperties = {
    ...customStyle,
    width,
    height,
  };

  return (
    <Wrapper style={wrappperStyle}>
      <MainText style={mainStyle}>{mainText}</MainText>
      <Line />
      {subText && <SubText style={subStyle}>{subText}</SubText>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${M.dragNone};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: center;
`;

const MainText = styled.span`
  font-weight: bold;
`;

const SubText = styled.span`
  font-weight: normal;
`;

const Line = styled.div`
  animation: ${M.showLeftToRight} 1s ease-out;
  margin: 4px 0px 12px 0px;
  background-color: ${({ theme }) => theme.colors.Main1};
  width: 100%;
  height: 2px;
`;
