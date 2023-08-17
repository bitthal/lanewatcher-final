/* eslint-disable react/jsx-key */
import React, { useState, useEffect, useContext } from "react";
import Leftbar from "@/components/Leftbar";
import Header2 from "@/components/Header2";
import axios from "axios";
import { value_data } from "@/context/context";
import { useForm } from "react-hook-form";
import withAuth from "@/utils/withAuth";
import countries from "data/countries.json";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import Toaster from "@/components/Toaster";

// Create a Skeleton component
const Skeleton = () => (
  <div className="flex flex-col min-w-[200px]">
        <div className="animate-pulse h-8 bg-gray-300 rounded w-2/3 mx-auto mb-4"></div>
        <div className="flex flex-col space-y-4">
          <div className="animate-pulse h-4 bg-gray-300 rounded w-full"></div>
          <div className="animate-pulse h-4 bg-gray-300 rounded w-full"></div>
          <div className="animate-pulse h-4 bg-gray-300 rounded w-full"></div>
          <div className="animate-pulse h-4 bg-gray-300 rounded w-full"></div>
          <div className="animate-pulse h-4 bg-gray-300 rounded w-full"></div>
          <div className="animate-pulse h-4 bg-gray-300 rounded w-full"></div>
          {/* Add more skeleton lines for each row */}
    </div>
    </div>
);

