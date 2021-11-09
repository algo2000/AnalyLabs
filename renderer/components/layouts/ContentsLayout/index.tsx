import { AppBar, Toolbar, Typography } from "@mui/material";
import React, { ReactNode } from "react";

import styled from "styled-components";

const ContentsBox = styled.div`
  margin: 20px;
`;

const AppBarSticky = styled(AppBar)`
  position: sticky;
`;

type Props = {
  children: ReactNode;
};

export default function ContentsLayout({ children }: Props) {
  return (
    <>
      <AppBarSticky>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Home
          </Typography>
        </Toolbar>
      </AppBarSticky>
      <ContentsBox>{children}</ContentsBox>
    </>
  );
}
