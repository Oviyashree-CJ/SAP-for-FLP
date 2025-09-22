import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getUserProfile } from "../services/api";
import Login from "../components/login";
import Signup from "../components/signup";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation(); // read current path
  const [loading, setLoading] = useState(true);

  // Decide which form to show based on URL
  const isLogin = location.pathname.includes("login"); // true for /auth/login, false for /auth/signup

  useEffect(() => {
    const checkLogin = async () => {
      const userId = localStorage.getItem("user_id");
      if (userId) {
        try {
          const res = await getUserProfile(userId);
          if (res.data.login === "yes") {
            navigate("/dashboard"); // redirect if already logged in
            return;
          }
        } catch (err) {
          console.error("Error checking login:", err);
        }
      }
      setLoading(false); // show Auth page if not logged in
    };

    checkLogin();
  }, [navigate]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg">
        {isLogin ? <Login /> : <Signup />}
      </div>
    </div>
  );
};

export default Auth;
