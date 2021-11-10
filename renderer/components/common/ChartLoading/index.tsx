import { CircularProgress } from "@mui/material";
import styled from "styled-components";

const Box = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const LoadingBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  min-width: 100px;
  row-gap: 20px;
`;

const Loading = styled(CircularProgress)`
  margin: auto;
`;

const LoadingText = styled.a`
  text-align: center;
`;

export default function ChartLoading() {
  return (
    <Box>
      <LoadingBox>
        <Loading />
        <LoadingText>Chart Loading</LoadingText>
      </LoadingBox>
    </Box>
  );
}
