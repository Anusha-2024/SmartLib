import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = register(formData);
    if (success) {
      alert('Registration successful! You can now login.');
      navigate('/login');
    } else {
      setError('Username or email already exists.');
    }
  };

  return (
    <div style={{
      maxWidth: '500px',
      margin: '40px auto',
      fontFamily: 'Arial, sans-serif',
      padding: '30px',
      backgroundColor: 'white',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      borderRadius: '8px'
    }}>
      <h2 style={{ color: '#d0021b', marginBottom: '20px' }}>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc' }} />
        </label>
        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} required style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc' }} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc' }} />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc' }} />
        </label>
        <button type="submit" style={{ backgroundColor: '#d0021b', color: 'white', padding: '12px', border: 'none', borderRadius: '6px', cursor: 'pointer', marginTop: '20px', width: '100%', fontWeight: 'bold', fontSize: '16px' }}>
          Register
        </button>
      </form>
      <p style={{ marginTop: '15px' }}>
        Already have an account? <Link to="/login" style={{ color: '#d0021b', cursor: 'pointer' }}>Login here</Link>
      </p>
    </div>
  );
};

export default Register;
