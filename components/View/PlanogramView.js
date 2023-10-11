/* eslint-disable react/jsx-key */
import React, { Fragment, useState, useContext } from "react";
import Skeleton from "../Skeleton";
import axios from "axios";
import { useRouter } from "next/router";
import { value_data } from "@/context/context";
import ModalPopUp from "./Modal";

export default function PlanogramView({
  data,
  resetLoader,
  DashboradView,
  showDashboardView,
  cameraId,
}) {
  const [alertList, setAlerts] = useState("");
  const { drpdwnVaue } = useContext(value_data);
  const { value } = useContext(value_data);
  const [modalState, setModalOpen] = useState(false);
  const [aggregateResult, setAggregateResult] = useState(false);
  const [skeletonLoader, setLoader] = useState(false);

  const router =
    useRouter().pathname.replace(/\//, "").charAt(0).toUpperCase() +
    useRouter().pathname.replace(/\//, "").slice(1);
  console.log(router, "r");
  async function getAlertHandler() {
    setLoader(true);
    setModalOpen(true);
    await axios
      .get(`${process.env.NEXT_PUBLIC_ALERTS_API_URL}`, {
        params: {
          site_id: value ? value.site_id : drpdwnVaue[0].site_id,
          // camera_id: value
          //   ? value.site_id
          //   : Object.values(drpdwnVaue[2].camera_id).toString(),
        },
      })
      .then((response) => {
        const mapped = response.data.dlist;
        // .flatMap(({ alerts, key_str, sorting_timestamp, id }) =>
        //   alerts.map((alerts) => ({ alerts, key_str, sorting_timestamp, id }))
        // )
        // .filter((data) => {
        //   return data.alerts.claimed_status;
        // });
        const sortedAlerts = mapped.sort((a, b) => {
          const timestampA = new Date(b.sorting_timestamp).getTime();
          const timestampB = new Date(a.sorting_timestamp).getTime();

          return timestampA - timestampB;
        });
        setLoader(false);
        setAlerts(sortedAlerts);
      })
      .catch((error) => {
        setModalOpen(false);
        setLoader(false);
        setErrors("No data available");
      });
  }
  const closeModalPopUp = (data) => {
    setModalOpen(data);
    setAggregateResult(false);
  };

  const showAggregateIds = () => {
    setAggregateResult(true);
  };
  return (
    <Fragment>
      {showDashboardView ? (
        <div
          className={` px-5 py-5 flex flex-col h-96 gap-8 justify-between w-fit-content bg-white xl:w-full planogramBox`}
        >
          <div className={`flex gap-4 justify-between items-center w-auto`}>
            <svg
              width="26"
              height="26"
              viewBox="0 0 30 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.6875 0.503906L30 5.76425V17.4954L28.125 16.539V7.90126L20.625 11.727V15.5826L18.75 16.539V11.727L11.25 7.90126V11.2936L9.375 10.3372V5.76425L19.6875 0.503906ZM19.6875 10.0682L22.2803 8.73813L15.498 4.77793L12.4072 6.36201L19.6875 10.0682ZM24.3018 7.72193L26.9678 6.36201L19.6875 2.64092L17.5049 3.76173L24.3018 7.72193ZM16.875 17.4954L15 18.4518V18.4369L9.375 21.3062V28.1057L15 25.2215V27.3735L8.4375 30.721L0 26.4021V16.2999L8.4375 11.996L16.875 16.2999V17.4954ZM7.5 28.1057V21.3062L1.875 18.4369V25.2215L7.5 28.1057ZM8.4375 19.6474L13.8428 16.8976L8.4375 14.133L3.03223 16.8976L8.4375 19.6474ZM16.875 19.6324L23.4375 16.2849L30 19.6324V27.508L23.4375 30.8555L16.875 27.508V19.6324ZM22.5 28.2402V23.6823L18.75 21.7694V26.3274L22.5 28.2402ZM28.125 26.3274V21.7694L24.375 23.6823V28.2402L28.125 26.3274ZM23.4375 22.0235L26.9678 20.2152L23.4375 18.4219L19.9072 20.2152L23.4375 22.0235Z"
                fill="#434190"
              />
            </svg>

            <span className="text-primary2 text-xxl">Planogram View</span>

            <button onClick={getAlertHandler} className="relative">
              <i className="fa-solid fa-bell text-2xl " />
              <span className=" flex h-3 w-3 absolute top-0 translate-x-1/2 right-0">
                <span className="animate-ping absolute inline-flex h-full w-auto rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-700"></span>
              </span>
            </button>
          </div>

          <div className="flex justify-between gap-4 items-center w-auto">
            {/* <span className="text-black">Lane {data && data ? data?.lane_number : ''}</span> */}

            <span className="text-black text-xl">{cameraId}</span>
            <span className="text-black text-xl">
              {data && data?.lane_name
                ? data?.lane_name.charAt(0).toUpperCase() +
                  data?.lane_name.slice(1)
                : ""}
            </span>
          </div>
          <div className="flex gap-4 justify-between items-center w-auto text-xs w-full">
            <div className="p-2 border rounded-md border-[#434190] py-auto">
              <div className=" text-[#434190] relative ">
                <p className="text-center big-text">
                  {data && data?.pending?.length}
                </p>
                <p className="text-center text-lg">Sorted</p>
              </div>
            </div>

            <div className="p-2 border rounded-md border-[#434190] py-auto ">
              <div className=" text-[#434190] relative   ">
                <p className="text-center big-text">
                  {data && data?.processed?.length}
                </p>
                <p className="text-center text-lg">Processed</p>
              </div>
            </div>

            <div className="p-2 border rounded-md border-[#434190] py-auto">
              <div className="text-[#434190] relative">
                <p className="text-center big-text">
                  {data && data?.misplaced?.length ? data?.misplaced?.length : 0}
                </p>
                <p className="text-center text-lg">Misplaced</p>
              </div>
            </div>
            <div className="p-2 border rounded-md border-[#434190] py-auto">
              <div className="text-[#434190] relative">
                <p className="text-center big-text">
                  {data && data?.finalized?.length}
                </p>
                <p className="text-center text-lg">Finalized</p>
              </div>
            </div>
          </div>

          <div>
            {/* {router == "Tracker" && (
              <p className="text-sm text-gray-600">
                Trucks Required- {data && data?.planogram?.trucks_required}
              </p>
            )}

            <p className="text-sm mb-5 text-gray-600">
              Trucks Ordered- {data && data?.planogram?.trucks_ordered}
            </p> */}
            <div className="flex justify-center justify-content">
              <button
                onClick={showAggregateIds}
                className={`${
                  data &&
                  data?.misplaced?.length +
                    data?.pending?.length +
                    data?.processed?.length >
                    0
                    ? ""
                    : "disabled"
                }
             bg-[#434190] w-1/2 py-3 rounded-lg text-white   text-lg m-1`}
              >
                Total {""}
                {data &&
                  data?.misplaced?.length +
                    data?.pending?.length +
                    data?.finalized?.length +
                    data?.processed?.length}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`rounded-xl px-5 py-5 flex flex-col h-96 gap-8 justify-between bg-white`}
        >
          <div className={`flex gap-4 justify-between items-center `}>
            <svg
              width="26"
              height="26"
              viewBox="0 0 30 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.6875 0.503906L30 5.76425V17.4954L28.125 16.539V7.90126L20.625 11.727V15.5826L18.75 16.539V11.727L11.25 7.90126V11.2936L9.375 10.3372V5.76425L19.6875 0.503906ZM19.6875 10.0682L22.2803 8.73813L15.498 4.77793L12.4072 6.36201L19.6875 10.0682ZM24.3018 7.72193L26.9678 6.36201L19.6875 2.64092L17.5049 3.76173L24.3018 7.72193ZM16.875 17.4954L15 18.4518V18.4369L9.375 21.3062V28.1057L15 25.2215V27.3735L8.4375 30.721L0 26.4021V16.2999L8.4375 11.996L16.875 16.2999V17.4954ZM7.5 28.1057V21.3062L1.875 18.4369V25.2215L7.5 28.1057ZM8.4375 19.6474L13.8428 16.8976L8.4375 14.133L3.03223 16.8976L8.4375 19.6474ZM16.875 19.6324L23.4375 16.2849L30 19.6324V27.508L23.4375 30.8555L16.875 27.508V19.6324ZM22.5 28.2402V23.6823L18.75 21.7694V26.3274L22.5 28.2402ZM28.125 26.3274V21.7694L24.375 23.6823V28.2402L28.125 26.3274ZM23.4375 22.0235L26.9678 20.2152L23.4375 18.4219L19.9072 20.2152L23.4375 22.0235Z"
                fill="#434190"
              />
            </svg>

            <span className="text-primary2   text-lg">Planogram View</span>

            <button onClick={getAlertHandler} className="relative">
              <i className="fa-solid fa-bell text-2xl " />
              <span className=" flex h-3 w-3 absolute top-0 translate-x-1/2 right-0">
                <span className="animate-ping absolute inline-flex h-full w-auto rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-700"></span>
              </span>
            </button>
          </div>

          <div className="flex justify-between gap-4 items-center w-auto">
            {/* <span className="text-black">Lane {data && data ? data?.lane_number : ''}</span> */}
            <span className="text-black">
              {data && data?.lane_name
                ? data?.lane_name.charAt(0).toUpperCase() +
                  data?.lane_name.slice(1)
                : ""}
            </span>
          </div>
          <div className="flex gap-4 justify-between items-center w-auto text-xs w-full h-full">
            <div className="p-2 border rounded-md border-[#434190] py-auto w-full h-full">
              <div className=" text-[#434190] relative top-10  ">
                <p className="text-center">{data?.planogram?.in_stage}</p>
                <p className="text-center">In&nbsp;Stage</p>
              </div>
            </div>

            <div className="p-2 border rounded-md border-[#434190] py-auto w-full h-full">
              <div className=" text-[#434190] relative top-10  ">
                <p className="text-center">{data?.planogram?.mapped}</p>
                <p className="text-center">Mapped</p>
              </div>
            </div>

            <div className="p-2 border rounded-md border-[#434190] py-auto w-full h-full">
              <div className="text-[#434190] relative top-10  ">
                <p className="text-center">{data?.planogram?.missing}</p>
                <p className="text-center">Missing</p>
              </div>
            </div>
          </div>
          <div>
            {router == "Tracker" && (
              <p className="text-sm text-gray-600">
                Trucks Required- {data && data?.planogram?.trucks_required}
              </p>
            )}

            <p className="text-sm mb-5 text-gray-600">
              Trucks Ordered- {data && data?.planogram?.trucks_ordered}
            </p>
            <div className="flex justify-center justify-content">
              <button
                onClick={showAggregateIds}
                className={`${
                  data && data?.planogram?.total > 0 ? "" : "disabled"
                }
             bg-[#434190] w-1/2 py-3 rounded-lg text-white   text-xs m-1`}
              >
                Total {data && data?.planogram?.total}
              </button>
            </div>
          </div>
        </div>
      )}

      {modalState && (
        <ModalPopUp
          alertsTableData={skeletonLoader ? false : alertList}
          skeletonLoader={skeletonLoader}
          modalState={modalState}
          closeModalPopUp={closeModalPopUp}
        ></ModalPopUp>
      )}
      {aggregateResult && (
        <ModalPopUp
          AllData={[data]}
          AggregatePendingData={data.pending?.monotainers ? data.pending?.monotainers : data?.pending}
          AggregateRealTimeData={data.real_time_positions?.monotainers ? data.real_time_positions?.monotainers : data?.misplaced}
          AggregateFinalizedData={data.finalized?.monotainers ? data.finalized?.monotainers : data?.finalized}
          AggregateProcessedData={data.processed?.monotainers ? data.processed?.monotainers : data?.processed}
          modalState={aggregateResult}
          closeModalPopUp={closeModalPopUp}
        ></ModalPopUp>
      )}
    </Fragment>
  );
}
