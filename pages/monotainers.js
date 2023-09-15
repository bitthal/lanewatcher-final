import React, { useState, useEffect } from "react";
import Leftbar from "@/components/Leftbar";
import Header2 from "@/components/Header2";
import { value_data } from "@/context/context";
import ModalPopUp from "./../components/View/Modal";
import axios from "axios";

const ITEMS_PER_PAGE_INCREMENT = 20;

function Monotainers() {
  const [show, setShow] = useState(true);
  const [monotainersData, setMonotainersData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dataModalOpen, setDataModalOpen] = useState(false);
  const [tempName, setTempName] = useState("");
  const [history, showHistory] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isDropdownValueShow, setIsDropdownOpen1] = useState(false);
  const [isDropdownValues, setIsDropdownValues] = useState([]);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState(null);
  const [selectedLane, setSelectedLane] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dropdownStates, setDropdownStates] = useState({});
  // Function to fetch all the monotainer data from the API at once
  const fetchAllMonotainers = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_MONO_ID}?pageNo=20`
      );
      const data = await response.json();
      if (Array.isArray(data.result)) {
        setMonotainersData(data.result);
      } else {
        console.error("Invalid data format: data.result is not an array.");
      }
    } catch (error) {
      console.error("Error fetching monotainer data:", error);
    }
  };

  // Function to handle search term changes
  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  // Fetch all the monotainer data initially
  useEffect(() => {
    fetchAllMonotainers();
  }, []); // Empty dependency array, so this effect runs only once on mount

  // Filter the data based on the search term
  const filteredMonotainers = monotainersData.filter((monotainer) =>
    monotainer?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const closeModalPopUp = () => {
    setDataModalOpen(false);
  };
  const historyHandler = (data) =>{
    const monoid = data;
     axios
      .get(`${process.env.NEXT_PUBLIC_API_URL_HISTORY}`, {
        params: {
          monoid
        },
      })
      .then((response) => {
        setDataModalOpen(true);
        console.log(response.data.result,'response.data.result')
        showHistory(response.data.result)        
      });
  }
  return (
    <div className={`flex gap-4 my-3 mr-3 h-auto `}>
      {/* <Leftbar show={show} setShow={setShow}/> */}
      <div className={`w-full  ${show ? "max-w-[90vw]" : "max-w-[95vw]"}`}>
        <div className={`w-full`}>
          <Header2
            
            show={show}
            showSearchBar={true}
            showDatePicker={false}
            setUpdated={handleSearch}
            // onSearch={handleSearch}
          />
        </div>
        <div className="flex flex-col m-4">
          <div className="overflow-x-auto">
          <div className="grid gap-4 mt-10 sm:grid-cols-2 md:grid-cols-8">
              {filteredMonotainers.map((monotainer, index) => (
                <button
                  className={`text-green-700 border-green-700 border px-3 py-2 rounded-lg green-button sm:w-20 md:w-24 lg:w-28 `}
                  key={index}
                  onClick={() => {
                    setTempName(monotainer);
                    historyHandler(monotainer);
                    
                  }}
                >
                  {monotainer}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {dataModalOpen && (
        <ModalPopUp
          tableData={history}
          tempName={tempName}
          modalState={dataModalOpen}
          closeModalPopUp={closeModalPopUp}
        />
      )}
    </div>
  );
}

export default Monotainers;
