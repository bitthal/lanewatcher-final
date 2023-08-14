import React, { useState } from "react";
import ModalPopUp from "./Modal";
import axios from "axios";
import { FaEdit, FaEye } from "react-icons/fa";

export default function Processed({ show, data,showDashboardView }) {
  
  const dataPerPage = 6;
  const totalData = data?.processed?.monotainers?.length;
  const totalPages = Math.ceil(totalData / dataPerPage);
  const [page, setPage] = useState(1);
  const [tempName, setTempName] = useState("");
  const [dataModalOpen, setDataModalOpen] = useState(false);
  const [listModalOpen, setListModalOpen] = useState(false);
  const [history, showHistory] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isDropdownValueShow, setIsDropdownOpen1] = useState(false);
  const [isDropdownValues, setIsDropdownValues] = useState([]);
  const [dropdownStates, setDropdownStates] = useState({});

  const openTableModalBox = (params) => {
    setListModalOpen(false);
    setTempName(params.monotainer_id);
    setDataModalOpen(true);
  }
  const closeModalPopUp = () => {
    setDataModalOpen(false);
    setListModalOpen(false);
  };
  const toggleDropdown1 = (data) => {
    console.log(data, "data");
    historyHandler(data,true);
    // if (!isDropdownOpen) {
    //   setTempSelectedOptions1(selectedOptions1);
    // }
  };

  const historyHandler = (data,toggle) => {
    const monoid = data?.monotainer_id ? data?.monotainer_id : data;
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL_HISTORY}`, {
        params: {
          monoid,
        },
      })
      .then((response) => {
        if(toggle){
          setIsDropdownOpen1((prevOpen) => !prevOpen);
          setIsDropdownValues(response?.data?.result);
        }
        else{
          setDataModalOpen(true);
          showHistory(response?.data?.result);
        }
      });
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
  return (
    <>
      <div className={`${show ? "h-96" : "h-96"} bg-white rounded-xl p-5`}>
        {<div className="flex flex-col  items-center text-center  gap-5">
            <div className="flex  items-center text-center justify-between gap-4">
              <i className="fa-solid fa-cart-shopping text-indigo-800" />
              <p className="  text-primary2 text-lg">Processed</p>

              <p className="rounded-full border border-indigo-900 bg-indigo-900 w-8 h-8 flex items-center justify-center text-white text-xl   shadow-blue">
                {data?.processed?.total_monotainers}
              </p>
            </div>

            <div className="flex gap-3 flex-col mt-6rem">
              <div className="grid grid-cols-2 gap-3">
                {data?.processed?.monotainers
                  ?.slice((page - 1) * dataPerPage, page * dataPerPage)
                  .sort((a, b) => a.index - b.index)
                  ?.map((data1, index) => (
                    <div
            className="relative button-hover"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            key={data1.monotainer_id}
          >
            <button
                    className={`${
                      data1.ifmisplaced
                        ? "text-red-800 red-button"
                        : data1.ifuntagged
                        ? "text-yellow-500 yellow-button"
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
                              toggleDropdown1(data1);
                            }}
                          />
                          {isDropdownValueShow && 
                        (
                          <div>
                            {isDropdownValues.map((data1) => (
                            <div className="absolute bg-white shadow-md z-10 w-64 text-sm p-4">
                              <h1>ID : {data1.monotainer_id}</h1>
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
                                  {dropdownStates[data1.monotainer_id]?.ifstaged
                                    ? "True"
                                    : "False"}
                                </div>
                              </div>
                              <div className="flex items-center mb-2">
                                <input
                                  type="checkbox"
                                  checked={
                                    dropdownStates[data1.monotainer_id]
                                      ?.delete || false
                                  }
                                  onChange={() => {
                                    setDropdownStates((prevState) => ({
                                      ...prevState,
                                      [data1.monotainer_id]: {
                                        ...prevState[data1.monotainer_id],
                                        delete:
                                          !prevState[data1.monotainer_id]
                                            ?.delete,
                                      },
                                    }));
                                  }}
                                  className="mr-2"
                                />
                                <div>
                                  Delete 
                                 
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
                          ))}
                          </div>
                          
                        )
                        }
                <FaEye
                  className="cursor-pointer"
                  onClick={() => {
                    // Functionality for view icon
                    setTempName(data1.monotainer_id)
                    historyHandler(data1,false);
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
                className={`${totalPages === 0 ? 'disabled cursor-not-allowed' : ''}
                bg-[#434190] rounded-md px-2 py-1 text-white text-sm   text-xs
                `}
                onClick={() => {
                  setListModalOpen(true);
                }}
              >
                See&nbsp;All
              </button>
            </div>
          </div>}
      </div>
      {listModalOpen && <ModalPopUp
                    listData={data.processed.monotainers}
                    // processedData={true}
                    openTableModalBox={openTableModalBox}
                    modalState={listModalOpen}
                    closeModalPopUp={closeModalPopUp}>
        </ModalPopUp>}
        {dataModalOpen && <ModalPopUp
                    tableData={history}
                    tempName={tempName}
                    modalState={dataModalOpen}
                    closeModalPopUp={closeModalPopUp}>
        </ModalPopUp>}
    </>
  );
}
