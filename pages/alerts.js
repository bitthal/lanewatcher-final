import React,{useState} from "react";
import Head from "next/head";
import Leftbar from "@/components/Leftbar";
import Header from "@/components/Header";
import Header2 from "@/components/Header2";


export default function Alert() {
  const [show, setShow] = useState(true);

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
            <Header2 setShow={setShow} show={show} showDatePicker={false} />
          </div>
        </div>
      </div>
    </>
  );
}




