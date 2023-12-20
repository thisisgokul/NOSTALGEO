import React from "react";

const ExtraInfo = ({onChange , extrainfo}) => {
  const handleChange = (e) => {
    const value = e.target.value;
    onChange(value);
  };
  return (
    <div>
      <h5 className="mt-5">Extra Info</h5>
      <p>Give extra informations about the property</p>
      <textarea
      value={extrainfo}
        onChange={handleChange}
        className="w-100 custom-input2"
      ></textarea>
    </div>
  );
};

export default ExtraInfo;