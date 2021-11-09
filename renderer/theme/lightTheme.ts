// ./theme/lightTheme.ts
import { DefaultTheme } from "styled-components";

import commonStyle from "./commonStyle";

const fontColor = {
  main: "#222222",
  sub: "#909090",
};

const brandColor = {
  main: "#75C3FF",
};

const activateColor = {
  error: "#FF5446",
};

const backgroundColor = {
  bg: "#F2F5F9",
  card: "#f4f4f4",
};

const lineColor = {
  main: "#E5E5E5",
};

export const lightTheme: DefaultTheme = {
  fontColor,
  brandColor,
  activateColor,
  backgroundColor,
  lineColor,
  commonStyle,
};

export default lightTheme;
