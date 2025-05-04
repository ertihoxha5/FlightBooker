import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

      <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/adminhome">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-tachometer-alt"></i>
        </div>
        <div className="sidebar-brand-text mx-3">Admin</div>
      </a>

      <hr className="sidebar-divider my-0" />

      <li className="nav-item">
        <NavLink to="/Admin/adminhome" className="nav-link">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Home</span>
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink to="/Admin/bookings" className="nav-link">
          <i className="fas fa-fw fa-plane"></i>
          <span>Bookings</span>
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink to="/flights" className="nav-link">
          <i className="fas fa-fw fa-plane-departure"></i>
          <span>Flights</span>
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink to="/Admin/airlines" className="nav-link">
          <i className="fas fa-fw fa-building"></i>
          <span>Airlines</span>
        </NavLink>
      </li>

    

      <li className="nav-item">
        <NavLink to="/Admin/banksmanagment" className="nav-link">
          <i className="fas fa-fw fa-money-bill"></i>
          <span>Banks</span>
        </NavLink>
      </li>


      <li className="nav-item">
        <NavLink to="/report" className="nav-link">
          <i className="fas fa-fw fa-chart-bar"></i>
          <span>Reports</span>
        </NavLink>
      </li>

     

      <li className="nav-item">
        <NavLink to="/adminsettings" className="nav-link">
          <i className="fas fa-fw fa-cogs"></i>
          <span>Settings</span>
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

export default AdminSidebar;
