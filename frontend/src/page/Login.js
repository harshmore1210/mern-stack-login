import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ switchForm }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:3001/api/login', formData)
    console.log("Response from server:", response.data);
  
  console.log("Logging in:", formData);
  //node data
  alert("login successfully!");


};

return (
  <div className="container">
    <h2>Login</h2>
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required value={formData.password} />
      <button type="submit">Login</button>
    </form>
    <p>Don’t have an account?
      <button onClick={switchForm}>Register here</button>
    </p>
  </div>
);
};

export default Login;
