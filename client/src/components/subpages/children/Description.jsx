import React from "react";
import "../style.css";

const Description = ({ description, onChange }) => {
  const handleChange = (e) => {
    const value = e.target.value;
    onChange(value);
  };

  return (
    <div>
      <h5 className="mt-5">Description</h5>
      <p>Give the details here</p>
      <textarea
        value={description}
        onChange={handleChange}
        className="w-100 custom-input2"
      ></textarea>
    </div>
  );
};

export default Description;
