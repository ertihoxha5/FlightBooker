import React, { useState } from 'react';
import { FaPlane, FaTrashAlt, FaEdit, FaPlus ,FaRoute } from 'react-icons/fa';
import { motion } from 'framer-motion';


const ManageAirlines = () => {
  const [airlines, setAirlines] = useState([
    {
      id: 1,
      name: 'SkyHigh Airlines',
      flights: [
        {
          id: 1,
          name: 'Flight 1001 - Berlin to Paris',
          pilots: [
            { id: 1, name: 'Captain Rex' },
            { id: 2, name: 'Co-pilot Annie' }
          ]
        }
      ]
    }
  ]);

  const [modalType, setModalType] = useState('');
  const [selectedAirline, setSelectedAirline] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const openModal = (type, airline = null, flight = null) => {
    setModalType(type);
    setSelectedAirline(airline);
    setSelectedFlight(flight);
    setInputValue('');
    window.$('#manageModal').modal('show');
  };

  const handleSubmit = () => {
    if (!inputValue.trim()) return;

    if (modalType === 'addAirline') {
      const newAirline = { id: Date.now(), name: inputValue.trim(), flights: [] };
      setAirlines([...airlines, newAirline]);
    } else if (modalType === 'editAirline') {
      const updated = airlines.map(a =>
        a.id === selectedAirline.id ? { ...a, name: inputValue.trim() } : a
      );
      setAirlines(updated);
    } else if (modalType === 'addFlight') {
      const newFlight = { id: Date.now(), name: inputValue.trim(), pilots: [] };
      const updated = airlines.map(a =>
        a.id === selectedAirline.id ? { ...a, flights: [...a.flights, newFlight] } : a
      );
      setAirlines(updated);
    } else if (modalType === 'editFlight') {
      const updated = airlines.map(a => {
        if (a.id === selectedAirline.id) {
          const updatedFlights = a.flights.map(f =>
            f.id === selectedFlight.id ? { ...f, name: inputValue.trim() } : f
          );
          return { ...a, flights: updatedFlights };
        }
        return a;
      });
      setAirlines(updated);
    } else if (modalType === 'addPilot') {
      const newPilot = { id: Date.now(), name: inputValue.trim() };
      const updated = airlines.map(a => {
        if (a.id === selectedAirline.id) {
          const updatedFlights = a.flights.map(f =>
            f.id === selectedFlight.id
              ? { ...f, pilots: [...f.pilots, newPilot] }
              : f
          );
          return { ...a, flights: updatedFlights };
        }
        return a;
      });
      setAirlines(updated);
    }

    window.$('#manageModal').modal('hide');
  };

  const deleteAirline = (id) => setAirlines(airlines.filter(a => a.id !== id));

  const deleteFlight = (airlineId, flightId) => {
    const updated = airlines.map(a =>
      a.id === airlineId
        ? { ...a, flights: a.flights.filter(f => f.id !== flightId) }
        : a
    );
    setAirlines(updated);
  };

  const deletePilot = (airlineId, flightId, pilotId) => {
    const updated = airlines.map(a => {
      if (a.id === airlineId) {
        const updatedFlights = a.flights.map(f => {
          if (f.id === flightId) {
            return { ...f, pilots: f.pilots.filter(p => p.id !== pilotId) };
          }
          return f;
        });
        return { ...a, flights: updatedFlights };
      }
      return a;
    });
    setAirlines(updated);
  };

  return (
    <div className="container-fluid">
      <div className="text-center mb-5">
        <FaPlane size={40} className="text-primary mb-2" />
        <h2 className="h3 text-gray-800">SuperAdmin Airline Management</h2>
        <p className="text-muted">Manage Airlines, Flights, and Pilots easily.</p>
        <button className="btn btn-success mt-3" onClick={() => openModal('addAirline')}>
          <FaPlus className="mr-2" /> Add New Airline
        </button>
      </div>

      <div className="row">
        {airlines.map(airline => (
          <motion.div key={airline.id} className="col-xl-4 col-md-6 mb-4" whileHover={{ scale: 1.03 }}>
            <div className="card shadow border-left-primary h-100">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="text-primary"><FaPlane className="mr-2" />{airline.name}</h5>
                <div>
                  <button className="btn btn-sm btn-warning mr-2" onClick={() => openModal('editAirline', airline)}>
                    <FaEdit />
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => deleteAirline(airline.id)}>
                    <FaTrashAlt />
                  </button>
                </div>
              </div>

              <div className="card-body">
                <h6 className="text-muted mb-2">Flights</h6>
                {airline.flights.map(flight => (
                  <div key={flight.id} className="mb-3 p-2 bg-light rounded">
                    <div className="d-flex justify-content-between">
                      <strong><FaRoute className="mr-1" />{flight.name}</strong>
                      <div>
                        <button className="btn btn-sm btn-warning mr-2" onClick={() => openModal('editFlight', airline, flight)}>
                          <FaEdit />
                        </button>
                        <button className="btn btn-sm btn-danger" onClick={() => deleteFlight(airline.id, flight.id)}>
                          <FaTrashAlt />
                        </button>
                      </div>
                    </div>

                
                  </div>
                ))}
                <button
                  className="btn btn-outline-primary btn-sm mt-2"
                  onClick={() => openModal('addFlight', airline)}
                >
                  <FaPlus className="mr-1" /> Add Flight
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <div className="modal fade" id="manageModal" tabIndex="-1" role="dialog" aria-labelledby="manageModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content shadow-lg border-0">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title" id="manageModalLabel">
                {modalType.includes('add') ? 'Add' : 'Edit'}{' '}
                {modalType.includes('Airline') ? 'Airline' :
                  modalType.includes('Flight') ? 'Flight' : 'Pilot'}
              </h5>
              <button type="button" className="close text-white" data-dismiss="modal" aria-label="Close">
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder={`Enter ${modalType.includes('Airline') ? 'Airline' :
                  modalType.includes('Flight') ? 'Flight' : 'Pilot'} Name`}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                required
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-success" onClick={handleSubmit}>Save</button>
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ManageAirlines;
