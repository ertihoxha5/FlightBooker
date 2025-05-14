import React, { useState } from 'react';
import { FaPlane, FaTrashAlt, FaEdit, FaPlus } from 'react-icons/fa';
import { motion } from 'framer-motion';

const initialAirlines = [
  { id: 1, name: 'SkyFly Airlines', flights: 120, country: 'Germany' },
  { id: 2, name: 'Global Wings', flights: 200, country: 'USA' },
  { id: 3, name: 'AeroJet', flights: 75, country: 'Canada' },
];

const Airlines = () => {
  const [airlines, setAirlines] = useState(initialAirlines);
  const [selectedAirline, setSelectedAirline] = useState(null);
  const [newAirline, setNewAirline] = useState({ name: '', country: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '' });

  const handleAddAirline = (e) => {
    e.preventDefault();
    const newAirlineObj = { id: Date.now(), ...newAirline, flights: 0 };
    setAirlines([...airlines, newAirlineObj]);
    setNewAirline({ name: '', country: '' });
    setAlert({ message: 'Airline added successfully!', type: 'success' });
    setTimeout(() => setAlert({ message: '', type: '' }), 3000);
  };

  const handleEditAirline = (airline) => {
    setIsEditing(true);
    setNewAirline({ name: airline.name, country: airline.country });
    setSelectedAirline(airline);
  };

  const handleUpdateAirline = (e) => {
    e.preventDefault();
    const updated = airlines.map((airline) =>
      airline.id === selectedAirline.id
        ? { ...airline, name: newAirline.name, country: newAirline.country }
        : airline
    );
    setAirlines(updated);
    setIsEditing(false);
    setNewAirline({ name: '', country: '' });
    setSelectedAirline(null);
    setAlert({ message: 'Airline updated successfully!', type: 'warning' });
    setTimeout(() => setAlert({ message: '', type: '' }), 3000);
  };

  const handleDeleteAirline = (id) => {
    setAirlines(airlines.filter((airline) => airline.id !== id));
    setAlert({ message: 'Airline deleted successfully!', type: 'danger' });
    setTimeout(() => setAlert({ message: '', type: '' }), 3000);
  };

  const handleFormChange = (e) => {
    setNewAirline({ ...newAirline, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="text-center mb-5">
        <FaPlane size={40} className="text-primary mb-2" />
        <h2 className="h3 text-gray-800">Manage Airlines</h2>
        <p className="text-muted">Add, edit, or delete airlines from the system.</p>
      </div>

      {alert.message && (
        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
          {alert.message}
          <button type="button" className="close" onClick={() => setAlert({ message: '', type: '' })}>
            <span>&times;</span>
          </button>
        </div>
      )}

      <div className="text-right mb-4">
        <button
          className="btn btn-success"
          onClick={() => setIsEditing(false)}
          data-toggle="modal"
          data-target="#airlineModal"
        >
          <FaPlus /> Add Airline
        </button>
      </div>

      <h5 className="text-muted">Available Airlines</h5>
      <div className="row">
        {airlines.map((airline) => (
          <motion.div key={airline.id} className="col-xl-4 col-md-6 mb-4" whileHover={{ scale: 1.03 }}>
            <div className="card border-left-primary shadow h-100 py-3 px-3">
              <div className="card-body text-center">
                <FaPlane size={32} className="text-primary mb-3" />
                <h5 className="card-title mb-3">{airline.name}</h5>
                <p className="text-muted">Flights: {airline.flights}</p>
                <p className="text-muted">Country: {airline.country}</p>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => alert(`Booking with ${airline.name}`)}
                >
                  Book Flight
                </button>
                <button
                  className="btn btn-outline-warning btn-sm ml-2"
                  onClick={() => handleEditAirline(airline)}
                >
                  <FaEdit />
                </button>
                <button
                  className="btn btn-outline-danger btn-sm ml-2"
                  onClick={() => handleDeleteAirline(airline.id)}
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div
        className="modal fade"
        id="airlineModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="airlineModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content shadow-lg border-0">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title" id="airlineModalLabel">
                {isEditing ? <FaEdit /> : <FaPlane />} {isEditing ? 'Edit Airline' : 'Add New Airline'}
              </h5>
              <button type="button" className="close text-white" data-dismiss="modal" aria-label="Close">
                <span>&times;</span>
              </button>
            </div>
            <form onSubmit={isEditing ? handleUpdateAirline : handleAddAirline}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Airline Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={newAirline.name}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Country</label>
                  <input
                    type="text"
                    className="form-control"
                    name="country"
                    value={newAirline.country}
                    onChange={handleFormChange}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-success">
                  {isEditing ? 'Update Airline' : 'Add Airline'}
                </button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Airlines;
