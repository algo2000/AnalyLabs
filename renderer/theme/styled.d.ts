import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    fontColor: {
      main: string;
      sub: string;
    };

    brandColor: {
      main: string;
    };

    activateColor: {
      error: string;
    };

    backgroundColor: {
      bg: string;
      card: string;
    };

    lineColor: {
      main: string;
    };

    commonStyle: {
      fontSize: {
        s10: int;
        s12: int;
        s14: int;
        s16: int;
        s18: int;
        s20: int;
        s24: int;
        s28: int;
        s32: int;
        s36: int;
      };
      fontWeight: {
        medium: string;
        bold: string;
      };
      borderRadius: {
        default: int;
      };
    };
  }
}
