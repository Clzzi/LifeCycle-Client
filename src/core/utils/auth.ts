import { RegisterValues } from 'src/types/auth.type';

export const convertRegisterDto = (values: RegisterValues) => {
  return {
    userId: values.id,
    pw: values.pw,
    name: values.name,
    generation: Number(values.generation),
  };
};
