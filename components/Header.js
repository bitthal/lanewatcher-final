import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { value_data } from "@/context/context";
import Link from "next/link";
import Modal from "react-modal";

export default function Header() {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const { value, setValue } = useContext(value_data);
  const { drpdwnVaue, setdrpdwnVaue } = useContext(value_data);
  const [alertList, setAlerts] = useState("");
  const [modalIsOpen2, setIsOpen2] = React.useState(false);

  function openModal2() {
    setIsOpen2(true);
  }

  function closeModal2() {
    setIsOpen2(false);
  }
  const router =
    useRouter().pathname.replace(/\//, "").charAt(0).toUpperCase() +
    useRouter().pathname.replace(/\//, "").slice(1);

  const [siteId, setSiteID] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SITEID_API_URL}`
        );
        console.log(response.data.result, "res");
        setSiteID(response.data.result);
        setdrpdwnVaue(response.data.result);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    return () => {
      fetchData();
    };
  }, []);

  async function getAlertHandler() {
    setIsOpen2(true);
    await axios
      .post(`${process.env.NEXT_PUBLIC_ALERTS_API_URL}`, null, {
        params: {
          site_id: value ? value.site_id : drpdwnVaue[0].site_id,
          camera_id: value
            ? value.site_id
            : Object.values(drpdwnVaue[0].camera_id).toString(),
        },
      })
      .then((response) => {
        const mapped = response.data.dlist
          .flatMap(({ alerts, key_str, sorting_timestamp, id }) =>
            alerts.map((alerts) => ({ alerts, key_str, sorting_timestamp, id }))
          )
          .filter((data) => {
            return data.alerts.claimed_status === true;
          });
        console.log(mapped);
        setAlerts(mapped);
      });
  }
  const handleChange = (event) => {
    setValue(siteId[event.target.value]);
    console.log(event.target.value, siteId[event.target.value]);
  };

  return (
    <>
      <div className="w-full shadow-md p-5 flex justify-between items-center overflow-hidden ">
      <div className="flex gap-16 items-center">
        <Link href="/tracker">
        <p className="w-fit text-center text-gray-600 font-bold">UST Canada Post</p>
        </Link>
        <p className="w-fit  font-bold text-gray-600">{router}</p>
      </div>

      <div className="flex items-center gap-6">
      
       {siteId &&
        <select label="Global Site Selection:-" className="border-blue-500 border-opacity-100 cursor-pointer shadow-xl" onChange={handleChange}>
        {siteId.map((option,index) => (
                <option key={option.camera_id} value={index}>
                  {option.site_id}
                </option>
              ))}
        </select>}
          <Link href="/settings">
          <i className="text-2xl fa-solid fa-gear text-gray-600" />
          </Link>

        <div className="relative cursor-pointer" onClick={getAlertHandler} >
          <i className="fa-solid fa-bell text-2xl " />
          <span className=" flex h-3 w-3 absolute top-0 translate-x-1/2 right-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
        </div>

        <div className="flex gap-4 items-center">
          <p className="w-fit font-bold text-gray-600">Welcome, User!</p>
          <i className=" text-2xl  fa-solid fa-user"></i>
        </div>
      </div>
    </div>
      
      <Modal
        isOpen={modalIsOpen2}
        onRequestClose={closeModal2}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button
          className="text-red-700 font-bold absolute top-0 right-0 p-2 "
          onClick={closeModal2}
        >
          Close
        </button>
        <div className="max-w-[700px] max-h-[500px] overflow-y-auto m-10">
          <h5 className="text-center font-bold text-xl mb-2">Active Alerts</h5>
          <div className="overflow-hidden border rounded-lg">
            {alertList.length > 0 && (
              <table className="min-w-full divide-y divide-gray-200">
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
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {alertList &&
                    alertList?.map((data, index) => {
                      return (
                        <tr>
                          <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                            {index}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                            {data.key_str.slice(0, data.key_str.indexOf("#"))}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                            {data.sorting_timestamp}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                            {data?.alerts?.type}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                            {data?.alerts?.claimed_status === true
                              ? "True"
                              : "False"}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            )}
            {alertList.length < 1 && <p className="text-center">Loading!!</p>}
          </div>
        </div>
      </Modal>
    </>
  );
}
