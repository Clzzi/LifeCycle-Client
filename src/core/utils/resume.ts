import { IResume } from 'src/types/resume.type';
import { STACK_LIST } from '../constants/filter.constants';

class ResumeUtil {
  constructor() {}

  convertStackToString(value: number): string {
    return STACK_LIST.find((v) => v.value === value)!.name;
  }

  convertStackToNumber(value: string): number {
    return STACK_LIST.find((v) => v.name === value)!.value;
  }

  filterResume(
    generation: number,
    stack: number,
    resumes: IResume[],
  ): IResume[] {
    let data: IResume[] = resumes;
    if (generation > 0) {
      const filteredData: IResume[] = data.filter(
        (v) => v.user.generation === generation,
      );
      data = filteredData;
    }

    if (stack > 0) {
      const filteredData = data.filter(
        (v) => v.stack === this.convertStackToString(stack),
      );
      data = filteredData;
    }

    return data;
  }
}

export default new ResumeUtil();
