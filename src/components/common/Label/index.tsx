import { HTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

interface Props extends HTMLAttributes<HTMLInputElement> {
  children: ReactNode;
  message: string;
  fontSize: string;
}

export const Label = ({ children, message, fontSize }: Props) => {
  return (
    <Container>
      {children}
      {message.length && <StyledText fontSize={fontSize}>{message}</StyledText>}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledText = styled.span<{ fontSize: string }>`
  font-size: ${(props) => props.fontSize};
  &::before {
    content: '*';
    vertical-align: text-top;
  }
`;
