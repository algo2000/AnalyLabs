import React from "react";
import dynamic from "next/dynamic";
import { Card } from "@mui/material";
import styled from "styled-components";

const DTestPlot = dynamic(import("../components/common/plotly/TestPlot"), {
  ssr: false,
});

const BlockCard = styled(Card)`
  display: inline-block;
`;

function Index() {
  return (
    <>
      <BlockCard>
        <DTestPlot />
      </BlockCard>
    </>
  );
}

export default Index;
