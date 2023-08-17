import React, { useState } from "react";
import ModalPopUp from "./Modal";
import Skeleton from "../Skeleton";
import axios from "axios";
import { FaEdit, FaEye } from "react-icons/fa";

export default function Finalized({
  show,
  data,
  resetLoader,
}) {
  const dataPerPage = 6;
  const totalData = data?.finalized?.monotainers?.length;
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
    <>
      {resetLoader ? (
        <Skeleton finalizedData={true} resetLoader={resetLoader}></Skeleton>
      ) : (
        <div className={`${show ? "h-96" : "h-96"} bg-white rounded-xl p-5`}>
          {
            <div className="flex flex-col items-center text-center gap-5">
              <div className="flex items-center text-center justify-between gap-4">
                <i className="fa-solid fa-cart-shopping text-indigo-800" />
                <p className="  text-primary2 text-lg">Finalized</p>

                <p className="rounded-full border border-indigo-900 bg-indigo-900 w-8 h-8 flex items-center justify-center text-white text-xl   shadow-blue">
                  {data?.finalized?.monotainers.length}
                </p>
              </div>

              <div className="flex gap-3 flex-col mt-6rem">
          <div className="grid grid-cols-2 gap-3">
            {data?.finalized?.monotainers
              ?.slice((page - 1) * dataPerPage, page * dataPerPage)
              .map((data1, index) => (
                <div
                  className="relative button-hover"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(false)}
                  key={data1.index}
                >
                  <button
                    className={`text-indigo-700 blue-button border px-2 py-2 rounded-lg h-10 `}
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
                                      data1.iffinalized ||
                                      dropdownStates[data1.monotainer_id]
                                        ?.iffinalized
                                        ? true
                                        : false
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
                                    Finalized :
                                    {data1.iffinalized || dropdownStates[data1.monotainer_id]?.iffinalized ? (
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
                                      data1.ifmisplaced ||
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
                                    Misplaced :
                                    {data1.ifmisplaced || dropdownStates[data1.monotainer_id]?.ifmisplaced ? (
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
                                      data1.ifprocessed ||
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
                                    Processed :
                                    {data1.ifprocessed ||
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
                                      data1.ifstaged ||
                                      dropdownStates[data1.monotainer_id]
                                        ?.ifstaged
                                        ? true
                                        : false
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
                                    Staged :
                                    {data1.ifstaged ||
                                    dropdownStates[data1.monotainer_id]
                                      ?.ifstaged ? (
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
                                            ...prevState[data1.monotainer_id],
                                            delete:
                                              !prevState[data1.monotainer_id]
                                                ?.delete,
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
                                          ].ifmisplaced = false;
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
                                    isDropdownValueShow ? "exclude-blur" : ""
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
                                    isDropdownValueShow ? "exclude-blur" : ""
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
              data.finalized.total_monotainers === 0 ? "disabled cursor-not-allowed" : ""
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
          }
        </div>
      )}
      {listModalOpen && (
        <ModalPopUp
          listData={data.finalized.monotainers}
          finalizedData={true}
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
