import React from "react";
import { useState } from "react";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import './style.css';

const Addedphotos = ({photos,onChange}) => {
    const [photolink, setPhotolink] = useState("");
   

    const addpiclick = async (e) => {
        e.preventDefault();
        try {
          const { data: filename } = await axios.post("/uploadbylink", {
            link: photolink,
          });
          onChange((prevs) => {
            return [...prevs, filename];
          });
          setPhotolink("");
        } catch (error) {
          console.error("Error occurred during upload:", error.message);
        }
      };
    
      const deletephotos = (filename) => {
        onChange(photos.filter((photo) => photo !== filename));
      };

  return (
    <>
      <p>Give nice pictures</p>
      <div className="d-flex">
        <input
          className="w-100 my-3 custom-input"
          placeholder="Add link to the photos..."
          value={photolink}
          onChange={(e) => setPhotolink(e.target.value)}
          type="text"
        />
        <span>
          <button onClick={addpiclick} className="link-btn">
            Add photos
          </button>
        </span>
      </div>
      <div className="col-sm-3 col-md-6 col-lg-6">
        {photos.length > 0 && (
          <div className="row">
            {photos.map((link, index) => (
              <div className="col-sm-3 col-md-3 col-lg-3" key={index}>
              <div className="position-relative">
                <img
                  className="img-fluid rounded uploadimg"
                  src={"http://localhost:5000/controllers/uploads/" + link}
                  alt={"http://localhost:5000/controllers/uploads/" + link}
                />
                <AiFillDelete onClick={()=>deletephotos(link)} className="position-absolute delete-icon"/>
              </div>
            </div>
            
            ))}
          </div>
        )}

      </div>
    </>
  );
};

export default Addedphotos;