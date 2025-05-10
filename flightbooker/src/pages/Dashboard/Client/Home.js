import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaCookieBite } from 'react-icons/fa'; 

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [review, setReview] = useState('');
  const [stars, setStars] = useState(5);
  const [cookieConsent, setCookieConsent] = useState(false);

  const handleReviewSubmit = () => {
    setShowModal(false);
    setReview('');
    setStars(5);
  };

  const handleCookieConsent = () => {
    setCookieConsent(true);
  };

  return (
    <div className="container-fluid">
     {!cookieConsent && (
        <div className="cookie-consent bg-dark text-white d-flex align-items-center justify-content-between p-3 rounded">
          <div className="d-flex align-items-center">
            <FaCookieBite className="me-2" size={24} />
            <span>We use cookies to enhance your experience on our site. By continuing, you consent to our use of cookies.</span>
          </div>
          <button className="btn btn-light btn-sm" onClick={handleCookieConsent}>Got it!</button>
        </div>
      )}
      <h1 className="h3 mb-4 text-gray-800">Welcome to FlightBooker</h1>
      

      <div className="row">
        {[ 
          { label: 'Total Bookings', value: '1,245', color: 'primary' },
          { label: 'Flights Today', value: '27', color: 'success' },
          { label: 'Passengers Checked-in', value: '932', color: 'info' },
        ].map(({ label, value, color }, i) => (
          <motion.div
            key={i}
            className="col-md-4 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <div className={`card border-left-${color} shadow h-100 py-2`}>
              <div className="card-body">
                <div className={`text-xs font-weight-bold text-${color} text-uppercase mb-1`}>{label}</div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">{value}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

     

      <div className="row">
        {[ 
          { title: 'Ongoing Flight', text: 'Flight to Paris is currently boarding at Gate 12.', btn: 'View Details', bg: 'bg-gradient-danger', icon: 'fas fa-plane-departure' },
          { title: 'Upcoming Flight', text: 'Flight to Tokyo departs in 5 days.', btn: 'Manage Booking', bg: 'bg-gradient-success', icon: 'fas fa-plane-arrival' },
        ].map((card, i) => (
          <motion.div
            key={i}
            className="col-lg-6 mb-4"
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.3 }}
          >
            <div className={`card shadow text-white ${card.bg}`}>
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <i className={`${card.icon} fa-2x me-3`}></i>
                  <div>
                    <h5 className="card-title mb-1">{card.title}</h5>
                    <p className="card-text mb-2">{card.text}</p>
                    <button className="btn btn-light text-dark btn-sm">{card.btn}</button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="row">
        <div className="col-lg-12 mb-4">
          <motion.div
            className="card shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="card-body">
              <h5 className="card-title">Airlines Available</h5>
              <div className="d-flex flex-wrap gap-3">
                {["Emirates", "Qatar Airways", "Pegasus", "Turkish Airlines", "Air Albania", "Wizz Air"].map((airline, i) => (
                  <motion.div
                    key={i}
                    className="badge bg-secondary p-2 px-3 rounded-pill"
                    whileHover={{ scale: 1.1 }}
                  >
                    {airline}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div className="row" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
        <div className="col-lg-12">
          <div className="card bg-gradient-primary text-white text-center shadow mb-4">
            <div className="card-body">
              <h4 className="text-uppercase font-weight-bold mb-2">Explore with FLIGHTBOOKER</h4>
              <p className="mb-3">Special offers to over 50 destinations. Limited time!</p>
              <button className="btn btn-light text-primary font-weight-bold">Book Your Flight</button>
              
            </div>
          </div>
        </div>
      </motion.div>

      <div className="row">
        <div className="col-lg-12 mb-4">
          <motion.div className="card shadow" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="card-body">
              <h5 className="card-title">Travel Tips</h5>
              <ul className="list-group list-group-flush">
                {[
                  'Arrive at the airport 2 hours before departure.',
                  'Carry a copy of your booking confirmation.',
                  'Pack light and check baggage rules.',
                  'Stay updated via airline notifications.'
                ].map((tip, i) => (
                  <li key={i} className="list-group-item d-flex align-items-center">
                    <i className="fas fa-lightbulb text-warning me-2"></i>
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.2 }}>{tip}</motion.span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12 mb-4">
          <motion.div className="card shadow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <div className="card-body">
              <h5 className="card-title d-flex justify-content-between align-items-center">
                Traveler Reviews
                <button className="btn btn-sm btn-outline-primary" onClick={() => setShowModal(true)}>Add Review</button>
              </h5>
              {[{
                name: 'Filan Fisteku',
                text: '"Amazing service! Everything went smooth from booking to boarding."',
                stars: '5 STARS'
              }, {
                name: 'Filane Fisteku',
                text: '"Affordable tickets and great offers. Will book again!"',
                stars: '4 STARS'
              }].map((review, i) => (
                <motion.div key={i} className="border p-3 mb-2 rounded" whileHover={{ scale: 1.02, backgroundColor: '#f8f9fa' }}>
                  <strong>{review.name}</strong>
                  <p className="mb-1">{review.text}</p>
                  <small className="text-muted">{review.stars}</small>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Leave a Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Your Review</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Stars</Form.Label>
              <Form.Control
                type="number"
                min="1"
                max="5"
                value={stars}
                onChange={(e) => setStars(Number(e.target.value))}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleReviewSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>

      <footer className="text-center mt-5 py-4 border-top text-muted">
        <p className="mb-0">&copy; {new Date().getFullYear()} FlightBooker. All rights reserved.</p>
        <small>
          <a href="/terms" className="text-muted mx-2">Terms of Service</a> |
          <a href="/privacy" className="text-muted mx-2">Privacy Policy</a> |
          <a href="/contact" className="text-muted mx-2">Contact Us</a>
        </small>
      </footer>
    </div>
  );
  
};

export default Home;
