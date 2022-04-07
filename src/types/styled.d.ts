import { Theme } from 'src/core/styles/theme';
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
