/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { Pie } from "react-chartjs-2";
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

const data = {
  type:'pie',
  labels: ["In Stage", "Mapped", "Missing"],
  datasets: [
    {
      data: [400, 50, 100],
      backgroundColor: ["#9b2c2c", "#2f855a", "#434190"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    },
  ],
};

export default () => (
	<div className="mx-10">
		<h2 className="mx-20">Planogram Chart</h2>
		<Pie
			data={data}
			width={300}
			height={300}
		/>
	</div>
);
