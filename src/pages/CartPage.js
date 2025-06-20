import React from 'react';
import Cart from '../components/Cart';

const CartPage = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#d0021b', fontWeight: 'bold', marginBottom: '20px' }}>Your Cart</h1>
      <Cart />
    </div>
  );
};

export default CartPage;
