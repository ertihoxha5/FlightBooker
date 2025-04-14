import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function LogInAdmin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode]  = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password || !code)  {
      setError("All the fields are required");
      return;
    }

    if (email === "admin@flightbooker.com" && password === "password123") {
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("email", email);
      setSuccess("Logged in successfully");
    } else {
      setError("Email or Password are incorrect");
    }
    navigate("/Login.js");
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
        <h2 className="text-center mb-4">LOG IN AS ADMIN</h2>

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

          <div className="mb-2">
            <label htmlFor="code" className="form-label">
              Unique Code
            </label>
            <input
              type="text"
              className="form-control"
              id="code"
              placeholder="Write your code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            
            />
          </div>


           <button
            type="submit"
            className="btn btn-light text-primary w-100 fw-bold"
          >
            LOG IN AS ADMIN
          </button>

         
         
        </form>
      </div>
    </div>
  );
}

export default LogInAdmin; 