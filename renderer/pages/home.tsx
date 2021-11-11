import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";

import { Card, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

import XLSX from "xlsx";
import useOnChange from "../hooks/useOnChange";
import ChartLoading from "../components/common/ChartLoading";

const cols = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue(params.id, "firstName") || ""} ${
        params.getValue(params.id, "lastName") || ""
      }`,
  },
];

const rs = [
  {
    id: 1,
    lastName: "Snow",
    firstName: "Jon",
    age: 35,
  },
  {
    id: 2,
    lastName: "Lannister",
    firstName: "Cersei",
    age: 42,
  },
  {
    id: 3,
    lastName: "Lannister",
    firstName: "Jaime",
    age: 45,
  },
  {
    id: 4,
    lastName: "Stark",
    firstName: "Arya",
    age: 16,
  },
  {
    id: 5,
    lastName: "Targaryen",
    firstName: "Daenerys",
    age: null,
  },
  {
    id: 6,
    lastName: "Melisandre",
    firstName: null,
    age: 150,
  },
  {
    id: 7,
    lastName: "Clifford",
    firstName: "Ferrara",
    age: 44,
  },
  {
    id: 8,
    lastName: "Frances",
    firstName: "Rossini",
    age: 36,
  },
  {
    id: 9,
    lastName: "Roxie",
    firstName: "Harvey",
    age: 65,
  },
];

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

const Index = function () {
  const [x1, setX1] = useState([]);

  useEffect(() => {
    const t = [];
    for (let i = 1; i < 500; i++) {
      const k = Math.random();
      t.push(k * 5);
    }
    setX1(t);
  }, []);

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
      const rowData: any = {};
      rowData.id = id;
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
      const headers: any = fileData[0] ?? [];
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
            xData={x1}
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
            setColumns(cols);
            setRows(rs);
          }}
        >
          to histogram
        </button>
        <DataGrid columns={columns} rows={rows} autoHeight />
      </GridCard>
    </Box>
  );
};

export default Index;
