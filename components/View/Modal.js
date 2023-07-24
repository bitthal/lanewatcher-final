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
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const dummyData = [
    {
      timestamp: "2023-05-10 10:30:00",
      location: "Vancouver, BC,",
      eventData: "Parcel received at origin facility",
    },
    {
      timestamp: "2023-05-10 10:30:00",
      location: "Vancouver, BC,",
      eventData: "Parcel received at origin facility",
    },
    {
      timestamp: "2023-05-10 10:30:00",
      location: "Vancouver, BC,",
      eventData: "Parcel received at origin facility",
    },
    {
      timestamp: "2023-05-10 10:30:00",
      location: "Vancouver, BC,",
      eventData: "Parcel received at origin facility",
    },
    {
      timestamp: "2023-05-10 10:30:00",
      location: "Vancouver, BC,",
      eventData: "Parcel received at origin facility",
    },
  ];
  function closeModal2() {
    closeModalPopUp(false);
  }
  function openTableModal(params) {
    openTableModalBox(params);
  }
  return (
    <Fragment>
      <Modal
        isOpen={modalState}
        onRequestClose={closeModal2}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
        shouldCloseOnOverlayClick={false}
      >
        <button
          className="text-red-700 font-bold absolute top-0 right-0 p-2 "
          onClick={closeModal2}
        >
          <i className="fa fa-window-close" aria-hidden="true"></i>
        </button>
        {alertsTableData && (
          <div className="max-w-[700px] max-h-[500px] overflow-y-auto m-10">
            <h5 className="text-center font-bold text-xl mb-2">
              Active Alerts
            </h5>
            <div className="overflow-hidden border rounded-lg">
              {alertsTableData && (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-center text-gray-800 uppercase "
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-center text-gray-800 uppercase "
                      >
                        Monotaine ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-center text-gray-800 uppercase "
                      >
                        Timestamp
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-center text-gray-800 uppercase "
                      >
                        Type
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-center text-gray-800 uppercase "
                      >
                        Claimed status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {alertsTableData &&
                      alertsTableData?.map((data, index) => {
                        return (
                          <tr>
                            <td className="px-6 py-4 text-sm font-medium text-center text-gray-800 whitespace-nowrap">
                              {index}
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
            </div>
          </div>
        )}
        {realTimeDataData && (
          <div className="flex flex-col ">
            <div>
              <h5 className="text-center font-bold text-xl">Monotainer ID's</h5>
            </div>
            <div className="grid grid-cols-5 gap-3 mt-5 max-h-80 overflow-auto p-5">
              {listData?.real_time_positions?.map((data1, index) => {
                return (
                  <button
                    className={`${
                      data1.misplaced === 1
                        ? "text-green-700 border-green-700"
                        : "text-red-700 border-red-700"
                    } border px-3 py-2  rounded-lg`}
                    key={index}
                    onClick={() => {
                      openTableModal(data1.monotainer_id);
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
        {pendingData && (
          <div className="flex flex-col ">
            <div>
              <h5 className="text-center font-bold text-xl">Monotainer ID's</h5>
            </div>
            <div className="grid grid-cols-5 gap-3 mt-5 max-h-80 overflow-auto p-5">
              {listData?.pending?.monotainers?.map((data1, index) => {
                return (
                  <button
                    className="text-green-700 border-green-700 text-red-700 border-red-700 border px-3 py-2  rounded-lg"
                    key={index}
                    onClick={() => {
                      openTableModal(data1);
                      // closeModal2();
                    }}
                  >
                    {data1}
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
                    {data1}
                  </button>
                );
              })}
            </div>
          </div>
        )}
        {tableData && (
          <div className="max-w-[700px] max-h-[500px] overflow-y-auto m-10">
            <h5 className="text-center font-bold text-xl mb-2">History</h5>
            <h6 className="text-center underline mb-5 underline-offset-4 text-2xl text-primary2 font-bold">
              {tempName}
            </h6>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-200">
                <tr className="">
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
                    Time stamp
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Location
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Event
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {dummyData &&
                  dummyData?.map((data, index) => {
                    return (
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                          {index}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                          {data.timestamp}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {data.location}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                          {data.eventData}
                        </td>
                      </tr>
                    );
                  })}
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
      <thead className="bg-blue-200 custom-thead"> {/* Add custom-thead class here */}
        <tr>
          <th className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
            Pending
          </th>
          <th className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
            Real Time
          </th>
          <th className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
            Processed
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {Array.from({ length: Math.max(AggregatePendingData.length, AggregateRealTimeData.length, AggregateProcessedData.length) }).map((_, index) => (
          <tr key={index}>
            <td className="border border-gray-800 px-4 py-2">
              {AggregatePendingData[index]}
            </td>
            <td className="border border-gray-800 px-6 py-2">
              {AggregateRealTimeData[index]}
            </td>
            <td className="border border-gray-800 px-6 py-2">
              {AggregateProcessedData[index]}
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
