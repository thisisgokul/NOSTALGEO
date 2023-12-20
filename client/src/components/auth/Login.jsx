import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Form, Container, Row, Col } from "react-bootstrap";
import {SiGnuprivacyguard} from 'react-icons/si'
import axios from "axios";
import "./auth.css";
import { UserContext } from "../UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);
  const [error,setError]=useState('');

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill the Form to continue');
      return;
    }
    try {
      const { data } = await axios.post("/login", { email, password });
      setUser(data);
      alert("Login successful");
      setRedirect(true);
    } catch (error) {
      setError('email or password is incorrect')
      console.log(error);
    }
  };

  if (redirect) {
    return <Navigate to={'/'} />
    
  }

  return (
    <div className="mt-5 ">
      <Container>
        <div className="mt-4">
          <Row className="justify-content-center mt-5">
            <Col className="login-wraper " xs={12} sm={8} md={6} lg={4}>
              <h3 className="text-center mb-4 login">
                <SiGnuprivacyguard className="mb-2"/>Login</h3>
              <Form onSubmit={onHandleSubmit}>
                <Form.Group controlId="formEmail">
                  <label>Email address</label>
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
                {error && <div className="text-danger">{error}</div>}

                <button
                  type="submit"
                  className="form-control loginbtn rounded submit mt-4 px-3"
                >
                  Sign In
                </button>

                <div
                  
                  className="mt-2 registerhere"
                >
                  Don't have an Account?
                  <Link className="registerhere" to="/register">
                    Create account
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

export default Login;
