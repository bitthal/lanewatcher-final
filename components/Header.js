import React from "react";

export default function Header() {

  const siteOptions = [
    { id:0, site_name:'Select Sites' },
    { id:1, site_name:'CNP1' },
    { id:2, site_name:'CNP2' },
    { id:3, site_name:'CNP3' }];

  return (
    <div className="w-full rounded-xl shadow-md  p-5 flex justify-between items-center overflow-hidden">
      <div className="flex gap-16 items-center">
        <p className="w-fit text-center font-bold">UST Canada Post</p>
        <p className="w-fit  font-bold text-primary">Tracker</p>
      </div>

      <div className="flex items-center gap-6">
        <select name="cars" id="cars" className="border-b focus:outline-none">
        {siteOptions.map((option, index) => (
                <option key={option.id} value={index}>
                  {option.site_name}
                </option>
              ))}
        </select>

        <i className="text-2xl fa-solid fa-gear text-primary" />

        <div className="relative ">
          <i className="fa-solid fa-bell text-2xl " />
          <span className=" flex h-3 w-3 absolute top-0 translate-x-1/2 right-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
        </div>

        <div className="flex gap-4 items-center">
          <p className="w-fit font-bold text-primary">Hello, TestUser</p>
          <i className=" text-2xl  fa-solid fa-user"></i>
        </div>
      </div>
    </div>
  );
}
