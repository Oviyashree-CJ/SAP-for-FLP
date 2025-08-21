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
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const storedSubjects = JSON.parse(localStorage.getItem("subjects")) || [];
    setSubjects(storedSubjects);
  }, []);


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
    <div className="d-flex flex-column min-vh-100">
      <CustomNavbar />

      <div className="container my-4">
        <div className="card shadow p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center">
              <FaUserCircle size={28} />
              <h5 className="mb-0 ms-2">
                {user.username}
              </h5>
            </div>

            <div>
              {isGuest && (
                <button className="btn btn-primary me-2" onClick={handleLogin}>
                  Login
                </button>
              )}

              <button
                className="btn btn-secondary me-2"
                onClick={handleEdit}
                disabled={isGuest || isEditing}
              >
                Edit
              </button>

              {isEditing && !isGuest && (
                <button className="btn btn-success me-2" onClick={handleSave}>
                  Save
                </button>
              )}
            </div>
          </div>

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

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Year</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.year}
                  disabled
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Department</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.department}
                  disabled
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="font-semibold block mb-2">Subjects:</label>
              <select className="form-control">
                {subjects.length > 0 ? (
                  subjects.map((sub, i) => (
                    <option key={i} value={sub}>
                      {sub}
                    </option>
                  ))
                ) : (
                  <option value="none">None</option>
                )}
              </select>
            </div>

            <button
              type="button"
              className="btn mt-3"
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
