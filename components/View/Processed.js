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

export default function Processed({ show, data,showDashboardView }) {
  const dataPerPage = 6;
  const totalData = data?.processed?.monotainers?.length;
  const totalPages = Math.ceil(totalData / dataPerPage);

  const [page, setPage] = useState(1);

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [tempName, setTempName] = React.useState("");

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

  return (
    <>
      <div className={`${show ? "h-96" : "h-96"} bg-white rounded-xl p-5`}>
        {!show && !showDashboardView ? (
          <div className="flex flex-col items-center justify-center h-full text-center gap-5">
            <p className="font-bold text-primary2">Processed</p>

            <i className="fa-solid fa-cart-shopping text-primary2" />
            <p className="font-bold text-green-700">
              {" "}
              {data?.processed?.total_monotainers}
            </p>
          </div>
        ) : (
          <div className="flex flex-col  items-center text-center h-full justify-between gap-5">
            <div className="flex  items-center text-center justify-between gap-4">
              <i className="fa-solid fa-cart-shopping text-primary2" />
              <p className="font-bold text-primary2">Processed</p>

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
                      onClick={() => {
                        setIsOpen2(true);
                        setTempName(data1?.monotainer_id);
                      }}
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
                className="bg-[#434190] rounded-md px-2 py-1 text-white text-xs font-bold "
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
          <h5 className="text-center font-bold text-xl mb-1">History</h5>
          <h6 className="text-center underline mb-5 underline-offset-4 text-2xl text-primary2 font-bold">
            {tempName}
          </h6>
          <p>
            1. Timestamp: 2023-05-10 08:00:00, Location: Vancouver, BC, Event:
            Parcel received at origin facility.
          </p>
          <p>
            2. Timestamp: 2023-05-10 10:30:00, Location: Vancouver, BC, Event:
            Parcel scanned and loaded for transit.
          </p>
          <p>
            3. Timestamp: 2023-05-10 19:00:00, Location: Kamloops, BC, Event:
            Parcel arrived at sorting facility.
          </p>
          <p>
            4. Timestamp: 2023-05-11 09:00:00, Location: Kamloops, BC, Event:
            Parcel scanned and loaded for transit.
          </p>
          <p>
            5. Timestamp: 2023-05-11 20:00:00, Location: Calgary, AB, Event:
            Parcel arrived at sorting facility.
          </p>
          <p>
            6. Timestamp: 2023-05-12 08:00:00, Location: Calgary, AB, Event:
            Parcel scanned and loaded for transit.
          </p>
          <p>
            7. Timestamp: 2023-05-12 18:30:00, Location: Regina, SK, Event:
            Parcel arrived at sorting facility.
          </p>
          <p>
            8. Timestamp: 2023-05-13 07:00:00, Location: Regina, SK, Event:
            Parcel scanned and loaded for transit.
          </p>
          <p>
            9. Timestamp: 2023-05-13 20:00:00, Location: Winnipeg, MB, Event:
            Parcel arrived at sorting facility.
          </p>
          <p>
            10. Timestamp: 2023-05-14 08:00:00, Location: Winnipeg, MB, Event:
            Parcel scanned and loaded for transit.
          </p>
          <p>
            11. Timestamp: 2023-05-14 22:00:00, Location: Thunder Bay, ON,
            Event: Parcel arrived at sorting facility.
          </p>
          <p>
            12. Timestamp: 2023-05-15 08:00:00, Location: Thunder Bay, ON,
            Event: Parcel scanned and loaded for transit.
          </p>
          <p>
            13. Timestamp: 2023-05-15 21:30:00, Location: Toronto, ON, Event:
            Parcel arrived at sorting facility.
          </p>
          <p>
            14. Timestamp: 2023-05-16 07:00:00, Location: Toronto, ON, Event:
            Parcel scanned and loaded for delivery.
          </p>
          <p>
            15. Timestamp: 2023-05-16 14:30:00, Location: Toronto, ON, Event:
            Parcel out for delivery.
          </p>
          <p>
            16. Timestamp: 2023-05-16 16:00:00, Location: Toronto, ON, Event:
            Parcel delivered to recipient.
          </p>
        </div>
      </Modal>
    </>
  );
}
