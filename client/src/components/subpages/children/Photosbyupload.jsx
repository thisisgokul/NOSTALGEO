import React from "react";
import axios from "axios";
import { AiFillDelete,AiFillStar } from "react-icons/ai";
import { FaFileUpload } from "react-icons/fa";
import "./style.css";

const Photosbyupload = ({ uploadphotos, onChange }) => {
  const uploadfile = (e) => {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      console.log(files.length);
      data.append("photos", files[i]);
    }

    axios
      .post("/upload", data, {
        headers: { "Content-Type": "multipart/form-Data" },
      })
      .then((res) => {
        const { data: filename } = res;
        onChange((prevs) => {
          return [...prevs, ...filename];
        });
      });
  };

  const deletephotos = (filename) => {
    onChange([...uploadphotos.filter((photo) => photo !== filename)]);
  };
  function selectAsMainPhoto(ev, filename) {
    ev.preventDefault();
    onChange([filename, ...uploadphotos.filter((photo) => photo !== filename)]);
  }
  return (
    <div className="col-sm-3 col-md-6 col-lg-6">
      {uploadphotos.length > 0 && (
        <div className="row">
          {uploadphotos.map((photos, index) => (
            <div
              className="col-sm-3 col-md-3 col-lg-3 position-relative"
              key={index}
            >
              <img
                className="img-fluid rounded uploadimg"
                src={"http://localhost:5000/" + photos}
                alt={"http://localhost:5000/" + photos}
              />
              <AiFillDelete
                onClick={() => deletephotos(photos)}
                className="position-absolute delete-icon"
              />
               <AiFillStar onClick={(ev) => selectAsMainPhoto(ev, photos)}
                className="position-absolute edit-icon"/>
            </div>
          ))}
        </div>
      )}

      <label className="img-btn">
        <input type="file" multiple onChange={uploadfile} className="hidden" />
        <FaFileUpload className="m-2" />
        Upload
      </label>
    </div>
  );
};

export default Photosbyupload;
