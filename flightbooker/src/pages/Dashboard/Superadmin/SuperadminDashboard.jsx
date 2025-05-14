import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'; 
import SuperadminSidebar from '../../../components/SuperadminSidebar';  

import SuperadminHome from './SuperadminHome';
import ProfileSettings from './ProfileSettings';
import ManageAdmins from './ManageAdmins';
import ManageAirlines from './ManageAirlines';
import ManageFlights from './ManageFlights';
import ManageBanks from './ManageBanks';
import ManageClients from './ManageClients';
import BookingsOverview from './BookingsOverview';
import Reports from './Reports';
import SystemSettings from './SystemSettings';

const SuperadminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  return (
    <div id="wrapper">
      <SuperadminSidebar /> 

      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <div className="container-fluid pt-4">
            <Routes>
              <Route path="sahome" element={<SuperadminHome />} />
              <Route path="profilesettings" element={<ProfileSettings />} />
              <Route path="manageadmins" element={<ManageAdmins />} />
              <Route path="manageairlines" element={<ManageAirlines />} />
              <Route path="manageflights" element={<ManageFlights />} />
              <Route path="managebanks" element={<ManageBanks />} />
              <Route path="manageclients" element={<ManageClients />} />
              <Route path="bookingsoverview" element={<BookingsOverview />} />
              <Route path="reports" element={<Reports />} />
              <Route path="systemsettings" element={<SystemSettings />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperadminDashboard;
