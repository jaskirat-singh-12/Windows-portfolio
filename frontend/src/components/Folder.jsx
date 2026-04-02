import React, { useRef, useState } from "react";
import DraggableWindow from "./DraggableWindow";

import folder from "../assets/folder.png";
import Context from "./Context";
import DownNav from "./DownNav";
import { useEffect } from "react";

const Folder = () => {
  const [drag, setDrag] = useState(false);
  const [windows, setWindows] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [folderPositions, setFolderPositions] = useState({
    folder1: { x: 20, y: 20 },
    folder2: { x: 20, y: 100 }
  });
  const [draggingFolder, setDraggingFolder] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  const arr = [{ name: "Resume", id: "folder1" }, { name: "My Projects", id: "folder2" }];
  
  const clickHandler = (name) => {
  setWindows((prev) => [
    ...prev,
    { name: name }
  ]);
};

const openBackground = () => {
  setWindows((prev) => [
    ...prev,
    { name: "Background" }
  ]);
};

  const divRef = useRef(null);
  const [isFull, setIsFull] = useState(false);

  // Toggle fullscreen using the native API
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      divRef.current.requestFullscreen().catch(err => console.error(err));
    } else {
      document.exitFullscreen();
    }
  };

  // Sync state with browser events (e.g., ESC key)
  useEffect(() => {
    const onChange = () => setIsFull(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);



useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
      fetch("https://windows-portfolio-dhln.onrender.com/api/user/guest")
          .then(res => res.json())
          .then(data => {
              localStorage.setItem("token", data.token);
          });
  }
}, []);

useEffect(() => {
  loadBackground();
}, []);

useEffect(() => {
  // Listen for background update event
  const handleBackgroundUpdate = () => {
    loadBackground();
  };
  
  window.addEventListener('backgroundUpdated', handleBackgroundUpdate);
  
  return () => {
    window.removeEventListener('backgroundUpdated', handleBackgroundUpdate);
  };
}, []);

const loadBackground = async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch("https://windows-portfolio-dhln.onrender.com/api/user/background", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    console.log("Background data:", data);

    // Try multiple possible property names
    const imageUrl = data.background || data.imageUrl || data.url || data.backgroundUrl;
    if (imageUrl) {
      setBackgroundImage(imageUrl);
    }
  } catch (error) {
    console.error("Failed to load background:", error);
  }
};


  const openFile = (file) => {
    setWindows((prev) => [...prev, file]);
  };

  const handleFolderMouseDown = (folderId, e) => {
    setDraggingFolder(folderId);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseMove = (e) => {
    if (!draggingFolder) return;
    
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    
    setFolderPositions(prev => ({
      ...prev,
      [draggingFolder]: { x: newX, y: newY }
    }));
  };

  const handleMouseUp = () => {
    setDraggingFolder(null);
  };

  useEffect(() => {
    if (draggingFolder) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [draggingFolder, dragOffset]);

  const [position, setPosition] = useState({});


  return (
    <div ref={divRef}
      onDoubleClick={toggleFullscreen}>
      <div
        className="h-screen max-h-screen"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundColor: '#374151'
        }}
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
          {arr.map((folderItem) => (
            <button
              key={folderItem.id}
              onMouseDown={(e) => handleFolderMouseDown(folderItem.id, e)}
              onDoubleClick={(e) => {
                e.stopPropagation();
                if (!draggingFolder) {
                  clickHandler(folderItem.name);
                }
              }}
              style={{
                position: 'absolute',
                left: `${folderPositions[folderItem.id].x}px`,
                top: `${folderPositions[folderItem.id].y}px`,
                cursor: draggingFolder === folderItem.id ? 'grabbing' : 'grab'
              }}
              className="px-2 py-4 rounded h-7 w-20 text-white select-none transition-all"
            >
              <img src={folder} alt="folder" />
              {folderItem.name}
            </button>
          ))}
        </div>
        <Context position={position} />
        <div>
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
      <DownNav onOpenBackground={openBackground} />
    </div>
  );
};

export default Folder;
