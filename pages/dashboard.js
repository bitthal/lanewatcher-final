import React, { useState, useEffect } from "react";
import Head from "next/head";
import Leftbar from "@/components/Leftbar";
import Header from "@/components/Header";
import Header2 from "@/components/Header2";
import View from "@/components/View/View";
import axios from "axios";



export default function Dashboard({Alldata2,showDatePicker,showRealTimeView }) {
  const [show, setShow] = useState(true);
  const [date, setDate] = useState(new Date());
  const [Alldata, setAlldata] = useState(Alldata2);
  const [newValue, setState] = useState('');
  const [selectedValue,setOptionVal] = useState('');
  // const [showDatePicker, setshowDatePicker] = useState(false);
  //  const {Alldata1} = Alldata2;

  console.log(showRealTimeView,'showRealTimeView',showDatePicker)
  function setRangeFilter(date){
    console.log(date);
    setDate(date);
    handleSubmit(date);
  }
   function handleState(newValue) {
      console.log(newValue,'state')
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
      console.log(response.data);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}`);
        console.log(response.data,'res',Alldata2,'AL');
        setAlldata(response.data.lanes);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    return ()=>{
      fetchData();
    };
  }, [Alldata2]);

   return (
    <>
      <Head>
        <title>Lanewatcher</title>
        <meta name="description" content="LaneWatcher" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="flex gap-4  my-3 mr-3   min-h-[850px] ">
        <Leftbar show={show} />

        <div className={`w-full  ${show ? "max-w-[90vw]" : "max-w-[95vw]"}`}>
          <div className={` w-full`}>
            <Header />
            <Header2 setShow={setShow} show={show} setUpdated = {handleState} setRangeFilter={setRangeFilter} date={date} selectedValue={selectedValue} setOptionVal={handleOption} newValue={newValue} showDatePicker={showDatePicker ? showDatePicker : false} />
          </div>
          
          <div className={`flex flex-col gap-8 mt-5  min-w-[650px] w-full`}>
            {Alldata?.map((data, index) => {
              return (
                <div className="" key={index}>
                  <View show={show} data={data} showRealTimeView={showRealTimeView ? false : true}/>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}


const fetchData = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
      headers: {
        "Access-Control-Allow-Origin": "*", // Replace with the appropriate origin
        // Add other headers if needed
      },
    });
    response.setHeader(
      'Cache-Control',
      'public, s-maxage=10, stale-while-revalidate=59'
    )
    const data = await response.data.json();
    console.log(data,'dat')
    return data;
  } catch (error) {
    return null;
  }
};

export async function getStaticProps(context) {
  const Alldata2 = await fetchData();
  console.log(
    Alldata2)
  return {
    props: {
      Alldata2
    },
  };
}


