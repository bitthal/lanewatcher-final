import React, { useState,useEffect } from "react";
import Head from "next/head";
import Leftbar from "@/components/Leftbar";
import Header from "@/components/Header";
import Header2 from "@/components/Header2";
import axios from "axios";

export default function Alert() {
  
  const [show, setShow] = useState(true);
  const [alertList, setAlerts] = useState('');
  const setSiteOptions = (siteIds) =>{
    getAlertHandler(siteIds);
  }
  const setSelectedSiteOption = (siteIds) => {
    console.log(siteIds,'sit');
    getAlertHandler(siteIds);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
         await getAlertHandler();
      } catch (error) {
        console.error("Error:", error);
      }
    };
    return ()=>{
      fetchData();
    };
  }, []);
  function getAlertHandler (payload){
    if(payload){
      axios
      .post(`${process.env.NEXT_PUBLIC_ALERTS_API_URL}`, null, {
        params:{
        site_id: payload.length ? payload[0].site_id  : payload.site_id,
        camera_id:payload.length ? Object.values(payload[0].camera_id).toString()  :  Object.values(payload.camera_id).toString()
        }
      })
      .then((response) => {
        const mapped = response.data.dlist.flatMap(({alerts,key_str,sorting_timestamp,id}) =>
        alerts.map(alerts => ({alerts,key_str,sorting_timestamp,id}))).filter((res)=>{
          return res.alerts.claimed_status === false;
        });
        console.log(mapped)
        setAlerts(mapped)
      });
    } 
  }

  const handleClaim = (payload) => {
    const key_str = payload.key_str;
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

      <div className="flex gap-4 my-3 mr-3 h-auto">
        <Leftbar show={show} />

        <div className={`w-full  ${show ? "max-w-[90vw]" : "max-w-[95vw]"}`}>
          <div className={` w-full`}>
            <Header setSiteOptions={setSiteOptions} setSelectedSiteOption={setSelectedSiteOption}/>
            <Header2 setShow={setShow} show={show} showSearchBar={false} showDatePicker={false} />
          </div>
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="p-1.5 w-full inline-block align-middle">
                <div className="overflow-hidden border rounded-lg">
                  {alertList.length > 0 && <table className="min-w-full divide-y divide-gray-200">
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
                    {alertList && alertList?.map((data, index) => {
                              return (
                                <tr>
                                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap" >
                                  {data.id}
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap" >
                                  {data.sorting_timestamp}
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap" >
                                  {data?.alerts?.type}
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap" >
                                  {data?.alerts?.claimed_status === true? 'True' : 'False'}   
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap" >
                            <button className="bg-transparent hover:bg-yellow-200 text-yellow-700 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded"onClick={() => handleClaim(data)}>Claim Now</button>
                            </td>
                              </tr>
                              )
                            })
                            }                                                 
                      </tbody>
                    {/* <tbody className="divide-y divide-gray-200">
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
                    </tbody> */}
                  </table>}
                  {alertList.length < 1 && <p className="text-center">No data available!!</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
}
