
import React, { useEffect, useState } from 'react';
const MyFlights = () => {
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);
 // Mock data - do zëvendësohet me të dhëna reale nëse përdor API
 const mockFlights = [
