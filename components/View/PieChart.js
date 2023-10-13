import React, { useState, useRef, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_more from "highcharts/highcharts-more";
import highcharts3d from "highcharts/highcharts-3d";
import _ from "lodash";


function PieChart(res) {
  HC_more(Highcharts);
  highcharts3d(Highcharts);
  console.log(res,'resss')
  const chartRef = useRef(null);
  const elementRef = useRef();
  // Define chartOptions once during component initialization
  const chartOptions = {
    credits: { enabled: false },
    chart: {
      type: "pie",
      backgroundColor: 'Transparent',
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
      pointFormat: "{series.name}: <b>{point.y}</b>",
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
        center: [280, 180],
        data: [
          {
            name: "Sorted",
            y: res?.data?.pending?.length,
            color:'#03a33e'
          },
          {
            name: "Processed",
            y: res?.data?.processed?.length,
            color:'#fcba03'
          },
          {
            name: "Misplaced",
            y: res?.data?.misplaced?.length,
            color:'#a3030e'
          },
          {
            name: "Finalized",
            y: res?.data?.finalized?.length,
            color:'#2a2e67'
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
    <div className="w-auto high-charts">
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
