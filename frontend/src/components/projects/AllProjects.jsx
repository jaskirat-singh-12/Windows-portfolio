import React, { useEffect, useState } from "react";

const AllProjects = ({ openFile }) => {
  const [files, setFiles] = useState([]);
  // const [openWindow, setOpenWindow] = useState(null);
  const [windows, setWindows] = useState([]);

  useEffect(() => {
    fetch("https://windows-portfolio-dhln.onrender.com/api/projects/all")
      .then((res) => res.json())
      .then((data) => {
        setFiles(data.data);
      })
      .catch((err) => {
        console.error("Error fetching projects:", err);
      });
  }, []);

// return (
//   <div>
//     {files.map((file, index) => (
//       <div
//         key={file._id}
//         style={{
//           position: "absolute",
//           left: file.positionX ?? (Math.floor(index / 5) * 120 + 20),
//           top: file.positionY ?? ((index % 5) * 120 + 20), 
//         }}
//         className="w-24 text-center text-white cursor-pointer"
//         onDoubleClick={() => openFile(file)}
//       >
//         <img src={file.thumbnail} className="w-16 h-16 mx-auto" />
//         <p className="text-sm mt-1">{file.name}</p>
//       </div>
//     ))}
//   </div>
// );


return (
  <div>
    {files.map((file, index) => {
      const iconsPerColumn = 6;
      const gap = 90;

      const x =  (Math.floor(index / iconsPerColumn) * gap + 20);
      const y =  ((index % iconsPerColumn) * gap + 80);

      return (
        <div
          key={file._id}
          style={{
            position: "absolute",
            left: x,
            top: y,
          }}
          className="w-24 text-center text-white cursor-pointer"
          onDoubleClick={(e) => {
            e.stopPropagation();
            openFile(file);
          }}
        >
          <img src={file.thumbnail} className="w-16 h-16 mx-auto" />
          <p className="text-sm mt-1">{file.name}</p>
        </div>
      );
    })}
  </div> 
);

}

export default AllProjects;