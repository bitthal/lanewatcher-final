import { useRouter } from "next/router";
import React,{ useRef, useState } from "react";
import DateTimePicker from 'react-tailwindcss-datetimepicker';
import moment from 'moment';

export default function Header2({ show, setShow,setUpdated,showDatePicker,setRangeFilter }) {
  console.log(showDatePicker,'showDatePicker')
  const inputRef = useRef('');

  const handleClick = () => {
    console.log(inputRef.current.value)
    let newValue = inputRef.current.value;
    setUpdated(newValue);
  };

  const now = new Date();
  const start = moment(
    new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
  );
  const end = moment(start).add(1, 'days').subtract(1, 'seconds');
  const [range, setRange] = useState({
    start: start,
    end: end,
  });
  const ranges = {
    Today: [moment(start), moment(end)],
    Yesterday: [
      moment(start).subtract(1, 'days'),
      moment(end).subtract(1, 'days'),
    ],
    '3 Days': [moment(start).subtract(3, 'days'), moment(end)],
    '2 Weeks': [moment(start).subtract(14, 'days'), moment(end)],
    '1 Month': [moment(start).subtract(1, 'months'), moment(end)],
    // '1st August 18': [
    //   moment('2018-08-01 00:00:00'),
    //   moment('2018-08-02 23:59:59'),
    // ],
    '1 Year': [moment(start).subtract(1, 'years'), moment(end)],
  };
  const local = {
    format: 'DD-MM-YYYY HH:mm', // Moment format
    sundayFirst: false,
    days: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'So'],
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    fromDate: 'From Date',
    toDate: 'To Date',
    selectingFrom: 'Selecting From',
    selectingTo: 'Selecting To',
    maxDate: 'Max Date',
    close: 'Close',
    apply: 'Apply',
    cancel: 'Cancel',
  };
  const maxDate = moment(start).add(24, 'hour');

  function handleApply(startDate, endDate) {
    setRange({ start: startDate, end: endDate });
    setRangeFilter({ start: startDate, end: endDate })
  }
  return (
    
    <div className="mt-5 w-full">
      <div className="flex lg:justify-between lg:flex-row flex-col lg:items-center gap-4">
        <div className="flex gap-4 ">
          <div className="bg-gray-100 w-fit flex text-2xl gap-2 shadow rounded-md">
            <i
              onClick={() => setShow(true)}
              className={`fa-solid cursor-pointer fa-eye p-2  ${
                show == true && "bg-white rounded-md"
              }`}
            />
            <i
              onClick={() => setShow(false)}
              className={`fa-solid cursor-pointer fa-eye-slash p-2 ${
                show == false && "bg-white rounded-md"
              }`}
            />
          </div>
          <div className="border border-gray-300 flex gap-3 items-center overflow-clip rounded-md h-10 px-5 rounded">
            
            <input
              className="w-128 h-full pr-4 py-2 focus:outline-none block"
              placeholder="Enter Montainer/Lane ID:"
              type="text"
              id="message"
              name="message"
              ref={inputRef}
              
            />
            <button type="submit" onClick = {handleClick}><i className="px-4  fa-solid fa-magnifying-glass" /> </button>
                         
          </div>
          
        </div>
        {showDatePicker &&
          <div className="flex pr-5 right-1/2 border-solid border-2 rounded-md shadow-lg box-border ">
          <DateTimePicker
          ranges={ranges}
          start={range.start}
          end={range.end}
          local={local}
          maxDate={maxDate}
          applyCallback={handleApply}
          leftMode={true}
            >
      <input
        placeholder="Enter date..."
        value={`${range.start} - ${range.end}`}
        className="w-140 h-full py-2 focus:outline-none block border-solid px-5"
      />
    </DateTimePicker>
        </div>
        }
        
      </div>
    </div>
  );
}
