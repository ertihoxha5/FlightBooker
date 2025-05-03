import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (email === "superadmin@flightbooker.com" && password === "password123") {
      localStorage.setItem("userLoggedIn", true);
      navigate("/Superadmin/sahome");
      return;
    }

    if (email === "admin@flightbooker.com" && password === "password123") {
      localStorage.setItem("userLoggedIn", true);
      navigate("/Admin/adminhome");
      return;
    }

    if (email === "user@gmail.com" && password === "password123") {
      localStorage.setItem("userLoggedIn", true);
      navigate("/Client/home");
      return;
    }

    setError("Invalid email or password.");
  };

  return (
    <div className="bg-gradient-primary min-vh-100 d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card o-hidden border-0 shadow-lg">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h1 className="h4 text-gray-900 fw-bold">Welcome Back!</h1>
                  <p className="text-muted">Access your FlightBooker dashboard</p>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleLogin}>
                  <div className="form-group mb-3">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text bg-white border-end-0">
                          <i className="fas fa-envelope text-primary"></i>
                        </span>
                      </div>
                      <input
                        type="email"
                        className="form-control border-start-0"
                        placeholder="Write your Email"
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
                        className="form-control border-start-0"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-block mb-3 shadow-sm"
                  >
                    <i className="fas fa-sign-in-alt me-2"></i> Log In
                  </button>

                  <div className="text-center">
                    <a className="small text-primary" href="/forgotpass">
                      Forgot Password?
                    </a>
                  </div>
                  <div className="text-center mt-2">
                    <span className="small">Don’t have an account? </span>
                    <a className="small text-primary fw-bold" href="/signup">
                      Sign Up
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

export default Login;
