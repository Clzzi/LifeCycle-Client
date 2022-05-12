import { theme } from '../styles/theme';

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

export const handleProfileImg = (generation: number): string => {
  switch (generation) {
    case 0:
      return 'url("http://lifecycle-s3.s3.ap-northeast-2.amazonaws.com/assets/unsigned-profile.svg")';
    case 1:
      return 'url("http://lifecycle-s3.s3.ap-northeast-2.amazonaws.com/assets/Koala.svg")';
    case 2:
      return 'url("http://lifecycle-s3.s3.ap-northeast-2.amazonaws.com/assets/Chicken.svg")';
    case 3:
      return 'url("http://lifecycle-s3.s3.ap-northeast-2.amazonaws.com/assets/Cow.svg")';
    case 4:
      return 'url("http://lifecycle-s3.s3.ap-northeast-2.amazonaws.com/assets/Rabbit.svg")';
    case 5:
      return 'url("http://lifecycle-s3.s3.ap-northeast-2.amazonaws.com/assets/Fox.svg")';
    case 6:
      return 'url("http://lifecycle-s3.s3.ap-northeast-2.amazonaws.com/assets/Lion.svg")';
    case 7:
      return 'url("http://lifecycle-s3.s3.ap-northeast-2.amazonaws.com/assets/Tiger.svg")';
    default:
      return 'url("http://lifecycle-s3.s3.ap-northeast-2.amazonaws.com/assets/Bear.svg")';
  }
};
