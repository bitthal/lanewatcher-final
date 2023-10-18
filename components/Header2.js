import { useRouter } from "next/router";
import React, {
  useRef,
  useState,
  useContext,
  useEffect,
  Fragment,
} from "react";
import Toaster from "./Toaster";
import DateTimePicker from "react-tailwindcss-datetimepicker";
import moment from "moment";
// import Image from "next/image";
// import tag from "/public/tag.svg";
import { value_data } from "@/context/context";
import axios from "axios";
export default function Header2({
  show,
  // setShow,
  setUpdated,
  // showDatePicker,
  // showDashboardViewInHeader,
  setRangeFilter,
  showSearchBar,
  totalLaneCount,
  filteredLaneCount,
  showLaneCount,
  // onSearch
  progress,
  // showDashboardData
  
}) {
  const handleCloseToaster = () => {
    setErrors(null); // Clear the toaster message
  };
  const router =
    useRouter().pathname.replace(/\//, "").charAt(0).toUpperCase() +
    useRouter().pathname.replace(/\//, "").slice(1);
  const [showBorder, setShowBorder] = useState(true);
  const inputRef = useRef("");
  // const [selectedDropdownValue, setSelectedDropdownValue] = useState(null);
  // const [selectedLane, setSelectedLane] = useState(null);
  // const [monotainersData, setMonotainersData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [dropdownStates, setDropdownStates] = useState({});
  // const [searchIdValue, setSearchIdValue] = useState("");
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const [tempSelectedOptions, setTempSelectedOptions] = useState([]);
  // const [selectedOptions, setSelectedOptions] = useState([]);
  // const [isDropdownOpenLane, setIsDropdownOpenLane] = useState(false);
  const [error, setErrors] = useState(null);
  // const { laneNames } = useContext(value_data);
  const { resetLoader, setResetLoader } = useContext(value_data);
  const [isClient, setIsClient] = useState(false);

  // const [progress, setProgress] = useState(0);

  // useEffect(() => {
  //   if (updateProgress) {
  //     const interval = setInterval(() => {
  //       setProgress((prevProgress) => {
  //         const newProgress = prevProgress + 1;
  //         if (newProgress >= 5) {
  //           clearInterval(interval); // Stop the interval when progress reaches 5
  //         }
  //         return newProgress;
  //       });
  //     }, 1000); // Update the progress every 1000 milliseconds (1 second)

  //     return () => {
  //       clearInterval(interval); // Cleanup the interval when the component unmounts
  //     };
  //   }
  // }, [updateProgress]);
  const progressBarStyle = {
    transform: `rotate(${(progress / 5) * 360}deg)`,
  };

  // const [searchTerm, setSearchTerm] = useState(""); // State to store the search term
  // const fetchAllMonotainers = async () => {
  //   try {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_URL_MONO_ID}?pageNo=20`
  //     );
  //     const data = await response.json();
  //     if (Array.isArray(data.result)) {
  //       setMonotainersData(data.result);
  //       toggleDropdown();
  //     } else {
  //       console.error("Invalid data format: data.result is not an array.");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching monotainer data:", error);
  //   }
  // };
  // const toggleDropdown = () => {
  //   setIsDropdownOpen((prevOpen) => !prevOpen);
  //   if (!isDropdownOpen) {
  //     setTempSelectedOptions(selectedOptions);
  //   }
  // };
  // const handleLaneSelection = (lane) => {
  //   setSelectedLane(lane);
  //   setIsDropdownOpenLane(false);
  // };
  // const handleDropdownSubmit = () => {
  //   console.log(tempSelectedOptions, selectedLane, "ss");
  //   setSelectedOptions(tempSelectedOptions);
  //   setIsDropdownOpen(false);
  //   const camera_id = "C001";
  //   const iffinalized = "false";
  //   const ifmisplaced = "false";
  //   const ifprocessed = "false";
  //   const ifstaged = "false";
  //   const ifuntagged = "false";
  //   const index = 0;
  //   const lane_name = selectedLane;
  //   const monotainer_id = tempSelectedOptions.join(",");
  //   axios
  //     .post(`${process.env.NEXT_PUBLIC_TAG_API_URL}`, null, {
  //       params: {
  //         camera_id,
  //         iffinalized,
  //         ifmisplaced,
  //         ifprocessed,
  //         ifstaged,
  //         ifuntagged,
  //         index,
  //         lane_name,
  //         monotainer_id,
  //       },
  //     })
  //     .then((response) => {
  //       setIsDropdownOpen1(false); // Close the dropdown after submission
  //     })
  //     .catch((error) => {
  //       setErrors("No data available");
  //     });
  // };
  // const handleDropdownCancel = () => {
  //   setTempSelectedOptions("");
  //   setIsDropdownOpen(false);
  // };
  useEffect(() => {
    setIsClient(true);
  }, []);
  const setSearchTerm = () => {
    const newValue = inputRef.current.value;
    setUpdated(newValue);
    // onSearch(newValue);
  };

  const handleCancel = () => {
    inputRef.current.value = "";
    setSearchTerm(""); // Clear the search term
    // onSearch(""); // Call the onSearch callback with an empty string to reset the search
  };
  // const handleOptionSelection = (value) => {
  //   setTempSelectedOptions((prevSelected) => {
  //     if (prevSelected.includes(value)) {
  //       return prevSelected.filter((option) => option !== value);
  //     } else {
  //       return [...prevSelected, value];
  //     }
  //   });
  // };
  const now = new Date();
  const start = moment(
    new Date(now.getFullYear(), now.getMonth(), now.getDate())
  );

  const end = moment(start).add(1, "days").subtract(1, "seconds");
  const [range, setRange] = useState({
    // Calculate the start date as 6 months ago from the current date
    start: moment().subtract(6, "months"),
    // Set the end date to the current date
    end: moment(),
  });
  const ranges = {
    Today: [moment(start), moment(end)],
    Yesterday: [
      moment(start).subtract(1, "days"),
      moment(end).subtract(1, "days"),
    ],
    "3 Days": [moment(start).subtract(3, "days"), moment(end)],
    "2 Weeks": [moment(start).subtract(14, "days"), moment(end)],
    "1 Month": [moment(start).subtract(1, "months"), moment(end)],
    "1 Year": [moment(start).subtract(1, "years"), moment(end)],
  };
  const local = {
    format: "DD-MM-YYYY HH:mm", // Moment format
    sundayFirst: false,
    days: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "So"],
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    fromDate: "From Date",
    toDate: "To Date",
    selectingFrom: "Selecting From",
    selectingTo: "Selecting To",
    maxDate: "Max Date",
    close: "Close",
    apply: "Apply",
    cancel: "Cancel",
  };
  const maxDate = moment(start).add(24, "hour");
  function handleApply(startDate, endDate) {
    setRange({ start: startDate, end: endDate });
    setRangeFilter({ start: startDate, end: endDate });
  }
  const resetHandler = () => {
    setResetLoader(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL_RESET}`, {})
      .then((response) => {
        setResetLoader(false);
      })
      .catch((error) => {
        console.error("API error:", error);
        setResetLoader(false);
        setErrors("API error");
      });
  };
  return (
    <Fragment>
      <div className="mt-5 flex items-center lg:flex-row gap-4 lg:items-center justify-between ">
        <div className="w-full">
          {showSearchBar && (
            <div className="border border-gray-300 flex items-center overflow-clip rounded-md px-2 md:px-5 h-10 lg:w-116 z-9 h-auto">
              <div className="flex-1">
                <div className="flex items-center w-full">
                  <input
                    className="flex-1 h-full pr-4 py-2 focus:outline-none block lg:text-lg text-sm"
                    placeholder="Enter Montainer/Lane Name:"
                    type="text"
                    id="message"
                    name="message"
                    ref={inputRef}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {inputRef.current.value !== "" && (
                    <button type="button" onClick={handleCancel}>
                      <i className="px-4 fa-solid fa-times" />
                    </button>
                  )}
                </div>
              </div>
              <button type="submit" onClick={setSearchTerm}>
                <i className="px-4 fa-solid fa-magnifying-glass" />
              </button>
            </div>
          )}

          {showLaneCount && (
            <div className="lg:text-lg text-sm mt-3 lg:text-left">
              <strong>Lanes</strong> : Showing&nbsp;
              {filteredLaneCount !== totalLaneCount ? (
                <>
                  <span className="inline-flex relative">
                    <span className="bg-white text-indigo-700 flex items-center  text-xl">
                      {filteredLaneCount ? filteredLaneCount : 0}
                    </span>
                    &nbsp;
                    {filteredLaneCount === 1 ? "lane" : "lanes"}
                  </span>
                  &nbsp;of&nbsp;
                  <span className="inline-flex relative">
                    <span className="bg-white text-indigo-700 flex items-center left-1 text-xl">
                      {totalLaneCount ? totalLaneCount : 0}
                    </span>
                    &nbsp; lanes
                  </span>
                </>
              ) : (
                <>
                  <span className="inline-block relative">
                    <span className="bg-white text-indigo-700 flex items-center justify-center left-1 text-xl">
                      {totalLaneCount ? totalLaneCount : 0}
                    </span>
                  </span>
                  &nbsp;total lanes
                </>
              )}
            </div>
          )}
        </div>

        {/* { (
          <div className="relative inline-block ml-4 mb-8">
            <button
              onClick={() => fetchAllMonotainers()}
              className="focus:outline-none"
            >
              <Image
                src={tag}
                className="object-contain cursor-pointer text-white bg-white"
                alt="logo"
                width={80}
                height={80}
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-[40px] right-0 bg-white shadow-md p-2 z-10 h-auto overflow-hidden">
                <input
                  type="text"
                  placeholder="Search IDs..."
                  value={searchIdValue}
                  onChange={(e) => setSearchIdValue(e.target.value)}
                  className="mb-2 p-1 border border-gray-300 rounded"
                />
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
                      {laneNames
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
                <div className="h-[200px] overflow-y-auto">
                  {monotainersData
                    ?.filter((value) =>
                      value.toLowerCase().includes(searchIdValue.toLowerCase())
                    )
                    .map((value, index) => (
                      <div
                        key={index}
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
                          className={`py-1 px-2 ${selectedOptions.includes(
                            value
                          )}`}
                        >
                          {value}
                        </div>
                      </div>
                    ))}
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
        )} */}

        {router == "Tracker" && (
          <div className="flex items-center lg:flex-row mb-10">
            <div className="flex items-center gap-2 w-50 h-50">
              <span className="w-7 h-8 bg-red-500 rounded-sm" />
              <span className="text-xs text-red-500">Misplaced</span>
            </div>
            <div className="flex items-center gap-2 ml-3">
              <span className="w-7 h-8 bg-green-500 rounded-sm" />
              <span className="text-xs text-green-500">Staged</span>
            </div>
            <div className="flex items-center gap-2 ml-3">
              <span className="w-7 h-8 bg-yellow-500 rounded-sm" />
              <span className="text-xs text-yellow-500">Untagged</span>
            </div>
            <div className="flex items-center gap-2 ml-3">
              <span className="w-7 h-8 bg-indigo-800 rounded-sm" />
              <span className="text-xs text-indigo-800">Finalized</span>
            </div>
          </div>
        )}
        {router == "Tracker" && (
          <div className="mb-10 w-90">
          <button
            className="text-xs underline text-red-800"
            onClick={() => resetHandler()}
          >
            Sorting Reset &nbsp;
            <i className="fas fa-sync-alt text-red-800 underline"></i>
          </button>
          </div>
        )}
        {router == "Dashboard" && isClient && (

          <div className="flex border-0 mb-8 mt-2 lg:mb-12 lg:mt-8 w-full cursor-pointer">
            <p className="lg:text-xl text-sm lg:mt-0 mt-2">Date Range:</p>
            <DateTimePicker
              primaryColor="fuchsia"
              ranges={ranges}
              start={range.start}
              end={range.end}
              local={local}
              maxDate={maxDate}
              applyCallback={handleApply}
              leftMode
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 ml-px mt-px cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                />
              </svg>
              <input
                placeholder="Enter date..."
                value={`${range.start.format(
                  "DD-MM-YYYY"
                )} - ${range.end.format("DD-MM-YYYY")}`}
                className={`w-full border-b border-b-2 border-indigo-800 h-full cursor-pointer lg:text-lg text-sm focus-visible:outline-none `}
                onClick={() => setShowBorder(!showBorder)} // Toggle the border style
              />
            </DateTimePicker>
          </div>
        )}
        {router == "Tracker" && (
          <div className="flex lg:flex-row items-center lg:mb-10">
          <div className="items-center">
            <span>Refreshing:</span>
          </div>
          <div className="loader-animated-container mt-3 lg:mt-0">
            <div
              className="loader-animated-progress"
              style={progressBarStyle}
            ></div>
            <span className="relative lg:left-2 lg:top-3 ml-2 lg:ml-0">
              {progress}
            </span>
          </div>
        </div>
        
        )}
      </div>

      <Toaster message={error} onClose={handleCloseToaster} />
    </Fragment>
  );
}
