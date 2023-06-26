/* eslint-disable react/jsx-key */
import React, { useState, useEffect, useContext } from "react";
import Leftbar from "@/components/Leftbar";
import Header2 from "@/components/Header2";
import axios from "axios";
import { value_data } from "@/context/context";
import { useForm } from "react-hook-form";

export default function Settings({}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: ""
    }
  });

  const [show, setShow] = useState(true);
  const [showAddField, setShowAddField] = useState(false);
  const [selectedSiteId, setSelectedSiteId] = useState("");
  const [tableData, setTableDate] = useState("");
  const [inputFields, setInputFields] = useState([{ email: " " }]);

  function handleChange(event) {
    setSelectedSiteId(drpdwnVaue[event.target.value]);
    let payloadValue = drpdwnVaue[event.target.value];
    getEmailListHandler(payloadValue);
  }
  const { drpdwnVaue } = useContext(value_data);

  async function getEmailListHandler(payload) {
    const site_id = payload
      ? payload.site_id
      : drpdwnVaue
      ? drpdwnVaue[0].site_id
      : "";
    const camera_id = payload
      ? Object.values(payload.camera_id).toString()
      : drpdwnVaue
      ? Object.values(drpdwnVaue[0].camera_id).toString()
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
    const site_id = emailId.site_id;
    const camera_id = emailId.camera_id;
    const email = emailId.Email;
    axios
      .post(`${process.env.NEXT_PUBLIC_DELETEEMAIL_API_URL}`, null, {
        params: {
          site_id,
          camera_id,
          email,
        },
      })
      .then();
  };
  const AddEmailHandler = (emailId) => {
    const site_id =
      selectedSiteId && selectedSiteId.site_id
        ? selectedSiteId.site_id
        : drpdwnVaue[0].site_id;
    const camera_id =
      selectedSiteId && Object.values(selectedSiteId.camera_id).toString()
        ? Object.values(selectedSiteId.camera_id).toString()
        : Object.values(drpdwnVaue[0].camera_id).toString();
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
          ...tableData,
          {
            id: tableData.length,
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

  const cancelHandler = () => {
    reset();
    setShowAddField(false);
  }
  const onSubmit = (data) => {
    AddEmailHandler(data.email);
    setShowAddField(false);
    reset();
  };
  const removeFields = (index) => {
    let data = [...tableData];
    data.splice(index, 1);
    setTableDate(data);
    deleteEmailHandler(data[index - 1]);
  };

  useEffect(() => {
    if (drpdwnVaue.length > 0) {
      const fetchData = async () => {
        try {
          await getEmailListHandler();
        } catch (error) {
          console.error("Error:", error);
        }
      };
      return () => {
        fetchData();
      };
    }
  }, [drpdwnVaue]);

  return (
    <>
      <div className="flex gap-4 my-3 mr-3 h-auto">
        <Leftbar show={show} />
        <div className={`w-full  ${show ? "max-w-[90vw]" : "max-w-[95vw]"}`}>
          <div className={` w-full`}>
            <Header2
              setShow={setShow}
              show={show}
              showSearchBar={false}
              showDatePicker={false}
            />
          </div>
          {drpdwnVaue && (
            <div className="relative lg:max-w-sm mt-10 mb-10 mr-20 ">
              <label>
                {" "}
                <h1>
                  Select Site ID's <span>(Settings)</span>:
                </h1>
              </label>
              <select
                className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm  appearance-none focus:border-indigo-600 cursor-pointer"
                onChange={handleChange}
              >
                {drpdwnVaue.map((option, index) => (
                  <option key={option.camera_id} value={index}>
                    {option.site_id}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div>
            <div className="flex flex-col">
              <div className="overflow-x-auto">
                <div className="p-1.5 w-full inline-block align-middle">
                  <div className="overflow-hidden border rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-indigo-800">
                        <tr className="">
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-bold text-center text-white uppercase "
                          >
                            ID
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-bold text-center text-white uppercase "
                          >
                            SITE ID
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-bold text-center text-white uppercase "
                          >
                            Email
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
                        {tableData &&
                          tableData?.map((data, index) => {
                            return (
                              <tr>
                                <td className="px-6 py-4 text-sm text-center font-medium text-gray-800 whitespace-nowrap">
                                  {index}
                                </td>
                                <td className="px-6 py-4 text-sm text-center font-medium text-gray-800 whitespace-nowrap">
                                  {data.site_id}
                                </td>
                                <td className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap">
                                  {data.Email}
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
                          })}
                      </tbody>
                    </table>
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
                                <h1 className="text-sm font-medium text-gray-800 whitespace-nowrap">
                                  Add new email :{" "}
                                </h1>
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
                                  <button
                                    className="w-3/6 bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border hover:border-transparent animate-pulse"
                                    type="submit"
                                  >
                                    Submit
                                  </button>
                                  <button
                                    className="w-3/6 bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border hover:border-transparent animate-pulse"
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
