import React, { useEffect, useState } from "react";

const Resume = () => {
    const [resume, setResume] = useState("");
  useEffect(() => {
    fetch(`https://windows-portfolio-dhln.onrender.com/api/resume/all`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setResume(data[0].url);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
//   console.log("object");
  return (
    <div className="w-full h-full">
      <iframe
        src={resume}
        className="w-full h-full min-h-0 min-w-0 border-none"
        style={{ display: 'block' }}
        title="Resume PDF"
      />
    </div>
  );
};

export default Resume;
