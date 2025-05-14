import React, { useState } from 'react';
import {
  Table, Button, Modal, Form, Badge, Row, Col, Toast, ToastContainer
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaPlaneDeparture, FaUserCheck, FaCalendarCheck } from 'react-icons/fa';

const BookFlight = () => {
  const flightsData = [
    { id: 1, airline: 'Turkish Airlines', from: 'Istanbul', to: 'Berlin', departure: '2025-06-02 08:00', arrival: '2025-06-02 11:30', price: 320, category: 'classic' },
    { id: 2, airline: 'Qatar Airways', from: 'Doha', to: 'Tokyo', departure: '2025-06-05 13:00', arrival: '2025-06-06 02:30', price: 980, category: 'premium' },
    { id: 3, airline: 'Lufthansa', from: 'Frankfurt', to: 'London', departure: '2025-06-10 09:00', arrival: '2025-06-10 10:45', price: 250, category: 'classic' },
    { id: 4, airline: 'Emirates', from: 'Dubai', to: 'New York', departure: '2025-07-01 20:00', arrival: '2025-07-02 08:00', price: 1200, category: 'premium' },
    { id: 5, airline: 'British Airways', from: 'London', to: 'Rome', departure: '2025-06-20 10:00', arrival: '2025-06-20 12:15', price: 280, category: 'classic' },
  ];

  const [filter, setFilter] = useState('all');
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [myFlights, setMyFlights] = useState([]);
  const [formData, setFormData] = useState({
    name: '', email: '', passport: '', nationality: '', phone: '', dob: '', gender: '', address: '', seatClass: 'economy', luggage: '', notes: '', tickets: 1
  });

  const filteredFlights = filter === 'all' ? flightsData : flightsData.filter(f => f.category === filter);

  const handleOpenModal = (flight) => {
    setSelectedFlight(flight);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      name: '', email: '', passport: '', nationality: '', phone: '', dob: '', gender: '', address: '', seatClass: 'economy', luggage: '', notes: '', tickets: 1
    });
    setFormErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Required';
    if (!formData.email.includes('@')) errors.email = 'Valid email required';
    if (!formData.passport.trim()) errors.passport = 'Required';
    if (!formData.dob) errors.dob = 'Required';
    if (!formData.gender) errors.gender = 'Required';
    if (!formData.tickets || formData.tickets < 1) errors.tickets = 'Must book at least 1 ticket';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) return setFormErrors(errors);

    // Save booked flight
    setMyFlights(prev => [...prev, { ...selectedFlight, passenger: formData.name, tickets: formData.tickets }]);
    setShowToast(true);
    handleCloseModal();
  };

  return (
    <div className="container-fluid mt-4">
      <div className="d-flex justify-content-between mb-4 align-items-center">
        <h2 className="text-primary"><FaPlaneDeparture className="me-2" />Book a Flight</h2>
        <Form.Select style={{ width: '220px' }} onChange={e => setFilter(e.target.value)}>
          <option value="all">All Flights</option>
          <option value="classic">Classic Flights</option>
          <option value="premium">Premium Flights</option>
        </Form.Select>
      </div>

      <div className="card shadow-lg border-0 mb-4">
        <div className="card-body p-0">
          <Table responsive bordered hover className="mb-0">
            <thead className="table-dark text-center">
              <tr>
                <th>Airline</th>
                <th>From</th>
                <th>To</th>
                <th>Departure</th>
                <th>Arrival</th>
                <th>Price</th>
                <th>Class</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredFlights.map(f => (
                <tr key={f.id}>
                  <td>{f.airline}</td>
                  <td>{f.from}</td>
                  <td>{f.to}</td>
                  <td>{f.departure}</td>
                  <td>{f.arrival}</td>
                  <td><strong>${f.price}</strong></td>
                  <td><Badge bg={f.category === 'classic' ? 'primary' : 'warning'}>{f.category}</Badge></td>
                  <td className="text-center"><Button variant="success" size="sm" onClick={() => handleOpenModal(f)}>Book Now</Button></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      {/* Modal for booking */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title><FaUserCheck className="me-2 text-success" />Passenger Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}><Form.Group><Form.Label>Full Name *</Form.Label><Form.Control name="name" value={formData.name} onChange={handleInputChange} isInvalid={!!formErrors.name} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Email *</Form.Label><Form.Control name="email" value={formData.email} onChange={handleInputChange} isInvalid={!!formErrors.email} /></Form.Group></Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}><Form.Group><Form.Label>Passport Number *</Form.Label><Form.Control name="passport" value={formData.passport} onChange={handleInputChange} isInvalid={!!formErrors.passport} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Nationality</Form.Label><Form.Control name="nationality" value={formData.nationality} onChange={handleInputChange} /></Form.Group></Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}><Form.Group><Form.Label>Phone Number</Form.Label><Form.Control name="phone" value={formData.phone} onChange={handleInputChange} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Date of Birth *</Form.Label><Form.Control type="date" name="dob" value={formData.dob} onChange={handleInputChange} isInvalid={!!formErrors.dob} /></Form.Group></Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}><Form.Group><Form.Label>Gender *</Form.Label><Form.Select name="gender" value={formData.gender} onChange={handleInputChange} isInvalid={!!formErrors.gender}><option value="">Select</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option></Form.Select></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Number of Tickets *</Form.Label><Form.Control type="number" name="tickets" min="1" value={formData.tickets} onChange={handleInputChange} isInvalid={!!formErrors.tickets} /></Form.Group></Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}><Form.Group><Form.Label>Address</Form.Label><Form.Control name="address" value={formData.address} onChange={handleInputChange} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Seat Class</Form.Label><Form.Select name="seatClass" value={formData.seatClass} onChange={handleInputChange}><option value="economy">Economy</option><option value="business">Business</option><option value="first">First</option></Form.Select></Form.Group></Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}><Form.Group><Form.Label>Luggage</Form.Label><Form.Control name="luggage" value={formData.luggage} onChange={handleInputChange} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Special Notes</Form.Label><Form.Control name="notes" value={formData.notes} onChange={handleInputChange} /></Form.Group></Col>
            </Row>
            <div className="text-end">
              <Button type="submit" variant="primary" size="lg"><FaCalendarCheck className="me-2" />Confirm Booking</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Toast notification */}
      <ToastContainer className="p-3" position="top-end">
        <Toast show={showToast} onClose={() => setShowToast(false)} bg="success" delay={4000} autohide animation>
          <Toast.Header>
            <strong className="me-auto text-success">Success</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            ✅ Flight booked successfully!<br />See your flights below in <strong>My Flights</strong>.
          </Toast.Body>
        </Toast>
      </ToastContainer>

      {/* My Flights Section */}
      {myFlights.length > 0 && (
        <div className="mt-5">
          <h3 className="text-primary mb-3">My Flights</h3>
          <Table bordered hover responsive>
            <thead className="table-secondary">
              <tr>
                <th>Airline</th>
                <th>From</th>
                <th>To</th>
                <th>Departure</th>
                <th>Arrival</th>
                <th>Tickets</th>
                <th>Price</th>
                <th>Passenger</th>
              </tr>
            </thead>
            <tbody>
              {myFlights.map((f, idx) => (
                <tr key={idx}>
                  <td>{f.airline}</td>
                  <td>{f.from}</td>
                  <td>{f.to}</td>
                  <td>{f.departure}</td>
                  <td>{f.arrival}</td>
                  <td>{f.tickets}</td>
                  <td>{f.price}</td>
                  <td>{f.passenger}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default BookFlight;