function Settings({}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      phone: ""
    },
  });
  const { drpdwnVaue } = useContext(value_data);
  const [show, setShow] = useState(true);
  const [showAddField, setShowAddField] = useState(false);
  const [selectedSiteId, setSelectedSiteId] = useState("");
  const [tableData, setTableData] = useState("");
  const [inputFields, setInputFields] = useState([{ email: " ", phone: " " }]);
  const [resetloading, setLoading] = useState(false);
  const [error, setErrors] = useState(null);

  const sortIcons = {
    asc: <FaSortUp className="inline" />,
    desc: <FaSortDown className="inline" />,
    none: <FaSort className="inline" />,
  };
  const handleCloseToaster = () => {
    setErrors(null); // Clear the toaster message
  };
  function handleChange(event) {
    setSelectedSiteId(drpdwnVaue[event.target.value]);
    let payloadValue = drpdwnVaue[event.target.value];
    getEmailListHandler(payloadValue);
  }
  async function getEmailListHandler(payload) {
    setLoading(true);
    const site_id = payload
      ? payload.site_id
      : drpdwnVaue
      ? drpdwnVaue[0].site_id
      : "";
    const camera_id = "C001"
    // payload
    //   ? Object.values(payload.camera_id).toString()
    //   : drpdwnVaue
    //   ? Object.values(drpdwnVaue[2].camera_id).toString().split(",")[1]
    //   : "";
    await axios
      .post(`${process.env.NEXT_PUBLIC_GETEMAILS_API_URL}`, null, {
        params: {
          site_id,
          camera_id,
        },
      })
      .then((response) => {
        setTableData(response.data.result);
        setLoading(false);
      });
  }

  const deleteEmailHandler = (emailId) => {
    setLoading(true);
    const id = emailId[0].id;
    axios
      .post(`${process.env.NEXT_PUBLIC_DELETEEMAIL_API_URL}`, null, {
        params: {
          id,
        },
      })
      .then(()=>{
        setLoading(false);
      });
  };
  const AddEmailHandler = (emailId, phoneNo) => {
    setLoading(true);
    const site_id =
      selectedSiteId && selectedSiteId.site_id
        ? selectedSiteId.site_id
        : drpdwnVaue[0].site_id;
    const camera_id = "C001";
      // selectedSiteId && Object.values(selectedSiteId.camera_id).toString()
      //   ? Object.values(selectedSiteId.camera_id).toString().split(",")[0]
      //   : Object.values(drpdwnVaue[2].camera_id).toString().split(",")[0];
    const email = emailId;
    const phoneno = phoneNo;
    axios
      .post(`${process.env.NEXT_PUBLIC_ADDEMAIL_API_URL}`, null, {
        params: {
          site_id,
          camera_id,
          email,
          phoneno
        },
      })
      .then(() => {
        setTableData([
          {
            id: tableData.length,
            site_id: site_id,
            camera_id: camera_id,
            emails_list: email,
            phoneno:phoneNo

          },
          ...tableData,
        ]);
      });
      setLoading(false);
  };

  const addFields = () => {
    setShowAddField(true);
    let newfield = { email: "",phoneno: "" };
    setInputFields([newfield]);
  };

  const resetHandler = () => {
    setLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL_RESET}`, {
      })
      .then((response) => {
        setLoading(false);
      }).catch((error) => {
        console.error("API error:", error);
        setLoading(false);
        setErrors("API error")
      });
  };
  const cancelHandler = () => {
    reset();
    setShowAddField(false);
  };
  const onSubmit = (data) => {
    const email = data.email;
    const phone = data.country + "-" + data.phone;
    // Call your AddEmailHandler function with the combined value
    AddEmailHandler(email, phone);
    setShowAddField(false);
    reset();
  };
  const removeFields = (index) => {
    let data = [...tableData];
    let deletData = data.splice(index, 1)
    setTableData(data);
    deleteEmailHandler(deletData);
  };

  const fetchData = async () => {
    try {
      await getEmailListHandler();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (drpdwnVaue.length > 0) {
      fetchData();
    }
  }, [drpdwnVaue]);

  // State for sorting
  const [sortColumn, setSortColumn] = useState("site_id");
  const [sortDirection, setSortDirection] = useState("asc");

  // Calculate pagination range
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };
  

  const getSortIcon = (column) => {
    if (sortColumn === column) {
      return sortIcons[sortDirection];
    }
    return sortIcons.none;
  };

  const handleSorting = (column) => {
    console.log(column,'col')
    handleSort(column);
  };

  // Apply sorting to the data
const sortedItems = [...tableData].sort((a, b) => {
  const compareResult =
    sortDirection === "asc"
      ? a[sortColumn]?.localeCompare(b[sortColumn])
      : b[sortColumn]?.localeCompare(a[sortColumn]);
  return compareResult;
});
  // State for pagination
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
// Calculate pagination range for sorted data
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = sortedItems?.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="flex gap-4 my-3 mr-3 h-auto">
        <Leftbar show={show} setShow={setShow} />
        <div className={`w-full  ${show ? "max-w-[90vw]" : "max-w-[95vw]"}`}>
          <div className={` w-full`}>
            <Header2 show={show} showSearchBar={false} showDatePicker={false} />
          </div>
          {drpdwnVaue && (
            <div className="relative 2xl:max-w-sm mt-10 mb-10 mr-20 justify-between flex">
              <div>
                <label>
                  <h1>
                    Select Site ID's <span>(Settings)</span>:
                  </h1>
                </label>
                <select
                  className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm  appearance-none focus:border-indigo-600 cursor-pointer"
                  onChange={handleChange}
                  defaultValue={0}
                >
                  {drpdwnVaue.map((option, index) => (
                    <option key={option.camera_id} value={index}>
                      {option.site_id}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="bg-[#434190] w-24 rounded-md text-white text-xs h-8 mt-8"
                onClick={() => resetHandler()}
              >
                Reset
                <i className="fas fa-sync-alt text-white ml-2"></i>
              </button>
            </div>
          )}
          {
            resetloading && 
            (
              <Skeleton/>
            )
          }
          <div>
            {!resetloading && <div className="flex flex-col">
              <div className="overflow-x-auto">
                <div className="p-1.5 w-full inline-block align-middle">
                  <div className="overflow-hidden border rounded-lg">
                    
                    
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className=" bg-indigo-900">
                          <tr className="">
                            <th
                              scope="col"
                              className="px-6 py-3 text-xs   text-center text-white uppercase "
                              onClick={() => handleSorting("id")}
                            >
                              ID {getSortIcon("id")}
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-xs   text-center text-white uppercase "
                              onClick={() => handleSorting("site_id")}
                            >
                              SITE ID {getSortIcon("site_id")}
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-xs   text-center text-white uppercase "
                              onClick={() => handleSorting("Email")}
                            >
                              Email {getSortIcon("Email")}
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-xs   text-center text-white uppercase "
                              onClick={() => handleSorting("Phone")}
                            >
                              Phone {getSortIcon("Phone")}
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-xs   text-center text-white uppercase "
                            >
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white-100">
                          {currentItems && currentItems.length > 0 && !resetloading  ? (
                            currentItems?.map((data, index) => {
                              return (
                                <tr>
                                  <td className="px-6 py-4 text-sm text-center font-medium text-gray-800 whitespace-nowrap">
                                    {index}
                                  </td>
                                  <td className="px-6 py-4 text-sm text-center font-medium text-gray-800 whitespace-nowrap">
                                    {data.site_id}
                                  </td>
                                  <td className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap">
                                    {data.emails_list}
                                  </td>
                                  <td className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap">
                                    {data.phoneno}
                                  </td>
                                  <td className="px-6 py-4 text-sm text-center font-medium text-left whitespace-nowrap">
                                    <button
                                      className="bg-transparent hover:bg-red-800 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                                      onClick={() => removeFields(index)}
                                    >
                                      Delete
                                    </button>
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr className="bg-gray-100">
                              <td
                                colSpan="5"
                                className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border border-black text-center"
                              >
                                <p> No data available </p>
                              </td>
                            </tr>
                          )}
                          
                        </tbody>
                        {/* <div className="flex justify-center mt-4">
                          <Pagination
                            itemsPerPage={itemsPerPage}
                            totalItems={tableData.length}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                          />
                        </div> */}
                      </table>
                    
                  </div>
                  <div className="flex">
                    <button
                      className="mt-10 mb-10 mr-20 bg-transparent hover:bg-indigo-900 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded h-10"
                      onClick={addFields}
                    >
                      Add
                    </button>
                    {showAddField && (
                      <div className="my-5 mx-5">
                        <form onSubmit={handleSubmit(onSubmit)}>
                          {inputFields.map((input, index) => {
                            return (
                              <div>
                                {/* <h1 className="text-sm font-medium text-gray-800 whitespace-nowrap">
                                  Add new email :
                                </h1> */}
                                <div key={index}>
                                  <input
                                    className="w-128 pr-4 py-2 block border-gray-400 border-opacity-100 border-gray-400 border px-2 focus-visible:none"
                                    placeholder="Email"
                                    {...register("email", {
                                      required: "Email is required",
                                      pattern: {
                                        value:
                                          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: "Invalid email address",
                                      },
                                    })}
                                  />
                                  {errors.email && (
                                    <p className="text-xs italic text-red-500">
                                      {errors.email.message}
                                    </p>
                                  )}
                                  <div className="flex mt-4 mb-4 border border-gray-400 border-opacity-100">
                                    <div className="">
                                      <select
                                        className="p-1 text-gray-500 bg-white border shadow-sm appearance-none focus:border-indigo-600 cursor-pointer pr-4 py-2"
                                        {...register("country", {
                                          required: "Country is required",
                                        })}
                                      >
                                        <option value="" disabled>
                                          Select Country
                                        </option>
                                        {countries.map((country) => (
                                          <option
                                            key={country.phoneCode}
                                            value={country.phoneCode}
                                          >
                                            <span className="flex items-center">
                                              <img
                                                className="w-5 h-5 mr-2"
                                                src={country.flag}
                                                alt={`${country.name} Flag`}
                                              />
                                              {country.phoneCode} -{" "}
                                              {country.name}
                                            </span>
                                          </option>
                                        ))}
                                      </select>
                                      {errors.country && (
                                        <p className="text-xs italic text-red-500">
                                          {errors.country.message}
                                        </p>
                                      )}
                                    </div>
                                    <input
                                      className="flex-grow px-2  border pr-4 py-2 focus:ring-indigo-600 focus:border-indigo-600"
                                      placeholder="Phone"
                                      type="number"
                                      {...register("phone", {
                                        required: "Phone is required",
                                        // Add your phone number validation pattern here
                                      })}
                                    />
                                  </div>
                                  {errors.country && (
                                    <p className="text-xs italic text-red-500">
                                      {errors.country.message}
                                    </p>
                                  )}
                                  {errors.phone && (
                                    <p className="text-xs italic text-red-500">
                                      {errors.phone.message}
                                    </p>
                                  )}
                                  <button
                                    className="w-3/6 my-1 bg-transparent text-blue-800 border-blue-800 hover:bg-indigo-900 hover:text-white  bg-indigo-900 font-semibold py-2 px-4 border hover:border-transparent"
                                    type="submit"
                                  >
                                    Submit
                                  </button>
                                  <button
                                    className="w-3/6 my-1 bg-transparent text-red-800 border-red-800 hover:bg-red-800 hover:text-white font-semibold py-2 px-4 border hover:border-transparent"
                                    type="reset"
                                    onClick={cancelHandler}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>}
          </div>
        </div>
      </div>
      <Toaster message={error} onClose={handleCloseToaster}/>
    </>
  );
}

export default withAuth(Settings);
