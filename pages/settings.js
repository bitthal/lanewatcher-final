import { useState,useEffect } from "react";
import Leftbar from "@/components/Leftbar";
import Header from "@/components/Header";
import axios from "axios";

export default function Settings({ }) {
  const options = [
    { site_id: "9", camera_id: "l7yhyjg" },
    { site_id: "13", camera_id: "f332sd#341" },
    { site_id: "14", camera_id: "f332sd#343" },
    { site_id: "15", camera_id: "f332sd#344" },
  ];    
  const [show, setShow] = useState(true);
  const [showAddField, setShowAddField] = useState(false);
  const [siteId, setSiteId] = useState("");
  const [tableData, setTableDate] = useState("");
  const [inputFields, setInputFields] = useState([{ email: "" }]);

  function handleChange(e) {
    setSiteId(options[e.target.value]);
    getEmailListHandler(options[e.target.value]);
  }

  const getEmailListHandler = (payload) => {
    const site_id = payload ? payload.site_id : options[0].site_id;
    const camera_id = payload ? payload.camera_id : options[0].camera_id;
    axios
      .post(`${process.env.NEXT_PUBLIC_GETEMAILS_API_URL}`, null, {
        params: {
          site_id,
          camera_id,
        },
      })
      .then((response) => {
        setTableDate(response.data.result);
      });
  };
  const deleteEmailHandler = (emailId) => {
    const site_id = emailId.site_id;
    const camera_id = emailId.camera_id;
    const email = emailId.Email;
    axios
      .post(`${process.env.NEXT_PUBLIC_DELETEEMAIL_API_URL}`, null, {
        params: {
          site_id,
          camera_id,
          email
        },
      })
      .then((response) => {
      });
  };
  const AddEmailHandler = (emailId) => {
    const site_id = 9;
    const camera_id = 'l7yhyjg';
    const email = emailId
    axios
      .post(`${process.env.NEXT_PUBLIC_ADDEMAIL_API_URL}`, null, {
        params: {
          site_id,
          camera_id,
          email
        },  
      })
      .then((response) => {
        setTableDate([...tableData,{id:tableData.length,site_id:site_id,camera_id:camera_id,Email:emailId}]);
      });
  };
  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
 }
  const addFields = () => {
    setShowAddField(true);
    let newfield = { email: "" };
    setInputFields([newfield]);
  };
  const submit = (event) => {
    setShowAddField(false);
    event.preventDefault();
    AddEmailHandler(event.target.email.value)
  };
  const removeFields = (index) => {
    let data = [...tableData];
    data.splice(index, 1);
    setTableDate(data);
    deleteEmailHandler(data[index-1])
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
         await getEmailListHandler();
      } catch (error) {
        console.error("Error:", error);
      }
    };
    return ()=>{
      fetchData();
    };
  }, []);
  return (
    <>
      <div className="flex gap-4  my-3 mr-3   min-h-[950px] ">
        <Leftbar show={show} />

        <div className={`w-full  ${show ? "max-w-[90vw]" : "max-w-[95vw]"}`}>
          <div className={` w-full`}>
            <Header />
          </div>
          <div className="relative lg:max-w-sm mt-10 mb-10 mr-20 ">
            <label> <h1>Select Site ID's</h1></label>
            <select
              className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm  appearance-none focus:border-indigo-600 cursor-pointer"
              onChange={handleChange}
            >
              {options.map((option, index) => (
                <option key={option.camera_id} value={index}>
                  {option.camera_id}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className="flex flex-col">
              <div className="overflow-x-auto">
                <div className="p-1.5 w-full inline-block align-middle">
                  <div className="overflow-hidden border rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                          >
                            ID
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                          >
                            SITE ID
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                          >
                            Email
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                          >
                           
                              Action
                            
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                    {tableData && tableData?.map((data,index) => {
                              return (
                                <tr>
                                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                  {index}
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                  {data.site_id}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                  {data.Email}
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                            <button
                              className="bg-transparent hover:bg-red-300 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                              onClick={() => removeFields(index)}
                            >
                              Delete
                            </button>
                          </td>
                              </tr>
                              )
                            })
                            }                                                  
                      </tbody>
                    </table>
                  </div>
                  <button
                    className="mt-10 mb-10 mr-20 bg-transparent hover:bg-blue-200 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    onClick={addFields}
                  >
                    Add
                  </button>
                </div>
                {showAddField && 
                <div >
                <form onSubmit={submit}>
                  {inputFields.map((input, index) => {
                    return (
                      <div key={index} className="inline-flex">
                        <input
                          className="w-128 pr-4 py-2 block border-gray-400 border-opacity-100 border-gray-400 border px-2 focus-visible:none"
                          name="email"
                          id="email"
                          placeholder="Email"
                          value={input.email}
                          onChange={(event) => handleFormChange(index, event)}
                        />
                        <button className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border hover:border-transparent" type="submit">Submit</button>
                      </div>
                      
                    );
                  })}
                  
                </form>
                
                </div>
                }
           </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
