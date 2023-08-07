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
            width:"60%%"
          },
          overlay: customStyles.overlay,
        }}
        contentLabel="Example Modal"
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
      >
        <button
          className="text-red-700 font-bold absolute top-0 left-0 p-2 "
          onClick={closeModal2}
        >
          <i className="fa fa-window-close" aria-hidden="true"></i>
        </button>
        {alertsTableData && (
          <div className="overflow-y-auto m-10">
            <h5 className="text-center font-bold text-xl mb-2">
              Active Alerts
            </h5>
            <div className="overflow-hidden border">
              {alertsTableData && (
                <table className="min-w-full divide-y divide-gray-200 border-collapse border border-black">
                  <thead className="bg-indigo-900">
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
                              {data?.alerts?.description}
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
                            ? "bg-indigo-800 text-white"
                            : "bg-gray-300 hover:bg-indigo-800 hover:text-white"
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
        )}
        {realTimeDataData && (
          <div className="flex flex-col ">
            <div>
              <h5 className="text-center font-bold text-xl">Monotainer ID's</h5>
            </div>
            <div className="grid grid-cols-5 gap-3 mt-5 max-h-80 overflow-auto p-5">
              {listData?.real_time_positions?.monotainers.map(
                (data1, index) => {
                  return (
                    <button
                      className={`${
                        data1.ifmisplaced
                          ? "text-green-700 border-green-700"
                          : "text-red-700 border-red-700"
                      } border px-3 py-2  rounded-lg`}
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
              <h5 className="text-center font-bold text-xl">Monotainer ID's</h5>
            </div>
            <div className="grid grid-cols-5 gap-3 mt-5 max-h-80 overflow-auto p-5">
              {listData?.pending?.monotainers?.map((data1, index) => {
                return (
                  <button
                    className="text-green-700 border-green-700 text-green-700 border px-3 py-2  rounded-lg"
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
              <h5 className="text-center font-bold text-xl">Monotainer ID's</h5>
            </div>
            <div className="grid grid-cols-5 gap-3 mt-5 max-h-80 overflow-auto p-5">
              {listData?.processed?.monotainers?.map((data1, index) => {
                return (
                  <button
                    className="text-green-700 border-green-700 text-red-700 border-red-700 border px-3 py-2  rounded-lg"
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
          <div className="w-fit max-h-[500px] overflow-y-auto m-10">
            <h5 className="text-center font-bold text-xl mb-2">History</h5>
            <h6 className="text-center underline mb-5 underline-offset-4 text-2xl text-primary2 font-bold">
              {tempName}
            </h6>
            <table className="min-w-full border-collapse border border-black">
              <thead className="bg-indigo-900">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-white uppercase border border-black"
                  >
                    Camera ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-white uppercase border border-black"
                  >
                    Finalized Timestamp
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-white uppercase border border-black"
                  >
                    Finalized
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-white uppercase border border-black"
                  >
                    Misplaced
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-white uppercase border border-black"
                  >
                    Processed
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-white uppercase border border-black"
                  >
                    Staged
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-white uppercase border border-black"
                  >
                    Untagged
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-white uppercase border border-black"
                  >
                    Lane Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-white uppercase border border-black"
                  >
                    Misplaced In
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-white uppercase border border-black"
                  >
                    Misplaced Lane
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-white uppercase border border-black"
                  >
                    Misplaced Timestamp
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-white uppercase border border-black"
                  >
                    Processed Timestamp
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-white uppercase border border-black"
                  >
                    Sorting Timestamp
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-white uppercase border border-black"
                  >
                    Staged Timestamp
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
                        {data.finalized_timestamp}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border border-black">
                        {data.iffinalized}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border border-black">
                        {data.ifmisplaced}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border border-black">
                        {data.ifprocessed}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border border-black">
                        {data.ifstaged}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border border-black">
                        {data.ifuntagged}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap border border-black">
                        {data.lane_name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap border border-black">
                        {data.misplaced_in}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap border border-black">
                        {data.misplaced_lane}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap border border-black">
                        {data.misplaced_timestamp}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap border border-black">
                        {data.processed_timestamp}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap border border-black">
                        {data.sorting_timestamp}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap border border-black">
                        {data.staged_timestamp}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="bg-gray-100">
                    <td
                      colSpan="5"
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
          <div className="max-w-[700px] max-h-[500px]">
            <h5 className="text-center font-bold text-xl mb-2">
              Total Aggregate ID'S
            </h5>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-indigo-900">
                  {/* Add custom-thead class here */}
                  <tr>
                    <th className="px-6 py-3 text-xs font-bold text-left text-white uppercase">
                      Pending
                    </th>
                    <th className="px-6 py-3 text-xs font-bold text-left text-white uppercase">
                      Real Time
                    </th>
                    <th className="px-6 py-3 text-xs font-bold text-left text-white uppercase">
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
