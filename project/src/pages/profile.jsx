import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import CustomNavbar from "../components/navbar";
import { getCurrentUser, updateUserProfile } from "../services/api";
import Logout from "../pages/signout";
import initialUser from "../context/initialUser";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(initialUser);
  const [formData, setFormData] = useState(initialUser);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getCurrentUser();
        if(res && res.authenticated){
          setUser(res.user);
          setFormData(res.user);
        }
        else{
          setUser(initialUser);
          setFormData(initialUser);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      await updateUserProfile(formData);
      const res = await getCurrentUser();
      if (res && res.authenticated) {
        setUser(res.user);
        setFormData(res.user);
      }
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to update user profile:", err);
      alert("Could not update profile. Try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return <p className="text-center mt-5">Loading profile...</p>;
  }

  const handleChangePassword = () => navigate("/forgot-password");
  const isGuest = user.username === "Guest";

  return (
    <div className="d-flex flex-column min-vh-100">
      <CustomNavbar />

      <div className="container mt-4">
        <div className="card shadow p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center">
              <FaUserCircle size={28} />
              <h5 className="mb-0 ms-2">{user.username}</h5>
            </div>

            <div>
              {!isGuest && (
                  <Logout />

              )} 
              <button className="btn btn-primary me-2"
                      onClick={() => setIsEditing(true)}
                      disabled={isGuest || isEditing}>
                Edit
              </button>
              {isEditing && (
                <button className="btn btn-success me-2" onClick={handleSave}>
                  Save
                </button>
              )}
            </div>
          </div>

          <form>
            {["firstname", "lastname", "email", "phone_no"].map((field) => (
              <div className="mb-3" key={field}>
                <label className="form-label">
                  {field.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  className="form-control"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  disabled={isGuest || !isEditing}
                />
              </div>
            ))}

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Year</label>
                <input type="text" className="form-control" value={user.year} disabled />
              </div>
              <div className="col-md-6">
                <label className="form-label">Department</label>
                <input
                  type="text"
                  className="form-control"
                  value={user.department}
                  disabled
                />
              </div>
            </div>

            <button
                type="button"
                className="btn text-light mt-3"
                onClick={handleChangePassword}
                disabled={isGuest}
                style={{ backgroundColor: "#ad11b8ff" }}
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
