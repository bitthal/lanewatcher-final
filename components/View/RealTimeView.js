import React from "react";

export default function RealTimeView({ data }) {
  console.log("realtimeview", data);
  return (
    <div className="h-96 p-5 bg-white rounded-xl flex flex-col justify-between">
      <h1 className="text-center font-bold text-lg text-primary">
        Real Time View
      </h1>

      <div className="flex gap-3">
        {data?.real_time_positions?.map((data, index) => {
           return (
            <button className="text-primary font-bold border px-3 py-2 border-primary rounded-lg" key={index}>
            Position&nbsp;{data?.position}
          </button>
          
           );
         })}
      </div>

      <div className="flex justify-between gap-3 font-bold text-gray-400">
        <span>Lane In</span>
        <span>
          Lane {data?.lane_number}/{data?.lane_name}
        </span>
        <span>Lane Out</span>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex gap-3">

        {data?.real_time_positions?.map((data, index) => {
           return (
            <button className="text-gray-300 font-bold border px-3 py-2 border-gray-100 shadow-sm hover:shadow-lg rounded-lg" key={index}>
            {data?.upper?.monotainer_id}
          </button>
          
           );
         })}
 
        </div>


        <div className="flex gap-3">
        {data?.real_time_positions?.map((data, index) => {
           return (
            <button className="text-gray-300 font-bold border px-3 py-2 border-gray-100 shadow-sm hover:shadow-lg rounded-lg" key={index}>
            {data?.lower?.monotainer_id}
          </button>
          
           );
         })}
         
        </div>
      </div>
    </div>
  );
}
