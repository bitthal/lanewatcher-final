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
        <h1 className="text-center font-bold text-lg text-primary">
          Real Time View
        </h1>

        <div className="flex gap-3">
          {data?.real_time_positions?.map((data, index) => {
            return (
              <button
                className="text-primary font-bold border  p-2 border-primary rounded-lg text-xs w-[90px] break-all "
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
                onClick={()=>{ data?.upper?.monotainer_id !== "NA" && setIsOpen2(true);setTempName(data?.upper?.monotainer_id)} }
                  className={`${
                    data?.upper?.monotainer_id == "NA"
                      ? "text-gray-300 "
                      : "text-white bg-green-500"
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

                onClick={()=>{ data?.lower?.monotainer_id !== "NA" && setIsOpen2(true) ;setTempName(data?.lower?.monotainer_id)}}
                  className={`${
                    data?.lower?.monotainer_id == "NA"
                      ? "text-gray-300 "
                      : "text-white bg-green-500"
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
          Close
        </button>
        <div className="max-w-[700px] max-h-[500px] overflow-y-auto m-10">
          <h5 className="text-center font-bold text-xl mb-2">History</h5>
          <h6 className="text-center underline mb-5 underline-offset-4 text-2xl text-primary font-bold">{tempName}</h6>
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
