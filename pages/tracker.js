import React, { Fragment } from "react";
import dynamic from 'next/dynamic'

export default function Tracker() {
  const Dashboard = dynamic(() => import("./dashboard"), { ssr: false })
   return (
    <Fragment>
       <Dashboard showDatePicker={true} showSearchBar={true} showRealTimeView={true}/>
    </Fragment>
  );
}




