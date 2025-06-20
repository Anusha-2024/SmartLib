import React, { useContext } from 'react';
import { WishlistContext } from '../contexts/WishlistContext';
import BookItem from '../components/BookItem';

const Wishlist = () => {
  const { wishlistItems } = useContext(WishlistContext);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Your Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p>You have no books in your wishlist.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {wishlistItems.map(book => (
            <BookItem key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
