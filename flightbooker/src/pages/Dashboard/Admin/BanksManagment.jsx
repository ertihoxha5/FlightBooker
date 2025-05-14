import React, { useState } from 'react';
import { FaUniversity, FaTrashAlt, FaEdit, FaPlus } from 'react-icons/fa';
import { motion } from 'framer-motion';

const initialBanks = [
  { id: 1, name: 'Bank of Europe', users: 150, country: 'Germany' },
  { id: 2, name: 'Global Bank', users: 200, country: 'USA' },
  { id: 3, name: 'Example Bank', users: 50, country: 'Canada' },
];

const BanksManagement = () => {
  const [banks, setBanks] = useState(initialBanks);
  const [selectedBank, setSelectedBank] = useState(null);
  const [newBank, setNewBank] = useState({ name: '', country: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '' });

  const handleAddBank = (e) => {
    e.preventDefault();
    const newBankObj = { id: Date.now(), ...newBank, users: 0 };
    setBanks([...banks, newBankObj]);
    setNewBank({ name: '', country: '' });
    setAlert({ message: 'Bank added successfully!', type: 'success' });
    setTimeout(() => setAlert({ message: '', type: '' }), 3000); 
  };

  const handleEditBank = (bank) => {
    setIsEditing(true);
    setNewBank({ name: bank.name, country: bank.country });
    setSelectedBank(bank);
  };

  const handleUpdateBank = (e) => {
    e.preventDefault();
    const updatedBanks = banks.map((bank) =>
      bank.id === selectedBank.id
        ? { ...bank, name: newBank.name, country: newBank.country }
        : bank
    );
    setBanks(updatedBanks);
    setIsEditing(false);
    setNewBank({ name: '', country: '' });
    setSelectedBank(null);
    setAlert({ message: 'Bank updated successfully!', type: 'warning' });
    setTimeout(() => setAlert({ message: '', type: '' }), 3000); 
  };

  const handleDeleteBank = (id) => {
    setBanks(banks.filter((bank) => bank.id !== id));
    setAlert({ message: 'Bank deleted successfully!', type: 'danger' });
    setTimeout(() => setAlert({ message: '', type: '' }), 3000); 
  };

  const handleFormChange = (e) => {
    setNewBank({ ...newBank, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="text-center mb-5">
        <FaUniversity size={40} className="text-primary mb-2" />
        <h2 className="h3 text-gray-800">Manage Banks</h2>
        <p className="text-muted">Add, edit, or delete banks from the system.</p>
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
          data-target="#addBankModal"
        >
          <FaPlus /> Add Bank
        </button>
      </div>

      <h5 className="text-muted">Available Banks</h5>
      <div className="row">
        {banks.map((bank) => (
          <motion.div key={bank.id} className="col-xl-4 col-md-6 mb-4" whileHover={{ scale: 1.03 }}>
            <div className="card border-left-primary shadow h-100 py-3 px-3">
              <div className="card-body text-center">
                <FaUniversity size={32} className="text-primary mb-3" />
                <h5 className="card-title mb-3">{bank.name}</h5>
                <p className="text-muted">Users: {bank.users}</p>
                <p className="text-muted">Country: {bank.country}</p>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => alert(`Viewing users for ${bank.name}`)} 
                >
                  View Users
                </button>
                <button
                  className="btn btn-outline-warning btn-sm ml-2"
                  onClick={() => handleEditBank(bank)}
                >
                  <FaEdit />
                </button>
                <button
                  className="btn btn-outline-danger btn-sm ml-2"
                  onClick={() => handleDeleteBank(bank.id)}
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
        id="addBankModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="addBankModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content shadow-lg border-0">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title" id="addBankModalLabel">
                {isEditing ? <FaEdit /> : <FaUniversity />} {isEditing ? 'Edit Bank' : 'Add New Bank'}
              </h5>
              <button type="button" className="close text-white" data-dismiss="modal" aria-label="Close">
                <span>&times;</span>
              </button>
            </div>
            <form onSubmit={isEditing ? handleUpdateBank : handleAddBank}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Bank Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={newBank.name}
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
                    value={newBank.country}
                    onChange={handleFormChange}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-success">
                  {isEditing ? 'Update Bank' : 'Add Bank'}
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

export default BanksManagement;
