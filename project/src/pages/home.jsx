// DashboardHome.jsx
import React from "react";
import { Carousel, Nav, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaRobot } from "react-icons/fa";
import CustomNavbar from "../components/navbar";
import SignOut from "../components/signout";
const Home = () => {
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
            <Nav.Link href="#">Course</Nav.Link>
            <Nav.Link href="#">Clarification</Nav.Link>
            <Nav.Link href="#">Achievements</Nav.Link>
            <Nav.Link href="#">View Progress</Nav.Link>
            <Nav.Link as="div">
              <SignOut />
            </Nav.Link>

          </Nav>
        </div>

        <div className="flex-grow-1 p-4 position-relative">
          <Carousel>
            <Carousel.Item>
                <div className="d-flex align-items-center justify-content-center bg-light" style={{height: '80vh'}}>
                <h3>Page 1 Placeholder</h3>
                </div>
                <Carousel.Caption>
                <p>Description for Page 1</p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <div className="d-flex align-items-center justify-content-center bg-secondary text-white" style={{height: '80vh'}}>
                <h3>Page 2 Placeholder</h3>
                </div>
                <Carousel.Caption>
                <p>Description for Page 2</p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <div className="d-flex align-items-center justify-content-center bg-dark text-white" style={{height: '80vh'}}>
                <h3>Page 3 Placeholder</h3>
                </div>
                <Carousel.Caption>
                <p>Description for Page 3</p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <div className="d-flex align-items-center justify-content-center bg-info text-dark" style={{height: '80vh'}}>
                <h3>Page 4 Placeholder</h3>
                </div>
                <Carousel.Caption>
                <p>Description for Page 4</p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <div className="d-flex align-items-center justify-content-center bg-warning text-dark" style={{height: '80vh'}}>
                <h3>Page 5 Placeholder</h3>
                </div>
                <Carousel.Caption>
                <p>Description for Page 5</p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <div className="d-flex align-items-center justify-content-center bg-warning text-dark" style={{height: '80vh'}}>
                <h3>Page 6 Placeholder</h3>
                </div>
                <Carousel.Caption>
                <p>Description for Page 6</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>

          {/* Chatbot Icon */}
          <Button
            variant="primary"
            className="position-absolute"
            style={{ bottom: "5px", right: "20px", borderRadius: "60%" }}
          >
            <FaRobot size={26} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
