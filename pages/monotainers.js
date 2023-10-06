import React, { useState, useEffect } from "react";
import Leftbar from "@/components/Leftbar";
import Header2 from "@/components/Header2";
import { value_data } from "@/context/context";
import ModalPopUp from "./../components/View/Modal";
import axios from "axios";

const ITEMS_PER_PAGE_DESKTOP = 8;
const ITEMS_PER_PAGE_MOBILE = 8;

function Monotainers() {
  const [show, setShow] = useState(true);
  const [monotainersData, setMonotainersData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dataModalOpen, setDataModalOpen] = useState(false);
  const [tempName, setTempName] = useState("");
  const [history, showHistory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_DESKTOP); // Default to desktop items per page
  const [searchResults, setSearchResults] = useState([]);

  // Function to fetch all the monotainer data from the API at once
  const fetchAllMonotainers = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_MONO_ID}?pageNo=20`
      );
      const data = await response.json();
      if (Array.isArray(data.result)) {
        setMonotainersData(data.result);
        // Initialize search results with all data
        setSearchResults(data.result);
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

    // Filter the data based on the search term
    const filteredData = monotainersData.filter((monotainer) =>
      monotainer?.toLowerCase().includes(value.toLowerCase())
    );
    
    // Update search results with filtered data
    setSearchResults(filteredData);

    // Reset current page to 1 when searching
    setCurrentPage(1);
  };

  // Fetch all the monotainer data initially
  useEffect(() => {
    fetchAllMonotainers();
  }, []); // Empty dependency array, so this effect runs only once on mount

  const totalPages = Math.ceil(searchResults.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedMonotainers = searchResults.slice(startIndex, endIndex);

  // Calculate the number of search results
  const numSearchResults = searchResults.length;

  // Determine the number of items per page based on screen width
  useEffect(() => {
    console.log(window.innerWidth,'w')
    if (typeof window !== "undefined") {
      const isMobileView = window.innerWidth <= 768;
      if (isMobileView) {
        setItemsPerPage(ITEMS_PER_PAGE_MOBILE);
      } else {
        setItemsPerPage(ITEMS_PER_PAGE_DESKTOP);
      }
    }
  }, []);

  return (
    <div className={`flex flex-col my-3 mr-3 h-auto w-full  ${show ? "max-w-[90vw]" : "max-w-[95vw]"} `}>
      <Header2
        show={show}
        showSearchBar={true}
        showDatePicker={false}
        showLaneCount={false}
        setUpdated={handleSearch}
      />
      <div className="text-center mb-3">{numSearchResults} Search Results</div>
      <div className="flex flex-row sm:grid gap-4 mt-10 sm:grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
        {paginatedMonotainers.map((monotainer, index) => (
          <button
            className={`text-green-700 border-green-700 border px-3 py-2 rounded-lg green-button `}
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
      <div className="flex justify-center mt-4 pagination-container">
        <button
          className="mx-1 p-2 bg-gray-300 rounded-md text-white hover:bg-[#2a2e67] hover:text-white"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(1)}
        >
          <i className="fa fa-step-backward"></i>
        </button>
        <button
          className="mx-1 p-2 bg-gray-300 rounded-md text-white hover:bg-[#2a2e67] hover:text-white"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <i className="fa fa-chevron-left"></i>
        </button>
        {/* Render page numbers */}
        {Array.from({ length: totalPages }).map((_, index) => {
          if (
            totalPages <= 7 || // Display all page numbers if total pages are 7 or less
            index <= 2 || // Display first three page numbers
            index >= totalPages - 3 || // Display last three page numbers
            (index >= currentPage - 2 && index <= currentPage + 2) // Display nearby page numbers
          ) {
            return (
              <button
                key={index}
                className={`mx-1 p-2 ${
                  currentPage === index + 1
                    ? " bg-[#2a2e67] text-white"
                    : "mx-1 p-2 bg-gray-300 rounded-md text-white hover:bg-[#2a2e67] hover:text-white"
                } rounded-md`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            );
          } else if (
            (index === 3 && currentPage <= totalPages - 4) ||
            (index === currentPage - 3 && currentPage >= 6)
          ) {
            return (
              <span key={index} className="mx-1 p-2">
                ...
              </span>
            );
          }
          return null;
        })}
        <button
          className="mx-1 p-2 bg-gray-300 rounded-md text-white hover:bg-[#2a2e67] hover:text-white"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <i className="fa fa-chevron-right"></i>
        </button>
        <button
          className="mx-1 p-2 bg-gray-300 rounded-md text-white hover:bg-[#2a2e67] hover:text-white"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(totalPages)}
        >
          <i className="fa fa-step-forward"></i>
        </button>
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
