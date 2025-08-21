import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import ForgotPassword from "./forgotPassword";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showForgot, setShowForgot] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login with:", { username, password });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Link
        to="/"
        className="position-absolute"
        style={{ top: "20px", left: "20px", color: "#0d6efd" }}
      >
        <FaHome size={28} />
      </Link>
      <div className="card p-4 shadow-lg" style={{ width: "350px", borderRadius: "12px" }}>
        <h3 className="text-center mb-4">Login</h3>
        {!showForgot ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>

            <div className="text-center mt-3">
              <button
                type="button"
                className="btn btn-link"
                onClick={() => setShowForgot(true)}
              >
                Forgot Password?
              </button>
            </div>
            <div className="text-center">
              Don’t have an account? <span> </span>
              <a href="/auth/signup" className="btn-link">
                Sign Up
              </a>
            </div>
          </form>
        ) : (
          <ForgotPassword setShowForgot={setShowForgot} />
        )}
      </div>
    </div>
  );
};

export default Login;
