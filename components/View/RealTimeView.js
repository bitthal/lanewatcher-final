import React from "react";
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
      <div className="h-96 p-5 bg-white rounded-xl flex flex-col justify-between">
        <h1 className="text-center font-bold text-lg text-primary2">
          Real Time View
        </h1>

        <div className="flex gap-3">
          {data?.real_time_positions?.map((data, index) => {
            return (
              <button
                className="text-primary2 font-bold border  p-2 border-primary rounded-lg text-xs w-[90px] break-all "
                key={index}
              >
                Position&nbsp;{data?.position}
              </button>
            );
          })}
        </div>

        <div className="flex justify-between gap-3 font-bold text-gray-400 text-xs">
          <span>Lane In</span>

          <span>Lane Out</span>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            {data?.real_time_positions?.map((data, index) => {
              return (
                <button
                  onClick={() => {
                    data?.upper?.monotainer_id !== "NA" && setIsOpen2(true);
                    setTempName(data?.upper?.monotainer_id);
                  }}
                  className={`${
                    data?.upper?.monotainer_id == "NA"
                      ? "text-gray-300 "
                      : "text-white bg-green-700"
                  } font-bold border  p-2 text-xs shadow-sm hover:shadow-lg rounded-lg w-[90px] break-all`}
                  key={index}
                >
                  {data?.upper?.monotainer_id}
                </button>
              );
            })}
          </div>

          <div className="flex gap-3">
            {data?.real_time_positions?.map((data, index) => {
              return (
                <button
                  onClick={() => {
                    data?.lower?.monotainer_id !== "NA" && setIsOpen2(true);
                    setTempName(data?.lower?.monotainer_id);
                  }}
                  className={`${
                    data?.lower?.monotainer_id == "NA"
                      ? "text-gray-300 "
                      : "text-white bg-green-700"
                  } font-bold border text-xs p-2  shadow-sm hover:shadow-lg rounded-lg w-[90px] break-all`}
                  key={index}
                >
                  {data?.lower?.monotainer_id}
                </button>
              );
            })}
          </div>
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
