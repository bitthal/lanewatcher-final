import React from "react";
import PlanogramView from "./PlanogramView";
import Arrow from "./Arrow";
import Pending from "./Pending";
import RealTimeView from "./RealTimeView";
import Processed from "./Processed";

export default function View({ show,data }) {
  return (
    <div className="bg-[#F4F3F8] rounded-xl p-5 w-full overflow-auto max-w-[90vw]">
      <div className="flex items-center overflow-auto">
       
      
        <Pending show={show} data={data}/>
        <Arrow />
        <RealTimeView data={data}/>
        <Arrow />
        <Processed show={show} data={data}/>
        {/* <Arrow /> */}
        <div className="w-5"></div>
        <PlanogramView data={data}/>
      </div>


    </div>
  );
}
