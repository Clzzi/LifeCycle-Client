import { IResume } from 'src/types/resume.type';
import { STACK_LIST } from '../constants/filter.constants';
import { mediaSizes } from '../constants/media.constants';

class ResumeUtil {
  constructor() {}

  convertStackToString(value: number): string {
    return STACK_LIST.find((v) => v.value === value)!.name;
  }

  convertStackToNumber(value: string): number {
    return STACK_LIST.find((v) => v.name === value)!.value;
  }

  calculatePDFWidth(width: number) {
    if (width > 1200 || width === 0) {
      return 1200;
    } else if (width <= mediaSizes.smallDesktop && width > mediaSizes.mobile) {
      return width - 150;
    } else if (width <= mediaSizes.mobile) {
      return width - 100;
    } else {
      return width - 200;
    }
  }

  calculateResumeInfoButtonWidth(width: number) {
    if (width > 900 || width === 0) {
      return ['102px', '38px'];
    } else if (width <= mediaSizes.smallDesktop && width > mediaSizes.mobile) {
      return ['80px', '30px'];
    } else if (width <= mediaSizes.mobile) {
      return ['56px', '24px'];
    } else {
      return ['102px', '38px'];
    }
  }

  calculateResumeInfoTagHeight(width: number) {
    if (width > 900 || width === 0) {
      return '28px';
    } else if (width <= mediaSizes.smallDesktop && width > mediaSizes.mobile) {
      return '22px';
    } else if (width <= mediaSizes.mobile) {
      return '18px';
    } else {
      return '28px';
    }
  }

  makeS3Url(path: string): string {
    return `http://lifecycle-s3.s3.ap-northeast-2.amazonaws.com${path}`;
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
