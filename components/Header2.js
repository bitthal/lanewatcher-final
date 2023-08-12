import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import DateTimePicker from "react-tailwindcss-datetimepicker";
import moment from "moment";

export default function Header2({
  show,
  // setShow,
  setUpdated,
  showDatePicker,
  setRangeFilter,
  showSearchBar,
  totalLaneCount,
  filteredLaneCount,
  showLaneCount,
  // onSearch
}) {
  const [showBorder, setShowBorder] = useState(true);
  const inputRef = useRef("");
  // const [searchTerm, setSearchTerm] = useState(""); // State to store the search term

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
  const now = new Date();
  const start = moment(
    new Date(now.getFullYear(), now.getMonth(), now.getDate())
  );

  const end = moment(start).add(1, "days").subtract(1, "seconds");
  const [range, setRange] = useState({
    start: start,
    end: end,
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
  return (
    <div className={`mt-5 w-full flex flex-col lg:flex-row justify-between`}>
      <div className="flex flex-col lg:flex-row items-center gap-8">
        <div className="gap-4 mb-4 lg:mb-0">
          {showSearchBar && (
            <div className="border border-gray-300 flex gap-3 items-center overflow-clip rounded-md h-10 px-5 rounded w-full lg:w-116 z-9">
              <input
                className="flex-1 h-full pr-4 py-2 focus:outline-none block"
                placeholder="Enter Montainer/Lane ID:"
                type="text"
                id="message"
                name="message"
                ref={inputRef}
                // value={inputRef} // Set the value to the searchTerm state
                onChange={(e) => setSearchTerm(e.target.value)} // Handle input change to update the searchTerm state
              />
              {inputRef.current.value != "" && ( // Display the cancel button when searchTerm is not empty
                <button type="button" onClick={handleCancel}>
                  <i className="px-4 fa-solid fa-times" />
                </button>
              )}
              <button type="submit" onClick={setSearchTerm}>
                <i className="px-4 fa-solid fa-magnifying-glass" />
              </button>
            </div>
          )}
          {showLaneCount && (
        <div className="text-sm mt-3 text-center lg:text-left">
          <strong>Lanes</strong> : Showing&nbsp;
          {filteredLaneCount !== totalLaneCount ? (
            <>
              <span className="inline-flex relative">
                <span className="rounded-full border border-blue-500 bg-white text-blue-500 w-5 h-5 flex items-center justify-center top-1 left-1 text-xs">
                  {filteredLaneCount ? filteredLaneCount : 0}
                </span>
                &nbsp;
                {filteredLaneCount === 1 ? "lane" : "lanes"}
              </span>
              &nbsp;of&nbsp;
              <span className="inline-flex relative">
                <span className="rounded-full border border-blue-500 bg-white text-blue-500 w-5 h-5 flex items-center justify-center -top-1 left-1 text-xs">
                  {totalLaneCount ? totalLaneCount : 0}
                </span>
                &nbsp; lanes
              </span>
            </>
          ) : (
            <>
              <span className="inline-block relative">
                <span className="rounded-full border border-blue-500 bg-white text-blue-500 w-5 h-5 flex items-center justify-center -top-1 left-1 text-xs">
                  {totalLaneCount ? totalLaneCount : 0}
                </span>
              </span>
              &nbsp;total lanes
            </>
          )}
        </div>
        )}
        </div>
        {showDatePicker && (
          <div className="flex mb-8">
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
                  "DD-MM-YYYY(HH:mm)"
                )} - ${range.end.format("DD-MM-YYYY(HH:mm)")}`}
                className={`w-72 h-full py-2 px-2.5 cursor-pointer text-sm`}
                onClick={() => setShowBorder(!showBorder)} // Toggle the border style
              />
            </DateTimePicker>
          </div>
        )}
      </div>
      
    </div>
  );
}
