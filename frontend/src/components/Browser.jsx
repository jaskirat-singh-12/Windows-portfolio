import React, { useState } from "react";
import { Search, ArrowLeft, ArrowRight, RotateCw, ExternalLink } from "lucide-react";

const Browser = () => {
  const [url, setUrl] = useState("");
  const [displayUrl, setDisplayUrl] = useState("");
  const [iframeError, setIframeError] = useState(false);

  const handleNavigate = () => {
    if (url.trim()) {
      let finalUrl = url;
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        finalUrl = "https://" + url;
      }
      setDisplayUrl(finalUrl);
      setIframeError(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleNavigate();
    }
  };

  const handleIframeError = () => {
    setIframeError(true);
  };

  const openInNewTab = () => {
    if (displayUrl) {
      window.open(displayUrl, "_blank");
    }
  };

  return (
    <div className="flex flex-col h-full bg-white text-black" onDoubleClick={(e) => e.stopPropagation()}>
      <div className="bg-gray-200 p-2 border-b border-gray-300 flex items-center gap-2">
        <button className="p-1 hover:bg-gray-300 rounded" onClick={(e) => e.stopPropagation()}>
          <ArrowLeft size={18} />
        </button>
        <button className="p-1 hover:bg-gray-300 rounded" onClick={(e) => e.stopPropagation()}>
          <ArrowRight size={18} />
        </button>
        <button 
          className="p-1 hover:bg-gray-300 rounded" 
          onClick={(e) => {
            e.stopPropagation();
            setUrl("");
            setDisplayUrl("");
            setIframeError(false);
          }}
          onDoubleClick={(e) => e.stopPropagation()}
          title="Clear"
        >
          <RotateCw size={18} />
        </button>
        <div className="flex-1 flex items-center gap-2 bg-white rounded pl-2">
          <Search size={16} className="text-gray-500" />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter URL or search..."
            className="flex-1 outline-none p-1 text-sm text-black"
          />
        </div>
      </div>
      
      {iframeError ? (
        <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 gap-4">
          <ExternalLink size={48} className="text-gray-400" />
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Website blocked from embedding
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              This website has security settings that prevent embedding.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  setIframeError(false);
                  setDisplayUrl("");
                  setUrl("");
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Try Another
              </button>
              <button
                onClick={openInNewTab}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Open in New Tab
              </button>
            </div>
          </div>
        </div>
      ) : displayUrl ? (
        <iframe
          src={displayUrl}
          className="flex-1 w-full border-0"
          title="Browser"
          onError={handleIframeError}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals allow-downloads"
        />
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <p className="text-gray-600">Enter a URL and press Enter to browse</p>
            <p className="text-xs text-gray-500 mt-2">Example: example.com or https://mysite.com</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Browser;
