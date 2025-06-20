import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const UserProfile = () => {
  const { user, registeredUsers, setRegisteredUsers, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: ''
  });

  useEffect(() => {
    if (user) {
      const currentUser = registeredUsers.find(u => u.username === user.username);
      if (currentUser) {
        setFormData({
          fullName: currentUser.fullName || '',
          username: currentUser.username,
          email: currentUser.email || ''
        });
      }
    }
  }, [user, registeredUsers]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update user info in registeredUsers
    const updatedUsers = registeredUsers.map(u => {
      if (u.username === user.username) {
        return {...u, ...formData};
      }
      return u;
    });
    setRegisteredUsers(updatedUsers);
    setUser(formData);
    alert('Profile updated successfully!');
  };

  if (!user) {
    return <p>Please login to view your profile.</p>;
  }

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required style={{ width: '100%', padding: '8px', margin: '5px 0' }} />
        </label>
        <label>
          Username:
          <input type="text" name="username" value={formData.username} disabled style={{ width: '100%', padding: '8px', margin: '5px 0', backgroundColor: '#eee' }} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '8px', margin: '5px 0' }} />
        </label>
        <button type="submit" style={{ backgroundColor: '#d0021b', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}>
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
