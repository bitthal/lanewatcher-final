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
  const totalData = data?.pending?.monotainers?.length;
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


  const [modalIsOpen2, setIsOpen2] = React.useState(false);

  function openModal2() {
    setIsOpen2(true);
  }

  function closeModal2() {
    setIsOpen2(false);
  }
  const [tempName, setTempName] = React.useState("");

  return (
    <>
      <div className={`${show ? "h-96" : "h-96"}  bg-white rounded-xl p-5`}>
        {!show ? (
          <div className="flex flex-col items-center justify-center  h-full text-center gap-5">
            <p className="font-bold text-primary">Pending</p>

            <svg
              width="16"
              height="19"
              viewBox="0 0 16 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.1668 10C8.86683 10 7.00016 11.8667 7.00016 14.1667C7.00016 16.4667 8.86683 18.3334 11.1668 18.3334C13.4668 18.3334 15.3335 16.4667 15.3335 14.1667C15.3335 11.8667 13.4668 10 11.1668 10ZM12.5418 16.125L10.7502 14.3334V11.6667H11.5835V13.9917L13.1252 15.5334L12.5418 16.125ZM12.0002 2.50004H9.35016C9.00016 1.53337 8.0835 0.833374 7.00016 0.833374C5.91683 0.833374 5.00016 1.53337 4.65016 2.50004H2.00016C1.0835 2.50004 0.333496 3.25004 0.333496 4.16671V16.6667C0.333496 17.5834 1.0835 18.3334 2.00016 18.3334H7.09183C6.59881 17.8548 6.19773 17.2899 5.9085 16.6667H2.00016V4.16671H3.66683V6.66671H10.3335V4.16671H12.0002V8.40004C12.5918 8.48337 13.1502 8.65837 13.6668 8.90004V4.16671C13.6668 3.25004 12.9168 2.50004 12.0002 2.50004ZM7.00016 4.16671C6.54183 4.16671 6.16683 3.79171 6.16683 3.33337C6.16683 2.87504 6.54183 2.50004 7.00016 2.50004C7.4585 2.50004 7.8335 2.87504 7.8335 3.33337C7.8335 3.79171 7.4585 4.16671 7.00016 4.16671Z"
                fill="#FF0000"
              />
            </svg>
            <p className="font-bold text-red-700">
              {data?.pending?.total_monotainers}
            </p>
          </div>
        ) : (
          <div className="flex flex-col  items-center text-center h-full justify-between gap-5">
            <div className="flex  items-center text-center justify-between gap-4">
              <svg
                width="16"
                height="19"
                viewBox="0 0 16 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.1668 10C8.86683 10 7.00016 11.8667 7.00016 14.1667C7.00016 16.4667 8.86683 18.3334 11.1668 18.3334C13.4668 18.3334 15.3335 16.4667 15.3335 14.1667C15.3335 11.8667 13.4668 10 11.1668 10ZM12.5418 16.125L10.7502 14.3334V11.6667H11.5835V13.9917L13.1252 15.5334L12.5418 16.125ZM12.0002 2.50004H9.35016C9.00016 1.53337 8.0835 0.833374 7.00016 0.833374C5.91683 0.833374 5.00016 1.53337 4.65016 2.50004H2.00016C1.0835 2.50004 0.333496 3.25004 0.333496 4.16671V16.6667C0.333496 17.5834 1.0835 18.3334 2.00016 18.3334H7.09183C6.59881 17.8548 6.19773 17.2899 5.9085 16.6667H2.00016V4.16671H3.66683V6.66671H10.3335V4.16671H12.0002V8.40004C12.5918 8.48337 13.1502 8.65837 13.6668 8.90004V4.16671C13.6668 3.25004 12.9168 2.50004 12.0002 2.50004ZM7.00016 4.16671C6.54183 4.16671 6.16683 3.79171 6.16683 3.33337C6.16683 2.87504 6.54183 2.50004 7.00016 2.50004C7.4585 2.50004 7.8335 2.87504 7.8335 3.33337C7.8335 3.79171 7.4585 4.16671 7.00016 4.16671Z"
                  fill="#FF0000"
                />
              </svg>
              <p className="font-bold text-primary">Pending</p>

              <p className="font-bold text-red-700">
                {data?.pending?.total_monotainers}
              </p>
            </div>

            <div className="flex gap-3 flex-col">
              {data?.pending?.monotainers}
              <div className="grid grid-cols-2 gap-3">
                {data?.pending?.monotainers
                  ?.slice((page - 1) * dataPerPage, page * dataPerPage)
                  .map((data1, index) => (
                    <button
                    onClick={()=>{setIsOpen2(true); setTempName(data1?.monotainer_id)}}
                      className="text-red-700 border w-[90px] py-2 break-all text-xs border-red-700 rounded-lg"
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
                className="bg-[#001CFF] rounded-md px-2 py-1 text-white text-sm font-bold text-xs"
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
          <h5 className="text-center font-bold text-xl">Pending</h5>

          <div className="grid grid-cols-5 gap-3 mt-5 max-h-80 overflow-auto p-5">
            {data?.pending?.monotainers?.map((data1, index) => {
              return (
                <button
                  className="text-red-700 border px-3 py-2 border-red-700 rounded-lg"
                  key={index}
                >
                  {data1?.monotainer_id}
                </button>
              );
            })}
          </div>
        </div>
      </Modal>



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
          <h5 className="text-center font-bold text-xl mb-2">History</h5>

          <h6 className="text-center underline mb-5 underline-offset-4 text-2xl text-primary font-bold">{tempName}</h6>


          <p>1. Timestamp: 2023-05-10 08:00:00, Location: Vancouver, BC, Event: Parcel received at origin facility.</p>
          <p>2. Timestamp: 2023-05-10 10:30:00, Location: Vancouver, BC, Event: Parcel scanned and loaded for transit.</p>
          <p>3. Timestamp: 2023-05-10 19:00:00, Location: Kamloops, BC, Event: Parcel arrived at sorting facility.</p>
<p>4. Timestamp: 2023-05-11 09:00:00, Location: Kamloops, BC, Event: Parcel scanned and loaded for transit.</p>
<p>5. Timestamp: 2023-05-11 20:00:00, Location: Calgary, AB, Event: Parcel arrived at sorting facility.</p>
<p>6. Timestamp: 2023-05-12 08:00:00, Location: Calgary, AB, Event: Parcel scanned and loaded for transit.</p>
<p>7. Timestamp: 2023-05-12 18:30:00, Location: Regina, SK, Event: Parcel arrived at sorting facility.</p>
<p>8. Timestamp: 2023-05-13 07:00:00, Location: Regina, SK, Event: Parcel scanned and loaded for transit.</p>
<p>9. Timestamp: 2023-05-13 20:00:00, Location: Winnipeg, MB, Event: Parcel arrived at sorting facility.</p>
<p>10. Timestamp: 2023-05-14 08:00:00, Location: Winnipeg, MB, Event: Parcel scanned and loaded for transit.</p>
<p>11. Timestamp: 2023-05-14 22:00:00, Location: Thunder Bay, ON, Event: Parcel arrived at sorting facility.</p>
<p>12. Timestamp: 2023-05-15 08:00:00, Location: Thunder Bay, ON, Event: Parcel scanned and loaded for transit.</p>
<p>13. Timestamp: 2023-05-15 21:30:00, Location: Toronto, ON, Event: Parcel arrived at sorting facility.</p>
<p>14. Timestamp: 2023-05-16 07:00:00, Location: Toronto, ON, Event: Parcel scanned and loaded for delivery.</p>
<p>15. Timestamp: 2023-05-16 14:30:00, Location: Toronto, ON, Event: Parcel out for delivery.</p>
<p>16. Timestamp: 2023-05-16 16:00:00, Location: Toronto, ON, Event: Parcel delivered to recipient.</p>









      
       
        </div>
      </Modal>
    </>
  );
}
