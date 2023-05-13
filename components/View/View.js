import React from "react";
import PlanogramView from "./PlanogramView";
import Arrow from "./Arrow";
import Pending from "./Pending";
import RealTimeView from "./RealTimeView";
import Processed from "./Processed";

export default function View({ show }) {
  return (
    <div className="bg-[#F4F3F8] rounded-xl p-5 w-full overflow-auto max-w-[90vw]">
      <div className="flex items-center overflow-auto">
        <PlanogramView />
        <Arrow />
        <Pending show={show} />
        <Arrow />
        <RealTimeView />
        <Arrow />
        <Processed show={show} />
      </div>

      <div className="flex justify-end mt-10 text-sm text-gray-500">
        <div className="p-3 bg-white rounded-lg">
          <p>Trucks Required- 20</p>

          <p>Trucks Ordered- 10</p>
        </div>
      </div>
    </div>
  );
}
