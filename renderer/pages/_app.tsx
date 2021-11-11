import React from "react";
import Head from "next/head";
import type { AppProps } from "next/app";

import { ThemeProvider } from "@mui/styles";
import { CssBaseline } from "@mui/material";

import muiTheme from "../theme/muiTheme";
import ThemeRoot from "../theme/ThemeRoot";

import MasterLayout from "../components/layouts/MasterLayout";

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={muiTheme}>
        <ThemeRoot>
          <MasterLayout>
            <CssBaseline />
            <Component {...pageProps} />
          </MasterLayout>
        </ThemeRoot>
      </ThemeProvider>
    </React.Fragment>
  );
}
