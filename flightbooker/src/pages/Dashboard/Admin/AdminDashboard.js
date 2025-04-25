import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'; 
import Sidebar from '../../../components/AdminSidebar';

import AdminHome from './AdminHome';
import AdminProfile from './AdminProfile';
import Booking from './Booking';
import Airlines from './Airlines';
import Flights from './Flights';
import BanksManagment from './BanksManagment';
import Payments from './Payments';
import Users from './Users';
import Report from './Report';
import Marketing from './Marketing';
import Feedbacks  from './Feedbacks';
import AdminSettings from './AdminSettings';


const AdminDashboard = () => {
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
              <Route path="/adminhome" element={<AdminHome />} />
              <Route path="/adminprofile" element={<AdminProfile />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/airlines" element={<Airlines />} />
              <Route path="/flights" element={<Flights/>} />
              <Route path="/banksmanagment" element={<BanksManagment />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/users" element={<Users />} />
              <Route path="/report" element={<Report />} />
              <Route path="/marketing" element={<Marketing />} />
              <Route path="/feedbacks" element={<Feedbacks />} />
              <Route path="/adminsettings" element={<AdminSettings />} />




            </Routes>

         
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
