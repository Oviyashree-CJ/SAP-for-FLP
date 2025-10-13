import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getCurrentUser } from "../services/api"; // use /auth/me instead
import Login from "../components/login";
import Signup from "../components/signup";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation(); // read current path
  const [loading, setLoading] = useState(true);

  // Decide which form to show based on URL
  const isLogin = location.pathname.includes("login");

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await getCurrentUser();
        if (res?.authenticated && res.user?.login === "yes") {
          navigate("/dashboard"); // redirect if already logged in
          return;
        }
      } catch (err) {
        console.error("Error checking login:", err);
      }
      setLoading(false); // show Auth page if not logged in
    };

    checkLogin();
  }, [navigate]);

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg">
        {isLogin ? <Login /> : <Signup />}
      </div>
    </div>
  );
};

export default Auth;
