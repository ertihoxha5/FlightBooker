import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function ForgotPass() {
  const navigate = useNavigate();
  const [passRi, setPassRi] = useState('');
  const [konfirmimi, setKonfirmimi] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!acceptedTerms) {
      setError('Please accept the Terms and Conditions.');
      return;
    }

    if (passRi !== konfirmimi) {
      setError('Passwords do not match!');
      return;
    }

    setSuccess('Password changed successfully!');
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
                  <h1 className="h3 text-gray-900 fw-bold mb-1">Change Password</h1>
                  <p className="text-muted mb-4">Enter your new password</p>
                </div>

                {error && <div className="alert alert-danger shadow-sm">{error}</div>}
                {success && <div className="alert alert-success shadow-sm">{success}</div>}

                <form onSubmit={handleSubmit} className="user">
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
                        placeholder="Enter New Password"
                        value={passRi}
                        onChange={(e) => setPassRi(e.target.value)}
                        required
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
                        placeholder="Confirm New Password"
                        value={konfirmimi}
                        onChange={(e) => setKonfirmimi(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="terms"
                      checked={acceptedTerms}
                      onChange={() => setAcceptedTerms(!acceptedTerms)}
                    />
                    <label className="form-check-label" htmlFor="terms">
                      I accept the <a href="/terms" className="text-decoration-none text-primary">Terms and Conditions</a>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-user btn-block shadow"
                    disabled={!acceptedTerms}
                  >
                    Reset Password
                  </button>

                  <div className="text-center mt-3">
                    <a className="small text-primary" href="/Login">
                      Go back to Login
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

export default ForgotPass;
