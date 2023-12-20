import React from "react";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { FaUserTie } from "react-icons/fa";
import "./Account.css";
import axios from "axios";
import PlacesPage from "../subpages/PlacesPage";
import Accounnav from "./children/Accounnav";
const ProfilePage = () => {
  const [redirect, setRedirect] = useState(false);
  const { ready, user, setUser } = useContext(UserContext);
  const { subpage } = useParams();
  let updatedSubpage = subpage;
  if (subpage === undefined) {
    updatedSubpage = "profile";
  }

  async function logout() {
    await axios.post("/logout", {});
    setRedirect(true);
    setUser(null);
  }

  if (!ready) {
    return (
      <div
        className="d-flex justify-content-center align-items-center "
        style={{ marginTop: "200px" }}
      >
        <TailSpin
          height="80"
          width="80"
          radius="9"
          color="blue"
          ariaLabel="loading"
          wrapperStyle={{}}
          wrapperClass="spinner-wrapper"
        />
      </div>
    );
  }
  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div>
      {/* account {user.name}    {user && user.name} */}

      <Accounnav />
      {updatedSubpage === "profile" && (
        <div className="d-flex justify-content-center align-items-center flex-column mt-5">
          <div className="profile-wraper">
            <h3 className="text-center my-5">Logged in as {user.name}</h3>
            <div className="d-flex justify-content-center">
              <FaUserTie className="user-icon" />
            </div>
            <br />
            <div className="d-flex justify-content-center align-items-center">
              <button onClick={logout} className="btn logoutbtn">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
      {subpage === "places" && (
        <div>
          <PlacesPage />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
