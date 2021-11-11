import React, { ReactNode } from "react";

import styled from "styled-components";
import Link from "next/link";

import HomeIcon from "@mui/icons-material/Home";
import BarChartIcon from "@mui/icons-material/BarChart";
import AnalyLabs from "../../../Icons/AnalyLabs.svg";

import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SvgIcon,
  Typography,
} from "@mui/material";

import ContentsLayout from "../ContentsLayout";

const Box = styled.div`
  display: flex;
`;

const SideMenuDrawer = styled(Drawer)`
  width: 240px;
`;

const ContentsBox = styled.div`
  position: relative;
  flex: 1;
`;

const SideMenuContents = styled.div`
  width: 240px;
`;

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 16px 10px;
  > div {
    margin-left: 15px;
  }
`;

type Props = {
  children: ReactNode;
};

export default function MasterLayout({ children }: Props) {
  return (
    <Box>
      <SideMenuDrawer variant="permanent">
        <SideMenuContents>
          <DrawerHeader>
            <SvgIcon
              component={AnalyLabs}
              viewBox="0 0 20 20"
              fontSize="medium"
            />
            <Typography variant="h6" noWrap component="div">
              AnalyLabs
            </Typography>
          </DrawerHeader>
          <Divider />
          <List>
            <Link href="/home">
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItem>
            </Link>
            <Link href="/next">
              <ListItem button>
                <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary={"Next"} />
              </ListItem>
            </Link>
          </List>
          <Divider />
        </SideMenuContents>
      </SideMenuDrawer>
      <ContentsBox>
        <ContentsLayout>{children}</ContentsLayout>
      </ContentsBox>
    </Box>
  );
}
