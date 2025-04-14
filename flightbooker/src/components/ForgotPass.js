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
      setError('Ju lutem pranoni Terms dhe Conditions.');
      return;
    }

    if (passRi !== konfirmimi) {
      setError('Passwordi gabim!');
      return;
    }

    setSuccess('Password-i u ndryshua me sukses!');
    setTimeout(() => navigate("/Login"), 1500);
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
        <h2 className="text-center mb-4">Change Password</h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">
              New Password
            </label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              placeholder="Enter new password"
              value={passRi}
              onChange={(e) => setPassRi(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm new password"
              value={konfirmimi}
              onChange={(e) => setKonfirmimi(e.target.value)}
              required
            />
          </div>

          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="termsCheck"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="termsCheck">
              I accept Terms & Conditions
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-light text-primary w-100 fw-bold"
          >
            Reset Password
          </button>

          <div className="text-center mt-3">
            <a
              href="/Login"
              className="text-light small text-decoration-none"
            >
              Go back to <strong>Login</strong>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPass;
