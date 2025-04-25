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



    </div>
  );
};

export default AdminHome;
