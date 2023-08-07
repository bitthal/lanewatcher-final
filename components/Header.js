/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState, useContext, Fragment } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import ModalPopUp from "./View/Modal";
import { value_data } from "@/context/context";

export default function Header() {
  const { value, setValue } = useContext(value_data);
  const { drpdwnVaue, setdrpdwnVaue } = useContext(value_data);
  const { loginData } = useContext(value_data);
  const [alertList, setAlerts] = useState("");
  const [modalState, setModalOpen] = useState(false);
  const [apiCalled, setApiCalled] = useState(false);
  const [siteId, setSiteID] = useState();
  const [userName, setUserName] = useState("");
  const router =
    useRouter().pathname.replace(/\//, "").charAt(0).toUpperCase() +
    useRouter().pathname.replace(/\//, "").slice(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SITEID_API_URL}`
        );
        setSiteID(response.data.result);
        setdrpdwnVaue(response.data.result);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    return () => {
      if (
        typeof window !== "undefined" &&
        router !== "" &&
        localStorage.getItem("userData")
      ) {
        setUserName(
          JSON.parse(localStorage.getItem("userData"))
            ? JSON.parse(localStorage.getItem("userData"))?.email
            : loginData?.email
        );
      }
      if (!apiCalled) {
        fetchData();
        setApiCalled(true);
      }
    };
  }, [value]);

  async function getAlertHandler() {
    setModalOpen(true);
    await axios
      .get(`${process.env.NEXT_PUBLIC_ALERTS_API_URL}`, {
        params: {
          site_id: value ? value.site_id : drpdwnVaue[0].site_id,
          // camera_id: value
          //   ? value.site_id
          //   : Object.values(drpdwnVaue[0].camera_id).toString(),
        },
      })
      .then((response) => {
        const mapped = response.data.dlist
          .flatMap(
            ({ alerts, key_str, camera_id, sorting_timestamp, site_id }) =>
              alerts.map((alerts) => ({
                alerts,
                key_str,
                camera_id,
                sorting_timestamp,
                site_id,
              }))
          )
          .filter((data) => {
            return data.alerts.claimed_status === false;
          });
        setAlerts(mapped);
      });
  }
  const handleChange = (event) => {
    setValue(siteId[event.target.value]);
  };
  const closeModalPopUp = (data) => {
    setModalOpen(data);
  };
  return (
    <Fragment>
      <div className="w-full shadow-md p-5 flex justify-between items-center overflow-hidden fixed top-0 z-10  bg-gradient-to-r from-gray-200 to-gray-100">
        <div className="flex gap-16 items-center">
          <Link
            href="/tracker"
            className="w-fit text-center text-red-800 font-bold"
          >
            {/* <p > */}
            UST Canada Post
            {/* </p> */}
          </Link>
          {router !== "404" && (
            <p className="w-fit  font-bold text-red-800">{router}</p>
          )}
        </div>

        {router !== "" && (
          <div className="flex items-center gap-6">
            {siteId && (
              <select
                label="Global Site Selection:-"
                className="w-18 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-transparent focus:border-indigo-600 cursor-pointer"
                onChange={handleChange}
              >
                {siteId.map((option, index) => (
                  <option key={option.camera_id} value={index}>
                    {option.site_id}
                  </option>
                ))}
              </select>
            )}
            <Link href="/settings">
              <i className="text-2xl fa-solid fa-gear text-gray-600" />
            </Link>

            <div className="relative cursor-pointer" onClick={getAlertHandler}>
              <i className="fa-solid fa-bell text-2xl " />
              <span className=" flex h-3 w-3 absolute top-0 translate-x-1/2 right-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-700"></span>
              </span>
            </div>

            <div className="flex gap-4 items-center">
              <p className="w-fit font-bold text-red-800">
                Welcome
                <span className="text-indigo-900">&nbsp;&nbsp;{userName}</span>
              </p>
              <i className=" text-2xl  fa-solid fa-user"></i>
            </div>
          </div>
        )}
      </div>
      {modalState && (
        <ModalPopUp
          alertsTableData={alertList}
          modalState={modalState}
          closeModalPopUp={closeModalPopUp}
        ></ModalPopUp>
      )}
    </Fragment>
  );
}
