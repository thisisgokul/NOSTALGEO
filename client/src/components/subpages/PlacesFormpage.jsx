import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import "./style.css";
import Features from "./children/Features";
import Address from "./children/Address";
import Description from "./children/Description";
import ExtraInfo from "./children/ExtraInfo";
import Photosbylink from "./children/Photosbylink";
import Photosbyupload from "./children/Photosbyupload";
import axios from "axios";
import Accounnav from "../AccountPage/children/Accounnav";

const PlacesFormpage = () => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [photos, setPhotos] = useState([]);
  const [uploadphotos, setUploadphotos] = useState([]);
  const [description, setDescription] = useState("");
  const [extrainfo, setExtrainfo] = useState("");
  const [features, setFeatures] = useState([]);
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [maxguest, setMaxguest] = useState(1);
  const [price, setPrice] = useState(200);
  const [redirect, setRedirect] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/placeDataid/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setPhotos(data.photos);
      setUploadphotos(data.uploadphotos);
      setDescription(data.description);
      setExtrainfo(data.extrainfo);
      setFeatures(data.features);
      setCheckin(data.checkin);
      setCheckout(data.checkout);
      setMaxguest(data.maxguest);
      setPrice(data.price);
    });
  }, [id]);

  const savePlaces = async (e) => {
    e.preventDefault();
    const placeData = {
      title,
      address,
      photos,
      uploadphotos,
      description,
      extrainfo,
      features,
      checkin,
      checkout,
      maxguest,
      price
    };
    try {
      if (id) {
        await axios.put("/placesupdate/", { id, ...placeData });
        setRedirect(true);
        alert("updated successfully");
      } else {
        await axios.post("/place", { ...placeData });
        setRedirect(true);
        alert("place added");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (redirect) {
    return <Navigate to="/account/places" />;
  }

  return (
    <div className="container">
      <Accounnav />
      <div className="my-5">
        <form onSubmit={savePlaces}>
          <h5>Tittle</h5>
          <p>Tittle should be catchy and attractive</p>
          <input
            className="w-100 my-3 custom-input"
            placeholder="Title, give a title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
          />
          <h5>Address</h5>
          <p>Give a proper address</p>
          <Address onChange={setAddress} address={address} />
          <h5>Photos</h5>
          <Photosbylink photos={photos} onChange={setPhotos} />
          <Photosbyupload
            uploadphotos={uploadphotos}
            onChange={setUploadphotos}
          />
          <Description onChange={setDescription} description={description} />
          <Features selected={features} onChange={setFeatures} />
          <ExtraInfo onChange={setExtrainfo} extrainfo={extrainfo} />
          <h5 className="mt-5">Checkin&out Time</h5>
          <p>Give the details of checkin checkout informations</p>
          <div className="d-flex flex-wrap">
            <div className="col-sm-12 col-md-3 m-2">
              <div>
                <h5>Check-in Time</h5>
                <input
                  type="text"
                  value={checkin}
                  onChange={(e) => setCheckin(e.target.value)}
                  placeholder="12:00"
                  className="w-100 custom-input"
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-3 m-2">
              <div>
                <h5>Check-out Time</h5>
                <input
                  type="text"
                  value={checkout}
                  onChange={(e) => setCheckout(e.target.value)}
                  placeholder="9:00"
                  className="w-100 custom-input"
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-3 m-2">
              <div>
                <h5>No. of Guests</h5>
                <input
                  type="number"
                  value={maxguest}
                  onChange={(e) => setMaxguest(e.target.value)}
                  className="w-100 custom-input"
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-3 m-2">
              <div>
                <h5>Price</h5>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-100 custom-input"
                />
              </div>
            </div>
          </div>
          <button type="submit" className="w-100 save-btn mt-4">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlacesFormpage;
