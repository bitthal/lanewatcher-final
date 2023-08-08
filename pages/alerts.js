/* eslint-disable react/jsx-key */
import React, { useState, useEffect, useContext } from "react";
import Leftbar from "@/components/Leftbar";
import Header2 from "@/components/Header2";
import axios from "axios";
import { value_data } from "@/context/context";
import withAuth from "@/utils/withAuth";

function Alert({}) {
  const { drpdwnVaue } = useContext(value_data);
  const { value } = useContext(value_data);
  const [show, setShow] = useState(true);
  const [alertList, setAlerts] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items to display per page
  const totalItems = alertList.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAlerts = alertList.slice(startIndex, endIndex);

  const fetchData = async () => {
    try {
      await getAlertHandler();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [drpdwnVaue]);

  async function getAlertHandler() {
    await axios
      .get(`${process.env.NEXT_PUBLIC_ALERTS_API_URL}`, {
        params: {
          site_id: value ? value.site_id : drpdwnVaue[2].site_id,
          // camera_id: payload ? Object.values(payload.camera_id).toString()  : value ?  Object.values(value.camera_id).toString() : ''
        },
      })
      .then((response) => {
        const mapped = response.data.dlist.flatMap(
          ({ alerts, key_str, sorting_timestamp, id, description }) =>
            alerts.map((alerts) => ({
              alerts,
              key_str,
              sorting_timestamp,
              id,
              description,
            }))
        );
        setAlerts(mapped);
      });
  }

  const handleClaim = (payload, index) => {
    if (payload.alerts.claimed_status === false) {
      const key_str = payload.key_str;
      const username = "l7yhyjg";
      axios
        .post(`${process.env.NEXT_PUBLIC_CLAIMNOW_API_URL}`, null, {
          params: {
            key_str,
            username,
          },
        })
        .then((response) => {
          let data = [...alertList];
          data.splice(index, 1);
          setAlerts(data);
        });
    }
  };

  return (
    <div className="flex gap-4 my-3 mr-3 h-auto">
      <Leftbar show={show} setShow={setShow} />
      <div className={`w-full  ${show ? "max-w-[90vw]" : "max-w-[95vw]"}`}>
        <div className={` w-full`}>
          <Header2 show={show} showSearchBar={false} showDatePicker={false} />
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="p-1.5 w-full inline-block align-middle">
              <div className="overflow-hidden border rounded-lg">
                {alertList.length > 0 && (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-indigo-800">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-center text-white uppercase "
                        >
                          ID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-center text-white uppercase "
                        >
                          Monotaine ID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-center text-white uppercase "
                        >
                          Timestamp
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-center text-white uppercase "
                        >
                          Type
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-center text-white uppercase "
                        >
                          Description
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-center text-white uppercase "
                        >
                          Claim Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-center text-white uppercase "
                        >
                          Claim Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white-100">
                      {currentAlerts &&
                        currentAlerts?.sort((a, b) => a.index - b.index).map((data, index) => {
                          return (
                            <tr>
                              <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap text-center">
                                {alertList.indexOf(data)}
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap text-center">
                                {data.key_str.slice(
                                  0,
                                  data.key_str.indexOf("#")
                                )}
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap text-center">
                                {data.sorting_timestamp}
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap text-center">
                                {data?.alerts?.type}
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap text-center">
                                {data?.alerts?.description && (
                                  <>
                                    Belongs to &nbsp;
                                    {data.alerts.description
                                      .split(" ")[2]
                                      .charAt(0)
                                      .toUpperCase() +
                                      data.alerts.description
                                        .split(" ")[2]
                                        .slice(1)}
                                  </>
                                )}
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap text-center">
                                {data?.alerts?.claimed_status === true
                                  ? "True"
                                  : "False"}
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                                <button
                                  className={`${
                                    data?.alerts?.claimed_status === true
                                      ? "bg-indigo-800 text-white font-bold py-2 px-4 rounded-l cursor-not-allowed"
                                      : "bg-transparent hover:bg-red-800 border-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded"
                                  }`}
                                  onClick={() => handleClaim(data, index)}
                                >
                                  {data?.alerts?.claimed_status === true
                                    ? "Claimed"
                                    : "Claim Now"}
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                )}
                {/* {alertList.length < 1 && <p className="text-center">No data available!!</p>} */}
              </div>
              <div className="flex justify-center mt-4">
  <button
    className="mx-1 p-2 bg-gray-300 rounded-md hover:bg-indigo-800 hover:text-white"
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(1)}
  >
    <i className="fa fa-step-backward"></i>
  </button>
  <button
    className="mx-1 p-2 bg-gray-300 rounded-md hover:bg-indigo-800 hover:text-white"
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(currentPage - 1)}
  >
    <i className="fa fa-chevron-left"></i>
  </button>
  {/* Render page numbers */}
  {Array.from({ length: totalPages }).map((_, index) => {
    if (
      totalPages <= 7 || // Display all page numbers if total pages are 7 or less
      index <= 2 || // Display first three page numbers
      index >= totalPages - 3 || // Display last three page numbers
      (index >= currentPage - 2 && index <= currentPage + 2) // Display nearby page numbers
    ) {
      return (
        <button
          key={index}
          className={`mx-1 p-2 ${
            currentPage === index + 1
              ? "bg-indigo-800 text-white"
              : "bg-gray-300 hover:bg-indigo-800 hover:text-white"
          } rounded-md`}
          onClick={() => setCurrentPage(index + 1)}
        >
          {index + 1}
        </button>
      );
    } else if (
      (index === 3 && currentPage <= totalPages - 4) ||
      (index === currentPage - 3 && currentPage >= 6)
    ) {
      return (
        <span key={index} className="mx-1 p-2">
          ...
        </span>
      );
    }
    return null;
  })}
  <button
    className="mx-1 p-2 bg-gray-300 rounded-md hover:bg-indigo-800 hover:text-white"
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage(currentPage + 1)}
  >
    <i className="fa fa-chevron-right"></i>
  </button>
  <button
    className="mx-1 p-2 bg-gray-300 rounded-md hover:bg-indigo-800 hover:text-white"
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage(totalPages)}
  >
    <i className="fa fa-step-forward"></i>
  </button>
</div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Alert);
