import React, { useState, useEffect } from "react";
import { Search, RotateCw } from "lucide-react";

const SearchWindow = ({ searchQuery = "" }) => {
  const [query, setQuery] = useState(searchQuery);
  const [searchUrl, setSearchUrl] = useState("");

  useEffect(() => {
    if (searchQuery) {
      const url = `https://google.com/search?q=${encodeURIComponent(searchQuery)}`;
      setSearchUrl(url);
    } else {
      setSearchUrl("https://google.com");
    }
  }, [searchQuery]);

  const handleSearch = () => {
    if (query.trim()) {
      const url = `https://google.com/search?q=${encodeURIComponent(query)}`;
      setSearchUrl(url);
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setQuery("");
    setSearchUrl("https://google.com");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="bg-gray-100 p-4 border-b border-gray-300">
        <div className="flex items-center gap-2 bg-white rounded-full pl-4 border border-gray-300">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search..."
            className="flex-1 outline-none p-3 text-sm"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSearch();
            }}
            className="px-6 py-2 text-blue-600 font-medium hover:text-blue-800"
          >
            Search
          </button>
          <button
            onClick={handleClear}
            onDoubleClick={handleClear}
            className="p-2 hover:bg-gray-200 rounded mr-2 transition-colors"
            title="Clear search"
          >
            <RotateCw size={18} className="text-gray-600" />
          </button>
        </div>
      </div>
      <iframe
        src={searchUrl}
        className="flex-1 w-full border-0"
        title="Search"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
      />
    </div>
  );
};

export default SearchWindow;
