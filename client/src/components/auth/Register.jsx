import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Container, Row, Col } from "react-bootstrap";
import {MdAppRegistration} from 'react-icons/md'
import axios from "axios";
import "./auth.css";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate=useNavigate()
  const onHandlesubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
  
    try {
      await axios.post("/signup", {
        name,
        email,
        password,
      });
      alert('success')
      navigate('/login')

    } catch (error) {
        console.log(error);
        alert('failed')
    }
  };

  return (
    <div className="my-5 loginpage-wraper">
      <Container>
        <div className="my-4">
          <Row className="justify-content-center my-5 ">
            <Col className="login-wraper2" xs={12} sm={8} md={6} lg={4}>
              <h3 className="text-center mb-4 login"><MdAppRegistration className="mb-1"/>Sign up</h3>
              <Form onSubmit={onHandlesubmit}>
                <Form.Group controlId="formName">
                  <label>Full Name</label>
                  <Form.Control
                   className="inputs"
                    type="Name"
                    placeholder="Enter fullName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                   className="inputs"
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                   className="inputs"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Label className="text-danger">{error}</Form.Label>
                <button
                  type="submit"
                  className="form-control loginbtn rounded submit mt-4 px-3"
                >
                  Sign In
                </button>
                <div
                  style={{ color: "#051254c0" }}
                  className="mt-2 registerhere"
                >
                  Already Registered?
                  <Link to="/login" className="registerhere">
                    Login here
                  </Link>
                </div>
              </Form>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Register;
