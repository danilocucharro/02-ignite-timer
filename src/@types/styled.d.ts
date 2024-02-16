import 'styled-components';
import { defaultTheme } from '../styles/themes/default'

type ThemeType = typeof defaultTheme;

declare module 'styled-components' {//criando uma tipaem para o modulo do styled-components
  export interface DefaultTheme extends ThemeType {}
}