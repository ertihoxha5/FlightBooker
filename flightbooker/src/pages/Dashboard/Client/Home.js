import React from 'react';
import { Card, Button } from 'react-bootstrap';

const Home = () => {
  return (
    <div>
      <h2 className="mb-4">Welcome to FlightBooker</h2>


      <div className="row">
        <div className="col-md-6 mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Ongoing Flight</Card.Title>
              <Card.Text>Flight to Paris is currently boarding at Gate 12.</Card.Text>
              <Button variant="primary">View Details</Button>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-6 mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Upcoming Flight</Card.Title>
              <Card.Text>Flight to Tokyo departs in 5 days.</Card.Text>
              <Button variant="primary">Manage Booking</Button>
            </Card.Body>
          </Card>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <Card className="text-center">
            <Card.Body>
              <Card.Title> Explore with FLIGHTBOOKER</Card.Title>
              <Card.Text>Special offers to over 50 destinations. Limited time!</Card.Text>
              <Button variant="success">Explore Now</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
