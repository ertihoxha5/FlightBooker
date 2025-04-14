import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("All the fields are required");
      return;
    }

    if (email === "superadmin@flightbooker.com" && password === "password123") {
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("email", email);
      setSuccess("Logged in successfully");
    } else {
      setError("Email or Password are incorrect");
    }
  };

  return (
    <div
      className="bg-primary bg-gradient text-white"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "0 15px",
      }}
    >
      <div
        className="shadow-lg p-5 rounded-4"
        style={{
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          width: "100%",
          maxWidth: "400px",
          color: "white",
        }}
      >
        <h2 className="text-center mb-4">LOG IN</h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Write your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Write your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="text-end mb-3">
            <a
              href="/ForgotPass"
              className="text-light small text-decoration-none"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="btn btn-light text-primary w-100 fw-bold"
          >
            LOG IN
          </button>

          <button
            type="button"
            className="btn btn-outline-light mt-3 w-100 fw-bold text-hover-primary"
          >
            LOG IN AS ADMIN
          </button>

          <div className="text-center mt-3">
            <a
              href="/Signup"
              className="text-light small text-decoration-none"
              //{onClick={() => navigate("/Signup")}}
            >
              Don't have an account? <strong>Sign Up</strong>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
