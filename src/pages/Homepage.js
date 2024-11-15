import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react'
import Form from '../components/Form'
import QrCode from '../components/Qr-code';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Homepage() {
  return (
    <div>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/qr-code/:id" element={<QrCode />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  )
}

export default Homepage