import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import ForgotPass from "./pages/Auth/ForgotPass";
import LogInAdmin from "./pages/Auth/LogInAdmin";
import ClientDashboard from "./pages/Dashboard/Client/ClientDashboard";
import AdminDashboard from "./pages/Dashboard/Admin/AdminDashboard";
import SuperadminDashboard from "./pages/Dashboard/Superadmin/SuperadminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpass" element={<ForgotPass />} />
        <Route path="/loginadmin" element={<LogInAdmin />} />

        {/* CLIENT Dashboard */}
        <Route path="/Client/*" element={<ClientDashboard />} />

        {/* ADMIN Dashboard */}
        <Route path="/Admin/*" element={<AdminDashboard />} />

        {/* SUPERADMIN Dashboard */}
        <Route path="/Superadmin/*" element={<SuperadminDashboard />} />

      </Routes>
    </Router>
  );
}

export default App;

