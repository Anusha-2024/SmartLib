import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const storageKey = user ? `wishlist_${user.username}` : 'wishlist_anonymous';
  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedWishlist = localStorage.getItem(storageKey);
    const parsedWishlist = savedWishlist ? JSON.parse(savedWishlist) : [];
    // console.log('WishlistContext: Loaded wishlistItems from localStorage:', parsedWishlist);
    return parsedWishlist;
  });

  useEffect(() => {
    // console.log('WishlistContext: wishlistItems updated:', wishlistItems);
    localStorage.setItem(storageKey, JSON.stringify(wishlistItems));
  }, [wishlistItems, storageKey]);

  const addToWishlist = (book) => {
    // Remove any React components or non-serializable properties before adding
    const bookData = { ...book };
    delete bookData.component;
    setWishlistItems((prevItems) => {
      if (prevItems.find(item => item.id === bookData.id)) {
        return prevItems;
      }
      return [...prevItems, bookData];
    });
  };

  const removeFromWishlist = (bookId) => {
    setWishlistItems((prevItems) => prevItems.filter(item => item.id !== bookId));
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
