import { STACK_LIST } from '../constants/filter.constants';

class ResumeUtil {
  constructor() {}

  convertStackToString(value: number): string {
    return STACK_LIST.find((v) => v.value === value)!.name;
  }
}

export default new ResumeUtil();
