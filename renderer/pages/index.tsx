import React, { useState } from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";

import { Card, TextField, Typography } from "@mui/material";

import useOnChange from "../hooks/useOnChange";
import ChartLoading from "../components/common/ChartLoading";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

import XLSX from "xlsx";

const DHistogram = dynamic(import("../components/common/plotly/Histogram"), {
  loading: () => <ChartLoading />,
  ssr: false,
});

const BlockCard = styled(Card)`
  display: inline-block;
  flex: 2;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

const VisualizationBox = styled.div`
  display: flex;
  column-gap: 10px;
`;

const TextFieldBox = styled(Card)`
  flex: 1;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding: 20px;
`;

const GridCard = styled(Card)`
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
`;

const EXTENSIONS = ["xlsx", "xls", "csv"];

function Index() {
  const [title, setTitle] = useOnChange<string>();
  const [xAxis, setXAxis] = useOnChange<string>();
  const [yAxis, setYAxis] = useOnChange<string>();
  const [usl, setUSL] = useOnChange<number>();
  const [lsl, setLSL] = useOnChange<number>();

  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [rows, setRows] = useState<GridRowsProp>([]);

  const getExtension = (file) => {
    const parts = file.name.split(".");
    const extension = parts[parts.length - 1];
    return EXTENSIONS.includes(extension);
  };

  const convertToJson = (headers, data) => {
    const rows = [];
    data.forEach((row, id) => {
      let rowData = {};
      rowData["id"] = id;
      row.forEach((element, index) => {
        rowData[headers[index]] = element;
      });
      rows.push(rowData);
    });
    return rows;
  };

  const importExcel = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (event) => {
      const bstr = event.target.result;
      const workBook = XLSX.read(bstr, { type: "binary" });

      const workSheetName = workBook.SheetNames[0];
      const workSheet = workBook.Sheets[workSheetName];

      const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 });

      const headers = fileData[0];
      const heads = headers.map((head) => ({
        field: head,
        type: "number",
      }));

      fileData.splice(0, 1);
      setRows(convertToJson(headers, fileData));
      setColumns(heads);
    };

    if (file) {
      if (getExtension(file)) {
        reader.readAsBinaryString(file);
      } else {
        alert("Select Excel, CSV file");
      }
    } else {
      setColumns([]);
      setRows([]);
    }
  };

  return (
    <Box>
      <VisualizationBox>
        <BlockCard>
          <DHistogram
            title={title}
            usl={usl}
            lsl={lsl}
            xAxis={xAxis}
            yAxis={yAxis}
          />
        </BlockCard>
        <TextFieldBox>
          <Typography variant="h6" component="h2">
            옵션
          </Typography>
          <TextField
            label="Title"
            size="small"
            variant="outlined"
            onChange={setTitle}
          />
          <TextField
            label="Y Axis"
            size="small"
            variant="outlined"
            onChange={setXAxis}
          />
          <TextField
            label="X Axis"
            size="small"
            variant="outlined"
            onChange={setYAxis}
          />
          <TextField
            label="USL"
            size="small"
            variant="outlined"
            onChange={setUSL}
          />
          <TextField
            label="LSL"
            size="small"
            variant="outlined"
            onChange={setLSL}
          />
        </TextFieldBox>
      </VisualizationBox>
      <GridCard>
        <input type="file" onChange={importExcel} />
        <button
          onClick={() => {
            console.log(columns);
          }}
        >
          to histogram
        </button>
        <DataGrid columns={columns} rows={rows} autoHeight />
      </GridCard>
    </Box>
  );
}

export default Index;
