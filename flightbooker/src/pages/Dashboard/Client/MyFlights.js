import React, { useEffect, useState } from 'react';

const MyFlights = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data - do zëvendësohet me të dhëna reale nëse përdor API
  const mockFlights = [
    {
      id: 1,
      origin: 'Tirana',
      destination: 'London',
      date: '2025-05-12',
      time: '14:30',
      airline: 'British Airways',
      seat: '12A',
    },
    {
      id: 2,
      origin: 'New York',
      destination: 'Paris',
      date: '2025-06-03',
      time: '09:15',
      airline: 'Air France',
      seat: '7C',
    },
  ];

  useEffect(() => {
    // Simulo ngarkimin nga API me një vonesë
    const fetchMockFlights = () => {
      setTimeout(() => {
        setFlights(mockFlights);
        setLoading(false);
      }, 1000); // 1 sekond vonesë
    };

    fetchMockFlights();
  }, []);

  if (loading) return <p>Loading your flights...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
        My Flights
      </h2>
      {flights.length === 0 ? (
        <p>You haven't booked any flights yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {flights.map((flight) => (
            <div
              key={flight.id}
              style={{
                border: '1px solid #ccc',
                padding: '16px',
                borderRadius: '12px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>
                {flight.origin} → {flight.destination}
              </h3>
              <p>Date: {new Date(flight.date).toLocaleDateString()}</p>
              <p>Time: {flight.time}</p>
              <p>Airline: {flight.airline}</p>
              <p>Seat: {flight.seat}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyFlights;