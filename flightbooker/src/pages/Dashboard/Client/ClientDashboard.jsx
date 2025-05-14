import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'; 
import Sidebar from '../../../components/Sidebar';

import Home from './Home';
import Profile from './Profile';
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
    <div id="wrapper">
      <Sidebar />

      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">

          <div className="container-fluid pt-4">
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/banks" element={<Banks />} />
              <Route path="/book-flight" element={<BookFlight />} />
              <Route path="/my-flights" element={<MyFlights />} />
              <Route path="/explore" element={<Explore />} />
            </Routes>

         
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;