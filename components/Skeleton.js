import React, { useState } from "react";
import Arrow from "./View/Arrow";
import axios from "axios";
const Skeleton = ({data}) => {
  console.log(data, "ske");
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
  const [selectedDropdownValue, setSelectedDropdownValue] = useState("");
  const openTableModalBox = (params) => {
    setListModalOpen(false);
    setTempName(params.monotainer_id);
    setDataModalOpen(true);
    historyHandler(params, false);
  };
  const closeModalPopUp = () => {
    setDataModalOpen(false);
    setListModalOpen(false);
  };
  const toggleDropdown1 = (data) => {
    historyHandler(data, true);
  };

  const handleDropdownEditSubmit = (updatedData, data1) => {
    // Extract the delete checkbox value
    const deleteValue = updatedData.delete ? updatedData.delete : false;
    // Prepare the payload to send to the API with the updated data
    const camera_id = "C001";
    const iffinalized = updatedData.iffinalized
      ? updatedData.iffinalized
      : false;
    const ifmisplaced = updatedData.ifmisplaced
      ? updatedData.ifmisplaced
      : false;
    const ifprocessed = updatedData.ifprocessed
      ? updatedData.ifprocessed
      : false;
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
          deleteTag: deleteValue, // Include delete checkbox value
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
  };

  const handleDropdownEditCancel = () => {
    setIsDropdownOpen1(false); // Close the dropdown after submission
  };

  const historyHandler = (data, toggle) => {
    const monoid = data?.monotainer_id ? data?.monotainer_id : data;
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL_HISTORY}`, {
        params: {
          monoid,
        },
      })
      .then((response) => {
        if (toggle) {
          setIsDropdownOpen1(true);
          setIsDropdownValues(response?.data?.result);
        } else {
          setDataModalOpen(true);
          showHistory(response?.data?.result);
        }
      });
  };
  return (
    <div className="flex overflow-ellipsis">
      <div className="bg-[#F4F3F8] flex items-center p-5 rounded-xl relative">
        <div className={`h-96 bg-white rounded-xl p-5`}>
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

              <p className="rounded-full border border-indigo-900 bg-[#2a2e67] w-8 h-8 flex items-center justify-center text-white text-xl   shadow-blue">
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
                      onMouseLeave={() => setHoveredIndex(false)}
                      key={data1.monotainer_id}
                    >
                      <button
                        className={`${
                          data1.ifmisplaced
                            ? "text-red-800 red-button"
                            : data1.ifuntagged
                            ? "text-yellow-500 yellow-button"
                            : data1.iffinalized
                            ? "text-indigo-700 blue-button"
                            : " text-green-700 green-button"
                        } border px-2 py-2 rounded-lg h-10 `}
                      >
                        {data1.monotainer_id}
                      </button>

                      {hoveredIndex === index && (
                        <div className="icons-container absolute top-0 right-0 ">
                          <FaEdit
                            className="mr-2 cursor-pointer"
                            onClick={() => {
                              setSelectedDropdownValue(data1.monotainer_id);
                              toggleDropdown1(data1);
                            }}
                          />

                          <FaEye
                            className="cursor-pointer"
                            onClick={() => {
                              // Functionality for view icon
                              setTempName(data1.monotainer_id);
                              historyHandler(data1.monotainer_id, false);
                            }}
                          />
                        </div>
                      )}
                      {isDropdownValueShow &&
                        selectedDropdownValue === data1.monotainer_id && (
                          <div>
                            {isDropdownValues.map((data1) => (
                              <div
                                className="absolute bg-white shadow-md z-10 w-64 text-sm p-4"
                                style={{ pointerEvents: "none" }}
                              >
                                <div style={{ pointerEvents: "auto" }}>
                                  <h1 className="text-center underline">
                                    ID : {data1.monotainer_id}
                                  </h1>
                                  <div
                                    key={data1.index}
                                    className={`flex flex-col cursor-pointer`}
                                  >
                                    <div className="flex items-center mb-2">
                                      <input
                                        type="checkbox"
                                        checked={
                                          dropdownStates[data1]?.iffinalized
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
                                        className={`mr-2 ${
                                          dropdownStates[data1.monotainer_id]
                                            ?.delete
                                            ? "disabled"
                                            : ""
                                        }`}
                                      />
                                      <div
                                        className={`mr-2 ${
                                          dropdownStates[data1.monotainer_id]
                                            ?.delete
                                            ? "disabled"
                                            : ""
                                        }`}
                                      >
                                        Finalized :{" "}
                                        {dropdownStates[data1]?.iffinalized ? (
                                          <i className="fas fa-toggle-on text-green-500" />
                                        ) : (
                                          <i className="fas fa-toggle-off text-red-500" />
                                        )}
                                      </div>
                                    </div>
                                    <div className="flex items-center mb-2">
                                      <input
                                        type="checkbox"
                                        checked={
                                          data1.ifmisplaced &&
                                          dropdownStates[data1.monotainer_id]
                                            ?.ifmisplaced
                                            ? true
                                            : false
                                        }
                                        onChange={() => {
                                          setDropdownStates((prevState) => ({
                                            ...prevState,
                                            [data1.monotainer_id]: {
                                              ...prevState[data1.monotainer_id],
                                              ifmisplaced:
                                                !prevState[data1.monotainer_id]
                                                  ?.ifmisplaced,
                                            },
                                          }));
                                        }}
                                        className={`mr-2 ${
                                          dropdownStates[data1.monotainer_id]
                                            ?.delete
                                            ? "disabled"
                                            : ""
                                        }`}
                                      />
                                      <div
                                        className={`mr-2 ${
                                          dropdownStates[data1.monotainer_id]
                                            ?.delete
                                            ? "disabled"
                                            : ""
                                        }`}
                                      >
                                        Misplaced :{dropdownStates[data1]}
                                        {dropdownStates[data1]?.ifmisplaced ? (
                                          <i className="fas fa-toggle-on text-green-500" />
                                        ) : (
                                          <i className="fas fa-toggle-off text-red-500" />
                                        )}
                                      </div>
                                    </div>
                                    <div className="flex items-center mb-2">
                                      <input
                                        type="checkbox"
                                        checked={
                                          data1.ifprocessed &&
                                          dropdownStates[data1.monotainer_id]
                                            ?.ifprocessed
                                            ? true
                                            : false
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
                                        className={`mr-2 ${
                                          dropdownStates[data1.monotainer_id]
                                            ?.delete
                                            ? "disabled"
                                            : ""
                                        }`}
                                      />
                                      <div
                                        className={`mr-2 ${
                                          dropdownStates[data1.monotainer_id]
                                            ?.delete
                                            ? "disabled"
                                            : ""
                                        }`}
                                      >
                                        Processed :{" "}
                                        {data1.ifprocessed &&
                                        dropdownStates[data1.monotainer_id]
                                          ?.ifprocessed ? (
                                          <i className="fas fa-toggle-on text-green-500" />
                                        ) : (
                                          <i className="fas fa-toggle-off text-red-500" />
                                        )}
                                      </div>
                                    </div>
                                    <div className="flex items-center mb-2">
                                      <input
                                        type="checkbox"
                                        checked={
                                          data1.ifuntagged &&
                                          dropdownStates[data1.monotainer_id]
                                            ?.ifuntagged
                                            ? true
                                            : false
                                        }
                                        onChange={() => {
                                          setDropdownStates((prevState) => ({
                                            ...prevState,
                                            [data1.monotainer_id]: {
                                              ...prevState[data1.monotainer_id],
                                              ifuntagged:
                                                !prevState[data1.monotainer_id]
                                                  ?.ifuntagged,
                                            },
                                          }));
                                        }}
                                        className={`mr-2 ${
                                          dropdownStates[data1.monotainer_id]
                                            ?.delete
                                            ? "disabled"
                                            : ""
                                        }`}
                                      />
                                      <div
                                        className={`mr-2 ${
                                          dropdownStates[data1.monotainer_id]
                                            ?.delete
                                            ? "disabled"
                                            : ""
                                        }`}
                                      >
                                        Untagged :{" "}
                                        {data1.ifuntagged &&
                                        dropdownStates[data1.monotainer_id]
                                          ?.ifuntagged ? (
                                          <i className="fas fa-toggle-on text-green-500" />
                                        ) : (
                                          <i className="fas fa-toggle-off text-red-500" />
                                        )}
                                      </div>
                                    </div>
                                    <div className="flex items-center mb-2">
                                      <input
                                        type="checkbox"
                                        className="mr-2"
                                        checked={
                                          dropdownStates[data1.monotainer_id]
                                            ?.delete || false
                                        }
                                        onChange={() => {
                                          setDropdownStates((prevState) => {
                                            const updatedStates = {
                                              ...prevState,
                                              [data1.monotainer_id]: {
                                                ...prevState[
                                                  data1.monotainer_id
                                                ],
                                                delete:
                                                  !prevState[
                                                    data1.monotainer_id
                                                  ]?.delete,
                                              },
                                            };

                                            if (
                                              updatedStates[data1.monotainer_id]
                                                ?.delete
                                            ) {
                                              updatedStates[
                                                data1.monotainer_id
                                              ].iffinalized = false;
                                              updatedStates[
                                                data1.monotainer_id
                                              ].misplaced = false;
                                              updatedStates[
                                                data1.monotainer_id
                                              ].ifprocessed = false;
                                              updatedStates[
                                                data1.monotainer_id
                                              ].ifstaged = false;
                                            }

                                            return updatedStates;
                                          });
                                        }}
                                      />
                                      <div>Delete</div>
                                    </div>
                                  </div>
                                  <div className="flex justify-end mt-4">
                                    <button
                                      className={`mr-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 ${
                                        isDropdownValueShow
                                          ? "exclude-blur"
                                          : ""
                                      }`}
                                      onClick={() =>
                                        handleDropdownEditSubmit(
                                          dropdownStates[data1.monotainer_id],
                                          data1
                                        )
                                      }
                                    >
                                      Submit
                                    </button>
                                    <button
                                      className={`bg-gray-300 px-2 py-1 rounded hover:bg-gray-400 ${
                                        isDropdownValueShow
                                          ? "exclude-blur"
                                          : ""
                                      }`}
                                      onClick={handleDropdownEditCancel}
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
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
                  data?.pending?.total_monotainers === 0
                    ? "disabled cursor-not-allowed"
                    : ""
                }
              bg-[#434190] rounded-md px-2 py-1 text-white text-sm   text-xs
              `}
                // onClick={() => {
                //   setListModalOpen(true);
                // }}
              >
                See&nbsp;All
              </button>
            </div>
          </div>
        </div>
        <Arrow />
        <div className={`p-5 bg-white rounded-xl h-96 realTimeView`}>
          <div className="flex items-center text-center justify-between">
            <div style={{ lineHeight: 1, fontSize: "12px" }}>
              <div className="h-4 w-24 bg-gray-300 mb-1 animate-pulse" />
              <span className="h-3 w-16 bg-gray-300 mb-2 animate-pulse" />
            </div>
            <p className="text-primary2 flex justify-content text-lg">
              Real Time View
              <span className="rounded-full border border-indigo-900 bg-[#2a2e67] w-8 h-8 flex items-center justify-center text-white text-lg   shadow-blue ml-4">
                0
              </span>
            </p>
            <button className="bg-[#434190] w-20 py-3 rounded-lg text-white text-xs mr-1 cursor-not-allowed animate-pulse">
              Reset
              <i className="fas fa-sync-alt text-white ml-2"></i>
            </button>
            <div style={{ lineHeight: 1, fontSize: "12px" }}>
              <p className="h-4 w-24 bg-gray-300 animate-pulse" />
            </div>
          </div>
          <div className="flex gap-3 flex-col mt-7rem">
            <div className="grid grid-cols-8 gap-2">
              {Array.from({ length: 8 }).map((_, index) => (
                <div className="relative button-hover" key={index}>
                  <button className="h-10 w-20 bg-gray-300 rounded-lg px-2 py-2 animate-pulse">
                    &nbsp;
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center gap-3">
            <div className="flex gap-1 items-center">
              <div className="w-6 h-6 rounded-full border bg-gray-200 cursor-not-allowed animate-pulse">
                <i className="text-sm fa-solid fa-chevron-left relative left-2" />
              </div>
              <span className="h-3 w-12 bg-gray-300 text-gray-500 animate-pulse" />
              <div className="w-6 h-6 rounded-full border bg-gray-200 cursor-not-allowed animate-pulse">
                <i className="text-sm fa-solid fa-chevron-right relative left-1" />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span className="h-3 w-16 bg-gray-300 mb-1 animate-pulse" />
              <button
                className="bg-[#434190] rounded-md px-2 py-1 text-white text-sm text-xs cursor-not-allowed animate-pulse"
                onClick={() => {}}
              >
                See&nbsp;All
              </button>
            </div>
          </div>
        </div>
        <Arrow />
        <div className={`h-96 bg-white rounded-xl p-5`}>
          <div className="flex flex-col items-center text-center gap-5">
            <div className="flex items-center text-center justify-between gap-4">
              <div className="w-16 h-19 bg-gray-300 animate-pulse"></div>
              <p className="text-primary2 text-lg">Processing</p>
              <p className="rounded-full border border-indigo-900 bg-[#2a2e67] w-8 h-8 flex items-center justify-center text-white text-xl shadow-blue animate-pulse">
                0
              </p>
            </div>
            <div className="flex gap-3 flex-col mt-6rem">
              <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div className="relative button-hover" key={index}>
                    <button
                      className={`bg-gray-300 h-10 w-20 px-2 py-2 rounded-lg animate-pulse`}
                    ></button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center gap-3">
              <div className="flex gap-1 items-center">
                <div className="w-6 h-6 rounded-full border bg-gray-200 cursor-not-allowed animate-pulse">
                  <i className="text-sm fa-solid fa-chevron-left relative left-2" />
                </div>
                <span className="h-3 w-12 bg-gray-300 text-gray-500 animate-pulse" />
                <div className="w-6 h-6 rounded-full border bg-gray-200 cursor-not-allowed animate-pulse">
                  <i className="text-sm fa-solid fa-chevron-right relative left-1" />
                </div>
              </div>
              <button
                className={`${
                  true
                    ? "bg-[#434190] rounded-md px-2 py-1 text-white text-sm text-xs cursor-not-allowed animate-pulse"
                    : ""
                }`}
                onClick={() => {}}
              >
                See&nbsp;All
              </button>
            </div>
          </div>
        </div>
        <Arrow />
        <div className={`h-96 bg-white rounded-xl p-5`}>
          <div className="flex flex-col items-center text-center gap-5">
            <div className="flex items-center text-center justify-between gap-4">
              <div className="w-16 h-19 bg-gray-300 animate-pulse"></div>
              <p className="text-primary2 text-lg">Finalized</p>
              <p className="rounded-full border border-indigo-900 bg-[#2a2e67] w-8 h-8 flex items-center justify-center text-white text-xl shadow-blue animate-pulse">
                0
              </p>
            </div>
            <div className="flex gap-3 flex-col mt-6rem">
              <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div className="relative button-hover" key={index}>
                    <button
                      className={`bg-gray-300 h-10 w-20 px-2 py-2 rounded-lg animate-pulse`}
                    ></button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center gap-3">
              <div className="flex gap-1 items-center">
                <div className="w-6 h-6 rounded-full border bg-gray-200 cursor-not-allowed animate-pulse">
                  <i className="text-sm fa-solid fa-chevron-left relative left-2" />
                </div>
                <span className="h-3 w-12 bg-gray-300 text-gray-500 animate-pulse" />
                <div className="w-6 h-6 rounded-full border bg-gray-200 cursor-not-allowed animate-pulse">
                  <i className="text-sm fa-solid fa-chevron-right relative left-1" />
                </div>
              </div>
              <button
                className={`${
                  true
                    ? "bg-[#434190] rounded-md px-2 py-1 text-white text-sm text-xs cursor-not-allowed animate-pulse"
                    : ""
                }`}
                onClick={() => {}}
              >
                See&nbsp;All
              </button>
            </div>
          </div>
        </div>
        <Arrow />
        <div className="bg-white rounded-xl p-5 flex flex-col gap-8 h-96">
          <div className="flex gap-4 justify-between items-center w-full">
            <div className="w-26 h-26 bg-gray-300 animate-pulse"></div>
            <span className="text-primary2 text-lg w-28 h-6 bg-gray-300 animate-pulse"></span>
            <span className="w-4 h-4 bg-gray-300 animate-pulse"></span>
          </div>

          <div className="flex justify-between gap-4 items-center w-full">
            <span className="text-black w-12 h-4 bg-gray-300 animate-pulse"></span>
            <span className="text-black w-32 h-4 bg-gray-300 animate-pulse"></span>
            <div className="relative">
              <button className="animate-pulse">
                <i className="fa-solid fa-bell text-2xl text-gray-300" />
                <span className="flex h-3 w-3 absolute top-0 translate-x-1/2 right-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-700"></span>
                </span>
              </button>
            </div>
          </div>

          <div className="flex gap-4 justify-between items-center w-full text-xs">
            <div className="p-2 border rounded-md border-[#434190] py-auto w-16 h-16 animate-pulse"></div>
            <div className="p-2 border rounded-md border-[#434190] py-auto w-16 h-16 animate-pulse"></div>
            <div className="p-2 border rounded-md border-[#434190] py-auto w-16 h-16 animate-pulse"></div>
          </div>

          <div>
            <p className="text-sm mb-5 text-gray-600 w-1/2 h-4 bg-gray-300 animate-pulse"></p>
            <p className="text-sm mb-5 text-gray-600 w-1/2 h-4 bg-gray-300 animate-pulse"></p>
            <div className="flex justify-center">
              <button className="bg-[#434190] w-1/2 py-3 rounded-lg text-white text-xs m-1 cursor-not-allowed animate-pulse">
                Total
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
