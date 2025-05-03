
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
