
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const chartData = {
    labels: ["Sorted", "Misplaced", "Finalized"],
    datasets: [
      {
        data: [data?.pending?.length, data?.misplaced?.length, data?.finalized?.length],
        backgroundColor: ["#2ab7eb", "#6bc784", "#b8433d"],
        borderColor: ["#ccc", "#ccc", "#ccc"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: true,
        position: 'left',
        labels: {
          title: {
            fontSize: '24px', // Adjust the font size as needed
          },
          formatter: (legendItem, chartData) => {
            const dataset = chartData.datasets[0];
            const total = dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((dataset.data[legendItem.index] / total) * 100).toFixed(2) + '%';
            return `${legendItem.text}: ${percentage}`;
          },
        },
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
    maintainAspectRatio: true,
  };
  console.log(chartOptions.plugins,'cp',chartOptions.plugins.customTooltip)
  chartOptions.plugins.tooltip.enabled = true; // Disable default tooltips

  chartOptions.plugins.customTooltip = {
    // Custom function to display data labels
    callback: (context) => {
      const dataset = context.chart.data.datasets[0];
      const value = dataset.data[context.dataIndex];
      return `${value}`;
    },
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
