import React, { useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

const PieChart = ({ chartId, res }) => {
  // Apply CSS for a 3D-like effect
  const chartContainerStyle = {
    width: "600px",
    height: "100%", // Increase the height
  };

  useEffect(() => {
    // Initialize amCharts
    am4core.useTheme(am4themes_animated);

    // Create a new chart instance
    const chart = am4core.create(`chartdiv-${chartId}`, am4charts.PieChart3D);

    chart.logo.dispose();
    chart.hiddenState.properties.opacity = 1;
    // chart.scale = 1.0;

    // Define chart data
    chart.data = [
      {
        label: "In Stage",
        count: res.planogram.in_stage,
        color: am4core.color("#FDFFAE"),
      },
      {
        label: "Mapped",
        count: res.planogram.mapped,
        color: am4core.color("#A8DF8E"),
      },
      {
        label: "Missing",
        count: res.planogram.missing,
        color: am4core.color("#BB2525"),
      },
    ];

    // // Calculate the total count
    // const totalCount = chart.data.reduce((total, item) => total + item.count, 0);

    // // Ensure that each slice has a minimum value (e.g., 1%)
    // const minSliceValue = Math.max(totalCount * 0.01, 1);

    // // Filter the data and set a minimum value for each slice
    // const filteredData = chart.data.map((item) => ({
    //   ...item,
    //   count: Math.max(item.count, minSliceValue),
    // }));

    // Set the filtered data to the chart
    // chart.data = filteredData;
    // Customize chart properties and styles
    chart.innerRadius = am4core.percent(40);
    chart.depth = 10;
    const legend = new am4charts.Legend();
    legend.align = "right"; // Align the legend to the right
    legend.position = "right"; // Set the position to the right of the chart
    // legend.maxHeight = 150;
    // legend.scrollable = true;
    // legend.useDefaultMarker = true;
    
    let marker = legend.markers.template.children.getIndex(0);
    marker.cornerRadius(12, 12, 12, 12);
    marker.strokeWidth = 2;
    marker.strokeOpacity = 1;
    marker.stroke = am4core.color("#ccc");
    chart.legend = legend;
    // chart.legend.legendValueText.template.text = "{value}";
    chart.hiddenState.properties.radius = am4core.percent(0);
    const series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "count";
    series.dataFields.depthValue = "count";
    series.dataFields.category = "label";
    series.slices.template.cornerRadius = 0;
    series.colors.step = 3;
    series.hiddenState.properties.endAngle = -90;
    // Customize slice colors
    series.colors.list = [
      am4core.color("#FDFFAE"), // In Stage
      am4core.color("#A8DF8E"), // Mapped
      am4core.color("#BB2525"), // Missing
    ];

    series.slices.template.showOnInit = true;
    series.slices.template.hiddenState.properties.shiftRadius = 1;
    // Add labels to slices
    series.slices.template.propertyFields.fill = "color";
    series.slices.template.propertyFields.stroke = "color";
    series.slices.template.stroke = am4core.color("#4a2abb");
    series.slices.template.strokeWidth = 2;
    series.slices.template.strokeOpacity = 1;
    // Add labels to slices
    series.labels.template.disabled = false;
    series.ticks.template.disabled = false;
    series.labels.template.text = "{category}: {value}";
    var hoverState = series.slices.template.states.getKey("hover");
    var hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter());
    hoverShadow.opacity = 0.7;
    hoverShadow.blur = 5;
    var shadow = series.slices.template.filters.push(
      new am4core.DropShadowFilter()
    );
    shadow.opacity = 0;

    // Clean up the chart when the component unmounts
    return () => {
      chart.dispose();
    };
  }, [chartId, res]);

  return (
    <div style={chartContainerStyle}>
      <div
        id={`chartdiv-${chartId}`}
      ></div>
    </div>
  );
};

export default PieChart;
