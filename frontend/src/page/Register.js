import React, { useState } from 'react';
import './Register.css';

import axios from 'axios';
const Register = ({ switchForm }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
 
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Registering:", formData);
    alert("Form submitted successfully!");
    const response = await axios.post('http://localhost:3001/api/all', formData)
    console.log("Response from server:", response.data)
  }
 
  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Username" onChange={handleChange} required  value={formData.name}/>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required value={formData.email}/>
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required value={formData.password}/>
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? 
        <button onClick={switchForm}>Login here</button>
      </p>
    </div>
  );
};

export default Register;
