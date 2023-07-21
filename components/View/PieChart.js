/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

// const PieChart = ({ data }) => {
// const data = {
//   labels: data.planogram,
//   datasets: [
//     {
//       data: data.planogram,
//       backgroundColor: [
//         '#9ae6b4',
//         '#63b3ed',
//         '#e53e3e',
//       ],
//       borderColor: [
//         '#9ae6b4',
//         '#63b3ed',
//         '#e53e3e',
//       ],
//       borderWidth: 1,
//     },
//   ],
// };

// return 
// 	<div className="mx-10">
// 		<Pie
// 			data={data}
// 			width={400}
// 			height={400}
// 		/>
// 	</div>
// }

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
    // maintainAspectRatio: true,
    // responsive: true,
    // width: 300,
    // height: 300,
  };

  return (
    <div style={{ width: '400px', height: '400px' }}>
      <Pie data={chartData} options={chartOptions} />;
  </div>
  )
};

export default PieChart;
