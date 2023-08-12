import React from "react";
import PlanogramView from "./PlanogramView";
import Arrow from "./Arrow";
import Pending from "./Pending";
import RealTimeView from "./RealTimeView";
import Processed from "./Processed";
import PieChart from "./PieChart";
export default function View({ show, data, showRealTimeView,showDashboardView,showPieChart,allData }) {
  
  return (
      <div className="flex overflow-ellipsis">
        <div className="bg-[#F4F3F8] flex items-center p-5 rounded-xl">
          <Pending showDashboardView={showDashboardView} show={show} data={data} />
          <Arrow />
          {showRealTimeView && <RealTimeView data={data} allData={allData}/>}
          {showRealTimeView && <Arrow />}
          <Processed showDashboardView={showDashboardView}  show={show} data={data} />
          <Arrow />
          <PlanogramView data={data} />
          {showPieChart && data.planogram.total > 0 && <PieChart res={data}></PieChart>}
        </div>
      </div>
  );
}
