import { HTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

interface Props extends HTMLAttributes<HTMLInputElement> {
  children: ReactNode;
  message: string | undefined;
  fontSize: string;
}

export const Label = ({ children, message, fontSize }: Props) => {
  return (
    <Container>
      {children}
      <StyledText fontSize={fontSize} visible={message?.length !== 0}>
        {message}
      </StyledText>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledText = styled.span<{ fontSize: string; visible: boolean }>`
  opacity: ${(props) => (props.visible ? 1 : 0)};
  text-align: start;
  font-size: ${(props) => props.fontSize};
  color: ${({ theme }) => theme.colors.Main2};
  font-weight: 400;
  min-height: 16px;
  &::before {
    content: '*';
    vertical-align: text-top;
  }
`;
