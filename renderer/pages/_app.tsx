import React from "react";

import type { AppProps } from "next/app";
import ThemeRoot from "../theme/ThemeRoot";
import MasterLayout from "../components/layouts/MasterLayout";

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeRoot>
      <MasterLayout>
        <Component {...pageProps} />
      </MasterLayout>
    </ThemeRoot>
  );
}
