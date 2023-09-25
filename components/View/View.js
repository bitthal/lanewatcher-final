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

const ChartComponent = dynamic(() => import("./PieChart"), { ssr: false });
export default function View({
  show,
  data,
  showRealTimeView,
  showDashboardView,
  showPieChart,
  allData,
  loader,
}) {
  const { resetLoader } = useContext(value_data);

  return (
    <Fragment>
      {!resetLoader ? (
          <div className="bg-[#F4F3F8] px-5 py-5 rounded-xl relative view-section">
            {loader && (
              <div className="flex items-center justify-center">
                <div className="loader-border-pulse top"></div>
                <div className="loader-border-pulse right"></div>
                <div className="loader-border-pulse bottom"></div>
                <div className="loader-border-pulse left"></div>
              </div>
            )}
            <div className="flex items-center w-full">
              <Pending
                showDashboardView={showDashboardView}
                show={show}
                data={data}
                resetLoader={resetLoader}
              />
              <Arrow />
              {showRealTimeView && (
                <RealTimeView
                  data={data}
                  allData={allData}
                  resetLoader={resetLoader}
                />
              )}
              {showRealTimeView && <Arrow />}
              <Processed
                showDashboardView={showDashboardView}
                show={show}
                data={data}
                resetLoader={resetLoader}
              />
              <Arrow />
              <Finalized
                showDashboardView={showDashboardView}
                show={show}
                data={data}
                resetLoader={resetLoader}
              />
              <Arrow />
              <PlanogramView data={data} />
              {/* {showPieChart && data.planogram.total > 0 && (
                <ChartComponent key={data.id} res={data}></ChartComponent>
              )} */}
               {showPieChart &&
                data.planogram.total > 0 &&
                  <ChartComponent
                    key={data.id}
                    chartId={data.id} // Pass a unique chartId to each PieChart instance
                    res={data}
                  />
                }
            </div>
          </div>
      ) : (
        <Skeleton data={data}></Skeleton>
      )}
    </Fragment>
  );
}
