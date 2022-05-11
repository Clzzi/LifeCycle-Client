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
      return 'url("/assets/unsigned-profile.svg")';
    case 1:
      return 'url("/assets/Koala.svg")';
    case 2:
      return 'url("/assets/Chicken.svg")';
    case 3:
      return 'url("/assets/Cow.svg")';
    case 4:
      return 'url("/assets/Rabbit.svg")';
    case 5:
      return 'url("/assets/Fox.svg")';
    case 6:
      return 'url("/assets/Lion.svg")';
    case 7:
      return 'url("/assets/Tiger.svg")';
    default:
      return 'url("/assets/Bear.svg")';
  }
};
