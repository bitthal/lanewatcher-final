import React from "react";

export default function Pending({ show }) {
  return (
    <div className={`${show ? "h-96" : "h-auto"}  bg-white rounded-xl p-5`}>
      {!show ? (
        <div className="flex flex-col items-center text-center gap-5">
          <p className="font-bold text-[#001CFF]">Pending</p>

          <svg
            width="16"
            height="19"
            viewBox="0 0 16 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.1668 10C8.86683 10 7.00016 11.8667 7.00016 14.1667C7.00016 16.4667 8.86683 18.3334 11.1668 18.3334C13.4668 18.3334 15.3335 16.4667 15.3335 14.1667C15.3335 11.8667 13.4668 10 11.1668 10ZM12.5418 16.125L10.7502 14.3334V11.6667H11.5835V13.9917L13.1252 15.5334L12.5418 16.125ZM12.0002 2.50004H9.35016C9.00016 1.53337 8.0835 0.833374 7.00016 0.833374C5.91683 0.833374 5.00016 1.53337 4.65016 2.50004H2.00016C1.0835 2.50004 0.333496 3.25004 0.333496 4.16671V16.6667C0.333496 17.5834 1.0835 18.3334 2.00016 18.3334H7.09183C6.59881 17.8548 6.19773 17.2899 5.9085 16.6667H2.00016V4.16671H3.66683V6.66671H10.3335V4.16671H12.0002V8.40004C12.5918 8.48337 13.1502 8.65837 13.6668 8.90004V4.16671C13.6668 3.25004 12.9168 2.50004 12.0002 2.50004ZM7.00016 4.16671C6.54183 4.16671 6.16683 3.79171 6.16683 3.33337C6.16683 2.87504 6.54183 2.50004 7.00016 2.50004C7.4585 2.50004 7.8335 2.87504 7.8335 3.33337C7.8335 3.79171 7.4585 4.16671 7.00016 4.16671Z"
              fill="#FF0000"
            />
          </svg>
          <p className="font-bold text-red-700">80</p>
        </div>
      ) : (
        <div className="flex flex-col  items-center text-center h-full justify-between gap-5">
          <div className="flex  items-center text-center justify-between gap-4">
            <svg
              width="16"
              height="19"
              viewBox="0 0 16 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.1668 10C8.86683 10 7.00016 11.8667 7.00016 14.1667C7.00016 16.4667 8.86683 18.3334 11.1668 18.3334C13.4668 18.3334 15.3335 16.4667 15.3335 14.1667C15.3335 11.8667 13.4668 10 11.1668 10ZM12.5418 16.125L10.7502 14.3334V11.6667H11.5835V13.9917L13.1252 15.5334L12.5418 16.125ZM12.0002 2.50004H9.35016C9.00016 1.53337 8.0835 0.833374 7.00016 0.833374C5.91683 0.833374 5.00016 1.53337 4.65016 2.50004H2.00016C1.0835 2.50004 0.333496 3.25004 0.333496 4.16671V16.6667C0.333496 17.5834 1.0835 18.3334 2.00016 18.3334H7.09183C6.59881 17.8548 6.19773 17.2899 5.9085 16.6667H2.00016V4.16671H3.66683V6.66671H10.3335V4.16671H12.0002V8.40004C12.5918 8.48337 13.1502 8.65837 13.6668 8.90004V4.16671C13.6668 3.25004 12.9168 2.50004 12.0002 2.50004ZM7.00016 4.16671C6.54183 4.16671 6.16683 3.79171 6.16683 3.33337C6.16683 2.87504 6.54183 2.50004 7.00016 2.50004C7.4585 2.50004 7.8335 2.87504 7.8335 3.33337C7.8335 3.79171 7.4585 4.16671 7.00016 4.16671Z"
                fill="#FF0000"
              />
            </svg>
            <p className="font-bold text-[#001CFF]">Pending</p>

            <p className="font-bold text-red-700">80</p>
          </div>

          <div className="flex gap-3 flex-col">
            {" "}
            <div className="flex gap-3">
              <button className="text-red-700 border px-3 py-2 border-red-700 rounded-lg">
                AB07AF
              </button>
              <button className="text-red-700 border px-3 py-2 border-red-700 rounded-lg">
                AB07AF
              </button>
            </div>
            <div className="flex gap-3">
              <button className="text-red-700 border px-3 py-2 border-red-700 rounded-lg">
                AB07AF
              </button>
              <button className="text-red-700 border px-3 py-2 border-red-700 rounded-lg">
                AB07AF
              </button>
            </div>
            <div className="flex gap-3">
              <button className="text-red-700 border px-3 py-2 border-red-700 rounded-lg">
                AB07AF
              </button>
              <button className="text-red-700 border px-3 py-2 border-red-700 rounded-lg">
                AB07AF
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center gap-3">
            <div className="flex gap-1 items-center">

<div className="w-6 h-6 rounded-full border bg-gray-200"><i className="text-sm fa-solid fa-chevron-left"/></div>

              <span className="text-sm text-gray-500">2&nbsp;out&nbsp;of&nbsp;28</span>
              <div className="w-6 h-6 rounded-full border bg-gray-200"><i className="text-sm fa-solid fa-chevron-right"/></div>
            </div>

            <button className="bg-[#001CFF] rounded-md px-2 py-1 text-white text-sm font-bold">See&nbsp;All</button>
          </div>
        </div>
      )}
    </div>
  );
}
