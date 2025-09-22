import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/api"; 

const LogoutConfirmation = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await logoutUser();

      if (res.data.success) {
        // Clear all stored data
        localStorage.removeItem("token");
        localStorage.removeItem("studySession");
        localStorage.removeItem("today_timespent");
        localStorage.removeItem("today_subjects");

        navigate("/auth/login");
      } else {
        alert(res.data.message || "Invalid username or password. Try again.");
      }
    } catch (err) {
      console.error("Logout error:", err);
      alert("Logout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <h3>Confirm Logout</h3>
      <p>Are you sure you want to logout</p>

      <form onSubmit={handleLogout} className="w-50">
        
        <div className="d-flex justify-content-center align-items-center gap-5">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/home")} // back to home
          >
            Back
          </button>

          <button type="submit" className="btn btn-danger" disabled={loading}>
            {loading ? "Checking..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LogoutConfirmation;
