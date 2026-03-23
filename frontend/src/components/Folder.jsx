import React, { useState } from "react";
import DraggableWindow from "./DraggableWindow";

import folder from "../assets/folder.png";
import Context from "./Context";

const Folder = () => {
  const [drag, setDrag] = useState(false);
  const [windows, setWindows] = useState([]);
  // const [name, setName] = useState("");
  const arr = [{ name: "Resume" }, { name: "My Projects" }];
  
  const clickHandler = (name) => {
  setWindows((prev) => [
    ...prev,
    { name: name }
  ]);
};

  const handleClose = () => {
    setDrag(false);
    console.log("Window closed!");
  };


  const openFile = (file) => {
    setWindows((prev) => [...prev, file]);
  };

  const [position, setPosition] = useState({});
  return (
    <div
      className="h-screen max-h-screen bg-gray-700"
      onClick={() => {
        setPosition({});
      }}
    >
      <div
        className="w-20"
        onContextMenu={(e) => {
          e.preventDefault();
          console.log(e.clientX, e.clientY);
          setPosition({ left: e.clientX, top: e.clientY });
        }}
      >
        <button
          onDoubleClick={() => clickHandler(arr[0].name)}
          className="px-2 py-4 rounded h-7 w-20 text-white cursor-pointer"
        >
          <img src={folder} />
          {arr[0].name}
        </button>
        <button
          onDoubleClick={() => clickHandler(arr[1].name)}
          className="px-2 py-4 rounded h-7 w-20 text-white"
        >
          <img src={folder} />
          {arr[1].name}
        </button>
      </div>
      <Context position={position} />
      <div>
        {/* {drag && (
            <DraggableWindow onClose={handleClose} prop={{ name: name }}>
              <button
          onDoubleClick={clickHandler}
          className="px-2 py-4 rounded h-7 w-15 text-white"
        >
          <img src={folder} />
          {name}
        </button>
            </DraggableWindow>
          )} */}

        {windows.map((file, index) => (
          <DraggableWindow
            key={index}
            prop={{ name: file.name, file: file }}
            openFile={openFile}
            onClose={() =>
              setWindows((prev) => prev.filter((_, i) => i !== index))
            }
            
          />
        ))}
      </div>
    </div>
  );
};

export default Folder;
