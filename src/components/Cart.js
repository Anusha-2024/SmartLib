import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import HorizontalBookList from './HorizontalBookList';
import books from '../data/books';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const totalPrice = cartItems.reduce((total, item) => total + Number(item.price) * item.quantity, 0);

  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    if (!user) {
      alert('Please login first to proceed to checkout.');
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  return (
    <div style={{ display: 'flex', gap: '40px', maxWidth: '1100px', margin: '0 auto', paddingLeft: '20px' }}>
      <div style={{ flex: 1 }}>
        {cartItems.length === 0 ? (
          <p style={{ fontSize: '16px', color: '#555' }}>Your cart is empty.</p>
        ) : (
          <div>
            {cartItems.map(item => (
              <div key={item.id} style={{ borderBottom: '1px solid #d0021b', padding: '15px 10px 15px 0', display: 'flex', gap: '20px', alignItems: 'center' }}>
                <img src={item.cover} alt={item.title} style={{ width: '80px', height: '120px', objectFit: 'cover', borderRadius: '5px' }} />
                <div style={{ marginLeft: '10px' }}>
                  <h3 style={{ color: '#d0021b', marginBottom: '5px' }}>{item.title}</h3>
                  <p style={{ margin: '2px 0' }}>Quantity: {item.quantity}</p>
                  <p style={{ margin: '2px 0' }}>Price: ₹{Number(item.price).toFixed(2)}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    backgroundColor: '#d0021b',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '14px'
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#a00015'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#d0021b'}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
        {cartItems.length > 0 && (
          <>
            <h3 style={{ color: '#d0021b', marginTop: '20px' }}>Total: ₹{totalPrice.toFixed(2)}</h3>
            <button
              onClick={clearCart}
              style={{
                marginRight: '10px',
                backgroundColor: '#d0021b',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#a00015'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#d0021b'}
            >
              Clear Cart
            </button>
            <button
              onClick={handleCheckoutClick}
              style={{
                backgroundColor: '#d0021b',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#a00015'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#d0021b'}
            >
              Checkout
            </button>
          </>
        )}
      </div>
      <aside style={{ width: '300px' }}>
        <HorizontalBookList title="Recommended Books" books={books.slice(0, 10)} />
      </aside>
    </div>
  );
};

export default Cart;
