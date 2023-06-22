import React, { useState,useEffect,useContext } from "react";
import Leftbar from "@/components/Leftbar";
import Header2 from "@/components/Header2";
import axios from "axios";
import { value_data } from "@/context/context";

export default function Alert() {
  
  const { value } = useContext(value_data);
  console.log(value,'value')
  const [show, setShow] = useState(true);
  const [alertList, setAlerts] = useState('');
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
  }, [value]);


  async function getAlertHandler (payload){
    console.log(value,'siteDropDownSelectedValue')
      await axios
      .post(`${process.env.NEXT_PUBLIC_ALERTS_API_URL}`, null, {
        params:{
        site_id:  payload ? payload.site_id  : value ? value.site_id : '',
        camera_id: payload ? Object.values(payload.camera_id).toString()  : value ?  Object.values(value.camera_id).toString() : ''
        }
      })
      .then((response) => {
        const mapped = response.data.dlist.flatMap(({alerts,key_str,sorting_timestamp,id}) =>
        alerts.map(alerts => ({alerts,key_str,sorting_timestamp,id})))
        console.log(mapped)
        setAlerts(mapped)
      });
    
  }

  const handleClaim = (payload,index) => {
    if(payload.alerts.claimed_status === false){
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
        let data = [...alertList];
        data.splice(index, 1);
        setAlerts(data);
       console.log(response);
      });
    }
  };

  return (
      <div className="flex gap-4 my-3 mr-3 h-auto bg-blue-100">
        <Leftbar show={show} />
        <div className={`w-full  ${show ? "max-w-[90vw]" : "max-w-[95vw]"}`}>
          <div className={` w-full`}>
            <Header2 setShow={setShow} show={show} showSearchBar={false} showDatePicker={false} />
          </div>
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="p-1.5 w-full inline-block align-middle">
                <div className="overflow-hidden border rounded-lg">
                  {alertList.length > 0 && <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-blue-100">
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
                          Monotaine ID
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
                                  {index}
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap" >
                                  {data.key_str.slice(0,data.key_str.indexOf('#'))}
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
                            <button className={`${data?.alerts?.claimed_status === true ? "bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l cursor-not-allowed" : "bg-transparent hover:bg-gray-400 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded"}`}onClick={() => handleClaim(data,index)}>
                              {data?.alerts?.claimed_status === true ? "Claimed" : "Claim Now"}</button>
                            </td>
                              </tr>
                              )
                            })
                            }                                                 
                      </tbody>
                  </table>}
                  {alertList.length < 1 && <p className="text-center">No data available!!</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
  );
}
