import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { WishlistContext } from '../contexts/WishlistContext';

const BookItem = ({ book, discount = 0 }) => {
  const { addToCart } = useContext(CartContext);
  const { wishlistItems, addToWishlist, removeFromWishlist } = useContext(WishlistContext);

  // Example rating for stars (out of 5)
  const rating = book.rating || 4;

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i} style={{ color: '#f5a623' }}>&#9733;</span>); // filled star
      } else {
        stars.push(<span key={i} style={{ color: '#ccc' }}>&#9733;</span>); // empty star
      }
    }
    return stars;
  };

  const isInWishlist = wishlistItems.some(item => item.id === book.id);

  return (
      <div style={{ width: '150px', margin: '10px', position: 'relative', fontFamily: 'Arial, sans-serif', border: '1px solid #d0021b', borderRadius: '8px', padding: '10px', boxShadow: '0 0 8px rgba(208, 2, 27, 0.3)' }}>
      {discount > 0 && (
        <div style={{
          position: 'absolute',
          top: '5px',
          right: '5px',
          backgroundColor: '#d0021b',
          color: 'white',
          borderRadius: '50%',
          width: '30px',
          height: '30px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '12px',
          fontWeight: 'bold',
          zIndex: 1
        }}>
          {discount}%
        </div>
      )}
      <Link to={`/book/${book.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <img src={book.cover} alt={book.title} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '5px' }} />
        <h4 style={{ margin: '5px 0 0 0', fontWeight: 'bold', fontSize: '14px', color: '#d0021b' }}>{book.title}</h4>
      </Link>
      <p style={{ margin: '2px 0', fontSize: '12px', color: '#a00000' }}>{book.author}</p>
      <div style={{ fontSize: '12px', margin: '2px 0' }}>
        {renderStars()}
      </div>
        <div style={{ margin: '5px 0', fontWeight: 'bold', color: '#d0021b', fontSize: '14px' }}>
          ₹{(parseFloat(book.price) * (1 - discount / 100)).toFixed(0)}&nbsp;
          {discount > 0 && (
            <span style={{ textDecoration: 'line-through', color: '#999', fontWeight: 'normal', fontSize: '12px' }}>
              ₹{parseFloat(book.price).toFixed(0)}
            </span>
          )}
        </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <button onClick={() => addToCart(book)} style={{
          backgroundColor: '#d0021b',
          border: 'none',
          color: 'white',
          padding: '5px 8px',
          borderRadius: '3px',
          cursor: 'pointer',
          fontSize: '12px',
          width: '80%'
        }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#a00000'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#d0021b'}
        >Rent</button>
        <button
          onClick={() => isInWishlist ? removeFromWishlist(book.id) : addToWishlist(book)}
          aria-label={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: isInWishlist ? '#d0021b' : '#ccc',
            cursor: 'pointer',
            fontSize: '20px',
            width: 'auto',
            padding: '0',
            margin: '0',
            verticalAlign: 'middle',
            display: 'inline-block'
          }}
          onMouseEnter={e => e.currentTarget.style.color = isInWishlist ? '#a00000' : '#ff6666'}
          onMouseLeave={e => e.currentTarget.style.color = isInWishlist ? '#d0021b' : '#ccc'}
        >
          {isInWishlist ? '♥' : '♡'}
        </button>
      </div>
    </div>
  );
};

export default BookItem;
