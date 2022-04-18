import { FormEvent, MouseEvent, useEffect, useState } from 'react';

export type Error<T> = { [P in keyof T]?: string };

interface Options<T> {
  initialValue: T;
  onSubmit(values: T): void;
  validate(values: T): Error<T>;
}

export const useForm = <T, H extends HTMLElement = HTMLButtonElement>({
  initialValue,
  onSubmit,
  validate,
}: Options<T>) => {
  const [errors, setErrors] = useState<Error<T>>({});
  const [values, setValues] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const newError: Error<T> = validate(values);
    setErrors(newError);
  }, [values]);

  const handleSubmit = async (e: MouseEvent<H>): Promise<void> => {
    setIsLoading(true);
    e.preventDefault();
    const newErrors: Error<T> | {} = validate ? validate(values) : {};
    if (Object.keys(newErrors).length === 0) {
      await onSubmit(values);
    }
    setErrors(newErrors);
    setIsLoading(false);
  };

  return {
    values,
    errors,
    isLoading,
    setValues,
    handleSubmit,
  };
};
