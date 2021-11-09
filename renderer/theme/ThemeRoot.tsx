// ./theme/ThemeRoot.tsx
import React, { ReactNode } from "react";

import { ThemeProvider } from "styled-components";

import { GlobalStyle } from "./GlobalStyle";

import lightTheme from "./lightTheme";

type props = {
  children?: ReactNode;
};

export default function ThemeRoot({ children }: props): JSX.Element {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}
