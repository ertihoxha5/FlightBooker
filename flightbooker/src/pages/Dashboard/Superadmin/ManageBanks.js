import React, { useState } from 'react';
import { FaUniversity, FaPlus, FaEdit, FaTrashAlt, FaBuilding, FaUserTie } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ManageBanks = () => {
  const [banks, setBanks] = useState([
    {
      id: 1,
      name: 'Global Bank',
      branches: [
        {
          id: 1,
          name: 'New York Branch',
          employees: [
            { id: 1, name: 'Filan Fisteku' },
            { id: 2, name: 'Filane Fisteku' }
          ]
        }
      ]
    }
  ]);

  const [modalType, setModalType] = useState('');
  const [selectedBank, setSelectedBank] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const openModal = (type, bank = null, branch = null) => {
    setModalType(type);
    setSelectedBank(bank);
    setSelectedBranch(branch);
    setInputValue('');
    window.$('#manageModal').modal('show');
  };

  const handleSubmit = () => {
    if (!inputValue.trim()) return;

    if (modalType === 'addBank') {
      const newBank = { id: Date.now(), name: inputValue.trim(), branches: [] };
      setBanks([...banks, newBank]);
    } else if (modalType === 'editBank') {
      const updatedBanks = banks.map(bank =>
        bank.id === selectedBank.id ? { ...bank, name: inputValue.trim() } : bank
      );
      setBanks(updatedBanks);
    } else if (modalType === 'addBranch') {
      const newBranch = { id: Date.now(), name: inputValue.trim(), employees: [] };
      const updatedBanks = banks.map(bank =>
        bank.id === selectedBank.id ? { ...bank, branches: [...bank.branches, newBranch] } : bank
      );
      setBanks(updatedBanks);
    } else if (modalType === 'editBranch') {
      const updatedBanks = banks.map(bank => {
        if (bank.id === selectedBank.id) {
          const updatedBranches = bank.branches.map(branch =>
            branch.id === selectedBranch.id ? { ...branch, name: inputValue.trim() } : branch
          );
          return { ...bank, branches: updatedBranches };
        }
        return bank;
      });
      setBanks(updatedBanks);
    } else if (modalType === 'addEmployee') {
      const newEmployee = { id: Date.now(), name: inputValue.trim() };
      const updatedBanks = banks.map(bank => {
        if (bank.id === selectedBank.id) {
          const updatedBranches = bank.branches.map(branch => {
            if (branch.id === selectedBranch.id) {
              return { ...branch, employees: [...branch.employees, newEmployee] };
            }
            return branch;
          });
          return { ...bank, branches: updatedBranches };
        }
        return bank;
      });
      setBanks(updatedBanks);
    }
    window.$('#manageModal').modal('hide');
  };

  const deleteBank = (bankId) => {
    setBanks(banks.filter(bank => bank.id !== bankId));
  };

  const deleteBranch = (bankId, branchId) => {
    const updatedBanks = banks.map(bank => {
      if (bank.id === bankId) {
        return {
          ...bank,
          branches: bank.branches.filter(branch => branch.id !== branchId)
        };
      }
      return bank;
    });
    setBanks(updatedBanks);
  };

  const deleteEmployee = (bankId, branchId, employeeId) => {
    const updatedBanks = banks.map(bank => {
      if (bank.id === bankId) {
        const updatedBranches = bank.branches.map(branch => {
          if (branch.id === branchId) {
            return {
              ...branch,
              employees: branch.employees.filter(emp => emp.id !== employeeId)
            };
          }
          return branch;
        });
        return { ...bank, branches: updatedBranches };
      }
      return bank;
    });
    setBanks(updatedBanks);
  };

  return (
    <div className="container-fluid">

      <div className="text-center mb-5">
        <FaUniversity size={40} className="text-primary mb-2" />
        <h2 className="h3 text-gray-800">SuperAdmin Bank Management</h2>
        <p className="text-muted">Manage Banks, Branches, and Employees easily.</p>
        <button className="btn btn-success mt-3" onClick={() => openModal('addBank')}>
          <FaPlus className="mr-2" /> Add New Bank
        </button>
      </div>

      <div className="row">
        {banks.map(bank => (
          <motion.div key={bank.id} className="col-xl-4 col-md-6 mb-4" whileHover={{ scale: 1.03 }}>
            <div className="card shadow border-left-primary h-100">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="text-primary"><FaUniversity className="mr-2" />{bank.name}</h5>
                <div>
                  <button className="btn btn-sm btn-warning mr-2" onClick={() => openModal('editBank', bank)}>
                    <FaEdit />
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => deleteBank(bank.id)}>
                    <FaTrashAlt />
                  </button>
                </div>
              </div>

              <div className="card-body">
                <h6 className="text-muted mb-2">Branches</h6>
                {bank.branches.map(branch => (
                  <div key={branch.id} className="mb-3 p-2 bg-light rounded">
                    <div className="d-flex justify-content-between">
                      <strong><FaBuilding className="mr-1" />{branch.name}</strong>
                      <div>
                        <button className="btn btn-sm btn-warning mr-2" onClick={() => openModal('editBranch', bank, branch)}>
                          <FaEdit />
                        </button>
                        <button className="btn btn-sm btn-danger" onClick={() => deleteBranch(bank.id, branch.id)}>
                          <FaTrashAlt />
                        </button>
                      </div>
                    </div>

                    <div className="ml-3 mt-2">
                      <h6 className="text-muted">Employees</h6>
                      {branch.employees.map(emp => (
                        <div key={emp.id} className="d-flex justify-content-between">
                          <span><FaUserTie className="mr-1" />{emp.name}</span>
                          <button className="btn btn-sm btn-danger" onClick={() => deleteEmployee(bank.id, branch.id, emp.id)}>
                            <FaTrashAlt />
                          </button>
                        </div>
                      ))}
                      <button
                        className="btn btn-outline-success btn-sm mt-2"
                        onClick={() => openModal('addEmployee', bank, branch)}
                      >
                        <FaPlus className="mr-1" /> Add Employee
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  className="btn btn-outline-primary btn-sm mt-2"
                  onClick={() => openModal('addBranch', bank)}
                >
                  <FaPlus className="mr-1" /> Add Branch
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
                {modalType.includes('add') ? 'Add' : 'Edit'} {modalType.includes('Bank') ? 'Bank' : modalType.includes('Branch') ? 'Branch' : 'Employee'}
              </h5>
              <button type="button" className="close text-white" data-dismiss="modal" aria-label="Close">
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder={`Enter ${modalType.includes('Bank') ? 'Bank' : modalType.includes('Branch') ? 'Branch' : 'Employee'} Name`}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                autoFocus
                required
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-success" onClick={handleSubmit}>
                Save
              </button>
              <button type="button" className="btn btn-secondary" data-dismiss="modal">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ManageBanks;
