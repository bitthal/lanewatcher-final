import React, { useState, useEffect,useContext } from "react";
import Leftbar from "@/components/Leftbar";
import Header2 from "@/components/Header2";
import View from "@/components/View/View";
import axios from "axios";
import { useRouter } from "next/router";
import withAuth from "@/utils/withAuth";
import Toaster from "@/components/Toaster";
import { value_data } from "@/context/context";

function Tracker({
  showDatePicker,
  showRealTimeView,
  showDashboardView,
  showPieChart,
}) {

  const [show, setShow] = useState(true);
  const [date, setDate] = useState(new Date());
  const [Alldata, setAlldata] = useState();
  const [selectedValue, setOptionVal] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setErrors] = useState(null);
  // const [finalizedData, setFinalData] = useState([]);
  const { laneNames, setLaneNames } = useContext(value_data);

  const router =
    useRouter().pathname.replace(/\//, "").charAt(0).toUpperCase() +
    useRouter().pathname.replace(/\//, "").slice(1);

  function setRangeFilter(date) {
    setDate(date);
    handleSubmit(date);
  }
  const handleCloseToaster = () => {
    setErrors(null); // Clear the toaster message
  };
  function handleState(newValue) {
    setSearchTerm(newValue);
  }
  // Calculate total lane count
  const totalLaneCount = Alldata?.length;

  // Filter the lanes based on the search term
  const filteredLanes = Alldata?.filter((lane) => {
    const allMonotainers = [
      ...lane?.pending?.monotainers ? lane?.pending?.monotainers : lane?.pending,
      ...lane?.real_time_positions?.monotainers ? lane?.real_time_positions?.monotainers : lane?.real_time_positions,
      ...lane?.processed?.monotainers ? lane?.processed?.monotainers : lane?.processed
    ];
    const isMatched = allMonotainers?.some((monotainer) => {
      const isMatch = monotainer?.monotainer_id ? monotainer?.monotainer_id 
      ?.toLowerCase()
      .includes(searchTerm?.toLowerCase()) : "";
      return isMatch;
    });

    console.log("Lane Matched:", isMatched);

    return isMatched;
  });

  // Calculate filtered lane count (count all lanes)
  const filteredLaneCount = Alldata?.filter((lane) => {
    const allMonotainers = [
      ...lane?.pending?.monotainers ? lane?.pending?.monotainers : lane?.pending,
      ...lane?.real_time_positions?.monotainers ? lane?.real_time_positions?.monotainers : lane?.real_time_positions,
      ...lane?.processed?.monotainers ? lane?.processed?.monotainers : lane?.processed
    ];
    return allMonotainers?.some((monotainer) => {
      return monotainer?.monotainer_id ? monotainer?.monotainer_id 
        ?.toLowerCase()
        .includes(searchTerm?.toLowerCase()) : "";
    });
  }).length;

  function handleOption(selectedValue) {
    setOptionVal(selectedValue);
    handleSubmit(selectedValue);
  }

  const handleSubmit = (payload) => {
    const userData = {
      payload,
    };
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}`, userData)
      .then((response) => {
        setAlldata(Object.values(response.data));
      }).catch((error) => {
        console.error("API error:", error);
        setErrors('Date & time search is in progress.')

      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}`);
        setAlldata(response?.data?.lanes);
        setLaneNames(response?.data?.lanes);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 5000); // 5 seconds interval

    // Clean up the interval on component unmount to prevent memory leaks
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <div className="flex gap-5 my-3 mr-3 h-auto">
        <Leftbar show={show} setShow={setShow} />
        <div className="w-full flex-grow max-w-[90vw] lg:w-[80%]! xl:w-[70%]!">
          <div className={`w-full`}>
            <Header2
              show={show}
              setUpdated={handleState}
              setRangeFilter={setRangeFilter}
              date={date}
              showSearchBar={true}
              selectedValue={selectedValue}
              setOptionVal={handleOption}
              showDatePicker={showDatePicker ? showDatePicker : false}
              totalLaneCount={totalLaneCount}
              filteredLaneCount={searchTerm ? filteredLaneCount : totalLaneCount}
              showLaneCount={true}
            />
          </div>

          <div className={`flex flex-col gap-8 mt-5 w-full`}>
            {searchTerm
              ? filteredLanes
                  ?.sort((a, b) => a.lane_number - b.lane_number)
                  .map((data, index) => (
                    <div className="" key={index}>
                      <View
                        showPieChart={showPieChart ? true : false}
                        showDashboardView={showDashboardView ? false : true}
                        show={show}
                        data={data}
                        allData={Alldata}
                        // finalData={finalizedData}
                        showRealTimeView={showRealTimeView ? false : true}
                      />
                    </div>
                  ))
              : Alldata?.sort((a, b) => a.lane_number - b.lane_number).map(
                  (data, index) => (
                    <div className="" key={index}>
                      <View
                        showPieChart={showPieChart ? true : false}
                        showDashboardView={showDashboardView ? false : true}
                        show={show}
                        data={data}
                        allData={Alldata}
                        // finalData={finalizedData}
                        showRealTimeView={showRealTimeView ? false : true}
                      />
                    </div>
                  )
                )}
          </div>
        </div>

      </div>
      <Toaster message={error} onClose={handleCloseToaster}/>
    </>
  );
}

export default withAuth(Tracker);
