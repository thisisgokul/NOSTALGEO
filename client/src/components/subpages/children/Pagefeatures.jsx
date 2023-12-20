import React from "react";
import '../singlepage.css';
import {
  FaWifi,
  FaTv,
  FaDog,
  FaBed,
  FaSwimmingPool,
  FaParking,
} from "react-icons/fa";
const Pagefeatures = ({ place }) => {
  const FeatureIcon = ({ feature }) => {
    switch (feature) {
      case "wifi":
        return (
          <>
            <FaWifi /> {feature}
          </>
        );
      case "tv":
        return (
          <>
            <FaTv /> {feature}
          </>
        );
      case "parking":
        return (
          <>
            <FaParking /> {feature}
          </>
        );
      case "pool":
        return (
          <>
            <FaSwimmingPool /> {feature}
          </>
        );
      case "bed":
        return (
          <>
            <FaBed /> {feature}
          </>
        );
      case "dog":
        return (
          <>
            <FaDog /> {feature}
          </>
        );

      default:
        return;
    }
  };
  return (
    <div>
      <h2 className="head">Features</h2>
      <div className="d-flex flex-wrap">
        {place.features.map((feature, index) => (
          <div className="features p-4" key={index}>
            <FeatureIcon feature={feature} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pagefeatures;
