import React from 'react';
import { FaPlane, FaUsers, FaMoneyBill, FaChartBar, FaClipboardList } from 'react-icons/fa';

const AdminHome = () => {
  return (
    <div className="container-fluid">

      <h1 className="h3 mb-4 text-gray-800">Welcome Back, Admin</h1>
      <div className="row">
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                  Total Flights
                </div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">320</div>
              </div>
              <FaPlane size={28} className="text-primary" />
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                  Active Users
                </div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">1,452</div>
              </div>
              <FaUsers size={28} className="text-success" />
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                  Monthly Revenue
                </div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">$92,340</div>
              </div>
              <FaMoneyBill size={28} className="text-warning" />
            </div>
          </div>
        </div>


        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-info shadow h-100 py-2">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                  New Reports
                </div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">8</div>
              </div>
              <FaChartBar size={28} className="text-info" />
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-lg-8">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Admin System Overview</h6>
            </div>
            <div className="card-body">
              <p>This dashboard allows you to manage users, flights, bookings, banks, and monitor reports or payments.</p>
              <p>More analytics and visualizations will be integrated soon. Keep an eye on the dashboard for updates on performance metrics, reports, and user activities.</p>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Quick Actions</h6>
            </div>
            <div className="card-body">
              <div className="list-group">
                <a href="/admin/bookings" className="list-group-item list-group-item-action">
                  <FaClipboardList className="mr-2" /> View Bookings
                </a>
                <a href="/admin/users" className="list-group-item list-group-item-action">
                  <FaUsers className="mr-2" /> Manage Users
                </a>
                <a href="/admin/flights" className="list-group-item list-group-item-action">
                  <FaPlane className="mr-2" /> Manage Flights
                </a>
                <a href="/admin/reports" className="list-group-item list-group-item-action">
                  <FaChartBar className="mr-2" /> View Reports
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Recent Activities</h6>
            </div>
            <div className="card-body">
              <ul>
                <li>Flight #180 booked by user John Doe.</li>
                <li>User Jane Smith updated her profile.</li>
                <li>New payment of $1,500 received for Booking #230.</li>
                <li>New report generated for monthly financial review.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">System Health</h6>
            </div>
            <div className="card-body">
              <p><strong>Server Status:</strong> <span className="text-success">Online</span></p>
              <p><strong>Database Connection:</strong> <span className="text-success">Connected</span></p>
              <p><strong>Payment Gateway:</strong> <span className="text-danger">Offline</span></p>
            </div>
          </div>
        </div>
      </div>



    </div>
  );
};

export default AdminHome;
