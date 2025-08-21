import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import CustomNavbar from "../components/navbar";

const ProfilePage = () => {
  const navigate = useNavigate();

  const initialUser = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    year: "3",
    department: "Information Technology",
    username: "Guest",
  };

  const [user, setUser] = useState(initialUser);
  const [formData, setFormData] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setFormData(storedUser);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    const updatedUser = { ...user, ...formData };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setIsEditing(false);
  };

  const handleLogin = () => navigate("/auth/login");

  const handleChangePassword = () => navigate("/forgot-password");

  const isGuest = user.username === "Guest";

  return (
    <div className="d-flex flex-column vh-100">
      <CustomNavbar />

      <div className="container my-4">
        <div className="card shadow p-4">
          {/* Top row: icon + username + buttons */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center">
              <FaUserCircle size={28} />
              <h5 className="mb-0 ms-2">
                {user.username}
              </h5>
            </div>

            <div>
              {/* Login button visible only if Guest */}
              {isGuest && (
                <button className="btn btn-primary me-2" onClick={handleLogin}>
                  Login
                </button>
              )}

              {/* Edit button always visible but disabled if Guest */}
              <button
                className="btn btn-secondary me-2"
                onClick={handleEdit}
                disabled={isGuest || isEditing}
              >
                Edit
              </button>

              {/* Save button only visible if editing and not Guest */}
              {isEditing && !isGuest && (
                <button className="btn btn-success me-2" onClick={handleSave}>
                  Save
                </button>
              )}
            </div>
          </div>

          {/* Form fields */}
          <form>
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                disabled={isGuest || !isEditing}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                disabled={isGuest || !isEditing}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isGuest || !isEditing}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                type="text"
                className="form-control"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={isGuest || !isEditing}
              />
            </div>

            <div className="mb-3 flex-wrap">
              <label className="form-label">Year</label>
              <input type="text" className="form-control" value={formData.year} disabled />
            </div>

            <div className="mb-3">
              <label className="form-label">Department</label>
              <input type="text" className="form-control" value={formData.department} disabled />
            </div>

            {/* Change password always visible but disabled if Guest */}
            <button
              type="button"
              className="btn w-20 mt-3 text-dark"
              onClick={handleChangePassword}
              disabled={isGuest}
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
