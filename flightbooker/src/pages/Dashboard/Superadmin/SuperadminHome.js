import React from 'react';
import { FaUserShield, FaPlane, FaUsers, FaUniversity, FaClipboardList, FaCog } from 'react-icons/fa';

const SuperadminHome = () => {
  return (
    <div className="container-fluid">

      {/* Heading */}
      <h1 className="h3 mb-4 text-gray-800">Welcome, Super Admin</h1>

      {/* Summary Cards */}
      <div className="row">
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                  Total Admins
                </div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">15</div>
              </div>
              <FaUserShield size={28} className="text-primary" />
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                  Total Airlines
                </div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">27</div>
              </div>
              <FaPlane size={28} className="text-success" />
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-info shadow h-100 py-2">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                  Registered Clients
                </div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">2,340</div>
              </div>
              <FaUsers size={28} className="text-info" />
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                  Connected Banks
                </div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">8</div>
              </div>
              <FaUniversity size={28} className="text-warning" />
            </div>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <div className="row mt-4">
        <div className="col-lg-8">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Superadmin System Overview</h6>
            </div>
            <div className="card-body">
              <p>Manage all admins, oversee airlines and clients, monitor bank integrations, and ensure system-wide operations are running smoothly.</p>
              <p>Here you have full control to add, update, and deactivate users, manage company settings, and view financial and operational reports at a higher level.</p>
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
                <a href="/superadmin/admins" className="list-group-item list-group-item-action">
                  <FaUserShield className="mr-2" /> Manage Admins
                </a>
                <a href="/superadmin/airlines" className="list-group-item list-group-item-action">
                  <FaPlane className="mr-2" /> Manage Airlines
                </a>
                <a href="/superadmin/clients" className="list-group-item list-group-item-action">
                  <FaUsers className="mr-2" /> Manage Clients
                </a>
                <a href="/superadmin/managebanks" className="list-group-item list-group-item-action">
                  <FaUniversity className="mr-2" /> Manage Banks
                </a>
                <a href="/superadmin/settings" className="list-group-item list-group-item-action">
                  <FaCog className="mr-2" /> System Settings
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="row mt-4">
        <div className="col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Recent Activities</h6>
            </div>
            <div className="card-body">
              <ul>
                <li>New admin "Alice Morgan" added to system.</li>
                <li>Airline "GlobalWings" verified successfully.</li>
                <li>Bank "SafePay" integrated into the payment system.</li>
                <li>Client account "David90" suspended due to payment issues.</li>
                <li>System settings updated: New terms of service published.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="row mt-4">
        <div className="col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">System Health Status</h6>
            </div>
            <div className="card-body">
              <p><strong>Server Status:</strong> <span className="text-success">Operational</span></p>
              <p><strong>Database:</strong> <span className="text-success">Connected</span></p>
              <p><strong>Payment Gateways:</strong> <span className="text-warning">Partial Downtime</span></p>
              <p><strong>Email Service:</strong> <span className="text-success">Active</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center mt-5 py-4 border-top text-muted">
        <p className="mb-0">&copy; {new Date().getFullYear()} FlightBooker. All rights reserved.</p>
        <small>
          <a href="/terms" className="text-muted mx-2">Terms of Service</a> |
          <a href="/privacy" className="text-muted mx-2">Privacy Policy</a> |
          <a href="/contact" className="text-muted mx-2">Contact Us</a>
        </small>
      </footer>

    </div>
  );
};

export default SuperadminHome;