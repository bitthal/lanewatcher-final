import React,{Fragment, useContext} from "react";
import PlanogramView from "./PlanogramView";
import Arrow from "./Arrow";
import Pending from "./Pending";
import RealTimeView from "./RealTimeView";
import Processed from "./Processed";
import Finalized from "./Finalized";
import PieChart from "./PieChart";
import { value_data } from "@/context/context";
import Skeleton from "../Skeleton";

export default function View({ show, data, showRealTimeView,showDashboardView,showPieChart,allData,loader }) {
  
  const { resetLoader } = useContext(value_data);

  return (
    <Fragment>
    {!resetLoader ? 
    <div>
      <div className="flex overflow-ellipsis">
        <div className="bg-[#F4F3F8] flex items-center p-5 rounded-xl relative">
        {loader && 
        <div>
        <div className="loader-border-pulse top"></div>
      <div className="loader-border-pulse right"></div>
      <div className="loader-border-pulse bottom"></div>
      <div className="loader-border-pulse left"></div>
      </div>}
          <Pending showDashboardView={showDashboardView} show={show} data={data} resetLoader={resetLoader}/>
          <Arrow />
          {showRealTimeView && <RealTimeView data={data} allData={allData} className="w-100" resetLoader={resetLoader}/>}
          {showRealTimeView && <Arrow />}
          <Processed showDashboardView={showDashboardView}  show={show} data={data} resetLoader={resetLoader}/>
          <Arrow />
          <Finalized showDashboardView={showDashboardView}  show={show} data={data} resetLoader={resetLoader}/>
           <Arrow/>
          <PlanogramView data={data} />
          {showPieChart && data.planogram.total > 0 && <PieChart res={data}></PieChart>}
          
        </div>
      </div>
    </div> : 
    <Skeleton data={data}></Skeleton>}
    </Fragment>
  );
}
