
import React, { useEffect, useState } from 'react';
const MyFlights = () => {
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);

