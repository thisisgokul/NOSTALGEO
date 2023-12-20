import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Accounnav from "../AccountPage/children/Accounnav";
import { AiOutlinePlus,AiFillEdit,AiFillDelete } from "react-icons/ai";
import { Row, Col, Image, Container, } from "react-bootstrap";
import "./style.css";
import axios from "axios";

const PlacesPage = () => {
  const [place, setPlace] = useState([]);

  useEffect(() => {
    axios.get("/userplaces").then(({ data }) => setPlace(data));
  }, []);

  const deletePlace = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this place?");
    if (confirmDelete) {
      try {
        await axios.delete("/deletePlace", { data: { id } });
        setPlace((prevPlace) => prevPlace.filter((prev) => prev._id !== id));
      } catch (error) {
        console.error("An error occurred while deleting the place:", error);
      }
    }
  };
  
  
  return (
    <div className="container">
      <Accounnav />
      <div className="d-flex justify-content-center">
        <Link className="account-section" to={"/account/places/new"}>
          <AiOutlinePlus />
          Add new Place
        </Link>
      </div>
      <div>
        {place.map((data, index) => (
          <Container key={index}>
            <Row className="mt-5 place-list">
              <Col xs={12} md={3}>
                {data.uploadphotos?.[0]&& (
                  <Image
                    className="rounded p-3"
                    src={
                      "http://localhost:5000/" +
                      data.uploadphotos[0]
                    }
                    fluid
                  />
                )}
              </Col>
              <Col xs={12} md={9}>
                <div className="pt-5">
                  <h2>{data.title}</h2>
                  <p className="discription">{data.description}</p>
                  <div className="d-flex justify-content-end mb-4">
                    <Link className="mx-4" to={"/account/places/" + data._id}>
                      <AiFillEdit className="icons" />
                      
                    </Link>
                    <AiFillDelete onClick={() => deletePlace(data._id)} className="icons" />
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        ))}
      </div>
    </div>
  );
};

export default PlacesPage;
