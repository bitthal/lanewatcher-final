/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/jsx-key */
import React, { Fragment,useState } from "react";
import Modal from "react-modal";


export default function ModalPopUp({alertList,modalState,closeModalPopUp}) {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      overflow: 'scroll',
      WebkitOverflowScrolling: 'touch',
    },
  };

  const [modalIsOpen2, setIsOpen2] = React.useState(false);


  function closeModal2() {
    setIsOpen2(false);
    closeModalPopUp(false)
  }
  return (
    <Fragment>

      <Modal
        isOpen={modalState}
        onRequestClose={closeModal2}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
        shouldCloseOnOverlayClick={false}
      >
        <button
          className="text-red-700 font-bold absolute top-0 right-0 p-2 "
          onClick={closeModal2}
        >
          <i class="fa fa-window-close" aria-hidden="true"></i>
        </button>
        <div className="max-w-[700px] max-h-[500px] overflow-y-auto m-10">
          <h5 className="text-center font-bold text-xl mb-2">Active Alerts</h5>
          <div className="overflow-hidden border rounded-lg">
            {alertList.length > 0 && (
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-center text-gray-800 uppercase "
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-center text-gray-800 uppercase "
                    >
                      Monotaine ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-center text-gray-800 uppercase "
                    >
                      Timestamp
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-center text-gray-800 uppercase "
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-center text-gray-800 uppercase "
                    >
                      Claimed status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {alertList &&
                    alertList?.map((data, index) => {
                      return (
                        <tr>
                          <td className="px-6 py-4 text-sm font-medium text-center text-gray-800 whitespace-nowrap">
                            {index}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-center text-gray-800 whitespace-nowrap">
                            {data.key_str.slice(0, data.key_str.indexOf("#"))}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-center text-gray-800 whitespace-nowrap">
                            {data.sorting_timestamp}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-center text-gray-800 whitespace-nowrap">
                            {data?.alerts?.type}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-center text-gray-800 whitespace-nowrap">
                            {data?.alerts?.claimed_status === true
                              ? "True"
                              : "False"}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </Modal>
    </Fragment>
  );
}
