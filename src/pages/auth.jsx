import React, { useState } from "react";
import Login from "../components/login";
import Signup from "../components/signup";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg">
        <h2 className="text-center mb-4">{isLogin ? "Login" : "Sign Up"}</h2>
        {isLogin ? <Login /> : <Signup />}
        <div className="text-center mt-3">
          <button
            className="btn btn-link"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
