import React, { useState, useRef, useEffect } from "react";
import Resume from "./Resume";
import AllProjects from "./projects/AllProjects";
import Background from "./background/Background";
import Browser from "./Browser";
import SearchWindow from "./SearchWindow";

const DraggableWindow = ({ openFile, onClose, prop }) => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const draggingRef = useRef(false);
  const offsetRef = useRef({ x: 0, y: 0 });

  const windowRef = useRef(null);
  const [isResume, setIsResume] = useState(false);
  const [openedFile, setOpenedFile] = useState(null);

  const file = prop.file;

  const onMouseDown = (e) => {
    draggingRef.current = true;

    // Calculate offset between mouse and window top-left
    const rect = windowRef.current.getBoundingClientRect();
    offsetRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    // Attach listeners to document
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e) => {
    if (!draggingRef.current) return;

    const newX = e.clientX - offsetRef.current.x;
    const newY = e.clientY - offsetRef.current.y;

    setPosition({ x: newX, y: newY });
  };

  const onMouseUp = () => {
    draggingRef.current = false;

    // Clean up listeners
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  const [fullscreen, setFullscreen] = useState(false);

  const handleFullscreen = (e) => {
    e.stopPropagation();
    setFullscreen((prev) => !prev);
  };

  return (
    <div
      ref={windowRef}
      className={`fixed ${fullscreen ? "inset-0 w-screen h-screen" : "w-[700px] h-[700px]"} border border-gray-400 bg-black opacity-80 shadow-lg rounded-md text-white flex flex-col`}
      style={{
        top: fullscreen ? 0 : position.y,
        left: fullscreen ? 0 : position.x,
        zIndex: 100,
        cursor: "default",
      }}
    >
      <div
        className="bg-gray-800 text-white px-4 py-2 cursor-move rounded-t-md flex items-center"
        onMouseDown={onMouseDown}
        style={{ userSelect: "none" }}
      >
        <span className="flex-1">{prop.name}</span>
        <button
          className="mr-2 bg-gray-600 text-white px-2 py-1 rounded"
          onClick={handleFullscreen}
        >
          {fullscreen ? "Exit Fullscreen" : "Fullscreen"}
        </button>
        <button
          className="bg-red-500 text-white px-2 py-1 rounded"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          X
        </button>
      </div>
      <div className="flex-1 w-full h-full p-0 overflow-auto bg-black">
        {prop.name === "Resume" && <Resume />}

        {prop.name === "My Projects" && <AllProjects openFile={openFile} />}

        {prop.name === "Background" && <Background />}

        {prop.name === "Chrome" && <Browser />}

        {prop.name === "Search" && <SearchWindow searchQuery={file?.searchQuery || ""} />}

        {file?.type === "pdf" && (
          <iframe src={file.url} className="w-full h-full" />
        )}

        {file?.type === "image" && (
          <img src={file.url} className="w-full h-full object-contain" />
        )}

        {file?.type === "video" && (
          <video src={file.url} controls className="w-full h-full" />
        )}
        {file?.type === "website" && (
          <iframe src={file.url} className="w-full h-full" title={file.name} />
        )}
      </div>
    </div>
  );
};

export default DraggableWindow;
