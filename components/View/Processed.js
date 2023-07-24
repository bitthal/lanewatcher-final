import React, { useState } from "react";
import ModalPopUp from "./Modal";

export default function Processed({ show, data,showDashboardView }) {
  
  const dataPerPage = 6;
  const totalData = data?.processed?.monotainers?.length;
  const totalPages = Math.ceil(totalData / dataPerPage);
  const [page, setPage] = useState(1);
  const [tempName, setTempName] = useState("");
  const [dataModalOpen, setDataModalOpen] = useState(false);
  const [listModalOpen, setListModalOpen] = useState(false);
  const openTableModalBox = (params) => {
    setListModalOpen(false);
    setTempName(params);
    setDataModalOpen(true);
  }
  const closeModalPopUp = () => {
    setDataModalOpen(false);
    setListModalOpen(false);
  };

  return (
    <>
      <div className={`${show ? "h-96" : "h-96"} bg-white rounded-xl p-5`}>
        {!show && !showDashboardView ? (
          <div className="flex flex-col items-center text-center gap-5 mt-55">
            <p className="font-bold text-primary2">Processed</p>

            <i className="fa-solid fa-cart-shopping text-primary2" />
            <p className="font-bold text-green-700">
              {data?.processed?.total_monotainers}
            </p>
          </div>
        ) : (
          <div className="flex flex-col  items-center text-center  gap-5">
            <div className="flex  items-center text-center justify-between gap-4">
              <i className="fa-solid fa-cart-shopping text-indigo-800" />
              <p className="font-bold text-primary2">Processed</p>

              <p className="font-bold text-green-700">
                {data?.processed?.total_monotainers}
              </p>
            </div>

            <div className="flex gap-3 flex-col mt-6rem">
              <div className="grid grid-cols-2 gap-3">
                {data?.processed?.monotainers
                  ?.slice((page - 1) * dataPerPage, page * dataPerPage)
                  .map((data1, index) => (
                    <button
                      className="text-green-700 border w-[90px] py-2 break-all border-green-700 rounded-lg"
                      key={index}
                      onClick={() => {
                        setDataModalOpen(true);
                        setTempName(data1);
                      }}
                    >
                      {data1}
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
                className="bg-[#434190] rounded-md px-2 py-1 text-white text-xs font-bold "
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
                    tableData={true}
                    tempName={tempName}
                    modalState={dataModalOpen}
                    closeModalPopUp={closeModalPopUp}>
        </ModalPopUp>}
    </>
  );
}
