import { ChangeEvent, CSSProperties } from 'react';
import styled from 'styled-components';

interface Props {
  labels: string[];
  customStyle?: CSSProperties;
  initialValues: string[] | number[];
  checked: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void | Promise<void>;
}

export const RadioButton = ({
  customStyle,
  initialValues,
  labels,
  checked,
  onChange,
}: Props) => {
  return (
    <Container style={customStyle}>
      {initialValues &&
        initialValues.map((value: string | number, index: number) => {
          return (
            <Wrapper key={value}>
              <Radio
                id={labels[index]}
                type="radio"
                value={value}
                checked={value === checked}
                onChange={onChange}
              />
              <Label htmlFor={labels[index]}>{labels[index]}</Label>
            </Wrapper>
          );
        })}
    </Container>
  );
};

const Container = styled.section``;

const Wrapper = styled.div``;

const Radio = styled.input``;

const Label = styled.label`
  color: white;
`;
