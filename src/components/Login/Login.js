import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onClose, onLoginSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    onLoginSuccess();
    onClose();
    navigate('/');
  };

  return (
    <div className="login-overlay" onClick={onClose}>
      <div className="login-modal" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <div className="login-content">
          <h2 className="company-name">WysCom</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="login-button">Login</button>
          </form>
          <div className="login-footer">
            <a href="#forgot-password" className="forgot-password">
              Forgot Password?
            </a>
            <p className="signup-prompt">
              Don't have an account? <a href="#signup">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 