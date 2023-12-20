import React from "react";
import { Col } from "react-bootstrap";
import {AiFillCloseCircle} from 'react-icons/ai'
import "./style.css";

const Showallphotos = ({place,setShowphotos}) => {
  return (
    <div className=" bgs">
        <button className="close-btn px-3" 
      onClick={() => setShowphotos(false)}><span className="mr-2">
        <AiFillCloseCircle className="mb-1"/></span> Close</button>
        <div className="container">
      <h2 className="title">Photos of :{place.title}</h2>
      <div className="row">
        {place.uploadphotos.length > 0 &&
          place.uploadphotos.map((photo) => (
            <Col sm={12} md={12} lg={12}>
              <img
               className="img-fluid custom-img"
                src={`http://localhost:5000/${photo}`}
                alt={`http://localhost:5000/${photo}`}
              />
            </Col>
          ))}
      </div>
      <div className="row">
        {place.photos.length > 0 &&
          place.photos.map((photo) => (
            <Col sm={12}>
              <img
               className="img-fluid custom-img"
                src={`http://localhost:5000/controllers/uploads/${photo}`}
                alt={`http://localhost:5000/controllers/uploads/${photo}`}
              />
            </Col>
          ))}
      </div>
      
      </div>
    </div>
  );
};

export default Showallphotos;
