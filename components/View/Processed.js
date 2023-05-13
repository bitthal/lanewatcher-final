import React from "react";

export default function Pending({ show }) {
  return (
    <div className={`${show ? "h-96" : "h-auto"}  bg-white rounded-xl p-5`}>
      {!show ? (
        <div className="flex flex-col items-center text-center gap-5">
          <p className="font-bold text-[#001CFF]">Processed</p>

          <i className="fa-solid fa-cart-shopping text-primary" />
          <p className="font-bold text-green-700">80</p>
        </div>
      ) : (
        <div className="flex flex-col  items-center text-center h-full justify-between gap-5">
          <div className="flex  items-center text-center justify-between gap-4">
            <i className="fa-solid fa-cart-shopping text-primary" />
            <p className="font-bold text-[#001CFF]">Processed</p>

            <p className="font-bold text-green-700">80</p>
          </div>

          <div className="flex gap-3 flex-col">
            {" "}
            <div className="flex gap-3">
              <button className="text-green-700 border px-3 py-2 border-green-700 rounded-lg">
                AB07AC
              </button>
              <button className="text-green-700 border px-3 py-2 border-green-700 rounded-lg">
                AB07AC
              </button>
            </div>
            <div className="flex gap-3">
              <button className="text-green-700 border px-3 py-2 border-green-700 rounded-lg">
                AB07AC
              </button>
              <button className="text-green-700 border px-3 py-2 border-green-700 rounded-lg">
                AB07AC
              </button>
            </div>
            <div className="flex gap-3">
              <button className="text-green-700 border px-3 py-2 border-green-700 rounded-lg">
                AB07AC
              </button>
              <button className="text-green-700 border px-3 py-2 border-green-700 rounded-lg">
                AB07AC
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center gap-3">
            <div className="flex gap-1 items-center">
              <div className="w-6 h-6 rounded-full border bg-gray-200">
                <i className="text-sm fa-solid fa-chevron-left" />
              </div>

              <span className="text-sm text-gray-500">2&nbsp;out&nbsp;of&nbsp;28</span>
              <div className="w-6 h-6 rounded-full border bg-gray-200">
                <i className="text-sm fa-solid fa-chevron-right" />
              </div>
            </div>

            <button className="bg-[#001CFF] rounded-md px-2 py-1 text-white text-sm font-bold">
              See&nbsp;All
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
