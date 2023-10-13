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
  const [searchTerm, setSearchTerm] = useState("");
  const [loader, setLoader] = useState(false);
  const [filteredData, setFilteredDataLanes] = useState([]);
  const [filteredDataCount, setFilteredDataLanesCount] = useState([]);
  const [totalStats, setTotalStats] = useState([]);
  const { drpdwnVaue, value } = useContext(value_data);

  // useEffect(() => {
  //   // Function to fetch data
  //     console.log(range,'ran')
  //     fetchData(range); // Fetch data when the component is initially loaded or 'value' changes
  // }, []);
  useEffect(() => {
    fetchData(range);
  }, [value]);

  const [range, setRange] = useState({
    // Calculate the start date as 6 months ago from the current date
    start: moment().subtract(6, "months"),
    // Set the end date to the current date
    end: moment(),
  });

  function handleState(newValue) {
    setSearchTerm(newValue);
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
  
  function setRangeFilter(date) {
    setRange(date);
    fetchData(date);
  }
  const fetchData = async (date) => {
    console.log(date,'date',value,drpdwnVaue)
    setLoader(true);
    try {
      const start_date = date?.start?.format("YYYY-MM-DDTHH:mm:ss");
      const end_date = date?.end?.format("YYYY-MM-DDTHH:mm:ss");
      const site_id = value !== '' ? value.site_id : 'CNP1';
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL_DATEFILTER}`, {
          params: {
            start_date,
            end_date,
            site_id
          },
        })
        .then((response) => {
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
          totalLaneCount={totalLaneCount}
          filteredLaneCount={searchTerm ? filteredDataCount : totalLaneCount}
        />

        
        <h1 className="text-primary2 text-xxl w-60 text-center font-boxed font-extrabold">
          <span>SITE-ID: &nbsp;{value.site_id?value.site_id:drpdwnVaue[0]?.site_id}</span></h1>

        {totalStats[0]?.Total_master_monoids && totalStats[0]?.Total_master_monoids > 0  ?
          
          <div
            className={`flex flex-boxShadow flex-col md:flex-row`}
          >
            <div className={`flex flex-col left-card border rounded-md border-[#cccc] h-[70vh] p-10 m-2 pl-1 overflow-scroll mb-2 xl:h-[80vh] w-full 2xl:w-60`}>
            

            {
              filteredData.length > 0 ? filteredData?.map((data, index) => (
                  <div className="flex m-auto" key={index}>
                    {/* <div className="box-1 border rounded-md border-[##cccc] p-10 m-2"> */}
                      <PlanogramView data={data} showDashboardView={true} cameraId={totalStats[0].camera_id}/>
                    {/* </div> */}
                    {/* <div className="box-2 border rounded-md border-[##cccc] p-10 m-2"> */}
                      <PieChart data={data}/>
                    {/* </div> */}
                  </div>
                )) : 
                <div className="w-full"><p className="text-center">No data available</p></div>
                }
            </div>
            
            <div className="right-card w-25 m-2 pl-1 xl:h-[80vh] h-[70vh]">
            <h1 className="text-xl text-center">
                Overall Site Stats
              </h1>
                {totalStats.map((data, index) => (
                  <ul key={index}>
                    <li className="lists">
                      <p className="flex flex-col xl:flex-col-xl">
                        <span className="flex align-center-element w-full">
                          Total Monotainers
                        </span>

                        <span className="text-cs text-gray-300 w-full">
                          {data?.Total_monoid ? data?.Total_monoid : 0}/{data?.Total_master_monoids ? data?.Total_master_monoids : 0}
                        </span>
                      </p>
                    </li>
                    <li className="lists">
                      <p className="flex flex-col xl:flex-col-xl">
                        <span className="flex align-center-element w-full">
                          Total Active Monotainers
                        </span>

                        <span className="text-cs text-gray-300 w-full">
                          {data.Total_active_Monotainers ? data.Total_active_Monotainers : 0}
                        </span>
                      </p>
                    </li>
                    <li className="lists">
                      <p className="flex flex-col xl:flex-col-xl">
                        <span className="flex align-center-element w-full">
                          Total Misc assets
                        </span>

                        <span className="text-cs text-gray-300 w-full">
                          {data?.Total_Misc_assets_count ? data?.Total_Misc_assets_count : data?.Total_Misc_assets_count}
                        </span>
                      </p>
                    </li>
                    <li className="lists">
                      <p className="flex flex-col xl:flex-col-xl">
                        <span className="flex align-center-element w-full">
                          Total trucks
                        </span>
                        <span className="text-cs text-gray-300 w-full">
                          {data?.Total_No_Of_Trucks ? data?.Total_No_Of_Trucks : 0}
                        </span>
                      </p>
                    </li>
                    <li className="lists">
                      <p className="flex flex-col xl:flex-col-xl">
                        <span className="flex align-center-element w-full">
                          Total lanes
                        </span>

                        <span className="text-cs text-gray-300 w-full">
                          {data?.Total_lanes ? data?.Total_lanes : 0}
                        </span>
                      </p>
                    </li>
                    <li className="lists">
                      <p className="flex flex-col xl:flex-col-xl">
                        <span className="flex align-center-element w-full">
                          Total Sorted
                        </span>

                        <span className="text-cs text-gray-300 w-full">
                          {data?.Total_sorted ? data?.Total_sorted : 0} 
                        </span>
                      </p>
                    </li>
                    {/* <li className="lists">
                      <p className="flex flex-col xl:flex-col-xl">
                        <span className="flex align-center-element w-full">
                          Total Processed
                        </span>

                        <span className="text-cs text-gray-300 w-full">
                          {data?.Total_Processed ? data?.Total_Processed : 0}
                        </span>
                      </p>
                    </li> */}
                    <li className="lists">
                      <p className="flex flex-col xl:flex-col-xl">
                        <span className="flex align-center-element w-full">
                          Total Finalized
                        </span>

                        <span className="text-cs text-gray-300 w-full">
                          {data?.Total_finalized ? data?.Total_finalized : 0}
                        </span>
                      </p>
                    </li>
                    <li className="lists">
                      <p className="flex flex-col xl:flex-col-xl">
                        <span className="flex align-center-element w-full">
                          Total Misplaced
                        </span>

                        <span className="text-cs text-gray-300 w-full">
                          {data.Total_misplaced ? data.Total_misplaced : 0}
                        </span>
                      </p>
                    </li>
                    
                  </ul>
                ))}
                {/* <PieChart data={totalStats}/> */}

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
