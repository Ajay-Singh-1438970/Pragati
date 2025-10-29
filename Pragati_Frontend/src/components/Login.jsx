import React, { useContext, useEffect, useState } from "react";
import { Modal, Button, Form, NavItem } from "react-bootstrap";
import "./Login.css";
import axios from "axios";
import { AuthContext } from "../AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = ({ show, handleClose }) => {
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    avatar: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData
      );
      if (res.data) {
        alert(res.data.message);
        setFormData({
          fullName: "",
          avatar: "",
          email: "",
          password: "",
          confirmPassword: "",

        });
      }
      setIsSignup(false);
    } catch (e) {
      console.error(e);
      alert(e.response?.data?.message || "Signup failed!");
    }
  };

  

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      if (res.data.token) {
        alert("Login Successful!");

        // ✅ Update AuthContext instead of only setting localStorage
        login(
          { email: formData.email }, // you can replace with res.data.user if backend returns it
          res.data.token
        );
        if(res.data.user.role === "admin"){
          sessionStorage.setItem("role","admin");
          navigate('/admin');
        }else if(res.data.user.role === "user"){
          navigate('/')
        }
        

        handleClose();
      }
    } catch (e) {
      console.error(e);
      alert(e.response?.data?.message || "Login failed!");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <div className="login-card light-theme">
        <button className="close-btn" onClick={handleClose}>
          ✕
        </button>

        <h2 className="login-title">{isSignup ? "Sign Up" : "Sign In"}</h2>
        <p className="login-subtitle">
          {isSignup ? "Create your account" : "Login with email"}
        </p>

        {!isSignup ? (
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="yourgmail@gmail.com"
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                required
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-flex justify-content-between mb-3">
              <a href="#reset" className="reset-link">
                Forgot password?
              </a>
            </div>

            <Button type="submit" className="sign-btn w-100">
              Sign In
            </Button>

            <p className="switch-text mt-3">
              Don’t have an account?{" "}
              <button
                type="button"
                className="switch-btn"
                onClick={() => setIsSignup(true)}
              >
                Sign Up
              </button>
            </p>
          </Form>
        ) : (
          <Form onSubmit={handleSignup}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                required
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </Form.Group>
           
            <Form.Group className="mb-3">
              <Form.Label>Avatar URL</Form.Label>
              <Form.Control
                type="URL"
                placeholder="Enter your avatar URL"
                required
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                required
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                required
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </Form.Group>

            <Button type="submit" className="sign-btn w-100">
              Sign Up
            </Button>

            <p className="switch-text mt-3">
              Already have an account?{" "}
              <button
                type="button"
                className="switch-btn"
                onClick={() => setIsSignup(false)}
              >
                Login
              </button>
            </p>
          </Form>
        )}
      </div>
    </Modal>
  );
};

export default Login;
