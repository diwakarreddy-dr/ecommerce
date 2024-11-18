import React from 'react';
import './SuccessMessage.css';

const SuccessMessage = ({ message, show }) => {
  return (
    <div className={`success-message ${show ? 'show' : ''}`}>
      {message}
    </div>
  );
};

export default SuccessMessage; 