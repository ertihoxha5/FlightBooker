import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPass from "./components/ForgotPass";
import LogInAdmin from "./components/LogInAdmin";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/ForgotPass" element={<ForgotPass />} />
        <Route path="/LogInAdmin" element={<LogInAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
