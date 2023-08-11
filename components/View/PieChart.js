/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const PieChart = ({ res }) => {
  const chartData = {
    labels: ["In Stage", "Mapped", "Missing"],
    datasets: [
      {
        data: [res.planogram.in_stage, res.planogram.mapped, res.planogram.missing],
        backgroundColor: ["#9ae6b4", "#63b3ed", "#e53e3e"],
        borderColor: ["#9ae6b4", "#63b3ed", "#e53e3e"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.label}: ${context.formattedValue}`,
        },
      },
    },
    layout: {
      padding: 20,
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  // Apply CSS for a 3D-like effect
  const chartContainerStyle = {
    width: '400px',
    height: '400px',
  };

  return (
    <div style={chartContainerStyle}>
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
};

export default PieChart;
