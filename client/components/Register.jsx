import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from './API/mindfulHarvestApi';
import {Link} from 'react-router-dom'

const RegistrationForm = () => {
  const [register] = useRegisterUserMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData);
    navigate('/account');
    // console.log(formData);
  };

  return (
    <div className="registration-form container">
      <h2>Sign-up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? {" "}
        <Link style={{textDecoration: "none"}} to="/login">Login here!</Link>
      </p>
    </div>
  );
};

export default RegistrationForm;
