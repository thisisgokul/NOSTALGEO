import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import "./indexpage.css";
import { Link } from "react-router-dom";

const Cards = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get("/placesdata");
        setPlaces(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlaces();
  }, []);

  return (
    <Container>
      <h2 className="cards-head" >Go somewhere</h2>
      <p className="card-subhead">Let's go on an adventure</p>
      <Row className="mt-5">
        {places.map((data, index) =>
          data.uploadphotos?.[0] ? (
            <Col key={index} xs={12} sm={6} md={4} lg={3}>
              <div className="card-outer">
                <Link to={`/place/${data._id}`} className="text-reset text-decoration-none">
                  <div >
                    <img
                      src={"http://localhost:5000/" + data.uploadphotos[0]}
                      alt=""
                      className="card-image-content"
                    />
                  </div>
                  <div className="card-content">
                    <h4 className="card-title">{data.title}</h4>
                    <h6 className="card-address">{data.address}</h6>
                    <p className="card-price">
                      <span className="price">₹{data.price}</span> night
                    </p>
                  </div>
                </Link>
              </div>
            </Col>
          ) : null
        )}
      </Row>
    </Container>
  );
};

export default Cards;
