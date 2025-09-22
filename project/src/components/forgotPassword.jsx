import { useState } from "react";
import axios from "axios";

const ForgotPassword = ({ setShowForgot }) => {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/reset-password", {
        username,
        new_password: newPassword,
      });

      alert("Password has been updated successfully!");
      setShowForgot(false);
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("Failed to reset password. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Enter your Username</label>
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Enter New Password</label>
        <input
          type="password"
          className="form-control"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Confirm New Password</label>
        <input
          type="password"
          className="form-control"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn-warning w-100">
        Reset Password
      </button>

      <div className="text-center mt-3">
        <button
          type="button"
          className="btn btn-link"
          onClick={() => setShowForgot(false)}
        >
          Back to Login
        </button>
      </div>
    </form>
  );
};

export default ForgotPassword;
