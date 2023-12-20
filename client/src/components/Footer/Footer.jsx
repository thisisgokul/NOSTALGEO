import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { GrFacebook, GrTwitter, GrGoogle, GrInstagram, GrLinkedin, GrGithub } from "react-icons/gr";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer-wraper mt-5">
      <footer className="text-center text-lg-start text-white" style={{ backgroundColor: "#1c2331" }}>
        <section className="d-flex justify-content-between p-4" style={{ backgroundColor: "#" }}>
          <div className="me-5">
            <span>Get connected with us on social networks:</span>
          </div>
          <div>
            <a href="/" className="text-white me-4">
              <GrFacebook />
            </a>
            <a href="/" className="text-white me-4">
              <GrTwitter />
            </a>
            <a href="/" className="text-white me-4">
              <GrGoogle />
            </a>
            <a href="/" className="text-white me-4">
              <GrInstagram />
            </a>
            <a href="/" className="text-white me-4">
              <GrLinkedin />
            </a>
            <a href="/" className="text-white me-4">
              <GrGithub />
            </a>
          </div>
        </section>
        <section>
          <Container className="text-center text-md-start mt-5">
            <Row className="mt-3 ">
              <Col md={4} lg={4} xl={4}  mb={4}>
                <h6 className="text-uppercase fw-bold">Company name</h6>
                <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: 60, height: 2 }} />
                <p>
                Notalgeo is an innovative and user-friendly booking app that simplifies the process of finding and booking accommodations for travelers.
                </p>
              </Col>
              <Col md={4} lg={4} xl={4}  mb={4}>
                <h6 className="text-uppercase fw-bold">Contact</h6>
                <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: 60, height: 2 }} />
                <p>
                  <i className="fas fa-home mr-3" /> INDIA, KERALA 10012, IN
                </p>
                <p>
                  <i className="fas fa-envelope mr-3" /> notalgeo@example.com
                </p>
                <p>
                  <i className="fas fa-phone mr-3" /> + 01 234 567 88
                </p>
              </Col>
              <Col md={4} lg={4} xl={4}  mb={4}>
                <h6 className="text-uppercase fw-bold">Quick Links</h6>
                <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: 60, height: 2 }} />
                <p>
                  <Link to={'/account'} className="text-white">Your Account</Link>
                </p>

            
                <p>
                  <a href="#!" className="text-white">Help</a>
                </p>
              </Col>
            </Row>
          </Container>
        </section>
        <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
          © 2023 Notalgeo.com
        </div>
      </footer>
    </div>
  );
};

export default Footer;
