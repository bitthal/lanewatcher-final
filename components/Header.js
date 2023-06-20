import React,{useEffect, useState} from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Header( {setSiteOptions,setSelectedSiteOption}
  ) {
  const router = useRouter().pathname.replace(/\//,'').charAt(0).toUpperCase() + useRouter().pathname.replace(/\//,'').slice(1);

  const [siteId, setSiteID] = useState();
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_SITEID_API_URL}`);
          console.log(response.data.result,'res')
          setSiteID(response.data.result);
          let selectOptions = response.data.result
          setSiteOptions(selectOptions);
        } catch (error) {
          console.error("Error:", error);
        }
      };
      return ()=>{
        fetchData();
      };
    }, []);
    
    const handleChange = (event) =>{
      setSelectedSiteOption(siteId[event.target.value])
      console.log(event.target.value,siteId[event.target.value])
    }
    
  return (
    <div className="w-full rounded-xl shadow-md  p-5 flex justify-between items-center overflow-hidden">
      <div className="flex gap-16 items-center">
        <p className="w-fit text-center font-bold">UST Canada Post</p>
        <p className="w-fit  font-bold text-primary">{router}</p>
      </div>

      <div className="flex items-center gap-6">
       {siteId && <select name="cars" id="cars" className="border-b focus:outline-none" onChange={handleChange}>
        {siteId.map((option,index) => (
                <option key={option.camera_id} value={index}>
                  {option.site_id}
                </option>
              ))}
        </select>}

        <i className="text-2xl fa-solid fa-gear text-primary" />

        <div className="relative ">
          <i className="fa-solid fa-bell text-2xl " />
          <span className=" flex h-3 w-3 absolute top-0 translate-x-1/2 right-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
        </div>

        <div className="flex gap-4 items-center">
          <p className="w-fit font-bold text-primary">Hello, TestUser</p>
          <i className=" text-2xl  fa-solid fa-user"></i>
        </div>
      </div>
    </div>
  );
}
