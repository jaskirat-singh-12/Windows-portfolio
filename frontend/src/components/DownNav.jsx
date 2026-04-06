import React, { useState } from "react";
import { Search, X } from "lucide-react";
import chrome from "../assets/chrome.png";

const DownNav = ({ onOpenBackground, onOpenChrome, onOpenSearch }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
  };

  const handleChromeClick = () => {
    onOpenChrome();
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" && searchInput.trim()) {
      onOpenSearch(searchInput);
      setSearchInput("");
      setShowSearch(false);
    }
  };

  return (
    <div className="fixed bottom-4 left-0 w-full z-50 flex justify-center items-end bg-transparent px-4 pb-3">
      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl rounded-xl px-5 py-3 border border-white/15 shadow-lg">
        {showSearch && (
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleSearchSubmit}
              autoFocus
              className="px-3 py-2 rounded-lg bg-white/10 text-white placeholder-white/50 outline-none border border-white/15 focus:border-white/30 transition-colors duration-200 w-40"
            />
            <button
              onClick={() => {
                setShowSearch(false);
                setSearchInput("");
              }}
              className="p-1 hover:bg-white/10 rounded transition-colors duration-200"
            >
              <X size={17} className="text-white" />
            </button>
          </div>
        )}
        
        <button
          onClick={handleSearchClick}
          className="flex cursor-pointer items-center gap-2 px-3 py-2 rounded-lg text-white text-md font-medium hover:bg-white/10 transition-colors duration-200"
        >
          <Search size={17} />
          Search
        </button>
        
        <div className="w-px h-5 bg-white/15"></div>
        
        <div 
          onClick={handleChromeClick}
          className="text-white h-8 w-10 flex items-center justify-center rounded-lg hover:bg-white/10 cursor-pointer transition-colors duration-200"
        >
          <img src={chrome} alt="Chrome" className="w-8 h-8"/>
        </div>
        
        <div className="w-px h-5 bg-white/15"></div>
        
        <button
          onClick={onOpenBackground}
          className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg text-white text-md font-medium hover:bg-white/10 transition-colors duration-200"
        >
          Wallpaper
        </button>
      </div>
    </div>
  );
};

export default DownNav;
