import './Register.css';
import React, { useState } from 'react';
const Register = () => {


    const [isRegister, setIsRegister] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isRegister) {
            console.log('Registering:', formData);
            // send POST to Node backend
        } else {
            console.log('Logging in:', { email: formData.email, password: formData.password });
            //  send POST to Node backend
        }
    };

    
  return (
    <div className="container">
        <h2>{isRegister ? 'Register' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
            {isRegister && (
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    required
                />
            )}
            <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
            />
            <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
        </form>
        <p>
            {isRegister ? 'Already have an account?' : "Don't have an account?"}
            <button onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? 'Login here' : 'Register here'}
            </button>
        </p>
    </div>
  )
}

export default Register