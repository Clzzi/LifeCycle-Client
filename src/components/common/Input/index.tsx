import { ChangeEvent } from 'react';

interface Props {
  value: string;
  errorMessage: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  type: string;
}

export const Input = ({}:Props) => {
  return (
    <div>
      <span>test</span>
    </div>
  );
};
