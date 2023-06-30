/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['In Stage', 'Mapped', 'Missing'],
  datasets: [
    {
      data: [30, 40, 30],
      backgroundColor: [
        '#9ae6b4',
        '#63b3ed',
        '#e53e3e',
      ],
      borderColor: [
        '#9ae6b4',
        '#63b3ed',
        '#e53e3e',
      ],
      borderWidth: 1,
    },
  ],
};

export default () => (
	<div className="mx-10">
		<Pie
			data={data}
			width={400}
			height={400}
		/>
	</div>
);
