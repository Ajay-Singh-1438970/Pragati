import React, { useContext, useState } from "react";
import { Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import Sidebar from "./Sidebar/Sidebar";
import Login from "./Login";
import { AuthContext } from "../AuthProvider";

const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const {isLoggedIn, logout} = useContext(AuthContext);

  return (
    <>
      <Nav className="navbar navbar-light bg-light shadow-sm">
        {/* Logo */}
        <div>
          <img
          className="mx-3"
          style={{ width: "50px", height: "50px" }}
          src={Logo}
          alt="logo"
        />
          </div>
        <div className="d-flex mx-4">
          {/* Search */}
          <input
            type="text"
            className="form-control me-3"
            placeholder="Search..."
            style={{ maxWidth: "200px" }}
          />

          {/* Links */}
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/resource">Resource</Nav.Link>
          <Nav.Link as={Link} to="/about">About</Nav.Link>
          <Nav.Link as={Link} to="/contact">Contact</Nav.Link>

          {/* Login OR Sidebar */}
          {!isLoggedIn ? (
            <Button variant="primary" onClick={() => {setShowModal(true) }}>
              SignUp/Login
            </Button>
          ) : (
            <Sidebar onClose={logout} />
          )}
        </div>
      </Nav>

      {/* Login Modal */}
      <Login
        show={showModal}
        handleClose={() => setShowModal(false)}
      />
    </>
  );
};

export default Navbar;
