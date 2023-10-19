import React from "react";
import { Chart } from "react-google-charts";

function PieChart({ data }) {
  // Prepare the data for the chart
  const chartData = [
    ["Status", "Count"],
    ["Pending", data.pending.length],
    ["Misplaced", data.misplaced.length],
    ["Finalized", data.finalized.length],
  ];

  const options = {
    titleTextStyle: { fontSize: 24 },
    legend: {
      position: "top",
      maxLines: 3,
      titleTextStyle: { fontSize: 20, fontWeight: 700, fontStyle: "italic" },
      textStyle: { fontSize: 18 },
    },
    is3D: true,
    sliceVisibilityThreshold: 0,
    pieSliceText: "value", // Display the values inside the slices
    pieSliceTextStyle: { fontSize: 16 }, // Set the font size of the values
  };

  return (
    <div style={{ marginLeft: "25px" }}>
      <Chart
        chartType="PieChart"
        data={chartData}
        options={options}
        width={"400px"}
        height={"400px"}
      />
    </div>
  );
}

export default PieChart;
