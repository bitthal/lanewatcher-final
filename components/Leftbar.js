import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Tooltip } from "./View/Tooltip";
import { useRouter } from "next/router";

export default function Leftbar({ show, setShow }) {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };
  return (
    <div
  className={`sidebar border rounded-r-xl shadow-xl  ${
    !show ? "w-40 transform -translate-x-0" : "w-20 transform -translate-x-50"
  } border rounded-r-xl shadow-xl pt-5`}
>
      <div className="flex justify-center gap-2">
        <div className="w-fit flex text-2xl gap-2">
          <div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="form-toggle-checkbox hidden"
                checked={show}
                onChange={() => {
                  setShow(!show);
                }}
              />
              <span className="form-toggle-label relative h-8 w-16">
                <span className="flex items-center justify-center text-indigo-900">
                  {show ? (
                    <i class="fas fa-play absolute"></i>
                    
                  ) : (
                    <i class="fas fa-play fa-flip-horizontal absolute left-28 "></i>
                  )}
                </span>
              </span>
            </label>
          </div>
          <div className="flex relative top-8 right-10 justify-content">
            <div className="w-2 h-2 rounded-full bg-red-800 m-1"></div>
            <div className="w-2 h-2 rounded-full bg-green-700 m-1"></div>
            <div className="w-2 h-2 rounded-full bg-indigo-800 m-1"></div>
          </div>
        </div>
      </div>
      <Link href="/tracker">
        <Image
          src="/logo.png"
          alt="Logo"
          width={50}
          height={50}
          className={`flex relative justify-content ${
            show ? "top-8 left-0 right-10" : "top-8 left-12 right-10"
          } transition-transform duration-300`}
        />
      </Link>
      <div className="h-auto flex flex-col justify-between inline">
        <div className="flex flex-col mt-10">
          <div
            className={`cursor-pointer flex items-center p-5 gap-2 inline sidebar-entry ${
              router.pathname == "/dashboard"
                ? "bg-indigo-800"
                : "bg-transparent"
            }`}
          >
            <Tooltip message="Dashboard">
              <Link href="/dashboard" className={`${!show ? "w-32" : ""}`}>
                <div className="flex items-center" style={{ lineHeight: "0" }}>
                <svg
                  className="inline"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 10H7C7.26522 10 7.51957 9.89464 7.70711 9.70711C7.89464 9.51957 8 9.26522 8 9V1C8 0.734784 7.89464 0.48043 7.70711 0.292893C7.51957 0.105357 7.26522 0 7 0H1C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1V9C0 9.26522 0.105357 9.51957 0.292893 9.70711C0.48043 9.89464 0.734784 10 1 10ZM0 17C0 17.2652 0.105357 17.5196 0.292893 17.7071C0.48043 17.8946 0.734784 18 1 18H7C7.26522 18 7.51957 17.8946 7.70711 17.7071C7.89464 17.5196 8 17.2652 8 17V13C8 12.7348 7.89464 12.4804 7.70711 12.2929C7.51957 12.1054 7.26522 12 7 12H1C0.734784 12 0.48043 12.1054 0.292893 12.2929C0.105357 12.4804 0 12.7348 0 13V17ZM10 17C10 17.2652 10.1054 17.5196 10.2929 17.7071C10.4804 17.8946 10.7348 18 11 18H17C17.2652 18 17.5196 17.8946 17.7071 17.7071C17.8946 17.5196 18 17.2652 18 17V10C18 9.73478 17.8946 9.48043 17.7071 9.29289C17.5196 9.10536 17.2652 9 17 9H11C10.7348 9 10.4804 9.10536 10.2929 9.29289C10.1054 9.48043 10 9.73478 10 10V17ZM11 7H17C17.2652 7 17.5196 6.89464 17.7071 6.70711C17.8946 6.51957 18 6.26522 18 6V1C18 0.734784 17.8946 0.48043 17.7071 0.292893C17.5196 0.105357 17.2652 0 17 0H11C10.7348 0 10.4804 0.105357 10.2929 0.292893C10.1054 0.48043 10 0.734784 10 1V6C10 6.26522 10.1054 6.51957 10.2929 6.70711C10.4804 6.89464 10.7348 7 11 7Z"
                    fill={router.pathname == "/dashboard" ? "#fff" : "#9b2c2c"}
                  />
                </svg>
                {!show && (
                  <span
                    className={
                      router.pathname == "/dashboard"
                        ? "text-white font-bold p-0.5 m-2"
                        : "text-red-800 font-bold p-0.5 m-2"
                    }
                  >
                    Dashboard
                  </span>
                )}
                </div>
                
              </Link>
            </Tooltip>
          </div>

          <div
            className={`cursor-pointer flex items-center p-5 gap-2 inline sidebar-entry ${
              router.pathname == "/shipment"
                ? "bg-indigo-800"
                : "bg-transparent"
            }`}
          >
            <Tooltip message="Shipment">
              <Link href="/shipment" className="">
              <div className="flex items-center" style={{ lineHeight: "0" }}>
                <svg
                  className="inline"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.615 0.359975L22.6815 4.52097C23.4975 4.99497 23.9985 5.86648 24 6.80997V14.325C24 14.7896 23.8781 15.246 23.6465 15.6487C23.4148 16.0515 23.0816 16.3864 22.68 16.62L11.0505 23.4015L11.0475 23.403C10.6432 23.6373 10.1843 23.7606 9.717 23.7606C9.24975 23.7606 8.79078 23.6373 8.3865 23.403L1.3095 19.275C0.910493 19.042 0.579579 18.7084 0.349797 18.3075C0.120015 17.9067 -0.000596847 17.4525 2.22079e-06 16.9905V9.43797C2.22079e-06 8.98197 0.117002 8.54097 0.330002 8.15547L0.336002 8.14797L0.351002 8.11948C0.576002 7.72648 0.904502 7.39047 1.311 7.15497L12.9615 0.358475C13.3633 0.124182 13.8201 0.000732422 14.2853 0.000732422C14.7504 0.000732422 15.2072 0.124182 15.609 0.358475L15.612 0.359975H15.615ZM14.0955 2.30097L3.3405 8.57397L9.5145 12.156C9.57589 12.1912 9.64545 12.2098 9.71625 12.2098C9.78705 12.2098 9.85661 12.1912 9.918 12.156L20.646 5.93397L14.4735 2.30097C14.416 2.2678 14.3509 2.25033 14.2845 2.25033C14.2181 2.25033 14.153 2.2678 14.0955 2.30097ZM2.4435 17.331L8.5935 20.9205V14.211C8.52298 14.178 8.45392 14.1419 8.3865 14.103L2.25 10.5435V16.9905C2.25 17.133 2.325 17.262 2.4435 17.331ZM15.3435 18.294L17.625 16.9635V10.2885L15.3435 11.6115V18.294ZM11.0475 14.103H11.049C10.983 14.142 10.914 14.1765 10.845 14.2095V20.9175L13.095 19.605V12.915L11.0475 14.103ZM19.875 15.651L21.5475 14.676H21.5505C21.6114 14.6406 21.6619 14.5898 21.697 14.5288C21.732 14.4677 21.7503 14.3984 21.75 14.328V7.89598L19.875 8.98347V15.651Z"
                    fill={router.pathname == "/shipment" ? "#fff" : "#9b2c2c"}
                  />
                </svg>
                {!show && (
                  <span
                    className={
                      router.pathname == "/shipment"
                        ? "text-white font-bold p-0.5 m-2"
                        : "text-red-800 font-bold p-0.5 m-2"
                    }
                  >
                    Shipment
                  </span>
                )}
                </div>
              </Link>
            </Tooltip>
          </div>

          <div
            className={`cursor-pointer flex items-center p-5 gap-2 inline sidebar-entry ${
              router.pathname == "/tracker" ? "bg-indigo-800" : "bg-transparent"
            }`}
          >
            <Tooltip message="Tracker">
              <Link href="/tracker" className={`${!show ? "w-32" : "w-auto"}`}>
              <div className="flex items-center" style={{ lineHeight: "0" }}>
                <svg
                  className="inline"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.75 19.625H12.0684C12.5541 19.1562 13.0763 18.6209 13.5994 18.0191C16.2328 14.9909 17.625 11.7847 17.625 8.75C17.625 6.46251 16.7163 4.26871 15.0988 2.6512C13.4813 1.0337 11.2875 0.125 9 0.125C6.71251 0.125 4.51871 1.0337 2.9012 2.6512C1.2837 4.26871 0.375 6.46251 0.375 8.75C0.375 13.4375 3.57375 17.3694 5.92313 19.625H2.25C1.95163 19.625 1.66548 19.7435 1.4545 19.9545C1.24353 20.1655 1.125 20.4516 1.125 20.75C1.125 21.0484 1.24353 21.3345 1.4545 21.5455C1.66548 21.7565 1.95163 21.875 2.25 21.875H15.75C16.0484 21.875 16.3345 21.7565 16.5455 21.5455C16.7565 21.3345 16.875 21.0484 16.875 20.75C16.875 20.4516 16.7565 20.1655 16.5455 19.9545C16.3345 19.7435 16.0484 19.625 15.75 19.625ZM2.625 8.75C2.625 7.05925 3.29665 5.43774 4.49219 4.24219C5.68774 3.04665 7.30925 2.375 9 2.375C10.6908 2.375 12.3123 3.04665 13.5078 4.24219C14.7034 5.43774 15.375 7.05925 15.375 8.75C15.375 11.8728 13.5 14.6909 11.9344 16.5041C11.0405 17.5308 10.0586 18.4776 9 19.3334C7.94136 18.4776 6.9595 17.5308 6.06562 16.5041C4.5 14.6909 2.625 11.8728 2.625 8.75ZM9 12.875C9.81585 12.875 10.6134 12.6331 11.2917 12.1798C11.9701 11.7266 12.4988 11.0823 12.811 10.3286C13.1232 9.57482 13.2049 8.74542 13.0457 7.94525C12.8866 7.14508 12.4937 6.41008 11.9168 5.83318C11.3399 5.25629 10.6049 4.86342 9.80475 4.70426C9.00458 4.5451 8.17518 4.62679 7.42143 4.939C6.66769 5.25121 6.02345 5.77992 5.57019 6.45827C5.11693 7.13663 4.875 7.93415 4.875 8.75C4.87624 9.84364 5.31124 10.8921 6.08455 11.6654C6.85787 12.4388 7.90636 12.8738 9 12.875ZM9 6.875C9.37084 6.875 9.73335 6.98497 10.0417 7.19099C10.35 7.39702 10.5904 7.68986 10.7323 8.03247C10.8742 8.37508 10.9113 8.75208 10.839 9.1158C10.7666 9.47951 10.588 9.8136 10.3258 10.0758C10.0636 10.338 9.72951 10.5166 9.3658 10.589C9.00208 10.6613 8.62508 10.6242 8.28247 10.4823C7.93986 10.3404 7.64702 10.1 7.44099 9.79169C7.23497 9.48335 7.125 9.12084 7.125 8.75C7.125 8.25272 7.32254 7.77581 7.67417 7.42417C8.02581 7.07254 8.50272 6.875 9 6.875Z"
                    fill={router.pathname == "/tracker" ? "#fff" : "#9b2c2c"}
                  />
                </svg>
                {!show && (
                  <span
                    className={
                      router.pathname == "/tracker"
                        ? "text-white font-bold p-0.5 m-2"
                        : "text-red-800 font-bold p-0.5 m-2"
                    }
                  >
                    Tracker
                  </span>
                )}
                </div>
              </Link>
            </Tooltip>
          </div>
          <div
            className={`cursor-pointer flex items-center p-5 gap-2 inline sidebar-entry ${
              router.pathname == "/settings"
                ? "bg-indigo-800"
                : "bg-transparent"
            }`}
          >
            <Tooltip message="Settings">
              <Link
                href="/settings"
                className={`${!show ? "w-auto" : "w-auto"}`}
              >
              <div className="flex items-center" style={{ lineHeight: "0" }}>
                <svg
                  className="inline"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                    fill={router.pathname == "/settings" ? "#fff" : "#9b2c2c"}
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>

                {!show && (
                  <span
                    className={
                      router.pathname == "/settings"
                        ? "text-white font-bold p-0.5 m-2"
                        : "text-red-800 font-bold p-0.5 m-2"
                    }
                  >
                    Settings
                  </span>
                )}
                </div>
              </Link>
            </Tooltip>
          </div>
          <div
            className={`cursor-pointer flex items-center p-5 gap-2 inline sidebar-entry ${
              router.pathname == "/alerts" ? "bg-indigo-800" : "bg-transparent"
            }`}
          >
            <Tooltip message="Alerts">
              <Link href="/alerts" className={`${!show ? "w-32" : "w-auto"}`}>
              <div className="flex items-center" style={{ lineHeight: "0" }}>
                <svg
                  className="inline"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
                    fill={router.pathname == "/alerts" ? "#fff" : "#9b2c2c"}
                  ></path>
                </svg>
                {!show && (
                  <span
                    className={
                      router.pathname == "/alerts"
                        ? "text-white font-bold p-0.5 m-2"
                        : "text-red-800 font-bold p-0.5 m-2"
                    }
                  >
                    Alerts
                  </span>
                )}
                </div>
              </Link>
            </Tooltip>
          </div>
          <div
            className={`cursor-pointer flex items-center p-5 gap-2 inline sidebar-entry ${
              router.pathname == "/monotainers"
                ? "bg-indigo-800"
                : "bg-transparent"
            }`}
          >
            <Tooltip message="Monotainers">
              <Link
                href="/monotainers"
                className={`${!show ? "w-32 " : "w-auto "}`}
              >
              <div className="flex items-center" style={{ lineHeight: "0" }}>
                <svg
                  className="inline"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 0C8.8174 0 5.76515 1.26428 3.51472 3.51472C1.26428 5.76515 0 8.8174 0 12C0 15.1826 1.26428 18.2348 3.51472 20.4853C5.76515 22.7357 8.8174 24 12 24C15.1826 24 18.2348 22.7357 20.4853 20.4853C22.7357 18.2348 24 15.1826 24 12C24 8.8174 22.7357 5.76515 20.4853 3.51472C18.2348 1.26428 15.1826 0 12 0ZM4.911 7.089H16.367C16.9429 7.09739 17.4925 7.33159 17.8974 7.7412C18.3023 8.1508 18.5302 8.70303 18.532 9.279V15.142C18.523 15.7167 18.2908 16.2653 17.8845 16.6718C17.4782 17.0782 16.9297 17.3107 16.355 17.32H8.04C6.866 17.32 6 16.33 6 15.142V10.503L4.503 7.905C4.193 7.485 4.453 7.089 4.911 7.089ZM8.326 9.279C7.979 9.279 7.646 9.489 7.646 9.823C7.646 10.157 7.979 10.367 8.326 10.367H16.231C16.577 10.367 16.911 10.157 16.911 9.823C16.911 9.489 16.577 9.278 16.231 9.278L8.326 9.279ZM8.326 11.456C7.979 11.456 7.646 11.666 7.646 12C7.646 12.334 7.979 12.544 8.326 12.544H16.231C16.577 12.544 16.911 12.334 16.911 12C16.911 11.666 16.577 11.456 16.231 11.456H8.326ZM8.313 13.646C7.967 13.646 7.633 13.856 7.633 14.19C7.633 14.524 7.967 14.734 8.313 14.734H14.041C14.388 14.734 14.721 14.524 14.721 14.19C14.721 13.856 14.388 13.645 14.041 13.645L8.313 13.646Z"
                    fill={
                      router.pathname == "/monotainers" ? "#fff" : "#9b2c2c"
                    }
                  />
                </svg>
                {!show && (
                  <span
                    className={
                      router.pathname == "/monotainers"
                        ? "text-white font-bold p-0.5 m-2"
                        : "text-red-800 font-bold p-0.5 m-2"
                    }
                  >
                    Monotaine
                  </span>
                )}
                </div>
              </Link>
            </Tooltip>
          </div>

          <div
            className={`cursor-pointer flex items-center p-5 gap-2 inline sidebar-entry ${
              router.pathname == "/analysis"
                ? "bg-indigo-800"
                : "bg-transparent"
            }`}
          >
            <Tooltip message="Analysis">
              <Link
                href="/analysis"
                className={`${!show ? "w-32 " : "w-auto "}`}
              >
              <div className="flex items-center" style={{ lineHeight: "0" }}>
                <svg
                  className="inline"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.591 15L18.189 19.5H16.458L13.86 15H10.149L7.551 19.5H5.82L8.418 15H3.75C3.55109 15 3.36032 14.921 3.21967 14.7803C3.07902 14.6397 3 14.4489 3 14.25V1.5H1.5C1.30109 1.5 1.11032 1.42098 0.96967 1.28033C0.829018 1.13968 0.75 0.948912 0.75 0.75C0.75 0.551088 0.829018 0.360322 0.96967 0.21967C1.11032 0.0790178 1.30109 0 1.5 0H22.5C22.6989 0 22.8897 0.0790178 23.0303 0.21967C23.171 0.360322 23.25 0.551088 23.25 0.75C23.25 0.948912 23.171 1.13968 23.0303 1.28033C22.8897 1.42098 22.6989 1.5 22.5 1.5H21V14.25C21 14.4489 20.921 14.6397 20.7803 14.7803C20.6397 14.921 20.4489 15 20.25 15H15.591ZM19.5 1.5H4.5V13.5H19.5V1.5ZM8.25 7.5C8.44891 7.5 8.63968 7.57902 8.78033 7.71967C8.92098 7.86032 9 8.05109 9 8.25V9.75C9 9.94891 8.92098 10.1397 8.78033 10.2803C8.63968 10.421 8.44891 10.5 8.25 10.5C8.05109 10.5 7.86032 10.421 7.71967 10.2803C7.57902 10.1397 7.5 9.94891 7.5 9.75V8.25C7.5 8.05109 7.57902 7.86032 7.71967 7.71967C7.86032 7.57902 8.05109 7.5 8.25 7.5ZM12 6C12.1989 6 12.3897 6.07902 12.5303 6.21967C12.671 6.36032 12.75 6.55109 12.75 6.75V9.75C12.75 9.94891 12.671 10.1397 12.5303 10.2803C12.3897 10.421 12.1989 10.5 12 10.5C11.8011 10.5 11.6103 10.421 11.4697 10.2803C11.329 10.1397 11.25 9.94891 11.25 9.75V6.75C11.25 6.55109 11.329 6.36032 11.4697 6.21967C11.6103 6.07902 11.8011 6 12 6ZM15.75 4.5C15.9489 4.5 16.1397 4.57902 16.2803 4.71967C16.421 4.86032 16.5 5.05109 16.5 5.25V9.75C16.5 9.94891 16.421 10.1397 16.2803 10.2803C16.1397 10.421 15.9489 10.5 15.75 10.5C15.5511 10.5 15.3603 10.421 15.2197 10.2803C15.079 10.1397 15 9.94891 15 9.75V5.25C15 5.05109 15.079 4.86032 15.2197 4.71967C15.3603 4.57902 15.5511 4.5 15.75 4.5Z"
                    fill={router.pathname == "/analysis" ? "#fff" : "#9b2c2c"}
                  />
                </svg>
                {!show && (
                  <span
                    className={
                      router.pathname == "/analysis"
                        ? "text-white font-bold p-0.5 m-2"
                        : "text-red-800 font-bold p-0.5 m-2"
                    }
                  >
                    Analysis
                  </span>
                )}
                </div>
              </Link>
            </Tooltip>
          </div>

          <div
            className={`cursor-pointer flex items-center p-5 gap-2 inline sidebar-entry ${
              router.pathname == "/support" ? "bg-indigo-800" : "bg-transparent"
            }`}
          >
            <Tooltip message="Support">
              <Link
                href="/support"
                className={`${!show ? "w-32 " : "w-auto "}`}
              >
              <div className="flex items-center" style={{ lineHeight: "0" }}>
                <svg
                  className="inline"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.5 12.625C15.5 12.0283 15.2629 11.456 14.841 11.034C14.419 10.6121 13.8467 10.375 13.25 10.375H2.75C2.15326 10.375 1.58097 10.6121 1.15901 11.034C0.737053 11.456 0.5 12.0283 0.5 12.625V13.375C0.5 16.3315 3.29 19.375 8 19.375C12.71 19.375 15.5 16.3315 15.5 13.375V12.625ZM2 12.625C2 12.4261 2.07902 12.2353 2.21967 12.0947C2.36032 11.954 2.55109 11.875 2.75 11.875H13.25C13.4489 11.875 13.6397 11.954 13.7803 12.0947C13.921 12.2353 14 12.4261 14 12.625V13.375C14 15.532 11.852 17.875 8 17.875C4.148 17.875 2 15.532 2 13.375V12.625ZM12.125 4.75002C12.1251 3.86074 11.8377 2.99525 11.3058 2.28257C10.774 1.56988 10.026 1.04817 9.17346 0.795188C8.32092 0.542209 7.40946 0.571514 6.57493 0.878735C5.7404 1.18596 5.02751 1.75464 4.5425 2.50002H2C1.80109 2.50002 1.61032 2.57904 1.46967 2.71969C1.32902 2.86034 1.25 3.05111 1.25 3.25002V6.25002C1.25 6.27402 1.25 6.29652 1.253 6.31902H1.25V7.75002C1.25 8.34676 1.48705 8.91905 1.90901 9.34101C2.33097 9.76297 2.90326 10 3.5 10H4.0805C4.23509 9.99992 4.38715 9.96085 4.52264 9.88642C4.65813 9.81199 4.77266 9.7046 4.85566 9.57418C4.93865 9.44377 4.98742 9.29453 4.99747 9.14027C5.00752 8.98601 4.97851 8.83171 4.91313 8.69163C4.84775 8.55155 4.74811 8.43022 4.62342 8.33884C4.49873 8.24747 4.35301 8.18901 4.19975 8.16886C4.04648 8.14871 3.89061 8.16754 3.74654 8.22358C3.60247 8.27963 3.47486 8.37109 3.3755 8.48952C3.20065 8.46008 3.04188 8.36965 2.92737 8.23428C2.81286 8.0989 2.75002 7.92733 2.75 7.75002V7.00002H3.125C3.5705 7.00002 3.986 6.86952 4.3355 6.64602C4.76006 7.46747 5.44831 8.12246 6.28977 8.50583C7.13124 8.8892 8.07711 8.97873 8.97556 8.76004C9.87401 8.54136 10.6729 8.02714 11.2441 7.29993C11.8152 6.57272 12.1255 5.6747 12.125 4.75002ZM5.375 4.75002C5.375 4.05383 5.65156 3.38615 6.14384 2.89386C6.63613 2.40158 7.30381 2.12502 8 2.12502C8.69619 2.12502 9.36387 2.40158 9.85616 2.89386C10.3484 3.38615 10.625 4.05383 10.625 4.75002C10.625 5.44621 10.3484 6.11389 9.85616 6.60617C9.36387 7.09846 8.69619 7.37502 8 7.37502C7.30381 7.37502 6.63613 7.09846 6.14384 6.60617C5.65156 6.11389 5.375 5.44621 5.375 4.75002ZM3.875 4.75002C3.875 4.94893 3.79598 5.1397 3.65533 5.28035C3.51468 5.421 3.32391 5.50002 3.125 5.50002H2.75V4.00002H3.875V4.75002Z"
                    fill={router.pathname == "/support" ? "#fff" : "#9b2c2c"}
                  />
                </svg>
                {!show && (
                  <span
                    className={
                      router.pathname == "/support"
                        ? "text-white font-bold p-0.5 m-2"
                        : "text-red-800 font-bold p-0.5 m-2"
                    }
                  >
                    Support
                  </span>
                )}
                </div>
              </Link>
            </Tooltip>
          </div>

          <div
            className={`cursor-pointer flex items-center p-5 gap-2 inline sidebar-entry ${
              router.pathname == "/logout" ? "bg-indigo-800" : "bg-transparent"
            }`}
          >
            <Tooltip message="Logout">
              <Link
                href="/"
                className={`${!show ? "w-32 " : "w-auto "}`}
                onClick={handleLogout}
              >
              <div className="flex items-center" style={{ lineHeight: "0" }}>
                <svg
                  className="inline"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3 0C2.20435 0 1.44129 0.316071 0.87868 0.87868C0.316071 1.44129 0 2.20435 0 3V17C0 17.7956 0.316071 18.5587 0.87868 19.1213C1.44129 19.6839 2.20435 20 3 20H9C9.79565 20 10.5587 19.6839 11.1213 19.1213C11.6839 18.5587 12 17.7956 12 17V3C12 2.20435 11.6839 1.44129 11.1213 0.87868C10.5587 0.316071 9.79565 0 9 0H3ZM13.293 5.293C13.4805 5.10553 13.7348 5.00021 14 5.00021C14.2652 5.00021 14.5195 5.10553 14.707 5.293L18.707 9.293C18.8945 9.48053 18.9998 9.73484 18.9998 10C18.9998 10.2652 18.8945 10.5195 18.707 10.707L14.707 14.707C14.5184 14.8892 14.2658 14.99 14.0036 14.9877C13.7414 14.9854 13.4906 14.8802 13.3052 14.6948C13.1198 14.5094 13.0146 14.2586 13.0123 13.9964C13.01 13.7342 13.1108 13.4816 13.293 13.293L15.586 11H7C6.73478 11 6.48043 10.8946 6.29289 10.7071C6.10536 10.5196 6 10.2652 6 10C6 9.73478 6.10536 9.48043 6.29289 9.29289C6.48043 9.10536 6.73478 9 7 9H15.586L13.293 6.707C13.1055 6.51947 13.0002 6.26516 13.0002 6C13.0002 5.73484 13.1055 5.48053 13.293 5.293Z"
                    fill={router.pathname == "/logout" ? "#fff" : "#9b2c2c"}
                  />
                </svg>
                {!show && (
                  <span
                    className={
                      router.pathname == "/"
                        ? "text-white font-bold p-0.5 m-2"
                        : "text-red-800 font-bold p-0.5 m-2"
                    }
                  >
                    Logout
                  </span>
                )}
				</div>
              </Link>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}
