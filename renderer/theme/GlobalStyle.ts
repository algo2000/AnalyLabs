import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    background: ${({ theme }) => theme.backgroundColor.bg};
    color: ${({ theme }) => theme.fontColor.main};
    font-family: system-ui;
    margin: 0;
    padding: 0;
  }
  button { 
    cursor: pointer;
    border: none;
    outline: none;
  }
`;