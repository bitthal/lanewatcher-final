import React, { useState, useRef } from "react";
//import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_more from "highcharts/highcharts-more";
import highcharts3d from "highcharts/highcharts-3d";
import _ from "lodash";

HC_more(Highcharts);
highcharts3d(Highcharts);

function PieChart(res) {
  let chart = null;
  var sample_options = {
    credits: { enabled: false },
    chart: {
      type: "pie",
      backgroundColor: 'transparent',
      margin: [0, 0, 0, 15],
      spacingTop: 0,
      spacingBottom: 0,
      spacingLeft: 0,
      spacingRight: 0,
      options3d: {
        enabled: true,
        alpha: 65,
        beta: 0,
      },
    },
    title: { text: undefined },
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
        // startAngle: angle,
        cursor: "pointer",
        depth: 55,
        size: "80%",
      },
      series: {
        allowPointSelect: true,
        dataLabels: {
          enabled: true,
          format: "{point.name} {point.percentage:.1f}%",
        },
        point: {
          events: {
            select: function () {
              console.log("chart event", chart);
            },
          },
        },
      },
    },
    series: [
      {
        colorByPoint: true,
        center: [280, 180],
        data: [
         
          {
            name: "In Stage",
            y: res.res.planogram.in_stage,
          },
          {
            name: "Mapped",
            y: res.res.planogram.mapped,
          },
          {
            name: "Missing",
            y: res.res.planogram.missing,
          },
          
        ],
      },
    ],
  };

  const elementRef = useRef();

  return (
    <div>
      <div>
        <HighchartsReact
          ref={elementRef}
          highcharts={Highcharts}
          allowChartUpdate={true}
          options={sample_options}
        />
      </div>
    </div>
  );
}
export default PieChart;
