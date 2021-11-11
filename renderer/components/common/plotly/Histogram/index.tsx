import { useEffect, useState } from "react";
import Plot from "react-plotly.js";

type Props = {
  title?: string;
  xAxis?: string;
  yAxis?: string;
  usl?: number;
  lsl?: number;
  xData: number[];
};

export default function Histogram({
  title,
  xAxis,
  yAxis,
  usl,
  lsl,
  xData,
}: Props) {
  const [data, setData] = useState([]);
  const [layout, setLayout] = useState({});

  useEffect(() => {
    const trace = {
      x: [...xData],
      name: "control",
      autobinx: true,
      histnorm: "count",
      marker: {
        color: "rgba(255, 100, 102, 0.7)",
        line: {
          color: "rgba(255, 100, 102, 1)",
          width: 1,
        },
      },
      opacity: 0.5,
      type: "histogram",
      xbins: {
        end: 2.8,
        size: 0.06,
        start: 0.5,
      },
    };

    setData([trace]);
    setLayout({
      autosize: true,
      paper_bgcolor: "rgba(0,0,0,0)",
      plot_bgcolor: "rgba(0,0,0,0)",
      barmode: "overlay",
      title: title,
      xaxis: { title: xAxis },
      yaxis: { title: yAxis },
      shapes: [
        {
          type: "line",
          xref: "x",
          yref: "paper",
          x0: usl,
          y0: 0,
          x1: usl,
          y1: 1,
          opacity: usl ?? 0.0,
          line: {
            color: "rgb(55, 128, 191)",
            width: 3,
          },
        },
        {
          type: "line",
          xref: "x",
          yref: "paper",
          x0: lsl,
          y0: 0,
          x1: lsl,
          y1: 1,
          opacity: lsl ?? 0.0,
          line: {
            color: "rgb(55, 128, 191)",
            width: 3,
          },
        },
      ],
    });
  }, [title, xAxis, yAxis, usl, lsl, xData]);

  return (
    <Plot
      style={{ width: "100%", height: "100%" }}
      useResizeHandler
      data={data}
      layout={layout}
    />
  );
}
