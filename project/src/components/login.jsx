import { useState } from "react";
import { loginUser } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaEye, FaEyeSlash } from "react-icons/fa";
import ForgotPassword from "./forgotPassword";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setError("Both fields are required.");
      return;
    }

    try {
      setLoading(true);
      const response = await loginUser(formData);

      if (response.data.user_id) {
      localStorage.setItem("token", response.data.access_token);
      if (response.data.user_id) {
        localStorage.setItem("user_id", response.data.user_id);
      }
    }

      alert(response.data.message || "Login successful!");
      navigate("/"); // redirect after login
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
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
                name="username"
                className="form-control"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3 position-relative">
              <label className="form-label fw-semibold">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span
                className="position-absolute"
                style={{
                  top: "38px",
                  right: "10px",
                  cursor: "pointer",
                  color: "#6c757d"
                }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {error && <div className="text-danger mb-3">{error}</div>}

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
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
