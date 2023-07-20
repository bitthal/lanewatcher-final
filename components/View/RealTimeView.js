import React,{useState} from "react";
import Modal from "react-modal";

export default function RealTimeView({ data }) {
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
  const dataPerPage = 8;
  const totalData = data?.real_time_positions?.length;
  const totalPages = Math.ceil(totalData / dataPerPage);

  const [page, setPage] = useState(1);
  const [modalIsOpen2, setIsOpen2] = React.useState(false);

  function openModal() {
    setIsOpen2(true);
  }

  function closeModal2() {
    setIsOpen2(false);
  }
  const [tempName, setTempName] = React.useState("");

  return (
    <>
      <div className="p-5 bg-white rounded-xl flex flex-col justify-between h-96 w-1000 realTimeView" >
        <h1 className="text-center font-bold text-lg text-primary2 justify-between">
          <span>Real Time View</span>
        </h1>
        <div className="flex font-bold text-gray-400 text-xs justify-between">
          <span>Lane In</span>
          <span>Lane Out</span>
        </div>
        <div className="flex flex-row">
              <div className="grid grid-cols-8 gap-4">
                {data?.real_time_positions
                  ?.slice((page - 1) * dataPerPage, page * dataPerPage)
                  .map((data1, index) => (
                    <button
                      onClick={() => {
                        setIsOpen2(true);
                        setTempName(data1.monotainer_id);
                      }}
                      className={`${
                        data1?.misplaced == "1"
                          ? "text-red-700 border-red-700"
                          : "text-green-700 border-green-700"
                      }  border-2 w-[90px] py-2 break-all text-xs rounded-lg`}
                      key={index}
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

              <button
                className="bg-[#434190] rounded-md px-2 py-1 text-white text-xs font-bold "
                onClick={openModal}
              >
                See&nbsp;All
              </button>
            </div>
      </div>

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
        <i class="fa fa-window-close" aria-hidden="true"></i>
        </button>
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
      </Modal>
    </>
  );
}
