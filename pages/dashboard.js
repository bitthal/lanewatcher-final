import React, { Fragment } from "react";
import dynamic from 'next/dynamic'

export default function Dashboard() {
  const Tracker = dynamic(() => import("./tracker"), { ssr: false })
   return (
    <Fragment>
       <Tracker showDashboardView={false} showPieChart={true} showDatePicker={true} showSearchBar={true} showRealTimeView={true}/>
    </Fragment>
  );
}




