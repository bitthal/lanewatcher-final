import React, { useState, useRef, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_more from "highcharts/highcharts-more";
import highcharts3d from "highcharts/highcharts-3d";
import _ from "lodash";

// HC_more(Highcharts);
// highcharts3d(Highcharts);

function PieChart(res) {
  const chartRef = useRef(null);
  const elementRef = useRef();
  
  // Define chartOptions once during component initialization
  const chartOptions = {
    credits: { enabled: false },
    chart: {
      type: "pie",
      backgroundColor: 'transparent',
      spacingTop: 0,
      spacingBottom: 0,
      spacingLeft: 0,
      spacingRight: 0,
      animation: true,
      options3d: {
        enabled: true,
        alpha: 5,
        beta: 0,
      },
    },
    title: { text: "" },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.y}%</b>",
    },
    plotOptions: {
      pie: {
        shadow: true,
        cursor: "pointer",
        depth: 100,
        size: "50%",
        animation: false
      },
      series: {
        allowPointSelect: true,
        dataLabels: {
          enabled: true,
          format: "{point.name}",
          style: {
            fontSize: "24px", // Set the desired font size here
          },
        },
        // point: {
        //   events: {
        //     select: function () {
        //       console.log("chart event", chart);
        //     },
        //   },
        // },
      },
    },
    series: [
      {
        colorByPoint: true,
        center: [250, 180],
        data: [
          {
            name: "Sorted",
            y: 10,
          },
          {
            name: "Mapped",
            y: 20,
          },
          {
            name: "Missing",
            y: 30,
          },
          {
            name: "Finalized",
            y: 40,
          },
        ],
      },
    ],
  };

  useEffect(() => {
    // Update the chart with new data only when res changes
    if (chartRef.current) {
      chartRef.current.update(chartOptions);
    }
  }, [res]);

  return (
    <div className="w-auto">
        <HighchartsReact
          ref={elementRef}
          highcharts={Highcharts}
          allowChartUpdate={true}
          options={chartOptions}
          size={screen}
        />
    </div>
  );
}

export default PieChart;
