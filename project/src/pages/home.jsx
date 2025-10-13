// DashboardHome.jsx
import React from "react";
import { Carousel, Nav, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaRobot } from "react-icons/fa";
import CustomNavbar from "../components/navbar";

import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
   const handleLogin = () => navigate("/auth/login");
  return (
    <div className="d-flex flex-column vh-100">
      <CustomNavbar />
      <div className="d-flex flex-grow-1 pb-4">
        <div
          className="d-flex flex-column p-4 shadow-lg"
          style={{ width: "220px" }}
        >
          <h5 className="mb-4">Dashboard</h5>
          <Nav className="flex-column" style={{ fontSize: "18px" }}>
            <Nav.Link href="/scheduler" >Scheduler</Nav.Link>
            <Nav.Link href="/course">Course</Nav.Link>
            <Nav.Link href="/chatbot">Clarification</Nav.Link>
            <Nav.Link href="/relax">Relaxation</Nav.Link>
            <Nav.Link href="/view-progress">View Progress</Nav.Link>
            <Nav.Link className="text-light btn me-2" onClick={handleLogin} style={{ backgroundColor: "#ad11b8ff" }}>
                  Login
            </Nav.Link>

          </Nav>
        </div>

        <div className="flex-grow-1 p-4 position-relative">
          <Carousel>
            <Carousel.Item>
            {/* Background Image */}
            <img
              className="d-block w-100"
              src="/P6.png"   // replace with your image path
              alt="First slide"
              style={{ height: "80vh", objectFit: "fit" }}
              onClick={() => navigate("/")} // ensures full cover
            />


            {/* Optional Caption */}
            <Carousel.Caption>
              <p>dotLearn - A Smart Learning Platform</p>
            </Carousel.Caption>
          </Carousel.Item>
            <Carousel.Item>
            {/* Background Image */}
            <img
              className="d-block w-100"
              src="/P1.jpg"   // replace with your image path
              alt="First slide"
              style={{ height: "80vh", objectFit: "fit" }}
              onClick={() => navigate("/scheduler")} // ensures full cover
            />

            {/* Optional Caption */}
            <Carousel.Caption>
              <p className="text-dark"> Smart Scheduler</p>
            </Carousel.Caption>
          </Carousel.Item>

            <Carousel.Item>
            {/* Background Image */}
            <img
              className="d-block w-100"
              src="/P2.jpg"   // replace with your image path
              alt="First slide"
              style={{ height: "80vh", objectFit: "fit" }}
              onClick={() => navigate("/course")} // ensures full cover
            />


            {/* Optional Caption */}
            <Carousel.Caption>
              <p className="text-dark">Courses with study materials</p>
            </Carousel.Caption>
          </Carousel.Item>


            <Carousel.Item>
            {/* Background Image */}
            <img
              className="d-block w-100"
              src="/P3.jpg"   // replace with your image path
              alt="First slide"
              style={{ height: "80vh", objectFit: "fit" }} 
              onClick={() => navigate("/view-progress")}// ensures full cover
            />

            {/* Optional Caption */}
            <Carousel.Caption>
              <p className="text-dark">Progress Tracker</p>
            </Carousel.Caption>
          </Carousel.Item>


           <Carousel.Item>
            {/* Background Image */}
            <img
              className="d-block w-100"
              src="/P4.jpg"   // replace with your image path
              alt="First slide"
              style={{ height: "80vh", objectFit: "fit" }}
              onClick={() => navigate("/chatbot")} // ensures full cover
            />

            {/* Optional Caption */}
            <Carousel.Caption>
              <p>Chatbot for Clarification</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            {/* Background Image */}
            <img
              className="d-block w-100"
              src="/P5.jpg"   // replace with your image path
              alt="First slide"
              style={{ height: "80vh", objectFit: "fit" }}
              onClick={() => navigate("/relax")} // ensures full cover
            />

            {/* Optional Caption */}
            <Carousel.Caption>
              <p>Relaxation Module</p>
            </Carousel.Caption>
          </Carousel.Item>
          </Carousel>

          {/* Chatbot Icon */}
          <Button
            variant="primary"
            className="position-absolute"
            style={{ bottom: "5px", right: "20px", borderRadius: "60%" }}
            onClick={() => navigate("/chatbot")}>
            <FaRobot size={26} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
