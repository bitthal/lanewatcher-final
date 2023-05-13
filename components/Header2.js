import React from "react";

export default function Header2({ show, setShow }) {
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

          <div className="border border-gray-300 flex gap-3 items-center overflow-clip rounded-md h-10 px-5">
            <input
              className="w-96 h-full pr-4 py-2 focus:outline-none"
              placeholder="Enter Montainer/Lane ID:"
              type="text"
            />
            <i class="fa-solid fa-magnifying-glass" />

            <i className="fa-solid fa-filter" />
          </div>
        </div>

        <div className="flex gap-4 pr-5">


          <select name="cars" id="cars" className="focus:outline-none">
            <option value="volvo">Periods</option>
            <option value="saab">Today</option>
            <option value="saab">Last 7 days</option>
            <option value="saab">Last month</option>
            <option value="saab">Last Year</option>
            <option value="saab">All</option>
          </select>
          <select name="cars" id="cars" className="focus:outline-none">
            <option value="volvo">Filters</option>
            <option value="saab">All</option>

          </select>



        </div>
      </div>
    </div>
  );
}
