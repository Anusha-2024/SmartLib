import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      navigate('/');
    } else {
      alert('Invalid username or password');
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
      <h2 style={{ color: '#d0021b', marginBottom: '20px' }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc' }} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc' }} />
        </label>
        <button type="submit" style={{ backgroundColor: '#d0021b', color: 'white', padding: '12px', border: 'none', borderRadius: '6px', cursor: 'pointer', marginTop: '20px', width: '100%', fontWeight: 'bold', fontSize: '16px' }}>
          Login
        </button>
      </form>
      <p style={{ marginTop: '15px' }}>
        New user? <Link to="/register" style={{ color: '#d0021b', cursor: 'pointer' }}>Register here</Link>
      </p>
    </div>
  );
};

export default Login;
