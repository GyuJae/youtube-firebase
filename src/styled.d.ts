import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      red: string;
      white: string;
      black: string;
      grayWeak: string;
      grayLine: string;
      grayIcon: string;
      blue: string;
      grayHover: string;
    };
  }
}
