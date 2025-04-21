import React from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'; 

import Home from './Home';
import Profile from './Profile';
import Wallet from './Wallet';
import Banks from './Banks';
import BookFlight from './BookFlight';
import MyFlights from './MyFlights';
import Explore from './Explore';

const ClientDashboard = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {

    localStorage.removeItem('userToken');  

    navigate('/login');
  };

  return (
    <div className="container-fluid">
      <div className="row vh-100">

        <div className="col-md-3 bg-primary text-white p-4">
          <h2 className="mb-4">FlightBooker</h2>
          <ul className="nav flex-column">
            <li className="nav-item">
              <NavLink to="/" className="nav-link text-white">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/profile" className="nav-link text-white">Profile</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/wallet" className="nav-link text-white">Wallet</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/banks" className="nav-link text-white">Banks</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/book-flight" className="nav-link text-white">Book Flight</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/my-flights" className="nav-link text-white">My Flights</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/explore" className="nav-link text-white">Explore</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/explore" className="nav-link text-white">Settings</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/explore" className="nav-link text-white">Contact Us</NavLink>
            </li>
          </ul>

         
          <button onClick={handleLogout} className="btn btn-danger mt-4">
            Log Out
          </button>
        </div>

        <div className="col-md-9 bg-light p-4 overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/banks" element={<Banks />} />
            <Route path="/book-flight" element={<BookFlight />} />
            <Route path="/my-flights" element={<MyFlights />} />
            <Route path="/explore" element={<Explore />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
