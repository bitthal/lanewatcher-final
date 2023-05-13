import React from "react";

export default function PlanogramView() {
  return (
    <div className="bg-white rounded-xl p-5 flex flex-col gap-8 justify-between w-80 h-96">
      <div className="flex gap-4 justify-between items-center w-full">
        <svg
          width="30"
          height="31"
          viewBox="0 0 30 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.6875 0.503906L30 5.76425V17.4954L28.125 16.539V7.90126L20.625 11.727V15.5826L18.75 16.539V11.727L11.25 7.90126V11.2936L9.375 10.3372V5.76425L19.6875 0.503906ZM19.6875 10.0682L22.2803 8.73813L15.498 4.77793L12.4072 6.36201L19.6875 10.0682ZM24.3018 7.72193L26.9678 6.36201L19.6875 2.64092L17.5049 3.76173L24.3018 7.72193ZM16.875 17.4954L15 18.4518V18.4369L9.375 21.3062V28.1057L15 25.2215V27.3735L8.4375 30.721L0 26.4021V16.2999L8.4375 11.996L16.875 16.2999V17.4954ZM7.5 28.1057V21.3062L1.875 18.4369V25.2215L7.5 28.1057ZM8.4375 19.6474L13.8428 16.8976L8.4375 14.133L3.03223 16.8976L8.4375 19.6474ZM16.875 19.6324L23.4375 16.2849L30 19.6324V27.508L23.4375 30.8555L16.875 27.508V19.6324ZM22.5 28.2402V23.6823L18.75 21.7694V26.3274L22.5 28.2402ZM28.125 26.3274V21.7694L24.375 23.6823V28.2402L28.125 26.3274ZM23.4375 22.0235L26.9678 20.2152L23.4375 18.4219L19.9072 20.2152L23.4375 22.0235Z"
            fill="#001CFF"
          />
        </svg>

        <span className="text-primary font-bold">Planogram View</span>

        <span></span>
      </div>

      <div className="flex justify-between gap-4 items-center w-full">
        <span className="text-black font-bold">Lane 1</span>
        <span className="text-black font-bold">Toronto</span>

        <div className="relative ">
          <i className="fa-solid fa-bell text-2xl " />
          <span class=" flex h-3 w-3 absolute top-0 translate-x-1/2 right-0">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
        </div>
      </div>

      <div className="flex gap-4 justify-between items-center w-full">


        <div className="h-20 w-20 border rounded-md border-[#001CFF] py-auto">
          <div className="mt-3 text-[#001CFF] font-bold">
            <p className="text-center">12</p>
            <p className="text-center">In&nbsp;Stage</p>
          </div>
        </div>


        <div className="h-20 w-20 border rounded-md border-[#001CFF] py-auto">
          <div className="mt-3 text-[#001CFF] font-bold">
            <p className="text-center">12</p>
            <p className="text-center">Mapped</p>
          </div>
        </div>


        <div className="h-20 w-20 border rounded-md border-[#001CFF] py-auto">
          <div className="mt-3 text-[#001CFF] font-bold">
            <p className="text-center">12</p>
            <p className="text-center">Missing</p>
          </div>
        </div>




      </div>



      <div className="flex justify-center">

<button className="bg-[#001CFF] w-1/2 py-3 rounded-lg text-white font-bold">Total 36</button>

      </div>
    </div>
  );
}
