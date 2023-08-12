import React, { useState, useEffect, useContext } from "react";
import ModalPopUp from "./Modal";
import axios from "axios";
// import { value_data } from "@/context/context";
import Image from "next/image";
import tag from "/public/tag.svg";
import { FaEdit, FaEye } from "react-icons/fa";

const Skeleton = () => (
  <div className="animate-pulse bg-gray-200 h-92 rounded-md mt-4 p-5"></div>
);

export default function RealTimeView({ data, allData }) {

  const dataPerPage = 32;
  const totalData = data?.real_time_positions?.total_monotainers;
  const totalPages = Math.ceil(totalData / dataPerPage);
  // const { value, setValue } = useContext(value_data);
  // const { drpdwnVaue, setdrpdwnVaue } = useContext(value_data);
  const [page, setPage] = useState(1);
  const [tempName, setTempName] = React.useState("");
  const [dataModalOpen, setDataModalOpen] = useState(false);
  const [listModalOpen, setListModalOpen] = useState(false);
  const [history, showHistory] = useState("");
  const [tempSelectedOptions, setTempSelectedOptions] = useState([]);
  const [tempSelectedOptionsEdit, setTempSelectedOptionsEdit] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenLane, setIsDropdownOpenLane] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isDropdownValueShow, setIsDropdownOpen1] = useState(false);
  const [isDropdownValues, setIsDropdownValues] = useState([]);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState(null);
  const [selectedLane, setSelectedLane] = useState(null);
  const [monotainersData, setMonotainersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dropdownStates, setDropdownStates] = useState({});


  const fetchAllMonotainers = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_MONO_ID}?pageNo=20`
      );
      const data = await response.json();
      if (Array.isArray(data.Sortedids)) {
        setMonotainersData(data.Sortedids);
        toggleDropdown()
      } else {
        console.error("Invalid data format: data.result is not an array.");
      }
    } catch (error) {
      console.error("Error fetching monotainer data:", error);
    }
  };

  // Fetch all the monotainer data initially
  // useEffect(() => {
  //   fetchAllMonotainers();
  // }, []); 
  // Empty dependency array, so this effect runs only once on mount

  const handleOptionSelection = (value) => {
    setTempSelectedOptions((prevSelected) => {
      if (prevSelected.includes(value)) {
        return prevSelected.filter((option) => option !== value);
      } else {
        return [...prevSelected, value];
      }
    });
  };
  const handleOptionSelection1 = (value) => {
    if (tempSelectedOptionsEdit.includes(value)) {
      setTempSelectedOptionsEdit((prevSelected) => {
        prevSelected.filter((option) => option !== value);
      });
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevOpen) => !prevOpen);
    if (!isDropdownOpen) {
      setTempSelectedOptions(selectedOptions);
    }
  };
  const toggleDropdown1 = (data) => {
    console.log(data, "data");
    setIsDropdownOpen1((prevOpen) => !prevOpen);
    setIsDropdownValues(data);
    // if (!isDropdownOpen) {
    //   setTempSelectedOptions1(selectedOptions1);
    // }
  };

  const handleDropdownSubmit = () => {
    console.log(tempSelectedOptions, selectedLane, "ss");
    setSelectedOptions(tempSelectedOptions);
    setIsDropdownOpen(false);
    const camera_id = "C001";
    const iffinalized = "false";
    const ifmisplaced = "false";
    const ifprocessed = "false";
    const ifstaged = "false";
    const ifuntagged = "false";
    const index = 0;
    const lane_name = selectedLane;
    const monotainer_id = tempSelectedOptions.join(",");
    axios
      .post(`${process.env.NEXT_PUBLIC_TAG_API_URL}`, null, {
        params: {
          camera_id,
          iffinalized,
          ifmisplaced,
          ifprocessed,
          ifstaged,
          ifuntagged,
          index,
          lane_name,
          monotainer_id,
        },
      })
      .then((response) => {
        console.log("API response:", response.data);
        setIsDropdownOpen1(false); // Close the dropdown after submission
      })
      .catch((error) => {
        console.error("API error:", error);
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

  const handleDropdownCancel = () => {
    setTempSelectedOptions("");
    setIsDropdownOpen(false);
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const closeModalPopUp = () => {
    setDataModalOpen(false);
    setListModalOpen(false);
  };
  const openTableModalBox = (params) => {
    setListModalOpen(false);
    setTempName(params.monotainer_id);
    setDataModalOpen(true);
    historyHandler(params);
  };

  const handleLaneSelection = (lane) => {
    setSelectedLane(lane);
    setIsDropdownOpenLane(false);
  };

  const historyHandler = (data) => {
    const monoid = data.monotainer_id;
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL_HISTORY}`, {
        params: {
          monoid,
        },
      })
      .then((response) => {
        setDataModalOpen(true);
        console.log(response.data.result, "response.data.result");
        showHistory(response.data.result);
      });
  };

  const resetHandler =(data)=>{
    setIsLoading(true); // Set loading state to true before making the API call
    const lane_name = data;
    axios
      .post(`${process.env.NEXT_PUBLIC_RESETLANE_API_URL}`, null, {
        params: {
          lane_name,
        },
      })
      .then((response) => {
        console.log("API response:", response.data);
        setIsLoading(false); // Set loading state back to false after the API call is complete

      })
      .catch((error) => {
        console.error("API error:", error);
        setIsLoading(false); // Set loading state back to false after the API call is complete

      });
  }
  return (
    <>
      <div className={`p-5 bg-white rounded-xl h-96 realTimeView`}>
        {isLoading ? (<Skeleton/>) : 
        (<div>
        <div className="flex items-center text-center justify-between">
          <div style={{ lineHeight: 1, fontSize: "12px" }}>
            <p className="text-indigo-800   underline">
              Lane :&nbsp;&nbsp;{capitalizeFirstLetter(data.lane_name)}
            </p>
            <span className="  text-gray-400 text-xs justify-between lane-1">
              Lane In
            </span>
          </div>
          <div className="relative inline-block ml-4">
            <button onClick={() => fetchAllMonotainers()} className="focus:outline-none">
              <Image
                src={tag}
                className="object-contain w-10 h-10 cursor-pointer text-white bg-white"
                alt="logo"
                width={35}
                height={35}
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-[40px] right-0 bg-white shadow-md p-2 z-10 h-[300px] overflow-y-auto">
                {monotainersData?.map((value) => (
                  <div
                    key={value}
                    className={`flex items-center cursor-pointer`}
                  >
                    <input
                      type="checkbox"
                      checked={tempSelectedOptions.includes(value)}
                      onChange={() => handleOptionSelection(value)}
                      className="mr-2"
                    />

                    <div
                      onClick={() => handleOptionSelection(value)}
                      className={`py-1 px-2 ${selectedOptions.includes(value)}`}
                    >
                      {value}
                    </div>
                  </div>
                ))}
                <div className="relative w-40">
                  <div
                    className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 cursor-pointer flex justify-between items-center"
                    onClick={() => setIsDropdownOpenLane(!isDropdownOpenLane)}
                  >
                    <span>{selectedLane || "Select Lane"}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.293 8.293a1 1 0 011.414 0L10 10.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  {isDropdownOpenLane && (
                    <div className="absolute z-10 mt-2 w-full bg-white border border-t border-r border-l border-gray-300 rounded-md shadow-md hover:bg-gray-10">
                      {allData
                        ?.map((lane) => lane.lane_name)
                        .map((lane) => (
                          <div
                            key={lane}
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleLaneSelection(lane)}
                          >
                            {lane}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
                <div className="flex justify-end mt-2">
                  <button
                    className="mr-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    onClick={handleDropdownSubmit}
                  >
                    Submit
                  </button>
                  <button
                    className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                    onClick={handleDropdownCancel}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
          <p className="  text-primary2 flex justify-content text-lg">
            Real Time View
            <span className="rounded-full border border-indigo-900 bg-indigo-900 w-8 h-8 flex items-center justify-center text-white text-lg   shadow-blue ml-4">
              {data?.real_time_positions?.total_monotainers}
            </span>
          </p>
          <button className="bg-[#434190] w-20 py-3 rounded-lg text-white text-xs mr-1 " onClick={() => resetHandler(data.lane_name)}>
            Reset
            <i className="fas fa-sync-alt text-white ml-2"></i>
          </button>

          <div style={{ lineHeight: 1, fontSize: "12px" }}>
            <p className="text-indigo-800   underline">
              Camera ID:&nbsp;&nbsp;{data.camera_id}
            </p>
          </div>
        </div>
        <div className="flex gap-3 flex-col mt-7rem">
          <div className="grid grid-cols-8 gap-2">
            {data?.real_time_positions?.monotainers
              ?.slice((page - 1) * dataPerPage, page * dataPerPage)
              .sort((a, b) => a.index - b.index)
              ?.map((data1, index) => (
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
                    } border px-2 py-2 rounded-lg h-10 `}
                  >
                    {data1.monotainer_id}
                  </button>
                  {hoveredIndex === index && (
                    <div className="icons-container real-time absolute top-0 right-0 ">
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
                        className="cursor-pointer text-red-800"
                        onClick={() => {
                          // Functionality for view icon
                          setTempName(data1.monotainer_id);
                          historyHandler(data1);
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
          <div className="flex flex-col items-center">
            <span className="  text-gray-400 text-xs mb-1">Lane Out</span>
            <button
              className={`${
                totalPages === 0 ? "disabled cursor-not-allowed" : ""
              } bg-[#434190] rounded-md px-2 py-1 text-white text-sm   text-xs`}
              onClick={() => {
                setListModalOpen(true);
              }}
            >
              See&nbsp;All
            </button>
          </div>
        </div>
        </div>)}
      </div>

      {listModalOpen && (
        <ModalPopUp
          listData={data}
          realTimeDataData={true}
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
