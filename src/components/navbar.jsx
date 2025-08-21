import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { FaCoins, FaAward, FaUserCircle } from "react-icons/fa";
import { useLocation, Link } from "react-router-dom";

const CustomNavbar = () => {
  const location = useLocation();

  // Hide navbar on login and signup pages
  if (location.pathname === "/auth" || location.pathname === "/auth/login" || location.pathname === "/auth/signup") {
    return null;
  }

  return (
    <Navbar bg="light" expand="lg" className="px-3">
      <Navbar.Brand as={Link} to="/">
        Website Name
      </Navbar.Brand>

      <div className="ms-auto d-flex gap-3 align-items-center">
        <div className="text-center">
          <FaCoins size={24} />
          <div style={{ fontSize: "12px" }}>Points: 0</div>
        </div>
        <div className="text-center">
          <FaAward size={24} />
          <div style={{ fontSize: "12px" }}>Badges</div>
        </div>
        <div className="text-center">
          <Nav.Link as={Link} to="/profile" className="d-flex flex-column align-items-center text-center">
            <FaUserCircle size={28} />
            <small>Profile</small>
          </Nav.Link>


        </div>
      </div>
    </Navbar>
  );
};

export default CustomNavbar;
