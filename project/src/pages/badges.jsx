// App.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaMedal, FaGem, FaStar } from "react-icons/fa"; // Icons for badges
import CustomNavbar from "../components/navbar";

// Badge Data
const BADGES = [
  { name: "Bronze", points: 50, icon: <FaMedal color="#cd7f32" size={40} /> },
  { name: "Silver", points: 100, icon: <FaMedal color="#c0c0c0" size={40} /> },
  { name: "Gold", points: 250, icon: <FaMedal color="#ffd700" size={40} /> },
  { name: "Platinum", points: 500, icon: <FaStar color="#e5e4e2" size={40} /> },
  { name: "Diamond", points: 1000, icon: <FaGem color="#b9f2ff" size={40} /> },
  { name: "Ruby", points: 1500, icon: <FaGem color="#e0115f" size={40} /> },
  { name: "Sapphire", points: 2000, icon: <FaGem color="#0f52ba" size={40} /> },
  { name: "Emerald", points: 3000, icon: <FaGem color="#50c878" size={40} /> },
  { name: "Pearl", points: 4000, icon: <FaGem color="#f0eada" size={40} /> },
  { name: "Crystal", points: 5000, icon: <FaGem color="#b9f2ff" size={40} /> },
];

// Badges Component (Single Page)
function Badges() {
  return (
    <div className="d-flex flex-column vh-100">
      <CustomNavbar />
    <div className="container my-4">
      <h3 className="mb-4 text-center" style={{ color: "#ad11b8ff" }}>
        Our Badges
      </h3>
      <div className="row g-3">
        {BADGES.map((badge) => (
          <div key={badge.name} className="col-6 col-md-4 col-lg-3">
            <div
              className="card text-center h-100"
              style={{
                backgroundColor: "#ad11b8ff",
                color: "white",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                borderRadius: "10px",
                padding: "20px",
                transition: "transform 0.2s",
              }}
            >
              <div className="mb-2">{badge.icon}</div>
              <h5 className="card-title">{badge.name}</h5>
              <p className="card-text">{badge.points} Points</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default Badges;
