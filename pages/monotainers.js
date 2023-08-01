import React, { useState, useEffect } from "react";
import Leftbar from "@/components/Leftbar";
import Header2 from "@/components/Header2";
import { value_data } from "@/context/context";
import ModalPopUp from "./../components/View/Modal";

const ITEMS_PER_PAGE_INCREMENT = 20;

function Monotainers() {
  const [show, setShow] = useState(true);
  const [monotainersData, setMonotainersData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dataModalOpen, setDataModalOpen] = useState(false);
  const [tempName, setTempName] = useState("");

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
  
  return (
    <div className={`flex gap-4 my-3 mr-3 h-auto `}>
      <Leftbar show={show} />
      <div className={`w-full  ${show ? "max-w-[90vw]" : "max-w-[95vw]"}`}>
        <div className={`w-full`}>
          <Header2
            setShow={setShow}
            show={show}
            showSearchBar={true}
            showDatePicker={false}
            setUpdated={handleSearch}
            // onSearch={handleSearch}
          />
        </div>
        <div className="flex flex-col m-4">
          <div className="overflow-x-auto">
            <div className="flex flex-wrap">
              {filteredMonotainers.map((monotainer, index) => (
                <button
                  className={`text-green-700 border-green-700 border px-3 py-2 rounded-lg m-4`}
                  key={index}
                  onClick={() => {
                    setDataModalOpen(true);
                    setTempName(monotainer);
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
          tableData={true}
          tempName={tempName}
          modalState={dataModalOpen}
          closeModalPopUp={closeModalPopUp}
        />
      )}
    </div>
  );
}

export default Monotainers;
