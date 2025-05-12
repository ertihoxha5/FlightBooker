import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    emri: '',
    mbiemri: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    rruga: '',
    zipCode: '',
    qyteti: '',
    gjinia: '',
    dataLindjes: '',
    shteti: ''
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validimi bazë
    if (!formData.emri || !formData.mbiemri || !formData.email || !formData.username || !formData.password || !formData.confirmPassword) {
      setError("Të gjitha fushat e detyrueshme duhen plotësuar");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Fjalëkalimet nuk përputhen");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(formData.email)) {
      setError("Email-i nuk është i vlefshëm");
      return;
    }

    if (formData.password.length < 6) {
      setError("Fjalëkalimi duhet të ketë të paktën 6 karaktere");
      return;
    }

    try {
      const response = await fetch('http://localhost:5215/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Regjistrimi dështoi');
      }

      setSuccess("Llogaria u krijua me sukses!");
      setTimeout(() => navigate("/Login"), 1500);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="bg-gradient-primary min-vh-100 d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-9">
            <div className="card o-hidden border-0 shadow-lg rounded-4">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h1 className="h3 text-gray-900 fw-bold mb-1">Regjistrohu</h1>
                  <p className="text-muted mb-4">Krijo llogarinë tënde</p>
                </div>

                {error && <div className="alert alert-danger shadow-sm">{error}</div>}
                {success && <div className="alert alert-success shadow-sm">{success}</div>}

                <form onSubmit={handleSignup} className="user">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <input
                          type="text"
                          name="emri"
                          className="form-control"
                          placeholder="Emri"
                          value={formData.emri}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <input
                          type="text"
                          name="mbiemri"
                          className="form-control"
                          placeholder="Mbiemri"
                          value={formData.mbiemri}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <input
                          type="text"
                          name="username"
                          className="form-control"
                          placeholder="Username"
                          value={formData.username}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          placeholder="Fjalëkalimi"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <input
                          type="password"
                          name="confirmPassword"
                          className="form-control"
                          placeholder="Konfirmo fjalëkalimin"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <input
                          type="text"
                          name="rruga"
                          className="form-control"
                          placeholder="Rruga"
                          value={formData.rruga}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <input
                          type="text"
                          name="zipCode"
                          className="form-control"
                          placeholder="Zip Code"
                          value={formData.zipCode}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <input
                          type="text"
                          name="qyteti"
                          className="form-control"
                          placeholder="Qyteti"
                          value={formData.qyteti}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <select
                          name="gjinia"
                          className="form-control"
                          value={formData.gjinia}
                          onChange={handleChange}
                        >
                          <option value="">Zgjidh Gjininë</option>
                          <option value="M">Mashkull</option>
                          <option value="F">Femër</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <input
                          type="date"
                          name="dataLindjes"
                          className="form-control"
                          value={formData.dataLindjes}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <input
                          type="text"
                          name="shteti"
                          className="form-control"
                          placeholder="Shteti"
                          value={formData.shteti}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary btn-user btn-block shadow w-100">
                    <i className="fas fa-user-plus me-2"></i> Regjistrohu
                  </button>

                  <div className="text-center mt-3">
                    <a className="small text-primary" href="/Login">
                      Ke një llogari? Hyni
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
