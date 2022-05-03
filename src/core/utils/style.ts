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
