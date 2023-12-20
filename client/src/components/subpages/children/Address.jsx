import React from "react";
import "../style.css";

const Address = ({address,onChange}) => {
  const handleChange = (e) => {
    const value = e.target.value;
    onChange(value);
  };
  return (
    <div>
      <input
        className="w-100 my-3 custom-input"
        placeholder="Address"
        type="text"
        value={address}
        onChange={handleChange}
      />
    </div>
  );
};

export default Address;