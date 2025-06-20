import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext';

const Header = () => {
  const { user, logout, rentedBooks } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);

  return (
    <header style={{ padding: '10px', backgroundColor: '#282c34', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <nav>
        <Link to="/" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>Home</Link>
        <Link to="/books" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>All Books</Link>
        <Link to="/cart" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>
          Cart ({cartItems.length})
        </Link>
        <Link to="/my-rented" style={{ color: 'white', marginLeft: '15px', textDecoration: 'none' }}>
          Rented Books ({rentedBooks.length})
        </Link>
      </nav>
      <div>
        {user ? (
          <>
            <span style={{ marginRight: '10px' }}>Hello, {user.username}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
