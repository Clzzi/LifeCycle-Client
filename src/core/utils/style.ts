import { TMediaQuerySize } from '../constants/media.constants';
import { theme } from '../styles/theme';
import ResumeUtil from './resume';

export const pxToRem = (px: number): string => {
  return `${px / 16}rem`;
};

export const handleTagColor = (
  type: 'COMPANY' | 'STACK' | 'GENERATION',
): string => {
  switch (type) {
    case 'COMPANY':
      return theme.colors.R_Highlight;
    case 'GENERATION':
      return theme.colors.P_Hightlight;
    default:
      return theme.colors.B_Hightlight;
  }
};

export const makeMediaQuery = (size: number, type: TMediaQuerySize): string => {
  if (type === 'max') {
    return `(max-width: ${size}px)`;
  }
  return `(min-width:${size}px)`;
};

export const handleProfileImg = (generation: number): string => {
  switch (generation) {
    case 0:
      return `url(${ResumeUtil.makeS3Url('/assets/unsigned-profile.svg')})`;
    case 1:
      return `url(${ResumeUtil.makeS3Url('/assets/Koala.svg')})`;
    case 2:
      return `url(${ResumeUtil.makeS3Url('/assets/Chicken.svg')})`;
    case 3:
      return `url(${ResumeUtil.makeS3Url('/assets/Cow.svg')})`;
    case 4:
      return `url(${ResumeUtil.makeS3Url('/assets/Rabbit.svg')})`;
    case 5:
      return `url(${ResumeUtil.makeS3Url('/assets/Fox.svg')})`;
    case 6:
      return `url(${ResumeUtil.makeS3Url('/assets/Lion.svg')})`;
    case 7:
      return `url(${ResumeUtil.makeS3Url('/assets/Tiger.svg')})`;
    default:
      return `url(${ResumeUtil.makeS3Url('/assets/Bear.svg')})`;
  }
};
