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
  flex-direction: column;
`;

const StyledText = styled.span<{ fontSize: string }>`
  text-align: start;
  font-size: ${(props) => props.fontSize};
  color: ${({ theme }) => theme.colors.Main2};
  font-weight: 400;
  &::before {
    content: '*';
    vertical-align: text-top;
  }
`;
