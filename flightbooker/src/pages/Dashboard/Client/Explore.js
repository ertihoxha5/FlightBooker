import React, { useState } from 'react';
import { FaSearch, FaPlaneDeparture, FaFilter } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ stops: '', price: '' });

  const handleSearch = () => {
    // This is where search logic would go
    console.log('Search for:', searchQuery, 'with filters:', filters);
  };

  return (
    <div className="container-fluid">
      <div className="text-center mb-5">
        <FaPlaneDeparture size={40} className="text-primary mb-2" />
        <h2 className="h3 text-gray-800">Explore Flights</h2>
        <p className="text-muted">Search and explore available flights based on your preferences.</p>
      </div>

      {/* Search Bar */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <div className="input-group shadow-sm">
            <input
              type="text"
              className="form-control"
              placeholder="Search by destination, airline, or flight..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="input-group-append">
              <button className="btn btn-primary" onClick={handleSearch}>
                <FaSearch />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card shadow border-left-info p-3">
            <h5><FaFilter className="mr-2" />Filters</h5>
            <label className="mt-2">Number of Stops</label>
            <select className="form-control" onChange={e => setFilters({ ...filters, stops: e.target.value })}>
              <option value="">Any</option>
              <option value="0">Non-stop</option>
              <option value="1">1 Stop</option>
              <option value="2+">2+ Stops</option>
            </select>

            <label className="mt-3">Price Range</label>
            <select className="form-control" onChange={e => setFilters({ ...filters, price: e.target.value })}>
              <option value="">Any</option>
              <option value="low">Under $300</option>
              <option value="medium">$300 - $600</option>
              <option value="high">Over $600</option>
            </select>
          </div>
        </div>

        {/* Flight Results */}
        <div className="col-md-9">
          <div className="row">
            {/* Example flight card */}
            {[1, 2, 3].map(id => (
              <motion.div
                key={id}
                className="col-lg-6 mb-4"
                whileHover={{ scale: 1.02 }}
              >
                <div className="card shadow border-left-primary h-100 p-3">
                  <h5 className="text-primary"><FaPlaneDeparture className="mr-2" />Flight #{id}</h5>
                  <p className="mb-1 text-muted">Departure: New York (JFK)</p>
                  <p className="mb-1 text-muted">Arrival: London (LHR)</p>
                  <p className="mb-1 text-muted">Duration: 7h 45m • Stops: 1</p>
                  <p className="font-weight-bold text-success">$475 USD</p>
                  <button className="btn btn-sm btn-outline-success">View Details</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
