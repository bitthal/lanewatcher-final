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
        <PlanogramView data={data}/>
        <Arrow />
        <Pending show={show} data={data}/>
        <Arrow />
        <RealTimeView data={data}/>
        <Arrow />
        <Processed show={show} data={data}/>
      </div>

      <div className="flex justify-end mt-10 text-sm text-gray-500">
        <div className="p-3 bg-white rounded-lg">

          
          <p>Trucks Required- {data?.processed?.trucks_required}</p>

          <p>Trucks Ordered- {data?.processed?.trucks_ordered}</p>
          <p>Trucks Monotainers- {data?.processed?.total_monotainers}</p>
        
        </div>
      </div>
    </div>
  );
}
