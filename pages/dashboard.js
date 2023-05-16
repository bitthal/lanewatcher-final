import React, { useState, useEffect } from "react";
import Head from "next/head";
import Leftbar from "@/components/Leftbar";
import Header from "@/components/Header";
import Header2 from "@/components/Header2";
import View from "@/components/View/View";
import axios from "axios";

export default function Index({ Alldata2 }) {
  const [show, setShow] = useState(true);
  const [Alldata, setAlldata] = useState(Alldata2);

 




  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}`);
        setAlldata(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const interval = setInterval(() => {
      fetchData();
    }, 3000);

    return () => {
      // Clean up the interval when the component is unmounted
      clearInterval(interval);
    };
  }, []);


console.log(Alldata)






  return (
    <>
      <Head>
        <title>Lanewatcher</title>
        <meta name="description" content="LaneWatcher" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="flex gap-4  my-3 mr-3   min-h-[750px] ">
        <Leftbar show={show} />

        <div className={`w-full  ${show ? "max-w-[90vw]" : "max-w-[95vw]"}`}>
          <div className={` w-full`}>
            <Header />
            <Header2 setShow={setShow} show={show} />
          </div>

          <div className={`flex flex-col gap-8 mt-5  min-w-[650px] w-full`}>
            {Alldata?.lanes?.map((data, index) => {
              return (
                <div className="" key={index}>
                  <View show={show} data={data} />
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

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};

export async function getServerSideProps() {
  const Alldata2 = await fetchData();

  return {
    props: {
      Alldata2,
    },
  };
}
