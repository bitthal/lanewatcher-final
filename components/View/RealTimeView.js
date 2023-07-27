import React, { useState } from "react";
import ModalPopUp from "./Modal";
export default function RealTimeView({ data }) {
  const [page, setPage] = useState(1);
  const [tempName, setTempName] = React.useState("");
  const [dataModalOpen, setDataModalOpen] = useState(false);
  const [listModalOpen, setListModalOpen] = useState(false);
  const dataPerPage = 24;
  const totalData = data?.real_time_positions?.length;
  const totalPages = Math.ceil(totalData / dataPerPage);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const closeModalPopUp = () => {
    setDataModalOpen(false);
    setListModalOpen(false);
  };
  const openTableModalBox = (params) => {
    setListModalOpen(false);
    setTempName(params);
    setDataModalOpen(true);
  };
  return (
    <>
      <div className="p-5 bg-white rounded-xl h-96 realTimeView">
        <div className="flex items-center text-center justify-between">
          <div>
            <p className="text-indigo-800 font-bold underline">
              Lane :&nbsp;&nbsp;{capitalizeFirstLetter(data.lane_name)}
            </p>
            <span className="font-bold text-gray-400 text-xs justify-between lane-1">
              Lane In
            </span>
          </div>

          <p className="font-bold text-lg text-primary2">
            Real Time View
            <span className="text-lg font-bold text-green-600">
              &nbsp;&nbsp;{data?.real_time_positions?.length}
            </span>
          </p>
          <div>
            <p className="text-indigo-800 font-bold underline">
              Camera ID:&nbsp;&nbsp;{data.camera_id}
            </p>
          </div>
        </div>
        <div className="flex gap-3 flex-col mt-7rem">
          <div className="grid grid-cols-8 gap-4">
            {data?.real_time_positions?.map((data1, index) => (
              <button
                className={`${
                  data1.misplaced === 1
                    ? "text-green-700 border-green-700"
                    : "text-red-700 border-red-700"
                } border px-3 py-2 rounded-lg`}
                key={index}
                onClick={() => {
                  setDataModalOpen(true);
                  setTempName(data1.monotainer_id);
                }}
              >
                {data1.monotainer_id}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center gap-3 mt-3rem">
          <div className="flex gap-1 items-center">
            <div
              className="w-6 h-6 rounded-full border bg-gray-200 cursor-pointer"
              onClick={() => {
                if (page > 1) {
                  setPage(page - 1);
                }
              }}
            >
              <i className="text-sm fa-solid fa-chevron-left relative left-2" />
            </div>
            <span className="text-sm text-gray-500">
              {page}&nbsp;out&nbsp;of&nbsp;{totalPages}
            </span>
            <div
              className="w-6 h-6 rounded-full border bg-gray-200 cursor-pointer"
              onClick={() => {
                if (totalPages > page) {
                  setPage(page + 1);
                }
              }}
            >
              <i className="text-sm fa-solid fa-chevron-right relative left-1" />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-gray-400 text-xs mb-1">
              Lane Out
            </span>
            <button
              className={`${
                totalPages === 0 ? "disabled cursor-not-allowed" : ""
              } bg-[#434190] rounded-md px-2 py-1 text-white text-sm font-bold text-xs`}
              onClick={() => {
                setListModalOpen(true);
              }}
            >
              See&nbsp;All
            </button>
          </div>
        </div>
      </div>

      {listModalOpen && (
        <ModalPopUp
          listData={data}
          realTimeDataData={true}
          openTableModalBox={openTableModalBox}
          modalState={listModalOpen}
          closeModalPopUp={closeModalPopUp}
        ></ModalPopUp>
      )}
      {dataModalOpen && (
        <ModalPopUp
          tableData={true}
          tempName={tempName}
          modalState={dataModalOpen}
          closeModalPopUp={closeModalPopUp}
        ></ModalPopUp>
      )}
    </>
  );
}
