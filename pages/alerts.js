import React, { useState } from "react";
import Head from "next/head";
import Leftbar from "@/components/Leftbar";
import Header from "@/components/Header";
import axios from "axios";

export default function Alert() {
  
  const [show, setShow] = useState(true);

  const handleClaim = () => {
    const key_str = 9;
    const username = 'l7yhyjg';
    axios
      .post(`${process.env.NEXT_PUBLIC_CLAIMNOW_API_URL}`, null, {
        params: {
          key_str,
          username
        },  
      })
      .then((response) => {
       console.log(response)
      });
  };

  return (
    <>
      <Head>
        <title>Lanewatcher</title>
        <meta name="description" content="LaneWatcher" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="flex gap-4  my-3 mr-3   min-h-[950px] ">
        <Leftbar show={show} />

        <div className={`w-full  ${show ? "max-w-[90vw]" : "max-w-[95vw]"}`}>
          <div className={` w-full`}>
            <Header />
          </div>
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="p-1.5 w-full inline-block align-middle">
                <div className="overflow-hidden border rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        >
                          ID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        >
                          Timestamp
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        >
                          Type
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        >
                          Claimed status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        >
                          Claim Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                          Id
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          22-June-2023
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          Alert type
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                            Claimed status
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                            <button className="bg-transparent hover:bg-yellow-200 text-yellow-700 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded" onClick={handleClaim}>Claim Now</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
}
