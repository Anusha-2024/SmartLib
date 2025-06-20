import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { AuthContext } from '../contexts/AuthContext';

const PaymentPage = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const { user, addRentedBooks } = useContext(AuthContext);
  const [paymentMode, setPaymentMode] = useState('');
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const navigate = useNavigate();

  const handlePaymentModeChange = (e) => {
    setPaymentMode(e.target.value);
  };

  const handleProceedToPay = () => {
    const rentedWithDuration = cartItems.map(book => ({
      ...book,
      duration: 'You can read this book once for this release.'
    }));
    if (user) {
      addRentedBooks(rentedWithDuration);
    }
    clearCart();
    setPaymentConfirmed(true);
  };

  const handleViewRented = () => {
    navigate('/my-rented');
  };

  if (cartItems.length === 0 && !paymentConfirmed) {
    return (
      <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: '0 auto', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '8px', backgroundColor: 'white' }}>
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate('/books')} style={{ color: '#d0021b', fontSize: '18px', background: 'none', border: 'none', cursor: 'pointer' }}>Browse Books</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: '40px auto', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '8px', backgroundColor: 'white' }}>
      <h2 style={{ marginBottom: '30px', fontWeight: 'bold', fontSize: '28px', color: '#d0021b' }}>Payment</h2>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <img src="https://inai.io/hubfs/Header%20-%20Split%20Payments.png" alt="Payment Illustration" style={{ width: '150px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} />
        <div style={{ flex: 1 }}>
          {!paymentConfirmed ? (
            <>
              <div>
                <h3 style={{ marginBottom: '10px' }}>Select Payment Mode</h3>
                <select value={paymentMode} onChange={handlePaymentModeChange} style={{ padding: '10px', fontSize: '16px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }}>
                  <option value="">-- Select --</option>
                  <option value="card">Card</option>
                  <option value="netbanking">Net Banking</option>
                  <option value="upi">UPI</option>
                  <option value="wallet">Wallet</option>
                </select>
              </div>
              {paymentMode && (
                <button
                  onClick={handleProceedToPay}
                  style={{
                    marginTop: '30px',
                    backgroundColor: '#d0021b',
                    color: 'white',
                    border: 'none',
                    padding: '15px 30px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    width: '100%'
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#a00015'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#d0021b'}
                >
                  Proceed to Pay
                </button>
              )}
            </>
          ) : (
            <>
              <p style={{ marginTop: '30px', fontWeight: 'bold', color: 'green', fontSize: '18px' }}>
                Payment successful! You can view your rented books in the Rented Books area.
              </p>
              <button
                onClick={handleViewRented}
                style={{
                  marginTop: '20px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  padding: '15px 30px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  width: '100%'
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0056b3'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#007bff'}
              >
                View Rented Books
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
