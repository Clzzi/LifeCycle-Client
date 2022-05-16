import '@emotion/react';
import { theme } from 'src/core/styles/theme';

type CustomThemeType = typeof theme;

declare module '@emotion/react' {
  export interface Theme extends CustomThemeType {}
}
