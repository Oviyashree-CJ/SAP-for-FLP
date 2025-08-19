import React, { useState } from "react";

const ForgotPassword = ({ setShowForgot }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password reset link sent to:", email);
    alert("Password reset link has been sent to your email!");
    setShowForgot(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Enter your registered Email</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn-warning w-100">
        Send Reset Link
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
