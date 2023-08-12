import React, { useState } from "react";
import ModalPopUp from "./Modal";
import axios from "axios";
import { FaEdit, FaEye } from "react-icons/fa";

export default function Pending({ show, data, showDashboardView }) {
  const dataPerPage = 6;
  const totalData = data?.pending?.monotainers?.length;
  const totalPages = Math.ceil(totalData / dataPerPage);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [page, setPage] = useState(1);
  const [tempName, setTempName] = useState("");
  const [dataModalOpen, setDataModalOpen] = useState(false);
  const [listModalOpen, setListModalOpen] = useState(false);
  const [history, showHistory] = useState([]);
  const [isDropdownValueShow, setIsDropdownOpen1] = useState(false);
  const [isDropdownValues, setIsDropdownValues] = useState([]);
  const [dropdownStates, setDropdownStates] = useState({});

  const openTableModalBox = (params) => {
    setListModalOpen(false);
    setTempName(params.monotainer_id);
    setDataModalOpen(true);
    historyHandler(params);
  };
  const closeModalPopUp = () => {
    setDataModalOpen(false);
    setListModalOpen(false);
  };
  const toggleDropdown1 = (data) => {
    console.log(data, "data");
    setIsDropdownOpen1((prevOpen) => !prevOpen);
    setIsDropdownValues(data);
    // if (!isDropdownOpen) {
    //   setTempSelectedOptions1(selectedOptions1);
    // }
  };

  const handleDropdownEditSubmit = (updatedData,data1) => {
    console.log(updatedData, "up",data1);
    // Prepare the payload to send to the API with the updated data
    const camera_id = "C001";
    const iffinalized = updatedData.iffinalized ? updatedData.iffinalized : false;
    const ifmisplaced = updatedData.ifmisplaced ? updatedData.ifmisplaced : false;
    const ifprocessed = updatedData.ifprocessed ? updatedData.ifprocessed : false;
    const ifstaged = updatedData.ifstaged ? updatedData.ifstaged : false;
    const lane_name = data1.lane_name;
    const monoid = data1.monotainer_id;
    // Call the API with the payload
    axios
    .post(`${process.env.NEXT_PUBLIC_EDITTAG_API_URL}`, null, {
      params: {
        camera_id,
        iffinalized,
        ifmisplaced,
        ifprocessed,
        ifstaged,
        lane_name,
        monoid,
      },
    })
    .then((response) => {
      console.log("API response:", response.data);
      setIsDropdownOpen1(false); // Close the dropdown after submission
      setDropdownStates({});
    })
    .catch((error) => {
      console.error("API error:", error);
    });
    // ... other properties ...
  };

  const handleDropdownEditCancel = () => {
    setIsDropdownOpen1(false); // Close the dropdown after submission
  };

  const historyHandler = (data) => {
    const monoid = data?.monotainer_id ? data?.monotainer_id : data;
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL_HISTORY}`, {
        params: {
          monoid,
        },
      })
      .then((response) => {
        setDataModalOpen(true);
        showHistory(response?.data?.result);
      });
  };
  return (
    <>
      <div className={`${show ? "h-96" : "h-96"} bg-white rounded-xl p-5`}>
      <div className="flex flex-col items-center text-center  gap-5">
            <div className="flex items-center text-center justify-between gap-4">
              <svg
                width="16"
                height="19"
                viewBox="0 0 16 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.1668 10C8.86683 10 7.00016 11.8667 7.00016 14.1667C7.00016 16.4667 8.86683 18.3334 11.1668 18.3334C13.4668 18.3334 15.3335 16.4667 15.3335 14.1667C15.3335 11.8667 13.4668 10 11.1668 10ZM12.5418 16.125L10.7502 14.3334V11.6667H11.5835V13.9917L13.1252 15.5334L12.5418 16.125ZM12.0002 2.50004H9.35016C9.00016 1.53337 8.0835 0.833374 7.00016 0.833374C5.91683 0.833374 5.00016 1.53337 4.65016 2.50004H2.00016C1.0835 2.50004 0.333496 3.25004 0.333496 4.16671V16.6667C0.333496 17.5834 1.0835 18.3334 2.00016 18.3334H7.09183C6.59881 17.8548 6.19773 17.2899 5.9085 16.6667H2.00016V4.16671H3.66683V6.66671H10.3335V4.16671H12.0002V8.40004C12.5918 8.48337 13.1502 8.65837 13.6668 8.90004V4.16671C13.6668 3.25004 12.9168 2.50004 12.0002 2.50004ZM7.00016 4.16671C6.54183 4.16671 6.16683 3.79171 6.16683 3.33337C6.16683 2.87504 6.54183 2.50004 7.00016 2.50004C7.4585 2.50004 7.8335 2.87504 7.8335 3.33337C7.8335 3.79171 7.4585 4.16671 7.00016 4.16671Z"
                  fill="#434190"
                />
              </svg>
              <p className="  text-primary2 text-lg">Pending</p>

              <p className="rounded-full border border-indigo-900 bg-indigo-900 w-8 h-8 flex items-center justify-center text-white text-xl   shadow-blue">
                {data?.pending?.total_monotainers}
              </p>
            </div>
            <div className="flex gap-3 flex-col mt-6rem">
              <div className="grid grid-cols-2 gap-3">
                {data?.pending?.monotainers
                  ?.slice((page - 1) * dataPerPage, page * dataPerPage)
                  .map((data1, index) => (
                    <div
                      className="relative button-hover"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => {
                        setHoveredIndex(null);
                        setIsDropdownOpen1(false);
                      }}
                      key={data1.monotainer_id}
                    >
                      <button
                        className={`${
                          data1.ifmisplaced
                            ? "text-red-800 border-red-800"
                            : data1.ifuntagged
                            ? "text-yellow-500 border-yellow-500"
                            : " text-green-700 border-green-700"
                        } border px-2 py-2 rounded-lg h-10 relative`}
                      >
                        {data1.monotainer_id}
                      </button>
                      {hoveredIndex === index && (
                        <div className="icons-container absolute top-0 right-0 ">
                          <FaEdit
                            className="mr-2 cursor-pointer"
                            onClick={() => {
                              toggleDropdown1(data1);
                            }}
                          />
                          {isDropdownValueShow && (
                            <div className="absolute bg-white shadow-md z-10 w-64 text-sm p-4">
                              <div
                                key={data1.index}
                                className={`flex flex-col cursor-pointer`}
                              >
                                <div className="flex items-center mb-2">
                                  <input
                                    type="checkbox"
                                    checked={
                                      dropdownStates[data1.monotainer_id]
                                        ?.iffinalized || false
                                    }
                                    onChange={() => {
                                      setDropdownStates((prevState) => ({
                                        ...prevState,
                                        [data1.monotainer_id]: {
                                          ...prevState[data1.monotainer_id],
                                          iffinalized:
                                            !prevState[data1.monotainer_id]
                                              ?.iffinalized,
                                        },
                                      }));
                                    }}
                                    className="mr-2"
                                  />
                                  <div>
                                    Finalized :{" "}
                                    {dropdownStates[data1.monotainer_id]
                                      ?.iffinalized
                                      ? "True"
                                      : "False"}
                                  </div>
                                </div>
                                <div className="flex items-center mb-2">
                                  <input
                                    type="checkbox"
                                    checked={
                                      dropdownStates[data1.monotainer_id]
                                        ?.misplaced || false
                                    }
                                    onChange={() => {
                                      setDropdownStates((prevState) => ({
                                        ...prevState,
                                        [data1.monotainer_id]: {
                                          ...prevState[data1.monotainer_id],
                                          misplaced:
                                            !prevState[data1.monotainer_id]
                                              ?.misplaced,
                                        },
                                      }));
                                    }}
                                    className="mr-2"
                                  />
                                  <div>
                                    Misplaced :{" "}
                                    {dropdownStates[data1.monotainer_id]
                                      ?.misplaced
                                      ? "True"
                                      : "False"}
                                  </div>
                                </div>
                                <div className="flex items-center mb-2">
                                  <input
                                    type="checkbox"
                                    checked={
                                      dropdownStates[data1.monotainer_id]
                                        ?.ifprocessed || false
                                    }
                                    onChange={() => {
                                      setDropdownStates((prevState) => ({
                                        ...prevState,
                                        [data1.monotainer_id]: {
                                          ...prevState[data1.monotainer_id],
                                          ifprocessed:
                                            !prevState[data1.monotainer_id]
                                              ?.ifprocessed,
                                        },
                                      }));
                                    }}
                                    className="mr-2"
                                  />
                                  <div>
                                    Processed :{" "}
                                    {dropdownStates[data1.monotainer_id]
                                      ?.ifprocessed
                                      ? "True"
                                      : "False"}
                                  </div>
                                </div>
                                <div className="flex items-center mb-2">
                                  <input
                                    type="checkbox"
                                    checked={
                                      dropdownStates[data1.monotainer_id]
                                        ?.ifstaged || false
                                    }
                                    onChange={() => {
                                      setDropdownStates((prevState) => ({
                                        ...prevState,
                                        [data1.monotainer_id]: {
                                          ...prevState[data1.monotainer_id],
                                          ifstaged:
                                            !prevState[data1.monotainer_id]
                                              ?.ifstaged,
                                        },
                                      }));
                                    }}
                                    className="mr-2"
                                  />
                                  <div>
                                    Untagged :{" "}
                                    {dropdownStates[data1.monotainer_id]
                                      ?.ifstaged
                                      ? "True"
                                      : "False"}
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-end mt-4">
                                <button
                                  className={`mr-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 ${
                                    isDropdownValueShow ? "exclude-blur" : ""
                                  }`}
                                  onClick={() =>
                                    handleDropdownEditSubmit(
                                      dropdownStates[data1.monotainer_id],data1
                                    )
                                  }
                                >
                                  Submit
                                </button>
                                <button
                                  className={`bg-gray-300 px-2 py-1 rounded hover:bg-gray-400 ${
                                    isDropdownValueShow ? "exclude-blur" : ""
                                  }`}
                                  onClick={handleDropdownEditCancel}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}
                          <FaEye
                            className="cursor-pointer"
                            onClick={() => {
                              // Functionality for view icon
                              setTempName(data1.monotainer_id);
                              historyHandler(data1.monotainer_id);
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
                className={`${
                  totalPages === 0 ? "disabled cursor-not-allowed" : ""
                }
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
      </div>
      {listModalOpen && (
        <ModalPopUp
          listData={data}
          pendingData={true}
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
