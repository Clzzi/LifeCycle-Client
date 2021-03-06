import React, { MouseEvent, useEffect, useState } from 'react';

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

  const handleSubmit = async (
    e: MouseEvent<H> | React.KeyboardEvent,
  ): Promise<void> => {
    setIsLoading(true);
    e.preventDefault();

    const submitErrors: Error<T> = {};

    for (const property in values) {
      submitErrors[property] = errors[property] ? errors[property] : '';
      if (values[property] === undefined) {
        submitErrors[property] = '값이 비었어요!';
      }
    }

    if (!Object.values(submitErrors).every((v) => v === '')) {
      setErrors(submitErrors);
      setIsLoading(false);
      return;
    }

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
