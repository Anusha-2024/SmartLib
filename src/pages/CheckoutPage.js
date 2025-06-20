import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { useNavigate, Link } from 'react-router-dom';

const CheckoutPage = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePayNowClick = () => {
    navigate('/payment');
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: '0 auto', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '8px', backgroundColor: 'white', textAlign: 'center' }}>
        <h2>Your cart is empty</h2>
        <Link to="/books" style={{ color: '#d0021b', fontSize: '18px' }}>Browse Books</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: '40px auto', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '8px', backgroundColor: 'white' }}>
      <h2 style={{ marginBottom: '30px', borderBottom: '2px solid #d0021b', paddingBottom: '10px' }}>Checkout</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {cartItems.map((item) => (
          <li key={item.id} style={{ marginBottom: '20px', borderBottom: '1px solid #ddd', paddingBottom: '15px', display: 'flex', gap: '15px', alignItems: 'center' }}>
            <img src={item.cover} alt={item.title} style={{ width: '100px', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
            <div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#d0021b' }}>{item.title}</div>
              <div style={{ fontSize: '14px', color: '#555', marginBottom: '5px' }}>by {item.author}</div>
              <div style={{ fontSize: '14px', color: '#333' }}>Quantity: {item.quantity}</div>
              <div style={{ fontSize: '14px', color: '#333' }}>Price: ₹{item.price}</div>
              <div style={{ fontSize: '12px', color: '#777', marginTop: '5px' }}>Duration: You can read this book once for this release.</div>
            </div>
          </li>
        ))}
      </ul>
      <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#d0021b', marginTop: '30px' }}>Total: ₹{totalAmount.toFixed(2)}</h3>
      <button
        onClick={handlePayNowClick}
        style={{
          backgroundColor: '#d0021b',
          color: 'white',
          border: 'none',
          padding: '15px 30px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '18px',
          fontWeight: 'bold',
          marginTop: '20px',
          width: '100%'
        }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#a00015'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#d0021b'}
      >
        Pay Now
      </button>
    </div>
  );
};

export default CheckoutPage;
