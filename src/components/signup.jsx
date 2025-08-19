import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    year: "3",
    department: "Information Technology",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // Regex patterns
  const regex = {
    firstname: /^[A-Za-z]{2,}$/, // Only letters, at least 2 characters
    lastname: /^[A-Za-z]{1,}$/, // Only letters, at least 1 character
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email validation
    phone: /^[6-9]\d{9}$/, // Indian phone number (10 digits starting with 6-9)
    username: /^[a-zA-Z0-9._-]{4,15}$/, // Letters, numbers, ., _, - (4–15 chars)
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/, // Min 6 chars, at least 1 letter & 1 number
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on typing
  };

  const validateForm = () => {
    let newErrors = {};

    if (!regex.firstname.test(formData.firstname)) {
      newErrors.firstname = "First name must contain only letters (min 2).";
    }
    if (!regex.lastname.test(formData.lastname)) {
      newErrors.lastname = "Last name must contain only letters.";
    }
    if (!regex.email.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!regex.phone.test(formData.phone)) {
      newErrors.phone = "Phone must be a valid 10-digit number (starting 6-9).";
    }
    if (!regex.username.test(formData.username)) {
      newErrors.username =
        "Username must be 4–15 characters (letters, numbers, . _ -).";
    }
    if (!regex.password.test(formData.password)) {
      newErrors.password =
        "Password must be min 6 chars, with at least 1 letter & 1 number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Signup data:", formData);
      navigate("/select-sub");
    } else {
      alert("Please correct the errors before submitting.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light py-5">
      <Link to="/" className="position-absolute" style={{ top: "20px", left: "20px", color: "#0d6efd" }}>
          <FaHome size={28} />
      </Link>
      <div
        className="card p-4 shadow-lg"
        style={{ width: "600px", borderRadius: "12px" }}
      >
        <h3 className="text-center mb-4">Sign Up</h3>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">First Name</label>
              <input
                type="text"
                name="firstname"
                className="form-control"
                value={formData.firstname}
                onChange={handleChange}
                required
              />
              {errors.firstname && (
                <div className="text-danger">{errors.firstname}</div>
              )}
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Last Name</label>
              <input
                type="text"
                name="lastname"
                className="form-control"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
              {errors.lastname && (
                <div className="text-danger">{errors.lastname}</div>
              )}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Phone</label>
            <input
              type="tel"
              name="phone"
              className="form-control"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            {errors.phone && (
              <div className="text-danger">{errors.phone}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Year</label>
            <select
              name="year"
              className="form-select"
              value={formData.year}
              onChange={handleChange}
            >
              <option value="3">3</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Department</label>
            <select
              name="department"
              className="form-select"
              value={formData.department}
              onChange={handleChange}
            >
              <option value="Information Technology">
                Information Technology
              </option>
            </select>
          </div>

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
            {errors.username && (
              <div className="text-danger">{errors.username}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && (
              <div className="text-danger">{errors.password}</div>
            )}
          </div>

          <button type="submit" className="btn btn-success w-100">
            Sign Up
          </button>

          <div className="text-center mt-3">
            Already have an account?<span> </span>
            <a href="/auth/login" className="btn-link">
               Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
