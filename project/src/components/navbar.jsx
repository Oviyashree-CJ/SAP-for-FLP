import { useEffect, useState } from "react";
import { ProgressBar, Navbar, Nav } from "react-bootstrap";
import { FaCoins, FaAward, FaUserCircle } from "react-icons/fa";
import { useLocation, Link } from "react-router-dom";
import { API } from "../services/api";

const CustomNavbar = ({ overallProgress}) => {
  const location = useLocation();
  const [rewards, setRewards] = useState({ points: 0 });


  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await API.get("/api/rewards", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRewards(res.data);
      } catch (err) {
        console.error("Failed to fetch rewards:", err);
      }
    };

    fetchRewards();
  }, []);

  if (["/auth", "/auth/login", "/auth/signup"].includes(location.pathname)) {
    return null;
  }

  return (
    <Navbar expand="lg" className="px-3 shadow-lg">
      <Navbar.Brand as={Link} to="/" 
        style={{
          fontFamily: "'Dancing Script', cursive", // pick any Google Font
          fontWeight: "900",
          fontSize: "28px",
          color: "#ad11b8ff"
      }}>
        dotLearn
      </Navbar.Brand>

      <div className="ms-auto d-flex gap-3 align-items-center">
        <span className="mb-1">Progress:</span>
        <ProgressBar
            now={overallProgress}
            label={`${Math.floor(overallProgress)}%`}
            style={{ width: "250px"}}
          />
        <div className="text-center">
          <FaCoins size={24} />
          <div style={{ fontSize: "12px" }}>Points: { rewards.points } </div>
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
