import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GrLocation } from "react-icons/gr";
import { IoMdPhotos } from "react-icons/io";
import { Row, Col } from "react-bootstrap";
import "./singlepage.css";
import Showallphotos from "./children/Showallphotos";
import Bookingwidget from "./children/Bookingwidget";
import Pagefeatures from "./children/Pagefeatures";
import Googlemap from "./children/Googlemap";



const Singlepage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showphotos, setShowphotos] = useState(false);
  useEffect(() => {
    const fetchPlaceData = async () => {
      try {
        const response = await axios.get(`/placeDataid/${id}`);
        setPlace(response.data);
      } catch (error) {
        console.error("Error fetching place data:", error);
      }
    };

    fetchPlaceData();
  }, [id]);

  if (!place) return null;

  if (showphotos) {
    return (
      <div>
        <Showallphotos place={place} setShowphotos={setShowphotos} />
      </div>
    );
  }

  return (
    <div className="wraper">
      <div className="container">
        <div className="m-4">
          <h1 className="title">{place.title}</h1>
          <a
            className="location"
            href={`https://www.google.com/maps?q=${encodeURIComponent(
              place.address
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="mx-1">
              <GrLocation />
            </span>
            {place.address}
          </a>
          <Row className="mt-4 img-box position-relative">
            <Col xs={12} md={8} lg={8} xl={6}>
              <div className="">
                <img
                  src={`http://localhost:5000/${place.uploadphotos[0]}`}
                  alt={`http://localhost:5000/${place.uploadphotos}`}
                  className="img-fluid mb-2 mx-3 big-img"
                  style={{ width: "100%", height: "410px" }}
                />
              </div>
            </Col>
            <Col xs={12} md={4} lg={4} xl={3} className="position-relative">
              <div className="">
                <img
                  src={`http://localhost:5000/${place.uploadphotos[1]}`}
                  alt={`http://localhost:5000/${place.uploadphotos}`}
                  className="img-fluid small-img"
                  style={{ width: "100%", height: "200px" }}
                />
              </div>
              <div className="overflow-hidden">
                <img
                  src={`http://localhost:5000/controllers/uploads/${place.photos[0]}`}
                  alt={`http://localhost:5000/controllers/uploads/${place.photos[0]}`}
                  className="img-fluid mt-2 small-img2"
                  style={{ width: "100%", height: "200px" }}
                />
                <button
                  className="position-absolute 
              bottom-0 mb-3 delete-btn px-4 end-0 me-4"
                  onClick={() => setShowphotos(true)}
                >
                  <span>
                    <IoMdPhotos className="mb-1" />
                  </span>
                  Show All
                </button>
              </div>
            </Col>
          </Row>
          <div className="mt-5">
            <Bookingwidget place={place}/>
            <hr className="my-5"/>
            <div className="mt-3">
              <Pagefeatures place={place}/>
            </div>
          </div>
          <div className="my-5">
          <Googlemap place={place.address}/>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default Singlepage;
