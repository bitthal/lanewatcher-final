import React, { Fragment } from "react";
import dynamic from 'next/dynamic'
import withAuth from "@/utils/withAuth";

 function Dashboard() {
  
  const Tracker = dynamic(() => import("./tracker"), { ssr: false })
   return (
    <Fragment>
       <Tracker showDashboardView={false} showPieChart={true} showDatePicker={true} showSearchBar={true} showRealTimeView={true}/>
    </Fragment>
  );
}

export default withAuth(Dashboard);




