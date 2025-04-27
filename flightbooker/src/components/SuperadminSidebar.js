import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const SuperadminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

      <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/Superadmin/sahome">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-user-shield"></i>
        </div>
        <div className="sidebar-brand-text mx-3">Super Admin</div>
      </a>

      <hr className="sidebar-divider my-0" />

      <li className="nav-item">
        <NavLink to="/Superadmin/sahome" className="nav-link">
          <i className="fas fa-fw fa-home"></i>
          <span>Home</span>
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink to="/Superadmin/profilesettings" className="nav-link">
          <i className="fas fa-fw fa-user-cog"></i>
          <span>Profile Settings</span>
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink to="/Superadmin/manageadmins" className="nav-link">
          <i className="fas fa-fw fa-user-shield"></i>
          <span>Manage Admins</span>
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink to="/Superadmin/manageairlines" className="nav-link">
          <i className="fas fa-fw fa-plane"></i>
          <span>Manage Airlines</span>
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink to="/Superadmin/manageflights" className="nav-link">
          <i className="fas fa-fw fa-plane-departure"></i>
          <span>Manage Flights</span>
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink to="/Superadmin/managebanks" className="nav-link">
          <i className="fas fa-fw fa-university"></i>
          <span>Manage Banks</span>
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink to="/Superadmin/manageclients" className="nav-link">
          <i className="fas fa-fw fa-users"></i>
          <span>Manage Clients</span>
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink to="/Superadmin/paymentsoverview" className="nav-link">
          <i className="fas fa-fw fa-credit-card"></i>
          <span>Payments Overview</span>
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink to="/Superadmin/bookingsoverview" className="nav-link">
          <i className="fas fa-fw fa-ticket-alt"></i>
          <span>Bookings Overview</span>
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink to="/Superadmin/reports" className="nav-link">
          <i className="fas fa-fw fa-chart-bar"></i>
          <span>Reports</span>
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink to="/Superadmin/promotions" className="nav-link">
          <i className="fas fa-fw fa-bullhorn"></i>
          <span>Promotions</span>
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink to="/Superadmin/notificationmanagment" className="nav-link">
          <i className="fas fa-fw fa-bell"></i>
          <span>Notification Management</span>
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink to="/Superadmin/emailtemplates" className="nav-link">
          <i className="fas fa-fw fa-envelope"></i>
          <span>Email Templates</span>
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink to="/Superadmin/cms" className="nav-link">
          <i className="fas fa-fw fa-file-alt"></i>
          <span>CMS</span>
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink to="/Superadmin/auditlogs" className="nav-link">
          <i className="fas fa-fw fa-history"></i>
          <span>Audit Logs</span>
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink to="/Superadmin/systemlogs" className="nav-link">
          <i className="fas fa-fw fa-server"></i>
          <span>System Logs</span>
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink to="/Superadmin/systemsettings" className="nav-link">
          <i className="fas fa-fw fa-cogs"></i>
          <span>System Settings</span>
        </NavLink>
      </li>

      {/* Logout */}
      <li className="nav-item">
        <NavLink
          to="/login"
          className="nav-link"
          onClick={handleLogout}
        >
          <i className="fas fa-fw fa-sign-out-alt"></i>
          <span>Logout</span>
        </NavLink>
      </li>

      <hr className="sidebar-divider d-none d-md-block" />
    </ul>
  );
};

export default SuperadminSidebar;
