import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";

export default function LineChart({ historicalData }) {
  const [data, setData] = useState([
    ["Date", "Price", { role: "tooltip", type: "string" }],
  ]);

  useEffect(() => {
    let dataCopy = [["Date", "Price", { role: "tooltip", type: "string" }]];
    if (historicalData.prices) {
      historicalData.prices.forEach((item) => {
        const date = new Date(item[0]);
        const price = item[1];
        const dateLabel = date.toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
        const tooltip = `📅 ${dateLabel}\n💰 $${price.toFixed(2)}`;
        dataCopy.push([dateLabel, price, tooltip]);
      });
      setData(dataCopy);
    }
  }, [historicalData]);

  const options = {
    title: "Market Prices Over Time",
    curveType: "function",
    legend: { position: "bottom" },
    explorer: {
      axis: "horizontal",
      keepInBounds: true,
      maxZoomIn: 4.0,
      actions: ["dragToZoom", "rightClickToReset"],
    },
    tooltip: { isHtml: true },
    hAxis: { title: "Date" },
    vAxis: { title: "Price (USD)" },
    pointSize: 5,
    chartArea: { width: "80%", height: "70%" },
  };

  return (
    <Chart
      chartType="LineChart"
      data={data}
      options={options}
      height="400px"
      legendToggle
      // You can also capture clicks here
      chartEvents={[
        {
          eventName: "select",
          callback: ({ chartWrapper }) => {
            const chart = chartWrapper.getChart();
            const selection = chart.getSelection();
            if (selection.length > 0) {
              const row = selection[0].row;
              const date = data[row + 1][0]; // +1 because of headers
              const price = data[row + 1][1];
              alert(`You clicked on ${date} - $${price.toFixed(2)}`);
            }
          },
        },
      ]}
    />
  );
}
