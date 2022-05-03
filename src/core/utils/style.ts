import { theme } from '../styles/theme';

export const pxToRem = (px: number): string => {
  return `${px / 16}rem`;
};

export const handleTagColor = (
  type: 'COMPANY' | 'PLATFORM' | 'STACK' | 'GENERATION',
): string => {
  switch (type) {
    case 'COMPANY':
      return theme.colors.R_Highlight;
    case 'PLATFORM':
      return theme.colors.Y_Hightlight;
    case 'GENERATION':
      return theme.colors.P_Hightlight;
    default:
      return theme.colors.B_Hightlight;
  }
};
