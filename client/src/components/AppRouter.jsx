import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import UserContextprovider from "./UserContext";
import Layout from "./Layout";
import ProfilePage from "./AccountPage/ProfilePage";
import PlacesPage from "./subpages/PlacesPage";
import PlacesFormpage from "./subpages/PlacesFormpage";
import Bookings from "./subpages/Bookings";
import Indexpage from "./Indexpage/Indexpage";
import Singlepage from "./subpages/Singlepage";
import { Mybooking } from "./subpages/Mybooking";
import Footer from "./Footer/Footer";

const AppRouter = () => {
  return (
    <UserContextprovider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Indexpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormpage />} />
          <Route path="/account/places/:id" element={<PlacesFormpage />} />
          <Route path="/place/:id" element={<Singlepage/>}/>
          <Route path="/account/booking" element={<Bookings />} />
          <Route path="/account/mybooking/:id" element={<Mybooking/>}/>
        </Route>
      </Routes>
      <Footer/>
    </UserContextprovider>
  );
};

export default AppRouter;
