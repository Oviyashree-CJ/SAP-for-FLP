import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/api"; 

const Logout = () => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await logoutUser();
      if (res.data.success) {
        navigate("/auth/login");
      } else {
        alert(res.data.message || "No user is logged in");
      }
    } catch (err) {
      console.error("Logout error:", err);
      alert("Logout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    setShowConfirm(true);
  };

  return (
    <>
      {!showConfirm ? (
        <button
          onClick={handleClick}
          className="mt-4 text-danger bg-transparent border-0 text-start"
        >
          Log Out
        </button>
      ) : (
        <div className="d-flex flex-column align-items-center mt-5">
          <h3>Confirm Logout</h3>
          <p>Are you sure you want to logout?</p>

          <div className="d-flex justify-content-center align-items-center gap-5">
            <button
              className="btn btn-secondary"
              onClick={() => setShowConfirm(false)}
            >
              Back
            </button>

            <button
              className="btn btn-danger"
              onClick={handleLogout}
              disabled={loading}
            >
              {loading ? "Checking..." : "Submit"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Logout;
