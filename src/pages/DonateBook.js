import React, { useState } from 'react';

const DonateBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    description: '',
    contact: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your donation submission!');
    // Here you can add logic to send form data to backend or API
    setFormData({
      title: '',
      author: '',
      genre: '',
      description: '',
      contact: ''
    });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>Donate a Book</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Book Title:
          <input type="text" name="title" value={formData.title} onChange={handleChange} required style={{ width: '100%', padding: '8px', margin: '8px 0' }} />
        </label>
        <label>
          Author:
          <input type="text" name="author" value={formData.author} onChange={handleChange} required style={{ width: '100%', padding: '8px', margin: '8px 0' }} />
        </label>
        <label>
          Genre:
          <input type="text" name="genre" value={formData.genre} onChange={handleChange} required style={{ width: '100%', padding: '8px', margin: '8px 0' }} />
        </label>
        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} required style={{ width: '100%', padding: '8px', margin: '8px 0' }} />
        </label>
        <label>
          Your Contact Info:
          <input type="text" name="contact" value={formData.contact} onChange={handleChange} required style={{ width: '100%', padding: '8px', margin: '8px 0' }} />
        </label>
        <button type="submit" style={{ backgroundColor: '#d0021b', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>
          Submit Donation
        </button>
      </form>
    </div>
  );
};

export default DonateBook;
