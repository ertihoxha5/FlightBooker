import React, { useState } from 'react';

const ManageAdmins = () => {
  const [admins, setAdmins] = useState([
    { id: 1, name: 'Admin One', email: 'admin1@example.com' },
    { id: 2, name: 'Admin Two', email: 'admin2@example.com' },
  ]);

  const [newAdmin, setNewAdmin] = useState({ name: '', email: '' });
  const [editingId, setEditingId] = useState(null);
  const [editedAdmin, setEditedAdmin] = useState({ name: '', email: '' });

  const handleAddAdmin = () => {
    if (newAdmin.name.trim() && newAdmin.email.trim()) {
      const newEntry = { ...newAdmin, id: Date.now() };
      setAdmins([...admins, newEntry]);
      setNewAdmin({ name: '', email: '' });
    }
  };

  const handleDeleteAdmin = (id) => {
    setAdmins(admins.filter((admin) => admin.id !== id));
  };

  const handleEditClick = (admin) => {
    setEditingId(admin.id);
    setEditedAdmin({ name: admin.name, email: admin.email });
  };

  const handleSaveEdit = (id) => {
    setAdmins(
      admins.map((admin) =>
        admin.id === id ? { ...admin, ...editedAdmin } : admin
      )
    );
    setEditingId(null);
    setEditedAdmin({ name: '', email: '' });
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '700px' }}>
      <h2 className="mb-4 text-center">Manage Admins</h2>

      {/* Add Admin */}
      <div className="row g-2 mb-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={newAdmin.name}
            onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
          />
        </div>
        <div className="col-md-5">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={newAdmin.email}
            onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
          />
        </div>
        <div className="col-md-3">
          <button onClick={handleAddAdmin} className="btn btn-primary w-100">Add</button>
        </div>
      </div>

      {/* Admin List */}
      <ul className="list-group">
        {admins.map((admin) => (
          <li key={admin.id} className="list-group-item d-flex justify-content-between align-items-center">
            {editingId === admin.id ? (
              <div className="w-100 row g-2">
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    value={editedAdmin.name}
                    onChange={(e) => setEditedAdmin({ ...editedAdmin, name: e.target.value })}
                  />
                </div>
                <div className="col-md-5">
                  <input
                    type="email"
                    className="form-control"
                    value={editedAdmin.email}
                    onChange={(e) => setEditedAdmin({ ...editedAdmin, email: e.target.value })}
                  />
                </div>
                <div className="col-md-3 d-flex gap-1">
                  <button className="btn btn-success btn-sm w-50" onClick={() => handleSaveEdit(admin.id)}>Save</button>
                  <button className="btn btn-secondary btn-sm w-50" onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <span><strong>{admin.name}</strong> – {admin.email}</span>
                <div className="d-flex gap-2">
                  <button className="btn btn-warning btn-sm" onClick={() => handleEditClick(admin)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDeleteAdmin(admin.id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageAdmins;
