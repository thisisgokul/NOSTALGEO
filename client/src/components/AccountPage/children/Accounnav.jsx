import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { MdAccountBalanceWallet } from 'react-icons/md';
import { BsFillHouseAddFill } from 'react-icons/bs';
import '../Account.css';

const Accounnav = () => {
  const location = useLocation();

  const isActiveLink = (pathname) => {
    return location.pathname === pathname ? 'active' : '';
  };

  return (
    <nav className="w-full d-flex justify-content-center flex-wrap my-4 gap-4">
      <Link className={`p-2 account-section ${isActiveLink('/account')}`} to="/account">
        <CgProfile /> My Profile
      </Link>
      <Link className={`p-2 account-section ${isActiveLink('/account/booking')}`} to="/account/booking">
        <MdAccountBalanceWallet /> My Bookings
      </Link>
      <Link className={`p-2 account-section ${isActiveLink('/account/places')}`} to="/account/places">
        <BsFillHouseAddFill /> Accommodations
      </Link>
    </nav>
  );
};

export default Accounnav;
