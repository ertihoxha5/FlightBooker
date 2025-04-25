import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function LogInAdmin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password || !code) {
      setError("All the fields are required");
      return;
    }

    if (
      email === "admin@flightbooker.com" &&
      password === "password123" &&
      code === "12344321"
    ) {
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("email", email);
      setSuccess("Logged in successfully");

      navigate("/Admin/adminhome");
    } else {
      setError("Email, Password or Code are incorrect");
    }
  };

  return (
    <div className="bg-gradient-primary min-vh-100 d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-7">
            <div className="card o-hidden border-0 shadow-lg rounded-4">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h1 className="h3 text-gray-900 fw-bold mb-1">Welcome Back!</h1>
                  <p className="text-muted mb-4">Access your FlightBooker dashboard</p>
                </div>

                {error && <div className="alert alert-danger shadow-sm">{error}</div>}
                {success && <div className="alert alert-success shadow-sm">{success}</div>}

                <form onSubmit={handleLogin} className="admin">
                  <div className="form-group mb-3">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text bg-white border-end-0">
                          <i className="fas fa-envelope text-primary"></i>
                        </span>
                      </div>
                      <input
                        type="email"
                        className="form-control form-control-admin border-start-0"
                        placeholder="Enter Email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group mb-4">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text bg-white border-end-0">
                          <i className="fas fa-lock text-primary"></i>
                        </span>
                      </div>
                      <input
                        type="password"
                        className="form-control form-control-admin border-start-0"
                        placeholder="Enter Password..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group mb-4">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text bg-white border-end-0">
                          <i className="fas fa-code text-primary"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control form-control-admin border-start-0"
                        placeholder="Enter Unique Code..."
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-outline-primary btn-user btn-block mt-3 shadow-sm"
                  >
                    <i className="fas fa-user-shield me-2"></i> Log In
                  </button>

                  <hr className="my-4" />
                  <div className="text-center">
                    <a className="small text-primary" href="/Login">
                      Back to Login
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

export default LogInAdmin;