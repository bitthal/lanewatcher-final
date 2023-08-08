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
// Create a Skeleton component
const Skeleton = () => (
  <div className="animate-pulse bg-gray-200 h-8 rounded-md m-4 "></div>
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
    },
  });
  const { drpdwnVaue } = useContext(value_data);
  const [show, setShow] = useState(true);
  const [showAddField, setShowAddField] = useState(false);
  const [selectedSiteId, setSelectedSiteId] = useState("");
  const [tableData, setTableDate] = useState("");
  const [inputFields, setInputFields] = useState([{ email: " " }]);
  const [resetloading, setLoading] = useState(false);
  const sortIcons = {
    asc: <FaSortUp className="inline" />,
    desc: <FaSortDown className="inline" />,
    none: <FaSort className="inline" />,
  };

  function handleChange(event) {
    setSelectedSiteId(drpdwnVaue[event.target.value]);
    let payloadValue = drpdwnVaue[event.target.value];
    getEmailListHandler(payloadValue);
  }
  async function getEmailListHandler(payload) {
    const site_id = payload
      ? payload.site_id
      : drpdwnVaue
      ? drpdwnVaue[2].site_id
      : "";
    const camera_id = payload
      ? Object.values(payload.camera_id).toString()
      : drpdwnVaue
      ? Object.values(drpdwnVaue[2].camera_id).toString()
      : "";
    await axios
      .post(`${process.env.NEXT_PUBLIC_GETEMAILS_API_URL}`, null, {
        params: {
          site_id,
          camera_id,
        },
      })
      .then((response) => {
        setTableDate(response.data.result);
      });
  }

  const deleteEmailHandler = (emailId) => {
    console.log(emailId[0].Email,'em')
    const id = emailId[0].Email.split(" ")[0];
    axios
      .post(`${process.env.NEXT_PUBLIC_DELETEEMAIL_API_URL}`, null, {
        params: {
          id,
        },
      })
      .then();
  };
  const AddEmailHandler = (emailId) => {
    const site_id =
      selectedSiteId && selectedSiteId.site_id
        ? selectedSiteId.site_id
        : drpdwnVaue[2].site_id;
    const camera_id =
      selectedSiteId && Object.values(selectedSiteId.camera_id).toString()
        ? Object.values(selectedSiteId.camera_id).toString()
        : Object.values(drpdwnVaue[2].camera_id).toString();
    const email = emailId;
    axios
      .post(`${process.env.NEXT_PUBLIC_ADDEMAIL_API_URL}`, null, {
        params: {
          site_id,
          camera_id,
          email,
        },
      })
      .then(() => {
        setTableDate([
          ...sortedItems,
          {
            id: sortedItems.length,
            site_id: site_id,
            camera_id: camera_id,
            Email: emailId,
          },
        ]);
      });
  };

  const addFields = () => {
    setShowAddField(true);
    let newfield = { email: "" };
    setInputFields([newfield]);
  };

  const resetHandler = () => {
    setLoading(true);
    const site_id = drpdwnVaue[2].site_id;
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL_RESET}`, {
        params: {
          site_id,
        },
      })
      .then((response) => {
        setLoading(false);
      });
  };
  const cancelHandler = () => {
    reset();
    setShowAddField(false);
  };
  const onSubmit = (data) => {
    const email = data.email;
    const phone = data.country + "-" + data.phone;
    const combinedValue = `${email}, ${phone}`;
    // Call your AddEmailHandler function with the combined value
    AddEmailHandler(combinedValue);
    setShowAddField(false);
    reset();
  };
  const removeFields = (index) => {
    let data = [...tableData];
    // setTableDate(tableData[index - 1]);
    // deleteEmailHandler(tableData[index]);
    let tableDatad = [data[index - 1]]
    let deletData = data.splice(index, 1)
    console.log(data,'bb',tableDatad,'ww',deletData)
    setTableDate(tableDatad);
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
  // State for pagination
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  // Calculate pagination range
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableData?.slice(indexOfFirstItem, indexOfLastItem);
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
    handleSort(column);
  };

  // Apply sorting to the data
  const sortedItems = [...currentItems].sort((a, b) => {
    console.log(a[sortColumn], "s");
    const compareResult =
      sortDirection === "asc"
        ? a[sortColumn].localeCompare(b[sortColumn])
        : b[sortColumn].localeCompare(a[sortColumn]);
    return compareResult;
  });
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
                  defaultValue={2}
                >
                  {drpdwnVaue.map((option, index) => (
                    <option key={option.camera_id} value={index}>
                      {option.site_id}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="mt-6 bg-white text-red-800 border-red-800 font-semibold hover:text-red-800 py-2 px-4 border hover:border-transparent-800 rounded h-10 flex items-center gap-2"
                onClick={() => resetHandler()}
              >
                Reset
                <i className="fas fa-sync-alt text-red-800"></i>
              </button>
            </div>
          )}
          <div>
            <div className="flex flex-col">
              <div className="overflow-x-auto">
                <div className="p-1.5 w-full inline-block align-middle">
                  <div className="overflow-hidden border rounded-lg">
                    {resetloading ? (
                      // Skeleton Loader while resetting
                      <div>
                        <Skeleton />
                      </div>
                    ) : (
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-indigo-800">
                          <tr className="">
                            <th
                              scope="col"
                              className="px-6 py-3 text-xs font-bold text-center text-white uppercase "
                              onClick={() => handleSorting("id")}
                            >
                              ID {getSortIcon("id")}
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-xs font-bold text-center text-white uppercase "
                              onClick={() => handleSorting("site_id")}
                            >
                              SITE ID {getSortIcon("site_id")}
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-xs font-bold text-center text-white uppercase "
                              onClick={() => handleSorting("Email")}
                            >
                              Email {getSortIcon("Email")}
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-xs font-bold text-center text-white uppercase "
                              onClick={() => handleSorting("Email")}
                            >
                              Phone {getSortIcon("Email")}
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-xs font-bold text-center text-white uppercase "
                            >
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white-100">
                          {tableData && tableData.length > 0 ? (
                            sortedItems?.map((data, index) => {
                              return (
                                <tr>
                                  <td className="px-6 py-4 text-sm text-center font-medium text-gray-800 whitespace-nowrap">
                                    {index}
                                  </td>
                                  <td className="px-6 py-4 text-sm text-center font-medium text-gray-800 whitespace-nowrap">
                                    {data.site_id}
                                  </td>
                                  <td className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap">
                                    {data.Email.split(",")[0].trim()}
                                  </td>
                                  <td className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap">
                                    {data.Email.split(",")[1]?.trim()}
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
                    )}
                  </div>
                  <div className="flex">
                    <button
                      className="mt-10 mb-10 mr-20 bg-transparent hover:bg-indigo-800 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded h-10"
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
                                    className="w-3/6 my-1 bg-transparent text-blue-800 border-blue-800 hover:bg-indigo-800 hover:text-white bg-indigo-800 font-semibold py-2 px-4 border hover:border-transparent"
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuth(Settings);
