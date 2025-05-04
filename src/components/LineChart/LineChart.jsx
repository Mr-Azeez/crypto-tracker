import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import { Line } from "react-chartjs-2";

export default function LineChart({ historicalData, currency }) {
  const [data, setData] = useState(null);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Market Prices Over Time",
      },
    },
  };

  useEffect(() => {
    // console.log(historicalData)
    if (historicalData?.datasets[0]?.data && historicalData?.labels) {
      const labels = historicalData.labels;
      const prices = historicalData.datasets[0].data;

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: `Market Price (${currency})`,
            data: prices,
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
          },
        ],
      };

      // console.log(prices);
      // console.log(chartData);
      setData(chartData);
    }
  }, [historicalData, currency]);

  return <div>{data ? <Line options={options} data={data} /> : null}</div>;
}