import React, { Fragment, useContext } from "react";
import PlanogramView from "./PlanogramView";
import Arrow from "./Arrow";
import Pending from "./Pending";
import RealTimeView from "./RealTimeView";
import Processed from "./Processed";
import Finalized from "./Finalized";
// import PieChart from "./PieChart";
import { value_data } from "@/context/context";
import Skeleton from "../Skeleton";
import dynamic from "next/dynamic";
import PieChart from "./PieChart";

const ChartComponent = dynamic(() => import("./PieChart"), { ssr: false });
export default function View({
  show,
  data,
  showDashboardView,
  allData,
  loader,
}) {
  const { resetLoader } = useContext(value_data);
  return (
    <Fragment>
      {!resetLoader ? (
        <div>     
           <div className="px-5 py-5 rounded-xl">
            {loader && (
              <div className="flex items-center justify-center">
                <div className="loader-border-pulse top"></div>
                <div className="loader-border-pulse right"></div>
                <div className="loader-border-pulse bottom"></div>
                <div className="loader-border-pulse left"></div>
              </div>
            )}
            { (
              <div className="bg-[#F4F3F8] px-5 py-5 rounded-xl relative view-section">
              
              {<div className="flex items-center w-full">
                <Pending
                  show={show}
                  data={data}
                  resetLoader={resetLoader}
                />
                <Arrow />
                <RealTimeView
                  data={data}
                  allData={allData}
                  resetLoader={resetLoader}
                />
                {<Arrow />}
                <Processed
                  show={show}
                  data={data}
                  resetLoader={resetLoader}
                />
                <Arrow />
                <Finalized
                  show={show}
                  data={data}
                  resetLoader={resetLoader}
                />
                <Arrow />
                <PlanogramView data={data} />
              </div>}
              </div>
            )}

            
          </div>
          <div>
            
          </div>
        </div>
      ) : (
        <Skeleton data={data}></Skeleton>
      )}
    </Fragment>
  );
}
