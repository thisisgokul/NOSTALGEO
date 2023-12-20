import React, { useContext } from "react";
import logo from "../../assets/logo.png";
import"./Header.css";
import Container from "react-bootstrap/Container";
import {  RiUserSharedFill } from 'react-icons/ri';
import { AiOutlineUserAdd ,AiOutlineBars} from 'react-icons/ai';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

const Header = () => {
 const {user}= useContext(UserContext)

  return (
    <div>
      <div className="container">
        <Navbar className="bgclr" expand="lg">
          <Container fluid>
            <Link to={'/'} className="brandLink">
            <img src={logo} alt={logo} className="logo" />
            
            <Navbar.Brand className="brandName" to='/'>NOSTALGEO</Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="mx-auto my-2 my-lg-0 d-flex nav-wraper"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <h5  className="nav-items p-2">AnyWhere</h5>
                <h5  className="nav-items p-2">AnyWeek</h5>
                <h5  className="nav-items p-2">Add Guests</h5>
                <span className="search-icon"><AiOutlineUserAdd/></span>
                       
              </Nav>
              <Nav >
              <Link to={user ? '/account' : '/login'} className="signup-Logo">
                  <AiOutlineBars size={30} /> < RiUserSharedFill size={30}/>
              </Link>
              {user ? (
                  <div className="mx-1">
                    welcome {user.name}
                  </div>
                ) : (
                  <div className="mx-1">
                   Login/signup
                  </div>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
};

export default Header;
