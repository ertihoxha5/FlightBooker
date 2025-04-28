import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };
  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

      <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/ClientDashboard">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-plane"></i>
        </div>
        <div className="sidebar-brand-text mx-3">FlightBooker</div>
      </a>

      <hr className="sidebar-divider my-0" />

      <li className="nav-item">
        <NavLink to="/Client/home" className="nav-link">
          <i className="fas fa-fw fa-home"></i>
          <span>Home</span>
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink to="/Client/profile" className="nav-link">
          <i className="fas fa-fw fa-user"></i>
          <span>Profile</span>
        </NavLink>
      </li>

      

      <li className="nav-item">
        <NavLink to="/Client/banks" className="nav-link">
          <i className="fas fa-fw fa-university"></i>
          <span>Banks</span>
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink to="/Client/book-flight" className="nav-link">
          <i className="fas fa-fw fa-plane-departure"></i>
          <span>Book Flight</span>
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink to="/Client/my-flights" className="nav-link">
          <i className="fas fa-fw fa-ticket-alt"></i>
          <span>My Flights</span>
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink to="/Client/explore" className="nav-link">
          <i className="fas fa-fw fa-map"></i>
          <span>Explore</span>
        </NavLink>
      </li>
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

export default Sidebar;
