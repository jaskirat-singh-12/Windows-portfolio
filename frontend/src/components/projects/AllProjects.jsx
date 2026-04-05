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
      const x = file.positionX ?? (Math.floor(index / 5) * 120 + 20);
      const y = file.positionY ?? ((index % 5) * 120 + 100);

      return (
        <div
          key={file._id}
          style={{
            position: "absolute",
            left: x,
            top: y,
          }}
          className="w-24 text-center text-white cursor-pointer"
          onDoubleClick={() => openFile(file)}
        >
          <img src={file.thumbnail} className="w-16 h-16 mx-auto" />
          <p className="text-sm mt-1">{file.name}</p>
        </div>
      );
    })}
  </div> 
);

}

// {files.map((file, index) => {
//   const x = file.positionX ?? (Math.floor(index / 5) * 120 + 20);
//   const y = file.positionY ?? ((index % 5) * 120 + 20);

//   return (
//     <div>
    
//         <div
//           key={file._id}
//           style={{
//             position: "absolute ",
//             left: file.positionX,
//             top: file.positionY,
//           }}
//           className="w-24 text-center text-white cursor-pointer"
//           onDoubleClick={() => openFile(file)}
//         >
//           <img src={file.thumbnail} className="w-16 h-16 mx-auto" />
//           <p className="text-sm mt-1">{file.name}</p>
//         </div>
//     </div>
//   );
// })}

{/* }; */}

export default AllProjects;