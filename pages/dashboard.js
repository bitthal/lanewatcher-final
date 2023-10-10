import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Header2 from "@/components/Header2";
import PlanogramView from "@/components/View/PlanogramView";
import PieChart from "@/components/View/PieChart";
import axios from "axios";
import withAuth from "@/utils/withAuth";
import { value_data } from "@/context/context";
import moment from "moment";

function Dashboard() {
  const [show, setShow] = useState(true);
  // const [dateValue, setDate] = useState([]);
  const [Alldata, setAlldata] = useState();
  const [totalLaneCount, setTotalLaneCount] = useState(0);
  const [selectedValue, setOptionVal] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loader, setLoader] = useState(false);
  const [filteredData, setFilteredDataLanes] = useState([]);
  const [filteredDataCount, setFilteredDataLanesCount] = useState([]);
  const [totalStats, setTotalStats] = useState([]);
  const { drpdwnVaue, value } = useContext(value_data);
  console.log(value,'value')
  // const [siteID, setSiteId] = useState(
  //   drpdwnVaue[0]?.site_id
  // );
  const router =
    useRouter().pathname.replace(/\//, "").charAt(0).toUpperCase() +
    useRouter().pathname.replace(/\//, "").slice(1);
  console.log(value,'line31')
  useEffect(() => {
    fetchData();
  }, [value]);

  const [range, setRange] = useState({
    // Calculate the start date as 6 months ago from the current date
    start: moment().subtract(6, "months"),
    // Set the end date to the current date
    end: moment(),
  });

  function handleState(newValue) {
    console.log(newValue.length,'ResponseData')
    setSearchTerm(newValue);
    // const filteredLanes = Alldata.filter((lane) => {
    //   const allMonotainers = [
    //     ...(lane.pending || []),
    //     ...(lane.real_time_positions || []),
    //     ...(lane.processed || []),
    //   ];
    //   console.log(allMonotainers,)
    //   return (
    //     allMonotainers.some((monotainer) =>
    //       monotainer.monotainer_id.includes(newValue)
    //     ) ||
    //     lane.lane_name.toLowerCase().includes(newValue.toLowerCase())
    //   );
    // });
    if(newValue.length > 0){
      const filteredLanes = Alldata?.filter((lane) => {
        const allMonotainers = [
          ...(lane.pending || []),
          ...(lane.real_time_positions || []),
          ...(lane.processed || []),
        ];
        const isMatched = allMonotainers?.some((monotainer) => {
          const isMatch =
            (monotainer?.monotainer_id
              ? monotainer?.monotainer_id
                  ?.toLowerCase()
                  .includes(searchTerm?.toLowerCase())
              : "") ||
            (lane?.lane_name
              ? lane?.lane_name?.toLowerCase().includes(searchTerm?.toLowerCase())
              : "");
          return isMatch;
        });  
        return isMatched;
      });
      setFilteredDataLanes(filteredLanes);
      setFilteredDataLanesCount(filteredLanes.length)
    }
    else{
      setFilteredDataLanes(Alldata);
      setFilteredDataLanesCount(Alldata.length)
    }
    
  }
  
  // const filteredDataCount = filteredLanes ? filteredLanes?.length : Alldata.length
  // const totalLaneCount = Alldata?.length;
  function setRangeFilter(date) {
    setRange(date);
    fetchData();
  }
  const fetchData = async () => {
    setLoader(true);
    try {
      const start_date = range?.start?.format("YYYY-MM-DDTHH:mm:ss");
      const end_date = range?.end?.format("YYYY-MM-DDTHH:mm:ss");
      const site_id = value.site_id ? value.site_id : drpdwnVaue[0].site_id;
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL_DATEFILTER}`, {
          params: {
            start_date,
            end_date,
            site_id
          },
        })
        .then((response) => {
            // console.log(response.data.lanewise_data.length,'ResponseData')         
            // setSiteId(response.data.total_stats[0].site_id);
            setAlldata(response.data.lanewise_data);
            setTotalLaneCount(response.data.lanewise_data.length)
            setFilteredDataLanes(response.data.lanewise_data);
            setTotalStats(response.data.total_stats);
            console.log(response.data.lanewise_data.length,'tot')
          
        });
    } catch (error) {
      setAlldata([]);
      setFilteredDataLanes([]);
      setTotalStats([]);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-5 my-3 mr-3 h-auto ">
        <Header2
          show={show}
          setUpdated={handleState}
          setRangeFilter={setRangeFilter}
          date={range}
          range={range}
          showSearchBar={true}
          showLaneCount={true}
          // showDashboardData={true}
          totalLaneCount={totalLaneCount}
          filteredLaneCount={searchTerm ? filteredDataCount : totalLaneCount}
        />
        
        <span className="text-xl">Site: {value.site_id?value.site_id:drpdwnVaue[0]?.site_id}</span>
        {totalLaneCount && totalLaneCount > 0  ?
          
          <div
            className={`flex flex-boxShadow`}
          >
            <div className={`flex flex-col left-card border rounded-md border-[#cccc] h-[70vh] p-10 m-2 pl-1 overflow-scroll mb-2 xl:h-[80vh] ${searchTerm && filteredData.length == 0 ? 'w-full' : 'w-auto'}`}>
            
            {
              filteredData.length > 0 ? filteredData?.map((data, index) => (
                  <div className="flex" key={index}>
                    {/* <div className="box-1 border rounded-md border-[##cccc] p-10 m-2"> */}
                      <PlanogramView data={data} showDashboardView={true} cameraId={totalStats[0].camera_id}/>
                    {/* </div> */}
                    {/* <div className="box-2 border rounded-md border-[##cccc] p-10 m-2"> */}
                      <PieChart data={data} showDashboardView={true}/>
                    {/* </div> */}
                  </div>
                )) : 
                <div className="w-full"><p className="text-center">No data available</p></div>
                }
            </div>
            
            <div className="right-card w-50 m-2 pl-1 xl:h-[80vh] h-[70vh]">
              <h1 className="text-center align-center-element">
                Overall Site Stats
              </h1>
                {totalStats.map((data, index) => (
                  <ul key={index}>
                    <li className="lists">
                      <p className="flex justify-around ">
                        <span className="pr-5 flex align-center-element w-full">
                          Total Monotainers
                        </span>

                        <span className="text-cs text-gray-300 w-full">
                          {data?.Total_candapost_monoid}
                        </span>
                      </p>
                    </li>
                    <li className="lists">
                      <p className="flex justify-around">
                        <span className="pr-5 flex align-center-element w-full">
                          Active Monotainers
                        </span>

                        <span className="text-cs text-gray-300 w-full">
                          {data.Total_active_Monotainers}
                        </span>
                      </p>
                    </li>
                    <li className="lists">
                      <p className="flex justify-around">
                        <span className="pr-5 flex align-center-element w-full">
                          Misc assets
                        </span>

                        <span className="text-cs text-gray-300 w-full">
                          {data.Total_Misc_assets_count}
                        </span>
                      </p>
                    </li>
                    <li className="lists">
                      <p className="flex justify-around">
                        <span className="pr-5 flex align-center-element w-full">
                          Total trucks
                        </span>
                        <span className="text-cs text-gray-300 w-full">
                          {data.Total_No_Of_Trucks}
                        </span>
                      </p>
                    </li>
                    <li className="lists">
                      <p className="flex justify-around">
                        <span className="pr-5 flex align-center-element w-full">
                          Total lanes
                        </span>

                        <span className="text-cs text-gray-300 w-full">
                          {data.Total_lanes}
                        </span>
                      </p>
                    </li>
                    <li className="lists">
                      <p className="flex justify-around">
                        <span className="pr-5 flex align-center-element w-full">
                          Total Sorted
                        </span>

                        <span className="text-cs text-gray-300 w-full">
                          {data.Total_sorted}
                        </span>
                      </p>
                    </li>
                    <li className="lists">
                      <p className="flex justify-around">
                        <span className="pr-5 flex align-center-element w-full">
                          Total Processed
                        </span>

                        <span className="text-cs text-gray-300 w-full">
                          {data.Total_Processed}
                        </span>
                      </p>
                    </li>
                    <li className="lists">
                      <p className="flex justify-around">
                        <span className="pr-5 flex align-center-element w-full">
                          Total Finalized
                        </span>

                        <span className="text-cs text-gray-300 w-full">
                          {data.Total_finalized}
                        </span>
                      </p>
                    </li>
                  </ul>
                ))}
            </div>
          </div>
          :
          <div className="flex flex-boxShadow align-center justify-center">
            <p className="text-"center>No data available</p></div>
        }
      </div>
    </>
  );
}

export default withAuth(Dashboard);
