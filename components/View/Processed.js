import React, { useState } from "react";
import ModalPopUp from "./Modal";
import axios from "axios";
import { FaEdit, FaEye } from "react-icons/fa";

export default function Processed({ show, data,showDashboardView }) {
  
  const dataPerPage = 6;
  const totalData = data?.processed?.monotainers?.length;
  const totalPages = Math.ceil(totalData / dataPerPage);
  const [page, setPage] = useState(1);
  const [tempName, setTempName] = useState("");
  const [dataModalOpen, setDataModalOpen] = useState(false);
  const [listModalOpen, setListModalOpen] = useState(false);
  const [history, showHistory] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const openTableModalBox = (params) => {
    setListModalOpen(false);
    setTempName(params.monotainer_id);
    setDataModalOpen(true);
  }
  const closeModalPopUp = () => {
    setDataModalOpen(false);
    setListModalOpen(false);
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
        setDataModalOpen(true);
        showHistory(response.data.result)        
      });
  }
  return (
    <>
      <div className={`${show ? "h-96" : "h-96"} bg-white rounded-xl p-5`}>
        {!show && !showDashboardView ? (
          <div className="flex flex-col items-center text-center gap-5 mt-55">
            <p className="  text-primary2">Processed</p>

            <i className="fa-solid fa-cart-shopping text-primary2" />
            <p className="  text-green-700">
              {data?.processed?.total_monotainers}
            </p>
          </div>
        ) : (
          <div className="flex flex-col  items-center text-center  gap-5">
            <div className="flex  items-center text-center justify-between gap-4">
              <i className="fa-solid fa-cart-shopping text-indigo-800" />
              <p className="  text-primary2 text-lg">Processed</p>

              <p className="rounded-full border border-indigo-900 bg-indigo-900 w-8 h-8 flex items-center justify-center text-white text-xl   shadow-blue">
                {data?.processed?.total_monotainers}
              </p>
            </div>

            <div className="flex gap-3 flex-col mt-6rem">
              <div className="grid grid-cols-2 gap-3">
                {data?.processed?.monotainers
                  ?.slice((page - 1) * dataPerPage, page * dataPerPage)
                  .sort((a, b) => a.index - b.index)
                  ?.map((data1, index) => (
                    <div
            className="relative button-hover"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            key={data1.monotainer_id}
          >
            <button
              
              className={`${
                data1.ifmisplaced
                  ? "text-red-800 border-red-800"
                  : data1.ifuntagged
                  ? "text-yellow-500 border-yellow-500"
                  : " text-green-700 border-green-700"
              } border px-2 py-2 rounded-lg h-10 `}
            >
              {data1.monotainer_id}
            </button>
            {hoveredIndex === index && (
              <div className="icons-container absolute top-0 right-0 ">
                <FaEdit
                  className="mr-2 cursor-pointer"
                  onClick={() => {
                    // Functionality for edit icon
                    console.log("Edit clicked for:", data1.monotainer_id);
                  }}
                />
                <FaEye
                  className="cursor-pointer"
                  onClick={() => {
                    // Functionality for view icon
                    setTempName(data1.monotainer_id)
                    historyHandler(data1);
                  }}
                />
              </div>
            )}
          </div>
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
                  <i className="text-sm fa-solid fa-chevron-left" />
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
                  <i className="text-sm fa-solid fa-chevron-right" />
                </div>
              </div>

              <button
                className={`${totalPages === 0 ? 'disabled cursor-not-allowed' : ''}
                bg-[#434190] rounded-md px-2 py-1 text-white text-sm   text-xs
                `}
                onClick={() => {
                  setListModalOpen(true);
                }}
              >
                See&nbsp;All
              </button>
            </div>
          </div>
        )}
      </div>
      {listModalOpen && <ModalPopUp
                    listData={data}
                    processedData={true}
                    openTableModalBox={openTableModalBox}
                    modalState={listModalOpen}
                    closeModalPopUp={closeModalPopUp}>
        </ModalPopUp>}
        {dataModalOpen && <ModalPopUp
                    tableData={history}
                    tempName={tempName}
                    modalState={dataModalOpen}
                    closeModalPopUp={closeModalPopUp}>
        </ModalPopUp>}
    </>
  );
}
