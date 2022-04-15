import styled from 'styled-components';

interface Props {
  titleSize?: string;
  descSize?: string;
  width?: string;
  height?: string;
}

export const Title = () => {
  return (
    <Wrapper>
      <Content></Content>
      <Line />
      <Desc></Desc>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  text-align: start;
`;

const Content = styled.span``;

const Desc = styled.span``;

const Line = styled.div``;
