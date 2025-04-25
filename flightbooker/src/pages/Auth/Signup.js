import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setSuccess("Account created successfully!");
    setTimeout(() => navigate("/Login"), 1500); 
  };

  return (
    <div className="bg-gradient-primary min-vh-100 d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-7">
            <div className="card o-hidden border-0 shadow-lg rounded-4">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h1 className="h3 text-gray-900 fw-bold mb-1">Sign Up</h1>
                  <p className="text-muted mb-4">Create your account</p>
                </div>

                {error && <div className="alert alert-danger shadow-sm">{error}</div>}
                {success && <div className="alert alert-success shadow-sm">{success}</div>}

                <form onSubmit={handleSignup} className="user">
                  <div className="form-group mb-3">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text bg-white border-end-0">
                          <i className="fas fa-user text-primary"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control form-control-user border-start-0"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group mb-3">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text bg-white border-end-0">
                          <i className="fas fa-envelope text-primary"></i>
                        </span>
                      </div>
                      <input
                        type="email"
                        className="form-control form-control-user border-start-0"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group mb-3">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text bg-white border-end-0">
                          <i className="fas fa-lock text-primary"></i>
                        </span>
                      </div>
                      <input
                        type="password"
                        className="form-control form-control-user border-start-0"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group mb-3">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text bg-white border-end-0">
                          <i className="fas fa-lock text-primary"></i>
                        </span>
                      </div>
                      <input
                        type="password"
                        className="form-control form-control-user border-start-0"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary btn-user btn-block shadow">
                    <i className="fas fa-user-plus me-2"></i> Sign Up
                  </button>

                  <div className="text-center mt-3">
                    <a className="small text-primary" href="/Login">
                      Already have an account? Log In
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
