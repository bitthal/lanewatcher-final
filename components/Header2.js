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
  // onSearch
}) {
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
    <div className="mt-5 w-full">
      <div className="flex lg:flex-row flex-col lg:items-center gap-4">
        <div className="flex gap-4 ">
          {/* <div className="w-fit flex text-2xl gap-2">
          <label className="flex items-center space-x-2 cursor-pointer">
  <input
    type="checkbox"
    className="form-toggle-checkbox hidden"
    checked={show}
    onChange={() => setShow(!show)}
  />
  <span
    className={`form-toggle-label relative h-8 w-16 border rounded-full transition-colors duration-300 ${
      show ? "bg-indigo-600" : "bg-gray-400"
    }`}
  >
    <span
      className={`absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center transition-transform duration-300 ${
        show ? "transform translate-x-full" : "transform translate-x-0"
      }`}
    >
      <i
        className={`fas ${
          show ? "fa-arrow-right" : "fa-arrow-left"
        } text-white`}
      />
    </span>
  </span>
</label>

          </div> */}
          {showSearchBar && (
            <div className="border border-gray-300 flex gap-3 items-center overflow-clip rounded-md h-10 px-5 rounded w-128">
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
        </div>
        {showDatePicker && (
          <div className="flex border-groove border-2">
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
                className="w-80 h-full py-2 block border-solid px-5 cursor-pointer"
              />
            </DateTimePicker>
          </div>
        )}
      </div>
    </div>
  );
}
