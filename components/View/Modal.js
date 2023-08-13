/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/jsx-key */
import React, { Fragment, useState } from "react";
import Modal from "react-modal";

export default function ModalPopUp({
  alertsTableData,
  modalState,
  closeModalPopUp,
  listData,
  tableData,
  tempName,
  openTableModalBox,
  realTimeDataData,
  pendingData,
  processedData,
  AllData,
  AggregatePendingData,
  AggregateRealTimeData,
  AggregateProcessedData,
}) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };
  const customStyles = {
    content: {
      top: "55%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      zIndex: 99999,
      innerHeight,
    },
  };

  function closeModal2() {
    closeModalPopUp(false);
  }
  function openTableModal(params) {
    openTableModalBox(params);
  }

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items to display per page
  const totalItems = alertsTableData && alertsTableData?.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAlerts =
    alertsTableData && alertsTableData?.slice(startIndex, endIndex);
  return (
    <Fragment>
      <Modal
        isOpen={modalState}
        onRequestClose={closeModal2}
        style={{
          content: {
            ...customStyles.content,
            maxWidth: "100%", // Adjust the width as needed
            maxHeight: "80%", // Adjust the height as needed
            width: "60%",
          },
          overlay: customStyles.overlay,
        }}
        contentLabel="Example Modal"
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
      >
        <button
          className="text-red-700   absolute top-0 left-0 p-2 "
          onClick={closeModal2}
        >
          <i className="fa fa-window-close" aria-hidden="true"></i>
        </button>
        {alertsTableData && (
          <div className="overflow-y-auto">
            <h5 className="text-center   text-xl mb-2">Active Alerts</h5>
            <div className="overflow-y-auto border">
              {alertsTableData && (
                <table className="min-w-full divide-y divide-gray-200 border-collapse border border-black">
                  <thead className="bg-indigo-900">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs text-center text-white uppercase "
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs text-center text-white uppercase "
                      >
                        Monotaine ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs   text-center text-white uppercase "
                      >
                        Timestamp
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs   text-center text-white uppercase "
                      >
                        Type
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs   text-center text-white uppercase "
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs   text-center text-white uppercase "
                      >
                        Claimed status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {alertsTableData &&
                      currentAlerts?.map((data, index) => {
                        return (
                          <tr>
                            <td className="px-6 py-4 text-sm font-medium text-center text-gray-800 whitespace-nowrap">
                              {alertsTableData.indexOf(data)}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-center text-gray-800 whitespace-nowrap">
                              {data.key_str.slice(0, data.key_str.indexOf("#"))}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-center text-gray-800 whitespace-nowrap">
                              {data.sorting_timestamp}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-center text-gray-800 whitespace-nowrap">
                              {data?.alerts?.type}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap text-center">
                              Belongs to{" "}
                              {data?.alerts?.description
                                .split(" ")[2]
                                .charAt(0)
                                .toUpperCase() +
                                data?.alerts?.description
                                  .split(" ")[2]
                                  .slice(1)}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-center text-gray-800 whitespace-nowrap">
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
              <div className="flex justify-center mt-4">
                <button
                  className="mx-1 p-2 bg-gray-300 rounded-md text-white hover:bg-indigo-900 hover:text-white"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(1)}
                >
                  <i className="fa fa-step-backward text-white"></i>
                </button>
                <button
                  className="mx-1 p-2 bg-gray-300 rounded-md text-white hover:bg-indigo-900 hover:text-white"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  <i className="fa fa-chevron-left text-white"></i>
                </button>
                {/* Render page numbers */}
                {Array.from({ length: totalPages }).map((_, index) => {
                  if (
                    index === 0 ||
                    index === totalPages - 1 ||
                    Math.abs(index - currentPage + 1) <= 2
                  ) {
                    // Display first, last, and nearby page numbers
                    return (
                      <button
                        key={index}
                        className={`mx-1 p-2 ${
                          currentPage === index + 1
                            ? "bg-gray-300 text-white"
                            : "bg-gray-300 text-white hover:bg-indigo-900 hover:text-white"
                        } rounded-md`}
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </button>
                    );
                  } else if (
                    (currentPage <= 3 && index === 3) ||
                    (currentPage >= totalPages - 3 && index === totalPages - 4)
                  ) {
                    // Display ... when near the beginning or end
                    return (
                      <span key={index} className="mx-1 p-2">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
                <button
                  className="mx-1 p-2 bg-gray-300 text-white rounded-md hover:bg-indigo-900 hover:text-white"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  <i className="fa fa-chevron-right text-white"></i>
                </button>
                <button
                  className="mx-1 p-2 bg-gray-300 rounded-md text-white hover:bg-indigo-900 hover:text-white"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(totalPages)}
                >
                  <i className="fa fa-step-forward text-white"></i>
                </button>
              </div>
            </div>
          </div>
        )}
        {realTimeDataData && (
          <div className="flex flex-col ">
            <div>
              <h5 className="text-center   text-xl">Monotainer ID's</h5>
            </div>
            <div className="grid grid-cols-5 gap-3 mt-5 max-h-80 overflow-auto p-5">
              {listData?.real_time_positions?.monotainers.map(
                (data1, index) => {
                  return (
                    <button
                      className={`${
                        data1.ifmisplaced
                          ? "text-red-800 border-red-800"
                          : data1.ifuntagged
                          ? "text-yellow-500 border-yellow-500"
                          : " text-green-700 border-green-700"
                      } border px-2 py-2 rounded-lg h-10 `}
                      key={index}
                      onClick={() => {
                        openTableModal(data1);
                        // closeModal2();
                      }}
                    >
                      {data1.monotainer_id}
                    </button>
                  );
                }
              )}
            </div>
          </div>
        )}
        {pendingData && (
          <div className="flex flex-col ">
            <div>
              <h5 className="text-center   text-xl">Monotainer ID's</h5>
            </div>
            <div className="grid grid-cols-5 gap-3 mt-5 max-h-80 overflow-auto p-5">
              {listData?.pending?.monotainers?.map((data1, index) => {
                return (
                  <button
                    className={`${
                      data1.ifmisplaced
                        ? "text-red-800 border-red-800"
                        : data1.ifuntagged
                        ? "text-yellow-500 border-yellow-500"
                        : " text-green-700 border-green-700"
                    } border px-2 py-2 rounded-lg h-10 `}
                    key={data1.index}
                    onClick={() => {
                      openTableModal(data1);
                      // closeModal2();
                    }}
                  >
                    {data1.monotainer_id}
                  </button>
                );
              })}
            </div>
          </div>
        )}
        {processedData && (
          <div className="flex flex-col ">
            <div>
              <h5 className="text-center   text-xl">Monotainer ID's</h5>
            </div>
            <div className="grid grid-cols-5 gap-3 mt-5 max-h-80 overflow-auto p-5">
              {listData?.processed?.monotainers?.map((data1, index) => {
                return (
                  <button
                  className={`${
                    data1.ifmisplaced
                      ? "text-red-800 border-red-800 red-button"
                      : data1.ifuntagged
                      ? "text-yellow-500 border-yellow-500 yellow-button"
                      : " text-white border-green-700 green-button"
                  } border px-2 py-2 rounded-lg h-10 `}
                    key={index}
                    onClick={() => {
                      openTableModal(data1);
                      // closeModal2();
                    }}
                  >
                    {data1.monotainer_id}
                  </button>
                );
              })}
            </div>
          </div>
        )}
        {tableData && (
          <div className="overflow-y-auto">
            <h5 className="text-center   text-md">History</h5>
            <h6 className="text-center text-sm text-primary2  ">{tempName}</h6>
            <table className="min-w-full border-collapse border border-black">
              <thead className="bg-indigo-900">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs text-left text-white"
                  >
                    Camera ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs text-left text-white"
                  >
                    Staged
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs text-left text-white"
                  >
                    Finalized
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs text-left text-white"
                  >
                    Untagged
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs text-left text-white"
                  >
                    Lane Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs text-left text-white"
                  >
                    Misplaced In
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs text-left text-white border border-gray-800"
                  >
                    Processed Timestamp
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs text-left text-white border border-gray-800"
                  >
                    Sorting Timestamp
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs text-left text-white border border-gray-800"
                  >
                    Staged Timestamp
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs text-left text-white border border-gray-800"
                  >
                    Staged Delay
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs text-left text-white border border-gray-800"
                  >
                    Processed Delay
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tableData.length > 0 ? (
                  tableData.map((data, index) => (
                    <tr
                      className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                      key={data.id}
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border border-black">
                        {data.camera_id}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border border-black">
                        {data.ifstaged}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border border-black">
                        {data.iffinalized}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border border-black">
                        {data.ifuntagged}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap border border-black">
                        {data.lane_name
                          ? data.lane_name.charAt(0).toUpperCase() +
                            data.lane_name.slice(1)
                          : ""}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap border border-black">
                        {data.misplaced_in}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap border border-black">
                        {data.processed_timestamp
                          ? new Date(
                              data.processed_timestamp
                            ).toLocaleDateString("en-US", options)
                          : ""}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap border border-black">
                        {data.sorting_timestamp
                          ? new Date(data.sorting_timestamp).toLocaleDateString(
                              "en-US",
                              options
                            )
                          : ""}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap border border-black">
                        {data?.staged_timestamp
                          ? new Date(data.staged_timestamp).toLocaleDateString(
                              "en-US",
                              options
                            )
                          : ""}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap border border-black">
                        {data?.staged_timestamp && data?.sorting_timestamp
                          ? (() => {
                              const stagedDate = new Date(
                                data.staged_timestamp
                              );
                              const sortingDate = new Date(
                                data.sorting_timestamp
                              );
                              const timeDifference = stagedDate - sortingDate;
                              const daysDifference = Math.floor(
                                timeDifference / (1000 * 60 * 60 * 24)
                              );
                              return `${daysDifference} days`;
                            })()
                          : ""}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap border border-black">
                        {data?.processed_timestamp && data?.sorting_timestamp
                          ? (() => {
                              const processed_timestamp = new Date(
                                data.processed_timestamp
                              );
                              const sorting_timestamp = new Date(
                                data.sorting_timestamp
                              );
                              const timeDifference =
                                processed_timestamp - sorting_timestamp;
                              const daysDifference = Math.floor(
                                timeDifference / (1000 * 60 * 60 * 24)
                              );
                              return `${daysDifference} days`;
                            })()
                          : ""}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="bg-gray-100">
                    <td
                      colSpan="11"
                      className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border border-black text-center"
                    >
                      <p> No data available </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        {AllData && (
          <div className="">
            <h5 className="text-center   text-xl mb-2">Total Aggregate ID'S</h5>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-indigo-900">
                  {/* Add custom-thead class here */}
                  <tr>
                    <th className="px-6 py-3 text-xs   text-left text-white uppercase">
                      Pending
                    </th>
                    <th className="px-6 py-3 text-xs   text-left text-white uppercase">
                      Real Time
                    </th>
                    <th className="px-6 py-3 text-xs   text-left text-white uppercase">
                      Processed
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {Array.from({
                    length: Math.max(
                      AggregatePendingData.length,
                      AggregateRealTimeData.length,
                      AggregateProcessedData.length
                    ),
                  }).map((_, index) => (
                    <tr key={index}>
                      <td className="border border-gray-800 px-4 py-2">
                        {AggregatePendingData[index]?.monotainer_id}
                      </td>
                      <td className="border border-gray-800 px-6 py-2">
                        {AggregateRealTimeData[index]?.monotainer_id}
                      </td>
                      <td className="border border-gray-800 px-6 py-2">
                        {AggregateProcessedData[index]?.monotainer_id}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Modal>
    </Fragment>
  );
}
