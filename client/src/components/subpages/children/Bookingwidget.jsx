import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { Row, Col } from "react-bootstrap";
import { UserContext } from "../../UserContext";
import { differenceInCalendarDays } from "date-fns";
import logo from '../../../assets/logo.png';
import "../singlepage.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";



const Bookingwidget = ({ place }) => {
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [numberofguest, setNumberofguest] = useState(1);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [mobilenumber, setMobilenumber] = useState("");
  const [redirect, setRedirect] = useState("");
  const { ready, user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFullname(user.name);
      setEmail(user.email);
      loadScript("https://checkout.razorpay.com/v1/checkout.js");
    }
  }, [user]);

  let numberOfDays = 0;
  if (checkin && checkout) {
    numberOfDays = differenceInCalendarDays(
      new Date(checkout),
      new Date(checkin)
    );
  }

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
     document.body.appendChild(script);
   });
};



const handlePayment = async () => {
  try {
    if (ready && !user) {
      navigate("/login");
      return;
    }
    const response = await axios.post("/createpayment", {
      amount: numberOfDays * place.price,
    });
    const order = response.data;

    const options = {
      key: "",
      amount: numberOfDays * place.price,
      currency: "INR",
      name: "Notalgeo pvt limited",
      description: "Booking Payment",
      image: logo,
      order_id: order.id,
      handler: function (response) {
        bookThisPlace();
      },
      prefill: {
        name: fullname,
        email: email,
        contact: mobilenumber,
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  } catch (error) {
    console.log(error);
  }
};


  const bookThisPlace = async () => {
    try {
      if (ready && !user) {
        navigate("/login");
        return;
      }
      const bookingData = {
        checkin,
        checkout,
        numberofguest,
        fullname,
        email,
        mobilenumber,
        place: place._id,
        price: numberOfDays * place.price,
      };

      const response = await axios.post("/booking", bookingData);

      const bookingId = response.data.newBooking._id;
      console.log(bookingId);
      setRedirect(`/account/mybooking/${bookingId}`);
    } catch (error) {
      console.log(error);
    }
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <Row className="my-5">
        <Col sm={12} md={7} className="basic-info">
          <h3 className="head">Description</h3>
          <p className="subhead ">{place.description}</p>
          <hr className="my-5" />
          <p>Check-in: {place.checkin}</p>
          <p>Check-out: {place.checkout}</p>
          <p>Maximum number of guests: {place.maxguest}</p>
        </Col>
        <Col sm={12} md={5}>
          <div className="booking-box">
            <p className="text-center price-title">
              Price ₹{place.price}/night
            </p>
            <div className="box">
              <div className="mt-3 d-flex flex-column flex-md-row">
                <div className="checkin-out mb-3 mb-md-0">
                  <label className="me-2">Check-in:</label>
                  <input
                    className="me-2 rounded"
                    type="date"
                    value={checkin}
                    onChange={(ev) => setCheckin(ev.target.value)}
                  />
                </div>
                <div className="checkin-out">
                  <label className="me-2">Check-out:</label>
                  <input
                    className="rounded"
                    type="date"
                    value={checkout}
                    onChange={(ev) => setCheckout(ev.target.value)}
                  />
                </div>
              </div>
              <div className="mt-3">
                <label className="checkin-out">No of Guests:</label> <br />
                <input
                  className="rounded-corner py-2 w-100 w-md-50"
                  type="number"
                  value={numberofguest}
                  onChange={(ev) => setNumberofguest(ev.target.value)}
                />
              </div>
              {numberOfDays > 0 && (
                <div className="mt-3">
                  <label className="checkin-out">Full Name</label> <br />
                  <input
                    className="rounded-corner py-2 w-100 w-md-50"
                    type="text"
                    value={fullname}
                    onChange={(ev) => setFullname(ev.target.value)}
                  />
                </div>
              )}
              {numberOfDays > 0 && (
                <div className="mt-3">
                  <label className="checkin-out">Your Email</label> <br />
                  <input
                    className="rounded-corner py-2 w-100 w-md-50"
                    type="email"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                  />
                </div>
              )}
              {numberOfDays > 0 && (
                <div className="mt-3">
                  <label className="checkin-out">Mobile Number</label> <br />
                  <input
                    className="rounded-corner py-2 w-100 w-md-50"
                    type="tel"
                    value={mobilenumber}
                    onChange={(ev) => setMobilenumber(ev.target.value)}
                  />
                </div>
              )}
            </div>
            <button
              className="btn btn-danger btn-block w-100 mt-3"
              onClick={handlePayment}
            >
              {numberOfDays > 0 && (
                <span className="p-2">{numberOfDays * place.price}</span>
              )}
              Book now
            </button>
          </div>
        </Col>
      </Row>
      <div className="mt-4 extra-info">
        <h2 className="head">Extra Info</h2>
        <p className="subhead">{place.extrainfo}</p>
      </div>
    </div>
  );
};

export default Bookingwidget;
