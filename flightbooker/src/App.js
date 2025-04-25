import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import ForgotPass from "./pages/Auth/ForgotPass";
import LogInAdmin from "./pages/Auth/LogInAdmin";
import ClientDashboard from "./pages/Dashboard/Client/ClientDashboard";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/ForgotPass" element={<ForgotPass />} />
        <Route path="/LogInAdmin" element={<LogInAdmin />} />
        <Route path="/ClientDashboard" element={<ClientDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
