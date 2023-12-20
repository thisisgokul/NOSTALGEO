import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { AiFillAppstore } from "react-icons/ai";
import { BiCalendar } from "react-icons/bi";
import {AiOutlineWallet} from 'react-icons/ai';
import Showallphotos from "../subpages/children/Showallphotos";

export const Mybooking = () => {
  const { id } = useParams();
  const [bookings, setBookings] = useState(null);
  const [showphotos, setShowphotos] = useState(false);
  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((res) => {
        const foundBooking = res.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBookings(foundBooking);
        }
      });
    }
  }, [id]);

  if (!bookings) {
    return "";
  }

  if (showphotos) {
    return (
      <div>
        <Showallphotos place={bookings.place} setShowphotos={setShowphotos} />
      </div>
    );
  }
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString();
  };
  return (
    <div>
      <div className="container">
        <div></div>
        <Container>
          <Row className="mt-4 img-box position-relative">
            <Col xs={12} md={8} lg={8} xl={6}>
              <div className="">
                <img
                  src={`http://localhost:5000/${bookings.place.uploadphotos[0]}`}
                  alt={`http://localhost:5000/${bookings.place.uploadphotos}`}
                  className="img-fluid mb-2 mx-2 big-img"
                  style={{ width: "100%", height: "410px" }}
                />
              </div>
            </Col>
            <Col xs={12} md={4} lg={4} xl={3} className="position-relative">
              <div className="">
                <img
                  src={`http://localhost:5000/${bookings.place.uploadphotos[1]}`}
                  alt={`http://localhost:5000/${bookings.place.uploadphotos}`}
                  className="img-fluid small-img"
                  style={{ width: "100%", height: "200px" }}
                />
              </div>
              <div className="overflow-hidden">
                <img
                  src={`http://localhost:5000/controllers/uploads/${bookings.place.photos[0]}`}
                  alt={`http://localhost:5000/controllers/uploads/${bookings.place.photos[0]}`}
                  className="img-fluid mt-2 small-img2"
                  style={{ width: "100%", height: "200px" }}
                />
                <button
                  className="position-absolute 
              bottom-0 mb-3 delete-btn px-4 end-0 me-4"
                  onClick={() => setShowphotos(true)}
                >
                  <span>
                    <AiFillAppstore className="mb-1" />
                  </span>
                  Show All
                </button>
              </div>
            </Col>
          </Row>
          <Row className="mt-3 wraper">
            <Col>
              <h3>{bookings.place.title}</h3>
              <div className="d-md-flex flex-wrap justify-content-center mt-4">
                <Col md={6} className=" mb-4 mb-md-0">
                  <div className="d-flex">
                  <h4 className="p-2 date-format">
                    <BiCalendar /> Ckeckin: {formatDate(bookings.checkin)}
                  </h4>
                  <h4 className="p-2 date-format">
                    <BiCalendar /> Ckeckout: {formatDate(bookings.checkout)}
                  </h4>
                  </div>
                  <h5 className="text-start">Persons: {bookings.numberofguest}</h5>
                </Col>
                
                <Col md={6} className="  text-center">
                <div className="justify-content-center
                     align-items-center d-flex price-bg col-md-4">
                     <h5> <AiOutlineWallet className="mb-1"/>Price: ₹{bookings.price}</h5>
                    </div>
                </Col>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
