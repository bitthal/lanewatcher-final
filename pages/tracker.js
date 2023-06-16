import React, { Fragment } from "react";
import Head from "next/head";
import Dashboard from "./dashboard";



export default function Tracker(props) {
    console.log(props,'props')
   return (
    <Fragment>
       <Dashboard showDatePicker={true} showRealTimeView={true}/>
    </Fragment>
  );
}




