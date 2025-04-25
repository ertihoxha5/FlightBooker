import React, { useState } from 'react';
import { FaUniversity, FaCreditCard, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';

const availableBanks = ['Bank of Europe', 'Global Bank', 'Albania National Bank'];

const Banks = () => {
  const [selectedBank, setSelectedBank] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const handleConnect = (bank) => {
    setSelectedBank(bank);
    setShowModal(true);
    setShowSuccess(false);
  };

  const handleFormChange = (e) => {
    setCardInfo({ ...cardInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Connected to:', selectedBank, cardInfo);
    setShowModal(false);
    setShowSuccess(true);
    setCardInfo({ cardNumber: '', expiry: '', cvv: '' });

  };

return (
    <div className="container">
      {/* Hero Section */}
      <div className="text-center mb-5">
        <FaUniversity size={40} className="text-primary mb-2" />
        <h2 className="h3 text-gray-800">Available Banks</h2>
        <p className="text-muted">Connect your bank securely to add cards and buy tickets online.</p>
      </div>

      {/* Cards */}
      <div className="row">
        {availableBanks.map((bank, index) => (
          <motion.div 
            className="col-xl-4 col-md-6 mb-4"
            key={index}
            whileHover={{ scale: 1.03 }}
          >
            <div className="card border-left-primary shadow h-100 py-3 px-3">
              <div className="card-body text-center">
                <FaUniversity size={32} className="text-primary mb-3" />
                <h5 className="card-title mb-3">{bank}</h5>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => handleConnect(bank)}
                >
                  Connect Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Success Alert */}
      {showSuccess && (
        <div className="alert alert-success alert-dismissible fade show mt-4" role="alert">
          🎉 Your card is connected to <strong>{selectedBank}</strong> successfully!
          <button type="button" className="close" onClick={() => setShowSuccess(false)}>
            <span>&times;</span>
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content shadow-lg border-0">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  <FaLock className="me-2" /> Secure Login - {selectedBank}
                </h5>
                <button type="button" className="close text-white" onClick={() => setShowModal(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Card Number</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><FaCreditCard /></span>
                      </div>
                      <input
                        type="text"
                        name="cardNumber"
                        className="form-control"
                        value={cardInfo.cardNumber}
                        onChange={handleFormChange}
                        required
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col">
                      <label>Expiry Date</label>
                      <input
                        type="text"
                        name="expiry"
                        className="form-control"
                        placeholder="MM/YY"
                        value={cardInfo.expiry}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                    <div className="form-group col">
                      <label>CVV</label>
                      <input
                        type="password"
                        name="cvv"
                        className="form-control"
                        value={cardInfo.cvv}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-success">
                    Connect and Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banks;
