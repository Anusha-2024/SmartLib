import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { WishlistContext } from '../contexts/WishlistContext';

const HorizontalBookList = ({ title, books }) => {
  const { addToCart } = useContext(CartContext);
  const { wishlistItems, addToWishlist, removeFromWishlist } = useContext(WishlistContext);

  return (
    <section style={{ marginBottom: '40px' }}>
      <h2 style={{ marginBottom: '10px', fontFamily: 'Arial, sans-serif' }}>{title}</h2>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        overflowX: 'auto',
        gap: '15px',
        paddingBottom: '10px',
        paddingRight: '10px'
      }}>
        {books.map(book => {
          const isInWishlist = wishlistItems.some(item => item.id === book.id);
          return (
            <div key={book.id} style={{
              minWidth: '150px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              padding: '10px',
              backgroundColor: 'white',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              flexShrink: 0,
              textAlign: 'center',
              position: 'relative'
            }}>
              <a href={`/book/${book.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img src={book.cover} alt={book.title} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' }} />
              </a>
              <a href={`/book/${book.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3 style={{ fontSize: '14px', margin: '10px 0 5px' }}>{book.title}</h3>
              </a>
              <p style={{ fontSize: '12px', color: '#555', margin: '0 0 5px' }}>{book.author}</p>
              <div style={{ fontSize: '12px', margin: '0 0 5px' }}>
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} style={{ color: i < book.rating ? '#f5a623' : '#ccc' }}>&#9733;</span>
                ))}
              </div>
              <div style={{ fontWeight: 'bold', color: '#d0021b', fontSize: '14px', marginBottom: '10px' }}>
                ₹{book.price}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', justifyContent: 'center' }}>
                <button
                  onClick={() => addToCart(book)}
                  style={{
                    backgroundColor: '#d0021b',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '5px 10px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    flex: '1 1 auto'
                  }}
                >
                  Rent
                </button>
                <button
                  onClick={() => isInWishlist ? removeFromWishlist(book.id) : addToWishlist(book)}
                  aria-label={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: isInWishlist ? '#b30000' : '#ccc',
                    cursor: 'pointer',
                    fontSize: '20px',
                    padding: '0 5px',
                    flex: '0 0 auto'
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = isInWishlist ? '#800000' : '#ff6666'}
                  onMouseLeave={e => e.currentTarget.style.color = isInWishlist ? '#b30000' : '#ccc'}
                >
                  {isInWishlist ? '♥' : '♡'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HorizontalBookList;
