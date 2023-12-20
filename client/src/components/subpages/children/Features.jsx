import React from "react";
import { Row, Col } from "react-bootstrap";
import { FaBed, FaSwimmingPool } from "react-icons/fa";
import { AiOutlineWifi } from "react-icons/ai";
import { MdLocalParking } from "react-icons/md";
import { TbDog } from "react-icons/tb";
import { FiMonitor } from "react-icons/fi";
const Features = ({selected,onChange}) => {
  function handleClick(e){
    const {name,checked}=e.target;
    if(checked){
      onChange([...selected,name])
    }else{
      onChange([...selected.filter(selectedName=>selectedName!==name)])
    }


  }
  return (
    <>
      <Row className="perks">
      <h5 className="mt-5">Features</h5>
            <p>Give the features</p>
        <Col xs={4} md={3} className="m-2 perk-col">
          <label className="m-2 d-flex align-items-center outer-label">
            <AiOutlineWifi className="me-2" />
            <input type="checkbox" checked={selected.includes('wifi')} name="wifi" onChange={handleClick}  />
            <span className="px-1">Wifi</span>
          </label>
        </Col>
        <Col xs={4} md={3} className="m-2 perk-col">
          <label className="m-2 d-flex align-items-center outer-label">
            <MdLocalParking className="me-2" />
            <input type="checkbox" name="parking" checked={selected.includes('parking')} onChange={handleClick} />
            <span className="px-1">Free Parking</span>
          </label>
        </Col>
        <Col xs={4} md={3} className="m-2 perk-col">
          <label className="m-2 d-flex align-items-center outer-label">
            <TbDog className="me-2" />
            <input type="checkbox" name="dog" checked={selected.includes('dog')} onChange={handleClick} />
            <span className="px-1">Dogs Allowed</span>
          </label>
        </Col>
        <Col xs={4} md={3} className="m-2 perk-col">
          <label className="m-2 d-flex align-items-center outer-label">
            <FiMonitor className="me-2" />
            <input type="checkbox" name="tv" checked={selected.includes('tv')} onChange={handleClick} />
            <span className="px-1">TV</span>
          </label>
        </Col>
        <Col xs={4} md={3} className="m-2 perk-col">
          <label className="m-2 d-flex align-items-center outer-label">
            <FaBed className="me-2" />
            <input type="checkbox" name="bed" checked={selected.includes('bed')} onChange={handleClick} />
            <span className="px-1">Additional Bed</span>
          </label>
        </Col>
        <Col xs={4} md={3} className="m-2 perk-col">
          <label className="m-2 d-flex align-items-center outer-label">
            <FaSwimmingPool className="me-2" />
            <input type="checkbox" name="pool" checked={selected.includes('pool')} onChange={handleClick} />
            <span className="px-1">Private Pool</span>
          </label>
        </Col>
      </Row>
    </>
  );
};

export default Features;