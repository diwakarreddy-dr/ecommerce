import React, { useState } from 'react';
import './CheckoutPopup.css';
import SuccessMessage from '../SuccessMessage/SuccessMessage';

const CheckoutPopup = ({ onClose, onSubmit }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    
    // Hide success message and close popup after 2 seconds
    setTimeout(() => {
      setShowSuccess(false);
      onSubmit(formData);
      onClose();
    }, 1000);
  };

  return (
    <>
      <SuccessMessage 
        message="Order placed successfully!" 
        show={showSuccess} 
      />
      
      <div className="checkout-popup-overlay">
        <div className="checkout-popup">
          <button className="close-button" onClick={onClose}>&times;</button>
          <h2>Checkout Details</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="mobile">Mobile Number</label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                pattern="[0-9]{10}"
                value={formData.mobile}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Delivery Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="pincode">Pincode</label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  pattern="[0-9]{6}"
                  value={formData.pincode}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="submit" className="pay-button">
              Proceed to Pay
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CheckoutPopup; 