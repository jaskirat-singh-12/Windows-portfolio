import React from "react";
import { Search } from "lucide-react";
import chrome from "../assets/chrome.png";
const DownNav = () => {
  const handleSearchClick = () => {
    console.log("Search button clicked!");
  };

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 flex justify-between items-center bg-gray-800 p-4">
      <div className="text-white left-50 ml-80">
        <button
          onClick={handleSearchClick}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all duration-200"
        >
          <Search size={18} />
          <span className="font-medium">Search</span>
        </button>
      </div>
      <div className="text-white mr-70 h-11 w-11 py-1">
        <img src={chrome} />
      </div>
    </div>
  );
};

export default DownNav;
