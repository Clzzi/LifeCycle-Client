import { KeyboardEvent } from 'react';
import styled from 'styled-components';

interface Props {
  className: string;
  checked: boolean;
  onClick: () => void | Promise<void>;
}

export const CheckBox = ({ checked, className, onClick, ...props }: Props) => {
  return (
    <Container className={className}>
      <DisableBox
        type="checkbox"
        defaultChecked={checked}
        onChange={onClick}
        tabIndex={-1}
        {...props}
      />
      <LabelBox
        onClick={onClick}
        checked={checked}
        tabIndex={0}
        onKeyPress={(e: KeyboardEvent<HTMLDivElement>) => {
          if (e.key === ' ') {
            onClick();
          }
        }}>
        <Icon viewBox="0 0 24 24">
          <polyline points="19 7 10 17 5 12" />
        </Icon>
      </LabelBox>
    </Container>
  );
};

const Container = styled.div`
  display: inline-block;
  vertical-align: middle;
  margin-bottom: -5px;
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

const LabelBox = styled.div<{ checked: boolean }>`
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  border: ${(props) => (props.checked ? 'none' : 'solid 0.1rem #dddddd')};
  background: ${(props) =>
    props.checked ? props.theme.colors.Main1 : props.theme.colors.White900};
  border-radius: 0.45rem;
  transition: all 150ms;
  ${Icon} {
    visibility: ${(props) => (props.checked ? 'visible' : 'hidden')};
  }
  &:focus {
    outline: 1.5px solid ${({ theme }) => theme.colors.Main1};
  }
`;

const DisableBox = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;
