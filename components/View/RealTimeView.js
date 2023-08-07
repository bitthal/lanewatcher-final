import React, { useState } from "react";
import ModalPopUp from "./Modal";
export default function RealTimeView({ data }) {
  const [page, setPage] = useState(1);
  const [tempName, setTempName] = React.useState("");
  const [dataModalOpen, setDataModalOpen] = useState(false);
  const [listModalOpen, setListModalOpen] = useState(false);
  const [history, showHistory] = useState('');

  const dataPerPage = 32;
  const totalData = data?.real_time_positions?.total_monotainers;
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
    setTempName(params.monotainer_id);
    setDataModalOpen(true);
    historyHandler(params);
  };
  const historyHandler = (data) =>{
    const monoid = data.monotainer_id;
     axios
      .get(`${process.env.NEXT_PUBLIC_API_URL_HISTORY}`, {
        params: {
          monoid
        },
      })
      .then((response) => {
        console.log(response.data.result,'response.data.result')
        showHistory(response.data.result)        
      });
  }
  return (
    <>
      <div className="p-5 bg-white rounded-xl h-96 realTimeView">
        <div className="flex items-center text-center justify-between">
          <div style={{ lineHeight: 1,fontSize: '12px' }}>
            <p className="text-indigo-800 font-bold underline">
              Lane :&nbsp;&nbsp;{capitalizeFirstLetter(data.lane_name)}
            </p>
            <span className="font-bold text-gray-400 text-xs justify-between lane-1">
              Lane In
            </span>
          </div>

          <p className="font-bold text-primary2 flex justify-content">
            Real Time View
            <span className="ml-2 rounded-full border border-indigo-900 bg-indigo-900 w-6 h-6 flex items-center justify-center text-white font-bold">
              {data?.real_time_positions?.total_monotainers}
            </span>
          </p>
          <div  style={{ lineHeight: 1,fontSize: '12px' }}>
            <p className="text-indigo-800 font-bold underline">
              Camera ID:&nbsp;&nbsp;{data.camera_id}
            </p>
          </div>
        </div>
        <div className="flex gap-3 flex-col mt-7rem">
          <div className="grid grid-cols-8 gap-2">
            {data?.real_time_positions?.monotainers
            ?.slice((page - 1) * dataPerPage, page * dataPerPage)
            .sort((a, b) => a.index - b.index)
            ?.map((data1, index) => (
              <button
              className={`${
                data1.ifmisplaced
               ? "text-red-800 border-red-800" 
               : data1.ifuntagged ? "text-yellow-500 border-yellow-500" 
               : " text-green-700 border-green-700"
           } border px-2 py-2 rounded-lg h-10 `}
             key={data1.index}
                onClick={() => {
                  setDataModalOpen(true);
                  setTempName(data1.monotainer_id);
                  historyHandler(data1);

                }}
              >
                {data1.monotainer_id}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center gap-3">
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
          tableData={history}
          tempName={tempName}
          modalState={dataModalOpen}
          closeModalPopUp={closeModalPopUp}
        ></ModalPopUp>
      )}
    </>
  );
}
