import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useParams } from 'react-router-dom';

function QrCode() {
  const [registrationData, setRegistrationData] = useState('');
  const { id } = useParams(); // Assuming you're passing the registration ID in the URL

  const getData = async (e) => {
    try {
      const response = await fetch(`http://localhost:3001/api/qr-code/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setRegistrationData(result.registrationData); // Store the submitted data
      } else {
        alert('Failed to fetch registration data');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  useEffect(() => {
    getData();
  }, []);
  console.log('registrationData', registrationData);
  // Convert registration data to string
  const qrData = JSON.stringify(registrationData);

  return (
    <div className="qr-container" style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>Your QR Code</h2>
      <div style={{ margin: '2rem' }}>
        <QRCodeSVG
          value={qrData}
          size={256}
          level="H"
        />
      </div>
      <div>
        <h3>Registration Details:</h3>
        <p>Name: {registrationData?.firstName} {registrationData?.lastName}</p>
        <p>Vehicle Number: {registrationData?.vehicleNumber}</p>
        <p>Contact: {registrationData?.phoneNumber}</p>
      </div>
    </div>
  );
}

export default QrCode;