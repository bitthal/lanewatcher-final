import React, { useState } from "react";
import Modal from "react-modal";

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

export default function Pending({ show, data }) {
  const dataPerPage = 6;
  const totalData = data?.processed?.monotainers?.length;
  const totalPages = Math.ceil(totalData / dataPerPage);
  console.log(totalPages);

  const [page, setPage] = useState(1);

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div className={`${show ? "h-96" : "h-auto"}  bg-white rounded-xl p-5`}>
        {!show ? (
          <div className="flex flex-col items-center text-center gap-5">
            <p className="font-bold text-[#001CFF]">Processed</p>

            <i className="fa-solid fa-cart-shopping text-primary" />
            <p className="font-bold text-green-700">
              {" "}
              {data?.processed?.total_monotainers}
            </p>
          </div>
        ) : (
          <div className="flex flex-col  items-center text-center h-full justify-between gap-5">
            <div className="flex  items-center text-center justify-between gap-4">
              <i className="fa-solid fa-cart-shopping text-primary" />
              <p className="font-bold text-[#001CFF]">Processed</p>

              <p className="font-bold text-green-700">
                {" "}
                {data?.processed?.total_monotainers}
              </p>
            </div>

            <div className="flex gap-3 flex-col">
              {" "}
              <div className="grid grid-cols-2 gap-3">
                {data?.processed?.monotainers
                  ?.slice((page - 1) * dataPerPage, page * dataPerPage)
                  .map((data1, index) => (
                    <button
                      className="text-green-700 border w-[90px] py-2 break-all text-xs border-green-700 rounded-lg"
                      key={index}
                    >
                      {data1?.monotainer_id}
                    </button>
                  ))}
              </div>
            </div>

            <div className="flex justify-between items-center gap-3">
              <div className="flex gap-1 items-center">
                <div
                  className="w-6 h-6 rounded-full border bg-gray-200 cursor-pointer"
                  onClick={() => {
                    if (page > 2) {
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
                className="bg-[#001CFF] rounded-md px-2 py-1 text-white text-xs font-bold "
                onClick={openModal}
              >
                See&nbsp;All
              </button>
            </div>
          </div>
        )}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button
          className="text-red-700 font-bold absolute top-0 right-0 p-2 "
          onClick={closeModal}
        >
          Close
        </button>
        <div className="max-w-[700px] h-auto p-10">
          <h5 className="text-center font-bold text-xl">Processed</h5>

          <div className="grid grid-cols-5 gap-3 mt-5 max-h-80 overflow-auto p-5">
            {data?.processed?.monotainers?.map((data1, index) => {
              return (
                <button
                  className="text-green-700 border px-3 py-2 border-green-700 rounded-lg"
                  key={index}
                >
                  {data1?.monotainer_id}
                </button>
              );
            })}
          </div>
        </div>
      </Modal>
    </>
  );
}
