import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext';
import { WishlistContext } from '../contexts/WishlistContext';
import books from '../data/books';

const TopBar = () => {
  const { user, logout, rentedBooks } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const { wishlistItems } = useContext(WishlistContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  const handleLogoutClick = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      logout();
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === '') {
      setSuggestions([]);
      return;
    }

    const filteredSuggestions = books
      .filter((book) =>
        (book.title && book.title.toLowerCase().includes(value.toLowerCase())) ||
        (book.author && book.author.toLowerCase().includes(value.toLowerCase())) ||
        (book.publisher && book.publisher.toLowerCase().includes(value.toLowerCase()))
      )
      .slice(0, 5);

    setSuggestions(filteredSuggestions);
  };

  const handleSearchSubmit = () => {
    if (searchTerm.trim() !== '') {
      setSuggestions([]);
      navigate(`/books?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.title);
    setSuggestions([]);
    navigate(`/books?search=${encodeURIComponent(suggestion.title)}`);
  };

  // Close suggestions dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div style={{ borderBottom: '1px solid #ddd', backgroundColor: 'white', padding: '10px 20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'inline-block', cursor: 'pointer' }} onClick={() => navigate('/')} onMouseEnter={e => e.currentTarget.style.color = '#a00015'} onMouseLeave={e => e.currentTarget.style.color = 'inherit'}>
            <img src="https://th.bing.com/th/id/OIP.NyJAyJKjU9a_o0LWtTGJOwHaB5?rs=1&pid=ImgDetMain" alt="BooksWagon" style={{ height: '40px', marginRight: '20px' }} />
          </Link>
          {/* Search Bar */}
          <div style={{ position: 'relative' }} ref={wrapperRef}>
            <input
              type="text"
              placeholder="Search By Title, Author, Publisher"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              style={{
                width: '400px',
                padding: '8px 12px',
                border: '1px solid #ccc',
                borderRadius: '4px 0 0 4px',
                outline: 'none',
                fontSize: '14px'
              }}
            />
            <button
              onClick={handleSearchSubmit}
              style={{
                padding: '8px 12px',
                backgroundColor: '#d0021b',
                border: 'none',
                color: 'white',
                borderRadius: '0 4px 4px 0',
                cursor: 'pointer'
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#a00015'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#d0021b'}
            >
              🔍
            </button>
            {suggestions.length > 0 && (
              <ul style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderTop: 'none',
                maxHeight: '150px',
                overflowY: 'auto',
                listStyle: 'none',
                margin: 0,
                padding: 0,
                zIndex: 1000
              }}>
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.isbn}
                    onClick={() => handleSuggestionClick(suggestion)}
                    style={{
                      padding: '8px 12px',
                      cursor: 'pointer',
                      borderBottom: '1px solid #eee'
                    }}
                  >
                    {suggestion.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '14px', color: '#333', cursor: 'pointer' }}>
          <Link to="/my-rented" style={{ color: '#d0021b', fontWeight: 'bold', textDecoration: 'none', position: 'relative' }}
            onMouseEnter={e => e.currentTarget.style.color = '#a00015'}
            onMouseLeave={e => e.currentTarget.style.color = '#d0021b'}
          >
            Rented Books
            {rentedBooks.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '-5px',
                right: '-15px',
                backgroundColor: 'red',
                color: 'white',
                borderRadius: '50%',
                padding: '2px 6px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {rentedBooks.length}
              </span>
            )}
          </Link>

          <Link to="/wishlist" style={{ position: 'relative', textDecoration: 'none', color: 'black', cursor: 'pointer' }}>
            <span role="img" aria-label="wishlist">❤️</span> Wishlist
            {wishlistItems.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '-5px',
                right: '-10px',
                backgroundColor: 'red',
                color: 'white',
                borderRadius: '50%',
                padding: '2px 6px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {wishlistItems.length}
              </span>
            )}
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }} onClick={() => navigate('/cart')}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#a00015';
              e.currentTarget.querySelector('span').style.color = '#a00015';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = '#333';
              e.currentTarget.querySelector('span').style.color = '#333';
            }}
          >
            <span>🛒</span>
            <span>{cartItems.reduce((total, item) => total + item.quantity, 0)}</span>
          </div>

          {user ? (
            <div
              onClick={handleLogoutClick}
              title="Click to logout"
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: '#d0021b',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontWeight: 'bold',
                userSelect: 'none'
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#a00015'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#d0021b'}
            >
              {user.username.charAt(0).toUpperCase()}
            </div>
          ) : (
            <Link to="/login" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#333', textDecoration: 'none' }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#a00015';
                e.currentTarget.querySelector('span').style.color = '#a00015';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = '#333';
                e.currentTarget.querySelector('span').style.color = '#333';
              }}
            >
              <span>👤</span>
              <span>My Account</span>
            </Link>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav style={{ marginTop: '10px', borderTop: '1px solid #eee', paddingTop: '10px', fontSize: '14px' }}>
        <ul style={{ display: 'flex', gap: '15px', listStyle: 'none', padding: 0, margin: 0 }}>
          {['Home', 'All Books', "Today's Deal"].map((item, index) => {
            const pathMap = {
              'Home': '/',
              'All Books': '/books',
              "Today's Deal": '/todays-deal'
            };
            const path = pathMap[item] || '/books';
            return (
              <li key={index} style={{ cursor: 'pointer', color: '#d0021b' }}
                onMouseEnter={e => e.currentTarget.style.color = '#a00015'}
                onMouseLeave={e => e.currentTarget.style.color = '#d0021b'}
              >
                <a href={path} onClick={(e) => { e.preventDefault(); navigate(path); }} style={{ color: 'inherit', textDecoration: 'none' }}>{item}</a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default TopBar;
