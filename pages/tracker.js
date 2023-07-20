import React, { useState, useEffect } from "react";
import Head from "next/head";
import Leftbar from "@/components/Leftbar";
import Header from "@/components/Header";
import Header2 from "@/components/Header2";
import View from "@/components/View/View";
import axios from "axios";

export default function Tracker({showDatePicker,showRealTimeView,showDashboardView, showPieChart }) {
  const [show, setShow] = useState(true);
  const [date, setDate] = useState(new Date());
  const [Alldata, setAlldata] = useState();
  const [newValue, setState] = useState('');
  const [selectedValue,setOptionVal] = useState('');

  function setRangeFilter(date){
    setDate(date);
    handleSubmit(date);
  }
   function handleState(newValue) {
      setState(newValue);
      handleSubmit(newValue);
  }

  function handleOption(selectedValue){
    console.log(selectedValue);
    setOptionVal(selectedValue);
    handleSubmit(selectedValue);
  }
  const handleSubmit = (payload) => {
    const userData = {
      payload
    };
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}`, userData).then((response) => {
      setAlldata(Object.values(response.data));
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}`);
        setAlldata(response.data.lanes);
        
      } catch (error) {
        console.error("Error:", error);
      }
    };
    return ()=>{
      fetchData();
      const intervalId = setInterval(() => {
        fetchData();
      }, 5000); // 5 seconds interval
  
      // Clean up the interval on component unmount to prevent memory leaks
      return () => {
        clearInterval(intervalId);
      };
    };
  }, []);

  // if(!Alldata){
  //   return (
  //     <p>Loading!</p>
  //   )
  // }
   return (
    <>
      <div className="flex gap-5 my-3 mr-3 h-auto">
        <Leftbar show={show} />
        <div className={`w-full  ${show ? "max-w-[90vw]" : "max-w-[95vw]"}`}>
          <div className={`w-full`}>
            <Header2 setShow={setShow} show={show} setUpdated = {handleState} setRangeFilter={setRangeFilter} date={date} showSearchBar={true} selectedValue={selectedValue} setOptionVal={handleOption} newValue={newValue} showDatePicker={showDatePicker ? showDatePicker : false} />
          </div>
          
          <div className={`flex flex-col gap-8 mt-5 w-full`}>
            {Alldata?.map((data, index) => {
              return (
                <div className="" key={index}>
                  <View showPieChart={showPieChart ? true : false} showDashboardView={showDashboardView ? false : true} show={show} data={data} showRealTimeView={showRealTimeView ? false : true}/>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}



