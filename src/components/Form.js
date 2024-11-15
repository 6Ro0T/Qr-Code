import React, { useState } from 'react';
import './Form.css';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    bloodGroup: '',
    phoneNumber: '',
    vehicleName: '',
    vehicleNumber: '',
    emergencyContact: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    const emptyFields = Object.keys(formData).filter(key => !formData[key].trim());
    if (emptyFields.length > 0) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        setSubmittedData(result.data); // Store the submitted data
        setShowModal(true); // Show success modal
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleGenerateQR = () => {
    navigate(`/qr-code/${submittedData.id}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  console.log(submittedData);

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
          <h2>Vehicle Registration</h2>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name <span className="required">*</span></label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="Enter first name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name <span className="required">*</span></label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Enter last name"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="bloodGroup">Blood Group <span className="required">*</span></label>
              <select
                id="bloodGroup"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                required
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number <span className="required">*</span></label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                pattern="[0-9]{10}"
                placeholder="10-digit number"
                required
                title="Please enter a valid 10-digit phone number"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="vehicleName">Vehicle Name</label>
              <input
                type="text"
                id="vehicleName"
                name="vehicleName"
                value={formData.vehicleName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="vehicleNumber">Vehicle Number</label>
              <input
                type="text"
                id="vehicleNumber"
                name="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={handleChange}
                placeholder="XX-XX-XX-XXXX"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="emergencyContact">Emergency Contact</label>
            <input
              type="tel"
              id="emergencyContact"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleChange}
              pattern="[0-9]{10}"
              placeholder="10-digit number"
              required
            />
          </div>

          <button type="submit">Register</button>
        </form>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Registration Successful!</h3>
            <p>Your vehicle has been registered successfully.</p>
            <div className="modal-buttons">
              <button
                onClick={handleGenerateQR}
                className="qr-button"
              >
                Generate QR Code
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setFormData({
                    firstName: '',
                    lastName: '',
                    bloodGroup: '',
                    phoneNumber: '',
                    vehicleName: '',
                    vehicleNumber: '',
                    emergencyContact: ''
                  });
                }}
                className="close-button"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Form;
