import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Ju lutem plotësoni të gjitha fushat.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5215/api/Auth/login",
        {
          email,
          password,
        }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: response.data.username,
            email: response.data.email,
            role: response.data.role,
          })
        );

        // Navigate based on role
        switch (response.data.role) {
          case "SuperAdmin":
            navigate("/Superadmin/sahome");
            break;
          case "Admin":
            navigate("/Admin/adminhome");
            break;
          case "User":
            navigate("/Client/home");
            break;
          default:
            navigate("/");
        }
      }
    } catch (error) {
      setError(error.response?.data?.message || "Email ose password i gabuar.");
    }
  };

  return (
    <div className="bg-gradient-primary min-vh-100 d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card o-hidden border-0 shadow-lg">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h1 className="h4 text-gray-900 fw-bold">
                    Mirë se vini përsëri!
                  </h1>
                  <p className="text-muted">
                    Hyni në panelin tuaj të FlightBooker
                  </p>
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
                        placeholder="Shkruani email-in tuaj"
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
                        placeholder="Fjalëkalimi"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-block mb-3 shadow-sm"
                  >
                    <i className="fas fa-sign-in-alt me-2"></i> Hyni
                  </button>

                  <div className="text-center">
                    <a className="small text-primary" href="/forgotpass">
                      Keni harruar fjalëkalimin?
                    </a>
                  </div>
                  <div className="text-center mt-2">
                    <span className="small">Nuk keni llogari? </span>
                    <a className="small text-primary fw-bold" href="/signup">
                      Regjistrohuni
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
