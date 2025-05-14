import React from 'react';
import { FaChartBar, FaPlane, FaMoneyBill, FaUsers } from 'react-icons/fa';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from 'recharts';
  

const Report = () => {
    const data = [
        { month: 'Janar', revenue: 10000 },
        { month: 'Shkurt', revenue: 12000 },
        { month: 'Mars', revenue: 8000 },
        { month: 'Prill', revenue: 15000 },
        { month: 'Maj', revenue: 17000 },
      ];
      
  return (
    <div className="container-fluid">
      <h4 className="mb-4 text-gray-800">Reports Overview</h4>

      <div className="row">
        <div className="col-md-6 col-xl-3 mb-4">
          <div className="card shadow border-left-primary py-3 px-3">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h6 className="text-primary text-uppercase mb-1">Totali i Fluturimeve</h6>
                <h4 className="mb-0 font-weight-bold">320</h4>
              </div>
              <FaPlane size={28} className="text-primary" />
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xl-3 mb-4">
          <div className="card shadow border-left-success py-3 px-3">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h6 className="text-success text-uppercase mb-1">Te ardhurat</h6>
                <h4 className="mb-0 font-weight-bold">$145,000</h4>
              </div>
              <FaMoneyBill size={28} className="text-success" />
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xl-3 mb-4">
          <div className="card shadow border-left-warning py-3 px-3">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h6 className="text-warning text-uppercase mb-1">Klientet e ri</h6>
                <h4 className="mb-0 font-weight-bold">+25%</h4>
              </div>
              <FaUsers size={28} className="text-warning" />
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xl-3 mb-4">
          <div className="card shadow border-left-danger py-3 px-3">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h6 className="text-danger text-uppercase mb-1">Fluturimet e Anuluara</h6>
                <h4 className="mb-0 font-weight-bold">12</h4>
              </div>
              <FaChartBar size={28} className="text-danger" />
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow mb-4">
        <div className="card-header py-3 bg-white">
          <h6 className="m-0 font-weight-bold text-primary">Te ardhurat me kalimin e kohes</h6>
        </div>
        <div className="card-body">
          <p>//Chart Statik(Backend me bo Dinamik</p>
          <div className="text-center text-muted">
          <ResponsiveContainer width="100%" height={300}>
  <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="month" />
    <YAxis />
    <Tooltip />
    <Line type="monotone" dataKey="revenue" stroke="#4e73df" strokeWidth={2} />
  </LineChart>
</ResponsiveContainer>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
