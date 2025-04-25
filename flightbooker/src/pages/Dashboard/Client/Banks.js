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

}