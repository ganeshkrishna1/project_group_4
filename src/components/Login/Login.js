import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate email and password
    if (!formData.email || !formData.password) {
      setError('Email and password are required.');
      return;
    }

    // Basic email validation using a regular expression
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setError('Invalid email address.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8081/login/user', formData);

      if (response.status === 200) {
        // Successfully logged in
        navigate('/homepage'); // Redirect to the homepage
      } else {
        setError(response.data.message || 'Invalid Credentials');
      }
    } catch (err) {
      setError('Invalid Credentials'); 
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email<span className="required">*</span></label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required // Email is required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password<span className="required">*</span></label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required // Password is required
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
      <p>
        Are you a landlord?{' '}
        <a href="/landlordlogin">Login as a Landlord</a>
      </p>
    </div>
  );
}

export default Login;
