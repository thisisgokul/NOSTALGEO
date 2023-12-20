import React, { useEffect, useState } from "react";
import Accounnav from "../AccountPage/children/Accounnav";
import axios from "axios";
import { BiCalendar } from "react-icons/bi";
import { BsMoonStars } from "react-icons/bs";
import { AiOutlineWallet } from "react-icons/ai";
import { Card, Col, Row, Container } from "react-bootstrap";
import "./style.css";
import { Link } from "react-router-dom";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("/bookings").then((res) => {
      setBookings(res.data);
    });
  }, []);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString();
  };

  return (
    <div>
      <Accounnav />
      {bookings.length > 0 &&
        bookings.map((booking) => (
          <Container key={booking._id}>
            <Link
              className="text-decoration-none"
              to={`/account/mybooking/${booking._id}`}
            >
              <Card key={booking._id} className="card-bg my-5">
                <Card.Body>
                  <Card.Title>Your Bookings</Card.Title>
                  <Row>
                    <Col md={3}>
                      {booking.place &&
                        booking.place.uploadphotos &&
                        booking.place.uploadphotos[0] && (
                          <Card.Img
                            variant="top"
                            src={
                              "http://localhost:5000/" +
                              booking.place.uploadphotos[0]
                            }
                            alt="Card image"
                            style={{ height: "220px" }}
                          />
                        )}
                    </Col>
                    <Col>
                      <div className="d-flex ">
                        <h4 className="p-2 date-format">
                          <BiCalendar /> Ckeckin: {formatDate(booking.checkin)}
                        </h4>
                        <h4 className="p-2 date-format">
                          <BiCalendar /> Ckeckout:{" "}
                          {formatDate(booking.checkout)}
                        </h4>
                      </div>
                      <div className="row">
                        <div className="basic-infos col-md-8">
                          {booking.place && booking.place.title && (
                            <h4>{booking.place.title}</h4>
                          )}

                          <h5>
                            <BsMoonStars />{" "}
                            <span className="info">
                              {booking.numberofguest}-Nights
                            </span>
                          </h5>
                        </div>
                        <div
                          className="justify-content-center
                     align-items-center d-flex price-bg col-md-4"
                        >
                          <h5>
                            {" "}
                            <AiOutlineWallet className="mb-1" />
                            Price: ₹{booking.price}
                          </h5>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Link>
          </Container>
        ))}
    </div>
  );
};

export default Bookings;
